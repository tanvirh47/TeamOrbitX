import { MetricsPanel } from '../MetricsPanel';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  TrendingUp, 
  Clock, 
  Download, 
  Share, 
  Filter, 
  RefreshCw, 
  BarChart3, 
  PieChart, 
  Activity,
  GitCompare,
  SplitSquareHorizontal,
  Info,
  FileText,
  FileSpreadsheet,
  FileImage,
  FileCode,
  Presentation,
  Target,
  Eye,
  Database,
  Brain,
  Home,
  Zap,
  Shield,
  MapPin,
  ArrowRight,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

interface MetricsPageProps {
  onNavigate?: (page: string) => void;
}

export function MetricsPage({ onNavigate }: MetricsPageProps = {}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentScenario, setCurrentScenario] = useState<'current' | 'optimized'>('current');
  const [showSideBySide, setShowSideBySide] = useState(false);
  const [showAnnualData, setShowAnnualData] = useState(false);
  const [showPolicyBrief, setShowPolicyBrief] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  // Scenario data
  const scenarioData = {
    current: {
      stats: [
        { label: 'Projects Active', value: '12', change: '+2', color: 'text-green-500' },
        { label: 'Risk Reduction', value: '23%', change: '+5%', color: 'text-blue-500' },
        { label: 'Community Score', value: '87', change: '+3', color: 'text-orange-500' },
        { label: 'Cost Savings', value: '$2.4M', change: '+12%', color: 'text-purple-500' },
      ],
      roi: 120,
      breakeven: 5,
      totalBenefits: '$1.66M'
    },
    optimized: {
      stats: [
        { label: 'Projects Active', value: '18', change: '+8', color: 'text-green-500' },
        { label: 'Risk Reduction', value: '34%', change: '+16%', color: 'text-blue-500' },
        { label: 'Community Score', value: '92', change: '+8', color: 'text-orange-500' },
        { label: 'Cost Savings', value: '$3.8M', change: '+70%', color: 'text-purple-500' },
      ],
      roi: 180,
      breakeven: 4,
      totalBenefits: '$2.52M'
    }
  };

  const quickStats = scenarioData[currentScenario].stats;

  // 15-year trend data
  const trendData = [
    { year: 1, currentLST: 0.5, optimizedLST: 0.8, currentBio: 50, optimizedBio: 55 },
    { year: 2, currentLST: 1.2, optimizedLST: 1.8, currentBio: 55, optimizedBio: 62 },
    { year: 3, currentLST: 1.8, optimizedLST: 2.4, currentBio: 58, optimizedBio: 68 },
    { year: 4, currentLST: 2.3, optimizedLST: 3.1, currentBio: 62, optimizedBio: 74 },
    { year: 5, currentLST: 2.8, optimizedLST: 3.7, currentBio: 65, optimizedBio: 78 },
    { year: 7, currentLST: 3.2, optimizedLST: 4.2, currentBio: 70, optimizedBio: 83 },
    { year: 10, currentLST: 3.8, optimizedLST: 4.9, currentBio: 75, optimizedBio: 88 },
    { year: 12, currentLST: 4.0, optimizedLST: 5.2, currentBio: 78, optimizedBio: 90 },
    { year: 15, currentLST: 4.2, optimizedLST: 5.6, currentBio: 82, optimizedBio: 94 }
  ];

  // Benefits breakdown table data
  const benefitsTableData = [
    {
      type: 'Mental Health Savings',
      value: '$320K',
      source: 'WHO / Urban Studies',
      timeframe: '15 years',
      icon: Brain
    },
    {
      type: 'Property Value Increase',
      value: '$480K',
      source: 'Urban Economics Journal',
      timeframe: '10 years',
      icon: Home
    },
    {
      type: 'Energy Savings',
      value: '$210K',
      source: 'DOE Energy Reports',
      timeframe: '15 years',
      icon: Zap
    },
    {
      type: 'Flood Damage Reduction',
      value: '$650K',
      source: 'FEMA Reports',
      timeframe: '15 years',
      icon: Shield
    }
  ];

  // NASA data source tooltips
  const nasaDataSources = {
    riskReduction: 'MODIS/VIIRS LST + GPM IMERG precipitation',
    airQuality: 'TEMPO NO₂/O₃ (hourly, neighborhood-scale)',
    greenness: 'HLS NDVI (30m resolution)',
    floodZones: 'SRTM elevation + GPM IMERG',
    heatReduction: 'ECOSTRESS plant temperature data'
  };

  return (
    <div className="p-4 sm:p-6 h-full">
      <div className="max-w-7xl mx-auto h-full">
        {/* Enhanced header with scenario toggle */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-orange-500 mb-2">Performance Metrics</h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Comprehensive KPI tracking and environmental impact assessment for data-driven decisions.
                </p>
              </div>
              
              {/* Enhanced Export Options */}
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline ml-2">Refresh</span>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline ml-2">Export</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Export Performance Metrics</DialogTitle>
                      <DialogDescription>
                        Choose your preferred export format for presentations, analysis, or reporting.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="flex items-center gap-2" onClick={() => console.log('Export PNG')}>
                        <FileImage className="h-4 w-4" />
                        Export as PNG
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2" onClick={() => console.log('Export SVG')}>
                        <FileImage className="h-4 w-4" />
                        Export as SVG
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2" onClick={() => console.log('Export JSON')}>
                        <FileCode className="h-4 w-4" />
                        Export as JSON
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2" onClick={() => console.log('Export PowerPoint')}>
                        <Presentation className="h-4 w-4" />
                        Export PowerPoint
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2" onClick={() => console.log('Export CSV')}>
                        <FileSpreadsheet className="h-4 w-4" />
                        Export as CSV
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2" onClick={() => console.log('Export PDF')}>
                        <FileText className="h-4 w-4" />
                        Export as PDF
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Scenario Comparison Toggle */}
            <Card className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <GitCompare className="h-5 w-5 text-orange-500" />
                    <Label htmlFor="scenario-toggle" className="text-sm font-medium">
                      Scenario Analysis:
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Label 
                      htmlFor="scenario-toggle" 
                      className={`text-sm cursor-pointer ${currentScenario === 'current' ? 'text-orange-500 font-medium' : 'text-muted-foreground'}`}
                    >
                      Current Plan
                    </Label>
                    <Switch
                      id="scenario-toggle"
                      checked={currentScenario === 'optimized'}
                      onCheckedChange={(checked) => setCurrentScenario(checked ? 'optimized' : 'current')}
                    />
                    <Label 
                      htmlFor="scenario-toggle" 
                      className={`text-sm cursor-pointer ${currentScenario === 'optimized' ? 'text-green-500 font-medium' : 'text-muted-foreground'}`}
                    >
                      Optimized Plan
                    </Label>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowSideBySide(!showSideBySide)}
                    className={showSideBySide ? 'bg-orange-500/10 border-orange-500' : ''}
                  >
                    <SplitSquareHorizontal className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">Compare Side-by-Side</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onNavigate?.('simulator')}
                  >
                    <Target className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">Go to Simulator</span>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Enhanced Quick Stats with NASA Data Tooltips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {quickStats.map((stat, index) => (
                <Card key={index} className="p-3 sm:p-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <div className={`text-lg sm:text-xl font-bold ${stat.color}`}>
                        {stat.value}
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-xs space-y-1">
                              <div className="font-semibold">{stat.label}</div>
                              <div>Data Source: {
                                stat.label.includes('Risk') ? nasaDataSources.riskReduction :
                                stat.label.includes('Community') ? 'Community engagement surveys' :
                                stat.label.includes('Cost') ? 'Economic impact modeling' :
                                nasaDataSources.airQuality
                              }</div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {stat.label}
                    </div>
                    <Badge variant="outline" className="text-xs text-green-500 border-green-500/30">
                      {stat.change}
                    </Badge>
                    {currentScenario === 'optimized' && (
                      <Badge variant="outline" className="text-xs text-orange-500 border-orange-500/30 ml-1">
                        Optimized
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile-optimized tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100vh-280px)] sm:h-[calc(100vh-320px)]">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              <BarChart3 className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs sm:text-sm">
              <PieChart className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="realtime" className="text-xs sm:text-sm">
              <Activity className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Real-time</span>
            </TabsTrigger>
            <TabsTrigger value="quality" className="text-xs sm:text-sm hidden lg:flex lg:items-center">
              <TrendingUp className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Quality</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="h-full">
            <div className="space-y-6">
              {/* Main Metrics Panel */}
              {showSideBySide ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white flex items-center gap-2">
                        Current Plan
                        <Badge variant="outline" className="text-orange-500 border-orange-500">
                          Baseline
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-[600px] overflow-y-auto">
                      <MetricsPanel scenario="current" onNavigate={onNavigate} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white flex items-center gap-2">
                        Optimized Plan
                        <Badge variant="outline" className="text-green-500 border-green-500">
                          Enhanced
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-[600px] overflow-y-auto">
                      <MetricsPanel scenario="optimized" onNavigate={onNavigate} />
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white flex items-center gap-2">
                      Key Performance Indicators
                      <Badge variant="outline" className={currentScenario === 'current' ? 'text-orange-500 border-orange-500' : 'text-green-500 border-green-500'}>
                        {currentScenario === 'current' ? 'Current Plan' : 'Optimized Plan'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <MetricsPanel scenario={currentScenario} onNavigate={onNavigate} />
                  </CardContent>
                </Card>
              )}

              {/* 15-Year Trend Chart */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-orange-500">
                      <TrendingUp className="h-5 w-5" />
                      <span>15-Year Environmental Trends</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="annual-data"
                        checked={showAnnualData}
                        onCheckedChange={setShowAnnualData}
                      />
                      <Label htmlFor="annual-data" className="text-sm">Show Annual Data</Label>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={showAnnualData ? trendData : trendData.filter((_, i) => i % 2 === 0)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="year" 
                          stroke="#9ca3af" 
                          fontSize={12}
                          label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis 
                          stroke="#9ca3af" 
                          fontSize={12}
                          label={{ value: '°C / Index Score', angle: -90, position: 'insideLeft' }}
                        />
                        <RechartsTooltip 
                          contentStyle={{ 
                            backgroundColor: '#1a1a2e', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="currentLST" 
                          stroke="#ff6600" 
                          strokeWidth={2}
                          name="Current LST Reduction (°C)"
                          dot={{ fill: '#ff6600', strokeWidth: 2, r: 3 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="optimizedLST" 
                          stroke="#4CAF50" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          name="Optimized LST Reduction (°C)"
                          dot={{ fill: '#4CAF50', strokeWidth: 2, r: 3 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="currentBio" 
                          stroke="#a855f7" 
                          strokeWidth={2}
                          name="Current Biodiversity Index"
                          dot={{ fill: '#a855f7', strokeWidth: 2, r: 3 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="optimizedBio" 
                          stroke="#22d3ee" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          name="Optimized Biodiversity Index"
                          dot={{ fill: '#22d3ee', strokeWidth: 2, r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-orange-500 font-bold">Current LST</div>
                      <div className="text-lg">-4.2°C by Year 15</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-500 font-bold">Optimized LST</div>
                      <div className="text-lg">-5.6°C by Year 15</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-500 font-bold">Current Bio</div>
                      <div className="text-lg">82 Index Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-cyan-500 font-bold">Optimized Bio</div>
                      <div className="text-lg">94 Index Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefit Breakdown Table */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-green-500">
                      <FileSpreadsheet className="h-5 w-5" />
                      <span>Benefit Breakdown Analysis</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => console.log('Download table')}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Table
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Benefit Type</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Timeframe</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {benefitsTableData.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                          <TableRow key={index}>
                            <TableCell className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-green-500" />
                              {benefit.type}
                            </TableCell>
                            <TableCell className="font-medium text-green-500">{benefit.value}</TableCell>
                            <TableCell className="text-muted-foreground">{benefit.source}</TableCell>
                            <TableCell>{benefit.timeframe}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Policy Brief Summary Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-purple-500">
                      <FileText className="h-5 w-5" />
                      <span>Executive Summary for City Council</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => console.log('Generate PDF Report')}
                      className="bg-purple-500/10 border-purple-500 hover:bg-purple-500/20"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Full PDF Report
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                        <div className="w-2 h-8 bg-green-500 rounded"></div>
                        <div>
                          <div className="text-lg font-bold text-green-500">2.3x ROI</div>
                          <div className="text-xs text-muted-foreground">vs traditional methods</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                        <div className="w-2 h-8 bg-orange-500 rounded"></div>
                        <div>
                          <div className="text-lg font-bold text-orange-500">86%</div>
                          <div className="text-xs text-muted-foreground">community engagement</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                        <div className="w-2 h-8 bg-blue-500 rounded"></div>
                        <div>
                          <div className="text-lg font-bold text-blue-500">18%</div>
                          <div className="text-xs text-muted-foreground">reduced ER visits</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="text-sm">
                          <strong>Economic Impact:</strong> Biophilic interventions yield 2.3x ROI compared to traditional urban planning methods, with break-even achieved by year {scenarioData[currentScenario].breakeven}.
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <div className="text-sm">
                          <strong>Social Equity:</strong> 86% community engagement ensures equitable implementation across all demographic zones with targeted benefits for vulnerable populations.
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="text-sm">
                          <strong>Public Health:</strong> 4.2°C average cooling reduces heat-related emergency room visits by 18%, saving an estimated $320K annually in healthcare costs.
                        </div>
                      </div>
                    </div>

                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Report generated: {new Date().toLocaleDateString()} • Based on NASA satellite data & peer-reviewed research
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onNavigate?.('simulator')}
                      >
                        View Scenario Details
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 h-full">
              <TrendAnalysisCard />
              <DataQualityCard />
            </div>
          </TabsContent>

          <TabsContent value="realtime" className="h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 h-full">
              <RealTimeCard />
              <Card>
                <CardHeader>
                  <CardTitle className="text-white">Live Data Stream</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <span className="text-sm">Air Quality Index</span>
                      <Badge variant="outline" className="text-green-500 border-green-500">
                        Good (42)
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <span className="text-sm">Temperature Alert</span>
                      <Badge variant="outline" className="text-orange-500 border-orange-500">
                        Moderate (28°C)
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <span className="text-sm">Community Reports</span>
                      <Badge variant="outline" className="text-blue-500 border-blue-500">
                        3 New
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quality" className="h-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-full">
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-white">Data Quality Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {['Completeness', 'Accuracy', 'Timeliness', 'Consistency'].map((metric, index) => {
                        const values = [98, 96, 92, 90];
                        return (
                          <div key={metric}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm sm:text-base">{metric}</span>
                              <span className="text-green-500 font-medium">{values[index]}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${values[index]}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <DataQualityCard />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Helper Components
function RealTimeCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-green-500">
          <Clock className="h-5 w-5" />
          <span>Real-time Updates</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span>Data refresh rate</span>
          <span className="text-green-500">5 minutes</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Last update</span>
          <span className="text-muted-foreground">{new Date().toLocaleTimeString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Data sources</span>
          <span className="text-blue-500">7 active</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>System status</span>
          <span className="text-green-500">Operational</span>
        </div>
      </CardContent>
    </Card>
  );
}

function TrendAnalysisCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-orange-500">
          <TrendingUp className="h-5 w-5" />
          <span>Trend Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Monthly Growth</span>
            <span className="text-green-500 text-sm">+12.3%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Risk Reduction</span>
            <span className="text-blue-500 text-sm">+8.7%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Community Engagement</span>
            <span className="text-orange-500 text-sm">+15.2%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DataQualityCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-purple-500">Data Quality Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-purple-500 mb-2">94.2%</div>
          <div className="text-sm text-muted-foreground mb-4">Excellent Quality</div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Completeness</span>
              <span className="text-green-500">98%</span>
            </div>
            <div className="flex justify-between">
              <span>Accuracy</span>
              <span className="text-green-500">96%</span>
            </div>
            <div className="flex justify-between">
              <span>Timeliness</span>
              <span className="text-green-500">92%</span>
            </div>
            <div className="flex justify-between">
              <span>Consistency</span>
              <span className="text-green-500">90%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}