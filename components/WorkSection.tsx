import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  { id: 1, name: "PAWWW", type: "Concept • 3D", img: "https://picsum.photos/seed/pawww/600/400" },
  { id: 2, name: "Pritam Das", type: "Web • Development", img: "https://picsum.photos/seed/pritam/600/400" },
  { id: 3, name: "WTF Ruchit", type: "Design • System", img: "https://picsum.photos/seed/ruchit/600/400" },
  { id: 4, name: "DEEPFLOW", type: "WebGL • AI", img: "https://picsum.photos/seed/deepflow/600/400" },
];

const WorkSection: React.FC = () => {
  return (
    <section id="work" className="relative w-full py-20 bg-[#0B0418] px-4 md:px-16 overflow-hidden z-20">
      
      {/* Heading */}
      <div className="mb-20 pt-10">
        <h2 className="text-6xl md:text-9xl font-display font-semibold uppercase text-white leading-[0.8]">
          Featured <br /> Work
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 w-full max-w-7xl mx-auto pb-20">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col group ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer shadow-xl border border-white/10">
               <img 
                 src={project.img} 
                 alt={project.name} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
               />
               <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <div className="bg-white rounded-full p-4 shadow-lg">
                    <ArrowUpRight size={32} className="text-black" />
                 </div>
               </div>
            </div>
            
            <div className="flex justify-between items-end mt-4 px-2 border-b border-white/20 pb-4">
                <div>
                   <h3 className="text-3xl font-display uppercase font-semibold text-white">{project.name}</h3>
                   <p className="text-sm font-sans font-medium text-gray-400">{project.type}</p>
                </div>
                <div className="text-xs font-sans border border-white/20 text-gray-400 px-2 py-1 rounded-full uppercase">
                  2023
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
 
export default WorkSection;