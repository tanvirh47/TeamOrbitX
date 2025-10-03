import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRiskLayers } from "../hooks/useRiskLayers";

interface DigitalTwinMapProps {
  gibsConfig: {
    urlTemplate: string;
    attribution: string;
    minzoom: number;
    maxzoom: number;
  } | null;
  userLocation: { lat: number; lon: number };  // Default Dhaka: { lat: 23.81, lon: 90.41 }
  disabled?: boolean;
}

export function DigitalTwinMap({ gibsConfig, userLocation = { lat: 23.81, lon: 90.41 }, disabled }: DigitalTwinMapProps) {
  useEffect(() => {
    console.log("GIBS config:", gibsConfig);
  }, [gibsConfig]);

  const { configs: riskConfigs, loading: riskLoading, error: riskError } = useRiskLayers();

  if (riskError) {
    console.warn("Risk layers error:", riskError);
  }

  const hasGibs = !!gibsConfig;

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lon]}
      zoom={10}  // Closer zoom for city view
      minZoom={5}
      maxZoom={18}
      style={{ height: "100%", width: "100%" }}
      dragging={!disabled}
      zoomControl={!disabled}
      scrollWheelZoom={!disabled}
    >
      <LayersControl position="topright">
        {/* Base Layer: GIBS Satellite or OSM Fallback */}
        <LayersControl.Base name="NASA GIBS Satellite" checked={hasGibs}>
          {hasGibs && (
            <TileLayer
              url={gibsConfig.urlTemplate}
              attribution={gibsConfig.attribution}
            />
          )}
        </LayersControl.Base>
        {!hasGibs && (
          <LayersControl.Base name="OpenStreetMap (Fallback)" checked>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.Base>
        )}

        {/* Risk Overlays */}
        {riskConfigs?.map((riskConfig) => (
          <LayersControl.Overlay key={riskConfig.layer} name={`${riskConfig.layer.charAt(0).toUpperCase() + riskConfig.layer.slice(1)} Risk`}>
            <TileLayer
              url={riskConfig.urlTemplate}
              attribution={riskConfig.attribution}
              opacity={riskConfig.opacity}
              minZoom={riskConfig.minzoom}
              maxZoom={riskConfig.maxzoom}
            />
          </LayersControl.Overlay>
        )) || null}
      </LayersControl>

      <Marker position={[userLocation.lat, userLocation.lon]}>
        <Popup>Your location in Dhaka</Popup>
      </Marker>

      {riskLoading && (
        <div className="leaflet-control-container absolute top-4 left-4 z-[1000] bg-black bg-opacity-50 text-white p-2 rounded">
          Loading risk overlays...
        </div>
      )}
      {!hasGibs && (
        <div className="leaflet-control-container absolute top-4 right-4 z-[1000] bg-yellow-500 text-black p-2 rounded">
          GIBS failed—using OSM fallback. Check backend.
        </div>
      )}
    </MapContainer>
  );
}