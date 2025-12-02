import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Database, Server, Code, Shield, Cpu, Globe, Zap, GitBranch } from 'lucide-react';

const MotionDiv = motion.div as any;

const TechOrbit: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] flex justify-center items-center perspective-[1200px] overflow-visible">
      
      {/* 
         ZERO POINT ANCHOR 
         Everything is absolutely positioned relative to this single point.
         This guarantees perfect alignment between the image and the rings.
      */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0 transform-style-3d">
        
        {/* --- HOLOGRAPHIC BASE (Floor) --- */}
        <div 
            className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[40px] pointer-events-none"
            style={{ transform: 'translate(-50%, -20%) rotateX(70deg)' }}
        ></div>
        <div 
            className="absolute top-[200px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] border border-primary/20 rounded-full"
            style={{ transform: 'translate(-50%, -20%) rotateX(70deg)' }}
        ></div>


        {/* --- CENTRAL CORE (Profile) --- */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-20">
            <MotionDiv 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className="relative group cursor-pointer"
            >
                {/* Core Container */}
                <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-black relative z-10 overflow-hidden shadow-[0_0_60px_rgba(255,94,0,0.2)] group-hover:shadow-[0_0_100px_rgba(255,94,0,0.5)] transition-shadow duration-500 border border-gray-800">
                     <img 
                        src="https://ca.slack-edge.com/T0DAXU939-U04TCM739QQ-9d709b5f8bd1-512" 
                        alt="Nithees Balaji" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0"
                    />
                    {/* Hologram Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-50 group-hover:opacity-20 transition-opacity"></div>
                </div>

                {/* Tech Rings close to profile */}
                <div className="absolute inset-[-15px] border-2 border-dashed border-primary/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute inset-[-8px] border border-white/10 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
            </MotionDiv>
        </div>

        {/* --- ORBIT 1: CODE LAYER (Flat) --- */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[450px] md:h-[450px] border border-gray-800 rounded-full animate-[spin_30s_linear_infinite]">
             <OrbitIcon icon={Code} color="text-blue-400" bg="bg-blue-500/10" angle={0} />
             <OrbitIcon icon={Cpu} color="text-blue-400" bg="bg-blue-500/10" angle={180} />
        </div>

        {/* --- ORBIT 2: CLOUD LAYER (Tilted X) --- */}
        <div 
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[500px] md:h-[500px] border border-dashed border-primary/20 rounded-full animate-[spin_25s_linear_infinite_reverse]"
            style={{ transform: 'translate(-50%, -50%) rotateX(60deg)' }}
        >
             {/* Icons must counter-rotate to stay upright */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_25s_linear_infinite]">
                 <div className="bg-black/80 backdrop-blur border border-primary text-primary p-2 rounded shadow-[0_0_15px_rgba(255,94,0,0.4)]">
                    <Cloud size={24} />
                 </div>
             </div>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 animate-[spin_25s_linear_infinite]">
                 <div className="bg-black/80 backdrop-blur border border-green-500 text-green-500 p-2 rounded shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                    <Server size={24} />
                 </div>
             </div>
        </div>

        {/* --- ORBIT 3: SECURITY LAYER (Tilted Y) --- */}
        <div 
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] md:w-[550px] md:h-[550px] border border-gray-800 rounded-full animate-[spin_40s_linear_infinite]"
            style={{ transform: 'translate(-50%, -50%) rotateY(60deg)' }}
        >
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 animate-[spin_40s_linear_infinite_reverse]">
                 <div className="bg-black/80 backdrop-blur border border-red-500 text-red-500 p-2 rounded shadow-lg">
                    <Shield size={24} />
                 </div>
            </div>
             <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 animate-[spin_40s_linear_infinite_reverse]">
                 <div className="bg-black/80 backdrop-blur border border-purple-500 text-purple-500 p-2 rounded shadow-lg">
                    <GitBranch size={24} />
                 </div>
            </div>
        </div>

         {/* --- ORBIT 4: ELECTRON PATH (Fast Ellipse) --- */}
         <div 
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[100px] md:w-[700px] md:h-[180px] border border-primary/10 rounded-[100%] animate-[spin_8s_linear_infinite]"
            style={{ transform: 'translate(-50%, -50%) rotate(-30deg)' }}
        >
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_20px_#ff5e00] -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* --- FLOATING DATA PARTICLES --- */}
        <FloatingParticle icon={Zap} x={-200} y={-180} delay={0} color="text-yellow-400" />
        <FloatingParticle icon={Database} x={220} y={150} delay={2} color="text-cyan-400" />
        <FloatingParticle icon={Globe} x={-180} y={120} delay={1} color="text-indigo-400" />

      </div>
    </div>
  );
};

const OrbitIcon = ({ icon: Icon, color, bg, angle }: { icon: any, color: string, bg: string, angle: number }) => {
    // Calculate position based on angle
    const style = {
        transform: `rotate(${angle}deg) translateY(-50%)`
    };
    
    return (
        <div className="absolute top-1/2 left-1/2 w-full h-0" style={style}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 animate-[spin_30s_linear_infinite_reverse]">
                <div className={`${bg} backdrop-blur border border-white/10 ${color} p-2 rounded-lg`}>
                    <Icon size={20} />
                </div>
            </div>
        </div>
    );
}

const FloatingParticle = ({ icon: Icon, x, y, delay, color }: { icon: any, x: number, y: number, delay: number, color: string }) => (
    <MotionDiv
        animate={{ 
            x: [x, x + 20, x],
            y: [y, y - 20, y],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1, 0.8]
        }}
        transition={{ duration: 5, delay: delay, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-0 left-0 ${color} pointer-events-none z-0`}
    >
        <Icon size={20} />
    </MotionDiv>
);

export default TechOrbit;