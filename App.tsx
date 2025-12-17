
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
import InfrastructureCode from './components/InfrastructureCode';
import PhilosophySection from './components/PhilosophySection';

// --- CONFIG ---
// How many virtual pixels constitute one full page transition
const SCROLL_PER_PAGE = 1000;

const SECTIONS = [
  { id: 'hero', title: 'HOME', component: HeroSection },
  { id: 'skills', title: 'SYSTEMS', component: SkillsWrapper },
  { id: 'infrastructure', title: 'CODE', component: InfraSection },
  { id: 'projects', title: 'LOGS', component: ProjectsSection },
  { id: 'services', title: 'CORE', component: ServicesWrapper },
];

function App() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Global virtual scroll position (0 to TotalPages * SCROLL_PER_PAGE)
  const scrollY = useMotionValue(0);
  
  // INDUSTRY STANDARD SMOOTH SCROLL PHYSICS
  // Stiffness 200 / Damping 40 gives a weighted, premium feel (less twitchy)
  const smoothScrollY = useSpring(scrollY, { damping: 40, stiffness: 200, mass: 1 });

  // Refs for scroll physics
  const lastDelta = useRef(0);
  const scrollTimeout = useRef<number | null>(null);

  const maxScroll = (SECTIONS.length - 1) * SCROLL_PER_PAGE;

  // Preloader
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Sync active index for UI updates (Nav Rail, Header)
  useEffect(() => {
    const unsubscribe = smoothScrollY.on("change", (latest) => {
      const newIndex = Math.round(latest / SCROLL_PER_PAGE);
      if (newIndex !== activeSectionIndex) {
        setActiveSectionIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [smoothScrollY, activeSectionIndex]);


  // --- HYBRID SCROLL LOGIC ---
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isTerminalOpen || isLoading) return;

    // 1. Check if we are hovering a scrollable internal container
    const target = e.target as HTMLElement;
    const scrollable = target.closest('.scrollable-content');
    
    let consumedByInternal = false;

    if (scrollable) {
        const el = scrollable as HTMLElement;
        const isAtTop = el.scrollTop <= 1; 
        const isAtBottom = Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) <= 1;
        const isOverflowing = el.scrollHeight > el.clientHeight;

        // If the page is FULLY open (within small margin of error)
        const currentGlobalVal = scrollY.get();
        const nearestPage = Math.round(currentGlobalVal / SCROLL_PER_PAGE) * SCROLL_PER_PAGE;
        const isLockedToPage = Math.abs(currentGlobalVal - nearestPage) < 10;

        if (isOverflowing && isLockedToPage) {
             // If scrolling UP and NOT at top -> internal scroll
             if (e.deltaY < 0 && !isAtTop) consumedByInternal = true;
             // If scrolling DOWN and NOT at bottom -> internal scroll
             if (e.deltaY > 0 && !isAtBottom) consumedByInternal = true;
        }
    }

    // 2. If not consumed by internal div, update global virtual scroll
    if (!consumedByInternal) {
        // e.preventDefault() is implicitly handled by passive: false in event listener
        e.preventDefault();
        
        const current = scrollY.get();
        
        // SENSITIVITY CALIBRATION
        // Reduced to 0.6 for better control on trackpads/fast wheels
        const delta = e.deltaY * 0.6; 
        lastDelta.current = delta; // Track direction for snap logic
        
        const newPos = Math.max(0, Math.min(current + delta, maxScroll));
        scrollY.set(newPos);

        // --- SNAP & KICK LOGIC ---
        // Debounce: Wait for scroll to stop before checking for snaps
        if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
        
        scrollTimeout.current = window.setTimeout(() => {
            const y = scrollY.get();
            const p = (y % SCROLL_PER_PAGE) / SCROLL_PER_PAGE;
            const pageIndex = Math.floor(y / SCROLL_PER_PAGE);
            
            // "Less than 5%" logic
            const kickThreshold = 0.05; // 5% start
            const snapFinishThreshold = 0.95; // 95% done

            // Helper to animate
            const snapTo = (target: number) => {
                // Slower duration for auto-snap to feel deliberate
                animate(scrollY, target, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
            };

            // SCROLLING DOWN
            if (lastDelta.current > 0) {
                // Kick: User moved > 0% but < 5% -> Treat as "Go Next"
                if (p > 0 && p < kickThreshold) {
                    snapTo((pageIndex + 1) * SCROLL_PER_PAGE);
                } 
                // Snap Finish: User moved > 95% -> Finish the job
                else if (p > snapFinishThreshold) {
                    snapTo((pageIndex + 1) * SCROLL_PER_PAGE);
                }
            } 
            // SCROLLING UP
            else if (lastDelta.current < 0) {
                 // Kick Back: User moved up slightly from bottom (progress > 95%) -> Treat as "Go Prev"
                 if (p > snapFinishThreshold) {
                    snapTo(pageIndex * SCROLL_PER_PAGE);
                 }
                 // Snap Finish Back: User moved up almost to top (< 5%) -> Finish
                 else if (p < kickThreshold) {
                    snapTo(pageIndex * SCROLL_PER_PAGE);
                 }
            }
        }, 100); // Quick check
    }
  }, [scrollY, isTerminalOpen, isLoading, maxScroll]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);


  const navigateTo = (index: number) => {
      animate(scrollY, index * SCROLL_PER_PAGE, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
  };

  if (isLoading) {
    return <BootScreen />;
  }

  return (
    <div className="w-screen h-screen bg-[#050505] text-gray-800 overflow-hidden relative font-sans selection:bg-primary selection:text-white">
      <CursorCanvas />
      
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 w-full z-50 md:hidden flex justify-between items-center px-4 py-3 bg-white/90 backdrop-blur-md border-b border-gray-200">
          <div className="font-mono text-xs font-bold tracking-widest text-primary">
              0{activeSectionIndex + 1} // {SECTIONS[activeSectionIndex].title}
          </div>
          <div className="flex gap-4 text-xs font-mono text-gray-400">
             <button disabled={activeSectionIndex === 0} onClick={() => navigateTo(activeSectionIndex - 1)} className="disabled:opacity-30 p-2">PREV</button>
             <button disabled={activeSectionIndex === SECTIONS.length - 1} onClick={() => navigateTo(activeSectionIndex + 1)} className="disabled:opacity-30 p-2">NEXT</button>
          </div>
      </div>
      
      {/* Navigation Rail - Desktop */}
      <NavRail current={activeSectionIndex} total={SECTIONS.length} onChange={navigateTo} />

      {/* STACKED SECTIONS RENDERER */}
      <div className="w-full h-full relative perspective-[1200px]">
         {SECTIONS.map((section, index) => (
             <SectionPanel 
                key={section.id}
                index={index}
                total={SECTIONS.length}
                scrollY={smoothScrollY}
                Component={section.component}
             />
         ))}
      </div>

      {/* Floating Terminal Trigger */}
      <button 
        onClick={() => setIsTerminalOpen(true)}
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

// --- SUB-COMPONENT: SECTION PANEL ---
// Handles the 1:1 "Split" reveal based on scroll position
const SectionPanel = ({ index, total, scrollY, Component }: { index: number, total: number, scrollY: any, Component: any }) => {
    
    // Logic:
    // Page 0 is base.
    // Page 1 reveals over Page 0 when scroll is between 0 and 1000.
    // Page 2 reveals over Page 1 when scroll is between 1000 and 2000.
    
    // The "start" of this page's reveal animation
    const startRange = (index - 1) * SCROLL_PER_PAGE;
    // The "end" of this page's reveal (fully open)
    const endRange = index * SCROLL_PER_PAGE;
    // The point where this page starts getting covered by the *next* page
    const exitRange = (index + 1) * SCROLL_PER_PAGE;

    // Calculate Progress (0 to 1) for opening this page
    const openProgress = useTransform(
        scrollY,
        [startRange, endRange],
        [0, 1] // 0 = closed (line), 1 = open (full)
    );

    // Calculate 'inset' clip path. 
    // At 0 progress: inset is 50% (meets in middle).
    // At 1 progress: inset is 0% (fully open).
    const clipInset = useTransform(openProgress, (v) => {
        // Only apply clip effect if we are not the base page (index 0)
        if (index === 0) return 'inset(0% 0 0% 0)'; 
        // Clamp v between 0 and 1
        const progress = Math.max(0, Math.min(1, v));
        const gap = 50 * (1 - progress);
        return `inset(${gap}% 0 ${gap}% 0)`;
    });

    // Opacity/Dimming for Depth effect when this page is being covered by the NEXT one
    const brightness = useTransform(
        scrollY,
        [endRange, exitRange],
        [1, 0.4] // Dim to 0.4 brightness as next page covers it
    );
    
    const scale = useTransform(
        scrollY,
        [endRange, exitRange],
        [1, 0.95] // Slight scale down as it goes to background
    );

    // Border Opacity: The glowing line should fade out when fully open
    const borderOpacity = useTransform(openProgress, [0.9, 1], [1, 0]);

    // Z-Index: Higher index = Higher layer
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
             {/* The glowing split line (Top & Bottom borders) */}
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


// --- SUB-COMPONENTS (Pages) ---

// 1. HERO PAGE
function HeroSection() {
    return (
    <div className="h-full w-full relative flex flex-col overflow-hidden bg-bg">
        <HeroHUD />
        
        {/* Logo */}
        <div className="absolute top-16 left-6 md:top-8 md:left-8 z-30">
            <div className="font-mono font-bold text-sm md:text-lg tracking-wider pointer-events-auto inline-block bg-white/50 backdrop-blur-sm px-3 py-1 rounded border border-transparent">
                <span className="text-primary">[</span> <ScrambleText text="NB.SYS" className="text-black" /> <span className="text-primary">]</span>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8 items-center justify-center relative z-20 scrollable-content overflow-y-auto pt-24 md:pt-0">
            
            {/* TEXT */}
            <div className="order-2 md:order-1 flex flex-col justify-center items-start w-full md:w-1/2">
                 <motion.div 
                    initial={{ opacity: 0, x: -50 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="w-full relative z-20"
                 >
                    <div className="inline-flex items-center gap-2 mb-4 border-l-2 border-primary pl-4">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="font-mono text-[10px] md:text-xs font-bold tracking-widest text-gray-500">AVAILABLE FOR HIRE</span>
                    </div>
                    
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-6 text-black text-left">
                        DEVOPS <br/> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">ARCHITECT</span>
                    </h1>
                    
                    <p className="max-w-md font-mono text-sm text-gray-600 leading-relaxed mb-8 text-left">
                        Building self-healing infrastructure. Transforming chaotic systems into scalable, cost-effective engines using Kubernetes & Terraform.
                    </p>
                    
                    {/* BUTTONS ROW */}
                    <div className="flex gap-4">
                        <GlitchButton text="PROJECTS" icon={<TerminalIcon size={16} />} />
                        <GlitchButton 
                            text="DOWNLOAD CV" 
                            icon={<Download size={16} />} 
                            href="https://drive.google.com/file/d/1oU43XtO0xSjEs0uk-5vBNXsn5FRsXbI_/view?usp=sharing"
                            className="bg-white text-black border-black/10 hover:bg-gray-100"
                        />
                    </div>
                 </motion.div>
            </div>

            {/* CARD */}
            <div className="order-1 md:order-2 flex justify-center items-center w-full md:w-1/2">
                <div className="w-full max-w-[320px] md:max-w-[450px]">
                    <HeroIdentity />
                </div>
            </div>
        </div>

        {/* Footer Stats - Merged into Hero */}
        <div className="relative z-20 w-full bg-white/50 backdrop-blur-md border-t border-gray-200">
            <StatsSection />
        </div>
    </div>
    );
}

// 2. SKILLS PAGE
function SkillsWrapper() {
    return (
    <div className="h-full w-full overflow-y-auto flex items-center bg-bg scrollable-content py-20 md:py-0">
        <div className="w-full">
             <SkillsMatrix />
        </div>
    </div>
    );
}

// 3. CODE PAGE (Alignment Fixed)
function InfraSection() {
    return (
    <div className="h-full w-full overflow-y-auto bg-[#f4f4f5] scrollable-content custom-scrollbar-hide">
        {/* Min-h-full ensures vertically centered if content is small, but scrolls if tall */}
        <div className="min-h-full flex flex-col justify-center w-full py-24 md:py-0">
            <InfrastructureCode />
        </div>
    </div>
    );
}

// 4. LOGS PAGE
function ProjectsSection() {
    return (
    <div className="h-full w-full overflow-y-auto bg-bg custom-scrollbar-hide scrollable-content pt-24 pb-0 flex flex-col">
        <div className="container mx-auto px-6 md:px-12 flex-grow">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
                <div>
                     <h2 className="text-5xl md:text-7xl font-display font-bold text-black opacity-10 hidden md:block">LOGS</h2>
                     <h2 className="text-4xl md:text-5xl font-display font-bold text-black md:-mt-10 md:ml-1">MISSION LOGS</h2>
                </div>
                <div className="font-mono text-xs text-primary font-bold mt-2 md:mt-0">
                    [ ACCESS_LEVEL: PUBLIC ]
                </div>
            </div>
            
            {/* Grid */}
            <BentoGrid />
        </div>
        
        {/* Merged Tech Stack at bottom */}
        <div className="mt-12 w-full">
             <div className="container mx-auto px-6 mb-4">
                 <div className="flex items-center gap-2">
                    <span className="w-16 h-[1px] bg-primary"></span>
                    <span className="font-mono text-xs font-bold text-primary tracking-widest">ARSENAL</span>
                 </div>
             </div>
             <TechStack />
        </div>
    </div>
    );
}

// 5. SERVICES & CORE
function ServicesWrapper() {
    return (
    <div className="h-full w-full overflow-y-auto bg-white flex flex-col scrollable-content">
         <div className="w-full pt-20 pb-10 flex-grow">
            <ServicesSection />
         </div>
         <div className="w-full bg-bg border-t border-gray-200">
             <PhilosophySection />
         </div>
    </div>
    );
}


// --- UTILITY COMPONENTS ---

function BootScreen() {
    return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center font-mono text-primary z-[9999]">
    <div className="text-4xl font-bold mb-8 animate-pulse">NB.SYS</div>
    <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
        className="h-full bg-primary"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        />
    </div>
    <div className="mt-4 text-[10px] text-gray-500 font-mono tracking-widest">
        INITIALIZING CORE KERNEL...
    </div>
    </div>
    );
}

function NavRail({ current, total, onChange }: { current: number, total: number, onChange: (i: number) => void }) {
    return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 items-center">
        {SECTIONS.map((section, idx) => (
            <button
                key={section.id}
                onClick={() => onChange(idx)}
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
    </div>
    );
}

export default App;
