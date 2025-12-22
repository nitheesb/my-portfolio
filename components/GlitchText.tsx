import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'span';
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', as: Component = 'span' }) => {
    const [isGlitching, setIsGlitching] = useState(false);

    const handleMouseEnter = () => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 500);
    };

    return (
        <Component
            className={`relative inline-block ${className} cursor-default`}
            onMouseEnter={handleMouseEnter}
        >
            <motion.span
                className="relative z-10"
                animate={isGlitching ? {
                    x: [0, -2, 2, -1, 1, 0],
                    y: [0, 1, -1, 2, -2, 0],
                } : {}}
                transition={{ duration: 0.3, repeat: isGlitching ? 2 : 0 }}
            >
                {text}
            </motion.span>

            {/* Chromatic aberration layers */}
            {isGlitching && (
                <>
                    <motion.span
                        className="absolute top-0 left-0 z-0 text-red-500 mix-blend-screen"
                        initial={{ opacity: 0, x: 0 }}
                        animate={{ opacity: 0.7, x: -3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        aria-hidden="true"
                    >
                        {text}
                    </motion.span>
                    <motion.span
                        className="absolute top-0 left-0 z-0 text-cyan-500 mix-blend-screen"
                        initial={{ opacity: 0, x: 0 }}
                        animate={{ opacity: 0.7, x: 3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        aria-hidden="true"
                    >
                        {text}
                    </motion.span>
                    <motion.span
                        className="absolute top-0 left-0 z-0 text-green-500 mix-blend-screen"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 0.5, y: 2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        aria-hidden="true"
                    >
                        {text}
                    </motion.span>
                </>
            )}
        </Component>
    );
};

export default GlitchText;
