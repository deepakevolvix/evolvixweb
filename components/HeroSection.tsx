import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative w-full h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 overflow-hidden bg-transparent">
      
      {/* Left Side: Copy & CTA */}
      <div className="w-full md:w-5/12 flex flex-col items-start z-20 pt-20 md:pt-0">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-lg"
        >
          <p className="font-sans text-lg md:text-xl text-black mb-8 leading-relaxed">
            We design immersive, motion-driven websites that command attention and guide users to act. Clean builds. Sharp strategy. Zero fluff.
          </p>
          
          <a href="#contact" className="inline-block bg-primary text-white font-display text-xl uppercase px-8 py-3 hover:bg-black hover:text-primary transition-colors duration-300 shadow-lg">
             Launch My Growth
          </a>
        </motion.div>
      </div>

      {/* Right Side: Big Headline (Behind Model usually, but Model is centered. We need to position this right) */}
      {/* 
          Since the 3D model is centered in the Scene, we can't easily put text "behind" it here without z-index tricks.
          However, the user wants a split layout. 
          Let's place this text on the right side.
      */}
      <div className="w-full md:w-1/2 flex flex-col items-end z-10 mt-10 md:mt-0 text-right pointer-events-none mix-blend-difference">
         <motion.h1 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-display text-6xl md:text-8xl lg:text-[9rem] leading-[0.8] font-bold text-black uppercase tracking-tighter"
         >
            YOUR BRAND <br/>
            <span className="text-primary">RESERVES</span> MORE <br/>
            THAN A PRETTY <br/>
            WEBSITE.
         </motion.h1>
      </div>

      {/* Hexagon Pattern (Optional Decoration) */}
      <div className="absolute bottom-10 left-10 opacity-20 pointer-events-none">
         {/* Simple CSS Hexagon Grid or Image */}
         <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-12 h-12 bg-primary clip-path-hexagon" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
            ))}
         </div>
      </div>

    </section>
  );
};

export default HeroSection;