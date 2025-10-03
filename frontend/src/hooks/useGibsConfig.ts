import { useEffect, useState } from "react";

// Remove custom ImportMeta and ImportMetaEnv interfaces, Vite provides these types automatically.

interface GibsConfig {
  urlTemplate: string;
  attribution: string;
  layer: string;
  tileMatrixSet: string;
  time: string;
  imageFormat: string;
  minzoom: number;
  maxzoom: number;
}

interface UseGibsConfigResult {
  config: GibsConfig | null;
  loading: boolean;
  error: string | null;
}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

// Known zoom ranges and special TileMatrixSets for GIBS layers
const ZOOM_LIMITS: Record<
  string,
  { minzoom: number; maxzoom: number; tileMatrixSet?: string }
> = {
  BlueMarble_NextGeneration: {
    minzoom: 1,
    maxzoom: 8,
    tileMatrixSet: "GoogleMapsCompatible_Level8", // must use Level8 not Level9
  },
  MODIS_Terra_CorrectedReflectance_TrueColor: {
    minzoom: 1,
    maxzoom: 13,
  },
  MODIS_Aqua_CorrectedReflectance_TrueColor: {
    minzoom: 1,
    maxzoom: 13,
  },
  VIIRS_SNPP_CorrectedReflectance_TrueColor: {
    minzoom: 1,
    maxzoom: 14,
  },
};

export function useGibsConfig(): UseGibsConfigResult {
  const [config, setConfig] = useState<GibsConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/api/map/gibs/tiles`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = (await response.json()) as {
          config: Omit<GibsConfig, "minzoom" | "maxzoom">;
        };

        const layer = payload.config.layer;
        const zoom = ZOOM_LIMITS[layer] ?? { minzoom: 1, maxzoom: 8 };

        // Adjust tileMatrixSet if needed
        let urlTemplate = payload.config.urlTemplate;
        if (ZOOM_LIMITS[layer]?.tileMatrixSet) {
          urlTemplate = urlTemplate.replace(
            /GoogleMapsCompatible_Level\d+/,
            ZOOM_LIMITS[layer].tileMatrixSet!
          );
        }

        setConfig({
          ...payload.config,
          urlTemplate,
          minzoom: zoom.minzoom,
          maxzoom: zoom.maxzoom,
        });

        setError(null);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unable to load NASA GIBS config";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void fetchConfig();
  }, []);

  return { config, loading, error };
}
