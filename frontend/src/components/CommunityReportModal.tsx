import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { MapPin, Upload, Camera } from 'lucide-react';

interface CommunityReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: any) => void;
}

export function CommunityReportModal({ isOpen, onClose, onSubmit }: CommunityReportModalProps) {
  const [formData, setFormData] = useState({
    location: '',
    coordinates: { lat: 40.7128, lon: -74.0060 },
    issueType: '',
    description: '',
    urgency: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'new',
      votes: { up: 0, down: 0 }
    });
    onClose();
    // Reset form
    setFormData({
      location: '',
      coordinates: { lat: 40.7128, lon: -74.0060 },
      issueType: '',
      description: '',
      urgency: 'medium'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-green-500">
            <MapPin className="h-5 w-5" />
            <span>Submit Community Report</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Section */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Location Information</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Address/Description</Label>
                <Input
                  id="location"
                  placeholder="e.g., Main St & 5th Ave"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Coordinates</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Latitude"
                    type="number"
                    step="any"
                    value={formData.coordinates.lat}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      coordinates: { ...formData.coordinates, lat: parseFloat(e.target.value) || 0 }
                    })}
                  />
                  <Input
                    placeholder="Longitude"
                    type="number"
                    step="any"
                    value={formData.coordinates.lon}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      coordinates: { ...formData.coordinates, lon: parseFloat(e.target.value) || 0 }
                    })}
                  />
                </div>
                <Button type="button" variant="outline" size="sm" className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  Use Current Location
                </Button>
              </div>
            </div>
          </div>

          {/* Issue Details */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Issue Details</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issueType">Issue Category</Label>
                <Select 
                  value={formData.issueType} 
                  onValueChange={(value) => setFormData({ ...formData, issueType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Heat Island">Heat Island</SelectItem>
                    <SelectItem value="Air Quality">Air Quality</SelectItem>
                    <SelectItem value="Flooding">Flooding/Drainage</SelectItem>
                    <SelectItem value="Greenspace">Greenspace Opportunity</SelectItem>
                    <SelectItem value="Noise Pollution">Noise Pollution</SelectItem>
                    <SelectItem value="Safety">Safety Concern</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select 
                  value={formData.urgency} 
                  onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the issue in detail. What did you observe? When does it occur? How does it affect the community?"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-[100px]"
                required
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Photo Evidence (Optional)</Label>
            <Card className="border-dashed">
              <CardContent className="p-6">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload photos to help illustrate the issue
                  </p>
                  <div className="flex justify-center space-x-2">
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                    <Button type="button" variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Notice */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Privacy Notice:</strong> Your report will be shared with city planners and the community. 
              Personal information will be kept confidential. Photos may be used for analysis and planning purposes.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              Submit Report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}