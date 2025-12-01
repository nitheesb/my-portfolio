import React, { useState, useEffect, Suspense, lazy, useRef } from 'react';
import { Menu, X, Terminal as TerminalIcon, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

import { PROJECTS } from './constants';
import Terminal from './components/Terminal';
import CursorCanvas from './components/CursorCanvas';
import StatsSection from './components/StatsSection';
import ScrambleText from './components/ScrambleText';
import GlitchButton from './components/GlitchButton';
import HeroIdentity from './components/HeroIdentity';
import HeroHUD from './components/HeroHUD';
import SectionWrapper from './components/SectionWrapper';

// Lazy Load Heavy Components
const PhilosophySection = lazy(() => import('./components/PhilosophySection'));
const SkillsMatrix = lazy(() => import('./components/SkillsMatrix'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const InfrastructureCode = lazy(() => import('./components/InfrastructureCode'));

// Konami Code Sequence
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
       <motion.div style={{ y: y1, rotate }} className="absolute top-[10%] left-[5%] text-gray-200/50">
          <div className="w-64 h-64 border border-dashed border-gray-300 rounded-full"></div>
       </motion.div>
       <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[10%] text-gray-200/50">
          <div className="w-32 h-32 border border-gray-300 transform rotate-45"></div>
       </motion.div>
       <div className="absolute top-[70%] left-[20%] w-40 h-[1px] bg-gray-200"></div>
    </div>
  );
};

const App: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center font-mono text-primary z-[9999]">
        <div className="text-xl mb-4 animate-pulse font-bold">INITIALIZING CORE SYSTEMS...</div>
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
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
      
      {/* Navigation */}
      <header className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 h-[70px]">
        <div className="container mx-auto px-6 h-full flex justify-between items-center">
          <div className="font-mono font-bold text-lg tracking-wider hover:text-primary transition-colors cursor-pointer group" aria-label="Logo">
            <span className="text-primary group-hover:text-black transition-colors">[</span> <ScrambleText text="NB.SYS" className="text-black" /> <span className="text-primary group-hover:text-black transition-colors">]</span>
          </div>
          
          <nav className="hidden md:flex gap-8 font-mono text-sm font-bold text-gray-600">
            <a href="#skills" className="hover:text-primary transition-colors"><ScrambleText text="MODULES" /></a>
            <a href="#projects" className="hover:text-primary transition-colors"><ScrambleText text="LOGS" /></a>
            <a href="#services" className="hover:text-primary transition-colors"><ScrambleText text="SERVICES" /></a>
            <a href="#contact" className="border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-white transition-all">
              INITIATE_CONTACT
            </a>
          </nav>

          <button className="md:hidden text-black" onClick={() => setIsMenuOpen(true)} aria-label="Open Menu">
            <Menu />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-50 flex flex-col justify-center items-center gap-8"
          >
            <button className="absolute top-6 right-6 text-gray-500" onClick={() => setIsMenuOpen(false)} aria-label="Close Menu">
              <X size={32} />
            </button>
            <a href="#skills" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display uppercase tracking-widest hover:text-primary font-bold">System_Modules</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display uppercase tracking-widest hover:text-primary font-bold">Mission_Logs</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display uppercase tracking-widest hover:text-primary font-bold">Services</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display uppercase tracking-widest hover:text-primary font-bold">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-[70px]"> 
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative min-h-[calc(100vh-70px)] flex items-center overflow-hidden">
             <HeroHUD />
            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full py-12 lg:py-0">
                
                {/* --- LEFT COLUMN --- */}
                <div className="lg:col-span-7 flex flex-col justify-center relative">
                    {/* Decor Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-200 hidden lg:block">
                        <div className="absolute top-[20%] left-[-2px] w-[5px] h-[40px] bg-primary animate-pulse"></div>
                    </div>

                    <div className="lg:pl-10">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 bg-white border border-gray-200 px-4 py-1.5 rounded-full mb-8 shadow-sm"
                        >
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="font-mono text-xs text-green-600 tracking-wider font-bold">SYSTEM ONLINE // BKK</span>
                        </motion.div>

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

                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 0.5 }}
                            className="max-w-xl border-l-2 border-primary pl-6 mb-10"
                        >
                            <p className="font-mono text-gray-600 text-sm md:text-base leading-relaxed font-medium">
                                I engineer resilience. Transforming chaotic infrastructure into scalable, cost-effective engines using <span className="text-black font-bold">Kubernetes</span> and <span className="text-black font-bold">GitOps</span>.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: 0.8 }}
                            className="flex flex-wrap gap-4"
                        >
                            <GlitchButton text="MISSION LOGS" href="#projects" icon={<TerminalIcon size={18} />} />
                            <a href="/resume.pdf" target="_blank" className="px-8 py-4 border border-gray-300 font-mono text-sm font-bold text-gray-500 hover:text-black hover:border-black transition-all hover:bg-gray-50">
                                DOWNLOAD CV
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN --- */}
                <div className="lg:col-span-5 flex items-center justify-center relative min-h-[500px]">
                    <HeroIdentity />
                </div>
            </div>
        </section>

        <StatsSection />
        
        {/* NEW ORDER: SKILLS FIRST */}
        <SectionWrapper>
             <Suspense fallback={null}>
                <SkillsMatrix />
             </Suspense>
        </SectionWrapper>

        {/* THEN CODE */}
        <SectionWrapper>
            <Suspense fallback={null}>
                <InfrastructureCode />
            </Suspense>
        </SectionWrapper>

        {/* THEN PROJECTS */}
        <SectionWrapper id="projects">
           <Suspense fallback={<div className="h-40 flex items-center justify-center text-primary font-mono">LOADING LOGS...</div>}>
               <div className="py-20 container mx-auto px-6">
                  <div className="flex items-center gap-4 mb-16">
                      <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-black">// OPERATION_LOGS</h2>
                      <div className="h-[1px] bg-gray-200 flex-1"></div>
                      <div className="font-mono text-xs text-gray-400 font-bold">CONFIDENTIALITY: LOW</div>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                      {PROJECTS.map((project, index) => (
                          <motion.div
                              key={project.id}
                              whileHover={{ y: -5 }}
                              className="bg-white border border-gray-200 p-0 md:p-8 rounded-none md:rounded-lg overflow-hidden group hover:border-primary hover:shadow-lg transition-all"
                          >
                             {/* Mobile Card Layout */}
                             <div className="md:hidden">
                                <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
                                    <span className="font-mono text-xs text-primary font-bold">{project.id}</span>
                                    <span className="text-[10px] bg-gray-200 px-2 py-1 rounded text-gray-600 font-bold">{project.period}</span>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-black mb-1">{project.company}</h3>
                                    <div className="text-primary text-sm font-mono mb-4 font-bold">{project.role}</div>
                                    
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-[10px] px-2 py-1 border border-gray-200 text-gray-500 rounded-sm font-bold bg-gray-50">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="space-y-4 font-mono text-sm text-gray-600">
                                        <div><strong className="text-black">Mission:</strong> {project.description.mission}</div>
                                        <div><strong className="text-black">Outcome:</strong> {project.description.outcome}</div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
                                        {project.stats.map((stat, sIdx) => (
                                            <div key={sIdx} className="text-center">
                                                <div className="text-lg font-bold" style={{ color: stat.color === '#ffffff' ? '#000' : stat.color }}>{stat.value}</div>
                                                <div className="text-[9px] text-gray-400 uppercase font-bold">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                             </div>

                             {/* Desktop Layout */}
                             <div className="hidden md:grid md:grid-cols-[150px_1fr_200px] gap-8">
                                 <div className="font-mono text-sm text-gray-400 pt-2 font-bold">
                                     <div className="text-primary mb-2">{project.id}</div>
                                     <div>{project.period}</div>
                                 </div>
                                 
                                 <div>
                                     <h3 className="text-2xl font-bold font-display mb-2 text-black group-hover:text-primary transition-colors">{project.company} <span className="text-gray-400 font-normal">/ {project.role}</span></h3>
                                     <div className="flex gap-2 mb-4">
                                         {project.tags.map(tag => (
                                             <span key={tag} className="px-2 py-0.5 border border-gray-200 rounded text-xs text-gray-500 font-mono font-bold bg-gray-50">
                                                 {tag}
                                             </span>
                                         ))}
                                     </div>
                                     <div className="space-y-2 text-gray-600 font-mono text-sm leading-relaxed">
                                         <p><span className="text-black font-bold">&gt; Mission:</span> {project.description.mission}</p>
                                         <p><span className="text-black font-bold">&gt; Execution:</span> {project.description.execution}</p>
                                         <p><span className="text-black font-bold">&gt; Outcome:</span> {project.description.outcome}</p>
                                     </div>
                                 </div>

                                 <div className="flex flex-col justify-center gap-4 border-l border-gray-100 pl-8">
                                     {project.stats.map((stat, sIdx) => (
                                         <div key={sIdx}>
                                             <div className="text-2xl font-display font-bold" style={{ color: stat.color === '#ffffff' ? '#000' : stat.color }}>{stat.value}</div>
                                             <div className="text-xs font-mono text-gray-400 tracking-wider font-bold">{stat.label}</div>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                          </motion.div>
                      ))}
                  </div>
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

      </main>

      {/* Floating Elements */}
      <button 
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-24 right-6 z-40 bg-black border border-primary text-primary p-4 rounded-full shadow-[0_0_20px_rgba(255,94,0,0.3)] hover:scale-110 hover:bg-primary hover:text-white transition-all duration-300 group"
        aria-label="Open Terminal"
      >
        <TerminalIcon size={24} className="group-hover:rotate-12 transition-transform" />
      </button>

      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

      {/* FOOTER */}
      <footer className="fixed bottom-0 w-full z-50 bg-white/90 backdrop-blur-lg border-t border-gray-200 py-3 md:py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
            <div className="flex gap-6">
                <a href="https://github.com/nitheesb" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-primary transition-colors font-bold">
                    <Github size={14} /> GITHUB
                </a>
                <a href="https://www.linkedin.com/in/nithees-balaji" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-primary transition-colors font-bold">
                    <Linkedin size={14} /> LINKEDIN
                </a>
                <a href="mailto:nitheesbalaji@gmail.com" className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-primary transition-colors font-bold">
                    <Mail size={14} /> EMAIL
                </a>
                <a href="tel:+66661177370" className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-primary transition-colors font-bold">
                    <Phone size={14} /> +66 6611 77370
                </a>
            </div>
            <div className="font-mono text-[10px] text-gray-400 hidden md:block font-bold">
                SYSTEM_ID: NB_PF_2025 // LOCATION: BANGKOK, TH
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;