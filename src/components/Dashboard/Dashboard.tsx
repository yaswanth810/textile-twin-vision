import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  status?: 'good' | 'warning' | 'critical';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  unit, 
  trend, 
  trendValue, 
  status = 'good' 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'good': return 'text-safety-green';
      case 'warning': return 'text-warning-orange';
      case 'critical': return 'text-danger-red';
      default: return 'text-primary';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '→';
      default: return '';
    }
  };

  return (
    <Card className="p-6 surface-gradient border-border/50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {trend && (
          <div className="flex items-center space-x-1 text-xs">
            <span>{getTrendIcon()}</span>
            <span className={getStatusColor()}>{trendValue}</span>
          </div>
        )}
      </div>
      <div className={`text-3xl font-bold ${getStatusColor()}`}>
        {value}{unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
      </div>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const [liveMetrics, setLiveMetrics] = useState({
    totalProduction: 1247,
    efficiency: 87,
    energyUsage: 324,
    downtime: 12,
    activeWorkers: 15,
    qualityScore: 94.2,
    temperatureAvg: 68,
    maintenanceAlerts: 3
  });

  const [productionData, setProductionData] = useState([
    { time: '00:00', production: 45, efficiency: 85 },
    { time: '04:00', production: 52, efficiency: 92 },
    { time: '08:00', production: 48, efficiency: 87 },
    { time: '12:00', production: 55, efficiency: 94 },
    { time: '16:00', production: 50, efficiency: 89 },
    { time: '20:00', production: 47, efficiency: 86 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        totalProduction: prev.totalProduction + Math.floor(Math.random() * 5),
        efficiency: 85 + Math.floor(Math.random() * 10),
        energyUsage: 320 + Math.floor(Math.random() * 20),
        temperatureAvg: 65 + Math.floor(Math.random() * 8)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const machineStatuses = [
    { name: 'Knitting Machine #1', status: 'running', efficiency: 92, uptime: '8.5h' },
    { name: 'Knitting Machine #2', status: 'idle', efficiency: 0, uptime: '0h' },
    { name: 'Dyeing Unit', status: 'fault', efficiency: 0, uptime: '0h' },
    { name: 'Cutting Station', status: 'running', efficiency: 88, uptime: '7.2h' },
    { name: 'Packing Unit #1', status: 'running', efficiency: 95, uptime: '8.1h' },
    { name: 'Packing Unit #2', status: 'maintenance', efficiency: 0, uptime: '0h' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Production Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and control</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-safety-green border-safety-green animate-pulse-glow">
            ● Live Data
          </Badge>
          <Button variant="outline" size="sm">
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Production Today"
          value={liveMetrics.totalProduction}
          unit="units"
          trend="up"
          trendValue="+8.2%"
          status="good"
        />
        <MetricCard
          title="Overall Efficiency"
          value={liveMetrics.efficiency}
          unit="%"
          trend="up"
          trendValue="+2.1%"
          status={liveMetrics.efficiency > 85 ? 'good' : 'warning'}
        />
        <MetricCard
          title="Energy Usage"
          value={liveMetrics.energyUsage}
          unit="kWh"
          trend="stable"
          trendValue="±0.5%"
          status="good"
        />
        <MetricCard
          title="Downtime Today"
          value={liveMetrics.downtime}
          unit="min"
          trend="down"
          trendValue="-15%"
          status={liveMetrics.downtime < 20 ? 'good' : 'warning'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Chart Placeholder */}
        <Card className="lg:col-span-2 p-6 surface-gradient">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Production Trends</h2>
            <div className="flex space-x-2">
              {['24H', '7D', '30D'].map((period) => (
                <Button key={period} variant="outline" size="sm" className="text-xs">
                  {period}
                </Button>
              ))}
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-background/50 rounded border-2 border-dashed border-border">
            <div className="text-center text-muted-foreground">
              <div className="text-4xl mb-2">📊</div>
              <div>Production Chart</div>
              <div className="text-sm">Real-time production visualization</div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-6 surface-gradient">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Workers</span>
              <span className="font-semibold">{liveMetrics.activeWorkers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Quality Score</span>
              <span className="font-semibold text-safety-green">{liveMetrics.qualityScore}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg Temperature</span>
              <span className="font-semibold">{liveMetrics.temperatureAvg}°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Maintenance Alerts</span>
              <Badge variant="outline" className="text-warning-orange border-warning-orange">
                {liveMetrics.maintenanceAlerts}
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Machine Status Overview */}
      <Card className="p-6 surface-gradient">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Machine Status Overview</h2>
          <Button variant="outline" size="sm">
            View All Machines
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {machineStatuses.map((machine, index) => (
            <Card key={index} className="p-4 border-border/50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm">{machine.name}</h3>
                <Badge 
                  variant="outline"
                  className={`text-xs ${
                    machine.status === 'running' ? 'border-safety-green text-safety-green' :
                    machine.status === 'idle' ? 'border-warning-orange text-warning-orange' :
                    machine.status === 'fault' ? 'border-danger-red text-danger-red' :
                    'border-primary text-primary'
                  }`}
                >
                  {machine.status.toUpperCase()}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Efficiency</span>
                  <span className="font-medium">{machine.efficiency}%</span>
                </div>
                <Progress value={machine.efficiency} className="h-2" />
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Uptime</span>
                  <span className="font-medium">{machine.uptime}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6 surface-gradient">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-background/50 rounded">
            <div className="w-2 h-2 bg-safety-green rounded-full"></div>
            <div className="flex-1">
              <div className="text-sm font-medium">Production target reached</div>
              <div className="text-xs text-muted-foreground">Knitting Machine #1 • 5 minutes ago</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-background/50 rounded">
            <div className="w-2 h-2 bg-warning-orange rounded-full"></div>
            <div className="flex-1">
              <div className="text-sm font-medium">Maintenance scheduled</div>
              <div className="text-xs text-muted-foreground">Packing Unit #2 • 15 minutes ago</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-background/50 rounded">
            <div className="w-2 h-2 bg-danger-red rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="text-sm font-medium">Equipment fault detected</div>
              <div className="text-xs text-muted-foreground">Dyeing Unit • 1 hour ago</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;