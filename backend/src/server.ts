import http from "node:http";

import { createApp } from "./app";
import { env, isProduction } from "./config/env";
import { pool } from "./db/pool";
import { initializeDatabase } from "./db/schema";

async function bootstrap() {
  try {
    await initializeDatabase();

    const app = createApp();
    const server = http.createServer(app);

    server.listen(env.port, () => {
      const mode = isProduction ? "production" : "development";
      console.log(`[server] Listening on port ${env.port} (${mode} mode)`);
    });

    const close = (signal: NodeJS.Signals) => {
      console.log(`\n[server] Received ${signal}, shutting down gracefully...`);
      server.close((error) => {
        if (error) {
          console.error("[server] Error while closing server", error);
          process.exit(1);
          return;
        }
        pool
          .end()
          .then(() => process.exit(0))
          .catch((shutdownError) => {
            console.error("[server] Error while closing database pool", shutdownError);
            process.exit(1);
          });
      });
    };

    process.on("SIGTERM", close);
    process.on("SIGINT", close);
  } catch (error) {
    console.error("[server] Failed to start application", error);
    process.exit(1);
  }
}

void bootstrap();
