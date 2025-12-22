import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --------------------------------------------------------
// Shaders (Dark Mode Optimized)
// --------------------------------------------------------

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;

  varying float vAlpha;

  void main() {
    vec3 pos = position;

    float dx = pos.x - uMouse.x;
    float dy = pos.y - uMouse.y;
    float dist = sqrt(dx*dx + dy*dy);

    float radius = 5.0; // Larger radius for more wow factor
    float influence = 0.0;
    
    if (dist < radius) {
      influence = (radius - dist) / radius;
      
      // Dramatic Lift
      float wave = sin(influence * 3.1415); 
      pos.z += wave * 2.0; 
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Larger Particles for Neon Glow
    gl_PointSize = (6.0 * uPixelRatio) / -mvPosition.z;

    vAlpha = smoothstep(radius, radius * 0.4, dist);
  }
`;

const fragmentShader = `
  varying float vAlpha;

  void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;

    // Glowing Neon Orange
    vec3 color = vec3(1.0, 0.4, 0.1); 

    // Soft Glow Edge
    float glow = 1.0 - smoothstep(0.0, 0.5, r);
    float core = 1.0 - smoothstep(0.0, 0.2, r);
    
    // Additive blending needs high brightness
    float brightness = core + glow * 0.5;

    gl_FragColor = vec4(color * brightness, vAlpha);
  }
`;

const Particles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Dense Grid for "Matrix" feel
  const COLS = 100;
  const ROWS = 80;
  const SPACING = 0.35;

  const positions = useMemo(() => {
    const arr = new Float32Array(COLS * ROWS * 3);
    let i = 0;
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!materialRef.current) return;
      const worldHeight = 18.0;
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
        // Key Fix: AdditiveBlending makes it GLOW on black
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(-100, -100) },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        }}
      />
    </points>
  );
};

const CursorCanvas: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[0]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: false, antialias: true }} // alpha:false for performance on black bg
      >
        <color attach="background" args={['#050505']} />
        <Particles />
      </Canvas>
    </div>
  );
};

export default CursorCanvas;
