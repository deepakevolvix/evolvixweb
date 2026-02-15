import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedHexGridProps {
  className?: string;
  rows?: number;
  cols?: number;
}

const AnimatedHexGrid: React.FC<AnimatedHexGridProps> = ({ className = '', rows = 3, cols = 3 }) => {
  const hexes = Array.from({ length: rows * cols }, (_, i) => i);

  return (
    <div className={`relative flex flex-wrap justify-center items-center w-64 md:w-80 gap-1 ${className}`}>
      {hexes.map((hex, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.2 }}
          animate={{ 
            opacity: [0.2, 0.8, 0.2],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{
            duration: 3,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-12 h-12 md:w-16 md:h-16 bg-lime/10 clip-hex flex items-center justify-center backdrop-blur-sm border border-lime/30"
          style={{
            marginTop: Math.floor(i / cols) % 2 === 0 ? '0' : '2rem',
            marginLeft: '-0.25rem',
            marginRight: '-0.25rem'
          }}
        >
          {/* Inner core */}
          <div className="w-full h-full bg-lime/30 clip-hex scale-75" />
        </motion.div>
      ))}
      
      {/* Glow effect behind */}
      <div className="absolute inset-0 bg-lime/20 blur-3xl -z-10 rounded-full" />
    </div>
  );
};

export default AnimatedHexGrid;