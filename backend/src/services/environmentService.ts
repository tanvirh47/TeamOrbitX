import type { EnvironmentalResponse, GridCell } from "../types/api";

export const GRID_CELL_SPACING_DEGREES = 0.005; // roughly 500m at the equator

const DEFAULT_RADIUS_KM = 5;
const DEFAULT_GRID_SIZE = 9;

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function createGrid(
  centerLat: number,
  centerLon: number,
  gridSize: number,
): GridCell[] {
  const cells: GridCell[] = [];
  const halfSize = Math.floor(gridSize / 2);

  for (let row = -halfSize; row <= halfSize; row += 1) {
    for (let col = -halfSize; col <= halfSize; col += 1) {
      const lat = centerLat + row * GRID_CELL_SPACING_DEGREES;
      const lon = centerLon + col * GRID_CELL_SPACING_DEGREES;
      const seed = (row + halfSize) * gridSize + (col + halfSize);
      const base = pseudoRandom(lat * lon * 1000 + seed);
      const lst = 25 + pseudoRandom(seed + 1 + base) * 12; // 25-37C
      const ndvi = clamp(0.2 + pseudoRandom(seed + 2) * 0.6, 0, 1);
      const precipitation = 2 + pseudoRandom(seed + 3) * 4; // mm
      const elevation = 10 + pseudoRandom(seed + 4) * 30;
      const no2 = 15 + pseudoRandom(seed + 5) * 20;
      const o3 = 20 + pseudoRandom(seed + 6) * 30;
      const heatRisk = clamp((lst - 24) / 15, 0, 1);
      const floodRisk = clamp(1 - precipitation / 6 + pseudoRandom(seed + 7) * 0.2, 0, 1);
      const airQuality = clamp(1 - no2 / 50, 0, 1);
      const greenness = ndvi;

      cells.push({
        lat,
        lon,
        lst: parseFloat(lst.toFixed(2)),
        ndvi: parseFloat(ndvi.toFixed(3)),
        precipitation: parseFloat(precipitation.toFixed(2)),
        elevation: parseFloat(elevation.toFixed(2)),
        no2: parseFloat(no2.toFixed(2)),
        o3: parseFloat(o3.toFixed(2)),
        heat_risk: parseFloat(heatRisk.toFixed(3)),
        flood_risk: parseFloat(floodRisk.toFixed(3)),
        air_quality: parseFloat(airQuality.toFixed(3)),
        greenness_index: parseFloat(greenness.toFixed(3)),
      });
    }
  }

  return cells;
}

export function generateEnvironmentalSummary(
  lat: number,
  lon: number,
  radiusKm = DEFAULT_RADIUS_KM,
  gridSize = DEFAULT_GRID_SIZE,
): EnvironmentalResponse {
  const grid = createGrid(lat, lon, gridSize);

  const lstValues = grid.map((cell) => cell.lst);
  const ndviValues = grid.map((cell) => cell.ndvi);
  const precipitationValues = grid.map((cell) => cell.precipitation);
  const elevationValues = grid.map((cell) => cell.elevation);
  const no2Values = grid.map((cell) => cell.no2);
  const o3Values = grid.map((cell) => cell.o3);

  const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;

  const summary = {
    center_lat: lat,
    center_lon: lon,
    radius_km: radiusKm,
    acquired_at: new Date().toISOString(),
    stats: {
      lst_min: Math.min(...lstValues),
      lst_max: Math.max(...lstValues),
      lst_mean: parseFloat(mean(lstValues).toFixed(2)),
      ndvi_mean: parseFloat(mean(ndviValues).toFixed(3)),
      precipitation_mean: parseFloat(mean(precipitationValues).toFixed(2)),
      elevation_mean: parseFloat(mean(elevationValues).toFixed(2)),
      no2_mean: parseFloat(mean(no2Values).toFixed(2)),
      o3_mean: parseFloat(mean(o3Values).toFixed(2)),
    },
    grid,
  };

  const risks = {
    heat_risk: parseFloat(mean(grid.map((cell) => cell.heat_risk)).toFixed(3)),
    flood_risk: parseFloat(mean(grid.map((cell) => cell.flood_risk)).toFixed(3)),
    air_quality: parseFloat(mean(grid.map((cell) => cell.air_quality)).toFixed(3)),
    greenness_index: parseFloat(mean(grid.map((cell) => cell.greenness_index)).toFixed(3)),
    no2: parseFloat(mean(no2Values).toFixed(2)),
    lst: parseFloat(mean(lstValues).toFixed(2)),
  };

  return { summary, risks };
}
