import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Thermometer, 
  Wind, 
  Trees, 
  Droplets, 
  Users, 
  Flower2,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

interface KPIData {
  id: string;
  title: string;
  value: string;
  unit: string;
  change: number;
  status: 'good' | 'warning' | 'danger';
  icon: React.ReactNode;
}

interface KPISummaryCardsProps {
  onCardClick: (kpiId: string) => void;
}

export function KPISummaryCards({ onCardClick }: KPISummaryCardsProps) {
  const kpiData: KPIData[] = [
    {
      id: 'temperature',
      title: 'Avg. Surface Temp',
      value: '28.4',
      unit: '°C',
      change: -1.2,
      status: 'good',
      icon: <Thermometer className="h-5 w-5" />
    },
    {
      id: 'air-quality',
      title: 'Air Quality Index',
      value: '87',
      unit: 'AQI',
      change: -5,
      status: 'warning',
      icon: <Wind className="h-5 w-5" />
    },
    {
      id: 'green-cover',
      title: 'Green Cover',
      value: '34.2',
      unit: '%',
      change: 2.8,
      status: 'good',
      icon: <Trees className="h-5 w-5" />
    },
    {
      id: 'flood-risk',
      title: 'Flood Risk Zones',
      value: '7',
      unit: 'areas',
      change: 0,
      status: 'warning',
      icon: <Droplets className="h-5 w-5" />
    },
    {
      id: 'community-reports',
      title: 'Community Reports',
      value: '23',
      unit: 'new',
      change: 8,
      status: 'danger',
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 'biodiversity',
      title: 'Biodiversity Score',
      value: '7.8',
      unit: '/10',
      change: 0.4,
      status: 'good',
      icon: <Flower2 className="h-5 w-5" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-500';
      case 'warning': return 'text-orange-500';
      case 'danger': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3" />;
    if (change < 0) return <TrendingDown className="h-3 w-3" />;
    return <Minus className="h-3 w-3" />;
  };

  const getTrendColor = (change: number, isPositiveGood: boolean = true) => {
    if (change === 0) return 'text-muted-foreground';
    const isGood = isPositiveGood ? change > 0 : change < 0;
    return isGood ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpiData.map((kpi) => (
        <Card 
          key={kpi.id} 
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => onCardClick(kpi.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={getStatusColor(kpi.status)}>
                {kpi.icon}
              </div>
              <Badge 
                variant="outline" 
                className={`text-xs ${getTrendColor(
                  kpi.change, 
                  kpi.id === 'temperature' || kpi.id === 'air-quality' || kpi.id === 'community-reports' ? false : true
                )}`}
              >
                {getTrendIcon(kpi.change)}
                {Math.abs(kpi.change)}{kpi.id === 'temperature' ? '°C' : kpi.id === 'biodiversity' ? '' : kpi.unit === '%' ? '%' : ''}
              </Badge>
            </div>
            
            <div className="space-y-1">
              <div className="text-2xl font-bold">
                {kpi.value}
                <span className="text-sm text-muted-foreground ml-1">{kpi.unit}</span>
              </div>
              <div className="text-xs text-muted-foreground line-clamp-2">
                {kpi.title}
              </div>
            </div>

            {/* Status indicator */}
            <div className="mt-2">
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    kpi.status === 'good' ? 'bg-green-500' :
                    kpi.status === 'warning' ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ 
                    width: kpi.status === 'good' ? '75%' : 
                           kpi.status === 'warning' ? '50%' : '25%' 
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}