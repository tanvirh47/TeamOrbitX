import { useEffect, useState } from "react";

import type { CommunityReport, EnvironmentalResponse } from "../api/types";

interface GridFeatureProperties {
  lst: number;
  ndvi: number;
  precipitation: number;
  elevation: number;
  no2: number;
  o3: number;
  heat_risk: number;
  flood_risk: number;
  air_quality: number;
  greenness_index: number;
}

interface MapOverviewResponse {
  summary: EnvironmentalResponse["summary"];
  risks: EnvironmentalResponse["risks"];
  grid: GeoJSON.FeatureCollection<GeoJSON.Polygon, GridFeatureProperties>;
  reports: CommunityReport[];
}

interface UseMapOverviewOptions {
  lat: number;
  lon: number;
  radiusKm?: number;
  gridSize?: number;
}

interface UseMapOverviewResult {
  data: MapOverviewResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export function useMapOverview(options: UseMapOverviewOptions): UseMapOverviewResult {
  const { lat, lon, radiusKm, gridSize } = options;
  const [data, setData] = useState<MapOverviewResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams({ lat: String(lat), lon: String(lon) });
      if (radiusKm) searchParams.set("radius_km", String(radiusKm));
      if (gridSize) searchParams.set("grid_size", String(gridSize));

      const response = await fetch(`${API_BASE}/api/map/overview?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const payload = (await response.json()) as MapOverviewResponse;
      setData(payload);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to load map overview";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon, radiusKm, gridSize]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
