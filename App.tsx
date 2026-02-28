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
const Scene = React.lazy(() => import('./components/Scene'));
import BackgroundDecorations from './components/BackgroundDecorations';
import ContactPopup from './components/ContactPopup';
import ErrorBoundary from './components/ErrorBoundary';

// This component reads the scroll offset from ScrollControls and applies it to an external DOM element
const ScrollSyncer = ({ targetRef, pages }: { targetRef: React.RefObject<HTMLDivElement>, pages: number }) => {
  const scroll = useScroll();
  const { height } = useThree((state) => state.viewport);
  // viewport height in pixels can be approximated or we can use window.innerHeight
  // ScrollControls `scroll.offset` is 0 to 1.
  // The total scrollable distance in pixels is roughly (pages - 1) * window.innerHeight
  
  useFrame(() => {
    if (targetRef.current && scroll) {
      const scrollY = scroll.offset * (pages - 1) * window.innerHeight;
      targetRef.current.style.transform = `translate3d(0, -${scrollY}px, 0)`;
    }
  });
  return null;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  // Dynamic pages calculation eliminates white space after Footer
  const [pages, setPages] = useState(1);

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
          <ErrorBoundary>
            <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
              <Suspense fallback={null}>
                <ScrollControls pages={pages} damping={0.3}>
                   <Scene />
                   <ScrollSyncer targetRef={backgroundRef} pages={pages} />
                   
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