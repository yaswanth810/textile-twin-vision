import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

interface Machine {
  id: string;
  name: string;
  type: 'knitting' | 'dyeing' | 'cutting' | 'packing';
  status: 'running' | 'idle' | 'fault' | 'maintenance';
  efficiency: number;
  utilization: number;
  temperature: number;
  speed: number;
  uptime: string;
  lastMaintenance: string;
  nextMaintenance: string;
  location: string;
  operator: string;
}

const Machines: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'running' | 'idle' | 'fault' | 'maintenance'>('all');

  const machines: Machine[] = [
    {
      id: '1',
      name: 'Knitting Machine #1',
      type: 'knitting',
      status: 'running',
      efficiency: 94,
      utilization: 87,
      temperature: 65,
      speed: 240,
      uptime: '8h 45m',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-02-15',
      location: 'Floor A, Section 1',
      operator: 'John Smith'
    },
    {
      id: '2',
      name: 'Knitting Machine #2',
      type: 'knitting',
      status: 'idle',
      efficiency: 76,
      utilization: 45,
      temperature: 35,
      speed: 0,
      uptime: '0h 0m',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10',
      location: 'Floor A, Section 2',
      operator: 'Unassigned'
    },
    {
      id: '3',
      name: 'Dyeing Unit',
      type: 'dyeing',
      status: 'fault',
      efficiency: 65,
      utilization: 78,
      temperature: 85,
      speed: 150,
      uptime: '0h 0m',
      lastMaintenance: '2024-01-08',
      nextMaintenance: '2024-02-08',
      location: 'Floor B, Section 1',
      operator: 'Sarah Johnson'
    },
    {
      id: '4',
      name: 'Cutting Station',
      type: 'cutting',
      status: 'running',
      efficiency: 91,
      utilization: 92,
      temperature: 25,
      speed: 180,
      uptime: '7h 20m',
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-02-12',
      location: 'Floor C, Section 1',
      operator: 'Mike Wilson'
    },
    {
      id: '5',
      name: 'Packing Unit #1',
      type: 'packing',
      status: 'running',
      efficiency: 97,
      utilization: 94,
      temperature: 22,
      speed: 120,
      uptime: '8h 10m',
      lastMaintenance: '2024-01-18',
      nextMaintenance: '2024-02-18',
      location: 'Floor D, Section 1',
      operator: 'Lisa Brown'
    },
    {
      id: '6',
      name: 'Packing Unit #2',
      type: 'packing',
      status: 'maintenance',
      efficiency: 82,
      utilization: 56,
      temperature: 20,
      speed: 0,
      uptime: '0h 0m',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-02-20',
      location: 'Floor D, Section 2',
      operator: 'Tom Davis'
    }
  ];

  const filteredMachines = machines.filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.operator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || machine.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: Machine['status']) => {
    switch (status) {
      case 'running': return 'border-safety-green text-safety-green';
      case 'idle': return 'border-warning-orange text-warning-orange';
      case 'fault': return 'border-danger-red text-danger-red';
      case 'maintenance': return 'border-primary text-primary';
      default: return 'border-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: Machine['type']) => {
    switch (type) {
      case 'knitting': return '🧶';
      case 'dyeing': return '🎨';
      case 'cutting': return '✂️';
      case 'packing': return '📦';
      default: return '⚙️';
    }
  };

  const machineStats = {
    total: machines.length,
    running: machines.filter(m => m.status === 'running').length,
    avgEfficiency: Math.round(machines.reduce((acc, m) => acc + m.efficiency, 0) / machines.length),
    faulted: machines.filter(m => m.status === 'fault').length
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Machine Management</h1>
          <p className="text-muted-foreground">Monitor and control production equipment</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Add Machine
          </Button>
          <Button variant="outline" size="sm">
            Maintenance Schedule
          </Button>
        </div>
      </div>

      {/* Machine Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 surface-gradient">
          <div className="text-sm font-medium text-muted-foreground mb-2">Total Machines</div>
          <div className="text-3xl font-bold text-primary">{machineStats.total}</div>
          <div className="text-sm text-muted-foreground">Active equipment</div>
        </Card>
        <Card className="p-6 surface-gradient">
          <div className="text-sm font-medium text-muted-foreground mb-2">Running</div>
          <div className="text-3xl font-bold text-safety-green">{machineStats.running}</div>
          <div className="text-sm text-muted-foreground">Currently operational</div>
        </Card>
        <Card className="p-6 surface-gradient">
          <div className="text-sm font-medium text-muted-foreground mb-2">Avg Efficiency</div>
          <div className="text-3xl font-bold text-primary">{machineStats.avgEfficiency}%</div>
          <div className="text-sm text-muted-foreground">Performance metric</div>
        </Card>
        <Card className="p-6 surface-gradient">
          <div className="text-sm font-medium text-muted-foreground mb-2">Faults</div>
          <div className={`text-3xl font-bold ${machineStats.faulted > 0 ? 'text-danger-red' : 'text-safety-green'}`}>
            {machineStats.faulted}
          </div>
          <div className="text-sm text-muted-foreground">Requiring attention</div>
        </Card>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <Input
          placeholder="Search machines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex space-x-2">
          {(['all', 'running', 'idle', 'fault', 'maintenance'] as const).map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      <div className={`grid gap-6 transition-all duration-300 ${
        selectedMachine ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'
      }`}>
        {/* Machine Grid */}
        <div className={`space-y-4 ${selectedMachine ? 'lg:col-span-2' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMachines.map((machine) => (
              <Card 
                key={machine.id} 
                className={`p-6 surface-gradient cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedMachine?.id === machine.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedMachine(machine)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getTypeIcon(machine.type)}</div>
                    <div>
                      <h3 className="font-semibold">{machine.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{machine.type}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(machine.status)}>
                    {machine.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Efficiency</div>
                    <div className="text-lg font-semibold">{machine.efficiency}%</div>
                    <Progress value={machine.efficiency} className="h-2 mt-1" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Utilization</div>
                    <div className="text-lg font-semibold">{machine.utilization}%</div>
                    <Progress value={machine.utilization} className="h-2 mt-1" />
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-muted-foreground">Operator: </span>
                    <span className="font-medium">{machine.operator}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Uptime: </span>
                    <span className="font-medium">{machine.uptime}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Machine Details Panel */}
        {selectedMachine && (
          <Card className="p-6 surface-gradient animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{getTypeIcon(selectedMachine.type)}</div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedMachine.name}</h2>
                  <p className="text-muted-foreground capitalize">{selectedMachine.type} Machine</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMachine(null)}
              >
                ✕
              </Button>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-background/50 rounded">
                    <div className="text-sm text-muted-foreground">Status</div>
                    <Badge variant="outline" className={getStatusColor(selectedMachine.status)}>
                      {selectedMachine.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="p-3 bg-background/50 rounded">
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="font-medium">{selectedMachine.location}</div>
                  </div>
                  <div className="p-3 bg-background/50 rounded">
                    <div className="text-sm text-muted-foreground">Operator</div>
                    <div className="font-medium">{selectedMachine.operator}</div>
                  </div>
                  <div className="p-3 bg-background/50 rounded">
                    <div className="text-sm text-muted-foreground">Uptime</div>
                    <div className="font-medium">{selectedMachine.uptime}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Temperature</span>
                    <span className="font-medium">{selectedMachine.temperature}°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Speed</span>
                    <span className="font-medium">{selectedMachine.speed} RPM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Efficiency</span>
                    <span className="font-medium">{selectedMachine.efficiency}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Utilization</span>
                    <span className="font-medium">{selectedMachine.utilization}%</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Efficiency</span>
                      <span className="text-sm font-bold">{selectedMachine.efficiency}%</span>
                    </div>
                    <Progress value={selectedMachine.efficiency} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Utilization</span>
                      <span className="text-sm font-bold">{selectedMachine.utilization}%</span>
                    </div>
                    <Progress value={selectedMachine.utilization} className="h-3" />
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-3">Recent Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Peak efficiency today</span>
                      <span className="font-medium text-safety-green">98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average speed</span>
                      <span className="font-medium">{selectedMachine.speed} RPM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total runtime today</span>
                      <span className="font-medium">{selectedMachine.uptime}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-background/50 rounded">
                    <div className="text-sm text-muted-foreground">Last Maintenance</div>
                    <div className="font-medium">{selectedMachine.lastMaintenance}</div>
                  </div>
                  <div className="p-3 bg-background/50 rounded">
                    <div className="text-sm text-muted-foreground">Next Scheduled</div>
                    <div className="font-medium">{selectedMachine.nextMaintenance}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Maintenance Actions</h4>
                  <Button size="sm" className="w-full">
                    Schedule Maintenance
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    View History
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Download Manual
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Machines;