import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Info } from 'lucide-react';

interface LayerInfo {
  source: string;
  frequency: string;
  method: string;
}

interface LayerInfoTooltipProps {
  layerId: string;
  className?: string;
}

export function LayerInfoTooltip({ layerId, className = "" }: LayerInfoTooltipProps) {
  const layerInfoMap: Record<string, LayerInfo> = {
    heat: {
      source: "MODIS LST Terra/Aqua",
      frequency: "Daily (1km resolution)",
      method: "Land Surface Temperature derived from thermal infrared sensors"
    },
    flood: {
      source: "GPM IMERG + SRTM DEM",
      frequency: "Real-time (30min)",
      method: "Precipitation accumulation + topographic flow modeling"
    },
    air: {
      source: "TEMPO NO₂/O₃ Satellite",
      frequency: "Hourly (2.1km resolution)",
      method: "Tropospheric column density measurements"
    },
    green: {
      source: "Landsat 8/9 OLI",
      frequency: "Bi-weekly (30m resolution)",
      method: "NDVI = (NIR - Red) / (NIR + Red)"
    },
    community: {
      source: "Crowdsourced Reports API",
      frequency: "Real-time",
      method: "Geotagged community submissions with ML sentiment analysis"
    }
  };

  const info = layerInfoMap[layerId];

  if (!info) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className={`text-muted-foreground hover:text-foreground transition-colors ${className}`}>
            <Info className="h-3 w-3" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-sm">
          <div className="space-y-2">
            <div>
              <span className="text-xs font-medium text-orange-500">Data Source:</span>
              <p className="text-xs">{info.source}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-green-500">Update Frequency:</span>
              <p className="text-xs">{info.frequency}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-blue-500">Method:</span>
              <p className="text-xs">{info.method}</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}