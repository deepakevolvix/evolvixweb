import React from 'react';
import { motion } from 'framer-motion';

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-transparent">
      
      {/* Foreground Content (In front of Model) */}
      <div className="relative w-full h-full pointer-events-auto">
          {/* TOP: DEVELOPMENT */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <motion.div 
               initial={{ opacity: 0, y: -20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }} 
               className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-3 rounded-full border border-gray-200 shadow-sm"
            >
               <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
               <h3 className="text-xl md:text-2xl font-display uppercase tracking-wider text-black">Development</h3>
            </motion.div>
          </div>

          {/* BOTTOM: E-COMMERCE */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-3 rounded-full border border-gray-200 shadow-sm"
            >
               <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
               <h3 className="text-xl md:text-2xl font-display uppercase tracking-wider text-black">E-Commerce</h3>
            </motion.div>
          </div>

          {/* LEFT: DESIGN */}
          <div className="absolute top-1/2 left-6 md:left-20 -translate-y-1/2 flex items-center">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-3 rounded-full border border-gray-200 shadow-sm"
            >
               <h3 className="text-xl md:text-2xl font-display uppercase tracking-wider text-black">Design</h3>
               <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </motion.div>
          </div>

          {/* RIGHT: SEO */}
          <div className="absolute top-1/2 right-6 md:right-20 -translate-y-1/2 flex items-center">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-3 rounded-full border border-gray-200 shadow-sm"
            >
               <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
               <h3 className="text-xl md:text-2xl font-display uppercase tracking-wider text-black">SEO</h3>
            </motion.div>
          </div>
      </div>

    </section>
  );
};

export default ServicesSection;