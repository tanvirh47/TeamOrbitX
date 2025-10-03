import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { 
  MapPin, 
  Thermometer, 
  Wind, 
  Trees, 
  Search, 
  Info,
  TrendingUp,
  Calendar,
  Vote,
  Target,
  Eye
} from 'lucide-react';

interface MyNeighborhoodPageProps {
  onNavigate?: (page: string) => void;
}

export function MyNeighborhoodPage({ onNavigate }: MyNeighborhoodPageProps) {
  const [selectedLayers, setSelectedLayers] = useState({
    heatRisk: true,
    airQuality: false,
    greenSpace: true
  });
  const [showMyReports, setShowMyReports] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(false);

  const riskLayers = [
    {
      id: 'heatRisk',
      name: 'Too Hot?',
      icon: '☀️',
      description: 'Heat Risk',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    },
    {
      id: 'airQuality',
      name: 'Hard to Breathe?',
      icon: '🌫️',
      description: 'Air Quality',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      id: 'greenSpace',
      name: 'No Green Space?',
      icon: '🌳',
      description: 'Greenness Index',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    }
  ];

  const communityReports = [
    { type: 'heat', location: 'Oak St & 5th Ave', time: '2 hrs ago', color: 'bg-orange-500' },
    { type: 'air', location: 'Downtown Park', time: '5 hrs ago', color: 'bg-red-500' },
    { type: 'green', location: 'School District', time: '1 day ago', color: 'bg-green-500' },
    { type: 'heat', location: 'Market Square', time: '2 days ago', color: 'bg-orange-500' }
  ];

  const upcomingInterventions = [
    {
      title: 'Vertical Garden at Downtown Library',
      status: 'Coming Q3!',
      description: 'Living wall installation to reduce heat and improve air quality',
      timeline: '3 months'
    },
    {
      title: 'Urban Meadow at Riverside Lot',
      status: 'Vote now!',
      description: 'Transform vacant lot into pollinator habitat and community space',
      timeline: 'Voting ends in 5 days'
    },
    {
      title: 'Cool Corridor Tree Planting',
      status: 'Starting Soon',
      description: 'Shade trees along Main Street for pedestrian comfort',
      timeline: '2 weeks'
    }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-orange-500 mb-2">
          My Neighborhood
        </h1>
        <p className="text-muted-foreground">
          Explore environmental data and community reports in your area
        </p>
      </div>

      {/* Neighborhood Snapshot Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-orange-500" />
            <h2 className="text-xl font-semibold">📍 Oak St District</h2>
          </div>
          <Badge variant="outline" className="text-orange-500 border-orange-500">
            Your Area
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
            <Thermometer className="h-8 w-8 text-red-400" />
            <div>
              <div className="text-lg font-bold text-red-400">38.2°C</div>
              <div className="text-sm text-muted-foreground">Avg. Surface Temp</div>
              <div className="text-xs text-red-400">↑1.2°C vs city avg</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <Wind className="h-8 w-8 text-purple-400" />
            <div>
              <div className="text-lg font-bold text-purple-400">87</div>
              <div className="text-sm text-muted-foreground">Air Quality Index</div>
              <div className="text-xs text-purple-400">Moderate</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <Trees className="h-8 w-8 text-green-400" />
            <div>
              <div className="text-lg font-bold text-green-400">28%</div>
              <div className="text-sm text-muted-foreground">Green Cover</div>
              <div className="text-xs text-green-400">Low</div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-medium mb-3">Upcoming Interventions:</h3>
          <div className="space-y-2">
            {upcomingInterventions.map((intervention, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">{intervention.title}</div>
                  <div className="text-xs text-muted-foreground">{intervention.description}</div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      intervention.status === 'Vote now!' 
                        ? 'text-orange-500 border-orange-500' 
                        : 'text-green-500 border-green-500'
                    }`}
                  >
                    {intervention.status}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">{intervention.timeline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button 
          onClick={() => setMapExpanded(true)}
          className="w-full bg-orange-500 hover:bg-orange-600"
        >
          <Search className="h-4 w-4 mr-2" />
           Explore My Area
        </Button>
      </Card>

      {/* Risk Layers Toggle */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h3 className="font-medium">Environmental Layers</h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Switch
              id="my-reports"
              checked={showMyReports}
              onCheckedChange={setShowMyReports}
            />
            <Label htmlFor="my-reports" className="text-sm whitespace-nowrap">My Reports</Label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {riskLayers.map((layer) => (
            <div key={layer.id} className={`p-3 rounded-lg border ${layer.bgColor} ${layer.borderColor}`}>
              <div className="flex items-start justify-between mb-2 gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-lg flex-shrink-0">{layer.icon}</span>
                  <span className="font-medium text-sm truncate">{layer.name}</span>
                </div>
                <Switch
                  checked={selectedLayers[layer.id as keyof typeof selectedLayers]}
                  onCheckedChange={(checked) =>
                    setSelectedLayers(prev => ({ ...prev, [layer.id]: checked }))
                  }
                  className="flex-shrink-0"
                />
              </div>
              <div className={`text-xs ${layer.color} leading-relaxed`}>{layer.description}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Interactive Map Preview */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Your Neighborhood Map</h3>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pin colors: 🔸 Heat stress 🔴 Air pollution 🟢 Green space request</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Simplified map representation */}
        <div className="relative h-64 bg-muted/20 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-red-500/20"></div>
          
          {/* Community hotspot pins */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-6 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-6 left-8 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
          
          {/* Current location */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
            <div className="text-xs text-blue-500 font-medium mt-1 text-center">You</div>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3">
              <div className="text-sm font-medium mb-1">Recent Community Reports</div>
              <div className="flex flex-wrap gap-1">
                {communityReports.slice(0, 3).map((report, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs">
                    <div className={`w-2 h-2 ${report.color} rounded-full`}></div>
                    <span className="text-muted-foreground">{report.location}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate?.('submit-report')}
            className="flex-1 text-sm"
          >
            <span className="mr-2">📝</span>
            <span>Report Issue</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate?.('vote-proposals')}
            className="flex-1 text-sm"
          >
            <span className="mr-2">🗳️</span>
            <span>Vote on Ideas</span>
          </Button>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button
          variant="outline"
          className="h-16 sm:h-20 flex-col gap-1 sm:gap-2 p-2"
          onClick={() => onNavigate?.('submit-report')}
        >
          <span className="text-lg">📝</span>
          <span className="text-xs text-center leading-tight">Submit Report</span>
        </Button>
        <Button
          variant="outline"
          className="h-16 sm:h-20 flex-col gap-1 sm:gap-2 p-2"
          onClick={() => onNavigate?.('vote-proposals')}
        >
          <span className="text-lg">🗳️</span>
          <span className="text-xs text-center leading-tight">Vote</span>
        </Button>
        <Button
          variant="outline"
          className="h-16 sm:h-20 flex-col gap-1 sm:gap-2 p-2"
          onClick={() => onNavigate?.('my-impact')}
        >
          <span className="text-lg">⭐</span>
          <span className="text-xs text-center leading-tight">My Impact</span>
        </Button>
        <Button
          variant="outline"
          className="h-16 sm:h-20 flex-col gap-1 sm:gap-2 p-2"
          onClick={() => onNavigate?.('city-updates')}
        >
          <span className="text-lg">📰</span>
          <span className="text-xs text-center leading-tight">Updates</span>
        </Button>
      </div>

      {/* Expanded Map Modal */}
      <Dialog open={mapExpanded} onOpenChange={setMapExpanded}>
        <DialogContent className="w-[95vw] max-w-4xl h-[90vh] max-h-[90vh] p-4 sm:p-6">
          <DialogHeader className="pb-4">
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 flex-shrink-0" />
              <span className="truncate">Oak St District - Full Map View</span>
            </DialogTitle>
            <DialogDescription className="text-sm">
              Interactive neighborhood map with environmental layers and community report pins
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 min-h-0 space-y-4">
            {/* Map Area */}
            <div className="h-64 sm:h-80 md:h-96 bg-muted/20 rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground px-4">
                <Eye className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm sm:text-base">Interactive neighborhood map with zoom controls</p>
                <p className="text-xs sm:text-sm mt-1">Environmental layers and community pins</p>
              </div>
            </div>
            
            {/* Layer Controls */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Map Layers</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm h-9 sm:h-10">
                  <span className="mr-1">🌡️</span>
                  <span className="hidden sm:inline"></span>Heat Risk
                </Button>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm h-9 sm:h-10">
                  <span className="mr-1">🌫️</span>
                  <span className="hidden sm:inline"></span>Air Quality
                </Button>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm h-9 sm:h-10">
                  <span className="mr-1">🌳</span>
                  <span className="hidden sm:inline"></span>Green Space
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}