import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  return (
    <section className="relative w-full py-24 bg-white text-black px-6 md:px-16 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
           >
             <span className="font-sans text-sm font-bold tracking-widest text-primary uppercase mb-4 block">
                Who We Are
             </span>
             <h2 className="font-display text-4xl md:text-8xl uppercase leading-[0.85] mb-8">
                Born in Dubai. <br/> Built for the <span className="text-primary">World.</span>
             </h2>
             <p className="font-sans text-[15px] md:text-xl text-gray-700 leading-relaxed mb-6">
               Evolvix is not a typical agency. We are a technology-first powerhouse that fuses artificial intelligence, creative design, and precision engineering to solve real business problems at scale.
             </p>
             <p className="font-sans text-[15px] md:text-xl text-gray-700 leading-relaxed">
               We believe the businesses that will dominate the next decade aren't the biggest — they're the most intelligent. That's why we build AI systems, automation pipelines, and digital ecosystems that work while you sleep.
             </p>
           </motion.div>
        </div>

        {/* Right: Abstract Visual */}
        <div className="w-full md:w-1/2 relative h-[500px] bg-gray-100 rounded-3xl overflow-hidden">
           {/* Placeholder for About Image or 3D element */}
           <img 
             src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
             alt="Global Connectivity" 
             className="w-full h-full object-cover opacity-80"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-50" />
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
