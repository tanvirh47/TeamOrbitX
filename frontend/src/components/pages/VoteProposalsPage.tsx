import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MapPin, 
  DollarSign, 
  Calendar,
  TrendingUp,
  Users,
  Clock,
  Check,
  Star,
  Filter,
  Heart,
  TreePine,
  Droplets,
  Wind
} from 'lucide-react';

interface VoteProposalsPageProps {
  onNavigate?: (page: string) => void;
}

export function VoteProposalsPage({ onNavigate }: VoteProposalsPageProps) {
  const [filter, setFilter] = useState('all');
  const [votedProposals, setVotedProposals] = useState<{ [key: string]: 'support' | 'oppose' }>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastVotedProposal, setLastVotedProposal] = useState<string>('');
  const [currentPoints, setCurrentPoints] = useState(140);

  const proposals = [
    {
      id: 'urban-meadow',
      title: 'Urban Meadow at Riverside Lot',
      location: 'Riverside District',
      benefits: 'Cooler streets, more butterflies, flood protection',
      cost: '$8,000 (city-funded)',
      supportPercentage: 62,
      totalVotes: 124,
      deadline: '3 days',
      category: 'green-space',
      icon: '🌻',
      mapPreview: 'riverside-lot',
      description: 'Transform vacant lot into native wildflower meadow with walking paths',
      impact: 'Environmental',
      priority: 'high'
    },
    {
      id: 'vertical-garden',
      title: 'Living Wall at Community Center',
      location: 'Oak Street',
      benefits: 'Air purification, cooling, beautiful space',
      cost: '$12,500 (grant-funded)',
      supportPercentage: 78,
      totalVotes: 89,
      deadline: '1 week',
      category: 'air-quality',
      icon: '🌿',
      mapPreview: 'community-center',
      description: 'Install 20ft vertical garden system on south-facing wall',
      impact: 'Health',
      priority: 'medium'
    },
    {
      id: 'rain-gardens',
      title: 'Neighborhood Rain Gardens',
      location: 'Multiple locations',
      benefits: 'Flood prevention, groundwater recharge',
      cost: '$15,000 (state grant)',
      supportPercentage: 45,
      totalVotes: 67,
      deadline: '5 days',
      category: 'flood-prevention',
      icon: '💧',
      mapPreview: 'multiple-sites',
      description: 'Install bioswales and rain gardens at 8 strategic locations',
      impact: 'Infrastructure',
      priority: 'high'
    },
    {
      id: 'pollinator-corridor',
      title: 'Bee Highway Along Main Street',
      location: 'Main Street Corridor',
      benefits: 'Support pollinators, educational opportunity',
      cost: '$6,200 (community-funded)',
      supportPercentage: 71,
      totalVotes: 156,
      deadline: '2 weeks',
      category: 'biodiversity',
      icon: '🐝',
      mapPreview: 'main-street',
      description: 'Plant native flowering shrubs and trees to create pollinator pathway',
      impact: 'Ecological',
      priority: 'medium'
    },
    {
      id: 'cool-pavilion',
      title: 'Shade Pavilion at Playground',
      location: 'Central Park',
      benefits: 'Heat relief for families, community gathering',
      cost: '$18,000 (city budget)',
      supportPercentage: 85,
      totalVotes: 203,
      deadline: '4 days',
      category: 'heat-relief',
      icon: '🏛️',
      mapPreview: 'central-park',
      description: 'Solar-powered pavilion with green roof and seating area',
      impact: 'Social',
      priority: 'high'
    }
  ];

  const handleVote = (proposalId: string, vote: 'support' | 'oppose') => {
    setVotedProposals(prev => ({ ...prev, [proposalId]: vote }));
    setLastVotedProposal(proposalId);
    setCurrentPoints(prev => prev + 10);
    setShowConfirmation(true);
  };

  const filteredProposals = proposals.filter(proposal => {
    if (filter === 'all') return true;
    if (filter === 'near-me') return ['Oak Street', 'Central Park', 'Riverside District'].includes(proposal.location);
    if (filter === 'most-popular') return proposal.supportPercentage > 70;
    return true;
  });

  const getProposalById = (id: string) => proposals.find(p => p.id === id);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-orange-500 mb-2">
          🗳️ Vote on Proposals
        </h1>
        <p className="text-muted-foreground">
          Help shape our city — vote on these community-driven environmental projects
        </p>
      </div>

      {/* Filter & Stats */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-orange-500" />
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Show All</SelectItem>
                  <SelectItem value="near-me">Near Me</SelectItem>
                  <SelectItem value="most-popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-muted-foreground">
                {proposals.reduce((sum, p) => sum + p.totalVotes, 0)} total votes
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-orange-500" />
              <span className="text-muted-foreground">
                +10 pts per vote
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Proposals */}
      <div className="space-y-4">
        {filteredProposals.map((proposal) => {
          const hasVoted = proposal.id in votedProposals;
          const userVote = votedProposals[proposal.id];
          
          return (
            <Card key={proposal.id} className={`p-6 ${hasVoted ? 'border-green-500/20 bg-green-500/5' : ''}`}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{proposal.icon}</span>
                      <div>
                        <h3 className="font-semibold text-lg">{proposal.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {proposal.location}
                          </div>
                          <Badge variant="outline" className={`text-xs ${
                            proposal.impact === 'Environmental' ? 'text-green-500 border-green-500' :
                            proposal.impact === 'Health' ? 'text-blue-500 border-blue-500' :
                            proposal.impact === 'Infrastructure' ? 'text-purple-500 border-purple-500' :
                            proposal.impact === 'Ecological' ? 'text-emerald-500 border-emerald-500' :
                            'text-orange-500 border-orange-500'
                          }`}>
                            {proposal.impact}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {hasVoted && (
                      <Badge variant="outline" className="text-green-500 border-green-500">
                        <Check className="h-3 w-3 mr-1" />
                        Voted
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">{proposal.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Benefits:</span>
                    </div>
                    <div className="sm:col-span-2 text-muted-foreground">
                      {proposal.benefits}
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">Cost:</span>
                    </div>
                    <div className="sm:col-span-2 text-muted-foreground">
                      {proposal.cost}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Deadline:</span>
                    </div>
                    <div className="sm:col-span-2 text-muted-foreground">
                      Voting closes in {proposal.deadline}
                    </div>
                  </div>
                </div>

                {/* Voting Section */}
                <div className="space-y-4">
                  {/* Map Preview */}
                  <div className="h-24 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-6 w-6 mx-auto mb-1 text-orange-500" />
                      <p className="text-xs text-muted-foreground">{proposal.location}</p>
                    </div>
                  </div>

                  {/* Live Results */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Live Results</span>
                      <span className="text-muted-foreground">{proposal.totalVotes} votes</span>
                    </div>
                    <Progress value={proposal.supportPercentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{proposal.supportPercentage}% support</span>
                      <span>{100 - proposal.supportPercentage}% oppose</span>
                    </div>
                  </div>

                  {/* Voting Buttons */}
                  {!hasVoted ? (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleVote(proposal.id, 'support')}
                        className="flex-1 bg-green-500 hover:bg-green-600"
                        size="sm"
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Support
                      </Button>
                      <Button
                        onClick={() => handleVote(proposal.id, 'oppose')}
                        variant="outline"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-500/10"
                        size="sm"
                      >
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        Oppose
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center justify-center gap-2 text-green-500">
                        <Check className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          You voted to {userVote}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        +10 Green Points earned
                      </p>
                    </div>
                  )}

                  {/* Priority Badge */}
                  <div className="text-center">
                    <Badge 
                      variant="outline" 
                      className={`${
                        proposal.priority === 'high' ? 'text-red-500 border-red-500' :
                        proposal.priority === 'medium' ? 'text-orange-500 border-orange-500' :
                        'text-green-500 border-green-500'
                      }`}
                    >
                      {proposal.priority} priority
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Call to Action */}
      <Card className="p-6 text-center bg-gradient-to-r from-orange-500/10 to-green-500/10 border-orange-500/20">
        <h3 className="font-semibold mb-2">Your Voice Matters!</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Every vote helps prioritize projects that will improve our community's environmental health
        </p>
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            onClick={() => onNavigate?.('submit-report')}
          >
            Suggest New Project
          </Button>
          <Button
            onClick={() => onNavigate?.('my-impact')}
            className="bg-orange-500 hover:bg-orange-600"
          >
            View My Impact
          </Button>
        </div>
      </Card>

      {/* Voting Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-green-500">
              🎉 Thank You for Voting!
            </DialogTitle>
            <DialogDescription>
              Your vote has been recorded and you've earned Green Points for participating
            </DialogDescription>
          </DialogHeader>
          
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            
            <div>
              <p className="font-medium mb-2">Your vote has been recorded!</p>
              <p className="text-sm text-muted-foreground">
                You've earned <span className="text-green-500 font-medium">10 Green Points</span>.
                Results will be used to prioritize funding.
              </p>
            </div>

            {lastVotedProposal && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-sm">
                  <strong>{getProposalById(lastVotedProposal)?.title}</strong>
                </p>
                <p className="text-xs text-muted-foreground">
                  Your vote: <span className="capitalize font-medium">
                    {votedProposals[lastVotedProposal]}
                  </span>
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowConfirmation(false)}
              >
                Continue Voting
              </Button>
              <Button
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                onClick={() => {
                  setShowConfirmation(false);
                  onNavigate?.('my-impact');
                }}
              >
                View My Points
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}