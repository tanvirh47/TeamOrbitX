import path from "path";
import { downloadSrtmTile } from "./srtmService";
import { listRecentGranules, downloadGranule } from "./modisService";
import { exec } from "child_process";
import util from "util";

const execAsync = util.promisify(exec);
const TILE_DIR = path.join(__dirname, "../../tiles");
const DATA_DIR = path.join(__dirname, "../../data");

export async function processSrtmTile(lat: number, lon: number) {
  const filePath = await downloadSrtmTile(lat, lon, { destinationDir: DATA_DIR });
  const warpedPath = filePath.replace(".zip", ".webmerc.tif");

  // Warp to EPSG:3857
  await execAsync(`gdalwarp -t_srs EPSG:3857 ${filePath} ${warpedPath}`);

  // Generate XYZ tiles
  await execAsync(`gdal2tiles.py -z 12-14 -w none ${warpedPath} ${path.join(TILE_DIR, "elevation")}`);
}

export async function processModisTiles() {
  const granules = await listRecentGranules({ daysBack: 1 });

  for (const granule of granules) {
    const filePath = await downloadGranule(granule, { destinationDir: DATA_DIR });
    const warpedPath = filePath.replace(/\.(hdf|nc)$/, ".webmerc.tif");

    // Convert HDF/NETCDF → GeoTIFF + Warp
    await execAsync(`gdal_translate -of GTiff ${filePath} temp.tif`);
    await execAsync(`gdalwarp -t_srs EPSG:3857 temp.tif ${warpedPath}`);

    // Generate XYZ tiles
    const layerName = granule.product.toLowerCase();
    await execAsync(`gdal2tiles.py -z 12-14 -w none ${warpedPath} ${path.join(TILE_DIR, layerName)}`);
  }
}
