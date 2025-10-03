import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  User,
  Thermometer,
  Droplets,
  Wind,
  Trees,
  Eye
} from 'lucide-react';

interface CommunityReport {
  id: string;
  title: string;
  description: string;
  category: 'heat' | 'flood' | 'air-quality' | 'green-space' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  location: string;
  coordinates: { lat: number; lon: number };
  submittedBy: string;
  submittedAt: Date;
  updatedAt: Date;
  votes: number;
  comments: number;
}

export function ViewAllReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  // Mock data for reports
  const [reports] = useState<CommunityReport[]>([
    {
      id: '1',
      title: 'Extreme Heat in Downtown Plaza',
      description: 'The concrete plaza gets extremely hot during midday, making it uncomfortable for pedestrians and affecting local businesses.',
      category: 'heat',
      severity: 'high',
      status: 'in-progress',
      location: 'Downtown Plaza, 5th Street',
      coordinates: { lat: 40.7128, lon: -74.0060 },
      submittedBy: 'Maria Rodriguez',
      submittedAt: new Date('2024-01-15T10:30:00'),
      updatedAt: new Date('2024-01-16T14:20:00'),
      votes: 23,
      comments: 8
    },
    {
      id: '2',
      title: 'Poor Air Quality Near Highway',
      description: 'Residents in the area report persistent coughing and respiratory issues, especially during rush hours.',
      category: 'air-quality',
      severity: 'critical',
      status: 'open',
      location: 'Riverside Drive, Block 400',
      coordinates: { lat: 40.7589, lon: -73.9851 },
      submittedBy: 'James Chen',
      submittedAt: new Date('2024-01-14T16:45:00'),
      updatedAt: new Date('2024-01-14T16:45:00'),
      votes: 41,
      comments: 15
    },
    {
      id: '3',
      title: 'Flooding During Heavy Rain',
      description: 'Water accumulates in this intersection during heavy rainfall, creating hazardous conditions for vehicles and pedestrians.',
      category: 'flood',
      severity: 'medium',
      status: 'open',
      location: 'Oak Street & Maple Ave Intersection',
      coordinates: { lat: 40.7282, lon: -73.9942 },
      submittedBy: 'Sarah Johnson',
      submittedAt: new Date('2024-01-13T09:15:00'),
      updatedAt: new Date('2024-01-13T09:15:00'),
      votes: 17,
      comments: 5
    },
    {
      id: '4',
      title: 'Need More Green Spaces',
      description: 'This neighborhood lacks adequate green spaces for recreation and community gatherings. Could benefit from a small park.',
      category: 'green-space',
      severity: 'low',
      status: 'resolved',
      location: 'Sunset District, Block 200',
      coordinates: { lat: 40.7829, lon: -73.9654 },
      submittedBy: 'Michael Thompson',
      submittedAt: new Date('2024-01-10T11:00:00'),
      updatedAt: new Date('2024-01-15T08:30:00'),
      votes: 32,
      comments: 12
    },
    {
      id: '5',
      title: 'Stagnant Water in Park',
      description: 'Standing water in the park attracts mosquitoes and creates unpleasant odors. Drainage system needs attention.',
      category: 'flood',
      severity: 'medium',
      status: 'in-progress',
      location: 'Central Park, East Section',
      coordinates: { lat: 40.7505, lon: -73.9934 },
      submittedBy: 'Lisa Wang',
      submittedAt: new Date('2024-01-12T14:20:00'),
      updatedAt: new Date('2024-01-14T10:15:00'),
      votes: 19,
      comments: 7
    }
  ]);

  const categoryIcons = {
    heat: <Thermometer className="h-4 w-4" />,
    flood: <Droplets className="h-4 w-4" />,
    'air-quality': <Wind className="h-4 w-4" />,
    'green-space': <Trees className="h-4 w-4" />,
    other: <AlertTriangle className="h-4 w-4" />
  };

  const categoryColors = {
    heat: 'text-red-500',
    flood: 'text-blue-500',
    'air-quality': 'text-purple-500',
    'green-space': 'text-green-500',
    other: 'text-gray-500'
  };

  const statusColors = {
    open: 'bg-red-500/10 text-red-500 border-red-500/20',
    'in-progress': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    resolved: 'bg-green-500/10 text-green-500 border-green-500/20',
    closed: 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  };

  const severityColors = {
    low: 'bg-green-500/10 text-green-500',
    medium: 'bg-orange-500/10 text-orange-500',
    high: 'bg-red-500/10 text-red-500',
    critical: 'bg-red-600/20 text-red-400'
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    const matchesSeverity = selectedSeverity === 'all' || report.severity === selectedSeverity;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesSeverity;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 lg:p-6 h-full">
      <div className="w-full max-w-7xl mx-auto h-full">
        {/* Header */}
        <div className="w-full max-w-full overflow-hidden mb-3 sm:mb-4 lg:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-orange-500 mb-1 sm:mb-2 truncate">Community Reports</h2>
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-tight">
                View and manage all community-submitted environmental reports and feedback.
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="w-full max-w-full overflow-hidden mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports by title, description, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="heat">Heat Issues</SelectItem>
                    <SelectItem value="flood">Flood/Water</SelectItem>
                    <SelectItem value="air-quality">Air Quality</SelectItem>
                    <SelectItem value="green-space">Green Spaces</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold text-orange-500">{reports.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Open Issues</p>
                  <p className="text-2xl font-bold text-red-500">{reports.filter(r => r.status === 'open').length}</p>
                </div>
                <Clock className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-orange-500">{reports.filter(r => r.status === 'in-progress').length}</p>
                </div>
                <Filter className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-green-500">{reports.filter(r => r.status === 'resolved').length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="w-full hover:bg-muted/20 transition-colors">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`${categoryColors[report.category]} flex-shrink-0 mt-1`}>
                        {categoryIcons[report.category]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white mb-1 truncate">{report.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{report.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge variant="outline" className={statusColors[report.status]}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </Badge>
                      <Badge variant="outline" className={severityColors[report.severity]}>
                        {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{report.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>by {report.submittedBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(report.submittedAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row lg:flex-col items-center lg:items-end gap-4 lg:gap-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{report.votes} votes</span>
                      <span>{report.comments} comments</span>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Eye className="h-3 w-3" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <Card className="w-full">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Reports Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters to find more reports.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}