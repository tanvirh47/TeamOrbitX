import type {
  CommunityReport,
  EnvironmentalResponse,
  InterventionsCatalogue,
  ReportCreate,
  SimulationRequest,
  SimulationResult,
} from "./types";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export function fetchEnvironmentalSummary(
  lat: number,
  lon: number,
  radiusKm?: number,
  gridSize?: number,
) {
  const searchParams = new URLSearchParams({ lat: String(lat), lon: String(lon) });
  if (radiusKm) searchParams.set("radius_km", String(radiusKm));
  if (gridSize) searchParams.set("grid_size", String(gridSize));
  return request<EnvironmentalResponse>(`/api/environmental-summary?${searchParams.toString()}`);
}

export function fetchCommunityReports() {
  return request<CommunityReport[]>("/api/reports");
}

export function submitCommunityReport(payload: ReportCreate) {
  return request<CommunityReport>("/api/reports", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function voteOnReport(reportId: number, delta: number) {
  return request<CommunityReport>(`/api/reports/${reportId}/vote`, {
    method: "POST",
    body: JSON.stringify({ delta }),
  });
}

export function fetchInterventionsCatalogue() {
  return request<InterventionsCatalogue>("/api/interventions");
}

export function runSimulation(payload: SimulationRequest) {
  return request<SimulationResult>("/api/simulate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
