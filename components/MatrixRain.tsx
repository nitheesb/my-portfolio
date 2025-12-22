import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MatrixRainProps {
    isActive: boolean;
    onClose: () => void;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ isActive, onClose }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!isActive) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops: number[] = Array(columns).fill(1);

        let animationId: number;

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }

            animationId = requestAnimationFrame(draw);
        };

        draw();

        // Auto-close after 10 seconds
        const timer = setTimeout(() => {
            onClose();
        }, 10000);

        return () => {
            cancelAnimationFrame(animationId);
            clearTimeout(timer);
        };
    }, [isActive, onClose]);

    if (!isActive) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black"
            >
                <canvas ref={canvasRef} className="w-full h-full" />

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 bg-black/50 border border-green-500 text-green-500 w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-500/20 transition-all"
                    aria-label="Close Matrix Effect"
                >
                    <X size={20} />
                </button>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-green-500 text-sm animate-pulse">
                    Press ESC or click X to exit
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MatrixRain;
