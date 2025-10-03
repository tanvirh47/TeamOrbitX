// backend/src/routes/map.ts
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { getMapOverview } from '../services/mapService';
import { asyncHandler } from '../utils/asyncHandler';
import { riskTileServer } from '../services/riskTileServer';

const mapRouter = Router();

// Overview route
const overviewSchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
  radius_km: z.coerce.number().positive().max(50).optional(),
  grid_size: z.coerce.number().int().min(3).max(25).optional(),
});

mapRouter.get(
  '/overview',
  asyncHandler(async (req: Request, res: Response) => {
    const { lat, lon, radius_km, grid_size } = overviewSchema.parse(req.query);
    const result = await getMapOverview({
      lat,
      lon,
      radiusKm: radius_km,
      gridSize: grid_size,
    });
    res.json(result);
  })
);

// Risk tiles route
mapRouter.get('/risk/tiles', asyncHandler(async (req: Request, res: Response) => {
  const layers = ['heat', 'flood'];
  const configs = await Promise.all(
    layers.map(async (layer) => ({
      layer,
      urlTemplate: `${req.protocol}://${req.get('host')}/tiles/risk/${layer}/{z}/{x}/{y}.png`,
      attribution: 'Risk Data from Backend',
      tileMatrixSet: 'GoogleMapsCompatible_Level14',
      time: new Date().toISOString().split('T')[0],
      imageFormat: 'image/png',
    }))
  );
  res.json({ configs });
}));

export default mapRouter;
