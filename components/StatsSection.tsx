import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: "200+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5X", label: "Average ROI Growth" },
  { value: "24/7", label: "Support & Monitoring" },
];

const StatsSection: React.FC = () => {
  return (
    <section className="relative w-full py-20 bg-black text-white px-6 md:px-16 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl uppercase mb-6"
          >
            Numbers That Speak <br/> <span className="text-primary">For Themselves.</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             viewport={{ once: true }}
             className="font-sans text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Real results. Real businesses. Real impact. Here's what Evolvix delivers.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <span className="font-display text-5xl md:text-7xl text-primary mb-2">{stat.value}</span>
              <span className="font-sans text-sm md:text-base font-medium text-gray-300 uppercase tracking-wider">{stat.label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
