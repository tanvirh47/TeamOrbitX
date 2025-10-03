import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Separator } from '../ui/separator';
import { 
  Settings, 
  Eye, 
  EyeOff, 
  MapPin, 
  Palette, 
  Clock, 
  Bell,
  Download,
  RefreshCw,
  Globe,
  Shield,
  Layers
} from 'lucide-react';

export function DigitalTwinSettingsPage() {
  const [settings, setSettings] = useState({
    // Display Settings
    showHeatLayers: true,
    showFloodLayers: true,
    showAirQualityLayers: true,
    showGreenLayers: true,
    showCommunityReports: true,
    showBuildingLabels: false,
    showCoordinateGrid: true,
    mapStyle: 'satellite',
    
    // Data Settings
    autoRefresh: true,
    refreshInterval: 30,
    dataQuality: 'high',
    historicalDataRange: 30,
    
    // Notifications
    alertsEnabled: true,
    criticalAlertsOnly: false,
    emailNotifications: true,
    pushNotifications: true,
    
    // Performance
    renderQuality: 'high',
    animationsEnabled: true,
    cacheEnabled: true,
    
    // Privacy
    anonymizeReports: false,
    shareLocation: true,
    analyticsEnabled: true
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetToDefaults = () => {
    // Reset all settings to default values
    setSettings({
      showHeatLayers: true,
      showFloodLayers: true,
      showAirQualityLayers: true,
      showGreenLayers: true,
      showCommunityReports: true,
      showBuildingLabels: false,
      showCoordinateGrid: true,
      mapStyle: 'satellite',
      autoRefresh: true,
      refreshInterval: 30,
      dataQuality: 'high',
      historicalDataRange: 30,
      alertsEnabled: true,
      criticalAlertsOnly: false,
      emailNotifications: true,
      pushNotifications: true,
      renderQuality: 'high',
      animationsEnabled: true,
      cacheEnabled: true,
      anonymizeReports: false,
      shareLocation: true,
      analyticsEnabled: true
    });
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'orbitx-digital-twin-settings.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 lg:p-6 h-full">
      <div className="w-full max-w-4xl mx-auto h-full">
        {/* Header */}
        <div className="w-full max-w-full overflow-hidden mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-orange-500 mb-1 sm:mb-2 truncate">Digital Twin Settings</h2>
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-tight">
                Configure display options, data preferences, and performance settings for the Digital Twin interface.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={exportSettings}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={resetToDefaults}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Display Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-500">
                <Eye className="h-5 w-5" />
                Display Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-white">Layer Visibility</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="heat-layers" className="text-sm">Heat Risk Layers</Label>
                    <Switch 
                      id="heat-layers"
                      checked={settings.showHeatLayers}
                      onCheckedChange={(checked) => updateSetting('showHeatLayers', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="flood-layers" className="text-sm">Flood Risk Layers</Label>
                    <Switch 
                      id="flood-layers"
                      checked={settings.showFloodLayers}
                      onCheckedChange={(checked) => updateSetting('showFloodLayers', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="air-layers" className="text-sm">Air Quality Layers</Label>
                    <Switch 
                      id="air-layers"
                      checked={settings.showAirQualityLayers}
                      onCheckedChange={(checked) => updateSetting('showAirQualityLayers', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="green-layers" className="text-sm">Green Space Layers</Label>
                    <Switch 
                      id="green-layers"
                      checked={settings.showGreenLayers}
                      onCheckedChange={(checked) => updateSetting('showGreenLayers', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="community-reports" className="text-sm">Community Reports</Label>
                    <Switch 
                      id="community-reports"
                      checked={settings.showCommunityReports}
                      onCheckedChange={(checked) => updateSetting('showCommunityReports', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="building-labels" className="text-sm">Building Labels</Label>
                    <Switch 
                      id="building-labels"
                      checked={settings.showBuildingLabels}
                      onCheckedChange={(checked) => updateSetting('showBuildingLabels', checked)}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium text-white">Map Appearance</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="map-style" className="text-sm">Map Style</Label>
                    <Select value={settings.mapStyle} onValueChange={(value) => updateSetting('mapStyle', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="satellite">Satellite</SelectItem>
                        <SelectItem value="streets">Streets</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="terrain">Terrain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between pt-6">
                    <Label htmlFor="coordinate-grid" className="text-sm">Show Coordinate Grid</Label>
                    <Switch 
                      id="coordinate-grid"
                      checked={settings.showCoordinateGrid}
                      onCheckedChange={(checked) => updateSetting('showCoordinateGrid', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-500">
                <Globe className="h-5 w-5" />
                Data Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-refresh" className="text-sm">Auto Refresh Data</Label>
                    <Switch 
                      id="auto-refresh"
                      checked={settings.autoRefresh}
                      onCheckedChange={(checked) => updateSetting('autoRefresh', checked)}
                    />
                  </div>
                  
                  {settings.autoRefresh && (
                    <div className="space-y-2">
                      <Label className="text-sm">Refresh Interval (seconds)</Label>
                      <Slider 
                        value={[settings.refreshInterval]}
                        onValueChange={(value) => updateSetting('refreshInterval', value[0])}
                        min={5}
                        max={300}
                        step={5}
                        className="w-full"
                      />
                      <div className="text-xs text-muted-foreground text-center">
                        {settings.refreshInterval} seconds
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="data-quality" className="text-sm">Data Quality</Label>
                    <Select value={settings.dataQuality} onValueChange={(value) => updateSetting('dataQuality', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Faster)</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High (Detailed)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Historical Data Range (days)</Label>
                    <Slider 
                      value={[settings.historicalDataRange]}
                      onValueChange={(value) => updateSetting('historicalDataRange', value[0])}
                      min={1}
                      max={365}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-xs text-muted-foreground text-center">
                      {settings.historicalDataRange} days
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-500">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="alerts-enabled" className="text-sm">Enable Alerts</Label>
                  <Switch 
                    id="alerts-enabled"
                    checked={settings.alertsEnabled}
                    onCheckedChange={(checked) => updateSetting('alertsEnabled', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="critical-only" className="text-sm">Critical Alerts Only</Label>
                  <Switch 
                    id="critical-only"
                    checked={settings.criticalAlertsOnly}
                    onCheckedChange={(checked) => updateSetting('criticalAlertsOnly', checked)}
                    disabled={!settings.alertsEnabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="text-sm">Email Notifications</Label>
                  <Switch 
                    id="email-notifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                    disabled={!settings.alertsEnabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications" className="text-sm">Push Notifications</Label>
                  <Switch 
                    id="push-notifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                    disabled={!settings.alertsEnabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-500">
                <Layers className="h-5 w-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="render-quality" className="text-sm">Render Quality</Label>
                    <Select value={settings.renderQuality} onValueChange={(value) => updateSetting('renderQuality', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Better Performance)</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High (Better Quality)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="animations" className="text-sm">Enable Animations</Label>
                    <Switch 
                      id="animations"
                      checked={settings.animationsEnabled}
                      onCheckedChange={(checked) => updateSetting('animationsEnabled', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cache" className="text-sm">Enable Caching</Label>
                    <Switch 
                      id="cache"
                      checked={settings.cacheEnabled}
                      onCheckedChange={(checked) => updateSetting('cacheEnabled', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-500">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="anonymize-reports" className="text-sm">Anonymize Reports</Label>
                  <Switch 
                    id="anonymize-reports"
                    checked={settings.anonymizeReports}
                    onCheckedChange={(checked) => updateSetting('anonymizeReports', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="share-location" className="text-sm">Share Location Data</Label>
                  <Switch 
                    id="share-location"
                    checked={settings.shareLocation}
                    onCheckedChange={(checked) => updateSetting('shareLocation', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="analytics" className="text-sm">Enable Analytics</Label>
                  <Switch 
                    id="analytics"
                    checked={settings.analyticsEnabled}
                    onCheckedChange={(checked) => updateSetting('analyticsEnabled', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Settings className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}