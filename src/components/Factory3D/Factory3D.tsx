import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import Machine from './Machine';
import ConveyorBelt from './ConveyorBelt';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MachineData {
  id: string;
  name: string;
  position: [number, number, number];
  status: 'running' | 'idle' | 'fault' | 'maintenance';
  type: 'knitting' | 'dyeing' | 'cutting' | 'packing';
  temperature: number;
  speed: number;
  efficiency: number;
}

const Factory3D: React.FC = () => {
  const [selectedMachine, setSelectedMachine] = useState<MachineData | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'production' | 'maintenance'>('overview');

  const machines: MachineData[] = [
    {
      id: 'knit1',
      name: 'Knitting Machine #1',
      position: [-6, 0.75, -4],
      status: 'running',
      type: 'knitting',
      temperature: 65,
      speed: 240,
      efficiency: 92
    },
    {
      id: 'knit2',
      name: 'Knitting Machine #2',
      position: [-2, 0.75, -4],
      status: 'idle',
      type: 'knitting',
      temperature: 35,
      speed: 0,
      efficiency: 0
    },
    {
      id: 'dye1',
      name: 'Dyeing Unit',
      position: [3, 1, -4],
      status: 'fault',
      type: 'dyeing',
      temperature: 85,
      speed: 150,
      efficiency: 0
    },
    {
      id: 'cut1',
      name: 'Cutting Station',
      position: [-4, 0.5, 4],
      status: 'running',
      type: 'cutting',
      temperature: 25,
      speed: 180,
      efficiency: 88
    },
    {
      id: 'pack1',
      name: 'Packing Unit #1',
      position: [0, 0.5, 4],
      status: 'running',
      type: 'packing',
      temperature: 22,
      speed: 120,
      efficiency: 95
    },
    {
      id: 'pack2',
      name: 'Packing Unit #2',
      position: [3, 0.5, 4],
      status: 'maintenance',
      type: 'packing',
      temperature: 20,
      speed: 0,
      efficiency: 0
    }
  ];

  const conveyorBelts: Array<{
    start: [number, number, number];
    end: [number, number, number];
    active: boolean;
  }> = [
    { start: [-1, 0.2, -4], end: [2, 0.2, -4], active: true },
    { start: [4, 0.2, -3], end: [-3, 0.2, 3], active: true },
    { start: [-3, 0.2, 4], end: [2, 0.2, 4], active: true }
  ];

  const Lights = () => (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#3b82f6" />
      <spotLight 
        position={[15, 15, 15]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1}
        castShadow
      />
    </>
  );

  const Floor = () => (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#1e293b" roughness={0.8} metalness={0.2} />
    </mesh>
  );

  return (
    <div className="h-screen flex">
      {/* 3D Canvas */}
      <div className={`transition-all duration-300 ${selectedMachine ? 'w-2/3' : 'w-full'}`}>
        <Canvas 
          shadows 
          camera={{ position: [15, 15, 15], fov: 50 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Lights />
            <Floor />
            <Grid infiniteGrid fadeDistance={50} fadeStrength={0.5} />
            <Environment preset="warehouse" />
            
            {/* Machines */}
            {machines.map((machine) => (
              <Machine
                key={machine.id}
                position={machine.position}
                name={machine.name}
                status={machine.status}
                type={machine.type}
                temperature={machine.temperature}
                speed={machine.speed}
                efficiency={machine.efficiency}
                onClick={() => setSelectedMachine(machine)}
              />
            ))}
            
            {/* Conveyor Belts */}
            {conveyorBelts.map((belt, index) => (
              <ConveyorBelt
                key={index}
                start={belt.start}
                end={belt.end}
                active={belt.active}
              />
            ))}
            
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={50}
            />
          </Suspense>
        </Canvas>

        {/* View Mode Controls */}
        <div className="absolute top-4 left-4 flex space-x-2">
          {(['overview', 'production', 'maintenance'] as const).map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode(mode)}
              className="capitalize"
            >
              {mode}
            </Button>
          ))}
        </div>

        {/* Factory Stats */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-3 bg-card/80 backdrop-blur-sm">
              <div className="text-sm text-muted-foreground">Active Machines</div>
              <div className="text-2xl font-bold text-safety-green">
                {machines.filter(m => m.status === 'running').length}
              </div>
            </Card>
            <Card className="p-3 bg-card/80 backdrop-blur-sm">
              <div className="text-sm text-muted-foreground">Avg Efficiency</div>
              <div className="text-2xl font-bold text-primary">
                {Math.round(machines.reduce((acc, m) => acc + m.efficiency, 0) / machines.length)}%
              </div>
            </Card>
            <Card className="p-3 bg-card/80 backdrop-blur-sm">
              <div className="text-sm text-muted-foreground">Alerts</div>
              <div className="text-2xl font-bold text-danger-red">
                {machines.filter(m => m.status === 'fault').length}
              </div>
            </Card>
            <Card className="p-3 bg-card/80 backdrop-blur-sm">
              <div className="text-sm text-muted-foreground">Production Rate</div>
              <div className="text-2xl font-bold text-warning-orange">
                {machines.filter(m => m.status === 'running').length * 45}/hr
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Machine Details Panel */}
      {selectedMachine && (
        <div className="w-1/3 bg-card border-l border-border p-6 overflow-y-auto animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{selectedMachine.name}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedMachine(null)}
            >
              ✕
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge 
                variant="outline" 
                className={`
                  ${selectedMachine.status === 'running' ? 'border-safety-green text-safety-green' :
                    selectedMachine.status === 'idle' ? 'border-warning-orange text-warning-orange' :
                    selectedMachine.status === 'fault' ? 'border-danger-red text-danger-red' :
                    'border-primary text-primary'}
                `}
              >
                {selectedMachine.status.toUpperCase()}
              </Badge>
              <Badge variant="secondary">
                {selectedMachine.type.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-3">
                <div className="text-sm text-muted-foreground">Temperature</div>
                <div className="text-lg font-semibold">{selectedMachine.temperature}°C</div>
              </Card>
              <Card className="p-3">
                <div className="text-sm text-muted-foreground">Speed</div>
                <div className="text-lg font-semibold">{selectedMachine.speed} RPM</div>
              </Card>
              <Card className="p-3">
                <div className="text-sm text-muted-foreground">Efficiency</div>
                <div className="text-lg font-semibold">{selectedMachine.efficiency}%</div>
              </Card>
              <Card className="p-3">
                <div className="text-sm text-muted-foreground">Uptime</div>
                <div className="text-lg font-semibold">8.5h</div>
              </Card>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Recent Events</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Started production cycle</span>
                  <span className="text-muted-foreground">2m ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Temperature normalized</span>
                  <span className="text-muted-foreground">15m ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Efficiency target met</span>
                  <span className="text-muted-foreground">1h ago</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" className="flex-1">
                Start Maintenance
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                View History
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Factory3D;