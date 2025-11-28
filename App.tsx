import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal as TerminalIcon, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { PROJECTS } from './constants';
import Terminal from './components/Terminal';
import CursorCanvas from './components/CursorCanvas';
import PhilosophySection from './components/PhilosophySection';
import StatsSection from './components/StatsSection';
import SkillsMatrix from './components/SkillsMatrix';
import ServicesSection from './components/ServicesSection';
import ScrambleText from './components/ScrambleText';

const App: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Preloader Simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="min-h-screen bg-bg text-gray-200 selection:bg-primary/30 selection:text-white relative pb-32">
      <CursorCanvas />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-bg/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-mono font-bold text-lg tracking-wider hover:text-primary transition-colors cursor-pointer group">
            <span className="text-primary group-hover:text-white transition-colors">[</span> <ScrambleText text="NB.SYS" /> <span className="text-primary group-hover:text-white transition-colors">]</span>
          </div>
          
          <div className="hidden md:flex gap-8 font-mono text-sm">
            <a href="#skills" className="hover:text-primary transition-colors"><ScrambleText text="MODULES" /></a>
            <a href="#projects" className="hover:text-primary transition-colors"><ScrambleText text="LOGS" /></a>
            <a href="#services" className="hover:text-primary transition-colors"><ScrambleText text="SERVICES" /></a>
            <a href="#contact" className="border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-black transition-all">
              INITIATE_CONTACT
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-black z-50 flex flex-col justify-center items-center gap-8"
          >
            <button className="absolute top-6 right-6 text-gray-500" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            <a href="#skills" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display uppercase tracking-widest hover:text-primary">System_Modules</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display uppercase tracking-widest hover:text-primary">Mission_Logs</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display uppercase tracking-widest hover:text-primary">Services</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-2xl font-display uppercase tracking-widest text-primary">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        {/* HERO SECTION */}
        <section className="min-h-screen flex items-center justify-center relative container mx-auto px-6 py-20">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-900/10 text-green-400 font-mono text-xs mb-6"
                >
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    SYSTEM OPERATIONAL // REGION: BANGKOK
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-6">
                    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        <ScrambleText text="LEAD" />
                    </motion.div>
                    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-primary">
                        <ScrambleText text="DEVOPS" />
                    </motion.div>
                    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                        <ScrambleText text="ARCHITECT" />
                    </motion.div>
                </h1>

                <p className="text-gray-400 font-mono max-w-lg leading-relaxed border-l-2 border-primary pl-4 mb-8">
                    I transform chaotic infrastructure into scalable, cost-effective engines. 
                    Specializing in Kubernetes, Cloud Cost Optimization, and high-availability systems.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#projects" className="bg-primary text-black font-mono font-bold px-6 py-3 hover:bg-white transition-colors text-center">
                        MISSION LOGS
                    </a>
                    <a href="/resume.pdf" target="_blank" className="border border-gray-600 text-gray-400 font-mono px-6 py-3 hover:border-white hover:text-white transition-colors text-center group">
                        DOWNLOAD CV <span className="hidden group-hover:inline">↓</span>
                    </a>
                </div>
              </div>

              {/* Profile Image / Graphic */}
              <div className="relative flex justify-center order-1 md:order-2">
                 <div className="relative w-64 h-80 md:w-80 md:h-96 border border-primary/30 p-2 bg-black/50 backdrop-blur-sm group">
                    {/* Corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary transition-all duration-300 group-hover:w-16 group-hover:h-16" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary transition-all duration-300 group-hover:w-16 group-hover:h-16" />
                    
                    <img 
                        src="https://ca.slack-edge.com/T0DAXU939-U04TCM739QQ-9d709b5f8bd1-512" 
                        alt="Nithees Balaji" 
                        className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                    />
                    
                    <div className="absolute bottom-[-40px] left-0 w-full text-center font-mono text-xs text-primary">
                        ID: NITHEES_B <br/> ROLE: TEAM LEAD
                    </div>
                 </div>
              </div>
           </div>
        </section>

        <StatsSection />
        
        <SkillsMatrix />

        {/* PROJECTS SECTION (Operational Logs) */}
        <section id="projects" className="py-20 container mx-auto px-6">
            <h2 className="text-4xl font-display font-bold mb-12 flex items-center gap-2">
                <span className="text-primary">//</span> <ScrambleText text="OPERATION_LOGS" />
            </h2>
            <div className="space-y-8">
                {PROJECTS.map((project, index) => (
                    <motion.div 
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                    >
                         {/* Desktop Layout */}
                        <div className="hidden md:grid grid-cols-[120px_1fr_150px] gap-6 p-6 border-t border-border hover:bg-surface/50 transition-colors">
                            <div className="font-mono text-xs text-primary opacity-70 mt-2">{project.period}</div>
                            <div>
                                <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-primary transition-colors">{project.company}</h3>
                                <div className="text-sm text-gray-400 font-mono mb-2">{project.role}</div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 border border-gray-800 rounded text-xs font-mono text-gray-500 group-hover:border-gray-600 transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="space-y-2 text-sm text-gray-400 font-mono pl-4 border-l border-gray-800 group-hover:border-primary/50 transition-colors">
                                    <p><strong className="text-gray-200">Mission:</strong> {project.description.mission}</p>
                                    <p><strong className="text-gray-200">Action:</strong> {project.description.execution}</p>
                                    <p><strong className="text-secondary">Result:</strong> {project.description.outcome}</p>
                                </div>
                            </div>
                            <div className="space-y-4 text-right">
                                 {project.stats.map((stat, i) => (
                                     <div key={i} className="font-mono text-xs">
                                         <span className="text-gray-600 block">{stat.label}</span>
                                         <span style={{ color: stat.color }} className="font-bold text-base">{stat.value}</span>
                                     </div>
                                 ))}
                            </div>
                        </div>

                        {/* Mobile Layout Card */}
                        <div className="md:hidden bg-[#0a0a0a] border border-border p-5 rounded-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
                            
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="font-mono text-xs text-primary mb-1">{project.period}</div>
                                    <h3 className="text-xl font-bold font-display text-white">{project.company}</h3>
                                    <div className="text-sm text-gray-500 font-mono">{project.role}</div>
                                </div>
                                <div className="text-right">
                                     <div className="font-mono text-[10px] text-gray-600">STATUS</div>
                                     <div style={{ color: project.stats.find(s => s.label === "STATUS")?.color || '#fff' }} className="font-mono font-bold text-sm">
                                        {project.stats.find(s => s.label === "STATUS")?.value}
                                     </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-surface rounded text-[10px] font-mono text-gray-400 border border-gray-800">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-3 font-mono text-sm text-gray-400 bg-surface/50 p-3 rounded border border-border/50">
                                <div><span className="text-white font-bold">» </span>{project.description.execution}</div>
                                <div className="text-secondary"><span className="font-bold">✓ </span>{project.description.outcome}</div>
                            </div>
                        </div>

                    </motion.div>
                ))}
            </div>
        </section>

        {/* SERVICES SECTION (Available Protocols) - Moved Here */}
        <ServicesSection />

        <PhilosophySection />

        {/* CONTACT CTA SECTION */}
        <section id="contact" className="py-20 container mx-auto px-6 text-center border-t border-border mt-10 mb-10">
            <p className="font-mono text-primary mb-4">// READY TO OPTIMIZE?</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold max-w-4xl mx-auto mb-12">
                NEED A TEAM LEAD WHO SPEAKS CLOUD NATIVE?
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <a href="tel:+66661177370" className="flex items-center gap-2 px-6 py-4 border border-gray-700 hover:border-white transition-colors">
                    <Phone size={20} />
                    <span>+66 6611 77370</span>
                </a>
                <a href="mailto:nitheesbalaji@gmail.com" className="bg-primary text-black px-8 py-4 font-bold font-mono text-lg hover:bg-white transition-colors flex items-center gap-2">
                    <Mail size={20} />
                    INITIATE_HANDSHAKE
                </a>
            </div>
        </section>
      </main>

      {/* FOOTER - Fixed to Bottom */}
      <footer className="fixed bottom-0 left-0 w-full border-t border-primary/20 bg-[#020202]/90 backdrop-blur-md py-4 z-50">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                
                {/* Contact Info Grid */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 w-full md:w-auto">
                    <a href="https://github.com/nitheesb" target="_blank" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                        <Github size={14} />
                        <span className="font-mono text-[10px] md:text-xs group-hover:underline">GITHUB</span>
                    </a>
                    <a href="https://www.linkedin.com/in/nithees-balaji" target="_blank" className="flex items-center gap-2 text-gray-400 hover:text-[#0077b5] transition-colors group">
                        <Linkedin size={14} />
                        <span className="font-mono text-[10px] md:text-xs group-hover:underline">LINKEDIN</span>
                    </a>
                    <a href="mailto:nitheesbalaji@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group">
                        <Mail size={14} />
                        <span className="font-mono text-[10px] md:text-xs group-hover:underline">EMAIL</span>
                    </a>
                    <a href="tel:+66661177370" className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors group">
                        <Phone size={14} />
                        <span className="font-mono text-[10px] md:text-xs group-hover:underline">+66 6611 77370</span>
                    </a>
                </div>

                <div className="font-mono text-[10px] text-gray-600 text-center md:text-right hidden md:block">
                    SYSTEM_ID: NB_PF_2025 // LOCATION: BANGKOK, TH
                </div>
            </div>
        </div>
      </footer>

      {/* Floating Terminal Button - Moved up to accommodate fixed footer */}
      <button 
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-black border border-primary text-primary rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,94,0,0.3)] hover:bg-primary hover:text-black hover:scale-110 transition-all z-[60]"
        aria-label="Open Terminal"
      >
        <TerminalIcon size={24} />
      </button>

      {/* Terminal Modal */}
      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </div>
  );
};

export default App;