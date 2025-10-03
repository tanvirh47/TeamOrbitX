import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { 
  Trees, 
  Home, 
  Droplets, 
  Leaf, 
  Mountain, 
  Play, 
  DollarSign,
  Zap,
  Target,
  Thermometer,
  Wind,
  Brain,
  Database
} from 'lucide-react';

interface Intervention {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: 'biophilic' | 'traditional';
  cost: number;
  impact: number;
  selected: boolean;
}

interface InterventionSimulatorProps {
  onOptimizationComplete?: () => void;
  hoveredIntervention?: string | null;
  onInterventionHover?: (intervention: string | null) => void;
  getMicroclimateTip?: (interventionName: string) => any;
}

export function InterventionSimulator({ 
  onOptimizationComplete, 
  hoveredIntervention,
  onInterventionHover,
  getMicroclimateTip 
}: InterventionSimulatorProps) {
  const [budget, setBudget] = useState([500000]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const [interventions, setInterventions] = useState<Intervention[]>([
    { id: 'vertical-gardens', name: 'Vertical Gardens', icon: <Leaf className="h-4 w-4" />, category: 'biophilic', cost: 75000, impact: 85, selected: true },
    { id: 'urban-meadows', name: 'Urban Meadows', icon: <Mountain className="h-4 w-4" />, category: 'biophilic', cost: 120000, impact: 92, selected: true },
    { id: 'permeable-pavements', name: 'Permeable Pavements', icon: <Droplets className="h-4 w-4" />, category: 'biophilic', cost: 95000, impact: 78, selected: false },
    { id: 'street-trees', name: 'Street Trees', icon: <Trees className="h-4 w-4" />, category: 'traditional', cost: 45000, impact: 70, selected: true },
    { id: 'cool-roofs', name: 'Cool Roofs', icon: <Home className="h-4 w-4" />, category: 'traditional', cost: 65000, impact: 65, selected: false },
    { id: 'constructed-wetlands', name: 'Constructed Wetlands', icon: <Droplets className="h-4 w-4" />, category: 'traditional', cost: 180000, impact: 88, selected: false },
  ]);

  const toggleIntervention = (id: string) => {
    setInterventions(interventions.map(intervention => 
      intervention.id === id ? { ...intervention, selected: !intervention.selected } : intervention
    ));
  };

  const selectedInterventions = interventions.filter(i => i.selected);
  const totalCost = selectedInterventions.reduce((sum, i) => sum + i.cost, 0);
  const remainingBudget = budget[0] - totalCost;
  const budgetUtilization = (totalCost / budget[0]) * 100;

  const runOptimization = async () => {
    setIsOptimizing(true);
    // Simulate NSGA-II optimization
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsOptimizing(false);
    onOptimizationComplete?.();
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-orange-500">
          <Target className="h-5 w-5" />
          <span>Intervention Simulator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Budget Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm text-muted-foreground">Project Budget</h4>
            <Badge variant="outline" className="text-orange-500">
              <DollarSign className="h-3 w-3 mr-1" />
              ${budget[0].toLocaleString()}
            </Badge>
          </div>
          <Slider
            value={budget}
            onValueChange={setBudget}
            max={1000000}
            min={100000}
            step={50000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$100K</span>
            <span>$1M</span>
          </div>
        </div>

        {/* Budget Utilization */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Budget Utilization</span>
            <span className={remainingBudget >= 0 ? 'text-green-500' : 'text-red-500'}>
              ${remainingBudget.toLocaleString()} remaining
            </span>
          </div>
          <Progress 
            value={Math.min(budgetUtilization, 100)} 
            className={`h-2 ${budgetUtilization > 100 ? 'bg-red-200' : ''}`}
          />
        </div>

        {/* Biophilic Interventions */}
        <div className="space-y-3">
          <h4 className="text-sm text-green-500 flex items-center space-x-1">
            <Leaf className="h-4 w-4" />
            <span>Biophilic Interventions</span>
          </h4>
          <div className="space-y-2">
            {interventions.filter(i => i.category === 'biophilic').map((intervention) => (
              <TooltipProvider key={intervention.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        intervention.selected 
                          ? 'border-green-500 bg-green-500/10' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => toggleIntervention(intervention.id)}
                      onMouseEnter={() => onInterventionHover?.(intervention.name)}
                      onMouseLeave={() => onInterventionHover?.(null)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="text-green-500">{intervention.icon}</div>
                          <div>
                            <div className="text-sm">{intervention.name}</div>
                            <div className="text-xs text-muted-foreground">
                              Impact Score: {intervention.impact}/100
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">${intervention.cost.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Cost</div>
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    {getMicroclimateTip && (
                      <div className="space-y-2 text-xs">
                        <div className="font-semibold text-orange-500">Microclimate Impact</div>
                        {(() => {
                          const tip = getMicroclimateTip(intervention.name);
                          return (
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Thermometer className="h-3 w-3 text-red-400" />
                                <span>Cooling: {tip.cooling}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Leaf className="h-3 w-3 text-green-400" />
                                <span>Greenness: {tip.greenness}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Wind className="h-3 w-3 text-blue-400" />
                                <span>Air Quality: {tip.airQuality}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Brain className="h-3 w-3 text-purple-400" />
                                <span>Mental Health: {tip.mentalHealth}</span>
                              </div>
                              <div className="pt-1 border-t border-muted-foreground/20">
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Database className="h-2 w-2" />
                                  <span className="text-xs">{tip.dataSource}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {/* Traditional Interventions */}
        <div className="space-y-3">
          <h4 className="text-sm text-orange-500 flex items-center space-x-1">
            <Home className="h-4 w-4" />
            <span>Traditional Interventions</span>
          </h4>
          <div className="space-y-2">
            {interventions.filter(i => i.category === 'traditional').map((intervention) => (
              <TooltipProvider key={intervention.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        intervention.selected 
                          ? 'border-orange-500 bg-orange-500/10' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => toggleIntervention(intervention.id)}
                      onMouseEnter={() => onInterventionHover?.(intervention.name)}
                      onMouseLeave={() => onInterventionHover?.(null)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="text-orange-500">{intervention.icon}</div>
                          <div>
                            <div className="text-sm">{intervention.name}</div>
                            <div className="text-xs text-muted-foreground">
                              Impact Score: {intervention.impact}/100
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">${intervention.cost.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Cost</div>
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    {getMicroclimateTip && (
                      <div className="space-y-2 text-xs">
                        <div className="font-semibold text-orange-500">Microclimate Impact</div>
                        {(() => {
                          const tip = getMicroclimateTip(intervention.name);
                          return (
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Thermometer className="h-3 w-3 text-red-400" />
                                <span>Cooling: {tip.cooling}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Leaf className="h-3 w-3 text-green-400" />
                                <span>Greenness: {tip.greenness}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Wind className="h-3 w-3 text-blue-400" />
                                <span>Air Quality: {tip.airQuality}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Brain className="h-3 w-3 text-purple-400" />
                                <span>Mental Health: {tip.mentalHealth}</span>
                              </div>
                              <div className="pt-1 border-t border-muted-foreground/20">
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Database className="h-2 w-2" />
                                  <span className="text-xs">{tip.dataSource}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {/* Optimization Controls */}
        <div className="space-y-3 pt-4 border-t border-gray-600">
          <Button 
            onClick={runOptimization}
            disabled={isOptimizing || selectedInterventions.length === 0}
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            {isOptimizing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Running NSGA-II Optimization...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Play className="h-4 w-4" />
                <span>Run Optimization</span>
              </div>
            )}
          </Button>
          
          {selectedInterventions.length > 0 && (
            <div className="text-xs text-muted-foreground text-center">
              {selectedInterventions.length} intervention(s) selected • 
              Total Cost: ${totalCost.toLocaleString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}