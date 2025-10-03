import { useMemo, useState } from "react";
import { CityDigitalTwin } from "../CityDigitalTwin";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import {
  Activity,
  Database,
  Droplets,
  Eye,
  EyeOff,
  Layers,
  Leaf,
  Maximize2,
  RefreshCw,
  Settings,
  Star,
  Thermometer,
  Trophy,
  Wind,
} from "lucide-react";

import { useEnvironmentalData } from "../../hooks/useEnvironmentalData";

interface DigitalTwinPageProps {
  onNavigate?: (page: string) => void;
}

const DATA_LAYERS = [
  {
    id: "heat",
    name: "Heat Risk (LST)",
    description: "Land Surface Temperature derived from MODIS/VIIRS",
    source: "NASA MODIS/VIIRS LST",
    icon: <Thermometer className="h-4 w-4 text-red-400" />,
  },
  {
    id: "flood",
    name: "Flood Risk",
    description: "IMERG Final Run precipitation combined with SRTM elevation",
    source: "NASA GPM IMERG + NASA SRTM",
    icon: <Droplets className="h-4 w-4 text-blue-400" />,
  },
  {
    id: "air",
    name: "Air Quality (NO₂)",
    description: "TEMPO NO₂ snapshot with OpenAQ fallback",
    source: "NASA TEMPO",
    icon: <Wind className="h-4 w-4 text-purple-400" />,
  },
  {
    id: "greenness",
    name: "Greenness Index (NDVI)",
    description: "30 m vegetation index from LP DAAC HLS",
    source: "NASA LP DAAC HLS",
    icon: <Leaf className="h-4 w-4 text-green-400" />,
  },
];

export function DigitalTwinPage({ onNavigate }: DigitalTwinPageProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeLayers, setActiveLayers] = useState<string[]>(["heat", "flood", "air", "greenness"]);
  const [greenPoints, setGreenPoints] = useState(120);
  const [userLevel] = useState(3);
  const { data, loading, error, refresh } = useEnvironmentalData();

  const summaryStats = data?.summary?.stats;
  const riskScores = data?.risks;

  const riskCards = useMemo(
    () => [
      {
        id: "heat",
        title: "Heat Risk",
        value: riskScores?.heat_risk ?? null,
        detail: summaryStats ? `${summaryStats.lst_mean.toFixed(1)}°C avg LST` : "Awaiting data",
        tone: "text-red-400",
        icon: <Thermometer className="h-4 w-4" />,
      },
      {
        id: "flood",
        title: "Flood Risk",
        value: riskScores?.flood_risk ?? null,
        detail: summaryStats ? `${summaryStats.precipitation_mean.toFixed(1)} mm/hr precip` : "Awaiting data",
        tone: "text-blue-400",
        icon: <Droplets className="h-4 w-4" />,
      },
      {
        id: "air",
        title: "Air Quality",
        value: riskScores?.air_quality ?? null,
        detail: summaryStats ? `${summaryStats.no2_mean.toFixed(1)} ppb NO₂` : "Awaiting data",
        tone: "text-purple-400",
        icon: <Wind className="h-4 w-4" />,
      },
      {
        id: "green",
        title: "Greenness",
        value: riskScores?.greenness_index ?? null,
        detail: summaryStats ? `${summaryStats.ndvi_mean.toFixed(2)} NDVI` : "Awaiting data",
        tone: "text-green-400",
        icon: <Leaf className="h-4 w-4" />,
      },
    ],
    [riskScores, summaryStats]
  );

  const toggleLayer = (layerId: string) => {
    setActiveLayers((prev) =>
      prev.includes(layerId) ? prev.filter((id) => id !== layerId) : [...prev, layerId]
    );
  };

  return (
    <div className="w-full p-4 lg:p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-orange-500">City Digital Twin</h2>
          <p className="text-sm text-muted-foreground">
            NASA-backed environmental intelligence for the selected neighborhood.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsFullscreen((state) => !state)}>
            <Maximize2 className="mr-2 h-4 w-4" />
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </Button>
          <Button variant="outline" size="sm" onClick={refresh} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh NASA data
          </Button>
          <Button variant="outline" size="sm" onClick={() => onNavigate?.("digital-twin-settings")}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Database className="mr-2 h-4 w-4" />
                Data Sources
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-orange-500" />
                  NASA & Community Data Sources
                </DialogTitle>
                <DialogDescription>
                  OrbitX combines NASA satellite missions with community observations to build an actionable urban microclimate view.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {DATA_LAYERS.map((layer) => (
                  <Card key={layer.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        {layer.icon}
                        {layer.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <p>{layer.description}</p>
                      <div className="font-mono text-xs">Source: {layer.source}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {riskCards.map((card) => (
          <Card key={card.id}>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-2 ${card.tone}`}>
                  {card.icon}
                  <span className="text-sm font-medium">{card.title}</span>
                </div>
                <Badge variant="outline">NASA</Badge>
              </div>
              <div className="text-2xl font-semibold">
                {card.value !== null ? card.value.toFixed(2) : "--"}
              </div>
              <div className="text-xs text-muted-foreground">{card.detail}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {error && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className={`relative ${isFullscreen ? "fixed inset-0 z-50 bg-[#12121e]" : ""}`}>
        <CityDigitalTwin
          onNavigate={onNavigate}
          activeLayers={activeLayers}
          onLayerToggle={toggleLayer}
          onPointsEarned={(points) => setGreenPoints((value) => value + points)}
        />
        {isFullscreen && (
          <Button
            className="absolute right-4 top-4"
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(false)}
          >
            Exit Fullscreen
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Layers className="h-4 w-4 text-orange-400" />
              Active Layers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {DATA_LAYERS.map((layer) => {
              const isActive = activeLayers.includes(layer.id);
              return (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition ${
                    isActive ? "border-orange-500/60 bg-orange-500/10" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {layer.icon}
                    <div>
                      <div className="font-medium">{layer.name}</div>
                      <div className="text-xs text-muted-foreground">{layer.source}</div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </span>
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-green-400" />
              Engagement Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span>Green Points</span>
              <div className="flex items-center gap-2 text-green-400">
                <Star className="h-4 w-4" />
                <span>{greenPoints}</span>
              </div>
            </div>
            <Progress value={greenPoints % 100} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>User Level</span>
              <span>Level {userLevel} • Urban Steward</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
