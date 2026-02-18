import React from 'react';
import { motion } from 'framer-motion';

const FinalCTASection: React.FC = () => {
  return (
    <section id="contact" className="relative w-full py-32 bg-primary px-6 md:px-16 overflow-hidden z-20 flex items-center justify-center text-center">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
         <motion.h2 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="font-display text-5xl md:text-7xl lg:text-8xl uppercase text-white leading-none mb-10"
         >
            Ready to Build Something That <br/> <span className="text-black">Changes Everything?</span>
         </motion.h2>

         <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="font-sans text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto"
         >
            The businesses leading tomorrow are making their moves today. Evolvix is ready to make it happen.
         </motion.p>
         
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
         >
           <button className="bg-white text-primary font-display text-2xl md:text-3xl uppercase px-10 py-5 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300">
              Start My Digital Transformation
           </button>
           
           <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-white/80 font-sans text-sm md:text-base">
              <span>hello@evolvix.com</span>
              <span className="hidden md:inline">•</span>
              <span>WhatsApp: +971 XX XXX XXXX</span>
           </div>
         </motion.div>
      </div>

    </section>
  );
};

export default FinalCTASection;
