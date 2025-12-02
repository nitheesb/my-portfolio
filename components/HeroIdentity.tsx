
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Scan, MapPin, Mail, Phone, Github, QrCode } from 'lucide-react';

const MotionDiv = motion.div as any;

const HeroIdentity: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position state for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for tilt
  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  // Map mouse position to rotation degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]); // Subtle tilt
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

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
    <div className="relative flex justify-center items-center py-10 perspective-[1200px] z-50">
      
      <MotionDiv
        ref={ref}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-[340px] h-[550px] sm:w-[500px] sm:h-[300px] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] group border border-gray-200 select-none"
      >
        {/* --- CARD CONTENT --- */}
        <div className="absolute inset-0 rounded-xl overflow-hidden flex flex-col sm:flex-row bg-surface">
            
            {/* LEFT: PHOTO SECTION (Top on mobile, Left on desktop) */}
            <div className="w-full sm:w-[40%] h-[40%] sm:h-full relative overflow-hidden bg-gray-900 border-b sm:border-b-0 sm:border-r border-gray-100">
                <img 
                    src="/profile.png" 
                    onError={(e) => {
                        // Fallback to a professional placeholder if local file is missing
                        e.currentTarget.src = "https://ca.slack-edge.com/T0DAXU939-U04TCM739QQ-9d709b5f8bd1-512"; 
                    }}
                    alt="Nithees Balaji" 
                    className="w-full h-full object-cover filter grayscale-0 group-hover:grayscale contrast-110 transition-all duration-500"
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_10px_#ff5e00]"></div>
                
                {/* ID Badge on Image */}
                 <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-white/10 shadow-lg">
                    ID: NB_2025
                 </div>
            </div>

            {/* RIGHT: INFO SECTION */}
            <div className="w-full sm:w-[60%] h-[60%] sm:h-full p-6 flex flex-col justify-between relative bg-white">
                
                {/* Header */}
                <div className="relative z-10">
                    <h2 className="text-2xl font-display font-bold text-black tracking-tight uppercase leading-none">Nithees Balaji</h2>
                    <div className="text-primary font-mono text-xs font-bold tracking-widest uppercase mt-1">DevOps Architect</div>
                    <div className="h-0.5 w-8 bg-gray-200 mt-3 group-hover:w-full group-hover:bg-primary transition-all duration-500"></div>
                </div>

                {/* Tech Decor: Sim Chip */}
                <div className="flex items-center gap-6 my-2 opacity-100">
                    {/* Simulated SIM Chip */}
                    <div className="w-10 h-8 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-md border border-yellow-600 relative overflow-hidden shadow-inner flex-shrink-0">
                        <div className="absolute top-0 left-1/3 w-[1px] h-full bg-yellow-700/50"></div>
                        <div className="absolute top-0 right-1/3 w-[1px] h-full bg-yellow-700/50"></div>
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-yellow-700/50"></div>
                    </div>
                    
                    {/* Wireless Icon / NFC */}
                    <Scan size={24} className="text-gray-300 group-hover:text-primary transition-colors duration-300" />
                </div>

                {/* Contact Info */}
                <div className="space-y-2 relative z-10 mt-auto">
                     <div className="flex items-center gap-3 text-[11px] font-mono text-gray-500 font-bold group-hover:text-black transition-colors">
                        <MapPin size={12} className="flex-shrink-0 text-primary" />
                        <span>Sathorn, Bangkok, TH</span>
                     </div>
                     <div className="flex items-center gap-3 text-[11px] font-mono text-gray-500 font-bold group-hover:text-black transition-colors">
                        <Mail size={12} className="flex-shrink-0 text-primary" />
                        <span>nitheesbalaji@gmail.com</span>
                     </div>
                     <div className="flex items-center gap-3 text-[11px] font-mono text-gray-500 font-bold group-hover:text-black transition-colors">
                        <Phone size={12} className="flex-shrink-0 text-primary" />
                        <span>+66 6611 77370</span>
                     </div>
                     <div className="flex items-center gap-3 text-[11px] font-mono text-gray-500 font-bold group-hover:text-black transition-colors">
                        <Github size={12} className="flex-shrink-0 text-primary" />
                        <span>github.com/nitheesb</span>
                     </div>
                </div>

                {/* Barcode/QR Bottom Right */}
                 <div className="absolute bottom-6 right-6 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                    <QrCode size={48} className="text-black" />
                 </div>

                 {/* Background pattern */}
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
            </div>
        </div>

        {/* --- HOLOGRAPHIC EFFECTS --- */}
        {/* Border Glow */}
        <div 
            className="absolute -inset-[2px] rounded-xl bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ transform: "translateZ(-10px)" }}
        />
        
        {/* Floating holographic elements */}
        <div 
            className="absolute top-4 right-4 text-[9px] font-mono text-gray-300 font-bold tracking-widest group-hover:text-primary transition-colors"
             style={{ transform: "translateZ(20px)" }}
        >
            ACCESS_LEVEL_5
        </div>

      </MotionDiv>
      
      {/* Shadow */}
      <div className="absolute bottom-[-20px] w-[80%] h-[20px] bg-black/20 blur-[30px] rounded-[100%] transition-all duration-300 group-hover:w-[90%] group-hover:bg-primary/20 group-hover:blur-[40px]"></div>
    </div>
  );
};

export default HeroIdentity;
