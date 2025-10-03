import { Router } from "express";
import { z } from "zod";

import { generateEnvironmentalSummary } from "../services/environmentService";
import { asyncHandler } from "../utils/asyncHandler";

const querySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
  radius_km: z.coerce.number().positive().max(100).optional(),
  grid_size: z.coerce.number().int().positive().max(49).optional(),
});

export const environmentRouter = Router();

environmentRouter.get(
  "/environmental-summary",
  asyncHandler(async (request, response) => {
    const { lat, lon, radius_km, grid_size } = querySchema.parse(request.query);
    const summary = generateEnvironmentalSummary(lat, lon, radius_km, grid_size);
    response.json(summary);
  }),
);
