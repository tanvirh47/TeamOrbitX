import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { 
  User, 
  Camera, 
  Edit3, 
  MapPin, 
  Calendar, 
  Award, 
  TrendingUp,
  Eye,
  Download,
  Share2,
  Settings,
  Activity,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  Target,
  Zap,
  Leaf,
  Globe,
  LogOut
} from 'lucide-react';

interface ProfilePageProps {
  onLogout?: () => void;
}

export function ProfilePage({ onLogout }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Dr. Sarah Chen',
    title: 'Senior Urban Planner',
    organization: 'Metropolitan Planning Authority',
    location: 'Metro City, Region 7',
    email: 'sarah.chen@orbitx.com',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate urban planner with 12+ years experience in sustainable development and biophilic design. Leading initiatives to create healthier, more resilient cities through data-driven planning and community engagement.',
    website: 'https://linkedin.com/in/sarahchen',
    joinDate: 'March 2022',
    timezone: 'UTC-5 (EST)'
  });

  const stats = [
    { label: 'Projects Created', value: '47', icon: <Target className="h-5 w-5" />, change: '+3 this month' },
    { label: 'Simulations Run', value: '234', icon: <Zap className="h-5 w-5" />, change: '+12 this week' },
    { label: 'Reports Generated', value: '156', icon: <BarChart3 className="h-5 w-5" />, change: '+5 this week' },
    { label: 'Community Impact', value: '89%', icon: <Users className="h-5 w-5" />, change: '+2% improvement' }
  ];

  const achievements = [
    {
      title: 'Green Pioneer',
      description: 'Completed 25 biophilic design simulations',
      icon: <Leaf className="h-6 w-6 text-green-500" />,
      earned: '2024-01-15',
      progress: 100
    },
    {
      title: 'Data Explorer',
      description: 'Analyzed environmental data for 50+ areas',
      icon: <Globe className="h-6 w-6 text-blue-500" />,
      earned: '2024-02-20',
      progress: 100
    },
    {
      title: 'Community Champion',
      description: 'Facilitated 100 community feedback sessions',
      icon: <Users className="h-6 w-6 text-purple-500" />,
      earned: '2024-03-10',
      progress: 100
    },
    {
      title: 'Innovation Leader',
      description: 'Implementing 10 high-impact interventions',
      icon: <Award className="h-6 w-6 text-orange-500" />,
      earned: null,
      progress: 70
    }
  ];

  const recentActivity = [
    {
      action: 'Completed simulation',
      target: 'Green Roof Initiative - District 7',
      timestamp: '2 hours ago',
      type: 'simulation'
    },
    {
      action: 'Generated report',
      target: 'Monthly Air Quality Analysis',
      timestamp: '1 day ago',
      type: 'report'
    },
    {
      action: 'Updated project',
      target: 'Urban Forest Expansion Plan',
      timestamp: '2 days ago',
      type: 'project'
    },
    {
      action: 'Shared findings',
      target: 'Community Heat Risk Assessment',
      timestamp: '3 days ago',
      type: 'share'
    },
    {
      action: 'Created intervention',
      target: 'Permeable Pavement Implementation',
      timestamp: '1 week ago',
      type: 'intervention'
    }
  ];

  const projects = [
    {
      name: 'Green Corridor Initiative',
      status: 'Active',
      progress: 75,
      lastUpdate: '2 days ago',
      impact: 'High'
    },
    {
      name: 'Urban Heat Mitigation',
      status: 'Planning',
      progress: 30,
      lastUpdate: '1 week ago',
      impact: 'Medium'
    },
    {
      name: 'Community Garden Network',
      status: 'Completed',
      progress: 100,
      lastUpdate: '2 weeks ago',
      impact: 'High'
    }
  ];

  const handleProfileUpdate = (key: string, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'simulation':
        return <Zap className="h-4 w-4 text-orange-500" />;
      case 'report':
        return <BarChart3 className="h-4 w-4 text-blue-500" />;
      case 'project':
        return <Target className="h-4 w-4 text-green-500" />;
      case 'share':
        return <Share2 className="h-4 w-4 text-purple-500" />;
      case 'intervention':
        return <Leaf className="h-4 w-4 text-green-600" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Planning':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Completed':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 min-h-full bg-background">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="flex items-center space-x-2 text-white">
              <User className="h-6 w-6 text-orange-500" />
              <span>Profile</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your profile information and view your activity
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className={isEditing ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"}
            >
              {isEditing ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Basic Info Card */}
            <Card>
              <CardHeader className="text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="bg-orange-500 text-white text-2xl">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="space-y-2 w-full">
                      <Input
                        value={profile.name}
                        onChange={(e) => handleProfileUpdate('name', e.target.value)}
                        className="text-center"
                      />
                      <Input
                        value={profile.title}
                        onChange={(e) => handleProfileUpdate('title', e.target.value)}
                        className="text-center text-sm"
                      />
                    </div>
                  ) : (
                    <>
                      <CardTitle className="text-white">{profile.name}</CardTitle>
                      <CardDescription>{profile.title}</CardDescription>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        value={profile.organization}
                        onChange={(e) => handleProfileUpdate('organization', e.target.value)}
                        className="text-sm"
                      />
                    ) : (
                      <span>{profile.organization}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        value={profile.location}
                        onChange={(e) => handleProfileUpdate('location', e.target.value)}
                        className="text-sm"
                      />
                    ) : (
                      <span>{profile.location}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {profile.joinDate}</span>
                  </div>
                </div>
                
                <Separator />
                
                {isEditing ? (
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                      className="w-full min-h-[100px] px-3 py-2 text-sm border border-input bg-input-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground resize-none"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.bio}</p>
                )}

                <Separator className="mt-6" />
                
                {/* Logout Button */}
                <div className="pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onLogout}
                    className="w-full text-red-500 border-red-500/20 hover:bg-red-500/10 hover:border-red-500/30"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label>Email</Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileUpdate('email', e.target.value)}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  {isEditing ? (
                    <Input
                      value={profile.phone}
                      onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{profile.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  {isEditing ? (
                    <Input
                      value={profile.website}
                      onChange={(e) => handleProfileUpdate('website', e.target.value)}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{profile.website}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-3 text-orange-500">
                      {stat.icon}
                    </div>
                    <div className="font-bold text-xl text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mb-2">{stat.label}</div>
                    <div className="text-xs text-green-500">{stat.change}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Award className="h-5 w-5" />
                  <span>Achievements</span>
                </CardTitle>
                <CardDescription>Your accomplishments and progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border border-white/10 rounded-lg">
                    <div className="flex-shrink-0">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      {achievement.earned ? (
                        <p className="text-xs text-green-500 mt-1">
                          Earned on {new Date(achievement.earned).toLocaleDateString()}
                        </p>
                      ) : (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                    {achievement.earned && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/20 transition-colors">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="text-sm text-white">
                          <span className="text-muted-foreground">{activity.action}</span>{' '}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{activity.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Target className="h-5 w-5" />
                  <span>Active Projects</span>
                </CardTitle>
                <CardDescription>Your current and recent projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="p-4 border border-white/10 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">{project.name}</h4>
                      <Badge variant="outline" className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-white">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Last updated {project.lastUpdate}</span>
                        <span className={`${project.impact === 'High' ? 'text-green-500' : project.impact === 'Medium' ? 'text-orange-500' : 'text-blue-500'}`}>
                          {project.impact} Impact
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}