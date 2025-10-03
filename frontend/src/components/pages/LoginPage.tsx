import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { OrbitXLogo } from '../OrbitXLogo';
import { 
  User, 
  Users, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Leaf,
  Building2,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (userType: 'urban-planner' | 'community', userData: any) => void;
  onSwitchToSignup: () => void;
}

export function LoginPage({ onLogin, onSwitchToSignup }: LoginPageProps) {
  const [userType, setUserType] = useState<'urban-planner' | 'community'>('urban-planner');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const userData = {
      email,
      userType,
      name: userType === 'urban-planner' ? 'Dr. Sarah Chen' : 'Maria Rodriguez',
      title: userType === 'urban-planner' ? 'Senior Urban Planner' : 'Community Representative',
      organization: userType === 'urban-planner' ? 'Metropolitan Planning Authority' : 'Green Neighborhoods Alliance',
    };
    
    onLogin(userType, userData);
    setIsLoading(false);
  };

  const userTypeOptions = [
    {
      id: 'urban-planner' as const,
      title: 'Urban Planner',
      description: 'City planners, architects, and policy makers',
      icon: <Building2 className="h-6 w-6" />,
      features: ['Advanced Analytics', 'Policy Tools', 'Resource Management', 'Stakeholder Dashboard']
    },
    {
      id: 'community' as const,
      title: 'Community Member',
      description: 'Residents and community representatives',
      icon: <Users className="h-6 w-6" />,
      features: ['Community Feedback', 'Local Insights', 'Impact Tracking', 'Engagement Tools']
    }
  ];

  return (
    <div className="min-h-screen bg-[#12121e] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <OrbitXLogo size="lg" />
          </div>
          <h1 className="text-white mb-2">Welcome to OrbitX</h1>
          <p className="text-muted-foreground">
            Community-Driven Biophilic Cockpit for Healthy City Growth
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Type Selection */}
          <div className="space-y-6">
            <div>
              <h2 className="text-white mb-4">Choose Your Role</h2>
              <div className="space-y-4">
                {userTypeOptions.map((option) => (
                  <Card 
                    key={option.id}
                    className={`cursor-pointer transition-all ${
                      userType === option.id 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-white/10 hover:border-white/20'
                    }`}
                    onClick={() => setUserType(option.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${
                          userType === option.id ? 'bg-orange-500 text-white' : 'bg-muted text-muted-foreground'
                        }`}>
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-white">{option.title}</h3>
                            {userType === option.id && (
                              <CheckCircle className="h-5 w-5 text-orange-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {option.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {option.features.map((feature) => (
                              <Badge 
                                key={feature} 
                                variant="outline" 
                                className={`text-xs ${
                                  userType === option.id 
                                    ? 'border-orange-500/30 text-orange-400' 
                                    : 'border-white/10 text-muted-foreground'
                                }`}
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <User className="h-5 w-5" />
                  <span>Sign In</span>
                </CardTitle>
                <CardDescription>
                  Access your OrbitX dashboard as a {userType === 'urban-planner' ? 'Urban Planner' : 'Community Member'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-white/20" />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <Button variant="link" className="p-0 text-orange-500 hover:text-orange-400">
                      Forgot password?
                    </Button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Sign In</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>

                  <Separator />

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{' '}
                      <Button 
                        variant="link" 
                        className="p-0 text-orange-500 hover:text-orange-400"
                        onClick={onSwitchToSignup}
                      >
                        Sign up here
                      </Button>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Demo Credentials */}
            <Card className="mt-4 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Leaf className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">Demo Credentials</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Use these credentials to explore the platform:
                </p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p><strong>Urban Planner:</strong> sarah.chen@orbitx.com / demo123</p>
                  <p><strong>Community:</strong> maria.rodriguez@community.org / demo123</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}