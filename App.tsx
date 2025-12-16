
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

import Terminal from './components/Terminal';
import CursorCanvas from './components/CursorCanvas';
import StatsSection from './components/StatsSection';
import ScrambleText from './components/ScrambleText';
import GlitchButton from './components/GlitchButton';
import HeroIdentity from './components/HeroIdentity';
import HeroHUD from './components/HeroHUD';
import SectionWrapper from './components/SectionWrapper';
import FloatingDock from './components/FloatingDock';
import BentoGrid from './components/BentoGrid';
import TechStack from './components/TechStack';

// Lazy Load Heavy Components
const PhilosophySection = lazy(() => import('./components/PhilosophySection'));
const SkillsMatrix = lazy(() => import('./components/SkillsMatrix'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const InfrastructureCode = lazy(() => import('./components/InfrastructureCode'));

// Konami Code Sequence
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const MotionDiv = motion.div as any;

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
       <MotionDiv style={{ y: y1, rotate }} className="absolute top-[10%] left-[5%] text-gray-200/50">
          <div className="w-64 h-64 border border-dashed border-gray-300 rounded-full"></div>
       </MotionDiv>
       <MotionDiv style={{ y: y2 }} className="absolute top-[40%] right-[10%] text-gray-200/50">
          <div className="w-32 h-32 border border-gray-300 transform rotate-45"></div>
       </MotionDiv>
       <div className="absolute top-[70%] left-[20%] w-40 h-[1px] bg-gray-200"></div>
    </div>
  );
};

const App: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [konamiIndex, setKonamiIndex] = useState(0);

  // Preloader Simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Konami Code Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === KONAMI_CODE[konamiIndex]) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === KONAMI_CODE.length) {
          document.body.classList.toggle('hacker-mode');
          alert('SYSTEM HACKED: DARK MODE INVERTED');
          setKonamiIndex(0);
        } else {
          setKonamiIndex(nextIndex);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex]);

  const handleTerminalAction = (action: string) => {
    if (action === 'reload') {
        setIsTerminalOpen(false);
        setIsLoading(true);
        // Simulate reload delay
        setTimeout(() => setIsLoading(false), 2500);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center font-mono text-primary z-[9999]">
        <div className="text-xl mb-4 animate-pulse font-bold">INITIALIZING CORE SYSTEMS...</div>
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <MotionDiv 
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
        <div className="mt-2 text-xs text-gray-500 font-mono">
           &gt; LOADING KERNEL MODULES<br/>
           &gt; ESTABLISHING SECURE CONNECTION<br/>
           &gt; ACCESS GRANTED
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-gray-800 selection:bg-primary/20 selection:text-black relative pb-32 overflow-x-hidden">
      <CursorCanvas />
      <ParallaxBackground />
      
      {/* --- FLOATING DOCK NAVIGATION (Replaces Header) --- */}
      <FloatingDock />

      <main> 
        
        {/* ================= HERO SECTION ================= */}
        <section id="hero" className="relative min-h-[100vh] lg:min-h-screen flex items-center overflow-hidden pt-20 lg:pt-0">
             <HeroHUD />
             
             {/* Logo - Aligned with Container */}
             <div className="absolute top-6 left-0 w-full z-50 pointer-events-none">
                <div className="container mx-auto px-6">
                    <div className="font-mono font-bold text-lg tracking-wider pointer-events-auto inline-block bg-bg/50 backdrop-blur-sm px-2 rounded border border-transparent hover:border-primary/20 transition-colors" aria-label="Logo">
                        <span className="text-primary">[</span> <ScrambleText text="NB.SYS" className="text-black" /> <span className="text-primary">]</span>
                    </div>
                </div>
             </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 items-center h-full pb-20 lg:pb-0">
                
                {/* --- LEFT COLUMN --- */}
                <div className="flex flex-col justify-center relative order-2 lg:order-1">
                    {/* Decor Line (Only on XL screens to avoid clutter) */}
                    <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gray-200 hidden xl:block">
                        <div className="absolute top-[20%] left-[-2px] w-[5px] h-[40px] bg-primary animate-pulse"></div>
                    </div>

                    <div>
                        <MotionDiv 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 bg-white border border-gray-200 px-4 py-1.5 rounded-full mb-8 shadow-sm"
                        >
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="font-mono text-xs text-green-600 tracking-wider font-bold">SYSTEM ONLINE // BKK</span>
                        </MotionDiv>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-display font-bold leading-[0.85] mb-8 tracking-tighter">
                            <div className="text-black hover:text-primary transition-colors">
                                <ScrambleText text="LEAD" autoStart={true} />
                            </div>
                            <div className="text-primary relative inline-block animate-glitch" data-text="DEVOPS">
                                DEVOPS
                            </div>
                            <div className="text-black hover:text-primary transition-colors">
                                <ScrambleText text="ARCHITECT" autoStart={true} />
                            </div>
                        </h1>

                        <MotionDiv 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 0.5 }}
                            className="max-w-xl border-l-2 border-primary pl-6 mb-10"
                        >
                            <p className="font-mono text-gray-600 text-sm md:text-base leading-relaxed font-medium">
                                I engineer resilience. Transforming chaotic infrastructure into scalable, cost-effective engines using <span className="text-black font-bold">Kubernetes</span> and <span className="text-black font-bold">GitOps</span>.
                            </p>
                        </MotionDiv>

                        <MotionDiv 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: 0.8 }}
                            className="flex flex-wrap gap-4"
                        >
                            <GlitchButton text="MISSION LOGS" href="#projects" icon={<TerminalIcon size={18} />} />
                            <a href="https://drive.google.com/file/d/1oU43XtO0xSjEs0uk-5vBNXsn5FRsXbI_/view?usp=sharing" target="_blank" className="px-8 py-4 border border-gray-300 font-mono text-sm font-bold text-gray-500 hover:text-black hover:border-black transition-all hover:bg-gray-50 bg-white/50 backdrop-blur">
                                DOWNLOAD CV
                            </a>
                        </MotionDiv>
                    </div>
                </div>

                {/* --- RIGHT COLUMN --- */}
                <div className="flex items-center justify-center relative order-1 lg:order-2">
                    <HeroIdentity />
                </div>
            </div>
        </section>

        <StatsSection />
        
        {/* SKILLS FIRST */}
        <SectionWrapper id="skills">
             <Suspense fallback={null}>
                <SkillsMatrix />
             </Suspense>
        </SectionWrapper>

        {/* INFRASTRUCTURE CODE */}
        <SectionWrapper id="infrastructure">
            <Suspense fallback={null}>
                <InfrastructureCode />
            </Suspense>
        </SectionWrapper>

        {/* PROJECTS - BENTO GRID */}
        <SectionWrapper id="projects">
           <Suspense fallback={<div className="h-40 flex items-center justify-center text-primary font-mono">LOADING LOGS...</div>}>
               <div className="py-20 container mx-auto px-6">
                  <div className="flex items-center gap-4 mb-16">
                      <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-black">// OPERATION_LOGS</h2>
                      <div className="h-[1px] bg-gray-200 flex-1"></div>
                      <div className="font-mono text-xs text-gray-400 font-bold">CONFIDENTIALITY: LOW</div>
                  </div>

                  {/* BENTO GRID REPLACEMENT */}
                  <BentoGrid />
               </div>
           </Suspense>
        </SectionWrapper>

        <SectionWrapper>
            <Suspense fallback={null}>
                <ServicesSection />
            </Suspense>
        </SectionWrapper>

        <SectionWrapper>
            <Suspense fallback={null}>
                <PhilosophySection />
            </Suspense>
        </SectionWrapper>

        {/* Tech Stack Marquee */}
        <SectionWrapper>
             <TechStack />
        </SectionWrapper>

      </main>

      {/* Floating Elements */}
      <button 
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-32 right-6 z-40 bg-black border border-primary text-primary p-4 rounded-full shadow-[0_0_20px_rgba(255,94,0,0.3)] hover:scale-110 hover:bg-primary hover:text-white transition-all duration-300 group md:bottom-32"
        aria-label="Open Terminal"
      >
        <TerminalIcon size={24} className="group-hover:rotate-12 transition-transform" />
      </button>

      <Terminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
        onAction={handleTerminalAction}
      />
    </div>
  );
};

export default App;
