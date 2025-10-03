import { Router } from "express";
import { z } from "zod";

import { buildGibsTileUrl } from "../services/gibsService";
import { asyncHandler } from "../utils/asyncHandler";

const gibsSchema = z.object({
  layer: z.string().optional(),
  tileMatrixSet: z.string().optional(),
  time: z.string().optional(),
  imageFormat: z.string().optional(),
});

export const gibsRouter = Router();

gibsRouter.get(
  "/tiles",
  asyncHandler(async (request, response) => {
    const { layer, tileMatrixSet, time, imageFormat } = gibsSchema.parse(request.query);
    const config = buildGibsTileUrl({ layer, tileMatrixSet, time, imageFormat });
    response.json({ config });
  }),
);
