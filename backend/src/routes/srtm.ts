import { Router } from "express";
import { z } from "zod";

import { describeSrtmTile, downloadSrtmTile } from "../services/srtmService";
import { asyncHandler } from "../utils/asyncHandler";

const locationSchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
});

export const srtmRouter = Router();

srtmRouter.get(
  "/tile",
  asyncHandler(async (request, response) => {
    const { lat, lon } = locationSchema.parse(request.query);
    const descriptor = describeSrtmTile(lat, lon);
    response.json({ tile: descriptor });
  }),
);

srtmRouter.post(
  "/download",
  asyncHandler(async (request, response) => {
    const { lat, lon } = locationSchema.parse(request.body);
    const descriptor = describeSrtmTile(lat, lon);
    const filePath = await downloadSrtmTile(lat, lon);
    response.status(201).json({ tile: descriptor, filePath });
  }),
);
