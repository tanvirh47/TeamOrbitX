import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { 
  Star, 
  Award, 
  TrendingUp, 
  Calendar,
  Users,
  Gift,
  Trophy,
  Leaf,
  Vote,
  MessageSquare,
  Target,
  Zap,
  Crown,
  Coffee
} from 'lucide-react';

interface MyImpactPageProps {
  onNavigate?: (page: string) => void;
}

export function MyImpactPage({ onNavigate }: MyImpactPageProps) {
  const [showInLeaderboard, setShowInLeaderboard] = useState(true);
  const [currentPoints] = useState(140);
  const [currentLevel] = useState(2);
  const nextLevelPoints = 150;
  const progressToNext = (currentPoints / nextLevelPoints) * 100;

  const badges = [
    { 
      id: 'first-report', 
      name: '🌱 First Report', 
      earned: true, 
      description: 'Submitted your first community report',
      earnedDate: 'March 2024'
    },
    { 
      id: 'top-voter', 
      name: '🗳️ Top Voter', 
      earned: true, 
      description: 'Voted on 10+ community proposals',
      earnedDate: 'April 2024'
    },
    { 
      id: 'climate-champion', 
      name: '🌍 Climate Champion', 
      earned: false, 
      description: 'Complete 20 environmental reports',
      requirement: '12/20 reports completed'
    },
    { 
      id: 'urban-steward', 
      name: '🏆 Urban Steward', 
      earned: false, 
      description: 'Reach Level 3 with 150+ points',
      requirement: `${currentPoints}/150 points`
    },
    { 
      id: 'neighborhood-hero', 
      name: '🦸 Neighborhood Hero', 
      earned: false, 
      description: 'Help implement 5 community projects',
      requirement: '2/5 projects influenced'
    },
    { 
      id: 'green-influencer', 
      name: '📢 Green Influencer', 
      earned: false, 
      description: 'Share 25 environmental updates',
      requirement: '8/25 shares completed'
    }
  ];

  const impactTimeline = [
    {
      date: 'Jul 2024',
      title: 'Air quality improved by 15% near your school!',
      description: 'Your pollution reports helped identify the problem area',
      icon: '🌫️',
      impact: 'Environmental',
      color: 'text-purple-500'
    },
    {
      date: 'Jun 2024',
      title: 'Your vote helped fund the Downtown Meadow',
      description: 'Community voting resulted in $45K funding approval',
      icon: '🗳️',
      impact: 'Policy',
      color: 'text-blue-500'
    },
    {
      date: 'May 2024',
      title: 'Your report led to new tree planting at Maple St',
      description: '12 shade trees planted based on heat stress reports',
      icon: '🌳',
      impact: 'Infrastructure',
      color: 'text-green-500'
    },
    {
      date: 'Apr 2024',
      title: 'Earned "Top Voter" badge',
      description: 'Participated in community decision-making process',
      icon: '🏆',
      impact: 'Achievement',
      color: 'text-orange-500'
    },
    {
      date: 'Mar 2024',
      title: 'First community report submitted',
      description: 'Started your journey as a neighborhood steward',
      icon: '🌱',
      impact: 'Milestone',
      color: 'text-emerald-500'
    }
  ];

  const leaderboard = [
    { name: 'Maria R.', points: 210, rank: 1, badge: '👑' },
    { name: 'Jamal T.', points: 180, rank: 2, badge: '🥈' },
    { name: 'You', points: currentPoints, rank: 3, badge: '🥉', isCurrentUser: true },
    { name: 'Sarah K.', points: 125, rank: 4, badge: '🌟' },
    { name: 'Mike L.', points: 110, rank: 5, badge: '🌟' }
  ];

  const rewards = [
    {
      name: 'Free Coffee at Green Café',
      cost: 50,
      icon: <Coffee className="h-6 w-6" />,
      available: currentPoints >= 50,
      description: 'Support local sustainable business'
    },
    {
      name: 'Priority Community Meeting Seat',
      cost: 75,
      icon: <Users className="h-6 w-6" />,
      available: currentPoints >= 75,
      description: 'Reserved seating at city planning meetings'
    },
    {
      name: 'Urban Garden Starter Kit',
      cost: 100,
      icon: <Leaf className="h-6 w-6" />,
      available: currentPoints >= 100,
      description: 'Seeds, tools, and guide for home gardening'
    },
    {
      name: 'Tree Naming Rights',
      cost: 200,
      icon: <Trophy className="h-6 w-6" />,
      available: currentPoints >= 200,
      description: 'Name a tree in the next city planting project'
    }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-orange-500 mb-2">
          🌟 My Impact & Green Points
        </h1>
        <p className="text-muted-foreground">
          Track how your participation creates real environmental change
        </p>
      </div>

      {/* Points Counter & Level Progress */}
      <Card className="p-6 bg-gradient-to-r from-orange-500/10 via-green-500/10 to-blue-500/10 border-orange-500/20">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-8 w-8 text-orange-500" />
            <span className="text-3xl font-bold text-orange-500">{currentPoints}</span>
            <span className="text-lg text-muted-foreground">Green Points!</span>
          </div>
          <Badge variant="outline" className="text-green-500 border-green-500">
            Level {currentLevel}: Community Advocate
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to Level {currentLevel + 1}: Urban Steward</span>
            <span>{currentPoints}/{nextLevelPoints} pts</span>
          </div>
          <Progress value={progressToNext} className="h-3" />
          <p className="text-center text-sm text-muted-foreground">
            {nextLevelPoints - currentPoints} points needed to level up!
          </p>
        </div>
      </Card>

      {/* Badges Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-orange-500" />
          <h2 className="text-xl font-semibold">Achievements & Badges</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-lg border transition-all ${
                badge.earned 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : 'bg-muted/10 border-muted/20 opacity-60'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{badge.name}</div>
                <div className="text-sm font-medium mb-1">
                  {badge.name.split(' ').slice(1).join(' ')}
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  {badge.description}
                </div>
                
                {badge.earned ? (
                  <Badge variant="outline" className="text-green-500 border-green-500 text-xs">
                    Earned {badge.earnedDate}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-orange-500 border-orange-500 text-xs">
                    {badge.requirement}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Impact Timeline */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <h2 className="text-xl font-semibold">Your Impact Timeline</h2>
        </div>

        <div className="space-y-4">
          {impactTimeline.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-muted/20 rounded-full flex items-center justify-center text-sm">
                  {item.icon}
                </div>
                {index !== impactTimeline.length - 1 && (
                  <div className="w-px h-12 bg-border mt-2"></div>
                )}
              </div>
              
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{item.title}</span>
                  <Badge variant="outline" className={`text-xs ${item.color} border-current`}>
                    {item.impact}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Leaderboard */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Community Leaderboard</h2>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="leaderboard-visibility"
              checked={showInLeaderboard}
              onCheckedChange={setShowInLeaderboard}
            />
            <Label htmlFor="leaderboard-visibility" className="text-sm">
              Show me in leaderboard
            </Label>
          </div>
        </div>

        {showInLeaderboard ? (
          <div className="space-y-2">
            {leaderboard.map((user, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  user.isCurrentUser 
                    ? 'bg-orange-500/10 border border-orange-500/20' 
                    : 'bg-muted/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{user.badge}</span>
                  <div>
                    <div className="font-medium">
                      {user.isCurrentUser ? 'You' : user.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Rank #{user.rank}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-orange-500">{user.points} pts</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>You've opted out of the public leaderboard</p>
            <p className="text-sm">Your points and progress are still tracked privately</p>
          </div>
        )}
      </Card>

      {/* Rewards Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="h-5 w-5 text-purple-500" />
          <h2 className="text-xl font-semibold">Redeem Rewards</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                reward.available 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : 'bg-muted/10 border-muted/20 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  reward.available ? 'bg-green-500/20' : 'bg-muted/20'
                }`}>
                  {reward.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">{reward.name}</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {reward.description}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={`text-xs ${
                      reward.available 
                        ? 'text-green-500 border-green-500' 
                        : 'text-muted-foreground border-muted'
                    }`}>
                      {reward.cost} pts
                    </Badge>
                    <Button 
                      size="sm" 
                      variant={reward.available ? "default" : "outline"}
                      disabled={!reward.available}
                      className={reward.available ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {reward.available ? 'Redeem' : 'Locked'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground mb-2">
            Partner rewards from local sustainable businesses
          </p>
          <Button variant="outline" className="w-full">
            <Gift className="h-4 w-4 mr-2" />
            View All Partner Offers
          </Button>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button
          variant="outline"
          className="h-16 flex-col gap-2"
          onClick={() => onNavigate?.('submit-report')}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs">+20 pts</span>
        </Button>
        <Button
          variant="outline"
          className="h-16 flex-col gap-2"
          onClick={() => onNavigate?.('vote-proposals')}
        >
          <Vote className="h-5 w-5" />
          <span className="text-xs">+10 pts</span>
        </Button>
        <Button
          variant="outline"
          className="h-16 flex-col gap-2"
          onClick={() => onNavigate?.('city-updates')}
        >
          <Zap className="h-5 w-5" />
          <span className="text-xs">+15 pts</span>
        </Button>
        <Button
          variant="outline"
          className="h-16 flex-col gap-2"
        >
          <Target className="h-5 w-5" />
          <span className="text-xs">+50 pts</span>
        </Button>
      </div>
    </div>
  );
}