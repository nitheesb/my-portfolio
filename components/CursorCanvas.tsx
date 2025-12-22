import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --------------------------------------------------------
// Shaders
// --------------------------------------------------------

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;

  attribute float aScale;
  attribute vec3 aRandom;

  varying vec3 vColor;

  void main() {
    vec3 pos = position;

    // 1. Organic Movement (Perlin-ish noise)
    // We add sine wave distortions based on time and randomness to simulate "floating"
    pos.x += sin(uTime * 0.2 + aRandom.x * 10.0) * 0.1;
    pos.y += cos(uTime * 0.3 + aRandom.y * 10.0) * 0.1;
    pos.z += sin(uTime * 0.1 + aRandom.z * 10.0) * 0.1;

    // 2. Mouse Interaction (Repulsion / Fluid Disturbance)
    // Calculate distance from particle to mouse (in world space)
    // We assume the camera is at Z=5 or similar, and mouse is projected to z=0 plane.
    // For simplicity in this bespoke shader, we ignore deep projection math and 
    // work in a normalized or "good enough" coordinate space.
    
    // Convert pos to approx screen space or world correlation
    float dx = pos.x - uMouse.x;
    float dy = pos.y - uMouse.y;
    float dist = sqrt(dx * dx + dy * dy);
    
    // Repulsion force
    float radius = 3.5; // Interaction radius
    if (dist < radius) {
       float force = (radius - dist) / radius; // 0..1
       
       // Stronger repulsion closer to center
       float repulsion = pow(force, 2.0) * 4.0;
       
       // Push away
       float angle = atan(dy, dx);
       pos.x += cos(angle) * repulsion;
       pos.y += sin(angle) * repulsion;
       
       // Push forward in Z for 3D effect
       pos.z += repulsion * 0.5;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation (particles smaller when further)
    // Scaled by pixel ratio for sharp rendering
    gl_PointSize = (aScale * uPixelRatio * 30.0) / -mvPosition.z;
    
    // Pass color to fragment
    // Base orange + variation
    vColor = vec3(1.0, 0.37, 0.0); // #ff5e00
  }
`;

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    // Circular particle shape
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    // Soft edge
    float alpha = 1.0 - smoothstep(0.4, 0.5, d);
    
    gl_FragColor = vec4(vColor, alpha * 0.8); // 0.8 base opacity
  }
`;

// --------------------------------------------------------
// Particle System Component
// --------------------------------------------------------

const Particles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Configuration
  const COUNT = 3000;
  const BOUNDS_X = 14;
  const BOUNDS_Y = 10;

  // Data Generation
  const [positions, scales, randoms] = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const randoms = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * BOUNDS_X * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS_Y * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5; // Depth range

      // Scale
      scales[i] = Math.random();

      // Random seed for shader animation
      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random();
      randoms[i * 3 + 2] = Math.random();
    }

    return [positions, scales, randoms];
  }, []);

  // Animation Loop
  useFrame((state) => {
    if (!materialRef.current) return;

    const time = state.clock.getElapsedTime();
    materialRef.current.uniforms.uTime.value = time;

    // Mouse Position in World Space (approx)
    // Convert normalized mouse (-1 to 1) to rough world units based on camera
    // Camera z=10, FOV makes visible width approx 20 units at z=0
    const x = state.mouse.x * (BOUNDS_X + 2); // Factor to match screen width
    const y = state.mouse.y * (BOUNDS_Y + 2);

    // Smooth lerp for "fluid" feel done in JS or use current value?
    // Let's rely on R3F's smooth mouse handling or use simple lerp in uniforms
    const currX = materialRef.current.uniforms.uMouse.value.x;
    const currY = materialRef.current.uniforms.uMouse.value.y;

    materialRef.current.uniforms.uMouse.value.x += (x - currX) * 0.1;
    materialRef.current.uniforms.uMouse.value.y += (y - currY) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={randoms.length / 3}
          array={randoms}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        }}
      />
    </points>
  );
};

const CursorCanvas: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1] hidden md:block">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]} // Handle high-DPI screens
      >
        <Particles />
      </Canvas>
    </div>
  );
};

export default CursorCanvas;
