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
    <section className="py-10 border-y border-border bg-white/50 backdrop-blur-sm relative z-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          
          {/* Label */}
          <div className="flex items-center gap-3 md:w-1/5">
             <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#ff5e00]"></div>
             <span className="font-mono text-xs text-primary tracking-[0.2em] font-bold">LIVE_TELEMETRY</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 w-full md:w-4/5">
              {stats.map((stat, i) => (
                  <MotionDiv 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`relative p-4 border-l-2 ${stat.border} bg-gradient-to-r from-gray-50 to-transparent`}
                  >
                      <span className={`block text-3xl md:text-4xl font-bold font-display ${stat.color} mb-1`}>{stat.val}</span>
                      <span className="text-[10px] md:text-xs font-mono text-gray-500 block tracking-widest uppercase font-semibold">{stat.label}</span>
                  </MotionDiv>
              ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsSection;