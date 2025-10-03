import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  TrendingUp, 
  Calendar, 
  ExternalLink,
  Users,
  Leaf,
  Award,
  MessageSquare,
  Share,
  Heart,
  TreePine,
  Droplets,
  Wind,
  Thermometer,
  Vote,
  DollarSign,
  Clock,
  MapPin,
  Target,
  Zap,
  CheckCircle
} from 'lucide-react';

interface CityUpdatesPageProps {
  onNavigate?: (page: string) => void;
}

export function CityUpdatesPage({ onNavigate }: CityUpdatesPageProps) {
  const [likedStories, setLikedStories] = useState<string[]>([]);

  const successStories = [
    {
      id: 'vertical-garden-success',
      title: 'Vertical garden reduced temps by 2°C at Downtown Library!',
      description: 'The living wall installation has exceeded expectations, providing measurable cooling benefits and becoming a popular community gathering spot.',
      image: '🌿',
      date: 'July 2024',
      impact: 'Temperature reduction',
      metrics: '2°C cooler, 40% humidity increase',
      communityReports: 12,
      likes: 89
    },
    {
      id: 'wetland-flooding',
      title: 'New wetland saved 3 homes from flooding last storm',
      description: 'The bioswale system installed based on community flood reports successfully managed stormwater during last week\'s heavy rainfall.',
      image: '💧',
      date: 'June 2024',
      impact: 'Flood prevention',
      metrics: '15,000 gallons managed, 0 flood incidents',
      communityReports: 8,
      likes: 156
    },
    {
      id: 'pollinator-highway',
      title: 'Bee Highway brings back butterflies to Main Street',
      description: 'Native plant installations have created a thriving pollinator corridor, with 300% increase in butterfly sightings.',
      image: '🦋',
      date: 'May 2024',
      impact: 'Biodiversity boost',
      metrics: '15 new species documented, 300% increase',
      communityReports: 23,
      likes: 234
    }
  ];

  const dataInsights = [
    {
      icon: <Wind className="h-6 w-6 text-purple-500" />,
      title: 'Air quality improved by 15% near schools this year',
      description: 'Community reports helped identify pollution hotspots',
      color: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      icon: <TreePine className="h-6 w-6 text-green-500" />,
      title: 'We planted 500 trees — that\'s 1 ton of CO₂ sequestered!',
      description: 'Based on heat stress reports from residents',
      color: 'bg-green-500/10 border-green-500/20'
    },
    {
      icon: <Droplets className="h-6 w-6 text-blue-500" />,
      title: 'Neighborhood flood risk reduced by 30%',
      description: 'Rain gardens and bioswales are working',
      color: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      icon: <Thermometer className="h-6 w-6 text-red-500" />,
      title: 'Average summer temps down 1.8°C in treated areas',
      description: 'Green infrastructure providing real cooling',
      color: 'bg-red-500/10 border-red-500/20'
    }
  ];

  const upcomingEvents = [
    {
      id: 'planting-day',
      title: 'Community Planting Day',
      date: 'Saturday 10 AM',
      location: 'Oak Park',
      description: 'Help plant native wildflowers and shrubs',
      icon: '🌱',
      attendees: 45,
      type: 'hands-on'
    },
    {
      id: 'public-meeting',
      title: 'Public Meeting: New Green Plan',
      date: 'Tuesday 6 PM',
      location: 'City Hall',
      description: 'Community input on next phase of environmental projects',
      icon: '📊',
      attendees: 89,
      type: 'planning'
    },
    {
      id: 'nature-walk',
      title: 'Guided Biodiversity Walk',
      date: 'Sunday 9 AM',
      location: 'Riverside Trail',
      description: 'Learn about local wildlife and habitat restoration',
      icon: '🔍',
      attendees: 23,
      type: 'educational'
    }
  ];

  const policyWins = [
    {
      title: 'Your votes helped approve $500K for green spaces!',
      description: 'Community voting platform drove 73% support for environmental funding',
      impact: '$500,000 approved',
      icon: '💰',
      date: 'Last month'
    },
    {
      title: 'City Council passed the Urban Canopy Act',
      description: 'Thanks to your feedback on tree coverage needs',
      impact: '40% canopy goal by 2030',
      icon: '🌳',
      date: '2 months ago'
    },
    {
      title: 'New Air Quality Monitoring Network funded',
      description: 'Based on community pollution reports and health data',
      impact: '12 new monitoring stations',
      icon: '🌫️',
      date: '3 months ago'
    }
  ];

  const communityStats = {
    satisfaction: 86,
    activeMembers: 1247,
    reportsProcessed: 89,
    projectsCompleted: 23
  };

  const handleLike = (storyId: string) => {
    setLikedStories(prev => 
      prev.includes(storyId) 
        ? prev.filter(id => id !== storyId)
        : [...prev, storyId]
    );
  };

  const handleShare = (storyTitle: string) => {
    if (navigator.share) {
      navigator.share({
        title: storyTitle,
        text: 'Check out this environmental success story from our community!',
        url: window.location.href
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(`${storyTitle} - ${window.location.href}`);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-orange-500 mb-2">
          📰 City Updates & Stories
        </h1>
        <p className="text-muted-foreground">
          Celebrating wins, sharing data, and showcasing community-driven environmental progress
        </p>
      </div>

      {/* Community Impact Summary */}
      <Card className="p-6 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-orange-500/10 border-green-500/20">
        <h2 className="text-xl font-semibold mb-4 text-center">Total Community Impact</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{communityStats.satisfaction}%</div>
            <div className="text-sm text-muted-foreground">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{communityStats.activeMembers}</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">{communityStats.reportsProcessed}</div>
            <div className="text-sm text-muted-foreground">Reports Processed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">{communityStats.projectsCompleted}</div>
            <div className="text-sm text-muted-foreground">Projects Completed</div>
          </div>
        </div>
      </Card>

      {/* Success Stories */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-green-500" />
          <h2 className="text-xl font-semibold">Success Stories</h2>
        </div>
        
        <div className="space-y-4">
          {successStories.map((story) => (
            <Card key={story.id} className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center text-2xl">
                    {story.image}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{story.title}</h3>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      {story.date}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{story.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">
                        <strong>Impact:</strong> {story.impact}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        <strong>Metrics:</strong> {story.metrics}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {story.communityReports} community reports
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className={`h-3 w-3 ${likedStories.includes(story.id) ? 'text-red-500 fill-current' : ''}`} />
                        {story.likes + (likedStories.includes(story.id) ? 1 : 0)}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(story.id)}
                        className={likedStories.includes(story.id) ? 'text-red-500' : ''}
                      >
                        <Heart className={`h-4 w-4 ${likedStories.includes(story.id) ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(story.title)}
                      >
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Data Made Simple */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Data Made Simple</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dataInsights.map((insight, index) => (
            <Card key={index} className={`p-4 ${insight.color}`}>
              <div className="flex items-start gap-3">
                {insight.icon}
                <div>
                  <h3 className="font-medium mb-1">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-orange-500" />
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
        </div>
        
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{event.icon}</span>
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.attendees} attending
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Badge variant="outline" className={`text-xs ${
                    event.type === 'hands-on' ? 'text-green-500 border-green-500' :
                    event.type === 'planning' ? 'text-blue-500 border-blue-500' :
                    'text-orange-500 border-orange-500'
                  }`}>
                    {event.type}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Join Event
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Policy Wins */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Vote className="h-5 w-5 text-purple-500" />
          <h2 className="text-xl font-semibold">Policy Wins</h2>
        </div>
        
        <div className="space-y-3">
          {policyWins.map((win, index) => (
            <Card key={index} className="p-4 bg-green-500/5 border-green-500/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">{win.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium">{win.title}</h3>
                    <Badge variant="outline" className="text-green-500 border-green-500 text-xs">
                      {win.date}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{win.description}</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-500">{win.impact}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Share Your Story CTA */}
      <Card className="p-6 text-center bg-gradient-to-r from-orange-500/10 to-green-500/10 border-orange-500/20">
        <h3 className="font-semibold mb-2">Share Your Environmental Win!</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Noticed positive changes in your neighborhood? Help celebrate community success stories.
        </p>
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            onClick={() => onNavigate?.('submit-report')}
          >
            📝 Submit Success Story
          </Button>
          <Button
            onClick={() => handleShare('Check out our community\'s environmental progress!')}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Share className="h-4 w-4 mr-2" />
            Share This Progress
          </Button>
        </div>
      </Card>
    </div>
  );
}