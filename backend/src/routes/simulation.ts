import { Router } from "express";
import { z } from "zod";

import { simulateInterventions } from "../services/simulationService";
import { asyncHandler } from "../utils/asyncHandler";

const simulationSchema = z.object({
  interventions: z
    .array(
      z.object({
        intervention_id: z.string().min(1),
        quantity: z.coerce.number().int().positive(),
      }),
    )
    .min(1),
  baseline_heat_risk: z.coerce.number().min(0).max(1),
  baseline_air_quality: z.coerce.number().min(0).max(1),
  baseline_ndvi: z.coerce.number().min(0).max(1),
});

export const simulationRouter = Router();

simulationRouter.post(
  "/",
  asyncHandler(async (request, response) => {
    const payload = simulationSchema.parse(request.body);
    const result = simulateInterventions(payload);
    response.json(result);
  }),
);
