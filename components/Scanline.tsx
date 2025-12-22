import React from 'react';
import { motion } from 'framer-motion';

const Scanline: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            <motion.div
                className="w-full h-[150px] bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30"
                initial={{ top: -200 }}
                animate={{ top: "120%" }}
                transition={{
                    duration: 8,
                    ease: "linear",
                    repeat: Infinity,
                    repeatDelay: 0
                }}
            />
        </div>
    );
};

export default Scanline;
