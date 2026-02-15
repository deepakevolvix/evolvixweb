import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full min-h-screen bg-black text-white flex flex-col justify-center items-center overflow-hidden z-20">
      
      {/* Background Statements - Stacked vertically behind brand */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20 pointer-events-none select-none">
         <h2 className="text-[6vw] leading-none font-display uppercase text-gray-500">Built Different</h2>
         <h2 className="text-[6vw] leading-none font-display uppercase text-gray-500">Design With Purpose</h2>
         <h2 className="text-[6vw] leading-none font-display uppercase text-gray-500">Code With Passion</h2>
         <h2 className="text-[6vw] leading-none font-display uppercase text-gray-500">Innovate Always</h2>
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-10 left-10 w-32 h-32 border-t-2 border-l-2 border-primary/40" />
      <div className="absolute top-10 right-10 w-32 h-32 border-t-2 border-r-2 border-primary/40" />
      <div className="absolute bottom-32 left-10 w-32 h-32 border-b-2 border-l-2 border-primary/40" />
      <div className="absolute bottom-32 right-10 w-32 h-32 border-b-2 border-r-2 border-primary/40" />

      {/* Main Brand Title */}
      <div className="relative z-10">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-[25vw] leading-none font-display font-bold text-white tracking-tighter mix-blend-overlay"
        >
          EVOLVIX
        </motion.h1>
      </div>

      <div className="absolute bottom-10 w-full text-center text-gray-500 text-sm font-sans z-10">
        © 2024 EVOLVIX AI. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;