import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
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
  CheckCircle,
  MapPin,
  Phone,
  Globe,
  Shield,
  Zap
} from 'lucide-react';

interface SignupPageProps {
  onSignup: (userType: 'urban-planner' | 'community', userData: any) => void;
  onSwitchToLogin: () => void;
}

export function SignupPage({ onSignup, onSwitchToLogin }: SignupPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<'urban-planner' | 'community'>('urban-planner');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    title: '',
    location: '',
    phone: '',
    website: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });

  const updateFormData = (key: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const userData = {
      ...formData,
      userType,
      name: `${formData.firstName} ${formData.lastName}`,
    };
    
    onSignup(userType, userData);
    setIsLoading(false);
  };

  const userTypeOptions = [
    {
      id: 'urban-planner' as const,
      title: 'Urban Planner',
      description: 'City planners, architects, and policy makers',
      icon: <Building2 className="h-6 w-6" />,
      features: ['Advanced Analytics', 'Policy Tools', 'Resource Management', 'Stakeholder Dashboard'],
      benefits: ['Access to professional planning tools', 'Comprehensive data analytics', 'Stakeholder management features', 'Policy impact assessment']
    },
    {
      id: 'community' as const,
      title: 'Community Member',
      description: 'Residents and community representatives',
      icon: <Users className="h-6 w-6" />,
      features: ['Community Feedback', 'Local Insights', 'Impact Tracking', 'Engagement Tools'],
      benefits: ['Voice your community concerns', 'Track local environmental changes', 'Participate in city planning', 'Connect with neighbors']
    }
  ];

  const passwordStrength = () => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthColor = () => {
    const strength = passwordStrength();
    if (strength < 50) return 'bg-red-500';
    if (strength < 75) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    const strength = passwordStrength();
    if (strength < 25) return 'Very Weak';
    if (strength < 50) return 'Weak';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  const isStep1Valid = userType && formData.firstName && formData.lastName && formData.email;
  const isStep2Valid = formData.password && formData.confirmPassword && 
                      formData.password === formData.confirmPassword && 
                      passwordStrength() >= 50;
  const isStep3Valid = formData.organization && formData.title && formData.location && formData.agreeToTerms;

  return (
    <div className="min-h-screen bg-[#12121e] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <OrbitXLogo size="lg" />
          </div>
          <h1 className="text-white mb-2">Join OrbitX</h1>
          <p className="text-muted-foreground">
            Create your account and start building healthier cities
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    currentStep > step ? 'bg-orange-500' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Step {currentStep} of 3: {
              currentStep === 1 ? 'Account Type & Basic Info' :
              currentStep === 2 ? 'Security & Password' :
              'Professional Details'
            }
          </div>
        </div>

        <form onSubmit={handleSignup}>
          {/* Step 1: User Type & Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-white mb-4">Choose Your Role</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                            <div className="space-y-2">
                              {option.benefits.map((benefit) => (
                                <div key={benefit} className="flex items-center space-x-2 text-xs">
                                  <CheckCircle className={`h-3 w-3 ${
                                    userType === option.id ? 'text-orange-500' : 'text-muted-foreground'
                                  }`} />
                                  <span className="text-muted-foreground">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-white">Basic Information</CardTitle>
                  <CardDescription>Tell us about yourself</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => updateFormData('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) => updateFormData('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button 
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!isStep1Valid}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Security & Password */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Shield className="h-5 w-5" />
                    <span>Account Security</span>
                  </CardTitle>
                  <CardDescription>Create a secure password for your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => updateFormData('password', e.target.value)}
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
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {formData.password && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Password strength</span>
                          <span className={`${
                            passwordStrength() < 50 ? 'text-red-500' :
                            passwordStrength() < 75 ? 'text-orange-500' : 'text-green-500'
                          }`}>
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <Progress 
                          value={passwordStrength()} 
                          className={`h-2 ${getPasswordStrengthColor()}`}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-500">Passwords do not match</p>
                    )}
                  </div>

                  <div className="bg-muted/20 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-500">Password Requirements</span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li className={formData.password.length >= 8 ? 'text-green-500' : ''}>
                        • At least 8 characters long
                      </li>
                      <li className={/[A-Z]/.test(formData.password) ? 'text-green-500' : ''}>
                        • Contains uppercase letter
                      </li>
                      <li className={/[0-9]/.test(formData.password) ? 'text-green-500' : ''}>
                        • Contains number
                      </li>
                      <li className={/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-500' : ''}>
                        • Contains special character
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </Button>
                <Button 
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={!isStep2Valid}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Professional Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <User className="h-5 w-5" />
                    <span>Professional Information</span>
                  </CardTitle>
                  <CardDescription>
                    Help us personalize your OrbitX experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="organization"
                          placeholder={userType === 'urban-planner' ? 'e.g. City Planning Dept' : 'e.g. Residents Association'}
                          value={formData.organization}
                          onChange={(e) => updateFormData('organization', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title / Role</Label>
                      <Input
                        id="title"
                        placeholder={userType === 'urban-planner' ? 'e.g. Urban Planner' : 'e.g. Community Representative'}
                        value={formData.title}
                        onChange={(e) => updateFormData('title', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="City, State/Region, Country"
                        value={formData.location}
                        onChange={(e) => updateFormData('location', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website (Optional)</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="website"
                          placeholder="https://your-website.com"
                          value={formData.website}
                          onChange={(e) => updateFormData('website', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                        className="mt-1"
                        required
                      />
                      <div className="flex-1">
                        <Label htmlFor="agreeToTerms" className="text-sm cursor-pointer">
                          I agree to the{' '}
                          <Button variant="link" className="p-0 h-auto text-orange-500 hover:text-orange-400">
                            Terms of Service
                          </Button>{' '}
                          and{' '}
                          <Button variant="link" className="p-0 h-auto text-orange-500 hover:text-orange-400">
                            Privacy Policy
                          </Button>
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="subscribeNewsletter"
                        checked={formData.subscribeNewsletter}
                        onChange={(e) => updateFormData('subscribeNewsletter', e.target.checked)}
                        className="mt-1"
                      />
                      <Label htmlFor="subscribeNewsletter" className="text-sm cursor-pointer">
                        Subscribe to our newsletter for updates on sustainable urban development
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                >
                  Back
                </Button>
                <Button 
                  type="submit"
                  disabled={!isStep3Valid || isLoading}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>Create Account</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>

        {/* Switch to Login */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button 
              variant="link" 
              className="p-0 text-orange-500 hover:text-orange-400"
              onClick={onSwitchToLogin}
            >
              Sign in here
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}