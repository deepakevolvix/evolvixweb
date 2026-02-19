import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Float, MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Fix for missing types in JSX.IntrinsicElements for React Three Fiber elements and standard HTML elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      directionalLight: any;
      div: any;
      span: any;
      main: any;
      section: any;
      button: any;
      nav: any;
      a: any;
      p: any;
      img: any;
      br: any;
      footer: any;
      h1: any;
      h2: any;
      h3: any;
      group: any;
      mesh: any;
      
    }
  }
}

const Scene: React.FC = () => {
  const scroll = useScroll();
  const { height: viewportHeight } = useThree((state) => state.viewport);

  // Ref for the model group (for rotation)
  const meshRef = useRef<THREE.Group>(null);
  // Ref for the container group (for position/movement)
  const groupRef = useRef<THREE.Group>(null);

  /* 
     NOTE: 
     Please ensure the following files are in 'public/evolvix-model/':
     - evolvix_logo_3d_model.gltf
     - buffer.bin
     - baseColor_1.jpg
     - metallicRoughness_1.jpg
     - normal_1.jpg
  */
  const { nodes } = useGLTF(`${import.meta.env.BASE_URL}evolvix-model/evolvix_logo_3d_model.gltf`) as any;

  // Extract all meshes from the loaded GLTF nodes
  const modelMeshes = useMemo(() => {
    return Object.values(nodes).filter((node: any) => node.isMesh);
  }, [nodes]);

  // --- CONFIGURATION ---
  // Layout: Hero(100vh) + Title(60vh) + Services(100vh) ...
  // Center of Services Section is at 210vh (1.0 + 0.6 + 0.5).
  // We want this center to align with the Screen Center (0.5vh).
  // So we need to scroll by: 2.1 - 0.5 = 1.6vh.
  // STOP_POINT = 1.6 / (TOTAL_PAGES - 1)
  const isMobile = window.innerWidth < 768;
  const TOTAL_PAGES = isMobile ? 25 : 16.5;
  const STOP_POINT = 1.6 / (TOTAL_PAGES - 1);
  console.log("STOP_POINT", STOP_POINT);

  const START_Y = 0; // Start well above screen for entrance effect
  const CENTER_Y = 0;                   // Center screen

  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current) return;

    const scrollOffset = scroll.offset;

    // --- ROTATION LOGIC ---
    // 1. Base continuous slow rotation (Time based)
    // "The Model Keeps Rotating slowly"
    const timeRotation = state.clock.getElapsedTime() * 0.3;

    // 2. Scroll-based rotation (0 to 360 degrees)
    // "From the START TO STOP POINT... A 360 rotation with the scroll"
    const rotationProgress = Math.min(scrollOffset / STOP_POINT, 1);
    const scrollRotation = rotationProgress * Math.PI * 2;

    // Combine them: Start rotation point is timeRotation, then add scrollRotation
    meshRef.current.rotation.y = timeRotation + scrollRotation;

    // Add subtle X rotation for realism
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;


    // --- MOVEMENT LOGIC ---
    let targetY;

    if (scrollOffset < STOP_POINT) {
      // Phase 1: Entrance (Top -> Center)
      // Normalize progress 0->1
      const progress = scrollOffset / STOP_POINT;

      // Use Ease Out for smooth arrival at the center
      const ease = 1 - Math.pow(1 - progress, 3);

      targetY = THREE.MathUtils.lerp(START_Y, CENTER_Y, ease);
    } else {
      // Phase 2: Pinned (Moves up with the grid)
      // "There is no need to ease out the Movement after hitting the stop Point"
      // We calculate the exact position to lock it to the scrolling content.
      const extraScroll = scrollOffset - STOP_POINT;
      const scrollDistance = extraScroll * (TOTAL_PAGES - 1) * viewportHeight;

      targetY = CENTER_Y + scrollDistance;
    }

    // Direct assignment removes the "drift" or "floaty" behavior, making it feel pinned/mechanical 
    // when necessary, while the ease calculation above handles the smoothness of the entrance.
    groupRef.current.position.y = targetY;
  });

  return (
    <>
      <group ref={groupRef} position={[0, START_Y, 0]}>
        {/* Reduced rotationIntensity in Float so it doesn't interfere with our precise scroll rotation */}
        <Float speed={2} rotationIntensity={0} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
          <group ref={meshRef} scale={viewportHeight < 6 || window.innerWidth < 768 ? 0.7 : 1}>
            {modelMeshes.map((mesh: any, i: number) => (
              <mesh key={i} geometry={mesh.geometry} material={mesh.material}>
                {/* 
                  <MeshTransmissionMaterial 
                    backside
                    samples={4}
                    thickness={0.5}
                    roughness={0.2}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    transmission={1}
                    background={new THREE.Color('#F3F4F6')}
                    color="#8B5CF6"
                    chromaticAberration={0.06}
                    anisotropy={0.1}
                    distortion={0.5}
                    distortionScale={0.3}
                    temporalDistortion={0.1}
                  />
                  */}
              </mesh>
            ))}
          </group>
        </Float>
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#69318e" />
    </>
  );
};

// Preload the model
useGLTF.preload(`${import.meta.env.BASE_URL}evolvix-model/evolvix_logo_3d_model.gltf`);

export default Scene;