import { useState } from 'react';
import { OrbitXLogo } from './components/OrbitXLogo';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/pages/HomePage';
import { DigitalTwinPage } from './components/pages/DigitalTwinPage';
import { SimulatorPage } from './components/pages/SimulatorPage';
import { MetricsPage } from './components/pages/MetricsPage';
import { NotificationsPage } from './components/pages/NotificationsPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { HelpPage } from './components/pages/HelpPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { LoginPage } from './components/pages/LoginPage';
import { SignupPage } from './components/pages/SignupPage';
import { ViewAllReportsPage } from './components/pages/ViewAllReportsPage';
import { DigitalTwinSettingsPage } from './components/pages/DigitalTwinSettingsPage';
import { MyNeighborhoodPage } from './components/pages/MyNeighborhoodPage';
import { SubmitReportPage } from './components/pages/SubmitReportPage';
import { MyImpactPage } from './components/pages/MyImpactPage';
import { VoteProposalsPage } from './components/pages/VoteProposalsPage';
import { CityUpdatesPage } from './components/pages/CityUpdatesPage';
import { CommunityProfilePage } from './components/pages/CommunityProfilePage';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './components/ui/dialog';
import { 
  Settings, 
  Bell, 
  HelpCircle, 
  User, 
  Activity,
  Clock,
  Database,
  Menu,
  Home,
  MapPin,
  Target,
  BarChart3,
  Info,
  Satellite,
  Globe,
  Thermometer,
  Wind,
  Droplets,
  Leaf,
  TreePine
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<any>(null);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [dataSourcesModalOpen, setDataSourcesModalOpen] = useState(false);

  // Define navigation based on user type
  const getMobilePages = () => {
    if (user?.userType === 'community') {
      return [
        { id: 'my-neighborhood', name: 'My Neighborhood', icon: Home },
        { id: 'submit-report', name: 'Submit Report', icon: Target },
        { id: 'vote-proposals', name: 'Vote on Ideas', icon: BarChart3 },
        { id: 'my-impact', name: 'My Impact', icon: User },
        { id: 'city-updates', name: 'City Updates', icon: Bell },
      ];
    } else {
      return [
        { id: 'home', name: 'Home', icon: Home },
        { id: 'digital-twin', name: 'Digital Twin', icon: MapPin },
        { id: 'simulator', name: 'Simulator', icon: Target },
        { id: 'metrics', name: 'Metrics', icon: BarChart3 },
      ];
    }
  };

  const mobilePages = getMobilePages();

  const handleLogin = (userType: 'urban-planner' | 'community', userData: any) => {
    setUser({ ...userData, userType });
    setIsAuthenticated(true);
    // Set appropriate default page based on user type
    setCurrentPage(userType === 'community' ? 'my-neighborhood' : 'home');
  };

  const handleSignup = (userType: 'urban-planner' | 'community', userData: any) => {
    setUser({ ...userData, userType });
    setIsAuthenticated(true);
    // Set appropriate default page based on user type
    setCurrentPage(userType === 'community' ? 'my-neighborhood' : 'home');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const toggleNotifications = () => {
    if (currentPage === 'notifications') {
      setCurrentPage(user?.userType === 'community' ? 'my-neighborhood' : 'home');
      setNotificationsPanelOpen(false);
    } else {
      setCurrentPage('notifications');
      setNotificationsPanelOpen(true);
    }
  };

  const renderCurrentPage = () => {
    // Community member pages
    if (user?.userType === 'community') {
      switch (currentPage) {
        case 'home':
        case 'my-neighborhood':
          return <MyNeighborhoodPage onNavigate={setCurrentPage} />;
        case 'submit-report':
          return <SubmitReportPage onNavigate={setCurrentPage} />;
        case 'vote-proposals':
          return <VoteProposalsPage onNavigate={setCurrentPage} />;
        case 'my-impact':
          return <MyImpactPage onNavigate={setCurrentPage} />;
        case 'city-updates':
          return <CityUpdatesPage onNavigate={setCurrentPage} />;
        case 'notifications':
          return <NotificationsPage />;
        case 'settings':
          return <SettingsPage />;
        case 'help':
          return <HelpPage />;
        case 'profile':
          return <CommunityProfilePage onLogout={handleLogout} onNavigate={setCurrentPage} />;
        default:
          return <MyNeighborhoodPage onNavigate={setCurrentPage} />;
      }
    } else {
      // Urban planner pages
      switch (currentPage) {
        case 'home':
          return <HomePage onNavigate={setCurrentPage} />;
        case 'digital-twin':
          return <DigitalTwinPage onNavigate={setCurrentPage} />;
        case 'simulator':
          return <SimulatorPage onNavigate={setCurrentPage} />;
        case 'metrics':
          return <MetricsPage onNavigate={setCurrentPage} />;
        case 'notifications':
          return <NotificationsPage />;
        case 'settings':
          return <SettingsPage />;
        case 'help':
          return <HelpPage />;
        case 'profile':
          return <ProfilePage onLogout={handleLogout} />;
        case 'view-all-reports':
          return <ViewAllReportsPage />;
        case 'digital-twin-settings':
          return <DigitalTwinSettingsPage />;
        default:
          return <HomePage onNavigate={setCurrentPage} />;
      }
    }
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    if (page !== 'notifications') {
      setNotificationsPanelOpen(false);
    }
  };

  // Show authentication pages if not logged in
  if (!isAuthenticated) {
    if (authMode === 'login') {
      return (
        <LoginPage 
          onLogin={handleLogin} 
          onSwitchToSignup={() => setAuthMode('signup')} 
        />
      );
    } else {
      return (
        <SignupPage 
          onSignup={handleSignup} 
          onSwitchToLogin={() => setAuthMode('login')} 
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#12121e] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#1a1a2e] px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <OrbitXLogo onClick={() => handlePageChange(user?.userType === 'community' ? 'my-neighborhood' : 'home')} />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {user?.userType === 'urban-planner' && (
              <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
            )}
            {user?.userType === 'community' && (
              <nav className="flex items-center space-x-2">
                {mobilePages.map((page) => {
                  const Icon = page.icon;
                  const isActive = currentPage === page.id;
                  
                  return (
                    <Button
                      key={page.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePageChange(page.id)}
                      className={`flex items-center space-x-2 ${
                        isActive 
                          ? 'bg-orange-600 hover:bg-orange-700' 
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-orange-500'}`} />
                      <span className="text-sm">{page.name}</span>
                    </Button>
                  );
                })}
              </nav>
            )}
            
            <Separator orientation="vertical" className="h-8" />
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-500 border-green-500 hidden xl:flex">
                <Activity className="h-3 w-3 mr-1" />
                System Active
              </Badge>
              <Badge variant="outline" className="text-orange-500 border-orange-500 hidden xl:flex">
                <Clock className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
              
              {/* About This Data Button - Only for urban planners */}
              {user?.userType === 'urban-planner' && (
                <Dialog open={dataSourcesModalOpen} onOpenChange={setDataSourcesModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                      <Info className="h-4 w-4" />
                      <span className="hidden sm:inline ml-2">About This Data</span>
                    </Button>
                  </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-blue-400">
                      <Globe className="h-5 w-5" />
                      NASA Earth Observation Data Sources
                    </DialogTitle>
                    <DialogDescription>
                      Comprehensive satellite and remote sensing data powering OrbitX's biophilic urban planning insights.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    {/* Heat Risk */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <Thermometer className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-red-400">Heat Risk</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <strong>MODIS/VIIRS LST</strong> (Terra/Aqua/Suomi NPP) — 1km resolution, daily
                        </div>
                      </div>
                    </div>

                    {/* Air Quality */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <Wind className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-purple-400">Air Quality</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <strong>TEMPO</strong> (Intelsat-40e) — hourly, neighborhood-scale
                        </div>
                      </div>
                    </div>

                    {/* Flood Risk */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <Droplets className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-blue-400">Flood Risk</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <strong>GPM IMERG + SRTM</strong> — 1km resolution, 30-min intervals
                        </div>
                      </div>
                    </div>

                    {/* Greenness */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <Leaf className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-green-400">Greenness</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <strong>HLS NDVI</strong> (Landsat 8/9 + Sentinel-2) — 30m resolution, 2–3 days
                        </div>
                      </div>
                    </div>

                    {/* Biodiversity */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <TreePine className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-emerald-400">Biodiversity</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <strong>GEDI lidar + ECOSTRESS plant temp</strong> — ISS-based, high-res
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Satellite className="h-4 w-4" />
                      <span>Source: LP DAAC, NASA Earthdata, TEMPO Science Team</span>
                    </div>
                    <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                      Real-time
                    </Badge>
                  </div>
                </DialogContent>
                </Dialog>
              )}

              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleNotifications}
                className={currentPage === 'notifications' ? 'bg-orange-500 hover:bg-orange-600' : ''}
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handlePageChange('settings')}
                className={currentPage === 'settings' ? 'bg-orange-500 hover:bg-orange-600' : ''}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handlePageChange('help')}
                className={currentPage === 'help' ? 'bg-orange-500 hover:bg-orange-600' : ''}
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handlePageChange('profile')}
                className={currentPage === 'profile' ? 'bg-orange-500 hover:bg-orange-600' : ''}
              >
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* About This Data Button for Mobile - Only for urban planners */}
            {user?.userType === 'urban-planner' && (
              <Dialog open={dataSourcesModalOpen} onOpenChange={setDataSourcesModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                    <Info className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
              <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-blue-400">
                    <Globe className="h-5 w-5" />
                    NASA Earth Observation Data Sources
                  </DialogTitle>
                  <DialogDescription>
                    Comprehensive satellite and remote sensing data powering OrbitX's biophilic urban planning insights.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  {/* Heat Risk */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <Thermometer className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-red-400">Heat Risk</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <strong>MODIS/VIIRS LST</strong> (Terra/Aqua/Suomi NPP) — 1km resolution, daily
                      </div>
                    </div>
                  </div>

                  {/* Air Quality */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <Wind className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-purple-400">Air Quality</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <strong>TEMPO</strong> (Intelsat-40e) — hourly, neighborhood-scale
                      </div>
                    </div>
                  </div>

                  {/* Flood Risk */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Droplets className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-blue-400">Flood Risk</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <strong>GPM IMERG + SRTM</strong> — 1km resolution, 30-min intervals
                      </div>
                    </div>
                  </div>

                  {/* Greenness */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <Leaf className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-green-400">Greenness</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <strong>HLS NDVI</strong> (Landsat 8/9 + Sentinel-2) — 30m resolution, 2–3 days
                      </div>
                    </div>
                  </div>

                  {/* Biodiversity */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <TreePine className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-emerald-400">Biodiversity</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <strong>GEDI lidar + ECOSTRESS plant temp</strong> — ISS-based, high-res
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Satellite className="h-4 w-4" />
                    <span className="text-xs sm:text-sm">Source: LP DAAC, NASA Earthdata, TEMPO Science Team</span>
                  </div>
                  <Badge variant="outline" className="text-blue-400 border-blue-400/30 w-fit">
                    Real-time
                  </Badge>
                </div>
                </DialogContent>
              </Dialog>
            )}

            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleNotifications}
              className={currentPage === 'notifications' ? 'bg-orange-500 hover:bg-orange-600' : ''}
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-[#1a1a2e] border-white/10">
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>
                    Access all OrbitX features and settings
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center space-x-3 pl-3">
                    <OrbitXLogo size="sm" onClick={() => handlePageChange(user?.userType === 'community' ? 'my-neighborhood' : 'home')} />
                  </div>
                  
                  <Separator />
                  
                  {/* Main Pages */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground px-3 py-2">
                      {user?.userType === 'community' ? 'Community Features' : 'Main Pages'}
                    </h3>
                    {mobilePages.map((page) => {
                      const Icon = page.icon;
                      const isActive = currentPage === page.id;
                      return (
                        <Button
                          key={page.id}
                          variant="ghost"
                          className={`w-full justify-start ${
                            isActive ? 'bg-orange-500 hover:bg-orange-600' : ''
                          }`}
                          onClick={() => handlePageChange(page.id)}
                        >
                          <Icon className="h-4 w-4 mr-3" />
                          {page.name}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Separator />
                  
                  {/* Data & Information - Only for urban planners */}
                  {user?.userType === 'urban-planner' && (
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-muted-foreground px-3 py-2">Data & Information</h3>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                        onClick={() => {
                          setDataSourcesModalOpen(true);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <Info className="h-4 w-4 mr-3" />
                        About This Data
                      </Button>
                    </div>
                  )}
                  
                  <Separator />
                  
                  {/* Notifications & Account */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground px-3 py-2">Account</h3>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        currentPage === 'notifications' ? 'bg-orange-500 hover:bg-orange-600' : ''
                      }`}
                      onClick={() => handlePageChange('notifications')}
                    >
                      <Bell className="h-4 w-4 mr-3" />
                      Notifications
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        currentPage === 'settings' ? 'bg-orange-500 hover:bg-orange-600' : ''
                      }`}
                      onClick={() => handlePageChange('settings')}
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        currentPage === 'help' ? 'bg-orange-500 hover:bg-orange-600' : ''
                      }`}
                      onClick={() => handlePageChange('help')}
                    >
                      <HelpCircle className="h-4 w-4 mr-3" />
                      Help & Support
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        currentPage === 'profile' ? 'bg-orange-500 hover:bg-orange-600' : ''
                      }`}
                      onClick={() => handlePageChange('profile')}
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  {/* Status */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground px-3 py-2">Status</h3>
                    <div className="space-y-2 px-2">
                      <Badge variant="outline" className="text-green-500 border-green-500 w-full justify-center">
                        <Activity className="h-3 w-3 mr-2" />
                        System Active
                      </Badge>
                      <Badge variant="outline" className="text-orange-500 border-orange-500 w-full justify-center">
                        <Clock className="h-3 w-3 mr-2" />
                        Live Data
                      </Badge>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="min-h-[calc(100vh-140px)] overflow-auto">
        {renderCurrentPage()}
      </main>

      {/* Status Bar - Hidden on Mobile */}
      <footer className="border-t border-white/10 bg-[#1a1a2e] px-4 sm:px-6 py-2 hidden sm:block">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Database className="h-3 w-3" />
              <span className="hidden md:inline">Connected to OrbitX Cloud</span>
              <span className="md:hidden">Connected</span>
            </div>
            <div className="hidden lg:block">Last Updated: {new Date().toLocaleTimeString()}</div>
          </div>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <span>v2.1.0</span>
            <span className="hidden lg:inline">|</span>
            <span className="hidden lg:inline">© 2024 OrbitX</span>
          </div>
        </div>
      </footer>
    </div>
  );
}