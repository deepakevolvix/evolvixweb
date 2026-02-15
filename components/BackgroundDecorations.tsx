import React from 'react';
import AnimatedHexGrid from './AnimatedHexGrid';

const BackgroundDecorations: React.FC = () => {
  return (
    <div className="w-full relative">
      
      {/* --- HERO SECTION DECORATIONS (0 - 100vh) --- */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
        <div className="absolute left-[-2rem] bottom-10 opacity-40">
           <AnimatedHexGrid rows={4} cols={3} className="transform rotate-12" />
        </div>
      </div>

      {/* --- SERVICES SECTION DECORATIONS (approx 160vh - 260vh) --- 
          Services section follows Hero (100vh) + Title (60vh) = starts at 160vh
      */}
      <div className="absolute top-[160vh] left-0 w-full h-screen overflow-hidden pointer-events-none">
         {/* Hex Grids */}
         <div className="absolute left-[-2rem] top-1/4 opacity-30">
             <AnimatedHexGrid rows={4} cols={3} className="transform rotate-0" />
         </div>
         <div className="absolute right-[-2rem] bottom-1/4 opacity-30">
             <AnimatedHexGrid rows={3} cols={3} className="transform -rotate-12" />
         </div>

         {/* Grid Lines */}
         <div className="absolute inset-0">
             <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-black/10" />
             <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1px] bg-black/10" />
             <div className="absolute bottom-0 w-full h-[1px] bg-black/10" />
         </div>
      </div>

      {/* --- PROCESS SECTION DECORATIONS (approx 260vh - 360vh) --- */}
      <div className="absolute top-[260vh] left-0 w-full h-screen overflow-hidden pointer-events-none">
        <div className="absolute left-[-2rem] bottom-10 md:bottom-1/4 opacity-60">
          <AnimatedHexGrid rows={4} cols={3} className="transform rotate-12" />
        </div>
        <div className="absolute right-[-2rem] top-10 md:top-1/4 opacity-60">
          <AnimatedHexGrid rows={4} cols={3} className="transform -rotate-12" />
        </div>
      </div>

    </div>
  );
};

export default BackgroundDecorations;