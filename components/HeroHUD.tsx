
import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const HeroHUD: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
      
      {/* 1. MOVING GRID FLOOR */}
      <div className="absolute bottom-0 left-0 w-full h-[40%] overflow-hidden opacity-20">
          <div 
            className="w-[200%] h-[200%] absolute -left-[50%] -top-[50%]"
            style={{ 
                background: `
                    linear-gradient(transparent 0%, rgba(0,0,0,0.4) 1px, transparent 2px),
                    linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 1px, transparent 2px)
                `,
                backgroundSize: '60px 60px',
                transform: 'perspective(500px) rotateX(60deg) translateY(0)',
                animation: 'grid-move 20s linear infinite'
            }}
          ></div>
          {/* Fading mask for the floor */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg"></div>
      </div>

      {/* 2. REACTOR CORE (Background Ring) */}
      <div className="absolute top-1/2 right-[-10%] md:right-[0%] -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.03] pointer-events-none z-0">
          {/* Ring 1 */}
          <div className="absolute inset-0 border-[40px] border-dashed border-black rounded-full animate-[spin_120s_linear_infinite]"></div>
          {/* Ring 2 */}
          <div className="absolute inset-[100px] border border-black rounded-full animate-[spin_60s_linear_infinite_reverse]"></div>
          {/* Ring 3 */}
          <div className="absolute inset-[150px] border-[2px] border-dotted border-black rounded-full animate-[spin_40s_linear_infinite]"></div>
          
          {/* Crosshair Overlay */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/20"></div>
          <div className="absolute top-0 left-1/2 h-full w-[1px] bg-black/20"></div>
      </div>
      
      {/* 3. Top Bar - Telemetry */}
      <div className="absolute top-0 left-0 w-full h-24 flex justify-between items-start px-4 md:px-8 py-6 z-10">
          <div className="flex gap-2">
             <MotionDiv 
                animate={{ height: [10, 20, 10] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 bg-primary/50" 
             />
             <MotionDiv 
                animate={{ height: [20, 10, 20] }} 
                transition={{ duration: 3, repeat: Infinity }}
                className="w-1 bg-primary/30" 
             />
          </div>
          
          <div className="hidden md:flex flex-col items-end">
              <div className="font-mono text-[10px] text-gray-400 tracking-[0.3em] mb-1">
                  SYSTEM_MONITORING // V.2.0.4
              </div>
              <div className="flex gap-1">
                 <div className="w-12 h-1 bg-green-500/20">
                    <MotionDiv animate={{ width: "100%" }} initial={{ width: "0%" }} transition={{ duration: 1, repeat: Infinity }} className="h-full bg-green-500" />
                 </div>
              </div>
          </div>
      </div>

      {/* 4. Side Data Columns */}
      <div className="absolute top-1/2 left-6 md:left-8 -translate-y-1/2 hidden lg:flex flex-col gap-2 opacity-60">
         {[...Array(6)].map((_, i) => (
             <div key={i} className="flex gap-2 items-center">
                 <div className="text-[8px] font-mono text-primary">0{i}</div>
                 <div className="w-8 h-[1px] bg-gray-200 overflow-hidden">
                    <MotionDiv 
                        className="h-full bg-primary" 
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2 + i, repeat: Infinity, ease: "linear" }}
                    />
                 </div>
             </div>
         ))}
      </div>

      {/* 5. Bottom Status Ticker */}
      <div className="absolute bottom-0 left-0 w-full bg-surface/80 backdrop-blur-sm border-t border-black/5 h-10 flex items-center overflow-hidden z-20">
        <div className="flex animate-marquee whitespace-nowrap gap-12 px-4">
            {[...Array(4)].map((_, i) => (
                <React.Fragment key={i}>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-gray-500">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        <span>NET_STATUS: <span className="text-black font-bold">OPTIMAL</span></span>
                    </div>
                    <div className="font-mono text-[10px] text-gray-500">
                        CLUSTER_HEALTH: <span className="text-primary font-bold">99.9%</span>
                    </div>
                     <div className="font-mono text-[10px] text-gray-500">
                        ACTIVE_PODS: <span className="text-black font-bold">342</span>
                    </div>
                    <div className="text-primary/30 text-lg">/</div>
                </React.Fragment>
            ))}
        </div>
      </div>

      {/* Grid Animation Keyframes (Injected style since we can't edit tailwind config easily) */}
      <style>{`
        @keyframes grid-move {
            0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
            100% { transform: perspective(500px) rotateX(60deg) translateY(60px); }
        }
      `}</style>

    </div>
  );
};

export default HeroHUD;
