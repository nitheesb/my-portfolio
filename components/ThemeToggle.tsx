import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Eye } from 'lucide-react';
import { useTheme } from '../contexts/ThemeProvider';
import { useAudio } from './AudioProvider';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { playClick } = useAudio();

    const handleToggle = () => {
        playClick();
        toggleTheme();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="fixed top-6 left-6 md:top-8 md:left-8 z-[100]"
        >
            <button
                onClick={handleToggle}
                aria-label={`Switch to ${theme === 'overdrive' ? 'Stealth' : 'Overdrive'} mode`}
                className="group relative bg-black/50 backdrop-blur-sm border-2 border-primary px-4 py-2 rounded-full flex items-center gap-2 hover:bg-primary/10 transition-all duration-300"
            >
                <motion.div
                    animate={{ rotate: theme === 'overdrive' ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                >
                    {theme === 'overdrive' ? (
                        <Zap size={18} className="text-primary" />
                    ) : (
                        <Eye size={18} className="text-primary" />
                    )}
                </motion.div>

                <span className="font-mono text-xs font-bold text-primary tracking-wider hidden md:inline">
                    {theme === 'overdrive' ? 'OVERDRIVE' : 'STEALTH'}
                </span>

                {/* Indicator */}
                <div className="absolute -right-1 -top-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            </button>
        </motion.div>
    );
};

export default ThemeToggle;
