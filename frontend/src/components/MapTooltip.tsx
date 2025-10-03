import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Thermometer, Wind, Trees, MapPin, Zap } from 'lucide-react';

interface MapTooltipProps {
  x: number;
  y: number;
  data: {
    lat: number;
    lon: number;
    lst: number;
    aqi: number;
    ndvi: number;
    reports: number;
  };
  onPredictImpact: () => void;
  onClose: () => void;
}

export function MapTooltip({ x, y, data, onPredictImpact, onClose }: MapTooltipProps) {
  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { text: 'Good', color: 'bg-green-500' };
    if (aqi <= 100) return { text: 'Moderate', color: 'bg-yellow-500' };
    if (aqi <= 150) return { text: 'Unhealthy', color: 'bg-orange-500' };
    return { text: 'Hazardous', color: 'bg-red-500' };
  };

  const aqiStatus = getAQIStatus(data.aqi);

  return (
    <div 
      className="fixed z-50 pointer-events-auto"
      style={{ 
        left: x + 10, 
        top: y - 10,
        transform: 'translateY(-100%)'
      }}
    >
      <Card className="w-64 bg-card/95 backdrop-blur-sm border border-white/20 shadow-xl">
        <CardContent className="p-4 space-y-3">
          {/* Location Coordinates */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Location</span>
            </div>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              ✕
            </button>
          </div>
          <div className="text-xs text-muted-foreground">
            {data.lat.toFixed(4)}°N, {data.lon.toFixed(4)}°W
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* LST */}
            <div className="space-y-1">
              <div className="flex items-center space-x-1">
                <Thermometer className="h-3 w-3 text-red-500" />
                <span className="text-xs font-medium">LST</span>
              </div>
              <div className="text-lg font-bold text-red-500">{data.lst}°C</div>
            </div>

            {/* AQI */}
            <div className="space-y-1">
              <div className="flex items-center space-x-1">
                <Wind className="h-3 w-3 text-blue-500" />
                <span className="text-xs font-medium">AQI</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">{data.aqi}</span>
                <Badge className={`text-xs ${aqiStatus.color} text-white`}>
                  {aqiStatus.text}
                </Badge>
              </div>
            </div>

            {/* NDVI */}
            <div className="space-y-1">
              <div className="flex items-center space-x-1">
                <Trees className="h-3 w-3 text-green-500" />
                <span className="text-xs font-medium">NDVI</span>
              </div>
              <div className="text-lg font-bold text-green-500">{data.ndvi.toFixed(2)}</div>
            </div>

            {/* Community Reports */}
            <div className="space-y-1">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3 text-orange-500" />
                <span className="text-xs font-medium">Reports</span>
              </div>
              <div className="text-lg font-bold text-orange-500">{data.reports}</div>
            </div>
          </div>

          {/* Predict Impact Button */}
          <Button 
            onClick={onPredictImpact}
            size="sm" 
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            <Zap className="h-3 w-3 mr-2" />
            Predict Impact
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}