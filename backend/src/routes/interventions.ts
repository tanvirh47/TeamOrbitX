import { Router } from "express";

import { getInterventionsCatalogue } from "../services/interventionsService";

export const interventionsRouter = Router();

interventionsRouter.get("/", (_request, response) => {
  response.json(getInterventionsCatalogue());
});
