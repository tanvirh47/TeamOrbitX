import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Clock,
  Settings,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  MessageSquare,
  Trash2,
  Eye
} from 'lucide-react';

export function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'High Heat Risk Detected',
      message: 'Temperature anomaly detected in District 7. Immediate attention required.',
      time: '2 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'Simulation Complete',
      message: 'Green roof intervention simulation for Building Complex A has completed successfully.',
      time: '15 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'success',
      title: 'Community Report Processed',
      message: 'New community feedback integrated into the digital twin model.',
      time: '1 hour ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Data Sync Issue',
      message: 'Weather station sensor network experiencing connectivity issues.',
      time: '2 hours ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'info',
      title: 'Weekly Report Available',
      message: 'Your weekly city health analytics report is ready for review.',
      time: '1 day ago',
      read: true,
      priority: 'low'
    }
  ]);

  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    soundEnabled: true,
    highPriority: true,
    mediumPriority: true,
    lowPriority: false,
    communityReports: true,
    systemAlerts: true,
    simulationUpdates: true
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 min-h-full bg-background">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="flex items-center space-x-2 text-white">
              <Bell className="h-6 w-6 text-orange-500" />
              <span>Notifications</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your alerts, updates, and system notifications
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-orange-500 border-orange-500/50">
              {unreadCount} unread
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark All Read
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notifications List */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Recent Notifications</CardTitle>
                <CardDescription>Latest system alerts and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      notification.read 
                        ? 'bg-muted/20 border-white/10' 
                        : 'bg-card border-orange-500/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start space-x-3 flex-1">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`font-medium ${notification.read ? 'text-muted-foreground' : 'text-white'}`}>
                              {notification.title}
                            </h4>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getPriorityColor(notification.priority)}`}
                            >
                              {notification.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{notification.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-8 w-8 p-0"
                            title="Mark as read"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {notifications.length === 0 && (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-white mb-2">No notifications</h3>
                    <p className="text-muted-foreground">You're all caught up!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Notification Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Settings className="h-5 w-5" />
                  <span>Notification Settings</span>
                </CardTitle>
                <CardDescription>Configure your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Delivery Methods */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-white">Delivery Methods</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="push" className="text-sm">Push Notifications</Label>
                      </div>
                      <Switch
                        id="push"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => 
                          setSettings({ ...settings, pushNotifications: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="email" className="text-sm">Email</Label>
                      </div>
                      <Switch
                        id="email"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => 
                          setSettings({ ...settings, emailNotifications: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="sms" className="text-sm">SMS</Label>
                      </div>
                      <Switch
                        id="sms"
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) => 
                          setSettings({ ...settings, smsNotifications: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Sound Settings */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-white">Sound</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {settings.soundEnabled ? (
                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <VolumeX className="h-4 w-4 text-muted-foreground" />
                      )}
                      <Label htmlFor="sound" className="text-sm">Enable Sounds</Label>
                    </div>
                    <Switch
                      id="sound"
                      checked={settings.soundEnabled}
                      onCheckedChange={(checked) => 
                        setSettings({ ...settings, soundEnabled: checked })
                      }
                    />
                  </div>
                </div>

                <Separator />

                {/* Priority Levels */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-white">Priority Levels</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="high" className="text-sm">High Priority</Label>
                      <Switch
                        id="high"
                        checked={settings.highPriority}
                        onCheckedChange={(checked) => 
                          setSettings({ ...settings, highPriority: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="medium" className="text-sm">Medium Priority</Label>
                      <Switch
                        id="medium"
                        checked={settings.mediumPriority}
                        onCheckedChange={(checked) => 
                          setSettings({ ...settings, mediumPriority: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="low" className="text-sm">Low Priority</Label>
                      <Switch
                        id="low"
                        checked={settings.lowPriority}
                        onCheckedChange={(checked) => 
                          setSettings({ ...settings, lowPriority: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Categories */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-white">Categories</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="community" className="text-sm">Community Reports</Label>
                      <Switch
                        id="community"
                        checked={settings.communityReports}
                        onCheckedChange={(checked) => 
                          setSettings({ ...settings, communityReports: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="system" className="text-sm">System Alerts</Label>
                      <Switch
                        id="system"
                        checked={settings.systemAlerts}
                        onCheckedChange={(checked) => 
                          setSettings({ ...settings, systemAlerts: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="simulation" className="text-sm">Simulation Updates</Label>
                      <Switch
                        id="simulation"
                        checked={settings.simulationUpdates}
                        onCheckedChange={(checked) => 
                          setSettings({ ...settings, simulationUpdates: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}