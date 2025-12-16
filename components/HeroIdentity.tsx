
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Github, Linkedin, ShieldCheck, Activity, Terminal } from 'lucide-react';

const MotionDiv = motion.div as any;

const HeroIdentity: React.FC = () => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <div className="relative w-full max-w-[550px] mx-auto z-50">
      
      {/* --- BACKDROP GLOW --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>

      {/* --- MAIN CARD CONTAINER --- */}
      <MotionDiv 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
      >
        
        {/* --- SCANNER BAR EFFECT --- */}
        <MotionDiv 
            className="absolute top-0 left-0 w-full h-[2px] bg-primary/50 shadow-[0_0_15px_#ff5e00] z-20 pointer-events-none"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        />
        <MotionDiv 
            className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-primary/10 to-transparent z-10 pointer-events-none"
            animate={{ top: ["-10%", "90%", "-10%"] }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        />

        {/* --- HEADER BAR --- */}
        <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            </div>
            <div className="font-mono text-[10px] text-gray-400 font-bold tracking-widest uppercase flex items-center gap-2">
                <ShieldCheck size={12} className="text-primary" />
                SECURE_IDENTITY_V3
            </div>
        </div>

        {/* --- CONTENT BODY --- */}
        <div className="p-1">
            <div className="flex flex-col sm:flex-row h-full">
                
                {/* PHOTO SECTION */}
                {/* 
                   Responsive Radius Logic:
                   - Mobile: rounded-t-xl
                   - Desktop (sm): rounded-l-xl
                   Adjusted width to 180px on desktop to give more room for text
                */}
                <div className="w-full sm:w-[180px] h-[250px] sm:h-auto relative overflow-hidden rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none group flex-shrink-0">
                    
                     {/* Loading Placeholder */}
                     {!isImgLoaded && (
                        <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center z-20">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                            <span className="text-[8px] font-mono text-primary font-bold animate-pulse">LOADING...</span>
                        </div>
                     )}

                     <img 
                        src="https://i.ibb.co/mCwSdtvZ/profile.png" 
                        onLoad={() => setIsImgLoaded(true)}
                        loading="eager"
                        // @ts-ignore
                        fetchPriority="high"
                        onError={(e) => {
                            e.currentTarget.src = "https://ca.slack-edge.com/T0DAXU939-U04TCM739QQ-9d709b5f8bd1-512"; 
                        }}
                        alt="Nithees Balaji" 
                        className={`w-full h-full object-cover filter contrast-110 transition-all duration-700 ${!isImgLoaded ? 'opacity-0' : 'opacity-100'}`}
                    />
                    {/* Image Overlay Texture */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="text-[9px] text-white/70 font-mono">STATUS</span>
                            <span className="text-[10px] text-green-400 font-bold font-mono flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                ONLINE
                            </span>
                        </div>
                    </div>
                </div>

                {/* DETAILS SECTION */}
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-center bg-white rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none min-h-[250px] sm:min-h-0">
                    
                    <div className="mb-6">
                        <h2 className="text-2xl font-display font-bold text-gray-900 leading-none mb-1">NITHEES BALAJI</h2>
                        <div className="text-xs font-mono text-primary font-bold tracking-wider mb-3">SENIOR DEVOPS ARCHITECT</div>
                        <div className="h-[1px] w-12 bg-gray-200"></div>
                    </div>

                    <div className="space-y-3 mb-6">
                         <InfoRow icon={MapPin} label="BASE" value="Bangkok, TH" />
                         <InfoRow icon={Mail} label="EMAIL" value="nitheesbalaji@gmail.com" />
                         <InfoRow icon={Terminal} label="STACK" value="K8s, AWS, Terraform" />
                         <InfoRow icon={Activity} label="EXP" value="9+ Years" />
                    </div>

                    <div className="flex gap-3 mt-auto">
                        <SocialBtn icon={Github} href="https://github.com/nitheesb" />
                        <SocialBtn icon={Linkedin} href="https://www.linkedin.com/in/nithees-balaji" />
                        <div className="flex-1 border border-dashed border-gray-200 rounded flex items-center justify-center font-mono text-[10px] text-gray-400">
                             ID: NB-8842
                        </div>
                    </div>

                </div>
            </div>
        </div>

        {/* --- DECORATIVE CORNERS --- */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {/* Top Left */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary/30 rounded-tl-sm"></div>
            {/* Bottom Right */}
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary/30 rounded-br-sm"></div>
        </div>

      </MotionDiv>

      {/* --- REFLECTION SHADOW --- */}
      <div className="mt-8 mx-auto w-[90%] h-4 bg-black/5 blur-xl rounded-[100%]"></div>
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
            <Icon size={12} />
        </div>
        <div className="overflow-hidden">
            <div className="text-[9px] text-gray-400 font-mono font-bold leading-none mb-0.5">{label}</div>
            <div className="text-xs text-gray-700 font-medium leading-none truncate">{value}</div>
        </div>
    </div>
);

const SocialBtn = ({ icon: Icon, href }: { icon: any, href: string }) => (
    <a 
        href={href} 
        target="_blank" 
        className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white hover:bg-black hover:border-black transition-all duration-300 shrink-0"
    >
        <Icon size={14} />
    </a>
);

export default HeroIdentity;
