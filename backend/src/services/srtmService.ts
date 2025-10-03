import { mkdir } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

import { env } from "../config/env";

const SRTM_BASE_URL = "https://e4ftl01.cr.usgs.gov/MEASURES";

export interface SrtmTileDescriptor {
  tile: string;
  dataset: string;
  release: string;
  url: string;
}

export interface DownloadSrtmOptions {
  destinationDir?: string;
}

function ensureEarthdataCredentials(): { username: string; password: string } {
  const username = env.nasa.earthdataUsername;
  const password = env.nasa.earthdataPassword;

  if (!username || !password) {
    throw new Error(
      "Earthdata username/password are missing. Set EARTHDATA_USERNAME and EARTHDATA_PASSWORD in the environment.",
    );
  }

  return { username, password };
}

function padLat(lat: number): string {
  const hemisphere = lat >= 0 ? "N" : "S";
  const degrees = Math.floor(Math.abs(lat));
  return `${hemisphere}${degrees.toString().padStart(2, "0")}`;
}

function padLon(lon: number): string {
  const hemisphere = lon >= 0 ? "E" : "W";
  const degrees = Math.floor(Math.abs(lon));
  return `${hemisphere}${degrees.toString().padStart(3, "0")}`;
}

export function describeSrtmTile(lat: number, lon: number): SrtmTileDescriptor {
  const tile = `${padLat(lat)}${padLon(lon)}`;
  const dataset = env.nasa.srtm.dataset;
  const release = env.nasa.srtm.release;
  const url = `${SRTM_BASE_URL}/${dataset}/${release}/${tile}.SRTMGL1.hgt.zip`;

  return { tile, dataset, release, url };
}

export async function downloadSrtmTile(lat: number, lon: number, options: DownloadSrtmOptions = {}): Promise<string> {
  const { username, password } = ensureEarthdataCredentials();
  const descriptor = describeSrtmTile(lat, lon);
  const destinationDir = options.destinationDir ?? env.nasa.srtm.storageDir;

  await mkdir(destinationDir, { recursive: true });

  const auth = Buffer.from(`${username}:${password}`).toString("base64");
  const response = await fetch(descriptor.url, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
    redirect: "follow",
  });

  if (response.status === 401 || response.status === 403) {
    throw new Error("Earthdata credentials were rejected. Verify EARTHDATA_USERNAME and EARTHDATA_PASSWORD.");
  }

  if (response.status === 404) {
    throw new Error(`SRTM tile ${descriptor.tile} was not found at ${descriptor.url}`);
  }

  if (!response.ok || !response.body) {
    throw new Error(`Failed to download SRTM tile ${descriptor.tile}: ${response.status} ${response.statusText}`);
  }

  const filePath = path.join(destinationDir, `${descriptor.tile}.SRTMGL1.hgt.zip`);
  const writable = createWriteStream(filePath);
  const readable = Readable.fromWeb(response.body as globalThis.ReadableStream<Uint8Array>);
  await pipeline(readable, writable);

  return filePath;
}
