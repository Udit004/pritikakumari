"use client";

import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SEPARATION = 100, AMOUNTX = 60, AMOUNTY = 60;

function ParticleWave() {
    const pointsRef = useRef<THREE.Points>(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const positions = useMemo(() => {
        const numParticles = AMOUNTX * AMOUNTY;
        const pos = new Float32Array(numParticles * 3);

        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                pos[i] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2); // x
                pos[i + 1] = 0; // y
                pos[i + 2] = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2); // z
                i += 3;
            }
        }
        return pos;
    }, []);

    const countRef = useRef(0);

    useFrame((state) => {
        if (!pointsRef.current) return;
        
        const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                pos[i + 1] = (Math.sin((ix + countRef.current) * 0.3) * 50) +
                             (Math.sin((iy + countRef.current) * 0.5) * 50);
                i += 3;
            }
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        countRef.current += 0.04; // speed of the wave

        // Subtle camera movement based on mouse
        const targetX = mouse.current.x * 500;
        const targetY = mouse.current.y * 300;
        
        state.camera.position.x += (targetX - state.camera.position.x) * 0.02;
        // Lower camera angle to make wave fill more of the screen
        state.camera.position.y += (-targetY + 200 - state.camera.position.y) * 0.02;
        state.camera.lookAt(0, 0, 0);
    });

    // Create a circular texture for the particles
    const particleTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        if (context) {
            context.beginPath();
            context.arc(16, 16, 14, 0, Math.PI * 2);
            context.fillStyle = '#ffffff';
            context.fill();
        }
        return new THREE.CanvasTexture(canvas);
    }, []);

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={12}
                map={particleTexture}
                color="#10b981" // emerald-500
                sizeAttenuation={true}
                transparent={true}
                opacity={0.6}
                alphaTest={0.01}
                depthWrite={false}
            />
        </points>
    );
}

export function HeroCanvas() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden md:block">
            <Canvas camera={{ position: [0, 200, 1200], fov: 65 }}>
                {/* Subtle fog to fade out particles in the distance */}
                <fog attach="fog" args={['#f8fafc', 1000, 3000]} />
                <ParticleWave />
            </Canvas>
            {/* Fade gradients to blend canvas seamlessly into the section edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-transparent z-10 opacity-80" />
        </div>
    );
}
