import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  machine: string;
  timestamp: Date;
  status: 'active' | 'acknowledged' | 'resolved';
  priority: 'high' | 'medium' | 'low';
}

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Equipment Fault Detected',
      description: 'Dyeing Unit temperature sensor malfunction. Operating temperature exceeds safe limits.',
      machine: 'Dyeing Unit',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'active',
      priority: 'high'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Maintenance Due',
      description: 'Scheduled maintenance required for optimal performance.',
      machine: 'Packing Unit #2',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'acknowledged',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Efficiency Below Target',
      description: 'Production efficiency dropped to 73% - below the 85% target threshold.',
      machine: 'Knitting Machine #2',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: 'active',
      priority: 'medium'
    },
    {
      id: '4',
      type: 'info',
      title: 'Production Target Achieved',
      description: 'Daily production target of 2000 units reached ahead of schedule.',
      machine: 'Production Line',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'resolved',
      priority: 'low'
    },
    {
      id: '5',
      type: 'critical',
      title: 'Emergency Stop Activated',
      description: 'Safety system triggered emergency stop due to detected anomaly.',
      machine: 'Cutting Station',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      status: 'resolved',
      priority: 'high'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'active' | 'acknowledged' | 'resolved'>('all');

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'acknowledged' as const }
        : alert
    ));
  };

  const handleResolve = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' as const }
        : alert
    ));
  };

  const filteredAlerts = alerts.filter(alert => 
    filter === 'all' || alert.status === filter
  );

  const getAlertTypeColor = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return 'border-danger-red text-danger-red';
      case 'warning': return 'border-warning-orange text-warning-orange';
      case 'info': return 'border-primary text-primary';
      default: return 'border-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: Alert['status']) => {
    switch (status) {
      case 'active': return 'border-danger-red text-danger-red';
      case 'acknowledged': return 'border-warning-orange text-warning-orange';
      case 'resolved': return 'border-safety-green text-safety-green';
      default: return 'border-muted text-muted-foreground';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else {
      return `${diffMinutes}m ago`;
    }
  };

  const alertStats = {
    total: alerts.length,
    active: alerts.filter(a => a.status === 'active').length,
    critical: alerts.filter(a => a.type === 'critical').length,
    resolved: alerts.filter(a => a.status === 'resolved').length
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Alert Management</h1>
          <p className="text-muted-foreground">Monitor and manage system alerts</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-danger-red border-danger-red animate-pulse-glow">
            {alertStats.active} Active Alerts
          </Badge>
          <Button variant="outline" size="sm">
            Configure Alerts
          </Button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 surface-gradient">
          <div className="text-sm font-medium text-muted-foreground mb-2">Total Alerts</div>
          <div className="text-3xl font-bold text-primary">{alertStats.total}</div>
          <div className="text-sm text-muted-foreground">Last 24 hours</div>
        </Card>
        <Card className="p-6 surface-gradient">
          <div className="text-sm font-medium text-muted-foreground mb-2">Active</div>
          <div className="text-3xl font-bold text-danger-red">{alertStats.active}</div>
          <div className="text-sm text-muted-foreground">Requiring attention</div>
        </Card>
        <Card className="p-6 surface-gradient">
          <div className="text-sm font-medium text-muted-foreground mb-2">Critical</div>
          <div className={`text-3xl font-bold ${alertStats.critical > 0 ? 'text-danger-red' : 'text-safety-green'}`}>
            {alertStats.critical}
          </div>
          <div className="text-sm text-muted-foreground">High priority</div>
        </Card>
        <Card className="p-6 surface-gradient">
          <div className="text-sm font-medium text-muted-foreground mb-2">Resolved</div>
          <div className="text-3xl font-bold text-safety-green">{alertStats.resolved}</div>
          <div className="text-sm text-muted-foreground">This session</div>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" onClick={() => setFilter('all')}>
            All ({alerts.length})
          </TabsTrigger>
          <TabsTrigger value="active" onClick={() => setFilter('active')}>
            Active ({alertStats.active})
          </TabsTrigger>
          <TabsTrigger value="acknowledged" onClick={() => setFilter('acknowledged')}>
            Acknowledged ({alerts.filter(a => a.status === 'acknowledged').length})
          </TabsTrigger>
          <TabsTrigger value="resolved" onClick={() => setFilter('resolved')}>
            Resolved ({alertStats.resolved})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="p-6 surface-gradient">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Alert Timeline</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className="p-4 bg-background/50 rounded border border-border/50 hover:bg-background/70 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        alert.type === 'critical' ? 'bg-danger-red animate-pulse' :
                        alert.type === 'warning' ? 'bg-warning-orange' :
                        'bg-primary'
                      }`} />
                      <div>
                        <h3 className="font-medium">{alert.title}</h3>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getAlertTypeColor(alert.type)}>
                        {alert.type.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(alert.status)}>
                        {alert.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>🏭 {alert.machine}</span>
                      <span>⏰ {getTimeAgo(alert.timestamp)}</span>
                      <span className={`font-medium ${
                        alert.priority === 'high' ? 'text-danger-red' :
                        alert.priority === 'medium' ? 'text-warning-orange' :
                        'text-primary'
                      }`}>
                        {alert.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      {alert.status === 'active' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAcknowledge(alert.id)}
                          >
                            Acknowledge
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleResolve(alert.id)}
                          >
                            Resolve
                          </Button>
                        </>
                      )}
                      {alert.status === 'acknowledged' && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleResolve(alert.id)}
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          {/* Active alerts content - same structure as above but filtered */}
        </TabsContent>

        <TabsContent value="acknowledged">
          {/* Acknowledged alerts content */}
        </TabsContent>

        <TabsContent value="resolved">
          {/* Resolved alerts content */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Alerts;