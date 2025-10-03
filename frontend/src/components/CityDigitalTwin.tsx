import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Polygon,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const { Overlay } = LayersControl;

const dhakaCenter: [number, number] = [23.7419735, 90.4145285];

// Generate a polygon (hexagon around Dhaka)
const makePolygon = (lat: number, lng: number, radius = 0.07, points = 6) => {
  const coords: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    coords.push([lat + radius * Math.cos(angle), lng + radius * Math.sin(angle)]);
  }
  return coords;
};

const riskLayers = [
  {
    name: "Heat Risk",
    value: 0.48,
    display: "31.2°C avg LST",
    color: "red",
  },
  {
    name: "Flood Risk",
    value: 0.44,
    display: "3.9 mm/hr precip",
    color: "blue",
  },
  {
    name: "Air Quality",
    value: 0.51,
    display: "24.5 ppb NO₂",
    color: "orange",
  },
  {
    name: "Greenness",
    value: 0.49,
    display: "0.49 NDVI",
    color: "green",
  },
];

const RiskPolygon: React.FC<{
  color: string;
  baseValue: number;
  display: string;
  name: string;
}> = ({ color, baseValue, display, name }) => {
  const [localRisk, setLocalRisk] = useState(baseValue);

  const coords = makePolygon(dhakaCenter[0], dhakaCenter[1]);

  return (
    <Polygon
      positions={coords}
      pathOptions={{
        color: color,
        fillColor: color,
        fillOpacity: 0.35,
      }}
      eventHandlers={{
        mousemove: (e) => {
          // simulate local variation
          const offset =
            ((e.latlng.lat + e.latlng.lng) % 0.2) - 0.1;
          const riskVal = Math.min(
            1,
            Math.max(0, baseValue + offset)
          );
          setLocalRisk(riskVal);
        },
      }}
    >
      <Tooltip sticky>
        <b>{name}</b> <br />
        Source: NASA <br />
        Risk Index: {localRisk.toFixed(2)} <br />
        {display}
      </Tooltip>
    </Polygon>
  );
};

export const CityDigitalTwin = () => {
  return (
    <MapContainer
      center={dhakaCenter}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LayersControl position="topright">
        {riskLayers.map((risk, idx) => (
          <Overlay key={idx} name={risk.name}>
            <RiskPolygon
              name={risk.name}
              color={risk.color}
              baseValue={risk.value}
              display={risk.display}
            />
          </Overlay>
        ))}
      </LayersControl>
    </MapContainer>
  );
};
