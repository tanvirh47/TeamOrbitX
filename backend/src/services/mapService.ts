import type { Feature, FeatureCollection, Polygon } from "geojson";

import type { EnvironmentalResponse } from "../types/api";
import { listReports } from "./reportsService";
import { generateEnvironmentalSummary, GRID_CELL_SPACING_DEGREES } from "./environmentService";

interface MapOverviewOptions {
  lat: number;
  lon: number;
  radiusKm?: number;
  gridSize?: number;
}

interface MapOverviewResult {
  summary: EnvironmentalResponse["summary"];
  risks: EnvironmentalResponse["risks"];
  grid: FeatureCollection<Polygon, GridFeatureProperties>;
  reports: Awaited<ReturnType<typeof listReports>>;
}

export interface GridFeatureProperties {
  lst: number;
  ndvi: number;
  precipitation: number;
  elevation: number;
  no2: number;
  o3: number;
  heat_risk: number;
  flood_risk: number;
  air_quality: number;
  greenness_index: number;
}

function gridCellToPolygon(
  lat: number,
  lon: number,
  properties: GridFeatureProperties,
): Feature<Polygon, GridFeatureProperties> {
  const half = GRID_CELL_SPACING_DEGREES / 2;

  const coordinates = [
    [lon - half, lat - half],
    [lon + half, lat - half],
    [lon + half, lat + half],
    [lon - half, lat + half],
    [lon - half, lat - half],
  ];

  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [coordinates],
    },
    properties,
  };
}

export async function getMapOverview(options: MapOverviewOptions): Promise<MapOverviewResult> {
  const { lat, lon, radiusKm, gridSize } = options;

  const environmental = generateEnvironmentalSummary(lat, lon, radiusKm, gridSize);
  const reports = await listReports();

  const features = environmental.summary.grid.map((cell) =>
    gridCellToPolygon(cell.lat, cell.lon, {
      lst: cell.lst,
      ndvi: cell.ndvi,
      precipitation: cell.precipitation,
      elevation: cell.elevation,
      no2: cell.no2,
      o3: cell.o3,
      heat_risk: cell.heat_risk,
      flood_risk: cell.flood_risk,
      air_quality: cell.air_quality,
      greenness_index: cell.greenness_index,
    }),
  );

  return {
    summary: environmental.summary,
    risks: environmental.risks,
    grid: {
      type: "FeatureCollection",
      features,
    },
    reports,
  };
}
import fs from "fs";
import path from "path";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_KEY!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

export async function getDhakaHeatRisk() {
  // Example: fetch GeoTIFF/JSON from local folder
  const filePath = path.join(__dirname, "../../data/modis/dhaka_heat.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}
