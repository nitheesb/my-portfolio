import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Database, Server, Layers, Code, Shield, Globe, Cpu } from 'lucide-react';

const TechOrbit: React.FC = () => {
  return (
    <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] flex justify-center items-center perspective-[1000px]">
      
      {/* Central Core - Profile Image */}
      {/* ABSOLUTE POSITIONING applied to Core to match Rings exactly */}
      <motion.div 
        initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
        transition={{ duration: 1, type: "spring" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 group"
      >
        {/* Dynamic Sizing for Core */}
        <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-[340px] lg:h-[340px] relative">
            {/* Glowing Pulse */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[30px] md:blur-[50px] animate-pulse-slow group-hover:bg-primary/40 transition-colors"></div>
            
            {/* Image Container */}
            <div className="relative w-full h-full rounded-full border-2 border-primary/50 bg-black overflow-hidden shadow-[0_0_30px_rgba(255,94,0,0.2)] group-hover:border-primary transition-colors">
                <img 
                    src="https://ca.slack-edge.com/T0DAXU939-U04TCM739QQ-9d709b5f8bd1-512" 
                    alt="Nithees Balaji" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                />
                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)50%,rgba(0,0,0,0.25)50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none" />
            </div>
        </div>
      </motion.div>

      {/* ORBIT RING 1: Horizontal Flat */}
      <div className="absolute top-1/2 left-1/2 w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full border border-gray-800/50 animate-[spin_20s_linear_infinite]" 
           style={{ transformStyle: 'preserve-3d', transform: 'translate(-50%, -50%) rotateX(75deg)' }}>
          <div className="absolute inset-0 rounded-full border border-primary/20 box-shadow-[0_0_10px_rgba(255,94,0,0.1)]"></div>
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#ff5e00]"></div>
          <OrbitItem icon={Cloud} color="text-white" bg="bg-blue-600" position="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" rotation="rotateX(-75deg)" />
          <OrbitItem icon={Server} color="text-white" bg="bg-gray-700" position="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" rotation="rotateX(-75deg)" />
      </div>

      {/* ORBIT RING 2: Tilted Right */}
      <div className="absolute top-1/2 left-1/2 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[520px] md:h-[520px] lg:w-[640px] lg:h-[640px] rounded-full border border-gray-800/50 animate-[spin_25s_linear_infinite_reverse]" 
           style={{ transformStyle: 'preserve-3d', transform: 'translate(-50%, -50%) rotateX(75deg) rotateY(60deg)' }}>
           <div className="absolute top-1/2 left-0 w-2 h-2 bg-secondary rounded-full shadow-[0_0_10px_#00f2ff]"></div>
           <OrbitItem icon={Code} color="text-black" bg="bg-secondary" position="top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" rotation="rotateY(-60deg) rotateX(-75deg)" />
           <OrbitItem icon={Layers} color="text-black" bg="bg-yellow-400" position="top-1/2 right-0 translate-x-1/2 -translate-y-1/2" rotation="rotateY(-60deg) rotateX(-75deg)" />
      </div>

      {/* ORBIT RING 3: Tilted Left */}
      <div className="absolute top-1/2 left-1/2 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[520px] md:h-[520px] lg:w-[640px] lg:h-[640px] rounded-full border border-gray-800/50 animate-[spin_30s_linear_infinite]" 
           style={{ transformStyle: 'preserve-3d', transform: 'translate(-50%, -50%) rotateX(75deg) rotateY(-60deg)' }}>
           <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"></div>
           <OrbitItem icon={Shield} color="text-white" bg="bg-red-600" position="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" rotation="rotateY(60deg) rotateX(-75deg)" />
           <OrbitItem icon={Database} color="text-white" bg="bg-green-600" position="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" rotation="rotateY(60deg) rotateX(-75deg)" />
      </div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 right-4 md:right-20 text-gray-600 opacity-50 hidden sm:block"
      >
        <Globe size={24} />
      </motion.div>
      <motion.div 
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-4 md:left-20 text-gray-600 opacity-50 hidden sm:block"
      >
        <Cpu size={24} />
      </motion.div>

    </div>
  );
};

// Helper component
const OrbitItem: React.FC<{ icon: any, color: string, bg: string, position: string, rotation: string }> = ({ icon: Icon, color, bg, position, rotation }) => {
    return (
        <div className={`absolute ${position}`} style={{ transform: rotation }}>
            <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className={`p-1.5 md:p-2 rounded-lg ${bg} ${color} shadow-lg border border-white/20`}
            >
                <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <Icon size={14} className="md:w-5 md:h-5" />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default TechOrbit;