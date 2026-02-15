import React from 'react';
import { motion } from 'framer-motion';

const ServicesTitle: React.FC = () => {
  return (
    <section className="w-full h-[60vh] flex items-center justify-center bg-transparent overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "backOut" }}
        viewport={{ once: false, margin: "-100px" }}
        className="text-6xl md:text-9xl font-display font-semibold uppercase leading-none text-center text-black"
      >
        We Are <span className="text-primary">Good</span> At
      </motion.h2>
    </section>
  );
};

export default ServicesTitle;