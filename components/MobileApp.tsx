import React, { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Cpu, FileText, Wrench, Radio, Download, Terminal as TerminalIcon,
  MapPin, Mail, Github, Linkedin, Send, Shield, Wifi, ChevronDown, ExternalLink
} from 'lucide-react';
import { PROJECTS, SERVICES, SKILL_CATEGORIES, TECH_STACK } from '../constants';
import { AudioProvider } from './AudioProvider';
import ErrorBoundary from './ErrorBoundary';
import BootSequence from './BootSequence';
import Terminal from './Terminal';

const MotionDiv = motion.div as any;

const MOBILE_SECTIONS = [
  { id: 'hero', label: 'HOME', icon: Home },
  { id: 'skills', label: 'SKILLS', icon: Cpu },
  { id: 'projects', label: 'LOGS', icon: FileText },
  { id: 'services', label: 'CORE', icon: Wrench },
  { id: 'contact', label: 'SIGNAL', icon: Radio },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

// ── Progress Ring ──────────────────────────────────────
function ProgressRing({ progress, size = 52, strokeWidth = 3 }: { progress: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,94,0,0.08)" strokeWidth={strokeWidth} fill="none" />
      <motion.circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke="url(#mobileProgressGrad)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        strokeDasharray={circumference}
      />
      <defs>
        <linearGradient id="mobileProgressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff5e00" />
          <stop offset="100%" stopColor="#ff8c42" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
// MOBILE APP
// ═══════════════════════════════════════════════════════
function MobileApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.3 }
    );
    sectionRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, [isLoading]);

  const scrollToSection = useCallback((index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  if (isLoading) {
    return (
      <ErrorBoundary>
        <BootSequence onComplete={() => setIsLoading(false)} />
      </ErrorBoundary>
    );
  }

  return (
    <AudioProvider>
      <ErrorBoundary>
        <div className="w-screen h-screen bg-bg text-secondary overflow-hidden relative">
          <div ref={scrollRef} className="h-full overflow-y-auto mobile-scroll-container mobile-hide-scrollbar">
            <MobileHero ref={(el) => { sectionRefs.current[0] = el; }} onNavigate={scrollToSection} />
            <MobileSkills ref={(el) => { sectionRefs.current[1] = el; }} />
            <MobileProjects ref={(el) => { sectionRefs.current[2] = el; }} />
            <MobileServices ref={(el) => { sectionRefs.current[3] = el; }} />
            <MobileContact ref={(el) => { sectionRefs.current[4] = el; }} />
            <div className="h-24" />
          </div>

          <MobileTabBar active={activeSection} onNavigate={scrollToSection} />

          <button
            onClick={() => setIsTerminalOpen(true)}
            className="fixed bottom-24 right-4 z-[60] w-12 h-12 bg-black/80 backdrop-blur-md border border-primary/30 rounded-2xl flex items-center justify-center text-primary shadow-[0_4px_20px_rgba(255,94,0,0.2)] active:scale-90 transition-transform"
          >
            <TerminalIcon size={18} />
          </button>

          <Terminal
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            onAction={(cmd) => console.log(cmd)}
          />
        </div>
      </ErrorBoundary>
    </AudioProvider>
  );
}

// ═══════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════
const MobileHero = forwardRef<HTMLElement, { onNavigate: (i: number) => void }>((props, ref) => {
  return (
    <section ref={ref} className="min-h-screen relative overflow-hidden mesh-gradient safe-area-top">
      {/* Decorative blurs */}
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />
      <div className="absolute top-20 right-[-30%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-primary/[0.06] to-transparent blur-[80px]" />
      <div className="absolute bottom-0 left-[-20%] w-[60%] h-[50%] rounded-full bg-gradient-to-tr from-primary/[0.04] to-transparent blur-[60px]" />

      <div className="relative z-10 px-6 pt-16 pb-8 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-10">
          <div className="font-mono text-[10px] font-bold tracking-[0.2em] text-gray-400">
            <span className="text-primary">[</span> NBM.SYS <span className="text-primary">]</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono text-[9px] font-bold text-gray-400 tracking-wider">ONLINE</span>
          </div>
        </div>

        {/* Profile avatar with animated ring */}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="relative w-24 h-24">
            <div className="absolute inset-[-3px] rounded-full bg-gradient-to-r from-primary via-primaryLight to-primary opacity-60 blur-[2px] animate-spin-slow" />
            <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <img
                src="https://i.ibb.co/mCwSdtvZ/profile.png"
                alt="Nithees Balaji Mohan"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center border-2 border-white shadow-md">
              <Shield size={12} className="text-white" />
            </div>
          </div>
        </MotionDiv>

        {/* Title */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-5"
        >
          <h1 className="text-[52px] leading-[0.9] font-display font-bold tracking-tight text-black">
            DEVOPS<br />
            <span className="gradient-text">ARCHITECT</span>
          </h1>
        </MotionDiv>

        {/* Availability badge */}
        <MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-5">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono text-[9px] font-bold tracking-[0.15em] text-gray-500">AVAILABLE FOR HIGH-SCALE MISSIONS</span>
          </div>
        </MotionDiv>

        {/* Description */}
        <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
          <p className="font-mono text-[13px] text-gray-500 leading-relaxed max-w-[320px]">
            I am <span className="text-black font-bold">Nithees Balaji Mohan</span>. Building self-healing infrastructure &amp; scalable cloud systems with Kubernetes &amp; Terraform.
          </p>
        </MotionDiv>

        {/* CTA Buttons */}
        <MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex gap-3 mb-auto">
          <button
            onClick={() => props.onNavigate(2)}
            className="btn-shimmer bg-gradient-to-r from-primary to-primaryLight text-white font-mono font-bold text-xs px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-[0_4px_20px_rgba(255,94,0,0.25)] active:scale-95 transition-transform"
          >
            <TerminalIcon size={14} />
            MISSION LOGS
          </button>
          <a
            href="https://drive.google.com/file/d/1oU43XtO0xSjEs0uk-5vBNXsn5FRsXbI_/view?usp=sharing"
            className="glass-card text-black font-mono font-bold text-xs px-6 py-3.5 rounded-xl flex items-center gap-2 active:scale-95 transition-transform"
          >
            <Download size={14} />
            RESUME
          </a>
        </MotionDiv>

        {/* Stats Row */}
        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-10 grid grid-cols-4 gap-3">
          {[
            { val: '18%', label: 'COST CUT', accent: true },
            { val: '99.9%', label: 'UPTIME' },
            { val: '-60%', label: 'ERRORS' },
            { val: '9+', label: 'YEARS' },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-xl p-3 text-center">
              <div className={`text-lg font-bold font-display ${stat.accent ? 'gradient-text' : 'text-black'}`}>{stat.val}</div>
              <div className="text-[8px] font-mono text-gray-400 font-bold tracking-wider mt-0.5">{stat.label}</div>
            </div>
          ))}
        </MotionDiv>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-8 flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] text-gray-400 tracking-[0.2em]">SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={16} className="text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════
// SKILLS SECTION (Dark)
// ═══════════════════════════════════════════════════════
const MobileSkills = forwardRef<HTMLElement>((_, ref) => {
  const [active, setActive] = useState(0);

  return (
    <section ref={ref} className="py-16 px-6 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 dot-grid-dark pointer-events-none opacity-60" />

      <div className="relative z-10">
        <MotionDiv {...fadeUp} className="mb-8">
          <span className="font-mono text-[10px] text-primary font-bold tracking-[0.2em] block mb-2">SYSTEM_MODULES</span>
          <h2 className="text-4xl font-display font-bold text-white">
            SKILL <span className="gradient-text">MATRIX</span>
          </h2>
        </MotionDiv>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto mobile-hide-scrollbar pb-4 mb-8 -mx-2 px-2">
          {SKILL_CATEGORIES.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`whitespace-nowrap font-mono text-[10px] font-bold px-4 py-2 rounded-full transition-all duration-300 shrink-0 ${
                active === i
                  ? 'bg-primary text-white shadow-[0_2px_12px_rgba(255,94,0,0.3)]'
                  : 'bg-white/5 text-gray-500 border border-white/10 active:bg-white/10'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Skills Grid with Progress Rings */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 gap-3"
        >
          {SKILL_CATEGORIES[active].items.map((skill, i) => (
            <MotionDiv
              key={`${active}-${skill.name}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="glass-dark rounded-2xl p-4 flex flex-col items-center text-center"
            >
              <div className="relative mb-2">
                <ProgressRing progress={skill.level} />
                <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold font-mono text-primary">
                  {skill.level}
                </span>
              </div>
              <span className="text-white text-[12px] font-bold leading-tight">{skill.name}</span>
            </MotionDiv>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════
// PROJECTS SECTION
// ═══════════════════════════════════════════════════════
const MobileProjects = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="py-16 px-6 bg-bg relative">
      <MotionDiv {...fadeUp} className="mb-10">
        <span className="font-mono text-[10px] text-primary font-bold tracking-[0.2em] block mb-2">ACCESS_LEVEL: PUBLIC</span>
        <h2 className="text-4xl font-display font-bold text-black">
          MISSION <span className="gradient-text">LOGS</span>
        </h2>
      </MotionDiv>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

        {PROJECTS.map((project, i) => (
          <MotionDiv
            key={project.id}
            {...stagger}
            transition={{ delay: i * 0.1 }}
            className="relative pl-10 mb-6 last:mb-0"
          >
            {/* Timeline dot */}
            <div className="absolute left-[5px] top-6 w-[14px] h-[14px] rounded-full bg-bg border-[3px] border-primary shadow-[0_0_8px_rgba(255,94,0,0.3)] z-10" />

            <div className="glass-card rounded-2xl p-5 active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[9px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-bold">{project.company}</span>
                <span className="font-mono text-[9px] text-gray-400">{project.period}</span>
              </div>

              <h3 className="text-lg font-display font-bold text-black mb-2 leading-tight">{project.role}</h3>
              <p className="font-mono text-[11px] text-gray-500 leading-relaxed mb-3">{project.description.mission}</p>

              {/* Stats */}
              <div className="flex gap-4 mb-3">
                {project.stats.map((stat, si) => (
                  <div key={si}>
                    <span className="text-sm font-bold font-display gradient-text">{stat.value}</span>
                    <span className="text-[8px] font-mono text-gray-400 font-bold block tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-mono bg-primary/5 text-primary px-2 py-0.5 rounded-full font-bold">{tag}</span>
                ))}
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>

      {/* Tech Stack */}
      <MotionDiv {...fadeUp} className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-[1px] bg-primary" />
          <span className="font-mono text-[9px] text-primary font-bold tracking-[0.2em]">INFRA_ARSENAL</span>
        </div>
        <div className="flex gap-2 overflow-x-auto mobile-hide-scrollbar pb-2">
          {TECH_STACK.map((tech, i) => (
            <span key={i} className="shrink-0 font-mono text-[10px] font-bold bg-black text-white px-3 py-1.5 rounded-lg">{tech}</span>
          ))}
        </div>
      </MotionDiv>
    </section>
  );
});

// ═══════════════════════════════════════════════════════
// SERVICES SECTION
// ═══════════════════════════════════════════════════════
const MobileServices = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="py-16 px-6 mesh-gradient relative overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-30" />

      <div className="relative z-10">
        <MotionDiv {...fadeUp} className="mb-8">
          <span className="font-mono text-[10px] text-primary font-bold tracking-[0.2em] block mb-2">AVAILABLE_PROTOCOLS</span>
          <h2 className="text-4xl font-display font-bold text-black">
            SERVICE <span className="gradient-text">CORE</span>
          </h2>
        </MotionDiv>

        <div className="space-y-4">
          {SERVICES.map((service, i) => (
            <MotionDiv
              key={service.id}
              {...stagger}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-5 active:scale-[0.98] transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-gradient-to-br from-primary to-primaryLight rounded-xl flex items-center justify-center text-white shrink-0 shadow-[0_4px_12px_rgba(255,94,0,0.2)]">
                  <service.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-display font-bold text-black mb-1">{service.title}</h3>
                  <p className="font-mono text-[11px] text-gray-500 leading-relaxed mb-3">{service.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.features.map((f, fi) => (
                      <span key={fi} className="text-[9px] font-mono bg-primary/5 text-primary px-2 py-0.5 rounded-full font-bold">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════
// CONTACT SECTION (Dark)
// ═══════════════════════════════════════════════════════
const MobileContact = forwardRef<HTMLElement>((_, ref) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 2000);
  };

  return (
    <section ref={ref} className="py-16 px-6 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 dot-grid-dark pointer-events-none opacity-60" />

      <div className="relative z-10">
        <MotionDiv {...fadeUp} className="mb-6">
          <span className="font-mono text-[10px] text-primary font-bold tracking-[0.2em] block mb-2">ENCRYPTED_CHANNEL</span>
          <h2 className="text-4xl font-display font-bold text-white">
            INITIATE <span className="gradient-text">SIGNAL</span>
          </h2>
        </MotionDiv>

        {/* Contact Links */}
        <MotionDiv {...fadeUp} className="flex gap-3 mb-8">
          <a href="mailto:nitheesbalaji@gmail.com" className="glass-dark rounded-xl px-4 py-3 flex items-center gap-2 flex-1 min-w-0">
            <Mail size={14} className="text-primary shrink-0" />
            <span className="font-mono text-[10px] text-gray-300 font-bold truncate">nitheesbalaji@gmail.com</span>
          </a>
          <a href="https://www.linkedin.com/in/nithees-balaji/" target="_blank" rel="noopener noreferrer" className="glass-dark rounded-xl px-4 py-3 flex items-center gap-2">
            <Linkedin size={14} className="text-primary" />
            <span className="font-mono text-[10px] text-gray-300 font-bold">LinkedIn</span>
          </a>
        </MotionDiv>

        {/* Console Form */}
        <MotionDiv {...fadeUp}>
          <div className="glass-dark rounded-2xl overflow-hidden border border-white/5">
            <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-500/60" />
              </div>
              <span className="font-mono text-[9px] text-gray-500 tracking-widest">SIGNAL_v2</span>
            </div>

            <AnimatePresence mode="wait">
              {status === 'idle' ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="p-5 space-y-4"
                >
                  <div>
                    <label className="text-[9px] font-mono text-primary font-bold tracking-[0.15em] block mb-1.5">SOURCE_ID</label>
                    <input
                      required type="text" placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-xs focus:border-primary outline-none transition-colors placeholder:text-gray-700"
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-mono text-primary font-bold tracking-[0.15em] block mb-1.5">RETURN_ADDR</label>
                    <input
                      required type="email" placeholder="email@domain.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-xs focus:border-primary outline-none transition-colors placeholder:text-gray-700"
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-mono text-primary font-bold tracking-[0.15em] block mb-1.5">MESSAGE_PAYLOAD</label>
                    <textarea
                      required rows={3} placeholder="Describe the mission..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-xs focus:border-primary outline-none transition-colors resize-none placeholder:text-gray-700"
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-primary to-primaryLight text-white font-mono font-bold text-xs flex items-center justify-center gap-2 rounded-xl shadow-[0_4px_20px_rgba(255,94,0,0.3)] active:scale-95 transition-transform tracking-[0.15em]"
                  >
                    <Send size={14} /> TRANSMIT
                  </button>
                </motion.form>
              ) : status === 'sending' ? (
                <motion.div
                  key="sending"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="p-12 flex flex-col items-center justify-center space-y-4"
                >
                  <Cpu size={32} className="text-primary animate-pulse" />
                  <span className="font-mono text-[10px] text-primary animate-pulse tracking-[0.2em]">TRANSMITTING...</span>
                  <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.8 }} className="h-full bg-gradient-to-r from-primary to-primaryLight rounded-full" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="p-12 flex flex-col items-center justify-center space-y-4 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30">
                    <Shield size={24} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white">SIGNAL RECEIVED</h3>
                  <p className="font-mono text-[10px] text-gray-500 max-w-[200px]">Transmission verified. Stand by for response.</p>
                  <button onClick={() => setStatus('idle')} className="mt-2 px-4 py-2 border border-white/10 rounded-xl text-white font-mono text-[10px] active:bg-white/5">NEW SIGNAL</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </MotionDiv>

        {/* Social Links */}
        <div className="mt-8 flex justify-center gap-4">
          {[
            { icon: Github, href: 'https://github.com/nitheesb', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/nithees-balaji', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:nitheesbalaji@gmail.com', label: 'Email' },
          ].map((social, i) => (
            <a key={i} href={social.href} target={social.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={social.label} className="w-11 h-11 glass-dark rounded-xl flex items-center justify-center text-gray-400 active:text-primary transition-colors">
              <social.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════
// TAB BAR
// ═══════════════════════════════════════════════════════
function MobileTabBar({ active, onNavigate }: { active: number; onNavigate: (i: number) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      <div className="mx-3 mb-2 glass rounded-2xl px-2 py-2 flex justify-around items-center shadow-[0_4px_30px_rgba(0,0,0,0.08)]">
        {MOBILE_SECTIONS.map((section, i) => (
          <button
            key={section.id}
            onClick={() => onNavigate(i)}
            className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-300 relative"
          >
            {active === i && (
              <motion.div
                layoutId="mobileTabIndicator"
                className="absolute inset-0 bg-primary/10 rounded-xl"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <section.icon
              size={18}
              className={`relative z-10 transition-colors duration-300 ${active === i ? 'text-primary' : 'text-gray-400'}`}
            />
            <span className={`relative z-10 font-mono text-[8px] font-bold tracking-wider transition-colors duration-300 ${active === i ? 'text-primary' : 'text-gray-400'}`}>
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default MobileApp;
