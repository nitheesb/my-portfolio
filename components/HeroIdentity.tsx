import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Scan, Fingerprint, Lock, ShieldCheck, Activity } from 'lucide-react';

const HeroIdentity: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position state for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for tilt
  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  // Map mouse position to rotation degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative flex justify-center items-center py-10 perspective-[1000px]">
        
      <motion.div
        ref={ref}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-[300px] h-[350px] sm:w-[350px] sm:h-[400px] md:w-[400px] md:h-[450px] bg-black/40 border border-gray-800 rounded-xl backdrop-blur-md group"
      >
        {/* --- CARD CONTENT LAYERS --- */}
        
        {/* 1. Holographic Border & Glow */}
        <div className="absolute inset-0 border border-primary/20 rounded-xl shadow-[0_0_30px_rgba(255,94,0,0.1)] group-hover:shadow-[0_0_50px_rgba(255,94,0,0.3)] transition-shadow duration-500 transform-style-3d"></div>
        
        {/* 2. Corner Brackets (HUD Style) */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/60 rounded-tl-lg"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/60 rounded-tr-lg"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/60 rounded-bl-lg"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/60 rounded-br-lg"></div>

        {/* 3. The Image Container */}
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[75%] overflow-hidden bg-gray-900 border border-gray-700"
            style={{ transform: "translateZ(20px) translate(-50%, -50%)" }}
        >
            <img 
                src="https://ca.slack-edge.com/T0DAXU939-U04TCM739QQ-9d709b5f8bd1-512" 
                alt="Nithees Balaji" 
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
            />
            
            {/* Image Overlay (Scanlines) */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,#000_3px)] bg-[size:100%_4px] opacity-20 pointer-events-none"></div>
            
            {/* Scanning Laser */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/80 shadow-[0_0_15px_#ff5e00] animate-[scan_4s_ease-in-out_infinite]"></div>
        </div>

        {/* 4. Floating UI Elements (Parallax) */}
        
        {/* Badge: ID Verified */}
        <div 
            className="absolute top-8 right-8 flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-3 py-1 rounded text-[10px] font-mono text-green-400"
            style={{ transform: "translateZ(40px)" }}
        >
            <ShieldCheck size={12} />
            <span>CLEARANCE: L5</span>
        </div>

        {/* Badge: Biometrics */}
        <div 
            className="absolute bottom-8 left-8 flex items-center gap-2 text-primary"
            style={{ transform: "translateZ(30px)" }}
        >
            <Fingerprint size={32} className="opacity-80 animate-pulse" />
        </div>

        {/* Floating Data Text */}
        <div 
             className="absolute bottom-8 right-8 text-right font-mono text-[9px] text-gray-500 leading-tight"
             style={{ transform: "translateZ(25px)" }}
        >
             <div>ID: NITHEES_B</div>
             <div>ROLE: ARCHITECT</div>
             <div>LOC: BANGKOK</div>
        </div>
        
        {/* Animated Reticle Center */}
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] border border-primary/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
             style={{ transform: "translateZ(50px) translate(-50%, -50%)" }}
        >
             <Scan size={40} className="text-primary/50" />
        </div>

      </motion.div>
      
      {/* Floor Reflection/Shadow */}
      <div className="absolute bottom-[-40px] w-[80%] h-[20px] bg-primary/20 blur-[50px] rounded-[100%]"></div>
    </div>
  );
};

export default HeroIdentity;