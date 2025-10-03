import cors from "cors";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { apiRouter } from "./routes";

export function createApp() {
  const app = express();

  app.use(cors({ origin: true }));
  app.use(express.json());

  app.get("/api/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.use("/api", apiRouter);

  app.use((request, response) => {
    response.status(404).json({ message: `Route not found: ${request.method} ${request.path}` });
  });

  app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof ZodError) {
      response.status(400).json({
        message: "Invalid request payload",
        issues: error.issues,
      });
      return;
    }

    if (error instanceof Error) {z
      response.status(500).json({ message: error.message });
      return;
    }

    response.status(500).json({ message: "Unexpected error" });
  });

  return app;
}
