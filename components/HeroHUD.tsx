import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Zap } from 'lucide-react';

const HeroHUD = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(now.toISOString().split('T')[1].split('.')[0]);
        };
        const timer = setInterval(update, 1000);
        update();
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden select-none z-10 hidden md:block">

            {/* Top Left: System Status */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute top-8 left-8 flex gap-4 text-[10px] text-gray-500 font-mono tracking-widest uppercase"
            >
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                    <span>System_Online</span>
                </div>
                <div>// BKK_REGION</div>
            </motion.div>

            {/* Top Right: Clock */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute top-8 right-8 text-[10px] text-[#ff5e00] font-mono tracking-widest border border-[#ff5e00]/20 px-3 py-1 bg-[#ff5e00]/5 rounded"
            >
                T_{time}
            </motion.div>

            {/* Decorations: Corner Brackets */}
            <div className="absolute inset-8 border border-white/5 opacity-50 rounded-3xl pointer-events-none"></div>

            {/* Bottom Left: Passive Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-8 flex flex-col gap-2 font-mono text-[9px] text-gray-600"
            >
                <div className="flex items-center gap-2">
                    <Globe size={12} className="text-[#ff5e00]/50" />
                    <span>TRAFFIC: NORMAL</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users size={12} className="text-[#ff5e00]/50" />
                    <span>VISITORS: ACTIVE</span>
                </div>
            </motion.div>

            {/* Bottom Right: Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="absolute bottom-8 right-8 flex items-center gap-2"
            >
                <div className="w-20 h-[1px] bg-gradient-to-l from-[#ff5e00] to-transparent"></div>
                <span className="font-mono text-[10px] text-[#ff5e00] tracking-widest">V2.0.4.BETA</span>
            </motion.div>
        </div>
    );
};

export default HeroHUD;
