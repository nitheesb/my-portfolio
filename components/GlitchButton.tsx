import React from 'react';
import MagneticWrapper from './MagneticWrapper';

interface GlitchButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const GlitchButton: React.FC<GlitchButtonProps> = ({ text, href, onClick, className = "", icon }) => {
  const content = (
    <MagneticWrapper className="inline-block" strength={0.2}>
      <div className={`relative group inline-block font-mono font-bold text-lg bg-primary text-black px-8 py-4 overflow-hidden ${className}`}>
        <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-200">
          {icon}
          {text}
        </span>

        {/* Glitch Layers */}
        <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-20 mix-blend-difference">
          <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center translate-x-[2px] text-red-500 opacity-50 animate-glitch">
            {text}
          </span>
          <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center translate-x-[-2px] text-blue-500 opacity-50 animate-glitch" style={{ animationDirection: 'reverse' }}>
            {text}
          </span>
        </div>
      </div>
    </MagneticWrapper>
  );

  if (href) {
    return <a href={href} className="inline-block">{content}</a>;
  }

  return <button onClick={onClick} className="inline-block">{content}</button>;
};

export default GlitchButton;