import React, { useState } from 'react';
import Navigation from '@/components/Layout/Navigation';
import Factory3D from '@/components/Factory3D/Factory3D';
import Dashboard from '@/components/Dashboard/Dashboard';
import Analytics from '@/components/Analytics/Analytics';
import Machines from '@/components/Machines/Machines';
import Alerts from '@/components/Alerts/Alerts';

const Index = () => {
  const [activeTab, setActiveTab] = useState('factory');

  const renderContent = () => {
    switch (activeTab) {
      case 'factory':
        return <Factory3D />;
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'machines':
        return <Machines />;
      case 'alerts':
        return <Alerts />;
      default:
        return <Factory3D />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="transition-smooth">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
