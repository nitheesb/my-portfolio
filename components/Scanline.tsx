import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Scanline: React.FC = () => {
    const { scrollY } = useScroll();

    // Parallax effect - scanline moves slower than content
    const y = useTransform(scrollY, [0, 1000], [0, 300]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            <motion.div
                className="w-full h-[150px] bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30"
                style={{ y }}
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
