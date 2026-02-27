import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal as TerminalIcon, Download } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate, useSpring } from 'framer-motion';

import Terminal from './components/Terminal';
import BootSequence from './components/BootSequence';
import ErrorBoundary from './components/ErrorBoundary';
import CursorCanvas from './components/CursorCanvas';
import StatsSection from './components/StatsSection';
import ScrambleText from './components/ScrambleText';
import GlitchButton from './components/GlitchButton';
import GlitchText from './components/GlitchText';
import HeroIdentity from './components/HeroIdentity';
import Scanline from './components/Scanline';
import BentoGrid from './components/BentoGrid';
import TechStack from './components/TechStack';
import SkillsMatrix from './components/SkillsMatrix';
import ServicesSection from './components/ServicesSection';
import HolographicScene from './components/HolographicScene';
import MobileMenu from './components/MobileMenu';
import ScrollIndicator from './components/ScrollIndicator';
import { AudioProvider } from './components/AudioProvider';
import { useAudioFeedback } from './hooks/useAudioFeedback';
import ContactSection from './components/ContactSection';
import ClusterVisual from './components/ClusterVisual';
import MobileApp from './components/MobileApp';
import { useDeviceType } from './hooks/useDeviceType';



const SCROLL_PER_PAGE = 1200;
const SCROLL_COOLDOWN = 400;
const THRESHOLD_TO_SNAP = 120;

const SECTIONS = [
    { id: 'hero', title: 'HOME', component: HeroSection, bg: 'mesh-gradient' },
    { id: 'skills', title: 'SYSTEMS', component: SkillsWrapper, bg: 'bg-[#0a0a0a]' },
    { id: 'projects', title: 'LOGS', component: ProjectsSection, bg: 'bg-bg' },
    { id: 'services', title: 'CORE', component: ServicesWrapper, bg: 'bg-white' },
    { id: 'contact', title: 'SIGNAL', component: ContactSection, bg: 'bg-bg' },
];



function App() {
    const { isMobile } = useDeviceType();

    if (isMobile) {
        return <MobileApp />;
    }

    return <DesktopApp />;
}

function DesktopApp() {
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { playClick, playHover } = useAudioFeedback();

    const scrollY = useMotionValue(0);
    const smoothScrollY = useSpring(scrollY, { damping: 30, stiffness: 300, mass: 0.8 });

    const lastSectionChange = useRef(Date.now());
    const isAnimating = useRef(false);
    const accumulatedDelta = useRef(0);

    const maxScroll = (SECTIONS.length - 1) * SCROLL_PER_PAGE;

    // Power-Line SVG path logic
    const powerLineProgress = useTransform(smoothScrollY, [0, maxScroll], [0, 1000]);
    const powerLineOffset = useTransform(powerLineProgress, (v) => 1000 - v);



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
            duration: 0.6,
            ease: [0.25, 1, 0.5, 1],
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

        if (scrollable) {
            const el = scrollable as HTMLElement;
            const isAtTop = el.scrollTop <= 5;
            const isAtBottom = Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) <= 5;
            const isOverflowing = el.scrollHeight > el.clientHeight;

            if (isOverflowing) {
                if (e.deltaY > 0 && !isAtBottom) return;
                if (e.deltaY < 0 && !isAtTop) return;
            }
        }

        e.preventDefault();

        const delta = Math.abs(e.deltaY) > 50 ? Math.sign(e.deltaY) * 50 : e.deltaY;
        accumulatedDelta.current += delta;

        if (Math.abs(accumulatedDelta.current) > THRESHOLD_TO_SNAP) {
            if (accumulatedDelta.current > 0) {
                navigateTo(activeSectionIndex + 1);
            } else {
                navigateTo(activeSectionIndex - 1);
            }
            accumulatedDelta.current = 0;
        }

        const timeout = (window as any)._scrollResetTimeout;
        if (timeout) clearTimeout(timeout);
        (window as any)._scrollResetTimeout = setTimeout(() => {
            accumulatedDelta.current = 0;
        }, 200);

    }, [scrollY, isTerminalOpen, isLoading, activeSectionIndex, navigateTo]);

    useEffect(() => {
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [handleWheel]);

    if (isLoading) {
        return (
            <ErrorBoundary>
                <BootSequence onComplete={() => setIsLoading(false)} />
            </ErrorBoundary>
        );
    }

    return (
        <AudioProvider>
            <div className="w-screen h-screen bg-bg text-secondary overflow-hidden relative font-sans selection:bg-primary selection:text-white">
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <ClusterVisual />
                </div>
                <CursorCanvas />
                <Scanline />


                {/* 9. SVG Power-Line Scroll Progress */}
                <div className="fixed left-6 top-1/2 -translate-y-1/2 h-[70vh] w-4 z-[100] hidden md:flex items-center justify-center pointer-events-none">
                    <svg width="6" height="100%" viewBox="0 0 6 1000" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
                        <path d="M3 0V1000" stroke="rgba(255, 94, 0, 0.1)" strokeWidth="1" />
                        <motion.path
                            d="M3 0V1000"
                            stroke="#ff5e00"
                            strokeWidth="2.5"
                            strokeDasharray="1000"
                            style={{ strokeDashoffset: powerLineOffset }}
                            className="drop-shadow-[0_0_8px_rgba(255,94,0,0.8)]"
                        />
                        {SECTIONS.map((_, i) => (
                            <g key={i}>
                                <circle
                                    cx="3"
                                    cy={i * (1000 / (SECTIONS.length - 1))}
                                    r={activeSectionIndex === i ? "4" : "2.5"}
                                    fill={activeSectionIndex >= i ? "#ff5e00" : "rgba(255, 94, 0, 0.2)"}
                                    className="transition-all duration-500"
                                />
                                {activeSectionIndex === i && (
                                    <circle
                                        cx="3"
                                        cy={i * (1000 / (SECTIONS.length - 1))}
                                        r={8}
                                        stroke="#ff5e00"
                                        strokeWidth="1"
                                        className="animate-ping opacity-20"
                                    />
                                )}
                            </g>
                        ))}
                    </svg>
                </div>

                <header className="fixed top-0 left-0 w-full z-50 md:hidden flex justify-between items-center px-4 py-3 bg-black/90 backdrop-blur-md border-b-2 border-primary/30">
                    {/* Industrial Corner Screws */}
                    <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-primary/50 rounded-full"></div>
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary/50 rounded-full"></div>

                    <div className="font-mono text-xs font-bold tracking-widest text-primary">
                        0{activeSectionIndex + 1} // {SECTIONS[activeSectionIndex].title}
                    </div>
                    <button
                        onClick={() => { playClick(); setIsMobileMenuOpen(true); }}
                        className="font-mono text-xs text-primary border border-primary/50 px-3 py-1.5 rounded bg-black/50 hover:bg-primary/20 transition-all"
                        aria-label="Open menu"
                    >
                        MENU
                    </button>
                </header>

                <MobileMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                    currentSection={activeSectionIndex}
                    onNavigate={(i) => { playClick(); navigateTo(i); }}
                />

                <NavRail current={activeSectionIndex} total={SECTIONS.length} onChange={(i) => { playClick(); navigateTo(i); }} />

                <main className="w-full h-full relative perspective-[1200px]">
                    {SECTIONS.map((section, index) => (
                        <SectionPanel
                            key={section.id}
                            index={index}
                            total={SECTIONS.length}
                            scrollY={smoothScrollY}
                            Component={section.component}
                            onNavigate={navigateTo}
                            bg={section.bg}
                        />
                    ))}
                </main>

                <button
                    onClick={() => { playClick(); setIsTerminalOpen(true); }}
                    onMouseEnter={playHover}
                    aria-label="Open Command Terminal"
                    className="fixed bottom-8 right-8 z-[100] bg-black/80 backdrop-blur-sm border border-primary/50 text-primary w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,94,0,0.2)] hover:scale-110 hover:bg-primary hover:text-white hover:shadow-[0_0_40px_rgba(255,94,0,0.4)] transition-all duration-300 group"
                >
                    <TerminalIcon size={20} className="md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
                </button>

                <Terminal
                    isOpen={isTerminalOpen}
                    onClose={() => setIsTerminalOpen(false)}
                    onAction={(cmd) => console.log(cmd)}
                />
            </div>
        </AudioProvider>
    );
}

const SectionPanel = ({ index, total, scrollY, Component, onNavigate, bg }: { index: number, total: number, scrollY: any, Component: any, onNavigate: (i: number) => void, bg: string }) => {
    const startRange = (index - 1) * SCROLL_PER_PAGE;
    const endRange = index * SCROLL_PER_PAGE;
    const exitRange = (index + 1) * SCROLL_PER_PAGE;

    const openProgress = useTransform(scrollY, [startRange, endRange], [0, 1]);
    const brightnessRaw = useTransform(scrollY, [endRange, exitRange], [1, 0.6]);
    const scale = useTransform(scrollY, [endRange, exitRange], [1, 0.97]);
    const borderOpacity = useTransform(openProgress, [0.9, 1], [1, 0]);

    const clipInset = useTransform(openProgress, (v) => {
        if (index === 0) return 'inset(0% 0 0% 0)';
        const progress = Math.max(0, Math.min(1, v));
        const gap = 50 * (1 - progress);
        return `inset(${gap}% 0 ${gap}% 0)`;
    });

    const brightnessFilter = useTransform(brightnessRaw, (v) => `brightness(${v})`);

    return (
        <motion.div
            className={`absolute inset-0 w-full h-full ${bg} will-change-transform`}
            style={{
                zIndex: index,
                clipPath: clipInset,
                filter: brightnessFilter,
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
                <Component onNavigate={onNavigate} />
            </div>
        </motion.div>
    );
};

function HeroSection({ onNavigate }: { onNavigate: (i: number) => void }) {
    const { playClick } = useAudioFeedback();
    return (
        <section className="h-full w-full relative flex flex-col overflow-hidden">
            <HolographicScene />

            {/* Enhanced gradient mesh background */}
            <div className="absolute inset-0 pointer-events-none z-[5]">
                <div className="absolute top-0 right-0 w-[70%] h-[70%] bg-gradient-radial from-primary/[0.06] to-transparent rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-radial from-primary/[0.04] to-transparent rounded-full blur-[100px]" />
            </div>

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
                        <div className="inline-flex items-center gap-2 mb-6 glass-card pl-4 pr-5 py-2 rounded-full">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true"></span>
                            <span className="font-mono text-[10px] md:text-xs font-bold tracking-widest text-gray-500">AVAILABLE FOR HIGH-SCALE MISSIONS</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-6 text-black text-left">
                            <GlitchText text="DEVOPS" as="span" /> <br />
                            <span className="gradient-text">
                                <GlitchText text="ARCHITECT" as="span" />
                            </span>
                        </h1>

                        <p className="max-w-md font-mono text-sm text-gray-600 leading-relaxed mb-8 text-left">
                            I am <span className="text-black font-bold">Nithees Balaji Mohan</span>. I build self-healing infrastructure. Transforming chaotic systems into scalable, cost-effective engines using Kubernetes & Terraform.
                        </p>

                        <div className="flex gap-4">
                            <GlitchButton
                                text="MISSION LOGS"
                                icon={<TerminalIcon size={16} />}
                                aria-label="View Projects"
                                onClick={() => { playClick(); onNavigate(2); }}
                            />
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

            <div className="relative z-20 w-full glass border-t border-white/30">
                <StatsSection />
            </div>

            <ScrollIndicator />
        </section>
    );
}

function SkillsWrapper() {
    return (
        <div className="h-full w-full overflow-y-auto flex items-center bg-[#0a0a0a] scrollable-content py-20 md:py-0">
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
        <div className="h-full w-full overflow-y-auto flex flex-col scrollable-content mesh-gradient">
            <div className="w-full pt-20 pb-10 flex-grow">
                <ServicesSection />
            </div>
        </div>
    );
}






function NavRail({ current, total, onChange }: { current: number, total: number, onChange: (i: number) => void }) {
    const { playHover } = useAudioFeedback();
    return (
        <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3 items-center glass rounded-2xl p-3 shadow-lg" aria-label="Main Navigation">
            {SECTIONS.map((section, idx) => (
                <button
                    key={section.id}
                    onClick={() => onChange(idx)}
                    onMouseEnter={playHover}
                    aria-label={`Go to ${section.title} section`}
                    aria-current={current === idx ? 'page' : undefined}
                    className="group flex items-center gap-4 relative py-1.5 w-8 justify-center"
                >
                    <span className={`absolute right-10 font-mono text-[10px] font-bold tracking-widest transition-all duration-300 whitespace-nowrap px-2 py-1 rounded-md ${current === idx ? 'opacity-100 text-primary translate-x-0 bg-primary/10' : 'opacity-0 text-gray-400 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                        {section.title}
                    </span>
                    <div className={`transition-all duration-500 rounded-full ${current === idx ? 'w-2 h-8 bg-primary shadow-[0_0_12px_rgba(255,94,0,0.4)]' : 'w-1.5 h-1.5 bg-gray-300 group-hover:bg-primary/50 group-hover:scale-125'}`}></div>
                </button>
            ))}
            <div className="w-[1px] h-6 bg-gray-200/50 my-1"></div>
            <div className="font-mono text-[9px] text-gray-400 font-bold tracking-wider">
                {String(current + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </div>
        </nav>
    );
}

export default App;