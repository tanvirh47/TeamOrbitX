import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { 
  HelpCircle, 
  Search, 
  Book, 
  Video, 
  MessageCircle, 
  Mail,
  ExternalLink,
  Download,
  Lightbulb,
  Users,
  FileText,
  PlayCircle,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Globe
} from 'lucide-react';

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Topics', icon: <Book className="h-4 w-4" /> },
    { id: 'getting-started', label: 'Getting Started', icon: <Lightbulb className="h-4 w-4" /> },
    { id: 'digital-twin', label: 'Digital Twin', icon: <Globe className="h-4 w-4" /> },
    { id: 'simulator', label: 'Simulator', icon: <Zap className="h-4 w-4" /> },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: <Shield className="h-4 w-4" /> }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I get started with OrbitX?',
      answer: 'Welcome to OrbitX! Start by exploring the Digital Twin to view your city\'s current environmental data. Then use the Simulator to test interventions and monitor results in the Metrics dashboard.',
      popularity: 95
    },
    {
      id: 2,
      category: 'digital-twin',
      question: 'How do I interpret the heat risk overlays?',
      answer: 'Heat risk overlays use color coding: Red indicates high risk areas with temperatures above safe thresholds, yellow shows moderate risk, and green represents areas within safe temperature ranges. Click on any area for detailed metrics.',
      popularity: 87
    },
    {
      id: 3,
      category: 'simulator',
      question: 'What types of interventions can I simulate?',
      answer: 'You can simulate various biophilic interventions including green roofs, urban forests, water features, permeable surfaces, and green corridors. Each intervention type has different environmental impact parameters.',
      popularity: 82
    },
    {
      id: 4,
      category: 'digital-twin',
      question: 'How often is the environmental data updated?',
      answer: 'Environmental data is updated in real-time from our sensor network. Weather data updates every 15 minutes, air quality every 30 minutes, and satellite imagery is refreshed daily.',
      popularity: 76
    },
    {
      id: 5,
      category: 'troubleshooting',
      question: 'Why is my simulation taking so long to complete?',
      answer: 'Simulation times depend on the complexity of your intervention and the size of the affected area. Complex simulations with multiple variables may take 5-15 minutes. You\'ll receive a notification when complete.',
      popularity: 71
    },
    {
      id: 6,
      category: 'getting-started',
      question: 'How do I submit community feedback?',
      answer: 'Use the Community Feedback widget in the Digital Twin view. Click "Submit Report", select the issue type, mark the location on the map, and provide details. Your feedback helps improve our models.',
      popularity: 68
    },
    {
      id: 7,
      category: 'troubleshooting',
      question: 'The map is not loading properly. What should I do?',
      answer: 'First, check your internet connection. Clear your browser cache and refresh the page. If the issue persists, try switching to satellite view or contact support for assistance.',
      popularity: 64
    },
    {
      id: 8,
      category: 'simulator',
      question: 'Can I save and share my simulation scenarios?',
      answer: 'Yes! Use the Export function in the Simulator to save scenarios as JSON files. You can share these files with colleagues or import them later to continue your work.',
      popularity: 59
    }
  ];

  const tutorials = [
    {
      title: 'Getting Started with OrbitX',
      description: 'A comprehensive overview of the platform features and navigation',
      duration: '8 min',
      type: 'video',
      difficulty: 'Beginner'
    },
    {
      title: 'Understanding Digital Twin Data',
      description: 'Learn to interpret environmental data layers and risk assessments',
      duration: '12 min',
      type: 'video',
      difficulty: 'Intermediate'
    },
    {
      title: 'Creating Your First Simulation',
      description: 'Step-by-step guide to designing and running biophilic interventions',
      duration: '15 min',
      type: 'video',
      difficulty: 'Beginner'
    },
    {
      title: 'Advanced Analytics Techniques',
      description: 'Deep dive into metrics analysis and performance optimization',
      duration: '20 min',
      type: 'video',
      difficulty: 'Advanced'
    }
  ];

  const resources = [
    {
      title: 'User Guide (PDF)',
      description: 'Complete documentation for all platform features',
      size: '2.4 MB',
      type: 'pdf'
    },
    {
      title: 'API Documentation',
      description: 'Technical documentation for developers and integrators',
      type: 'web'
    },
    {
      title: 'Quick Reference Card',
      description: 'Printable reference for common tasks and shortcuts',
      size: '0.8 MB',
      type: 'pdf'
    },
    {
      title: 'Video Tutorial Library',
      description: 'Complete collection of instructional videos',
      type: 'web'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 min-h-full bg-background">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="flex items-center justify-center space-x-2 text-white mb-4">
            <HelpCircle className="h-6 w-6 text-orange-500" />
            <span>Help & Support</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions, access tutorials, and get the help you need to make the most of OrbitX
          </p>
        </div>

        {/* Search and Categories */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for help topics, features, or questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-orange-500 hover:bg-orange-600" : ""}
                  >
                    {category.icon}
                    <span className="ml-2">{category.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQ Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
                <CardDescription>
                  {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={`faq-${faq.id}`} className="border border-white/10 rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex items-center justify-between w-full mr-4">
                          <span className="text-white">{faq.question}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {faq.popularity}% helpful
                            </Badge>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-white mb-2">No results found</h3>
                    <p className="text-muted-foreground">Try adjusting your search terms or category filter</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Video Tutorials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Video className="h-5 w-5" />
                  <span>Video Tutorials</span>
                </CardTitle>
                <CardDescription>Step-by-step guides to help you succeed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:border-white/20 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                        <PlayCircle className="h-6 w-6 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{tutorial.title}</h4>
                        <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{tutorial.duration}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {tutorial.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Need More Help?</CardTitle>
                <CardDescription>Get personalized assistance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Community Forum
                </Button>
                <Separator />
                <div className="text-center text-xs text-muted-foreground">
                  <p>Support available 24/7</p>
                  <p>Average response time: 2 hours</p>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <FileText className="h-5 w-5" />
                  <span>Documentation</span>
                </CardTitle>
                <CardDescription>Download guides and references</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-white/10 rounded-lg hover:border-white/20 transition-colors cursor-pointer">
                    <div>
                      <h4 className="text-sm font-medium text-white">{resource.title}</h4>
                      <p className="text-xs text-muted-foreground">{resource.description}</p>
                      {resource.size && (
                        <span className="text-xs text-muted-foreground">{resource.size}</span>
                      )}
                    </div>
                    {resource.type === 'pdf' ? (
                      <Download className="h-4 w-4 text-orange-500" />
                    ) : (
                      <ExternalLink className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-white">System Status</CardTitle>
                <CardDescription>Current service availability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Platform Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-500">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Services</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-500">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Services</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-500">Operational</span>
                  </div>
                </div>
                <Separator />
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Status Page
                </Button>
              </CardContent>
            </Card>

            {/* Feedback */}
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Rate This Page</CardTitle>
                <CardDescription>Help us improve our documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-6 w-6 text-orange-500 cursor-pointer hover:fill-current"
                    />
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}