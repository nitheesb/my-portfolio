import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { DOCK_ITEMS } from '../constants';

const FloatingDock: React.FC = () => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 hidden md:block">
      <motion.div 
        className="flex items-end gap-3 px-4 py-3 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {DOCK_ITEMS.map((item, index) => (
          <DockIcon key={index} mouseX={mouseX} item={item} />
        ))}
      </motion.div>
    </div>
  );
};

const DockIcon = ({ mouseX, item }: { mouseX: any, item: any }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer" : undefined}
      style={{ width }}
      className="aspect-square rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center relative group hover:bg-gray-100 hover:border-primary/30 transition-colors"
    >
      <item.icon className="w-1/2 h-1/2 text-gray-500 group-hover:text-primary transition-colors" />
      
      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-mono pointer-events-none whitespace-nowrap">
        {item.label}
      </span>
      
      {/* Active Dot indicator (optional logic could go here) */}
      {/* <div className="absolute -bottom-1 w-1 h-1 bg-gray-400 rounded-full"></div> */}
    </motion.a>
  );
};

export default FloatingDock;