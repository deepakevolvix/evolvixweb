import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { getDevicePerformance } from '../utils/deviceDetection';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      directionalLight: any;
      group: any;
      mesh: any;
    }
  }
}

interface SceneProps {
  pages: number;
  stopFraction: number;
}

const Scene: React.FC<SceneProps> = ({ pages, stopFraction }) => {
  const scroll = useScroll();
  const { height: viewportHeight } = useThree((state) => state.viewport);
  const { height: windowHeight } = useThree((state) => state.size);

  const meshRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const { nodes } = useGLTF(`${import.meta.env.BASE_URL}evolvix-model/newevolvixmodel.glb`) as any;

  const modelMeshes = useMemo(() => {
    return (Object.values(nodes) as any[]).filter((n: any) => n.isMesh);
  }, [nodes]);

  const STOP_POINT = Math.max(stopFraction, 0.01);

  const perfGrade = useMemo(() => getDevicePerformance(), []);
  const frameCount = useRef(0);

  useFrame((state) => {
    // Frame skipping for low-tier devices (throttles to ~30fps)
    if (perfGrade === 'low') {
      frameCount.current++;
      if (frameCount.current % 2 !== 0) return;
    }

    if (!groupRef.current || !meshRef.current) return;

    const t = scroll.offset;
    const time = state.clock.getElapsedTime();

    // The scroll-linked extra spinning stops when it hits the center
    // We use the exact stopFraction calculated dynamically by App.tsx
    const spinProgress = Math.min(t / stopFraction, 1);
    
    // We lock the arbitrary float value for rotation so it doesn't jump
    const lockedRotationTime = spinProgress * 5; 

    // `time * 0.3` gives it a constant slow AUTO-SPIN forever!
    // `-` instead of `+` reverses the overall spin direction
    meshRef.current.rotation.y = -(time * 0.3 + spinProgress * Math.PI * 2);
    meshRef.current.rotation.x = Math.sin(lockedRotationTime * 0.5) * 0.1;

    // The gentle float continues forever using real time
    const floatY = Math.sin(time * 1.5) * 0.08;

    let targetY = 0;

    // We do exactly what you requested:
    // 1. Model sits perfectly at the center of the screen
    // 2. When the background intersection hits the center, the model "sticks" to it.
    
    // We get the EXACT visual position of the marker (which is the intersection line)
    // on your screen right now, in pixels.
    const markerEl = document.getElementById('model-stop-marker');
    if (markerEl) {
      const rect = markerEl.getBoundingClientRect();
      const pixelY = rect.top; // Pixel distance from top of screen
      
      // Convert that pixel distance on your screen into a 3D coordinate.
      // Top of screen is +viewportHeight/2. Bottom is -viewportHeight/2.
      const normalizedY = 1 - (pixelY / windowHeight) * 2;
      const threeY = normalizedY * (viewportHeight / 2);
      
      // When marker is far below the screen, threeY is NEGATIVE.
      // Math.max(0, negative) = 0. So model stays anchored at center height (y=0).
      
      // When intersection hits the center of the screen, threeY is 0.
      // Math.max(0, 0) = 0.
      
      // As you scroll further down, the intersection moves UP. threeY becomes POSITIVE.
      // Math.max(0, positive) = positive. The model moves UP exactly glued to the intersection.
      // It perfectly scrolls away without any floating beyond the intersection!
      targetY = Math.max(0, threeY);
    }

    groupRef.current.position.y = targetY + floatY;
  });

  return (
    <>
      <group ref={groupRef}>
        <group ref={meshRef} scale={isMobile ? [0.7, 0.7, 0.7] : [1, 1, 0.7]}>
          {modelMeshes.map((mesh: any, i: number) => (
            <mesh key={i} geometry={mesh.geometry} material={mesh.material} />
          ))}
        </group>
      </group>

      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#69318e" />
    </>
  );
};

export default Scene;