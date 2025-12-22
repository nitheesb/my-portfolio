import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Download, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

import CursorCanvas from './components/CursorCanvas';
import GlitchButton from './components/GlitchButton';
import MagneticWrapper from './components/MagneticWrapper';
import Terminal from './components/Terminal';

// Placeholder Imports (We will update these components next)
// For now, we reuse existing ones but will style them via parents
import StatsSection from './components/StatsSection';
import ScrambleText from './components/ScrambleText';
import BentoGrid from './components/BentoGrid';
import TechStack from './components/TechStack';
import SkillsMatrix from './components/SkillsMatrix';
import ServicesSection from './components/ServicesSection';
import HeroHUD from './components/HeroHUD';

function App() {
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const { scrollYProgress } = useScroll();

    // Parallax Effects
    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-[#ff5e00] selection:text-white font-sans sm:cursor-none">

            {/* 1. LAYER: 3D Background (Fixed) */}
            <CursorCanvas />

            {/* 2. LAYER: Navigation (Fixed) */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
                <div className="text-[#ff5e00] font-mono font-bold tracking-widest text-xl pointer-events-auto cursor-pointer">
                    NBM.SYS
                </div>
                <div className="hidden md:flex gap-8 font-mono text-xs tracking-[0.2em] text-gray-400 pointer-events-auto">
                    {['HOME', 'LOGS', 'SYSTEMS', 'CORE'].map((item) => (
                        <button key={item} className="hover:text-white transition-colors uppercase">
                            {item}
                        </button>
                    ))}
                </div>
                <MagneticWrapper strength={0.2}>
                    <button
                        onClick={() => setIsTerminalOpen(true)}
                        className="pointer-events-auto text-[#ff5e00] border border-[#ff5e00]/30 px-4 py-2 rounded-full font-mono text-xs hover:bg-[#ff5e00] hover:text-black transition-all"
                    >
                        CMD_TERMINAL
                    </button>
                </MagneticWrapper>
            </nav>

            {/* 3. LAYER: Content (Scrollable) */}
            <main className="relative z-10 w-full flex flex-col items-center">

                {/* HERO SECTION */}
                <section className="relative w-full h-screen flex flex-col justify-center items-center px-4">
                    <motion.div
                        style={{ y: heroY, opacity }}
                        className="flex flex-col items-center text-center max-w-5xl"
                    >
                        {/* HUD Elements */}
                        <div className="absolute top-1/4 w-full flex justify-between px-10 opacity-30 font-mono text-[10px] tracking-widest pointer-events-none hidden md:flex">
                            <span>SYS_READY</span>
                            <span>LOC_Unknown</span>
                            <span>UPTIME_99.9%</span>
                        </div>

                        <div className="mb-6 flex items-center gap-3 border border-[#ff5e00]/20 bg-[#ff5e00]/5 px-3 py-1 rounded-full">
                            <span className="w-2 h-2 bg-[#ff5e00] rounded-full animate-pulse shadow-[0_0_10px_#ff5e00]"></span>
                            <span className="font-mono text-xs text-[#ff5e00] tracking-widest">ARCHITECT_MODE_ACTIVE</span>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-none mb-6">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">DEVOPS</span>
                            <span className="block text-[#ff5e00] drop-shadow-[0_0_20px_rgba(255,94,0,0.6)]">ARCHITECT</span>
                        </h1>

                        <p className="max-w-xl text-gray-400 font-mono text-sm md:text-base leading-relaxed mb-10">
                            Building self-healing infrastructure in the void.
                            <br />
                            <span className="text-white">Kubernetes</span> // <span className="text-white">Terraform</span> // <span className="text-white">Chaos Engineering</span>
                        </p>

                        <div className="flex gap-4">
                            <MagneticWrapper strength={0.3}>
                                <button className="bg-[#ff5e00] text-black font-bold px-8 py-4 rounded-none uppercase tracking-wider hover:bg-white transition-colors">
                                    Initialize Mission
                                </button>
                            </MagneticWrapper>
                            <MagneticWrapper strength={0.3}>
                                <button className="border border-white/20 text-white px-8 py-4 rounded-none uppercase tracking-wider hover:bg-white/10 transition-colors backdrop-blur-md">
                                    Access Logs
                                </button>
                            </MagneticWrapper>
                        </div>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        style={{ opacity }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <span className="font-mono text-[10px] tracking-[0.3em] text-gray-500">SCROLL_TO_BREACH</span>
                        <ChevronDown className="animate-bounce text-[#ff5e00]" size={20} />
                    </motion.div>
                </section>

                {/* STATS TICKER */}
                <div className="w-full border-y border-white/5 bg-black/50 backdrop-blur-sm z-20">
                    <StatsSection />
                </div>

                {/* LOGS / PROJECTS */}
                <section className="w-full py-40 px-6 container mx-auto">
                    <div className="flex items-end justify-between mb-20 border-b border-white/10 pb-8">
                        <h2 className="text-4xl md:text-7xl font-display font-bold text-white">
                            MISSION_LOGS
                            <span className="text-[#ff5e00] text-lg md:text-2xl align-top ml-2">.01</span>
                        </h2>
                        <span className="font-mono text-xs text-gray-500 hidden md:inline-block">/ RECENT DEPLOYMENTS</span>
                    </div>
                    <BentoGrid />
                </section>

                {/* SKILLS */}
                <section className="w-full py-40 bg-[#0a0a0a] border-t border-white/5">
                    <div className="container mx-auto px-6">
                        <div className="mb-20">
                            <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-4">
                                ARSENAL
                                <span className="text-[#ff5e00] text-lg md:text-2xl align-top ml-2">.02</span>
                            </h2>
                            <p className="font-mono text-gray-400 max-w-2xl">
                                Weapons of mass construction. Optimized for high-scale environments.
                            </p>
                        </div>
                        <TechStack />
                        <div className="mt-20">
                            <SkillsMatrix />
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="w-full py-20 border-t border-white/10 bg-black flex flex-col items-center justify-center text-center">
                    <h3 className="text-2xl font-display font-bold mb-6 text-white">READY TO DEPLOY?</h3>
                    <a href="mailto:contact@nithees.io" className="text-[#ff5e00] font-mono text-xl hover:underline mb-10 block">
                        INITIATE_CONTACT()
                    </a>
                    <p className="text-gray-600 font-mono text-xs">
                        © 2025 NITHEES BALAJI MOHAN // SYSTEMS ONLINE
                    </p>
                </footer>

            </main>

            <Terminal
                isOpen={isTerminalOpen}
                onClose={() => setIsTerminalOpen(false)}
                onAction={(cmd) => console.log(cmd)}
            />
        </div>
    );
}

export default App;