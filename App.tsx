import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ScrollControls, Scroll, useScroll } from '@react-three/drei';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesTitle from './components/ServicesTitle';
import ServicesSection from './components/ServicesSection';
import StatsSection from './components/StatsSection';
import AboutSection from './components/AboutSection';
import ServicesShowcase from './components/ServicesShowcase';
import WhyChooseSection from './components/WhyChooseSection';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import FinalCTASection from './components/FinalCTASection';
import Footer from './components/Footer';
import BackgroundDecorations from './components/BackgroundDecorations';
import ContactPopup from './components/ContactPopup';
import ErrorBoundary from './components/ErrorBoundary';

const Scene = React.lazy(() => import('./components/Scene'));

// Exposes Drei's internal scroll element and scroll.offset to the window
const ScrollHooker = ({ onStopFraction }: { onStopFraction: (f: number) => void }) => {
  const scroll = useScroll();
  const { height } = useThree((state) => state.viewport);
  
  useFrame(() => {
    if (scroll) {
      // Expose to window for external non-canvas components to sync
      (window as any).__scrollOffset = scroll.offset;
      (window as any).__scrollEl = scroll.el;

      // 1. Calculate where the marker is physically located in the scrollable document
      const markerEl = document.getElementById('model-stop-marker');
      const rootEl = document.getElementById('main-content');
      
      if (markerEl && rootEl) {
        // Find total scrollable height exactly based on the React DOM content
        const totalHeight = rootEl.getBoundingClientRect().height;
        const viewportHeight = window.innerHeight;
        const totalScrollablePixels = totalHeight - viewportHeight;
        
        // Find absolute pixel distance of marker from top of document
        // We use getBoundingClientRect + scrollY to get true document coordinates
        const markerRect = markerEl.getBoundingClientRect();
        const rootRect = rootEl.getBoundingClientRect();
        const markerY = markerRect.top - rootRect.top;

        // We want the model to lock when the marker reaches the CENTER of the viewport
        const targetScrollPixels = markerY - (viewportHeight / 2);
        
        // Convert that pixel distance into a 0-1 fraction
        let fraction = targetScrollPixels / totalScrollablePixels;
        
        // Clamp and update state (avoid setting negative or over 100%)
        fraction = Math.max(0, Math.min(1, fraction));
        onStopFraction(fraction);
      }
    }
  });
  return null;
};

// Syncs HTML background elements with the ThreeJS canvas scroll
const HTMLSyncer = ({ targetRef, pages }: { targetRef: React.RefObject<HTMLDivElement>, pages: number }) => {
  useEffect(() => {
    let animationFrameId: number;
    let fallbackTimer: NodeJS.Timeout;

    const syncScroll = () => {
      if (targetRef.current) {
        // Try to read exactly what three.js is using
        const offset = (window as any).__scrollOffset;
        if (typeof offset === 'number') {
          const scrollY = offset * (pages - 1) * window.innerHeight;
          targetRef.current.style.transform = `translate3d(0, -${scrollY}px, 0)`;
        } else {
          // If drei hasn't mounted yet, use native fallback
          const el = document.querySelector('div[style*="overflow: auto"]') as HTMLElement | null;
          if (el) {
             const manualOffset = el.scrollTop / (el.scrollHeight - el.clientHeight);
             const scrollY = manualOffset * (pages - 1) * window.innerHeight;
             targetRef.current.style.transform = `translate3d(0, -${scrollY}px, 0)`;
          }
        }
      }
      animationFrameId = requestAnimationFrame(syncScroll);
    };

    // Delay start slightly to allow Drei to mount its scroll container
    fallbackTimer = setTimeout(() => {
      syncScroll();
    }, 100);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(fallbackTimer);
    };
  }, [pages, targetRef]);

  return null;
};


const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [stopFraction, setStopFraction] = useState(0.12);
  
  // Dynamic pages calculation eliminates white space after Footer
  const [pages, setPages] = useState(1);

  // Smooth fraction updater
  const updateStopFraction = (f: number) => {
    setStopFraction((prev) => {
      if (Math.abs(prev - f) > 0.005) return f;
      return prev;
    });
  };

  useEffect(() => {
    const updatePages = () => {
      const mainEl = document.getElementById('main-content');
      if (mainEl) {
        // Required pages = Total content height / Viewport height
        const contentHeight = mainEl.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;
        if (windowHeight > 0) {
          setPages(contentHeight / windowHeight);
        }
      }
    };

    const timer = setTimeout(updatePages, 500);
    
    // Attach a ResizeObserver to observe content height changes (lazy loading, resizing, etc.)
    let observer: ResizeObserver | null = null;
    const connectObserver = () => {
      const mainEl = document.getElementById('main-content');
      if (mainEl && !observer) {
        observer = new ResizeObserver(() => {
          updatePages();
        });
        observer.observe(mainEl);
      }
    };

    // Try setting up observer repeatedly until the element exists
    const observerTimer = setInterval(connectObserver, 1000);
    window.addEventListener('resize', updatePages);

    return () => {
      clearTimeout(timer);
      clearInterval(observerTimer);
      window.removeEventListener('resize', updatePages);
      if (observer) observer.disconnect();
    };
  }, []);



  return (
    <div className="relative w-full h-screen bg-gray-50 text-black overflow-hidden">
      <Loader onLoaded={() => setLoading(false)} />

      <div className="w-full h-full">
        
        {/* LAYER 1: Background Decorations */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
           {/* This container moves up/down based on scroll */}
           <div ref={backgroundRef} className="w-full will-change-transform">
              <BackgroundDecorations />
           </div>
        </div>
        
        {/* Standalone Syncer outside Canvas to hook into exposed window properties */}
        <HTMLSyncer targetRef={backgroundRef} pages={pages} />

        {/* LAYER 2: Canvas (Model) - Raised z-index to 30 so it ALWAYS stays in front of text */}
        <div className="fixed inset-0 z-30 pointer-events-none">
          <ErrorBoundary>
            <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
              <Suspense fallback={null}>
                <ScrollControls pages={pages} damping={0.3}>
                   <Scene pages={pages} stopFraction={stopFraction} />
                   <ScrollHooker onStopFraction={updateStopFraction} />
                   
                   {/* LAYER 3: Main Content (Text/Buttons) - Sits on top */}
                   <Scroll html style={{ width: '100%', zIndex: 20 }}>
                      <main id="main-content" className="w-full relative pointer-events-auto">
                        <HeroSection />
                        {/* Section 1.5: Title */}
                        <ServicesTitle />
                        {/* Section 2: Radial Services */}
                        <ServicesSection />
                        
                        <StatsSection />
                        <AboutSection />
                        <ServicesShowcase />
                        <WhyChooseSection />
                        <ProcessSection />
                        <TestimonialsSection />
                        <FinalCTASection />
                        <Footer />
                      </main>
                   </Scroll>
                </ScrollControls>
                <Environment preset="city" />
              </Suspense>
            </Canvas>
          </ErrorBoundary>
        </div>

        {/* Navbar - Z-50 to float above everything */}
        <Navbar />
        
        {/* Contact Popup */}
        <ContactPopup />
      </div>
    </div>
  );
};

export default App;