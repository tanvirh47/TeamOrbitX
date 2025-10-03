import { Router } from "express";
import { z } from "zod";

import {
  createGranuleDescriptor,
  downloadGranule,
  listRecentGranules,
  getDhakaHeatRisk,
} from "../services/modisService";
import { asyncHandler } from "../utils/asyncHandler";

const listSchema = z.object({
  product: z.string().optional(),
  collection: z.string().optional(),
  daysBack: z.coerce.number().int().min(0).max(7).optional(),
});

const downloadSchema = z.object({
  name: z.string().min(1),
  year: z.coerce.number().int().min(2000),
  dayOfYear: z.coerce.number().int().min(1).max(366),
  product: z.string().min(1).optional(),
  collection: z.string().min(1).optional(),
});

export const modisRouter = Router();

// List recent granules
modisRouter.get(
  "/granules",
  asyncHandler(async (request, response) => {
    const { product, collection, daysBack } = listSchema.parse(request.query);
    const granules = await listRecentGranules({ product, collection, daysBack });
    response.json({ granules });
  })
);

// Download granule
modisRouter.post(
  "/download",
  asyncHandler(async (request, response) => {
    const { name, year, dayOfYear, product, collection } = downloadSchema.parse(request.body);
    const granule = createGranuleDescriptor({ name, year, dayOfYear, product, collection });
    const filePath = await downloadGranule(granule);
    response.status(201).json({ filePath });
  })
);

// Dhaka heat risk route
modisRouter.get(
  "/heat-risk",
  asyncHandler(async (request, response) => {
    const data = await getDhakaHeatRisk();
    response.json(data);
  })
);
