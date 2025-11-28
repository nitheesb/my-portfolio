import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { COST_DATA } from '../constants';
import { motion } from 'framer-motion';

const StatsSection: React.FC = () => {
  return (
    <section className="py-20 border-y border-border bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Counters */}
            <div className="grid grid-cols-2 gap-8">
                {[
                    { val: "18%", label: "COST REDUCTION", color: "text-secondary" },
                    { val: "99.9%", label: "UPTIME (GKE)", color: "text-primary" },
                    { val: "-60%", label: "DEPLOY ERRORS", color: "text-white" },
                    { val: "9+", label: "YEARS EXP", color: "text-gray-400" },
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="text-center p-6 border border-border bg-black/40"
                    >
                        <span className={`block text-4xl md:text-5xl font-bold font-display ${stat.color}`}>{stat.val}</span>
                        <span className="text-xs font-mono text-gray-500 mt-2 block tracking-widest">{stat.label}</span>
                    </motion.div>
                ))}
            </div>

            {/* Right: Chart */}
            <div className="h-[300px] w-full bg-black/20 border border-border p-4 rounded-lg relative">
                <div className="absolute top-4 left-6 z-10">
                    <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-1">// CLOUD_SPEND_OPTIMIZATION</h3>
                    <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                         <span className="text-xs text-primary">LIVE MONITORING</span>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={COST_DATA}>
                        <defs>
                            <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff5e00" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#ff5e00" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#333" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis hide />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
                            itemStyle={{ color: '#ff5e00' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="cost" 
                            stroke="#ff5e00" 
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill="url(#colorCost)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;