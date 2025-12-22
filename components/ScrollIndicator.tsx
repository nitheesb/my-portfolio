import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollIndicator: React.FC = () => {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 200], [1, 0]);
    const y = useTransform(scrollY, [0, 200], [0, 20]);

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none mix-blend-difference text-white"
        >
            <span className="text-[10px] font-mono tracking-[0.2em] font-bold uppercase opacity-60">
                Scroll to Explore
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-40 overflow-hidden">
                <motion.div
                    className="w-full h-1/2 bg-white"
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
            </div>
        </motion.div>
    );
};

export default ScrollIndicator;
