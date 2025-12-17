
import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const StatsSection: React.FC = () => {
  const stats = [
    { val: "18%", label: "COST REDUCTION", color: "text-black", border: "border-black/10" },
    { val: "99.99%", label: "UPTIME (GKE)", color: "text-primary", border: "border-primary/30" },
    { val: "-60%", label: "DEPLOY ERRORS", color: "text-green-600", border: "border-green-500/30" },
    { val: "9+", label: "YEARS EXP", color: "text-black", border: "border-black/10" },
  ];

  return (
    <section className="py-6 md:py-8 w-full">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col xl:flex-row items-center gap-6 md:gap-12">
          
          {/* Label */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">
             <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#ff5e00]"></div>
             <span className="font-mono text-xs text-primary tracking-[0.2em] font-bold">LIVE_TELEMETRY</span>
          </div>

          {/* Stats Grid */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                  <MotionDiv 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      className={`relative pl-4 border-l-2 ${stat.border} flex flex-col justify-center`}
                  >
                      <span className={`block text-2xl md:text-3xl font-bold font-display ${stat.color} mb-0.5`}>{stat.val}</span>
                      <span className="text-[9px] md:text-[10px] font-mono text-gray-500 block tracking-widest uppercase font-semibold">{stat.label}</span>
                  </MotionDiv>
              ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsSection;
