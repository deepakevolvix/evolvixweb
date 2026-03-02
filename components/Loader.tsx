import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';

interface LoaderProps {
  onLoaded?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoaded }) => {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const onLoadedFired = useRef(false);

  useEffect(() => {
    // Simulate a fast loading progress independent of the heavy 3D model
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 4; // increment by 4 every 30ms = ~750ms total
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (displayProgress >= 100 && !isReady) {
      setTimeout(() => setIsReady(true), 400); // Short delay before curtain raises
    }
  }, [displayProgress, isReady]);

  const targetProgress = 100;

  useEffect(() => {
    if (displayProgress === 100 && isReady && onLoaded && !onLoadedFired.current) {
        onLoadedFired.current = true;
        onLoaded();
    }
  }, [displayProgress, targetProgress, isReady, onLoaded]);

  return (
    <AnimatePresence>
      {!isReady || displayProgress < 100 ? (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start">
             <h1 className="font-display text-4xl md:text-5xl text-white uppercase tracking-tighter">
                EVOLVIX
             </h1>
             <span className="font-sans text-xs md:text-sm font-semibold tracking-widest text-white/60 uppercase">
                Loading Experience
             </span>
          </div>

          {/* Center Counter */}
          <div className="relative z-10">
             <span className="font-display text-[25vw] leading-none text-white tracking-tighter">
                {Math.floor(displayProgress)}
             </span>
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-0 left-0 w-full px-6 md:px-10 pb-10">
             {/* Divider Line */}
             <div className="w-full h-[2px] bg-white/20 mb-6" />
             
             <div className="flex justify-between items-end">
                <span className="font-sans text-sm md:text-base font-medium text-white/70 uppercase tracking-widest">
                   Preparing Ecosystem
                </span>
                
                <span className="font-display text-2xl md:text-3xl text-white uppercase">
                   {isReady ? 'Ready' : (displayProgress >= 100 ? 'Initializing' : 'Loading Assets')}
                </span>
             </div>
          </div>

        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Loader;