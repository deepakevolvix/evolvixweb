import React, { useRef } from 'react';
import { useScroll, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const ScrollProgress: React.FC = () => {
  const scroll = useScroll();
  const indicatorRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (indicatorRef.current) {
      // Move the indicator based on scroll offset (0 to 1)
      const offset = scroll.offset;
      // Map 0-1 offset to the available height of the bar (approx 80-85% to keep pill inside)
      // The pill is h-16 (4rem), bar is h-64 (16rem) or taller. 
      // Let's use percentage height for the pill to be responsive.
      indicatorRef.current.style.top = `${offset * 80}%`;
    }
  });

  return (
    <Html fullscreen style={{ pointerEvents: 'none', zIndex: 40 }}>
      {/* 
         Scroll Viewer:
         Fixed at Right Center.
         Visual: Thin gray track, thicker or same width black pill.
      */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 h-96 w-[2px] bg-gray-300 rounded-full hidden md:block overflow-visible">
        <div 
          ref={indicatorRef}
          className="absolute left-1/2 -translate-x-1/2 w-[6px] h-[20%] bg-black rounded-full shadow-sm transition-all duration-75 ease-linear will-change-transform"
          style={{ top: '0%' }}
        />
      </div>
    </Html>
  );
};

export default ScrollProgress;