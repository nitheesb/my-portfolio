import React, { useState, useEffect, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  hover?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?";

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className = "", hover = true }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
      }

      iteration += 1 / 2; // Speed of decoding
    }, 30);
  };

  useEffect(() => {
    // Initial scramble on mount
    scramble();
    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, []);

  return (
    <span 
      className={`inline-block ${className}`}
      onMouseEnter={hover ? scramble : undefined}
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;