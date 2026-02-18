import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 99) return 99;
          // Non-linear increment for realism
          const increment = Math.random() * 5; 
          return Math.min(prev + increment, 99);
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
        setProgress(100);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading || progress < 100 ? (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 bg-primary flex flex-col items-center justify-center overflow-hidden"
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
                {Math.floor(progress)}
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
                   {progress === 100 ? 'Ready' : 'Loading Assets'}
                </span>
             </div>
          </div>

        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Loader;