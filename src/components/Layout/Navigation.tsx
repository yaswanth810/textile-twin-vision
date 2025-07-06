import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'factory', label: '3D Factory', icon: '🏭' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'machines', label: 'Machines', icon: '⚙️' },
    { id: 'alerts', label: 'Alerts', icon: '🚨', hasNotification: true }
  ];

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-primary">
              DigitalTwin
            </div>
            <Badge variant="secondary" className="text-xs">
              Textile MSME
            </Badge>
          </div>
          
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <div key={tab.id} className="relative">
                <Button
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onTabChange(tab.id)}
                  className="transition-smooth"
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </Button>
                {tab.hasNotification && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-danger-red rounded-full animate-pulse-glow" />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-safety-green border-safety-green">
              ● Live
            </Badge>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;