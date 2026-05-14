"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
varying float vElevation;
uniform float uTime;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  // Create fluid, slow-moving waves
  float elevation = sin(modelPosition.x * 1.5 + uTime * 0.3) * 0.15
                  + sin(modelPosition.y * 1.2 + uTime * 0.2) * 0.15
                  + sin(modelPosition.x * 0.8 - uTime * 0.1) * 0.15;
                  
  modelPosition.z += elevation;
  vElevation = elevation;
  
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;
}
`;

const fragmentShader = `
varying vec2 vUv;
varying float vElevation;

void main() {
  // Sleek minimalist glow (dark to soft silver/blue)
  vec3 base = vec3(0.01, 0.01, 0.02);
  vec3 glow = vec3(0.5, 0.5, 0.6);
  
  // Calculate color intensity based on elevation peaks
  float intensity = smoothstep(-0.2, 0.3, vElevation);
  vec3 color = mix(base, glow, intensity);
  
  // Radial fade to transparent at the edges
  float dist = distance(vUv, vec2(0.5));
  float alpha = smoothstep(0.5, 0.0, dist);
  
  gl_FragColor = vec4(color, alpha);
}
`;

function FluidMesh() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  return (
    <mesh rotation={[-Math.PI / 4, 0, 0]} position={[0, 0, -2]} scale={[12, 12, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

function FloatingOrbs({ count = 25 }) {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  
  const orbs = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      const x = (Math.random() - 0.5) * 14; // Spread wide
      const y = (Math.random() - 0.5) * 10; // -5 to 5
      const z = (Math.random() - 0.5) * 4 - 1; // -3 to 1
      const size = Math.random() * 0.25 + 0.05; // 0.05 to 0.3
      const speed = Math.random() * 0.2 + 0.05; // Very subtle scroll speed factor
      const floatSpeed = Math.random() * 0.5 + 0.3; // Gentle floating
      const opacity = Math.random() * 0.3 + 0.05; // 0.05 to 0.35 opacity
      return { x, y, z, size, speed, floatSpeed, opacity, initialY: y };
    });
  }, [count]);

  useFrame((state) => {
    const scrollY = window.scrollY;
    // Extremely subtle parallax scroll offset
    const scrollOffset = scrollY * 0.001;

    orbs.forEach((orb, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      const time = state.clock.elapsedTime;
      const floatY = Math.sin(time * orb.floatSpeed + i) * 0.15;
      const floatX = Math.cos(time * orb.floatSpeed * 0.8 + i) * 0.1;

      // Parallax with seamless vertical wrapping
      let currentY = orb.initialY + (scrollOffset * orb.speed);
      currentY = ((currentY + 5) % 10 + 10) % 10 - 5;

      mesh.position.y = currentY + floatY;
      mesh.position.x = orb.x + floatX;
    });
  });

  return (
    <>
      {orbs.map((orb, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          position={[orb.x, orb.initialY, orb.z]}
        >
          <sphereGeometry args={[orb.size, 32, 32]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={orb.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

export default function NeuralBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full opacity-50 bg-transparent" />;
  }

  return (
    <Canvas 
      camera={{ position: [0, 0, 3], fov: 60 }} 
      className="w-full h-full opacity-50"
      style={{ background: 'transparent', pointerEvents: 'none' }}
      eventSource={document.body}
      eventPrefix="client"
    >
      <FluidMesh />
      <FloatingOrbs />
    </Canvas>
  );
}
