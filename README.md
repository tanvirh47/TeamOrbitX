# Web Dashboard Backend

TypeScript Express backend that powers the OrbitX web dashboard frontend. It exposes environmental summary analytics, community report management backed by MySQL, and scenario simulation APIs that mirror the contracts used by the frontend in `frontend/src/api`.

## Prerequisites

- Node.js 18+ and npm
- MySQL 8.x (or compatible) instance with credentials that allow table creation
- NASA Earthdata Login (for MODIS/IMERG/TEMPO access)

## Getting Started

1. Install dependencies:

   ```powershell
   cd backend
   npm install
   ```

2. Create an `.env` file based on the provided example and update it with your MySQL and NASA credentials:

   ```powershell
   Copy-Item .env.example .env
   ```

   | Variable | Purpose |
   | --- | --- |
   | `PORT` | Port the API listens on (defaults to `8000`) |
   | `MYSQL_*` | Connection details for the `community_reports` table |
   | `EARTHDATA_USERNAME` / `EARTHDATA_PASSWORD` | Optional helpers for ingestion scripts that use Earthdata basic auth |
   | `LAADS_TOKEN` | Required for MODIS near-real-time downloads from LAADS DAAC |
   | `MODIS_COLLECTION`, `MODIS_PRODUCT`, `MODIS_DAYS_BACK` | Default MODIS search window exposed by the API |
   | `MODIS_STORAGE_DIR` | Folder where downloaded MODIS granules are saved |

   To obtain a LAADS token, log in at <https://ladsweb.modaps.eosdis.nasa.gov/tools-and-services/data-download-scripts/> and generate an application token.

3. Create the target database (schema) if it does not already exist, then either run the provided `schema.sql` or let the server create tables on startup:

   ```sql
   CREATE DATABASE orbitx_dashboard;
   ```

   The table definition is available in `backend/schema.sql` for manual execution.

4. Start the development server with hot reload:

   ```powershell
   npm run dev
   ```

   For production builds:

   ```powershell
   npm run build
   npm start
   ```

## API Overview

Base URL defaults to `http://localhost:8000/api` (override using `PORT`).

- `GET /environmental-summary?lat=...&lon=...[&radius_km=&grid_size=]` – Deterministic synthetic environmental KPIs and risk scores (replaceable with NASA-ingested data).
- `GET /reports` – List community reports stored in MySQL.
- `POST /reports` – Create a report (`lat`, `lon`, `issue_type`, `description`, optional ISO `timestamp`).
- `POST /reports/:id/vote` – Apply an up/down vote delta.
- `GET /interventions` – Static catalogue used by the simulator.
- `POST /simulate` – Run an intervention scenario against the catalogue. Payload matches `SimulationRequest` from the frontend.
- `GET /modis/granules` – List recent MODIS granules available via LAADS for the configured product.
- `POST /modis/download` – Download a specific MODIS granule to the configured storage directory.

`GET /health` is also available for readiness checks.

## MODIS Integration Notes

- All MODIS downloads require a valid `LAADS_TOKEN`; without it the service returns `400` with an explanatory message.
- `GET /modis/granules` accepts optional `product`, `collection`, and `daysBack` query parameters. The server defaults come from the environment configuration (`MODIS_*`).
- `POST /modis/download` expects a JSON body containing `name`, `year`, and `dayOfYear`. Optional `product` and `collection` fields override the defaults. The endpoint saves the file under `MODIS_STORAGE_DIR` and returns the path.
- This service does not yet process the downloaded granules. Use a separate ingestion workflow (e.g. Python + `earthaccess`) to transform the raw HDF data into summaries for `/api/environmental-summary`.

## Frontend Integration

Set `VITE_API_URL` in the frontend (e.g. `.env`) to point to this backend's origin. The data contracts are shared with the frontend types, so no additional wiring is required once both servers are running.

## Notes

- MySQL tables are created automatically on boot via `initializeDatabase()`.
- The service uses pooled connections via `mysql2/promise`; ensure the configured database allows multiple concurrent connections.
- Environmental metrics are currently generated deterministically so the frontend charts stay stable between reloads. Swap in ingested NASA data when your pipelines are ready.
