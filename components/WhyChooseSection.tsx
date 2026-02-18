import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Globe, Award, Rocket } from 'lucide-react';

const reasons = [
  {
    icon: <Zap size={32} />,
    title: "AI-First Approach",
    description: "Every solution is infused with intelligent automation from day one, not bolted on as an afterthought."
  },
  {
    icon: <Rocket size={32} />,
    title: "Speed Without Compromise",
    description: "Agile sprints, rapid prototyping, and battle-tested processes mean you go live faster without sacrificing quality."
  },
  {
    icon: <Award size={32} />,
    title: "Obsessed with ROI",
    description: "We measure success in revenue generated, leads captured, and costs saved, not vanity metrics."
  },
  {
    icon: <Shield size={32} />,
    title: "Enterprise-Grade Security",
    description: "Bank-level security baked into every platform, product, and process we deliver."
  },
  {
    icon: <Globe size={32} />,
    title: "Dubai-Based. Globally Minded.",
    description: "Local expertise. International standards. Built for businesses operating in the UAE and beyond."
  }
];

const WhyChooseSection: React.FC = () => {
  return (
    <section className="relative w-full py-24 bg-white px-6 md:px-16 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
           <motion.span 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="font-sans text-sm font-bold text-primary tracking-widest uppercase mb-4 block"
           >
             Why Choose Us
           </motion.span>
           <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="font-display text-5xl md:text-7xl uppercase leading-none text-black"
           >
             Why Dubai's Fastest-Growing <br/> Brands <span className="text-primary">Choose Evolvix.</span>
           </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {reasons.map((reason, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               viewport={{ once: true }}
               className="p-8 border border-gray-100 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group"
             >
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center text-primary mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                   {reason.icon}
                </div>
                <h3 className="font-display text-2xl uppercase mb-4">{reason.title}</h3>
                <p className="font-sans text-gray-600 leading-relaxed">
                   {reason.description}
                </p>
             </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseSection;
