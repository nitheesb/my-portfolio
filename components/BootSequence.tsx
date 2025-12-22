import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
    onComplete: () => void;
}

const BOOT_LOGS = [
    "BIOS_DATE: 12/22/2077 14:02:35 VER: 4.02.1B",
    "CPU: NEURAL_ENGINE_X9 @ 420.0 GHz",
    "DETECTING PRIMARY MASTER ... NITHEES_CORE [OK]",
    "LOADING KERNEL IMAGE ... [OK]",
    "INITIALIZING SYSTEM ... [OK]",
    "USER_IDENTITY: NITHEES_BALAJI_MOHAN",
    "ROLE: SENIOR_DEVOPS_ARCHITECT",
    "SYSTEM READY."
];

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
    const [lines, setLines] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        let currentIndex = 0;
        let timeout: ReturnType<typeof setTimeout>;

        const addLine = () => {
            if (currentIndex < BOOT_LOGS.length && BOOT_LOGS[currentIndex]) {
                setLines(prev => [...prev, BOOT_LOGS[currentIndex]]);
                currentIndex++;

                const delay = Math.random() * 50 + 20;
                timeout = setTimeout(addLine, delay);
            } else if (currentIndex >= BOOT_LOGS.length) {
                setTimeout(() => {
                    if (onCompleteRef.current) {
                        onCompleteRef.current();
                    }
                }, 300);
            }
        };

        timeout = setTimeout(addLine, 200);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <div className="fixed inset-0 bg-black z-[9999] p-6 md:p-12 font-mono text-sm md:text-base overflow-hidden flex flex-col cursor-none">
            <div className="flex-grow overflow-y-auto custom-scrollbar-hide" ref={scrollRef}>
                {lines.filter(Boolean).map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.1 }}
                        className="mb-1"
                    >
                        <span className="text-gray-500 mr-2">
                            [{new Date().toLocaleTimeString('en-US', { hour12: false })}]
                        </span>
                        <span className={line.includes("ERROR") ? "text-red-500" : line.includes("WARN") ? "text-yellow-500" : "text-green-500"}>
                            {line}
                        </span>
                    </motion.div>
                ))}
            </div>

            <div className="mt-4 border-t border-green-900/30 pt-4 flex justify-between items-end text-[10px] text-gray-600 tracking-widest uppercase">
                <div>Memory: 64TB OK</div>
                <div className="animate-pulse">_CURSOR_LOCKED</div>
            </div>
        </div>
    );
};

export default BootSequence;
