import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TelemetryHUD: React.FC = () => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [sessionTime, setSessionTime] = useState(0);
    const [fps, setFps] = useState(60);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const startTime = Date.now();
        const timer = setInterval(() => {
            setSessionTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        let lastTime = performance.now();
        let frames = 0;
        let fpsInterval: number;

        const measureFPS = () => {
            frames++;
            const currentTime = performance.now();

            if (currentTime >= lastTime + 1000) {
                setFps(Math.round((frames * 1000) / (currentTime - lastTime)));
                frames = 0;
                lastTime = currentTime;
            }

            fpsInterval = requestAnimationFrame(measureFPS);
        };

        fpsInterval = requestAnimationFrame(measureFPS);
        return () => cancelAnimationFrame(fpsInterval);
    }, []);

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <>
            {/* Top Left - Cursor Coordinates */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="fixed top-20 left-6 md:top-24 md:left-20 z-50 font-mono text-[10px] md:text-xs hidden md:block"
            >
                <div className="bg-black/40 backdrop-blur-sm border border-primary/30 px-3 py-2 rounded">
                    <div className="text-primary/60 mb-1">CURSOR_POS</div>
                    <div className="text-primary font-bold tabular-nums">
                        X: {cursorPos.x.toString().padStart(4, '0')} / Y: {cursorPos.y.toString().padStart(4, '0')}
                    </div>
                </div>
            </motion.div>

            {/* Top Right - System Status */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="fixed top-20 right-6 md:top-24 md:right-20 z-50 font-mono text-[10px] md:text-xs hidden md:block"
            >
                <div className="bg-black/40 backdrop-blur-sm border border-green-500/30 px-3 py-2 rounded">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-green-500 font-bold">SYSTEM_ONLINE</span>
                    </div>
                    <div className="text-green-500/60 mt-1 text-[9px]">ALL_ZONES_GREEN</div>
                </div>
            </motion.div>

            {/* Bottom Left - Session Timer */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="fixed bottom-20 left-6 md:bottom-8 md:left-20 z-50 font-mono text-[10px] md:text-xs hidden md:block"
            >
                <div className="bg-black/40 backdrop-blur-sm border border-primary/30 px-3 py-2 rounded">
                    <div className="text-primary/60 mb-1">SESSION_TIME</div>
                    <div className="text-primary font-bold tabular-nums text-lg">
                        {formatTime(sessionTime)}
                    </div>
                </div>
            </motion.div>

            {/* Bottom Right - FPS Counter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="fixed bottom-20 right-6 md:bottom-8 md:right-20 z-50 font-mono text-[10px] md:text-xs hidden md:block"
            >
                <div className="bg-black/40 backdrop-blur-sm border border-primary/30 px-3 py-2 rounded">
                    <div className="text-primary/60 mb-1">RENDER_FPS</div>
                    <div className={`font-bold tabular-nums text-lg ${fps >= 55 ? 'text-green-500' : fps >= 30 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {fps}
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default TelemetryHUD;
