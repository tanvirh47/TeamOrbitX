import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  User, 
  Camera, 
  Edit3, 
  MapPin, 
  Calendar, 
  Award, 
  Star,
  TrendingUp,
  Eye,
  EyeOff,
  Settings,
  Activity,
  Users,
  Clock,
  CheckCircle,
  Target,
  MessageSquare,
  Vote,
  Heart,
  Bell,
  Shield,
  Home,
  Gift,
  Share,
  LogOut,
  Crown,
  Coffee,
  Leaf
} from 'lucide-react';

interface CommunityProfilePageProps {
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

export function CommunityProfilePage({ onLogout, onNavigate }: CommunityProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Maria Rodriguez',
    nickname: 'Maria R.',
    neighborhood: 'Oak Street District',
    email: 'maria.rodriguez@email.com',
    bio: 'Long-time resident passionate about making our neighborhood greener and healthier for everyone. Love seeing how small changes can make a big difference!',
    joinDate: 'March 2024',
    notificationEmail: true,
    notificationPush: true,
    showInLeaderboard: true,
    shareProfile: 'public', // public, friends, private
    dataSharing: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    showInLeaderboard: true,
    showActivity: true,
    showAchievements: true,
    allowMessages: true
  });

  const stats = {
    totalPoints: 210,
    currentLevel: 3,
    levelName: 'Urban Steward',
    pointsToNext: 40,
    nextLevel: 'Neighborhood Hero',
    rank: 1,
    reportsSubmitted: 15,
    votesPlaced: 23,
    eventsAttended: 7,
    impactScore: 94
  };

  const achievements = [
    {
      id: 'first-report',
      title: '🌱 First Report',
      description: 'Submitted your first community report',
      earned: true,
      earnedDate: 'March 2024',
      points: 20
    },
    {
      id: 'top-voter',
      title: '🗳️ Top Voter',
      description: 'Voted on 20+ community proposals',
      earned: true,
      earnedDate: 'April 2024',
      points: 50
    },
    {
      id: 'green-champion',
      title: '🌍 Green Champion',
      description: 'Helped implement 3 environmental projects',
      earned: true,
      earnedDate: 'May 2024',
      points: 75
    },
    {
      id: 'neighborhood-hero',
      title: '🦸 Neighborhood Hero',
      description: 'Reach Level 4 with 250+ points',
      earned: false,
      progress: 84,
      points: 100
    },
    {
      id: 'community-leader',
      title: '👑 Community Leader',
      description: 'Help implement 10 community projects',
      earned: false,
      progress: 30,
      points: 150
    }
  ];

  const recentActivity = [
    {
      action: 'Voted on',
      target: 'Urban Meadow at Riverside Lot',
      timestamp: '2 hours ago',
      type: 'vote',
      points: 10
    },
    {
      action: 'Submitted report',
      target: 'Heat stress at Market Square',
      timestamp: '1 day ago',
      type: 'report',
      points: 20
    },
    {
      action: 'Attended event',
      target: 'Community Planting Day',
      timestamp: '3 days ago',
      type: 'event',
      points: 50
    },
    {
      action: 'Shared update',
      target: 'Air quality improvement story',
      timestamp: '1 week ago',
      type: 'share',
      points: 15
    }
  ];

  const impactHighlights = [
    {
      title: 'Your reports led to new tree planting',
      description: '12 shade trees planted on Maple Street',
      icon: '🌳',
      date: 'May 2024'
    },
    {
      title: 'Your vote helped fund green space',
      description: 'Downtown Meadow project approved ($45K)',
      icon: '🗳️',
      date: 'June 2024'
    },
    {
      title: 'Air quality improved in your area',
      description: '15% improvement near Oak Street School',
      icon: '🌫️',
      date: 'July 2024'
    }
  ];

  const redeemableRewards = [
    {
      name: 'Free Coffee at Green Café',
      cost: 50,
      available: true,
      icon: '☕'
    },
    {
      name: 'Community Garden Kit',
      cost: 100,
      available: true,
      icon: '🌱'
    },
    {
      name: 'Tree Naming Rights',
      cost: 200,
      available: true,
      icon: '🌲'
    }
  ];

  const handleProfileUpdate = (key: string, value: string | boolean) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyUpdate = (key: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'vote':
        return <Vote className="h-4 w-4 text-blue-500" />;
      case 'report':
        return <MessageSquare className="h-4 w-4 text-orange-500" />;
      case 'event':
        return <Users className="h-4 w-4 text-green-500" />;
      case 'share':
        return <Share className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const progressToNext = (stats.totalPoints / (stats.totalPoints + stats.pointsToNext)) * 100;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 min-h-full bg-background">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="flex items-center space-x-2 text-white">
              <User className="h-6 w-6 text-orange-500" />
              <span>My Profile</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your community profile and privacy settings
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate?.('my-impact')}
            >
              <Star className="h-4 w-4 mr-2" />
              View My Impact
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
                        placeholder="Full Name"
                      />
                      <Input
                        value={profile.nickname}
                        onChange={(e) => handleProfileUpdate('nickname', e.target.value)}
                        className="text-center text-sm"
                        placeholder="Display Name (optional)"
                      />
                    </div>
                  ) : (
                    <>
                      <CardTitle className="text-white">{profile.name}</CardTitle>
                      <CardDescription>Level {stats.currentLevel} • {stats.levelName}</CardDescription>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Level Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress to {stats.nextLevel}</span>
                    <span className="text-orange-500 font-medium">{stats.totalPoints}/{stats.totalPoints + stats.pointsToNext}</span>
                  </div>
                  <Progress value={progressToNext} className="h-2" />
                  <p className="text-xs text-center text-green-500">
                    {stats.pointsToNext} points to next level!
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Select 
                        value={profile.neighborhood} 
                        onValueChange={(value) => handleProfileUpdate('neighborhood', value)}
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Oak Street District">Oak Street District</SelectItem>
                          <SelectItem value="Downtown Core">Downtown Core</SelectItem>
                          <SelectItem value="Riverside Area">Riverside Area</SelectItem>
                          <SelectItem value="Green Hills">Green Hills</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span>{profile.neighborhood}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Crown className="h-4 w-4 text-muted-foreground" />
                    <span>Rank #{stats.rank} in neighborhood</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {profile.joinDate}</span>
                  </div>
                </div>
                
                <Separator />
                
                {isEditing ? (
                  <div className="space-y-2">
                    <Label>About You</Label>
                    <Textarea
                      value={profile.bio}
                      onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                      placeholder="Tell us about your environmental interests..."
                      className="min-h-[80px]"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.bio}</p>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="text-center p-2 bg-green-500/10 rounded-lg">
                    <div className="text-lg font-bold text-green-500">{stats.reportsSubmitted}</div>
                    <div className="text-xs text-muted-foreground">Reports</div>
                  </div>
                  <div className="text-center p-2 bg-blue-500/10 rounded-lg">
                    <div className="text-lg font-bold text-blue-500">{stats.votesPlaced}</div>
                    <div className="text-xs text-muted-foreground">Votes</div>
                  </div>
                </div>

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

            {/* Green Points Card */}
            <Card className="bg-gradient-to-br from-orange-500/10 to-green-500/10 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-500">
                  <Star className="h-5 w-5" />
                  <span>Green Points</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">{stats.totalPoints}</div>
                  <div className="text-sm text-muted-foreground">Total Points Earned</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-green-500">{stats.eventsAttended}</div>
                    <div className="text-xs text-muted-foreground">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-purple-500">{stats.impactScore}</div>
                    <div className="text-xs text-muted-foreground">Impact Score</div>
                  </div>
                </div>

                <Button 
                  size="sm" 
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  onClick={() => onNavigate?.('my-impact')}
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Redeem Rewards
                </Button>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            {isEditing && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Shield className="h-5 w-5" />
                    <span>Privacy Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm">Show in Leaderboard</Label>
                        <p className="text-xs text-muted-foreground">Display your rank publicly</p>
                      </div>
                      <Switch
                        checked={privacySettings.showInLeaderboard}
                        onCheckedChange={(checked) => handlePrivacyUpdate('showInLeaderboard', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm">Share Activity</Label>
                        <p className="text-xs text-muted-foreground">Let others see your recent actions</p>
                      </div>
                      <Switch
                        checked={privacySettings.showActivity}
                        onCheckedChange={(checked) => handlePrivacyUpdate('showActivity', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm">Show Achievements</Label>
                        <p className="text-xs text-muted-foreground">Display earned badges</p>
                      </div>
                      <Switch
                        checked={privacySettings.showAchievements}
                        onCheckedChange={(checked) => handlePrivacyUpdate('showAchievements', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact & Notifications */}
            {isEditing && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-white">Contact & Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileUpdate('email', e.target.value)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <Label>Notification Preferences</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm">Email Notifications</Label>
                          <p className="text-xs text-muted-foreground">Project updates, voting reminders</p>
                        </div>
                        <Switch
                          checked={profile.notificationEmail}
                          onCheckedChange={(checked) => handleProfileUpdate('notificationEmail', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm">Push Notifications</Label>
                          <p className="text-xs text-muted-foreground">Instant alerts for community updates</p>
                        </div>
                        <Switch
                          checked={profile.notificationPush}
                          onCheckedChange={(checked) => handleProfileUpdate('notificationPush', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Award className="h-5 w-5" />
                  <span>Community Achievements</span>
                </CardTitle>
                <CardDescription>Your badges and accomplishments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-4 p-4 border border-white/10 rounded-lg">
                    <div className="text-2xl">{achievement.title.split(' ')[0]}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{achievement.title.split(' ').slice(1).join(' ')}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      {achievement.earned ? (
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-green-500">
                            Earned {achievement.earnedDate}
                          </p>
                          <Badge variant="outline" className="text-orange-500 border-orange-500 text-xs">
                            +{achievement.points} pts
                          </Badge>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress: {achievement.progress}%</span>
                            <span>+{achievement.points} pts when earned</span>
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

            {/* Impact Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <TrendingUp className="h-5 w-5" />
                  <span>Your Environmental Impact</span>
                </CardTitle>
                <CardDescription>Real changes you've helped create</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {impactHighlights.map((impact, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                    <span className="text-xl">{impact.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-green-400">{impact.title}</h4>
                      <p className="text-sm text-muted-foreground">{impact.description}</p>
                      <p className="text-xs text-green-500 mt-1">{impact.date}</p>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onNavigate?.('my-impact')}
                >
                  View Full Impact Timeline
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Your latest community actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/20 transition-colors">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="text-sm text-white">
                          <span className="text-muted-foreground">{activity.action}</span>{' '}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{activity.timestamp}</span>
                          <Badge variant="outline" className="text-orange-500 border-orange-500 text-xs">
                            +{activity.points} pts
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => onNavigate?.('my-impact')}
                >
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}