import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full py-20 bg-black text-white px-6 md:px-16 z-20 overflow-hidden">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24">
         
         {/* Brand & Tagline */}
         <div className="w-full md:w-1/3">
            <h2 className="font-display text-4xl uppercase mb-6">Evolvix</h2>
            <p className="font-sans text-gray-400 leading-relaxed mb-6">
               Intelligent Systems. Measurable Growth. Built in Dubai for a World Without Limits.
            </p>
            <div className="flex gap-4">
               {/* Social Icons Placeholder */}
               <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">IG</div>
               <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">LI</div>
               <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">TW</div>
            </div>
         </div>

         {/* Navigation Links */}
         <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Services */}
            <div>
               <h3 className="font-display text-xl uppercase mb-6 text-primary">Services</h3>
               <ul className="flex flex-col gap-3 font-sans text-gray-400 text-sm">
                  <li className="hover:text-white cursor-pointer transition-colors">AI Automation</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Digital Marketing</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Web Development</li>
                  <li className="hover:text-white cursor-pointer transition-colors">UI/UX Design</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Custom Software</li>
                  <li className="hover:text-white cursor-pointer transition-colors">IT Support</li>
               </ul>
            </div>

            {/* Company */}
            <div>
               <h3 className="font-display text-xl uppercase mb-6 text-primary">Company</h3>
               <ul className="flex flex-col gap-3 font-sans text-gray-400 text-sm">
                  <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Our Process</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Case Studies</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
               </ul>
            </div>

            {/* Legal */}
            <div>
               <h3 className="font-display text-xl uppercase mb-6 text-primary">Legal</h3>
               <ul className="flex flex-col gap-3 font-sans text-gray-400 text-sm">
                  <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Cookie Policy</li>
               </ul>
            </div>

         </div>

      </div>

      <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500 text-sm font-sans flex flex-col md:flex-row justify-between items-center">
        <span>© 2025 Evolvix Digital Solutions LLC — Dubai, UAE. All Rights Reserved.</span>
        <span className="mt-2 md:mt-0">Designed & Engineered by Evolvix</span>
      </div>

    </footer>
  );
};

export default Footer;