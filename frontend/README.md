# Web Dashboard Interface Design

This project now includes a NASA-powered FastAPI backend plus the OrbitX Vite frontend.

## Prerequisites

- Node.js 18+
- Python 3.11+

## Setup

```bash
npm install
python -m venv .venv
.venv\Scripts\activate
pip install -r backend/requirements.txt
```

## Development

- Frontend only: `npm run dev`
- Backend only: `npm run dev:backend`
- Full stack (concurrent): `npm run dev:full`

The backend listens on `http://localhost:8000` and the Vite dev server on `http://localhost:5173`.

## Environment variables

Set the following if you have NASA Earthdata credentials:

```bash
set NASA_EARTHDATA_USERNAME=your_username
set NASA_EARTHDATA_PASSWORD=your_password
```

Optional:

- `OPENAQ_API_KEY` for enhanced air quality fallback
- `TEMPO_API_KEY` if you have TEMPO access

