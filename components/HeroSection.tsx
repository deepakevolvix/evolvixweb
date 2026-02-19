import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// --- COMPONENTS ---
const Ticker = () => {
   const [index, setIndex] = React.useState(0);
   const items = ["[ AI Automation ]", "[ WhatsApp Marketing ]", "[ SaaS Platforms ]", "[ Web Design Dubai ]", "[ Digital Transformation ]", "[ Evolvix ]"];

   React.useEffect(() => {
      const timer = setInterval(() => {
         setIndex((prev) => (prev + 1) % items.length);
      }, 1500);
      return () => clearInterval(timer);
   }, []);

   return (
      <div className="absolute inset-0 flex items-center">
         <AnimatePresence mode="wait">
            <motion.span 
               key={index}
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -20, opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="font-display text-lg md:text-2xl text-gray-500 uppercase tracking-widest"
            >
               {items[index]}
            </motion.span>
         </AnimatePresence>
      </div>
   );
};

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative w-full h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 overflow-hidden bg-transparent">
      
      {/* Right Side: Headline (Top on Mobile, Right on Desktop) */}
      <div className="w-full md:w-1/2 flex flex-col items-start md:items-end z-10 text-left md:text-right mix-blend-difference order-1 md:order-2 mb-8 md:mb-0 mt-24 md:mt-0">
         <motion.h1 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] leading-[0.9] md:leading-tight font-bold text-black uppercase tracking-normal"
         >
            WE DON'T JUST <br/>
            <span className="text-primary">AUTOMATE.</span> <br/>
            WE EVOLVE.
         </motion.h1>
      </div>

      {/* Left Side: Copy & CTA (Bottom on Mobile, Left on Desktop) */}
      <div className="w-full md:w-5/12 flex flex-col items-start z-20 order-2 md:order-1">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-lg"
        >
          <p className="font-sans text-[15px] md:text-xl text-black mb-6 md:mb-8 leading-relaxed">
            Evolvix is Dubai's leading AI automation and digital solutions company — engineering smart systems, sleek interfaces, and revenue-driving strategies for brands ready to lead in the AI era.
            <br className="hidden md:block"/><br className="hidden md:block"/>
            <span className="hidden md:inline">From AI-powered SaaS tools and WhatsApp marketing automation to pixel-perfect web design and enterprise-grade IT support — we deliver end-to-end digital transformation that doesn't just keep up with the future. It builds it.</span>
            <span className="md:hidden"> We deliver end-to-end digital transformation that builds the future.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full">
             <a href="#contact" className="w-full sm:w-auto text-center bg-primary text-white font-display text-lg md:text-xl uppercase px-6 py-3 hover:bg-black hover:text-primary transition-colors duration-300 shadow-lg whitespace-nowrap">
                Launch My Growth
             </a>
             <button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto text-center border border-black text-black font-display text-lg md:text-xl uppercase px-6 py-3 hover:bg-black hover:text-white transition-colors duration-300 whitespace-nowrap">
                Explore Our AI Stack
             </button>
          </div>

          <div className="mt-8 md:mt-12 h-6 md:h-8 relative overflow-hidden w-full">
             <Ticker />
          </div>
        </motion.div>
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