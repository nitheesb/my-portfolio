import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { MapPin, Mail, Github, Linkedin, ShieldCheck, Terminal } from 'lucide-react';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

const HeroIdentity: React.FC = () => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const { playHover, playClick } = useAudioFeedback();
  const ref = useRef<HTMLDivElement>(null);

  // Trigger scan animation on load
  useEffect(() => {
    if (isImgLoaded) {
      setTimeout(() => setIsScanned(true), 500);
    }
  }, [isImgLoaded]);

  // --- 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]); 
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = (e.clientX - rect.left) / width - 0.5;
    const mouseYFromCenter = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseXFromCenter);
    y.set(mouseYFromCenter);
    playHover();
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative w-full z-50 perspective-[1200px]" style={{ perspective: 1200 }}>
      <div className="absolute -top-6 -right-6 w-32 h-32 border-r border-t border-primary/20 rounded-tr-3xl" aria-hidden="true"></div>
      <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-primary/20 rounded-bl-3xl" aria-hidden="true"></div>

      <motion.div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white border border-gray-200 shadow-2xl overflow-hidden max-w-full transform-gpu cursor-none md:cursor-auto"
        aria-label="Identity Card of Nithees Balaji Mohan"
      >
        <motion.div 
            className="absolute inset-0 z-50 pointer-events-none mix-blend-overlay opacity-30"
            style={{ background: glareBackground }}
        />

        <div className="bg-[#f4f4f5] border-b border-gray-200 px-4 py-2 md:px-6 md:py-3 flex justify-between items-center relative z-10">
            <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            </div>
            <div className="font-mono text-[9px] md:text-[10px] text-gray-400 font-bold tracking-widest uppercase flex items-center gap-2">
                <ShieldCheck size={12} className="text-primary" />
                {isScanned ? 'ID_VERIFIED // SECURE_ACCESS' : 'INITIALIZING_VERIFICATION...'}
            </div>
        </div>

        <div className="flex flex-col sm:flex-row h-full relative z-10 bg-white">
            <div className="w-full sm:w-[180px] md:w-[200px] relative overflow-hidden group border-b sm:border-b-0 sm:border-r border-gray-200 bg-gray-100">
                <div className="aspect-[1/1] sm:aspect-auto sm:h-full relative">
                    {!isImgLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                        <span className="text-[8px] font-mono text-primary font-bold animate-pulse">ENCRYPTED_IMAGE...</span>
                    </div>
                    )}

                    <img 
                    src="https://i.ibb.co/mCwSdtvZ/profile.png" 
                    onLoad={() => setIsImgLoaded(true)}
                    alt="Portrait of Nithees Balaji Mohan, Senior DevOps Architect" 
                    className={`w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-500 ${!isImgLoaded ? 'opacity-0' : 'opacity-100'}`}
                    />

                    {/* Laser Scan Line */}
                    {isImgLoaded && (
                      <motion.div 
                        initial={{ top: '0%' }}
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 w-full h-[2px] bg-primary shadow-[0_0_15px_#ff5e00] z-20 pointer-events-none opacity-80"
                      />
                    )}
                    
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none z-10"></div>
                </div>
            </div>

            <div className="flex-1 p-5 md:p-6 flex flex-col justify-between min-h-[200px]">
                <div>
                    <h1 className="text-xl md:text-2xl font-display font-bold text-black leading-none mb-1">NITHEES BALAJI MOHAN</h1>
                    <div className="text-[9px] md:text-[10px] font-mono text-primary font-bold tracking-wider mb-4 md:mb-6">SENIOR DEVOPS ARCHITECT</div>

                    <div className="space-y-3 md:space-y-4">
                        <InfoRow icon={MapPin} label="LOC" value="Bangkok, TH" />
                        <InfoRow icon={Mail} label="MSG" value="nitheesbalaji@gmail.com" />
                        <InfoRow icon={Terminal} label="SYS" value="GCP / AWS / K8s" />
                    </div>
                </div>

                <div className="flex gap-2 mt-6 pt-4 md:pt-6 border-t border-gray-100">
                    <SocialBtn icon={Github} href="https://github.com/nitheesb" title="View Github Profile" onClick={playClick} />
                    <SocialBtn icon={Linkedin} href="https://www.linkedin.com/in/nithees-balaji" title="Connect on LinkedIn" onClick={playClick} />
                    <div className="flex-1 flex items-center justify-end">
                        <div className="w-14 md:w-16 h-8 bg-black flex items-center justify-center">
                            <span className="text-white font-display font-bold text-xs tracking-widest">NBM.IO</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-center gap-3">
        <Icon size={14} className="text-gray-400" aria-hidden="true" />
        <div className="flex flex-col">
            <span className="text-[9px] text-gray-400 font-mono font-bold leading-none">{label}</span>
            <span className="text-[11px] md:text-xs text-black font-bold font-mono leading-none mt-1 break-all">{value}</span>
        </div>
    </div>
);

const SocialBtn = ({ icon: Icon, href, title, onClick }: { icon: any, href: string, title: string, onClick?: () => void }) => (
    <a 
        href={href} 
        target="_blank" 
        title={title}
        aria-label={title}
        rel="noopener noreferrer"
        onClick={onClick}
        className="w-8 h-8 flex items-center justify-center text-black border border-black hover:bg-black hover:text-white transition-all duration-300"
    >
        <Icon size={14} aria-hidden="true" />
    </a>
);

export default HeroIdentity;