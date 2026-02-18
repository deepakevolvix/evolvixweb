import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Process', id: 'process' },
    { name: 'Work', id: 'work' }
  ];

  return (
    <>
      {/* 
        Menu Overlay 
        - Compact black card with purple buttons
        - Centered horizontally
        - Bottom aligned (above navbar)
      */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: 20, x: "-50%", scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-28 left-1/2 z-50 w-[90vw] md:w-[600px] max-w-lg origin-bottom"
          >
            <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden">
               <div className="grid grid-cols-2 gap-4">
                  {/* Menu List */}
                  <div className="flex flex-col gap-3">
                     {menuItems.map((item) => (
                       <button
                         key={item.id}
                         onClick={() => scrollToSection(item.id)}
                         className="w-full py-4 bg-primary text-black font-display text-xl uppercase rounded-lg hover:bg-white transition-colors"
                       >
                         {item.name}
                       </button>
                     ))}
                     <button 
                        onClick={() => scrollToSection('contact')}
                        className="md:hidden w-full py-4 bg-white text-black font-display text-xl uppercase rounded-lg hover:bg-primary transition-colors"
                     >
                        Contact Us
                     </button>
                  </div>
                  
                  {/* QR / Info Panel */}
                  <div className="hidden md:flex flex-col items-center justify-center bg-white/5 rounded-lg p-4 border border-white/10">
                     <div className="w-24 h-24 bg-white rounded-lg mb-4 flex items-center justify-center">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://evolvix.ai" 
                          alt="QR"
                          className="w-20 h-20 opacity-90"
                        />
                     </div>
                     <p className="text-gray-400 text-xs font-sans text-center">Scan to open on mobile</p>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Floating Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90vw] md:w-auto md:min-w-[360px]">
         <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl px-1.5 py-1.5 flex items-center justify-between shadow-2xl gap-3 md:gap-6">
            
            {/* Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="bg-primary hover:bg-white transition-colors text-black px-3.5 py-2.5 rounded-lg flex items-center gap-2 group"
            >
               {isOpen ? <X size={18} /> : <Menu size={18} />}
               <span className="font-display text-base uppercase hidden md:block">Menu</span>
            </button>

            {/* Brand */}
            <div 
              onClick={() => scrollToSection('home')}
              className="font-display text-xl text-white uppercase tracking-wider cursor-pointer hover:text-primary transition-colors"
            >
               EVOLVIX
            </div>

            {/* Contact Button */}
            <a href="#contact" className="bg-primary hover:bg-white transition-colors text-black px-5 py-2.5 rounded-lg font-display text-base uppercase whitespace-nowrap">
               Contact Us
            </a>

         </div>
      </div>
    </>
  );
};

export default Navbar;