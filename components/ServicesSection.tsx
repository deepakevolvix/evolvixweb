import React from 'react';
import { motion } from 'framer-motion';

const services = [
  { id: 1, name: "AI Automation", label: "AI Automation & SaaS" },
  { id: 2, name: "Digital Marketing", label: "Digital Marketing" },
  { id: 3, name: "Web & E-Comm", label: "Website & E-Commerce" },
  { id: 4, name: "UI/UX Design", label: "UI/UX Design & Branding" },
  { id: 5, name: "Custom Software", label: "Custom Software, ERP & CRM" },
  { id: 6, name: "IT & Security", label: "IT Support & Cyber Security" },
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-transparent">
      
      {/* Foreground Content (In front of Model) */}
      <div className="relative w-full h-full pointer-events-auto">
          {services.map((service, index) => {
            // Calculate position on a circle
            const angle = index * 60; // 0, 60, 120, 180, 240, 300
            
            return (
              <React.Fragment key={service.id}>
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[270px] h-[270px] md:w-[600px] md:h-[600px] pointer-events-none"
                  style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
                >
                   <div 
                     className="absolute top-0 flex flex-col items-center transform -translate-y-1/2 pointer-events-auto"
                     style={{ transform: `rotate(-${angle}deg)` }} // Counter-rotate text to keep it upright
                   >
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.8 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       transition={{ delay: 0.2 + (index * 0.1) }}
                       viewport={{ once: true }}
                       className="flex flex-col items-center gap-2"
                     >
                       {/* Mobile: Smaller card, Desktop: Larger card */}
                       <div className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-md px-3 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl border border-white/20 shadow-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 group cursor-pointer">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full animate-pulse group-hover:bg-cyan-400 transition-colors" />
                          <h3 className="text-xs md:text-xl font-display uppercase tracking-wider text-black group-hover:text-primary transition-colors text-center whitespace-nowrap">
                            {service.label}
                          </h3>
                       </div>
                     </motion.div>
                   </div>
                </div>
              </React.Fragment>
            );
          })}
      </div>

    </section>
  );
};

export default ServicesSection;