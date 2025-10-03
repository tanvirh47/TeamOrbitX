import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  Leaf, 
  Users, 
  Thermometer,
  Brain,
  Home,
  Zap,
  DollarSign,
  Info,
  Target
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const kpiData = {
  current: [
    { 
      name: 'Total Risk Reduction', 
      value: 73, 
      change: 12, 
      icon: Shield, 
      color: 'text-green-500',
      source: 'MODIS/VIIRS LST + GPM IMERG precipitation'
    },
    { 
      name: 'Biodiversity Index', 
      value: 85, 
      change: 8, 
      icon: Leaf, 
      color: 'text-green-500',
      source: 'HLS NDVI (30m resolution)'
    },
    { 
      name: 'Community Engagement', 
      value: 62, 
      change: -3, 
      icon: Users, 
      color: 'text-orange-500',
      source: 'Community surveys and participation data'
    },
    { 
      name: 'Avg LST Reduction', 
      value: 4.2, 
      change: 1.1, 
      icon: Thermometer, 
      color: 'text-blue-500', 
      unit: '°C',
      source: 'ECOSTRESS plant temperature data'
    },
  ],
  optimized: [
    { 
      name: 'Total Risk Reduction', 
      value: 89, 
      change: 28, 
      icon: Shield, 
      color: 'text-green-500',
      source: 'MODIS/VIIRS LST + GPM IMERG precipitation'
    },
    { 
      name: 'Biodiversity Index', 
      value: 94, 
      change: 17, 
      icon: Leaf, 
      color: 'text-green-500',
      source: 'HLS NDVI (30m resolution)'
    },
    { 
      name: 'Community Engagement', 
      value: 86, 
      change: 21, 
      icon: Users, 
      color: 'text-orange-500',
      source: 'Community surveys and participation data'
    },
    { 
      name: 'Avg LST Reduction', 
      value: 5.6, 
      change: 2.5, 
      icon: Thermometer, 
      color: 'text-blue-500', 
      unit: '°C',
      source: 'ECOSTRESS plant temperature data'
    },
  ]
};

const roiData = {
  current: [
    { year: 2024, roi: 0, npv: -500000 },
    { year: 2025, roi: 8, npv: -420000 },
    { year: 2026, roi: 15, npv: -280000 },
    { year: 2027, roi: 22, npv: -120000 },
    { year: 2028, roi: 32, npv: 50000 },
    { year: 2030, roi: 45, npv: 280000 },
    { year: 2035, roi: 78, npv: 890000 },
    { year: 2039, roi: 120, npv: 1450000 },
  ],
  optimized: [
    { year: 2024, roi: 0, npv: -650000 },
    { year: 2025, roi: 12, npv: -480000 },
    { year: 2026, roi: 24, npv: -280000 },
    { year: 2027, roi: 38, npv: -80000 },
    { year: 2028, roi: 52, npv: 150000 },
    { year: 2030, roi: 78, npv: 450000 },
    { year: 2035, roi: 125, npv: 1240000 },
    { year: 2039, roi: 180, npv: 2100000 },
  ]
};

const benefitsData = {
  current: [
    { name: 'Mental Health Savings', value: 320000, color: '#4CAF50' },
    { name: 'Property Value Increase', value: 480000, color: '#ff6600' },
    { name: 'Energy Savings', value: 210000, color: '#22d3ee' },
    { name: 'Flood Damage Reduction', value: 650000, color: '#a855f7' },
  ],
  optimized: [
    { name: 'Mental Health Savings', value: 485000, color: '#4CAF50' },
    { name: 'Property Value Increase', value: 720000, color: '#ff6600' },
    { name: 'Energy Savings', value: 340000, color: '#22d3ee' },
    { name: 'Flood Damage Reduction', value: 980000, color: '#a855f7' },
  ]
};

interface MetricsPanelProps {
  scenario?: 'current' | 'optimized';
  onNavigate?: (page: string) => void;
}

export function MetricsPanel({ scenario = 'current', onNavigate }: MetricsPanelProps) {
  const currentKpiData = kpiData[scenario];
  const currentRoiData = roiData[scenario];
  const currentBenefitsData = benefitsData[scenario];
  const totalBenefits = currentBenefitsData.reduce((sum, benefit) => sum + benefit.value, 0);
  const roiValue = scenario === 'current' ? 120 : 180;
  const breakEven = scenario === 'current' ? 5 : 4;
  return (
    <div className="space-y-6">
      {/* Enhanced KPI Cards with NASA Data Tooltips */}
      <div className="grid grid-cols-2 gap-4">
        {currentKpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${kpi.color}`} />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs space-y-1">
                            <div className="font-semibold">{kpi.name}</div>
                            <div>Data Source: {kpi.source}</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Badge variant={kpi.change >= 0 ? 'default' : 'destructive'} className="text-xs">
                    {kpi.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {Math.abs(kpi.change)}{kpi.unit || '%'}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    {kpi.value}{kpi.unit || '%'}
                  </div>
                  <div className="text-xs text-muted-foreground">{kpi.name}</div>
                  <Progress value={kpi.unit ? (kpi.value / 10) * 100 : kpi.value} className="h-1" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Cost-Benefit Analysis */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-orange-500">
            <TrendingUp className="h-5 w-5" />
            <span>ROI & NPV Analysis (15 Years)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentRoiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a2e', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="roi" 
                  stroke={scenario === 'current' ? '#ff6600' : '#4CAF50'} 
                  strokeWidth={2}
                  dot={{ fill: scenario === 'current' ? '#ff6600' : '#4CAF50', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className={`${scenario === 'current' ? 'text-orange-500' : 'text-green-500'} font-bold`}>15-Year ROI</div>
              <div className="text-xl">{roiValue}%</div>
            </div>
            <div className="text-center">
              <div className="text-green-500 font-bold">Break-even</div>
              <div className="text-xl">Year {breakEven}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quantified Benefits */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-green-500">
            <DollarSign className="h-5 w-5" />
            <span>Quantified Benefits</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Enhanced Benefits Breakdown */}
            <div className="space-y-3">
              {[
                { icon: Brain, label: 'Mental Health Savings', value: `${(currentBenefitsData[0].value / 1000).toFixed(0)}K`, color: 'text-green-500' },
                { icon: Home, label: 'Property Value Increase', value: `${(currentBenefitsData[1].value / 1000).toFixed(0)}K`, color: 'text-green-500' },
                { icon: Zap, label: 'Energy Savings', value: `${(currentBenefitsData[2].value / 1000).toFixed(0)}K`, color: 'text-green-500' },
                { icon: Shield, label: 'Flood Damage Reduction', value: `${(currentBenefitsData[3].value / 1000).toFixed(0)}K`, color: 'text-green-500' },
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-4 w-4 ${benefit.color}`} />
                      <span className="text-sm">{benefit.label}</span>
                    </div>
                    <span className="font-bold text-green-500">{benefit.value}</span>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Total Benefits with Navigation */}
            <div className="pt-3 border-t border-gray-600">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg">Total Annual Benefits</span>
                <span className="text-xl font-bold text-green-500">${(totalBenefits / 1000000).toFixed(2)}M</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  Benefit-to-Cost Ratio: {scenario === 'current' ? '3.2:1' : '4.8:1'}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onNavigate?.('simulator')}
                  className="text-xs"
                >
                  <Target className="h-3 w-3 mr-1" />
                  View Scenario Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Impact Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-green-500">
            <Leaf className="h-5 w-5" />
            <span>Environmental Impact</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-500">85%</div>
              <div className="text-xs text-muted-foreground">Air Quality Improvement</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">12K</div>
              <div className="text-xs text-muted-foreground">Tons CO₂ Sequestered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-500">450</div>
              <div className="text-xs text-muted-foreground">Species Supported</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">-4.2°C</div>
              <div className="text-xs text-muted-foreground">Heat Island Reduction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}