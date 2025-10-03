import { mkdir } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import fs from "node:fs";

import { env } from "../config/env";

const LAADS_BASE_URL = "https://nrt3.modaps.eosdis.nasa.gov/archive/allData";

export interface ModisGranuleMetadata {
  name: string;
  size: number;
  lastModified: string;
  year: number;
  dayOfYear: number;
  product: string;
  collection: string;
  url: string;
}

export interface FetchGranulesOptions {
  product?: string;
  collection?: string;
  daysBack?: number;
}

function ensureLaadsToken(): string {
  const token = env.nasa.laadsToken;
  if (!token) {
    throw new Error(
      "LAADS token is missing. Set LAADS_TOKEN in the environment (see backend/.env.example)."
    );
  }
  return token;
}

function buildIndexUrl(collection: string, product: string, year: number, dayOfYear: number): string {
  return `${LAADS_BASE_URL}/${collection}/${product}/${year}/${dayOfYear.toString().padStart(3, "0")}.json`;
}

function buildGranuleUrl(metadata: Omit<ModisGranuleMetadata, "url">): string {
  return `${LAADS_BASE_URL}/${metadata.collection}/${metadata.product}/${metadata.year}/${metadata.dayOfYear
    .toString()
    .padStart(3, "0")}/${metadata.name}`;
}

export function createGranuleDescriptor(input: {
  name: string;
  year: number;
  dayOfYear: number;
  product?: string;
  collection?: string;
}): ModisGranuleMetadata {
  const product = input.product ?? env.nasa.modis.product;
  const collection = input.collection ?? env.nasa.modis.collection;

  return {
    name: input.name,
    size: 0,
    lastModified: new Date().toISOString(),
    year: input.year,
    dayOfYear: input.dayOfYear,
    product,
    collection,
    url: buildGranuleUrl({
      name: input.name,
      size: 0,
      lastModified: new Date().toISOString(),
      year: input.year,
      dayOfYear: input.dayOfYear,
      product,
      collection,
    }),
  };
}

async function fetchIndex(
  collection: string,
  product: string,
  year: number,
  dayOfYear: number,
  token: string
): Promise<ModisGranuleMetadata[]> {
  const response = await fetch(buildIndexUrl(collection, product, year, dayOfYear), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 404) return [];
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`LAADS index request failed (${response.status}): ${message}`);
  }

  const payload = (await response.json()) as { content?: Array<{ name: string; size: number; lastModified: string }> };
  const entries = payload.content ?? [];

  return entries
    .filter((entry) => entry.name.endsWith(".hdf") || entry.name.endsWith(".nc"))
    .map<ModisGranuleMetadata>((entry) => ({
      name: entry.name,
      size: entry.size,
      lastModified: entry.lastModified,
      year,
      dayOfYear,
      product,
      collection,
      url: buildGranuleUrl({
        name: entry.name,
        size: entry.size,
        lastModified: entry.lastModified,
        year,
        dayOfYear,
        product,
        collection,
      }),
    }));
}

function enumerateDates(daysBack: number): Array<{ year: number; dayOfYear: number }> {
  const results: Array<{ year: number; dayOfYear: number }> = [];
  const now = new Date();

  for (let offset = 0; offset <= daysBack; offset += 1) {
    const target = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - offset));
    const startOfYear = new Date(Date.UTC(target.getUTCFullYear(), 0, 0));
    const diff = target.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    results.push({ year: target.getUTCFullYear(), dayOfYear });
  }

  return results;
}

export async function listRecentGranules(options: FetchGranulesOptions = {}): Promise<ModisGranuleMetadata[]> {
  const token = ensureLaadsToken();
  const product = options.product ?? env.nasa.modis.product;
  const collection = options.collection ?? env.nasa.modis.collection;
  const daysBack = options.daysBack ?? env.nasa.modis.daysBack;

  const dates = enumerateDates(daysBack);
  const all: ModisGranuleMetadata[] = [];

  for (const { year, dayOfYear } of dates) {
    const metadata = await fetchIndex(collection, product, year, dayOfYear, token);
    all.push(...metadata);
  }

  return all;
}

export interface DownloadGranuleOptions {
  destinationDir?: string;
  signal?: AbortSignal;
}

export async function downloadGranule(
  granule: ModisGranuleMetadata,
  options: DownloadGranuleOptions = {}
): Promise<string> {
  const token = ensureLaadsToken();
  const destinationDir = options.destinationDir ?? env.nasa.modis.storageDir;

  await mkdir(destinationDir, { recursive: true });

  const response = await fetch(granule.url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: options.signal,
  });

  if (!response.ok || !response.body) {
    throw new Error(`Failed to download ${granule.name}: ${response.status} ${response.statusText}`);
  }

  const filePath = path.join(destinationDir, granule.name);
  const writable = createWriteStream(filePath);
  const readable = Readable.fromWeb(response.body as globalThis.ReadableStream<Uint8Array>);
  await pipeline(readable, writable);

  return filePath;
}

// ------------------------
// Dhaka heat risk JSON
// ------------------------
export async function getDhakaHeatRisk() {
  const filePath = path.join(__dirname, "../../data/modis/dhaka_heat.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}
