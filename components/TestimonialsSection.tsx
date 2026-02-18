import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Evolvix transformed our entire sales process. Their WhatsApp automation alone generated 3X more qualified leads in the first month. These guys are next-level.",
    author: "CEO",
    company: "E-Commerce Brand, Dubai"
  },
  {
    quote: "From zero to full ERP implementation in 8 weeks. The Evolvix team is fast, professional, and genuinely cares about results. Highly recommended for any UAE business.",
    author: "COO",
    company: "Logistics Company, Abu Dhabi"
  },
  {
    quote: "Our website redesign by Evolvix cut our bounce rate by 40% and doubled our conversion rate. The UI/UX team is world-class. Worth every dirham.",
    author: "Marketing Director",
    company: "SaaS Startup, Dubai"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative w-full py-24 bg-black text-white px-6 md:px-16 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl uppercase"
          >
             What Our Clients <span className="text-primary">Are Saying.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {testimonials.map((t, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.2 }}
               viewport={{ once: true }}
               className="bg-white/5 border border-white/10 p-8 rounded-2xl relative"
             >
                <div className="absolute top-6 right-6 text-primary/20">
                   <Quote size={40} />
                </div>
                
                <p className="font-sans text-lg md:text-xl italic text-gray-300 mb-8 leading-relaxed">
                   "{t.quote}"
                </p>
                
                <div className="border-t border-white/10 pt-6">
                   <p className="font-display text-xl uppercase text-white">{t.author}</p>
                   <p className="font-sans text-sm text-primary">{t.company}</p>
                </div>
             </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
