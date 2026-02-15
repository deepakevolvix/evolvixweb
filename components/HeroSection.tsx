import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative w-full h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden">
      
      {/* Content Layer */}
      <div className="flex flex-col md:flex-row justify-between items-center h-full pt-20 pb-20 relative pointer-events-auto">
        
        {/* Left Side text */}
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-md"
          >
            <p className="font-sans text-lg md:text-xl font-medium text-gray-700 mb-8 leading-relaxed">
              We design immersive, motion-driven websites that command attention and guide users to act. Clean builds. Sharp strategy. Zero fluff.
            </p>
            <button className="group relative overflow-hidden bg-primary text-white font-display text-2xl uppercase px-8 py-3 rounded-lg shadow-lg hover:shadow-primary/50 transition-all duration-300">
               <span className="relative z-10">Let's Talk</span>
               <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            </button>
          </motion.div>
        </div>

        {/* Right Side Headline */}
        <div className="w-full md:w-1/2 flex flex-col items-end text-right mt-10 md:mt-0 pointer-events-none">
           <motion.h1 
             initial={{ opacity: 0, x: 100 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             viewport={{ once: true }}
             className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.85] font-bold text-black uppercase"
           >
             Your Brand <br />
             <span className="text-primary">Deserves</span> <br />
             More Than <br />
             A Pretty <br />
             Website.
           </motion.h1>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;