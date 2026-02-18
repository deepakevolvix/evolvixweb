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
            className="text-5xl md:text-7xl font-display uppercase leading-[0.9] text-black"
          >
            How We Turn <br />
            Your Vision <br />
            Into <span className="text-primary">Reality.</span>
          </motion.h2>
          <p className="mt-8 font-sans text-lg text-gray-600 max-w-sm">
             A clear process is the backbone of every great project. At Evolvix, we follow a battle-tested approach.
          </p>
        </div>

        {/* Text & Steps */}
        <div className="w-full md:w-1/2 flex flex-col items-start md:pl-10">
           <div className="grid gap-8">
              {[
                { step: "01", title: "Discover & Define", desc: "We dive deep into your business goals and challenges." },
                { step: "02", title: "Strategize & Blueprint", desc: "Detailed roadmap, tech stack, and milestones." },
                { step: "03", title: "Design & Prototype", desc: "Stunning visual prototypes you can feel." },
                { step: "04", title: "Build & Integrate", desc: "Clean code, AI integrations, seamless connections." },
                { step: "05", title: "Launch & Optimize", desc: "Rigorous QA and performance monitoring." },
                { step: "06", title: "Scale & Automate", desc: "Continuous optimization for compounding growth." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 border-l-2 border-primary/20 pl-6 hover:border-primary transition-colors duration-300"
                >
                   <span className="font-display text-2xl text-primary">{item.step}</span>
                   <div>
                      <h3 className="font-display text-xl uppercase text-black">{item.title}</h3>
                      <p className="font-sans text-sm text-gray-500">{item.desc}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

      </div>

    </section>
  );
};

export default ProcessSection;