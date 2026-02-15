import React from 'react';
import { motion } from 'framer-motion';

const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="relative w-full min-h-screen flex items-center justify-center bg-gray-50 px-6 md:px-16 overflow-hidden py-20">
      
      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between z-10 pointer-events-auto">
        
        {/* Headline */}
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl lg:text-9xl font-display uppercase leading-[0.85] text-black"
          >
            We Believe <br />
            In A <span className="text-primary">Process</span> <br />
            That Works
          </motion.h2>
        </div>

        {/* Text & Button */}
        <div className="w-full md:w-5/12 flex flex-col items-start md:pl-10">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-sans text-lg md:text-xl font-medium text-gray-700 leading-relaxed mb-10"
          >
            If you have an idea, a thought, or even just a rough direction in mind, we'd truly love to hear it. You don't need everything figured out. Sometimes a simple conversation is all it takes to find the right direction. Let's talk and see where it leads.
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-primary text-white font-display text-xl md:text-2xl uppercase px-8 py-3 rounded-none hover:bg-black transition-colors duration-300 shadow-lg shadow-primary/30"
          >
            Schedule Call
          </motion.button>
        </div>

      </div>

    </section>
  );
};

export default ProcessSection;