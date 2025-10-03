import { env } from "../config/env";

const GIBS_BASE_URL = "https://gibs.earthdata.nasa.gov/wmts/epsg3857";

export interface GibsTileConfig {
  urlTemplate: string;
  attribution: string;
  layer: string;
  tileMatrixSet: string;
  time: string;
  imageFormat: string;
}

export function buildGibsTileUrl(options?: {
  layer?: string;
  tileMatrixSet?: string;
  time?: string;
  imageFormat?: string;
}): GibsTileConfig {
  const layer = options?.layer ?? env.nasa.gibs.layer;
  const tileMatrixSet = options?.tileMatrixSet ?? env.nasa.gibs.tileMatrixSet;
  const time = options?.time ?? env.nasa.gibs.time;
  const imageFormat = options?.imageFormat ?? env.nasa.gibs.imageFormat;

  const extension = imageFormat.toLowerCase();
  const urlTemplate = `${GIBS_BASE_URL}/best/${layer}/${time}/${tileMatrixSet}/{z}/{y}/{x}.${extension}`;

  return {
    urlTemplate,
    attribution: 'Imagery courtesy NASA Global Imagery Browse Services (GIBS)',
    layer,
    tileMatrixSet,
    time,
    imageFormat,
  };
}
// Example in gibsService.ts or riskTileServer.ts
export const getRiskTiles = async (req: Request, res: Response) => {
  const { city } = req.query;  // e.g., 'dhaka' for bounds filtering if needed
  const currentDate = new Date().toISOString().split('T')[0];
  const configs = [
    // Mirror the frontend hard-code, but add city-specific time/bounds if using modisService.ts
    {
      layer: 'heat',
      identifier: 'MODIS_Terra_Land_Surface_Temp_Day',
      urlTemplate: `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=MODIS_Terra_Land_Surface_Temp_Day&STYLE=default&TIME=${currentDate}&TILEMATRIXSET=GoogleMapsCompatible_Level9&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png`,
      // ... other fields
    },
    // Flood config...
  ];
  res.json({ configs });
};