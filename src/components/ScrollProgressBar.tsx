import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smooth out scrolling with a spring physics simulation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[3px] bg-transparent">
      <motion.div
        style={{ scaleX }}
        className="w-full h-full origin-left bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 shadow-[0_0_10px_rgba(6,182,212,0.7),0_0_20px_rgba(99,102,241,0.4)]"
      />
    </div>
  );
};
