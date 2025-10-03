# Web Dashboard Backend

TypeScript Express backend that powers the OrbitX web dashboard frontend. It exposes environmental summary analytics, community report management backed by MySQL, and scenario simulation APIs that mirror the contracts used by the frontend in `frontend/src/api`.

## Prerequisites

- Node.js 18+ and npm
- MySQL 8.x (or compatible) instance with credentials that allow table creation
- NASA Earthdata Login (for MODIS, SRTM, GIBS WMTS, IMERG, TEMPO access)

## Getting Started

1. Install dependencies:

   ```powershell
   cd backend
   npm install
   ```

2. Create an `.env` file based on the provided example and update it with your MySQL credentials plus any NASA settings you plan to use:

   ```powershell
   Copy-Item .env.example .env
   ```

   | Variable | Purpose |
   | --- | --- |
   | `PORT` | Port the API listens on (defaults to `8000`) |
   | `MYSQL_*` | Connection details for the `community_reports` table |
   | `EARTHDATA_USERNAME` / `EARTHDATA_PASSWORD` | Required for downloads protected by Earthdata Login (GIBS WMTS when auth is enforced, SRTM, many LP DAAC products) |
   | `LAADS_TOKEN` | Required for MODIS near-real-time downloads from LAADS DAAC |
   | `MODIS_*` | Defaults used by the MODIS helper endpoints |
   | `SRTM_*` | Dataset metadata and destination directory for downloaded SRTM tiles |
   | `GIBS_*` | Defaults for the NASA GIBS tile endpoint (layer, matrix set, time, format) |

   **Where to get credentials**:
   - Earthdata Login: <https://urs.earthdata.nasa.gov/> (free account). Enable LP DAAC/MEaSUREs and GIBS applications for tile and raster access.
   - LAADS application token: <https://ladsweb.modaps.eosdis.nasa.gov/tools-and-services/data-download-scripts/> (sign in with Earthdata first).

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
- `GET /map/overview?lat=...&lon=...[&radius_km=&grid_size=]` – GeoJSON grid plus NASA summary/risks and community reports for the City Digital Twin map.
- `GET /map/gibs/tiles[?layer=&tileMatrixSet=&time=&imageFormat=]` – Provides a WMTS URL template for NASA GIBS imagery (e.g., Blue Marble, MODIS true color) that the frontend can load as a real-world basemap.
- `GET /reports` – List community reports stored in MySQL.
- `POST /reports` – Create a report (`lat`, `lon`, `issue_type`, `description`, optional ISO `timestamp`).
- `POST /reports/:id/vote` – Apply an up/down vote delta.
- `GET /interventions` – Static catalogue used by the simulator.
- `POST /simulate` – Run an intervention scenario against the catalogue. Payload matches `SimulationRequest` from the frontend.
- `GET /modis/granules` – List recent MODIS granules available via LAADS for the configured product.
- `POST /modis/download` – Download a specific MODIS granule to the configured storage directory.
- `GET /srtm/tile?lat=...&lon=...` – Inspect which SRTM tile covers the provided coordinates (no download).
- `POST /srtm/download` – Download the 1 arc-second SRTM tile for the provided coordinates using Earthdata credentials.

`GET /health` is also available for readiness checks.

## MODIS Integration Notes

- All MODIS downloads require a valid `LAADS_TOKEN`; without it the service returns `400` with an explanatory message.
- `GET /modis/granules` accepts optional `product`, `collection`, and `daysBack` query parameters. The server defaults come from the environment configuration (`MODIS_*`).
- `POST /modis/download` expects a JSON body containing `name`, `year`, and `dayOfYear`. Optional `product` and `collection` fields override the defaults. The endpoint saves the file under `MODIS_STORAGE_DIR` and returns the path.
- This service does not yet process the downloaded granules. Use a separate ingestion workflow (e.g. Python + `earthaccess`) to transform the raw HDF data into summaries for `/api/environmental-summary`.

## SRTM Integration Notes

- `GET /srtm/tile` converts latitude/longitude to the canonical SRTM tile ID (e.g. `N37W122`) so you can confirm coverage.
- `POST /srtm/download` downloads the corresponding `*.SRTMGL1.hgt.zip` file into `SRTM_STORAGE_DIR`. Set `EARTHDATA_USERNAME` and `EARTHDATA_PASSWORD` before calling it; the Earthdata service uses HTTP Basic authentication.
- The default dataset (`SRTMGL1.003`, release `2015.02.25`) contains global 1 arc-second elevation data. Override `SRTM_DATASET` and `SRTM_RELEASE` in `.env` if you need a different product.
- Processing (unzipping, mosaicking, slope calculations) is left to downstream ingestion scripts—the Express API only handles discovery/download.

## GIBS Basemap Notes

- `GET /map/gibs/tiles` returns a WMTS URL template that you can pass directly into Mapbox GL, MapLibre, Leaflet, or OpenLayers as a raster source. By default it serves Blue Marble imagery; override `layer`, `tileMatrixSet`, `time`, and `imageFormat` via query parameters to switch to other NASA layers (e.g. MODIS_Terra_CorrectedReflectance_TrueColor).
- Many GIBS layers are public, but some require authenticated requests. If prompted for credentials, reuse the `EARTHDATA_USERNAME` / `EARTHDATA_PASSWORD` stored in `.env` and forward them from the frontend (e.g. via basic auth headers) or proxy tile requests through your backend.

## Map Overview Endpoint

The City Digital Twin view consumes `GET /api/map/overview`, which combines:

- The synthetic or NASA-derived environmental grid (returned as GeoJSON polygons for easy rendering).
- Aggregated risk scores and summary statistics from `/environmental-summary`.
- The latest community reports (heat/flood/air hotspots) from the MySQL database.

This endpoint gives the frontend a single payload for the base map, risk overlays, and community markers. When you replace the synthetic generator with real NASA ingestion, the map will automatically reflect the live datasets.

## Frontend Integration

Set `VITE_API_URL` in the frontend (e.g. `.env`) to point to this backend's origin. The data contracts are shared with the frontend types, so no additional wiring is required once both servers are running.

## Notes

- MySQL tables are created automatically on boot via `initializeDatabase()`.
- The service uses pooled connections via `mysql2/promise`; ensure the configured database allows multiple concurrent connections.
- Environmental metrics are currently generated deterministically so the frontend charts stay stable between reloads. Swap in ingested NASA data when your pipelines are ready.
