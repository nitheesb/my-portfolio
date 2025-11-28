import React from 'react';
import { TECH_STACK } from '../constants';

const TechStack: React.FC = () => {
  return (
    <div className="py-10 bg-surface border-y border-border overflow-hidden relative">
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-bg via-transparent to-bg"></div>
      
      <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
        {[...TECH_STACK, ...TECH_STACK].map((tech, index) => (
          <span 
            key={index} 
            className="text-3xl md:text-5xl font-display font-bold text-transparent"
            style={{ WebkitTextStroke: '1px #333' }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechStack;