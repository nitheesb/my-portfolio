import React from 'react';
import { motion } from 'framer-motion';

const HeroHUD: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      
      {/* Perspective Grid Floor */}
      <div 
        className="absolute bottom-[-20%] left-[-50%] w-[200%] h-[50%] bg-[linear-gradient(transparent_0%,rgba(255,94,0,0.1)_1px,transparent_2px),linear-gradient(90deg,transparent_0%,rgba(255,94,0,0.1)_1px,transparent_2px)] bg-[size:40px_40px]"
        style={{ transform: 'perspective(500px) rotateX(60deg)' }}
      />
      
      {/* Top Left Reticle */}
      <div className="absolute top-10 left-6 md:left-10 w-16 h-16 border-t-2 border-l-2 border-primary/40 rounded-tl-lg">
        <div className="absolute top-0 right-0 w-2 h-2 bg-primary/40" />
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-primary/40" />
        <div className="absolute top-4 left-4 text-[10px] font-mono text-primary/60">
            TARGET: VISITOR<br/>
            IP: TRACKING...
        </div>
      </div>

      {/* Top Right Reticle */}
      <div className="absolute top-10 right-6 md:right-10 w-16 h-16 border-t-2 border-r-2 border-secondary/40 rounded-tr-lg">
        <div className="absolute top-0 left-0 w-2 h-2 bg-secondary/40" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-secondary/40" />
      </div>

      {/* Bottom Left Reticle */}
      <div className="absolute bottom-20 left-6 md:left-10 w-16 h-16 border-b-2 border-l-2 border-primary/40 rounded-bl-lg">
        <div className="absolute top-0 left-0 w-2 h-2 bg-primary/40" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary/40" />
      </div>

      {/* Bottom Right Reticle */}
      <div className="absolute bottom-20 right-6 md:right-10 w-16 h-16 border-b-2 border-r-2 border-secondary/40 rounded-br-lg">
        <div className="absolute top-0 right-0 w-2 h-2 bg-secondary/40" />
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-secondary/40" />
      </div>

      {/* Vertical Scan Line */}
      <motion.div 
        className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"
        animate={{ left: ['0%', '100%', '0%'] }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
      />

      {/* Bottom Ticker Tape */}
      <div className="absolute bottom-0 w-full bg-black/80 border-t border-primary/20 py-1 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-8">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-8 font-mono text-[10px] text-primary/60">
                    <span>SYSTEM_STATUS: <span className="text-green-500">OPTIMAL</span></span>
                    <span>///</span>
                    <span>CLUSTER_HEALTH: <span className="text-green-500">99.99%</span></span>
                    <span>///</span>
                    <span>SECURITY_PROTOCOL: <span className="text-secondary">ENFORCED</span></span>
                    <span>///</span>
                    <span>LATENCY: <span className="text-white">24ms</span></span>
                    <span>///</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HeroHUD;