import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ScrollControls, Scroll, useScroll } from '@react-three/drei';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesTitle from './components/ServicesTitle';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import WorkSection from './components/WorkSection';
import Footer from './components/Footer';
import Scene from './components/Scene';
import BackgroundDecorations from './components/BackgroundDecorations';

// This component reads the scroll offset from ScrollControls and applies it to an external DOM element
const ScrollSyncer = ({ targetRef, pages }: { targetRef: React.RefObject<HTMLDivElement>, pages: number }) => {
  const scroll = useScroll();
  const { height } = useThree((state) => state.viewport);
  // viewport height in pixels can be approximated or we can use window.innerHeight
  // ScrollControls `scroll.offset` is 0 to 1.
  // The total scrollable distance in pixels is roughly (pages - 1) * window.innerHeight
  
  useFrame(() => {
    if (targetRef.current) {
      const scrollY = scroll.offset * (pages - 1) * window.innerHeight;
      targetRef.current.style.transform = `translate3d(0, -${scrollY}px, 0)`;
    }
  });
  return null;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const PAGES = 6;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-50 text-black overflow-hidden">
      <Loader isLoading={loading} />

      <div className={`w-full h-full transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* 
            Z-INDEX LAYERING STRATEGY:
            1. Background Decorations (HTML Container): z-0
               - Sits physically behind everything.
               - Moved manually by ScrollSyncer to match Canvas scroll.
            2. Canvas Wrapper (Model): z-10
            3. Main Content (ScrollControls HTML): z-20
        */}

        {/* LAYER 1: Background Decorations */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
           {/* This container moves up/down based on scroll */}
           <div ref={backgroundRef} className="w-full will-change-transform">
              <BackgroundDecorations />
           </div>
        </div>

        {/* LAYER 2: Canvas (Model) */}
        <div className="fixed inset-0 z-10 pointer-events-none">
          <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              <ScrollControls pages={PAGES} damping={0.3}>
                 <Scene />
                 <ScrollSyncer targetRef={backgroundRef} pages={PAGES} />
                 
                 {/* LAYER 3: Main Content (Text/Buttons) - Sits on top */}
                 <Scroll html style={{ width: '100%', zIndex: 20 }}>
                    <main className="w-full relative pointer-events-auto">
                      <HeroSection />
                      <ServicesTitle />
                      <ServicesSection />
                      <ProcessSection />
                      <WorkSection />
                      <Footer />
                    </main>
                 </Scroll>
              </ScrollControls>
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        {/* Navbar - Z-50 to float above everything */}
        <Navbar />
      </div>
    </div>
  );
};

export default App;