import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const HeroHUD: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
      
      {/* 1. Cinematic Grid Floor - Dark lines for Light Mode */}
      <div 
        className="absolute bottom-[-10%] left-[-50%] w-[200%] h-[60%] opacity-10 bg-[linear-gradient(transparent_0%,rgba(0,0,0,0.4)_1px,transparent_2px),linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.4)_1px,transparent_2px)] bg-[size:50px_50px]"
        style={{ transform: 'perspective(1000px) rotateX(60deg)' }}
      />
      
      {/* 2. Top Bar - Telemetry */}
      <div className="absolute top-0 left-0 w-full h-16 border-b border-black/5 flex justify-between items-start px-4 md:px-8 py-2">
          <div className="flex gap-1">
             <div className="w-1 h-3 bg-primary/50"></div>
             <div className="w-1 h-2 bg-primary/30"></div>
             <div className="w-1 h-1 bg-primary/10"></div>
          </div>
          <div className="font-mono text-[10px] text-gray-400 tracking-[0.3em] hidden md:block">
              SYSTEM_MONITORING // V.2.0.4
          </div>
          <div className="flex gap-1">
             <div className="w-1 h-3 bg-black/50"></div>
             <div className="w-1 h-2 bg-black/30"></div>
             <div className="w-1 h-1 bg-black/10"></div>
          </div>
      </div>

      {/* 3. Corner Brackets */}
      {/* Top Left */}
      <div className="absolute top-24 left-4 md:top-32 md:left-12 w-8 h-8 md:w-12 md:h-12 border-t border-l border-primary/50 rounded-tl-sm opacity-60"></div>
      
      {/* Top Right */}
      <div className="absolute top-24 right-4 md:top-32 md:right-12 w-8 h-8 md:w-12 md:h-12 border-t border-r border-black/20 rounded-tr-sm opacity-60"></div>
      
      {/* Bottom Left */}
      <div className="absolute bottom-24 left-4 md:bottom-32 md:left-12 w-8 h-8 md:w-12 md:h-12 border-b border-l border-primary/50 rounded-bl-sm opacity-60"></div>
      
      {/* Bottom Right */}
      <div className="absolute bottom-24 right-4 md:bottom-32 md:right-12 w-8 h-8 md:w-12 md:h-12 border-b border-r border-black/20 rounded-br-sm opacity-60"></div>

      {/* 4. Side Data Columns */}
      <div className="absolute top-1/2 left-6 md:left-8 -translate-y-1/2 hidden lg:flex flex-col gap-2 opacity-60">
         {[...Array(6)].map((_, i) => (
             <div key={i} className="flex gap-2 items-center">
                 <div className="text-[8px] font-mono text-primary">0{i}</div>
                 <div className="w-8 h-[2px] bg-gray-200">
                    <MotionDiv 
                        className="h-full bg-primary" 
                        animate={{ width: ['0%', '100%', '40%'] }}
                        transition={{ duration: 2 + i, repeat: Infinity }}
                    />
                 </div>
             </div>
         ))}
      </div>

      {/* 5. Center Target Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-black/5 rounded-full opacity-40 pointer-events-none md:w-[600px] md:h-[600px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-dashed border-black/5 rounded-full opacity-40 pointer-events-none md:w-[400px] md:h-[400px] animate-[spin_60s_linear_infinite]"></div>

      {/* 6. Bottom Status Ticker */}
      <div className="absolute bottom-0 left-0 w-full bg-surface/80 backdrop-blur-sm border-t border-black/5 h-8 flex items-center overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-12 px-4">
            {[...Array(3)].map((_, i) => (
                <React.Fragment key={i}>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-gray-500">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span>SERVER_STATUS: <span className="text-black font-bold">ONLINE</span></span>
                    </div>
                    <div className="font-mono text-[10px] text-gray-500">
                        LATENCY: <span className="text-primary font-bold">24ms</span>
                    </div>
                    <div className="font-mono text-[10px] text-gray-500">
                        SECURITY_LEVEL: <span className="text-black font-bold">MAXIMUM</span>
                    </div>
                    <div className="font-mono text-[10px] text-gray-500">
                        ACTIVE_NODES: <span className="text-black font-bold">142</span>
                    </div>
                    <div className="text-primary/30">//</div>
                </React.Fragment>
            ))}
        </div>
      </div>

    </div>
  );
};

export default HeroHUD;