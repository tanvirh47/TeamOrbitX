import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Target, BarChart3, Home } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const pages = [
    { 
      id: 'home', 
      name: 'Home', 
      icon: Home, 
      description: 'Dashboard',
      color: 'text-white'
    },
    { 
      id: 'digital-twin', 
      name: 'Digital Twin', 
      icon: MapPin, 
      description: 'City Visualization',
      color: 'text-orange-500'
    },
    { 
      id: 'simulator', 
      name: 'Simulator', 
      icon: Target, 
      description: 'Interventions',
      color: 'text-green-500'
    },
    { 
      id: 'metrics', 
      name: 'Metrics', 
      icon: BarChart3, 
      description: 'Analytics',
      color: 'text-blue-500'
    },
  ];

  return (
    <nav className="hidden lg:flex items-center space-x-2">
      {pages.map((page) => {
        const Icon = page.icon;
        const isActive = currentPage === page.id;
        
        return (
          <Button
            key={page.id}
            variant={isActive ? "default" : "ghost"}
            size="sm"
            onClick={() => onPageChange(page.id)}
            className={`flex items-center space-x-2 ${
              isActive 
                ? 'bg-orange-600 hover:bg-orange-700' 
                : 'hover:bg-muted/50'
            }`}
          >
            <Icon className={`h-4 w-4 ${isActive ? 'text-white' : page.color}`} />
            <div className="flex flex-col items-start">
              <span className="text-sm">{page.name}</span>
              <span className="text-xs opacity-70">{page.description}</span>
            </div>
          </Button>
        );
      })}
    </nav>
  );
}