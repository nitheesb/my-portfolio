import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Menu, X, Terminal as TerminalIcon, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { PROJECTS } from './constants';
import Terminal from './components/Terminal';
import CursorCanvas from './components/CursorCanvas';
import StatsSection from './components/StatsSection';
import ScrambleText from './components/ScrambleText';
import GlitchButton from './components/GlitchButton';
import HeroIdentity from './components/HeroIdentity';

// Lazy Load Heavy Components for Efficiency
const PhilosophySection = lazy(() => import('./components/PhilosophySection'));
const SkillsMatrix = lazy(() => import('./components/SkillsMatrix'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const InfrastructureCode = lazy(() => import('./components/InfrastructureCode'));

// Konami Code Sequence
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

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
          // Trigger Easter Egg
          document.body.classList.toggle('hacker-mode');
          alert('SYSTEM HACKED: GOD MODE ENABLED');
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
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center font-mono text-primary z-[9999]">
        <div className="text-xl mb-4 animate-pulse">INITIALIZING CORE SYSTEMS...</div>
        <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
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
    <div className="min-h-screen bg-bg text-gray-200 selection:bg-primary/30 selection:text-white relative pb-32 overflow-x-hidden">
      <CursorCanvas />
      
      {/* Navigation */}
      <header className="fixed top-0 w-full z-40 bg-bg/90 backdrop-blur-md border-b border-border h-[70px]">
        <div className="container mx-auto px-6 h-full flex justify-between items-center">
          <div className="font-mono font-bold text-lg tracking-wider hover:text-primary transition-colors cursor-pointer group" aria-label="Logo">
            <span className="text-primary group-hover:text-white transition-colors">[</span> <ScrambleText text="NB.SYS" /> <span className="text-primary group-hover:text-white transition-colors">]</span>
          </div>
          
          <nav className="hidden md:flex gap-8 font-mono text-sm">
            <a href="#skills" className="hover:text-primary transition-colors"><ScrambleText text="MODULES" /></a>
            <a href="#projects" className="hover:text-primary transition-colors"><ScrambleText text="LOGS" /></a>
            <a href="#services" className="hover:text-primary transition-colors"><ScrambleText text="SERVICES" /></a>
            <a href="#contact" className="border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-black transition-all">
              INITIATE_CONTACT
            </a>
          </nav>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)} aria-label="Open Menu">
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
            className="fixed inset-0 bg-black z-50 flex flex-col justify-center items-center gap-8"
          >
            <button className="absolute top-6 right-6 text-gray-500" onClick={() => setIsMenuOpen(false)} aria-label="Close Menu">
              <X size={32} />
            </button>
            <a href="#skills" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display uppercase tracking-widest hover:text-primary">System_Modules</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display uppercase tracking-widest hover:text-primary">Mission_Logs</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display uppercase tracking-widest hover:text-primary">Services</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display uppercase tracking-widest hover:text-primary">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-[70px]"> {/* Offset for fixed header */}
        
        {/* ================= HERO SECTION (GRID LAYOUT) ================= */}
        <section className="relative min-h-[calc(100vh-70px)] flex items-center overflow-hidden">
            
            {/* Background Perspective Grid Floor */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_0%,rgba(255,94,0,0.1)_1px,transparent_2px),linear-gradient(90deg,transparent_0%,rgba(255,94,0,0.1)_1px,transparent_2px)] bg-[size:60px_60px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,transparent_100%)]" style={{ transform: 'perspective(1000px) rotateX(20deg) scale(1.5)' }}></div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full py-12 lg:py-0">
                
                {/* --- LEFT COLUMN: TEXT CONTENT (Cols 1-7) --- */}
                <div className="lg:col-span-7 flex flex-col justify-center relative">
                    
                    {/* Cyber Decor Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gray-800 to-transparent hidden lg:block">
                        <div className="absolute top-[20%] left-[-2px] w-[5px] h-[40px] bg-primary animate-pulse"></div>
                    </div>

                    <div className="lg:pl-10">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="font-mono text-xs text-green-400 tracking-wider">SYSTEM ONLINE // BKK</span>
                        </motion.div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-display font-bold leading-[0.85] mb-8 tracking-tighter">
                            <div className="text-white hover:text-gray-300 transition-colors">
                                <ScrambleText text="LEAD" autoStart={true} />
                            </div>
                            <div className="text-primary relative inline-block animate-glitch" data-text="DEVOPS">
                                DEVOPS
                            </div>
                            <div className="text-white hover:text-gray-300 transition-colors">
                                <ScrambleText text="ARCHITECT" autoStart={true} />
                            </div>
                        </h1>

                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 0.5 }}
                            className="max-w-xl border-l-2 border-primary/50 pl-6 mb-10"
                        >
                            <p className="font-mono text-gray-400 text-sm md:text-base leading-relaxed">
                                I engineer resilience. Transforming chaotic infrastructure into scalable, cost-effective engines using <span className="text-white">Kubernetes</span> and <span className="text-white">GitOps</span>.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: 0.8 }}
                            className="flex flex-wrap gap-4"
                        >
                            <GlitchButton text="MISSION LOGS" href="#projects" icon={<TerminalIcon size={18} />} />
                            <a href="/resume.pdf" target="_blank" className="px-8 py-4 border border-gray-700 font-mono text-sm font-bold text-gray-400 hover:text-white hover:border-white transition-all hover:bg-white/5">
                                DOWNLOAD CV
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: 3D HERO VISUAL (Cols 8-12) --- */}
                <div className="lg:col-span-5 flex items-center justify-center relative min-h-[500px]">
                    <HeroIdentity />
                </div>

            </div>
        </section>

        <StatsSection />
        
        <Suspense fallback={null}>
            <InfrastructureCode />
        </Suspense>

        <Suspense fallback={null}>
            <SkillsMatrix />
        </Suspense>

        <Suspense fallback={<div className="h-40 flex items-center justify-center text-primary font-mono">LOADING LOGS...</div>}>
           <section id="projects" className="py-20 container mx-auto px-6">
              <div className="flex items-center gap-4 mb-16">
                  <h2 className="text-3xl md:text-4xl font-display font-bold uppercase">// OPERATION_LOGS</h2>
                  <div className="h-[1px] bg-gray-800 flex-1"></div>
                  <div className="font-mono text-xs text-gray-600">CONFIDENTIALITY: LOW</div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                  {PROJECTS.map((project, index) => (
                      <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-surface border border-gray-800 p-0 md:p-8 rounded-none md:rounded-lg overflow-hidden group hover:border-gray-700 transition-all"
                      >
                         {/* Mobile Card Layout */}
                         <div className="md:hidden">
                            <div className="bg-gray-900/50 p-4 border-b border-gray-800 flex justify-between items-center">
                                <span className="font-mono text-xs text-primary">{project.id}</span>
                                <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400">{project.period}</span>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-white mb-1">{project.company}</h3>
                                <div className="text-primary text-sm font-mono mb-4">{project.role}</div>
                                
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-1 border border-gray-700 text-gray-400 rounded-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="space-y-4 font-mono text-sm text-gray-400">
                                    <div><strong className="text-gray-300">Mission:</strong> {project.description.mission}</div>
                                    <div><strong className="text-gray-300">Outcome:</strong> {project.description.outcome}</div>
                                </div>

                                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-gray-800 pt-4">
                                    {project.stats.map((stat, sIdx) => (
                                        <div key={sIdx} className="text-center">
                                            <div className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</div>
                                            <div className="text-[9px] text-gray-600 uppercase">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                         </div>

                         {/* Desktop Layout */}
                         <div className="hidden md:grid md:grid-cols-[150px_1fr_200px] gap-8">
                             <div className="font-mono text-sm text-gray-500 pt-2">
                                 <div className="text-primary mb-2">{project.id}</div>
                                 <div>{project.period}</div>
                             </div>
                             
                             <div>
                                 <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-primary transition-colors">{project.company} <span className="text-gray-500 font-normal">/ {project.role}</span></h3>
                                 <div className="flex gap-2 mb-4">
                                     {project.tags.map(tag => (
                                         <span key={tag} className="px-2 py-0.5 border border-gray-700 rounded text-xs text-gray-400 font-mono">
                                             {tag}
                                         </span>
                                     ))}
                                 </div>
                                 <div className="space-y-2 text-gray-400 font-mono text-sm leading-relaxed">
                                     <p><span className="text-white font-bold">&gt; Mission:</span> {project.description.mission}</p>
                                     <p><span className="text-white font-bold">&gt; Execution:</span> {project.description.execution}</p>
                                     <p><span className="text-white font-bold">&gt; Outcome:</span> {project.description.outcome}</p>
                                 </div>
                             </div>

                             <div className="flex flex-col justify-center gap-4 border-l border-gray-800 pl-8">
                                 {project.stats.map((stat, sIdx) => (
                                     <div key={sIdx}>
                                         <div className="text-2xl font-display font-bold" style={{ color: stat.color }}>{stat.value}</div>
                                         <div className="text-xs font-mono text-gray-600 tracking-wider">{stat.label}</div>
                                     </div>
                                 ))}
                             </div>
                         </div>
                      </motion.div>
                  ))}
              </div>
           </section>
        </Suspense>

        <Suspense fallback={null}>
            <ServicesSection />
        </Suspense>

        <Suspense fallback={null}>
            <PhilosophySection />
        </Suspense>

      </main>

      {/* Floating Elements */}
      <button 
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-24 right-6 z-40 bg-black border border-primary text-primary p-4 rounded-full shadow-[0_0_20px_rgba(255,94,0,0.3)] hover:scale-110 hover:bg-primary hover:text-black transition-all duration-300 group"
        aria-label="Open Terminal"
      >
        <TerminalIcon size={24} className="group-hover:rotate-12 transition-transform" />
      </button>

      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

      {/* FOOTER */}
      <footer className="fixed bottom-0 w-full z-50 bg-bg/80 backdrop-blur-lg border-t border-gray-800 py-3 md:py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
            <div className="flex gap-6">
                <a href="https://github.com/nitheesb" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors">
                    <Github size={14} /> GITHUB
                </a>
                <a href="https://www.linkedin.com/in/nithees-balaji" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors">
                    <Linkedin size={14} /> LINKEDIN
                </a>
                <a href="mailto:nitheesbalaji@gmail.com" className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors">
                    <Mail size={14} /> EMAIL
                </a>
                <a href="tel:+66661177370" className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors">
                    <Phone size={14} /> +66 6611 77370
                </a>
            </div>
            <div className="font-mono text-[10px] text-gray-600 hidden md:block">
                SYSTEM_ID: NB_PF_2025 // LOCATION: BANGKOK, TH
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;