"use client";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function NebulaCloud({ color, position, scale }: { color: string, position: [number, number, number], scale: number }) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.03} 
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function RealisticShootingStar() {
  const ref = useRef<THREE.Mesh>(null);
  const [active, setActive] = useState(false);
  const [params, setParams] = useState({ speed: 0, x: 0, y: 0, angle: 0 });
  
  useFrame((state, delta) => {
    if (!ref.current) return;
    if (!active && Math.random() < 0.001) {
      setActive(true);
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 10;
      const angle = (Math.random() - 0.5) * 0.3;
      const speed = 0.5 + Math.random() * 0.8;
      setParams({ speed, x, y, angle });
      ref.current.position.set(x, y, -10);
      ref.current.rotation.z = angle;
    }
    if (active) {
      ref.current.position.z += params.speed;
      ref.current.scale.z = 30;
      if (ref.current.position.z > 5) setActive(false);
    }
  });

  return (
    <mesh ref={ref} visible={active}>
      <cylinderGeometry args={[0.003, 0.001, 1, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
    </mesh>
  );
}

function GalaxyField() {
  const ref = useRef<THREE.Points>(null);
  const count = 1200;
  
  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initial = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create a cluster effect mimicking a galaxy band
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 8;
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      initial[i * 3] = x;
      initial[i * 3 + 1] = y;
      initial[i * 3 + 2] = z;
    }
    return [pos, initial];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const { x, y } = state.mouse;
    const positionsArray = ref.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      positionsArray[iz] += 0.0003;
      if (positionsArray[iz] > 5) positionsArray[iz] = -5;

      const dx = positionsArray[ix] - x * 6;
      const dy = positionsArray[iy] - y * 6;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 0.7) {
        positionsArray[ix] += dx * 0.005;
        positionsArray[iy] += dy * 0.005;
      } else {
        positionsArray[ix] += (initialPositions[ix] - positionsArray[ix]) * 0.003;
        positionsArray[iy] += (initialPositions[iy] - positionsArray[iy]) * 0.003;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.012}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
}

export default function InteractiveBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      spotlightRef.current.style.background = `radial-gradient(800px circle at ${x}% ${y}%, rgba(255,255,255,0.08), transparent 80%)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black pointer-events-none">
      {/* The 3D Canvas Layer */}
      <Canvas camera={{ position: [0, 0, 2] }}>
        <NebulaCloud color="#4a306d" position={[-2, 1, -5]} scale={8} />
        <NebulaCloud color="#2a4a6d" position={[3, -2, -6]} scale={10} />
        <NebulaCloud color="#6d3a4a" position={[0, 0, -8]} scale={12} />
        
        <GalaxyField />
        <RealisticShootingStar />
        <ambientLight intensity={1} />
      </Canvas>
      
      {/* The Discovery Spotlight Mask */}
      <div 
        ref={spotlightRef}
        className="absolute inset-0 z-10 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.06), transparent 80%)'
        }}
      />
      
      {/* Structural Grid Overlay - Revealed by spotlight via mix-blend */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-20" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} 
      />
      
      {/* Noise Grain Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay z-30" 
        style={{
          backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
          filter: 'contrast(150%) brightness(1000%)'
        }}
      />
    </div>
  );
}
