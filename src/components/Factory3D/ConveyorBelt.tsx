import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ConveyorBeltProps {
  start: [number, number, number];
  end: [number, number, number];
  width?: number;
  speed?: number;
  active?: boolean;
}

const ConveyorBelt: React.FC<ConveyorBeltProps> = ({ 
  start, 
  end, 
  width = 0.5, 
  speed = 1,
  active = true 
}) => {
  const beltRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const length = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + 
    Math.pow(end[2] - start[2], 2)
  );

  const centerX = (start[0] + end[0]) / 2;
  const centerZ = (start[2] + end[2]) / 2;
  const centerY = Math.max(start[1], end[1]);

  const angle = Math.atan2(end[2] - start[2], end[0] - start[0]);

  useFrame((state) => {
    if (materialRef.current && active) {
      materialRef.current.map?.offset.setX(
        (materialRef.current.map.offset.x + speed * 0.01) % 1
      );
    }
  });

  return (
    <group position={[centerX, centerY, centerZ]} rotation={[0, angle, 0]}>
      <mesh ref={beltRef} position={[0, -0.1, 0]}>
        <boxGeometry args={[length, 0.1, width]} />
        <meshStandardMaterial 
          ref={materialRef}
          color={active ? '#1f2937' : '#6b7280'}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Belt supports */}
      {Array.from({ length: Math.floor(length / 2) }, (_, i) => (
        <mesh key={i} position={[i * 2 - length/2 + 1, -0.3, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.4]} />
          <meshStandardMaterial color="#4b5563" />
        </mesh>
      ))}
    </group>
  );
};

export default ConveyorBelt;