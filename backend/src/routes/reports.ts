import { Router } from "express";
import { z } from "zod";

import { createReport, listReports, updateVotes } from "../services/reportsService";
import { asyncHandler } from "../utils/asyncHandler";

const createSchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
  issue_type: z.string().min(3).max(120),
  description: z.string().min(10),
  timestamp: z.string().datetime().optional(),
});

const voteSchema = z.object({
  delta: z.coerce.number().int().min(-10).max(10),
});

const idSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const reportsRouter = Router();

reportsRouter.get(
  "/",
  asyncHandler(async (_request, response) => {
    const reports = await listReports();
    response.json(reports);
  }),
);

reportsRouter.post(
  "/",
  asyncHandler(async (request, response) => {
    const payload = createSchema.parse(request.body);
    const report = await createReport(payload);
    response.status(201).json(report);
  }),
);

reportsRouter.post(
  "/:id/vote",
  asyncHandler(async (request, response) => {
    const { id } = idSchema.parse(request.params);
    const { delta } = voteSchema.parse(request.body);
    const report = await updateVotes(id, delta);
    if (!report) {
      response.status(404).json({ message: "Report not found" });
      return;
    }
    response.json(report);
  }),
);
