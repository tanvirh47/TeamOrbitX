import { useCallback, useEffect, useState } from "react";

import { fetchEnvironmentalSummary } from "../api/client";
import type { EnvironmentalResponse } from "../api/types";

interface Options {
  lat?: number;
  lon?: number;
  radiusKm?: number;
  gridSize?: number;
}

export function useEnvironmentalData(options: Options = {}) {
  const {
    lat = 40.7128,
    lon = -74.006,
    radiusKm = 5,
    gridSize = 9,
  } = options;

  const [data, setData] = useState<EnvironmentalResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchEnvironmentalSummary(lat, lon, radiusKm, gridSize);
      setData(response);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load environmental data";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [lat, lon, radiusKm, gridSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refresh: fetchData,
  };
}
