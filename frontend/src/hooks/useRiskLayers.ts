import { useEffect, useState } from "react";

interface RiskLayerConfig {
  layer: string; // e.g., 'heat'
  identifier: string; // GIBS layer ID
  urlTemplate: string;
  attribution: string;
  tileMatrixSet: string;
  time: string; // YYYY-MM-DD
  imageFormat: string;
  minzoom: number;
  maxzoom: number;
  opacity?: number;
}

interface UseRiskLayersResult {
  configs: RiskLayerConfig[] | null;
  loading: boolean;
  error: string | null;
}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
const GIBS_BASE = "https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi";

export function useRiskLayers(city?: string): UseRiskLayersResult {  // Optional city for future backend filtering
  const [configs, setConfigs] = useState<RiskLayerConfig[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfigs = async () => {
      setLoading(true);
      try {
        // For now, hard-code GIBS risks; replace with fetch(`${API_BASE}/api/map/risk/tiles?city=${city || 'dhaka'}`)
        const currentDate = new Date().toISOString().split('T')[0]; // 2025-10-02
        const riskConfigs: RiskLayerConfig[] = [
          {
            layer: 'heat',
            identifier: 'MODIS_Terra_Land_Surface_Temp_Day',
            urlTemplate: `${GIBS_BASE}?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=MODIS_Terra_Land_Surface_Temp_Day&STYLE=default&TIME=${currentDate}&TILEMATRIXSET=GoogleMapsCompatible_Level9&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png`,
            attribution: 'NASA MODIS LST',
            tileMatrixSet: 'GoogleMapsCompatible_Level9',
            time: currentDate,
            imageFormat: 'image/png',
            minzoom: 6,
            maxzoom: 9,
            opacity: 0.6,  // Semi-transparent over satellite
          },
          {
            layer: 'flood',
            identifier: 'MODIS_Terra_Aqua_MCDWD_Flood_Mask_1day',
            urlTemplate: `${GIBS_BASE}?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=MODIS_Terra_Aqua_MCDWD_Flood_Mask_1day&STYLE=default&TIME=${currentDate}&TILEMATRIXSET=GoogleMapsCompatible_Level14&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png`,
            attribution: 'NASA LANCE Flood',
            tileMatrixSet: 'GoogleMapsCompatible_Level14',
            time: currentDate,
            imageFormat: 'image/png',
            minzoom: 6,
            maxzoom: 14,
            opacity: 0.7,
          },
          // Add more: e.g., wildfire via VIIRS
        ];

        setConfigs(riskConfigs);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to load risk layers";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void fetchConfigs();
  }, []);

  return { configs, loading, error };
}