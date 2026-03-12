import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion, AnimatePresence, useScroll, useTransform,
  useSpring, useInView
} from 'framer-motion';
import {
  Terminal as TerminalIcon, Download, Mail, Github, Linkedin, MapPin,
  ArrowUpRight, Send, Shield, Cpu, ChevronDown, Menu, X,
  Cloud, ArrowRight
} from 'lucide-react';
import Terminal from './components/Terminal';
import ErrorBoundary from './components/ErrorBoundary';
import { AudioProvider } from './components/AudioProvider';
import { useAudioFeedback } from './hooks/useAudioFeedback';
import CursorCanvas from './components/CursorCanvas';
import { PROJECTS, SERVICES, SKILL_CATEGORIES, TECH_STACK } from './constants';

const MotionDiv = motion.div as any;
const ease = [0.22, 1, 0.36, 1] as const;

// ═══════════════════════════════════════════════════════════
// UTILITY: Animated character-by-character text reveal
// ═══════════════════════════════════════════════════════════
function AnimChars({ text, className, delay = 0, stagger = 0.025 }: {
  text: string; className?: string; delay?: number; stagger?: number;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -60 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: delay + i * stagger, duration: 0.6, ease }}
          className="inline-block"
          style={{ transformOrigin: 'bottom' }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════
// UTILITY: Scroll-triggered word reveal (opacity per word)
// ═══════════════════════════════════════════════════════════
function ScrollRevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.35'],
  });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <ScrollWord key={i} word={word} range={[start, end]} progress={scrollYProgress} />;
      })}
    </p>
  );
}
function ScrollWord({ word, range, progress }: { word: string; range: [number, number]; progress: any }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return <motion.span style={{ opacity }} className="inline-block mr-[0.3em]">{word}</motion.span>;
}

// ═══════════════════════════════════════════════════════════
// UTILITY: Counter animation
// ═══════════════════════════════════════════════════════════
function Counter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

// ═══════════════════════════════════════════════════════════
// UTILITY: Section header with number
// ═══════════════════════════════════════════════════════════
function SectionHeader({ num, label, className = '' }: { num: string; label: string; className?: string }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease }}
      className={`flex items-center gap-4 mb-12 md:mb-16 ${className}`}
    >
      <span className="font-mono text-xs md:text-sm text-primary font-medium">{num}</span>
      <div className="h-px flex-1 max-w-[60px] bg-primary/40" />
      <span className="font-mono text-xs md:text-sm text-white/50 tracking-[0.15em] uppercase">{label}</span>
    </MotionDiv>
  );
}

// ═══════════════════════════════════════════════════════════
// LOADER — Cinematic percentage counter
// ═══════════════════════════════════════════════════════════
function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(onComplete, 150);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <div className="font-display text-8xl md:text-9xl font-bold text-white tabular-nums tracking-tight leading-none">
          {progress}<span className="text-primary">.</span>
        </div>
        <div className="w-48 h-[1px] bg-white/10 mx-auto mt-6 overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primaryLight"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-[10px] text-white/20 mt-4 tracking-[0.3em] uppercase">
          Initializing Systems
        </div>
      </motion.div>
    </motion.div>
  );
}

// CursorCanvas imported from components/CursorCanvas.tsx (particle trail effect)

// ═══════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════
const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { playClick } = useAudioFeedback();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-surface' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
          <a href="#hero" className="font-display font-bold text-lg text-white tracking-tight">
            NBM<span className="text-primary">.</span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={playClick}
                className="font-mono text-xs text-white/50 hover:text-primary transition-colors tracking-wider uppercase"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1oU43XtO0xSjEs0uk-5vBNXsn5FRsXbI_/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary font-mono text-xs px-5 py-2.5 rounded-full tracking-wider"
            >
              RESUME
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => { playClick(); setMobileOpen(true); }}
            className="md:hidden text-white p-2"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-bg/98 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 text-white/50 hover:text-white"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, ease }}
                  onClick={() => { playClick(); setMobileOpen(false); }}
                  className="font-display text-3xl font-bold text-white hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ease }}
                href="https://drive.google.com/file/d/1oU43XtO0xSjEs0uk-5vBNXsn5FRsXbI_/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary font-mono text-sm px-8 py-3 rounded-full mt-4"
              >
                RESUME
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// HERO SECTION — Full viewport, massive typography
// ═══════════════════════════════════════════════════════════
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
  const { playClick } = useAudioFeedback();

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #ff5e00, #ff8c4240, transparent)' }}
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #ff5e0080, transparent)' }}
        animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div style={{ y, opacity, scale }} className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 md:pt-40 md:pb-32">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          className="mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2.5 card-static px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <span className="font-mono text-[10px] md:text-xs text-white/40 font-medium tracking-[0.15em]">AVAILABLE FOR HIGH-SCALE MISSIONS</span>
          </div>
        </motion.div>

        {/* Main heading */}
        <div className="mb-6 md:mb-8 overflow-hidden">
          <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tight text-white">
            <AnimChars text="NITHEES" delay={0.3} stagger={0.03} /><br />
            <AnimChars text="BALAJI" delay={0.5} stagger={0.03} className="gradient-text text-glow" /><br />
            <AnimChars text="MOHAN" delay={0.7} stagger={0.03} />
          </h1>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5, ease }}
          className="mb-10 md:mb-12"
        >
          <p className="font-mono text-sm md:text-base text-white/30 max-w-lg leading-relaxed">
            Senior DevOps Architect — I build self-healing infrastructure and transform chaotic systems
            into scalable, cost-effective engines using <span className="text-primary">Kubernetes</span> &amp; <span className="text-primary">Terraform</span>.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5, ease }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#experience"
            onClick={playClick}
            className="btn-primary font-mono text-xs md:text-sm px-7 py-3.5 rounded-full flex items-center gap-2.5 tracking-wider"
          >
            VIEW WORK <ArrowRight size={14} />
          </a>
          <a
            href="https://drive.google.com/file/d/1oU43XtO0xSjEs0uk-5vBNXsn5FRsXbI_/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost font-mono text-xs md:text-sm px-7 py-3.5 rounded-full flex items-center gap-2.5 tracking-wider"
          >
            <Download size={14} /> GET RESUME
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[9px] text-white/20 tracking-[0.3em]">SCROLL</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={16} className="text-primary/50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// TECH MARQUEE — Infinite scrolling ticker
// ═══════════════════════════════════════════════════════════
function TechMarquee() {
  const items = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK, ...TECH_STACK];
  return (
    <div className="py-8 md:py-12 border-y border-white/[0.04] overflow-hidden">
      <div className="marquee-track animate-marquee">
        {items.map((tech, i) => (
          <span key={i} className="flex items-center gap-6 md:gap-8 px-6 md:px-8 shrink-0">
            <span className="font-display text-lg md:text-xl font-bold text-white/10 whitespace-nowrap uppercase tracking-wider">{tech}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/20 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ABOUT SECTION — Scroll reveal text + Stats
// ═══════════════════════════════════════════════════════════
function AboutSection() {
  const stats = [
    { value: 18, suffix: '%', label: 'COST REDUCTION' },
    { value: 99, suffix: '.99%', label: 'UPTIME (GKE)' },
    { value: 60, prefix: '-', suffix: '%', label: 'DEPLOY ERRORS' },
    { value: 9, suffix: '+', label: 'YEARS EXP' },
  ];

  return (
    <section id="about" className="py-24 md:py-40 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader num="01" label="About" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <ScrollRevealText
              text="I architect cloud systems that scale. With over 9 years of experience across AWS, GCP, and Kubernetes, I specialize in transforming brittle infrastructure into resilient, self-healing platforms. My approach combines immutable infrastructure principles with shift-left security and deep observability."
              className="font-display text-2xl md:text-4xl font-bold text-white leading-snug tracking-tight"
            />
          </div>

          <div className="flex flex-col justify-center">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="card-static p-6 md:p-8 rounded-2xl space-y-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10">
                  <img
                    src="https://i.ibb.co/mCwSdtvZ/profile.png"
                    alt="Nithees Balaji Mohan"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-sm">Nithees Balaji Mohan</div>
                  <div className="font-mono text-xs text-primary">Senior DevOps Architect</div>
                </div>
              </div>
              <div className="space-y-3 font-mono text-xs text-white/40">
                <div className="flex items-center gap-3">
                  <MapPin size={13} className="text-primary shrink-0" />
                  <span>Bangkok, Thailand</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={13} className="text-primary shrink-0" />
                  <span>nitheesbalaji@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Cloud size={13} className="text-primary shrink-0" />
                  <span>GCP / AWS / Kubernetes</span>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-white/5">
                <a href="https://github.com/nitheesb" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-primary hover:border-primary/30 transition-all">
                  <Github size={14} />
                </a>
                <a href="https://www.linkedin.com/in/nithees-balaji" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-primary hover:border-primary/30 transition-all">
                  <Linkedin size={14} />
                </a>
              </div>
            </MotionDiv>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20 md:mt-28">
          {stats.map((stat, i) => (
            <MotionDiv
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease }}
              className="card-static rounded-2xl p-6 md:p-8 text-center group hover:border-primary/20 transition-all duration-500"
            >
              <div className="font-display text-3xl md:text-5xl font-bold text-white group-hover:text-primary transition-colors">
                <Counter target={stat.value} suffix={stat.suffix} prefix={stat.prefix || ''} />
              </div>
              <div className="font-mono text-[9px] md:text-[10px] text-white/30 tracking-[0.15em] mt-2 uppercase">{stat.label}</div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// EXPERIENCE SECTION — Horizontal scroll cards on desktop
// ═══════════════════════════════════════════════════════════
function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  return (
    <section id="experience" className="relative">
      {/* Desktop: Horizontal scroll */}
      <div ref={containerRef} className="hidden md:block relative h-[200vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-12 mb-12 w-full">
            <SectionHeader num="02" label="Experience" className="mb-4" />
            <h2 className="font-display text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Mission <span className="gradient-text">Logs</span>
            </h2>
          </div>
          <motion.div style={{ x }} className="flex gap-6 pl-12 pr-[40vw]">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile: Vertical stack */}
      <div className="md:hidden py-24 px-6">
        <SectionHeader num="02" label="Experience" />
        <h2 className="font-display text-4xl font-bold text-white tracking-tight mb-10">
          Mission <span className="gradient-text">Logs</span>
        </h2>
        <div className="space-y-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* Tech stack strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-8 bg-primary/40" />
          <span className="font-mono text-[10px] text-primary tracking-[0.2em]">TECH ARSENAL</span>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {TECH_STACK.map((tech, i) => (
            <MotionDiv
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, ease }}
              className="font-mono text-[10px] md:text-xs font-medium bg-white/[0.03] text-white/40 px-4 py-2 rounded-full border border-white/[0.04] hover:border-primary/20 hover:text-primary transition-all"
            >
              {tech}
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease }}
      className="card rounded-2xl p-6 md:p-8 w-full md:w-[420px] md:shrink-0 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[9px] bg-primary/10 text-primary px-3 py-1 rounded-full font-medium tracking-wider">{project.company}</span>
        <span className="font-mono text-[10px] text-white/20">{project.period}</span>
      </div>

      {/* Role */}
      <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3 leading-tight">{project.role}</h3>

      {/* Description */}
      <p className="font-mono text-xs text-white/30 leading-relaxed mb-5 flex-1">{project.description.mission} {project.description.execution}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map(tag => (
          <span key={tag} className="text-[9px] font-mono bg-white/[0.04] text-white/30 px-2.5 py-1 rounded-full">{tag}</span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex gap-6 pt-4 border-t border-white/[0.04]">
        {project.stats.map((stat, i) => (
          <div key={i}>
            <div className="font-display text-lg font-bold gradient-text">{stat.value}</div>
            <div className="text-[8px] font-mono text-white/20 tracking-wider uppercase">{stat.label}</div>
          </div>
        ))}
      </div>
    </MotionDiv>
  );
}

// ═══════════════════════════════════════════════════════════
// SKILLS SECTION — Tab switcher + animated bars
// ═══════════════════════════════════════════════════════════
function SkillsSection() {
  const [active, setActive] = useState(0);
  const { playClick } = useAudioFeedback();

  return (
    <section id="skills" className="py-24 md:py-40 relative">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader num="03" label="Skills" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Left: Title + Tabs */}
          <div>
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                Skill <span className="gradient-text">Matrix</span>
              </h2>
              <p className="font-mono text-xs text-white/30 mb-8 max-w-md">
                Core competencies honed across 9+ years of production-grade infrastructure.
              </p>
            </MotionDiv>

            <div className="flex flex-wrap gap-2">
              {SKILL_CATEGORIES.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => { playClick(); setActive(i); }}
                  className={`font-mono text-[10px] md:text-xs font-medium px-4 py-2.5 rounded-full transition-all duration-300 ${
                    active === i
                      ? 'bg-primary text-black shadow-[0_0_20px_rgba(255,94,0,0.3)]'
                      : 'bg-white/[0.03] text-white/30 border border-white/[0.06] hover:border-white/10 hover:text-white/50'
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Skill bars */}
          <div>
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease }}
              className="space-y-5"
            >
              <div className="font-mono text-[10px] text-white/20 tracking-wider mb-6">
                root@core:~/modules/{SKILL_CATEGORIES[active].category.toLowerCase().replace(/ /g, '_')}
              </div>
              {SKILL_CATEGORIES[active].items.map((skill, i) => (
                <SkillBar key={`${active}-${skill.name}`} name={skill.name} level={skill.level} delay={i * 0.08} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-xs md:text-sm text-white/60 font-medium group-hover:text-white transition-colors">{name}</span>
        <span className="font-mono text-xs text-primary font-bold">{level}</span>
      </div>
      <div className="skill-bar-bg h-1.5 md:h-2">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ delay: delay + 0.2, duration: 1, ease }}
        />
      </div>
    </MotionDiv>
  );
}

// ═══════════════════════════════════════════════════════════
// SERVICES SECTION — Bento grid cards
// ═══════════════════════════════════════════════════════════
function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader num="04" label="Services" />
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Available <span className="gradient-text">Protocols</span>
          </h2>
          <p className="font-mono text-xs text-white/30 max-w-lg">
            End-to-end DevOps services — from architecture design to production operations.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {SERVICES.map((service, i) => (
            <MotionDiv
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
              className={`card rounded-2xl p-6 md:p-8 group ${i === 0 || i === 5 ? 'md:col-span-2' : ''}`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 text-primary group-hover:shadow-[0_0_20px_rgba(255,94,0,0.15)] transition-shadow">
                  <service.icon size={22} />
                </div>
                <ArrowUpRight size={16} className="text-white/10 group-hover:text-primary transition-colors" />
              </div>

              <h3 className="font-display text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="font-mono text-[11px] md:text-xs text-white/30 leading-relaxed mb-5">{service.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {service.features.map((f, fi) => (
                  <span key={fi} className="text-[9px] font-mono text-primary/60 bg-primary/5 px-2.5 py-1 rounded-full">{f}</span>
                ))}
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// CONTACT SECTION — Large CTA + Console form
// ═══════════════════════════════════════════════════════════
function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { playClick } = useAudioFeedback();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 2500);
  };

  return (
    <section id="contact" className="py-24 md:py-40 relative">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader num="05" label="Contact" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: CTA */}
          <div>
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                Let's Build<br />
                Something <span className="gradient-text">Great</span>
              </h2>
              <p className="font-mono text-sm text-white/30 max-w-md mb-8 leading-relaxed">
                Ready for high-impact cloud architecture &amp; DevOps consultations.
                Expected response latency: <span className="text-primary">&lt; 24h</span>
              </p>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, ease }}
              className="space-y-4"
            >
              <a href="mailto:nitheesbalaji@gmail.com" className="flex items-center gap-3 text-white/40 hover:text-primary transition-colors group">
                <Mail size={16} className="text-primary" />
                <span className="font-mono text-sm">nitheesbalaji@gmail.com</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </a>
              <a href="https://www.linkedin.com/in/nithees-balaji/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/40 hover:text-primary transition-colors group">
                <Linkedin size={16} className="text-primary" />
                <span className="font-mono text-sm">LinkedIn Profile</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </a>
              <a href="https://github.com/nitheesb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/40 hover:text-primary transition-colors group">
                <Github size={16} className="text-primary" />
                <span className="font-mono text-sm">GitHub</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </a>
            </MotionDiv>
          </div>

          {/* Right: Console form */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5, ease }}
            className="card-static rounded-2xl overflow-hidden"
          >
            {/* Console header */}
            <div className="px-5 py-3 border-b border-white/[0.04] flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <span className="font-mono text-[9px] text-white/20 tracking-widest">Signal_Composer.v1</span>
              <Shield size={11} className="text-primary/30" />
            </div>

            <AnimatePresence mode="wait">
              {status === 'idle' ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="p-6 md:p-8 space-y-5"
                >
                  {[
                    { label: 'Source_ID', type: 'text', placeholder: 'Your name', key: 'name' as const },
                    { label: 'Return_Address', type: 'email', placeholder: 'email@domain.com', key: 'email' as const },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="text-[10px] font-mono text-primary/60 font-medium tracking-[0.15em] block mb-2 uppercase">{field.label}</label>
                      <input
                        required
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white font-mono text-sm focus:border-primary/40 outline-none transition-colors placeholder:text-white/10"
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-[10px] font-mono text-primary/60 font-medium tracking-[0.15em] block mb-2 uppercase">Message_Payload</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe the mission..."
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white font-mono text-sm focus:border-primary/40 outline-none transition-colors resize-none placeholder:text-white/10"
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary font-mono text-xs py-4 rounded-xl flex items-center justify-center gap-3 tracking-[0.15em] uppercase"
                  >
                    <Send size={14} />
                    Transmit Signal
                  </button>
                </motion.form>
              ) : status === 'sending' ? (
                <motion.div
                  key="sending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-16 flex flex-col items-center justify-center space-y-6"
                >
                  <div className="relative">
                    <Cpu size={36} className="text-primary animate-pulse" />
                    <motion.div
                      animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 border border-primary rounded-full"
                    />
                  </div>
                  <div className="font-mono text-xs text-primary/60 tracking-[0.2em]">UPLOADING DATA PACKETS...</div>
                  <div className="w-40 h-[2px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2.2, ease: 'easeInOut' }}
                      className="h-full bg-gradient-to-r from-primary to-primaryLight"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-16 flex flex-col items-center justify-center space-y-5 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                    <Shield size={24} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white">Signal Received</h3>
                  <p className="font-mono text-[11px] text-white/30 max-w-[220px]">
                    Your transmission reaches the architect. Stand by for response.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 px-5 py-2.5 border border-white/10 rounded-xl text-white/50 font-mono text-[10px] hover:border-primary/30 hover:text-primary transition-all"
                  >
                    Close Channel
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer className="py-8 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-mono text-[10px] text-white/15 tracking-wider">&copy; 2026 NITHEES BALAJI MOHAN</span>
        <div className="flex items-center gap-6">
          {[
            { icon: Github, href: 'https://github.com/nitheesb', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/nithees-balaji', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:nitheesbalaji@gmail.com', label: 'Email' },
          ].map(link => (
            <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={link.label} className="text-white/15 hover:text-primary transition-colors">
              <link.icon size={15} />
            </a>
          ))}
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-[10px] text-white/15 hover:text-primary transition-colors tracking-wider flex items-center gap-1.5"
        >
          BACK TO TOP <ArrowUpRight size={10} />
        </button>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════
// SCROLL PROGRESS BAR
// ═══════════════════════════════════════════════════════════
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-primaryLight z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const { playClick } = useAudioFeedback();

  const onLoaded = useCallback(() => setIsLoading(false), []);

  return (
    <ErrorBoundary>
      <AudioProvider>
        <AnimatePresence mode="wait">
          {isLoading && <Loader key="loader" onComplete={onLoaded} />}
        </AnimatePresence>

        {!isLoading && (
          <div className="bg-bg text-secondary font-sans selection:bg-primary/20 selection:text-white">
            <ScrollProgress />
            <CursorCanvas />
            <Navbar />

            <main>
              <HeroSection />
              <TechMarquee />
              <AboutSection />
              <ExperienceSection />
              <SkillsSection />
              <ServicesSection />
              <ContactSection />
            </main>

            <Footer />

            {/* Terminal FAB */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, ease }}
              onClick={() => { playClick(); setIsTerminalOpen(true); }}
              aria-label="Open Command Terminal"
              className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-surface border border-white/[0.06] flex items-center justify-center text-primary hover:bg-primary hover:text-black hover:shadow-[0_0_30px_rgba(255,94,0,0.3)] transition-all duration-300 group"
            >
              <TerminalIcon size={18} className="group-hover:rotate-12 transition-transform" />
            </motion.button>

            <Terminal
              isOpen={isTerminalOpen}
              onClose={() => setIsTerminalOpen(false)}
              onAction={(cmd) => console.log(cmd)}
            />
          </div>
        )}
      </AudioProvider>
    </ErrorBoundary>
  );
}

export default App;
