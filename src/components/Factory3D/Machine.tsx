import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface MachineProps {
  position: [number, number, number];
  name: string;
  status: 'running' | 'idle' | 'fault' | 'maintenance';
  type?: 'knitting' | 'dyeing' | 'cutting' | 'packing';
  temperature?: number;
  speed?: number;
  efficiency?: number;
  onClick?: () => void;
}

const Machine: React.FC<MachineProps> = ({ 
  position, 
  name, 
  status, 
  type = 'knitting',
  temperature = 0,
  speed = 0,
  efficiency = 0,
  onClick 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case 'running': return '#22c55e';
      case 'idle': return '#eab308';
      case 'fault': return '#ef4444';
      case 'maintenance': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getMachineSize = (): [number, number, number] => {
    switch (type) {
      case 'knitting': return [2, 1.5, 2];
      case 'dyeing': return [3, 2, 2.5];
      case 'cutting': return [2.5, 1, 1.5];
      case 'packing': return [1.5, 1, 1.5];
      default: return [2, 1, 2];
    }
  };

  useFrame((state) => {
    if (meshRef.current && status === 'running') {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <boxGeometry args={getMachineSize()} />
        <meshStandardMaterial 
          color={getStatusColor()} 
          metalness={0.7}
          roughness={0.3}
          emissive={status === 'running' ? getStatusColor() : '#000000'}
          emissiveIntensity={status === 'running' ? 0.1 : 0}
        />
      </mesh>
      
      {/* Status indicator light */}
      <mesh position={[0, getMachineSize()[1]/2 + 0.2, 0]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial 
          color={getStatusColor()}
          emissive={getStatusColor()}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Machine label and info */}
      <Html distanceFactor={8} position={[0, getMachineSize()[1]/2 + 0.8, 0]}>
        <div className="bg-card/90 backdrop-blur-sm p-2 rounded border border-border text-xs min-w-[120px]">
          <div className="font-semibold text-foreground">{name}</div>
          <div className={`text-xs capitalize ${
            status === 'running' ? 'text-safety-green' :
            status === 'idle' ? 'text-warning-orange' :
            status === 'fault' ? 'text-danger-red' :
            'text-primary'
          }`}>
            {status}
          </div>
          {hovered && (
            <div className="mt-1 space-y-1 animate-fade-in">
              {temperature > 0 && (
                <div className="text-muted-foreground">Temp: {temperature}°C</div>
              )}
              {speed > 0 && (
                <div className="text-muted-foreground">Speed: {speed} RPM</div>
              )}
              {efficiency > 0 && (
                <div className="text-muted-foreground">Eff: {efficiency}%</div>
              )}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

export default Machine;