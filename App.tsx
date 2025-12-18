import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal as TerminalIcon, Download } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate, useSpring } from 'framer-motion';

import Terminal from './components/Terminal';
import CursorCanvas from './components/CursorCanvas';
import StatsSection from './components/StatsSection';
import ScrambleText from './components/ScrambleText';
import GlitchButton from './components/GlitchButton';
import HeroIdentity from './components/HeroIdentity';
import HeroHUD from './components/HeroHUD';
import BentoGrid from './components/BentoGrid';
import TechStack from './components/TechStack';
import SkillsMatrix from './components/SkillsMatrix';
import ServicesSection from './components/ServicesSection';

const SCROLL_PER_PAGE = 1600;
const SCROLL_COOLDOWN = 800; // Time in ms before next section jump is allowed
const THRESHOLD_TO_SNAP = 300; // Delta required to trigger a snap

const SECTIONS = [
  { id: 'hero', title: 'HOME', component: HeroSection },
  { id: 'skills', title: 'SYSTEMS', component: SkillsWrapper },
  { id: 'projects', title: 'LOGS', component: ProjectsSection },
  { id: 'services', title: 'CORE', component: ServicesWrapper },
];

function App() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const scrollY = useMotionValue(0);
  const smoothScrollY = useSpring(scrollY, { damping: 50, stiffness: 180, mass: 1.2 });

  const lastSectionChange = useRef(Date.now());
  const isAnimating = useRef(false);
  const accumulatedDelta = useRef(0);

  const maxScroll = (SECTIONS.length - 1) * SCROLL_PER_PAGE;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = smoothScrollY.on("change", (latest) => {
      const newIndex = Math.round(latest / SCROLL_PER_PAGE);
      if (newIndex !== activeSectionIndex) {
        setActiveSectionIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [smoothScrollY, activeSectionIndex]);

  const navigateTo = useCallback((index: number) => {
      if (index < 0 || index >= SECTIONS.length) return;
      isAnimating.current = true;
      lastSectionChange.current = Date.now();
      accumulatedDelta.current = 0;
      
      animate(scrollY, index * SCROLL_PER_PAGE, { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          isAnimating.current = false;
        }
      });
  }, [scrollY]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isTerminalOpen || isLoading || isAnimating.current) return;

    const now = Date.now();
    if (now - lastSectionChange.current < SCROLL_COOLDOWN) {
        e.preventDefault();
        return;
    }

    const target = e.target as HTMLElement;
    const scrollable = target.closest('.scrollable-content');
    
    // Internal scrolling detection
    if (scrollable) {
        const el = scrollable as HTMLElement;
        const isAtTop = el.scrollTop <= 5; 
        const isAtBottom = Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) <= 5;
        const isOverflowing = el.scrollHeight > el.clientHeight;

        if (isOverflowing) {
            // If we are moving down and haven't reached bottom, let internal scroll work
            if (e.deltaY > 0 && !isAtBottom) return;
            // If we are moving up and haven't reached top, let internal scroll work
            if (e.deltaY < 0 && !isAtTop) return;
        }
    }

    e.preventDefault();
    accumulatedDelta.current += e.deltaY;

    // Trigger section jump if threshold met
    if (Math.abs(accumulatedDelta.current) > THRESHOLD_TO_SNAP) {
        if (accumulatedDelta.current > 0) {
            navigateTo(activeSectionIndex + 1);
        } else {
            navigateTo(activeSectionIndex - 1);
        }
        accumulatedDelta.current = 0;
    } else {
        // Subtle drift movement within the current page for feedback
        const current = scrollY.get();
        const drift = e.deltaY * 0.1;
        const targetDrift = current + drift;
        
        // Ensure we don't drift out of section bounds during accumulation
        const lowerBound = activeSectionIndex * SCROLL_PER_PAGE;
        const upperBound = (activeSectionIndex + 1) * SCROLL_PER_PAGE;
        
        if (targetDrift >= lowerBound - 100 && targetDrift <= upperBound + 100) {
            scrollY.set(targetDrift);
        }
    }

    // Reset accumulation if user stops scrolling for a bit
    const timeout = (window as any)._scrollResetTimeout;
    if (timeout) clearTimeout(timeout);
    (window as any)._scrollResetTimeout = setTimeout(() => {
        if (!isAnimating.current) {
            // Snap back to current section if they didn't push hard enough
            navigateTo(activeSectionIndex);
        }
    }, 150);

  }, [scrollY, isTerminalOpen, isLoading, activeSectionIndex, navigateTo]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  if (isLoading) {
    return <BootScreen />;
  }

  return (
    <div className="w-screen h-screen bg-[#050505] text-gray-800 overflow-hidden relative font-sans selection:bg-primary selection:text-white">
      <CursorCanvas />
      
      <header className="fixed top-0 left-0 w-full z-50 md:hidden flex justify-between items-center px-4 py-3 bg-white/90 backdrop-blur-md border-b border-gray-200">
          <div className="font-mono text-xs font-bold tracking-widest text-primary">
              0{activeSectionIndex + 1} // {SECTIONS[activeSectionIndex].title}
          </div>
          <nav className="flex gap-4 text-xs font-mono text-gray-400">
             <button aria-label="Previous Section" disabled={activeSectionIndex === 0} onClick={() => navigateTo(activeSectionIndex - 1)} className="disabled:opacity-30 p-2">PREV</button>
             <button aria-label="Next Section" disabled={activeSectionIndex === SECTIONS.length - 1} onClick={() => navigateTo(activeSectionIndex + 1)} className="disabled:opacity-30 p-2">NEXT</button>
          </nav>
      </header>
      
      <NavRail current={activeSectionIndex} total={SECTIONS.length} onChange={navigateTo} />

      <main className="w-full h-full relative perspective-[1200px]">
         {SECTIONS.map((section, index) => (
             <SectionPanel 
                key={section.id}
                index={index}
                total={SECTIONS.length}
                scrollY={smoothScrollY}
                Component={section.component}
             />
         ))}
      </main>

      <button 
        onClick={() => setIsTerminalOpen(true)}
        aria-label="Open Command Terminal"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] bg-black border border-primary text-primary w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,94,0,0.3)] hover:scale-110 hover:bg-primary hover:text-white transition-all duration-300 group"
      >
        <TerminalIcon size={20} className="md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
      </button>

      <Terminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
        onAction={(cmd) => console.log(cmd)}
      />
    </div>
  );
}

const SectionPanel = ({ index, total, scrollY, Component }: { index: number, total: number, scrollY: any, Component: any }) => {
    const startRange = (index - 1) * SCROLL_PER_PAGE;
    const endRange = index * SCROLL_PER_PAGE;
    const exitRange = (index + 1) * SCROLL_PER_PAGE;

    const openProgress = useTransform(scrollY, [startRange, endRange], [0, 1]);

    const clipInset = useTransform(openProgress, (v) => {
        if (index === 0) return 'inset(0% 0 0% 0)'; 
        const progress = Math.max(0, Math.min(1, v));
        const gap = 50 * (1 - progress);
        return `inset(${gap}% 0 ${gap}% 0)`;
    });

    const brightness = useTransform(scrollY, [endRange, exitRange], [1, 0.4]);
    const scale = useTransform(scrollY, [endRange, exitRange], [1, 0.95]);
    const borderOpacity = useTransform(openProgress, [0.9, 1], [1, 0]);

    return (
        <motion.div 
            className="absolute inset-0 w-full h-full bg-bg will-change-transform"
            style={{ 
                zIndex: index,
                clipPath: clipInset,
                filter: useTransform(brightness, v => `brightness(${v})`),
                scale: scale
            }}
        >
             {index !== 0 && (
                 <motion.div 
                    className="absolute inset-0 pointer-events-none z-50 border-y border-primary/50"
                    style={{ opacity: borderOpacity }}
                 />
             )}
             
             <div className="w-full h-full relative overflow-hidden">
                <Component />
             </div>
        </motion.div>
    );
};

function HeroSection() {
    return (
    <section className="h-full w-full relative flex flex-col overflow-hidden bg-bg">
        <HeroHUD />
        
        <div className="absolute top-16 left-6 md:top-8 md:left-8 z-30">
            <div className="font-mono font-bold text-sm md:text-lg tracking-wider pointer-events-auto inline-block bg-white/50 backdrop-blur-sm px-3 py-1 rounded border border-transparent">
                <span className="text-primary">[</span> <ScrambleText text="NBM.SYS" className="text-black" /> <span className="text-primary">]</span>
            </div>
        </div>

        <div className="flex-grow container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8 items-center justify-center relative z-20 scrollable-content overflow-y-auto pt-24 md:pt-0">
            <div className="order-2 md:order-1 flex flex-col justify-center items-start w-full md:w-1/2">
                 <motion.div 
                    initial={{ opacity: 0, x: -50 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="w-full relative z-20"
                 >
                    <div className="inline-flex items-center gap-2 mb-4 border-l-2 border-primary pl-4">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true"></span>
                        <span className="font-mono text-[10px] md:text-xs font-bold tracking-widest text-gray-500">AVAILABLE FOR HIGH-SCALE MISSIONS</span>
                    </div>
                    
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-6 text-black text-left">
                        DEVOPS <br/> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">ARCHITECT</span>
                    </h1>
                    
                    <p className="max-w-md font-mono text-sm text-gray-600 leading-relaxed mb-8 text-left">
                        I am <span className="text-black font-bold">Nithees Balaji Mohan</span>. I build self-healing infrastructure. Transforming chaotic systems into scalable, cost-effective engines using Kubernetes & Terraform.
                    </p>
                    
                    <div className="flex gap-4">
                        <GlitchButton text="MISSION LOGS" icon={<TerminalIcon size={16} />} aria-label="View Projects" />
                        <GlitchButton 
                            text="GET RESUME" 
                            icon={<Download size={16} />} 
                            href="https://drive.google.com/file/d/1oU43XtO0xSjEs0uk-5vBNXsn5FRsXbI_/view?usp=sharing"
                            className="bg-white text-black border-black/10 hover:bg-gray-100"
                            aria-label="Download CV of Nithees Balaji Mohan"
                        />
                    </div>
                 </motion.div>
            </div>

            <div className="order-1 md:order-2 flex justify-center items-center w-full md:w-1/2">
                <div className="w-full max-w-[320px] md:max-w-[450px]">
                    <HeroIdentity />
                </div>
            </div>
        </div>

        <div className="relative z-20 w-full bg-white/50 backdrop-blur-md border-t border-gray-200">
            <StatsSection />
        </div>
    </section>
    );
}

function SkillsWrapper() {
    return (
    <div className="h-full w-full overflow-y-auto flex items-center bg-bg scrollable-content py-20 md:py-0">
        <div className="w-full">
             <SkillsMatrix />
        </div>
    </div>
    );
}

function ProjectsSection() {
    return (
    <div className="h-full w-full overflow-y-auto bg-bg custom-scrollbar-hide scrollable-content pt-24 pb-0 flex flex-col">
        <div className="container mx-auto px-6 md:px-12 flex-grow">
            <header className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
                <div>
                     <span className="text-5xl md:text-7xl font-display font-bold text-black opacity-10 hidden md:block">LOGS</span>
                     <h2 className="text-4xl md:text-5xl font-display font-bold text-black md:-mt-10 md:ml-1">MISSION LOGS</h2>
                </div>
                <div className="font-mono text-xs text-primary font-bold mt-2 md:mt-0">
                    [ ACCESS_LEVEL: PUBLIC_RECORDS ]
                </div>
            </header>
            
            <BentoGrid />
        </div>
        
        <div className="mt-12 w-full">
             <div className="container mx-auto px-6 mb-4">
                 <div className="flex items-center gap-2">
                    <span className="w-16 h-[1px] bg-primary"></span>
                    <span className="font-mono text-xs font-bold text-primary tracking-widest">INFRA_ARSENAL</span>
                 </div>
             </div>
             <TechStack />
        </div>
    </div>
    );
}

function ServicesWrapper() {
    return (
    <div className="h-full w-full overflow-y-auto bg-white flex flex-col scrollable-content">
         <div className="w-full pt-20 pb-10 flex-grow">
            <ServicesSection />
         </div>
    </div>
    );
}

function BootScreen() {
    return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center font-mono text-primary z-[9999]" aria-live="polite">
        <div className="text-4xl font-bold mb-8 animate-pulse">NBM.SYS</div>
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
            />
        </div>
        <div className="mt-4 text-[10px] text-gray-500 font-mono tracking-widest">
            LOADING_SYSTEM_CORE // NITHEES_BALAJI_MOHAN
        </div>
    </div>
    );
}

function NavRail({ current, total, onChange }: { current: number, total: number, onChange: (i: number) => void }) {
    return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 items-center" aria-label="Main Navigation">
        {SECTIONS.map((section, idx) => (
            <button
                key={section.id}
                onClick={() => onChange(idx)}
                aria-label={`Go to ${section.title} section`}
                aria-current={current === idx ? 'page' : undefined}
                className="group flex items-center gap-4 relative py-2 w-8 justify-center"
            >
                <span className={`absolute right-8 font-mono text-[10px] font-bold tracking-widest transition-all duration-300 whitespace-nowrap ${current === idx ? 'opacity-100 text-black translate-x-0' : 'opacity-0 text-gray-400 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                    {section.title}
                </span>
                <div className={`w-1 transition-all duration-500 rounded-full ${current === idx ? 'h-8 bg-primary' : 'h-1.5 bg-gray-300 group-hover:bg-gray-400'}`}></div>
            </button>
        ))}
        <div className="w-[1px] h-20 bg-gray-200 my-2"></div>
        <div className="font-mono text-[10px] text-gray-400 rotate-90 whitespace-nowrap tracking-widest origin-center translate-y-8">
            0{current + 1} / 0{total}
        </div>
    </nav>
    );
}

export default App;