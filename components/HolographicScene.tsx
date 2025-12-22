import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const WireframeGlobe: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [mouseX, setMouseX] = React.useState(0);
    const [mouseY, setMouseY] = React.useState(0);

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouseX((e.clientX / window.innerWidth) * 2 - 1);
            setMouseY(-(e.clientY / window.innerHeight) * 2 + 1);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Auto-rotate
            meshRef.current.rotation.y += delta * 0.1;

            // Mouse-reactive rotation
            meshRef.current.rotation.x = THREE.MathUtils.lerp(
                meshRef.current.rotation.x,
                mouseY * 0.3,
                0.05
            );
            meshRef.current.rotation.z = THREE.MathUtils.lerp(
                meshRef.current.rotation.z,
                mouseX * 0.2,
                0.05
            );
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshBasicMaterial
                color="#ff5e00"
                wireframe
                transparent
                opacity={0.3}
            />
        </mesh>
    );
};

const HolographicScene: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none opacity-20 md:opacity-30">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <WireframeGlobe />
            </Canvas>
        </div>
    );
};

export default HolographicScene;
