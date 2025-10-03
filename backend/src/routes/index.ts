import { Router } from "express";

import { environmentRouter } from "./environment";
import { gibsRouter } from "./gibs";
import { interventionsRouter } from "./interventions";
import mapRouter from "./map"; // default import
import { modisRouter } from "./modis";
import { reportsRouter } from "./reports";
import { simulationRouter } from "./simulation";
import { srtmRouter } from "./srtm";

export const apiRouter = Router();

apiRouter.use(environmentRouter);
apiRouter.use("/map", mapRouter);
apiRouter.use("/map/gibs", gibsRouter);
apiRouter.use("/reports", reportsRouter);
apiRouter.use("/interventions", interventionsRouter);
apiRouter.use("/simulate", simulationRouter);
apiRouter.use("/modis", modisRouter);
apiRouter.use("/srtm", srtmRouter);
