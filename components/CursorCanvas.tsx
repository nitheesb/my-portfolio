import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --------------------------------------------------------
// Shaders
// --------------------------------------------------------

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse; // (x, y) in world units
  uniform float uPixelRatio;

  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Dist to mouse (2D plane approximation)
    float dx = pos.x - uMouse.x;
    float dy = pos.y - uMouse.y;
    float dist = sqrt(dx*dx + dy*dy);

    // Interaction Radius
    float radius = 4.0; 

    // Visual: "Antigravity" Wave
    // Lift particles up (z-axis) as mouse passes
    // And slightly push them away
    float influence = 0.0;
    
    if (dist < radius) {
      influence = (radius - dist) / radius; // 1.0 at center, 0.0 at edge
      
      // Sinusoidal wave lift
      float wave = sin(influence * 3.1415); 
      pos.z += wave * 1.5; // Lift up

      // Slight Repulsion
      // pos.x += (dx / dist) * influence * 0.5;
      // pos.y += (dy / dist) * influence * 0.5;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size Attenuation
    gl_PointSize = (4.0 * uPixelRatio) / -mvPosition.z;

    // Pass Alpha to Fragment
    // 1.0 at center, fading out to 0
    vAlpha = smoothstep(radius, radius * 0.2, dist);
  }
`;

const fragmentShader = `
  varying float vAlpha;

  void main() {
    // Circular Point
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;

    // Base Orange
    vec3 color = vec3(1.0, 0.37, 0.0); // #ff5e00

    // Final Opacity
    // vAlpha comes from vertex (spotlight mask)
    // We also soften the dot edge
    float edge = 1.0 - smoothstep(0.3, 0.5, r);
    
    gl_FragColor = vec4(color, vAlpha * edge * 0.8);
  }
`;

// --------------------------------------------------------
// Particle System Component
// --------------------------------------------------------

const Particles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Grid Configuration
  const COLS = 80;
  const ROWS = 60;
  const SPACING = 0.4; // World units

  const positions = useMemo(() => {
    const arr = new Float32Array(COLS * ROWS * 3);
    let i = 0;
    // Center the grid
    const offsetX = (COLS * SPACING) / 2;
    const offsetY = (ROWS * SPACING) / 2;

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        arr[i] = x * SPACING - offsetX;
        arr[i + 1] = y * SPACING - offsetY;
        arr[i + 2] = 0;
        i += 3;
      }
    }
    return arr;
  }, []);

  // Global Mouse Listener for Robustness
  // (Resolves "dead zones" caused by HTML overlays)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!materialRef.current) return;

      // Convert Screen Pixels -> approx World Units
      // Assuming Camera Z=10, FOV=45, Aspect ~1.6
      // Visible Height at Z=0 is approx: 2 * tan(45/2) * 10 = 8.28
      // We scale somewhat arbitrarily to match visual feel

      const worldHeight = 16.0; // Tuned for coverage
      const aspect = window.innerWidth / window.innerHeight;
      const worldWidth = worldHeight * aspect;

      const nX = (e.clientX / window.innerWidth) * 2 - 1;
      const nY = -(e.clientY / window.innerHeight) * 2 + 1;

      materialRef.current.uniforms.uMouse.value.x = nX * (worldWidth / 2);
      materialRef.current.uniforms.uMouse.value.y = nY * (worldHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
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
          uMouse: { value: new THREE.Vector2(-100, -100) }, // Start off-screen
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        }}
      />
    </points>
  );
};

const CursorCanvas: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[0] hidden md:block">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Particles />
      </Canvas>
    </div>
  );
};

export default CursorCanvas;
