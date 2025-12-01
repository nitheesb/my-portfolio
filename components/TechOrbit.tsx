import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Database, Server, Layers, Code, Shield, Cpu, Globe, Zap, GitBranch } from 'lucide-react';

const TechOrbit: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] flex justify-center items-center overflow-visible perspective-[1000px]">
      
      {/* ZERO POINT ANCHOR - Everything is positioned relative to this center point */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0">
        
        {/* --- CENTRAL CORE (Profile) --- */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative group"
            >
                {/* Reactor Glow */}
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-[40px] animate-pulse-slow"></div>
                
                {/* Core Container */}
                <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full border-4 border-gray-900 bg-black relative z-10 overflow-hidden shadow-[0_0_50px_rgba(255,94,0,0.3)] group-hover:shadow-[0_0_80px_rgba(255,94,0,0.6)] transition-shadow duration-500">
                     <img 
                        src="https://ca.slack-edge.com/T0DAXU939-U04TCM739QQ-9d709b5f8bd1-512" 
                        alt="Nithees Balaji" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Hologram Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Rotating Core Border */}
                <div className="absolute inset-[-10px] border border-dashed border-primary/40 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-[-4px] border border-primary/20 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
            </motion.div>
        </div>

        {/* --- ORBIT 1: The 'Equator' (Fast, tight) --- */}
        <div className="absolute top-0 left-0 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] md:w-[420px] md:h-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-800/60 animate-[spin_15s_linear_infinite]">
            <OrbitIcon icon={Code} bg="bg-blue-500" delay={0} />
            <div className="absolute top-1/2 left-0 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6]"></div>
        </div>

        {/* --- ORBIT 2: Tilted Axis X (Medium) --- */}
        <div 
            className="absolute top-0 left-0 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[500px] md:h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gray-700/50 animate-[spin_20s_linear_infinite_reverse]"
            style={{ transform: 'translate(-50%, -50%) rotateX(60deg)' }}
        >
             {/* Note: We use a wrapper to counter-rotate icons so they face screen */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite]">
                 <div className="bg-gray-900 p-2 rounded-lg border border-primary text-primary shadow-lg">
                    <Cloud size={20} />
                 </div>
             </div>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 animate-[spin_20s_linear_infinite]">
                 <div className="bg-gray-900 p-2 rounded-lg border border-green-500 text-green-500 shadow-lg">
                    <Server size={20} />
                 </div>
             </div>
        </div>

        {/* --- ORBIT 3: Tilted Axis Y (Large) --- */}
        <div 
            className="absolute top-0 left-0 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[580px] md:h-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-800 animate-[spin_30s_linear_infinite]"
            style={{ transform: 'translate(-50%, -50%) rotateY(60deg)' }}
        >
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 animate-[spin_30s_linear_infinite_reverse]">
                 <div className="bg-gray-900 p-2 rounded-lg border border-red-500 text-red-500 shadow-lg">
                    <Shield size={20} />
                 </div>
            </div>
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 animate-[spin_30s_linear_infinite_reverse]">
                 <div className="bg-gray-900 p-2 rounded-lg border border-purple-500 text-purple-500 shadow-lg">
                    <GitBranch size={20} />
                 </div>
            </div>
        </div>

         {/* --- ORBIT 4: The 'Electron' Path (Elliptical) --- */}
         <div 
            className="absolute top-0 left-0 w-[350px] h-[100px] sm:w-[500px] sm:h-[150px] md:w-[700px] md:h-[200px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] border border-primary/20 animate-[spin_8s_linear_infinite]"
            style={{ transform: 'translate(-50%, -50%) rotate(-45deg)' }}
        >
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_20px_#ff5e00] -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* --- FLOATING PARTICLES --- */}
        <FloatingParticle icon={Zap} x={-150} y={-150} delay={0} color="text-yellow-400" />
        <FloatingParticle icon={Database} x={160} y={120} delay={2} color="text-blue-400" />
        <FloatingParticle icon={Cpu} x={-140} y={100} delay={1} color="text-green-400" />
        <FloatingParticle icon={Globe} x={150} y={-140} delay={3} color="text-purple-400" />

      </div>
    </div>
  );
};

const OrbitIcon = ({ icon: Icon, bg, delay }: { icon: any, bg: string, delay: number }) => (
    <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_15s_linear_infinite_reverse]`}>
        <div className={`p-2 rounded-lg ${bg} text-white shadow-lg`}>
            <Icon size={16} />
        </div>
    </div>
);

const FloatingParticle = ({ icon: Icon, x, y, delay, color }: { icon: any, x: number, y: number, delay: number, color: string }) => (
    <motion.div
        animate={{ 
            x: [x, x + 20, x],
            y: [y, y - 20, y],
            opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 4, delay: delay, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-0 left-0 ${color}`}
    >
        <Icon size={24} />
    </motion.div>
);

export default TechOrbit;