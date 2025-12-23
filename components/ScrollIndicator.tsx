import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
            <span className="font-mono text-[10px] font-bold tracking-widest text-gray-500">
                SCROLL TO EXPLORE
            </span>

            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative"
            >
                {/* Outer glow ring */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 border-2 border-primary rounded-full"
                />

                {/* Main circle */}
                <div className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center bg-white/50 backdrop-blur-sm">
                    <ChevronDown size={16} className="text-primary" />
                </div>
            </motion.div>

            {/* Vertical line indicator */}
            <div className="w-[2px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
    );
}
