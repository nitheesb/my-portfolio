import React from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none"
        >
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#ff5e00] to-transparent animate-pulse" />

            <div className="flex flex-col items-center gap-1">
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#ff5e00]">SCROLL</span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 bg-[#ff5e00] rounded-full shadow-[0_0_10px_#ff5e00]"
                />
            </div>
        </motion.div>
    );
};

export default ScrollIndicator;
