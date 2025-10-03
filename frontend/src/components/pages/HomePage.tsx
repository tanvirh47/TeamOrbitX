import { OrbitXLogo } from '../OrbitXLogo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  MapPin, 
  Activity, 
  BarChart3, 
  ArrowRight, 
  Globe, 
  Leaf, 
  TrendingUp,
  Users,
  Zap,
  Shield,
  CheckCircle,
  Sparkles
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const mainFeatures = [
    {
      id: 'digital-twin',
      title: 'City Digital Twin',
      description: 'Interactive geospatial visualization with real-time environmental data layers, risk mapping, and community feedback integration.',
      icon: <MapPin className="h-6 w-6" />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      features: ['Real-time Heat Maps', 'Flood Risk Analysis', 'Green Coverage Tracking', 'Community Reports']
    },
    {
      id: 'simulator',
      title: 'Simulator Interventions',
      description: 'Advanced simulation tools for testing biophilic interventions and predicting their impact on urban microclimate and community health.',
      icon: <Activity className="h-6 w-6" />,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      features: ['Green Infrastructure', 'Climate Modeling', 'Impact Prediction', 'Scenario Testing']
    },
    {
      id: 'metrics',
      title: 'Metrics Analytics',
      description: 'Comprehensive performance tracking and analytics dashboard for monitoring urban health indicators and intervention effectiveness.',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      features: ['Performance KPIs', 'Trend Analysis', 'Health Metrics', 'ROI Tracking']
    }
  ];

  const stats = [
    { label: 'Cities Monitored', value: '127', icon: <Globe className="h-5 w-5" /> },
    { label: 'Green Interventions', value: '2,340', icon: <Leaf className="h-5 w-5" /> },
    { label: 'Community Reports', value: '15,672', icon: <Users className="h-5 w-5" /> },
    { label: 'CO2 Reduced (tons)', value: '89,432', icon: <TrendingUp className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-[#12121e] via-[#1a1a2e] to-[#12121e]">
      {/* Hero Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <div className="flex justify-center mb-6">
              <OrbitXLogo size="lg" />
            </div>
            <h1 className="mb-6 text-white">
              Community-Driven Biophilic Cockpit for Healthy City Growth
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Advanced urban planning platform integrating geospatial data visualization, 
              simulation controls, and performance metrics to create healthier, more sustainable cities 
              through biophilic design principles.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="outline" className="text-green-500 border-green-500/50 bg-green-500/5">
                <Leaf className="h-3 w-3 mr-1" />
                Biophilic Design
              </Badge>
              <Badge variant="outline" className="text-orange-500 border-orange-500/50 bg-orange-500/5">
                <Zap className="h-3 w-3 mr-1" />
                Real-time Data
              </Badge>
              <Badge variant="outline" className="text-blue-500 border-blue-500/50 bg-blue-500/5">
                <Shield className="h-3 w-3 mr-1" />
                Risk Assessment
              </Badge>
              <Badge variant="outline" className="text-purple-500 border-purple-500/50 bg-purple-500/5">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur border-white/10">
                <CardContent className="p-4 lg:p-6 text-center">
                  <div className="flex justify-center mb-3 text-orange-500">
                    {stat.icon}
                  </div>
                  <div className="font-bold text-lg lg:text-2xl text-white mb-1">{stat.value}</div>
                  <div className="text-xs lg:text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {mainFeatures.map((feature) => (
              <Card 
                key={feature.id} 
                className="bg-card/30 backdrop-blur border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                onClick={() => onNavigate(feature.id)}
              >
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <div className={feature.color}>
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="flex items-center justify-between text-white">
                    {feature.title}
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {feature.features.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(feature.id);
                    }}
                  >
                    Explore {feature.title}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access Section */}
          <Card className="bg-card/20 backdrop-blur border-white/10">
            <CardHeader>
              <CardTitle className="text-center text-white">Quick Access</CardTitle>
              <CardDescription className="text-center">
                Jump directly to specific tools and features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: 'Digital Twin', action: () => onNavigate('digital-twin'), icon: <MapPin className="h-5 w-5" /> },
                  { label: 'Simulator', action: () => onNavigate('simulator'), icon: <Activity className="h-5 w-5" /> },
                  { label: 'Analytics', action: () => onNavigate('metrics'), icon: <BarChart3 className="h-5 w-5" /> },
                  { label: 'Settings', action: () => onNavigate('settings'), icon: <Shield className="h-5 w-5" /> },
                  { label: 'Notifications', action: () => onNavigate('notifications'), icon: <Zap className="h-5 w-5" /> },
                  { label: 'Help', action: () => onNavigate('help'), icon: <Sparkles className="h-5 w-5" /> }
                ].map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-16 flex-col space-y-1 border-white/20 hover:border-orange-500/50 hover:bg-orange-500/5"
                    onClick={item.action}
                  >
                    <div className="text-orange-500">
                      {item.icon}
                    </div>
                    <span className="text-xs">{item.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}