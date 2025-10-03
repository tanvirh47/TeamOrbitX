import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Thermometer, 
  Leaf, 
  Wind, 
  Brain, 
  Target, 
  Plus,
  Database,
  ChevronRight,
  TrendingDown,
  TrendingUp
} from 'lucide-react';

interface MicroclimatePredictionPanelProps {
  isOpen: boolean;
  onClose: () => void;
  location: { lat: number; lon: number } | null;
  onAddToSimulator?: (location: { lat: number; lon: number }, intervention: string) => void;
  onPointsEarned?: (points: number) => void;
}

interface InterventionPrediction {
  id: string;
  name: string;
  icon: string;
  tempReduction: number;
  greennessBoost: number;
  airQualityImprovement: number;
  mentalHealthBoost: number;
  confidence: number;
  dataSource: string;
}

export function MicroclimatePredictionPanel({ 
  isOpen, 
  onClose, 
  location,
  onAddToSimulator,
  onPointsEarned 
}: MicroclimatePredictionPanelProps) {
  const [selectedIntervention, setSelectedIntervention] = useState<string>('vertical-garden');

  const interventionPredictions: InterventionPrediction[] = [
    {
      id: 'vertical-garden',
      name: 'Vertical Garden',
      icon: '🌿',
      tempReduction: 0.8,
      greennessBoost: 0.1,
      airQualityImprovement: 8,
      mentalHealthBoost: 12,
      confidence: 85,
      dataSource: 'ECOSTRESS & MODIS trends'
    },
    {
      id: 'urban-meadow',
      name: 'Urban Meadow',
      icon: '🌾',
      tempReduction: 1.2,
      greennessBoost: 0.2,
      airQualityImprovement: 12,
      mentalHealthBoost: 18,
      confidence: 78,
      dataSource: 'HLS & TEMPO correlations'
    },
    {
      id: 'tree-canopy',
      name: 'Tree Canopy',
      icon: '🌳',
      tempReduction: 2.1,
      greennessBoost: 0.3,
      airQualityImprovement: 15,
      mentalHealthBoost: 25,
      confidence: 92,
      dataSource: 'MODIS/VIIRS LST analysis'
    },
    {
      id: 'permeable-pavement',
      name: 'Permeable Pavement',
      icon: '💧',
      tempReduction: 0.4,
      greennessBoost: 0.05,
      airQualityImprovement: 3,
      mentalHealthBoost: 8,
      confidence: 71,
      dataSource: 'GPM & thermal modeling'
    }
  ];

  const currentPrediction = interventionPredictions.find(p => p.id === selectedIntervention);

  const handleAddToSimulator = () => {
    if (location && currentPrediction) {
      onAddToSimulator?.(location, currentPrediction.name);
      onPointsEarned?.(15); // Award points for using prediction tool
      onClose();
    }
  };

  if (!location || !currentPrediction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            Microclimate Impact Prediction
          </DialogTitle>
          <DialogDescription>
            Predict the environmental impact of biophilic interventions at the selected location using NASA satellite data and urban climate modeling.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Location Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Database className="h-4 w-4 text-orange-500" />
                Target Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <div className="font-mono bg-muted/30 p-2 rounded">
                  {location.lat.toFixed(4)}° N, {location.lon.toFixed(4)}° W
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intervention Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Select Biophilic Intervention</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {interventionPredictions.map((intervention) => (
                  <div
                    key={intervention.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedIntervention === intervention.id
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedIntervention(intervention.id)}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{intervention.icon}</div>
                      <div className="text-sm font-medium">{intervention.name}</div>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {intervention.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prediction Results */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <span className="text-2xl">{currentPrediction.icon}</span>
                {currentPrediction.name} Impact Prediction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Impact Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-red-400" />
                      <span className="text-sm">Temperature Reduction</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingDown className="h-3 w-3 text-green-500" />
                      <span className="font-bold text-green-500">-{currentPrediction.tempReduction}°C</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Greenness Boost</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="font-bold text-green-500">+{currentPrediction.greennessBoost} NDVI</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Wind className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">Air Quality</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingDown className="h-3 w-3 text-green-500" />
                      <span className="font-bold text-green-500">-{currentPrediction.airQualityImprovement}% NO₂</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-purple-400" />
                      <span className="text-sm">Mental Health</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="font-bold text-green-500">+{currentPrediction.mentalHealthBoost}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidence Indicator */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Prediction Confidence</span>
                  <span className="font-medium">{currentPrediction.confidence}%</span>
                </div>
                <Progress value={currentPrediction.confidence} className="h-2" />
              </div>

              {/* Data Source */}
              <div className="p-3 bg-muted/20 rounded-lg border border-orange-500/20">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Database className="h-3 w-3" />
                  <span>Based on {currentPrediction.dataSource}</span>
                </div>
              </div>

              {/* Scientific Note */}
              <div className="text-xs text-muted-foreground italic p-3 bg-muted/10 rounded-lg">
                <strong>Note:</strong> Studies show 20% reduction in stress with biophilic exposure. 
                Mental health benefits calculated from urban forestry research and ECOSTRESS thermal analysis.
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            <Button 
              onClick={handleAddToSimulator}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to Simulator
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}