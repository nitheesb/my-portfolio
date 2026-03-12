import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion, AnimatePresence, useScroll, useTransform,
  useSpring, useInView, useMotionValue
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
          {ch === ' ' ? String.fromCharCode(160) : ch}
        </motion.span>
      ))}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════
// UTILITY: Magnetic hover wrapper (desktop only)
// ═══════════════════════════════════════════════════════════
function MagneticWrap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
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
// UTILITY: Section heading (animated number + line + title)
// ═══════════════════════════════════════════════════════════
function SectionHeading({ num, title, highlight, subtitle }: {
  num: string; title: string; highlight: string; subtitle?: string;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-3 mb-5"
      >
        <span className="font-mono text-primary text-sm font-bold">{num}</span>
        <motion.div
          className="h-px w-12 bg-gradient-to-r from-primary/60 to-transparent origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        />
      </MotionDiv>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary tracking-tight leading-tight">
          {title} <span className="gradient-text">{highlight}</span>
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base text-secondary/40 mt-3 max-w-lg leading-relaxed">{subtitle}</p>
        )}
      </MotionDiv>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// UTILITY: Section divider
// ═══════════════════════════════════════════════════════════
function SectionDivider() {
  return (
    <MotionDiv
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
      className="h-px max-w-5xl mx-auto bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
    />
  );
}

// ═══════════════════════════════════════════════════════════
// UTILITY: Floating background shapes
// ═══════════════════════════════════════════════════════════
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* CSS-animated grid lines — no JS overhead */}
      <div className="absolute top-[18%] left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent animate-[drift_16s_ease-in-out_infinite]" />
      <div className="absolute top-[50%] left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/[0.06] to-transparent animate-[drift-reverse_20s_ease-in-out_infinite]" />

      {/* Static geometric accents */}
      <div className="absolute top-[15%] right-[12%] w-20 h-20 border border-primary/10 rotate-45 rounded-sm animate-[float_10s_ease-in-out_infinite]" />
      <div className="absolute top-[10%] left-[15%] w-14 h-14 border border-primary/[0.08] rounded-full animate-[pulse-slow_6s_ease-in-out_infinite]" />
      <div className="absolute top-[60%] left-[8%] w-16 h-16 border border-primary/[0.06] rounded-full animate-[float_12s_ease-in-out_infinite_reverse]" />
      <div className="absolute bottom-[20%] right-[18%] w-24 h-24 border border-secondary/[0.05] rotate-12 rounded-lg animate-[float_14s_ease-in-out_infinite]" />

      {/* Static gradient orbs — no animation, just ambient color */}
      <div className="absolute top-[5%] right-[20%] w-60 h-60 rounded-full bg-primary/[0.04] blur-3xl" />
      <div className="absolute bottom-[10%] left-[10%] w-40 h-40 rounded-full bg-primary/[0.03] blur-2xl" />

      {/* CSS-only particles via pseudo-positioned dots */}
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/30 animate-[float_infinite_ease-in-out]"
          style={{
            left: `${5 + (i * 47 + 13) % 90}%`,
            top: `${5 + (i * 31 + 7) % 85}%`,
            animationDuration: `${3 + (i % 4) * 1.5}s`,
            animationDelay: `${(i % 5) * 0.6}s`,
          }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PAGE SECTION — Full-page snap with entrance animations
// ═══════════════════════════════════════════════════════════
function PageSection({ children, id, animation = 'fade', className = '' }: {
  children: React.ReactNode;
  id?: string;
  animation?: 'fade' | 'scale' | 'clip' | 'slide' | 'zoom';
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const variants: Record<string, { hidden: any; visible: any }> = {
    fade: {
      hidden: { opacity: 0, y: 80 },
      visible: { opacity: 1, y: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.88 },
      visible: { opacity: 1, scale: 1 },
    },
    clip: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
    slide: {
      hidden: { opacity: 0, x: -60, skewX: 2 },
      visible: { opacity: 1, x: 0, skewX: 0 },
    },
    zoom: {
      hidden: { opacity: 0, scale: 1.15 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  const v = variants[animation];

  return (
    <div ref={ref} id={id} className={`relative ${className}`}>
      <MotionDiv
        initial={v.hidden}
        animate={isInView ? v.visible : v.hidden}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        {children}
      </MotionDiv>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// LOADER
// ═══════════════════════════════════════════════════════════
function Loader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 600);
    const t3 = setTimeout(() => setPhase(3), 1000);
    const t4 = setTimeout(onComplete, 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <motion.div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
      exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}>
      <div className="relative w-20 h-20">
        {/* Expanding rings */}
        {[0, 1, 2].map(i => (
          <motion.div key={i}
            className="absolute inset-0 rounded-full border-2 border-primary"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={phase > i ? { scale: 1 + i * 0.5, opacity: [0.8, 0] } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primaryLight"
          initial={{ scale: 0 }}
          animate={{ scale: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-secondary font-display font-bold text-xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, ease }}
        >NBM</motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="font-mono text-[10px] text-secondary/30 mt-6 tracking-[0.3em] uppercase"
      >Loading</motion.div>
    </motion.div>
  );
}

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
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ delay: 0.1, duration: 0.6, ease }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-surface shadow-lg shadow-black/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
          <a href="#hero" className="font-display font-bold text-lg text-secondary tracking-tight">NBM<span className="text-primary">.</span></a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} onClick={playClick}
                className="font-mono text-[11px] text-secondary/50 hover:text-primary transition-colors tracking-wider uppercase relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <MagneticWrap>
              <a href="https://drive.google.com/file/d/1oU43XtO0xSjEs0uk-5vBNXsn5FRsXbI_/view?usp=sharing"
                target="_blank" rel="noopener noreferrer"
                className="btn-primary font-mono text-[11px] px-5 py-2.5 rounded-full tracking-wider inline-block">RESUME</a>
            </MagneticWrap>
          </div>
          <button onClick={() => { playClick(); setMobileOpen(true); }} className="md:hidden text-secondary p-2" aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white/98 backdrop-blur-xl flex flex-col items-center justify-center">
            <button onClick={() => setMobileOpen(false)} className="absolute top-5 right-6 text-secondary/50 hover:text-secondary" aria-label="Close menu">
              <X size={24} />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a key={link.href} href={link.href}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i, ease }}
                  onClick={() => { playClick(); setMobileOpen(false); }}
                  className="font-display text-3xl font-bold text-secondary hover:text-primary transition-colors">{link.label}</motion.a>
              ))}
              <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, ease }}
                href="https://drive.google.com/file/d/1oU43XtO0xSjEs0uk-5vBNXsn5FRsXbI_/view?usp=sharing"
                target="_blank" rel="noopener noreferrer" className="btn-primary font-mono text-sm px-8 py-3 rounded-full mt-4">RESUME</motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// HERO — Parallax + floating shapes + magnetic CTAs
// ═══════════════════════════════════════════════════════════
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const { playClick } = useAudioFeedback();

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0 grid-bg opacity-40" style={{ y: bgY }} />
      {/* Static ambient orbs — GPU composited, no JS animation */}
      <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full opacity-15 blur-[80px] will-change-transform"
        style={{ background: 'radial-gradient(circle, #ff5e00, #ff8c4240, transparent)' }} />
      <div className="absolute bottom-[-15%] left-[-5%] w-[300px] h-[300px] rounded-full opacity-10 blur-[60px]"
        style={{ background: 'radial-gradient(circle, #ff5e0060, transparent)' }} />
      <FloatingShapes />

      <motion.div style={{ y, opacity, scale }} className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16 md:pt-36 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left — Text Content */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6, ease }} className="mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2.5 card-static px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <span className="font-mono text-[10px] md:text-xs text-secondary/40 font-medium tracking-[0.15em]">AVAILABLE FOR HIGH-SCALE MISSIONS</span>
              </div>
            </motion.div>

            <div className="mb-5 md:mb-7 overflow-hidden">
              <h1 className="font-display text-[clamp(2.8rem,8vw,6rem)] font-bold leading-[0.9] tracking-tight text-secondary">
                <AnimChars text="NITHEES" delay={0.3} stagger={0.03} /><br />
                <AnimChars text="BALAJI" delay={0.5} stagger={0.03} className="gradient-text" /><br />
                <AnimChars text="MOHAN" delay={0.7} stagger={0.03} />
              </h1>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5, ease }} className="mb-8 md:mb-10">
              <p className="text-base md:text-lg text-secondary/60 max-w-xl leading-relaxed">
                Senior DevOps Architect — I build self-healing infrastructure and transform chaotic systems
                into scalable, cost-effective engines using{' '}
                <span className="text-primary font-semibold">Kubernetes</span> &amp;{' '}
                <span className="text-primary font-semibold">Terraform</span>.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.5, ease }} className="flex flex-wrap gap-4">
              <MagneticWrap>
                <a href="#experience" onClick={playClick} className="btn-primary font-mono text-xs md:text-sm px-7 py-3.5 rounded-full flex items-center gap-2.5 tracking-wider">
                  VIEW WORK <ArrowRight size={14} />
                </a>
              </MagneticWrap>
              <MagneticWrap>
                <a href="https://drive.google.com/file/d/1oU43XtO0xSjEs0uk-5vBNXsn5FRsXbI_/view?usp=sharing"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-ghost font-mono text-xs md:text-sm px-7 py-3.5 rounded-full flex items-center gap-2.5 tracking-wider">
                  <Download size={14} /> GET RESUME
                </a>
              </MagneticWrap>
            </motion.div>
          </div>

          {/* Right — Abstract Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease }}
            className="hidden md:block relative"
          >
            {/* Main terminal card */}
            <div className="relative w-full max-w-[440px] mx-auto">
              {/* Glow behind card */}
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/[0.03] to-transparent blur-2xl" />

              <div className="relative card rounded-2xl overflow-hidden shadow-xl shadow-black/[0.04]">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.05] bg-surface/50">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                  </div>
                  <span className="font-mono text-[9px] text-secondary/30 tracking-wider ml-2">infrastructure.status</span>
                </div>

                {/* Dashboard content */}
                <div className="p-5 space-y-4">
                  {/* Cluster status row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow" />
                      <span className="font-mono text-[11px] text-secondary/70">GKE Production</span>
                    </div>
                    <span className="font-mono text-[10px] text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full">HEALTHY</span>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Uptime', value: '99.99%', color: 'text-primary' },
                      { label: 'Pods', value: '847', color: 'text-secondary' },
                      { label: 'Latency', value: '12ms', color: 'text-green-600' },
                    ].map(m => (
                      <div key={m.label} className="bg-surface/80 rounded-xl p-3 text-center">
                        <div className={`font-display text-lg font-bold ${m.color}`}>{m.value}</div>
                        <div className="font-mono text-[9px] text-secondary/35 tracking-wider mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Mini code snippet */}
                  <div className="bg-[#1a1a2e] rounded-xl p-4 font-mono text-[11px] leading-relaxed">
                    <div className="text-gray-500">$ kubectl get nodes</div>
                    <div className="mt-1.5">
                      <span className="text-green-400">NAME</span>
                      <span className="text-gray-500 ml-8">STATUS</span>
                      <span className="text-gray-500 ml-6">AGE</span>
                    </div>
                    <div className="text-gray-300">node-pool-01{'  '}<span className="text-green-400">Ready</span>{'   '}142d</div>
                    <div className="text-gray-300">node-pool-02{'  '}<span className="text-green-400">Ready</span>{'   '}142d</div>
                    <div className="text-gray-300">node-pool-03{'  '}<span className="text-green-400">Ready</span>{'   '}89d</div>
                    <motion.span
                      className="inline-block w-1.5 h-3.5 bg-primary/80 ml-0.5"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'steps(2)' }}
                    />
                  </div>

                  {/* Deploy progress bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] text-secondary/50">Deploying v2.14.0</span>
                      <span className="font-mono text-[10px] text-primary font-bold">100%</span>
                    </div>
                    <div className="h-1.5 bg-black/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primaryLight rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 1.2, duration: 2, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating accent card — top right */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6, ease }}
                className="absolute -right-6 -top-4 card-static px-3 py-2 rounded-xl shadow-lg shadow-black/[0.03]"
              >
                <div className="flex items-center gap-2">
                  <Shield size={12} className="text-green-500" />
                  <span className="font-mono text-[9px] text-secondary/60 tracking-wider">0 INCIDENTS</span>
                </div>
              </motion.div>

              {/* Floating accent card — bottom left */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6, ease }}
                className="absolute -left-6 -bottom-3 card-static px-3 py-2 rounded-xl shadow-lg shadow-black/[0.03]"
              >
                <div className="flex items-center gap-2">
                  <Cloud size={12} className="text-primary" />
                  <span className="font-mono text-[9px] text-secondary/60 tracking-wider">MULTI-CLOUD</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] text-secondary/20 tracking-[0.3em]">SCROLL</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={16} className="text-primary/50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// TECH MARQUEE — Double row
// ═══════════════════════════════════════════════════════════
function TechMarquee() {
  const items = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK, ...TECH_STACK];
  return (
    <div className="py-6 md:py-10 border-y border-black/[0.06] overflow-hidden space-y-3 bg-gradient-to-r from-primary/[0.03] via-transparent to-primary/[0.03]">
      <div className="marquee-track animate-marquee">
        {items.map((tech, i) => (
          <span key={`a-${i}`} className="flex items-center gap-6 md:gap-8 px-5 md:px-7 shrink-0">
            <span className="font-display text-sm md:text-base font-bold text-secondary/30 whitespace-nowrap uppercase tracking-wider">{tech}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/30 shrink-0" />
          </span>
        ))}
      </div>
      <div className="marquee-track animate-marquee-reverse">
        {items.map((tech, i) => (
          <span key={`b-${i}`} className="flex items-center gap-6 md:gap-8 px-5 md:px-7 shrink-0">
            <span className="font-mono text-[11px] md:text-xs text-secondary/20 whitespace-nowrap tracking-widest uppercase">{tech}</span>
            <span className="w-1 h-1 rounded-full bg-secondary/10 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ABOUT — Parallax bg, 5-col grid, readable text, stats
// ═══════════════════════════════════════════════════════════
function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const stats = [
    { value: 18, suffix: '%', label: 'Cost Reduction', desc: 'GCP cloud spend' },
    { value: 99, suffix: '.99%', label: 'Uptime', desc: 'GKE clusters' },
    { value: 60, prefix: '-', suffix: '%', label: 'Deploy Errors', desc: 'CI/CD pipelines' },
    { value: 9, suffix: '+', label: 'Years Exp', desc: 'Production infra' },
  ];

  return (
    <section ref={sectionRef} className="pt-6 pb-10 md:pt-10 md:pb-14 relative">
      <motion.div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.03] blur-[100px] pointer-events-none"
        style={{ y: bgY, background: 'radial-gradient(circle, #ff5e00, transparent)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading num="01" title="About" highlight="Me" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14">
          <div className="md:col-span-3">
            <MotionDiv initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              <p className="text-base md:text-lg text-secondary/70 leading-relaxed mb-5">
                I architect cloud systems that scale. With over{' '}
                <span className="text-secondary font-semibold">9 years</span> of experience across
                AWS, GCP, and Kubernetes, I specialize in transforming brittle infrastructure
                into resilient, self-healing platforms.
              </p>
              <p className="text-sm md:text-base text-secondary/50 leading-relaxed">
                My approach combines immutable infrastructure principles with shift-left
                security and deep observability. I&apos;ve led teams through large-scale cloud
                migrations, built disaster recovery frameworks, and slashed operational
                costs — all while maintaining 99.99% uptime.
              </p>
            </MotionDiv>
          </div>
          <div className="md:col-span-2">
            <MotionDiv initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease }} className="card p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-primary/20 shadow-lg shadow-primary/10">
                  <img src="https://i.ibb.co/mCwSdtvZ/profile.png" alt="Nithees Balaji Mohan" className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <div className="font-display font-bold text-secondary text-base">Nithees Balaji Mohan</div>
                  <div className="text-sm text-primary font-medium">Senior DevOps Architect</div>
                </div>
              </div>
              <div className="space-y-3 text-sm text-secondary/50">
                <div className="flex items-center gap-3"><MapPin size={14} className="text-primary shrink-0" /><span className="text-secondary/60">Bangkok, Thailand</span></div>
                <div className="flex items-center gap-3"><Mail size={14} className="text-primary shrink-0" /><span className="text-secondary/60">nitheesbalaji@gmail.com</span></div>
                <div className="flex items-center gap-3"><Cloud size={14} className="text-primary shrink-0" /><span className="text-secondary/60">GCP / AWS / Kubernetes</span></div>
              </div>
              <div className="flex gap-2 pt-5 mt-5 border-t border-black/[0.06]">
                <a href="https://github.com/nitheesb" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-black/10 flex items-center justify-center text-secondary/30 hover:text-primary hover:border-primary/30 transition-all"><Github size={16} /></a>
                <a href="https://www.linkedin.com/in/nithees-balaji" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-black/10 flex items-center justify-center text-secondary/30 hover:text-primary hover:border-primary/30 transition-all"><Linkedin size={16} /></a>
              </div>
            </MotionDiv>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-10 md:mt-14">
          {stats.map((stat, i) => (
            <MotionDiv key={i} initial={{ opacity: 0, y: 25, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5, ease }} className="card rounded-xl p-5 md:p-6 group">
              <div className="font-display text-2xl md:text-3xl font-bold text-secondary group-hover:text-primary transition-colors duration-500">
                <Counter target={stat.value} suffix={stat.suffix} prefix={stat.prefix || ''} />
              </div>
              <div className="text-xs font-semibold text-secondary/60 mt-1.5">{stat.label}</div>
              <div className="text-[10px] text-secondary/35 mt-0.5">{stat.desc}</div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// EXPERIENCE — Parallax bg, staggered alternating cards
// ═══════════════════════════════════════════════════════════
function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="pt-6 pb-10 md:pt-10 md:pb-14 relative">
      <motion.div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.02] blur-[80px] pointer-events-none"
        style={{ y: bgY, background: 'radial-gradient(circle, #ff5e00, transparent)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading num="02" title="Mission" highlight="Logs" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
        <MotionDiv initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="mt-10 md:mt-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-primary/40" />
            <span className="font-mono text-[10px] text-primary/70 tracking-[0.2em] font-medium">TECH ARSENAL</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map((tech, i) => (
              <MotionDiv key={tech} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.02, ease }}
                className="text-[11px] md:text-xs font-medium bg-black/[0.04] text-secondary/60 px-3.5 py-1.5 rounded-full border border-black/[0.08] hover:border-primary/20 hover:text-primary transition-all duration-300 cursor-default">
                {tech}
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <MotionDiv initial={{ opacity: 0, y: 30, x: index % 2 === 0 ? -15 : 15 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease }}
      className="card rounded-2xl p-6 md:p-7 flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-primary via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold tracking-wide">{project.company}</span>
        <span className="text-xs text-secondary/30">{project.period}</span>
      </div>
      <h3 className="font-display text-lg md:text-xl font-bold text-secondary mb-3 leading-tight group-hover:text-primary/90 transition-colors duration-300">{project.role}</h3>
      <p className="text-sm text-secondary/55 leading-relaxed mb-2 flex-1">{project.description.mission} {project.description.execution}</p>
      <p className="text-xs text-primary/70 leading-relaxed mb-4 font-medium">{project.description.outcome}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map(tag => (
          <span key={tag} className="text-[10px] font-medium bg-black/[0.04] text-secondary/50 px-2.5 py-1 rounded-full">{tag}</span>
        ))}
      </div>
      <div className="flex gap-6 pt-4 border-t border-black/[0.05]">
        {project.stats.map((stat, i) => (
          <div key={i}>
            <div className="font-display text-base font-bold gradient-text">{stat.value}</div>
            <div className="text-[9px] font-medium text-secondary/25 tracking-wider uppercase">{stat.label}</div>
          </div>
        ))}
      </div>
    </MotionDiv>
  );
}

// ═══════════════════════════════════════════════════════════
// SKILLS — Parallax bg, tabs + animated bars
// ═══════════════════════════════════════════════════════════
function SkillsSection() {
  const [active, setActive] = useState(0);
  const { playClick } = useAudioFeedback();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="pt-6 pb-10 md:pt-10 md:pb-14 relative">
      <motion.div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" style={{ y: bgY }} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading num="03" title="Skill" highlight="Matrix"
          subtitle="Core competencies honed across 9+ years of production-grade infrastructure." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
          <div>
            <div className="flex flex-wrap gap-2">
              {SKILL_CATEGORIES.map((cat, i) => (
                <button key={i} onClick={() => { playClick(); setActive(i); }}
                  className={`text-[11px] md:text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-300 ${
                    active === i
                      ? 'bg-primary text-white shadow-[0_0_20px_rgba(255,94,0,0.3)]'
                      : 'bg-black/[0.04] text-secondary/40 border border-black/[0.06] hover:border-black/10 hover:text-secondary/60'
                  }`}>{cat.category}</button>
              ))}
            </div>
          </div>
          <div>
            <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease }} className="space-y-4">
              <div className="font-mono text-[10px] text-secondary/20 tracking-wider mb-5">
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
    <MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4, ease }} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-secondary/70 font-medium group-hover:text-secondary transition-colors">{name}</span>
        <span className="font-mono text-xs text-primary font-bold">{level}</span>
      </div>
      <div className="skill-bar-bg h-2 md:h-2.5 rounded-full">
        <motion.div className="skill-bar-fill rounded-full"
          initial={{ width: 0 }} animate={{ width: `${level}%` }}
          transition={{ delay: delay + 0.2, duration: 1, ease }} />
      </div>
    </MotionDiv>
  );
}

// ═══════════════════════════════════════════════════════════
// SERVICES — Bento grid + gradient hover glow
// ═══════════════════════════════════════════════════════════
function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} className="pt-6 pb-10 md:pt-10 md:pb-14 relative overflow-hidden">
      <motion.div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.02] blur-[80px] pointer-events-none"
        style={{ y: bgY, background: 'radial-gradient(circle, #ff5e00, transparent)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading num="04" title="Available" highlight="Protocols"
          subtitle="End-to-end DevOps services — from architecture design to production operations." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {SERVICES.map((service, i) => (
            <MotionDiv key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }} transition={{ delay: i * 0.08, duration: 0.5, ease }}
              className={`card rounded-2xl p-6 md:p-7 group relative overflow-hidden ${i === 0 ? 'md:col-span-2' : ''}`}>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(255,94,0,0.06) 0%, transparent 50%)' }} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 text-primary group-hover:shadow-[0_0_25px_rgba(255,94,0,0.2)] transition-all duration-500">
                    <service.icon size={22} />
                  </div>
                  <ArrowUpRight size={16} className="text-secondary/10 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
                <h3 className="font-display text-lg md:text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                <p className="text-sm text-secondary/55 leading-relaxed mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {service.features.map((f, fi) => (
                    <span key={fi} className="text-[10px] font-medium text-primary/60 bg-primary/[0.06] px-2.5 py-1 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// CONTACT — Console form + CTA
// ═══════════════════════════════════════════════════════════
function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { playClick } = useAudioFeedback();
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); playClick(); setStatus('sending'); setTimeout(() => setStatus('sent'), 2500); };

  return (
    <section className="pt-6 pb-10 md:pt-10 md:pb-14 relative">
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading num="05" title="Let's Build" highlight="Together" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <MotionDiv initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
              <p className="text-base md:text-lg text-secondary/60 max-w-md mb-8 leading-relaxed">
                Ready for high-impact cloud architecture &amp; DevOps consultations.
                Expected response latency: <span className="text-primary font-semibold">&lt; 24h</span>
              </p>
            </MotionDiv>
            <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, ease }} className="space-y-4">
              <a href="mailto:nitheesbalaji@gmail.com" className="flex items-center gap-3 text-secondary/50 hover:text-primary transition-colors group">
                <Mail size={16} className="text-primary" /><span className="text-sm">nitheesbalaji@gmail.com</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </a>
              <a href="https://www.linkedin.com/in/nithees-balaji/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-secondary/50 hover:text-primary transition-colors group">
                <Linkedin size={16} className="text-primary" /><span className="text-sm">LinkedIn Profile</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </a>
              <a href="https://github.com/nitheesb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-secondary/50 hover:text-primary transition-colors group">
                <Github size={16} className="text-primary" /><span className="text-sm">GitHub</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </a>
            </MotionDiv>
          </div>
          <MotionDiv initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5, ease }} className="card rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-black/[0.05] flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="font-mono text-[9px] text-secondary/25 tracking-widest">Signal_Composer.v1</span>
              <Shield size={11} className="text-primary/30" />
            </div>
            <AnimatePresence mode="wait">
              {status === 'idle' ? (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} className="p-6 md:p-7 space-y-5">
                  {[
                    { label: 'Source_ID', type: 'text', placeholder: 'Your name', key: 'name' as const },
                    { label: 'Return_Address', type: 'email', placeholder: 'email@domain.com', key: 'email' as const },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="text-[10px] font-mono text-primary/60 font-semibold tracking-[0.15em] block mb-2 uppercase">{field.label}</label>
                      <input required type={field.type} placeholder={field.placeholder}
                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-secondary text-sm focus:border-primary/40 focus:bg-white outline-none transition-all placeholder:text-secondary/30"
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })} />
                    </div>
                  ))}
                  <div>
                    <label className="text-[10px] font-mono text-primary/60 font-semibold tracking-[0.15em] block mb-2 uppercase">Message_Payload</label>
                    <textarea required rows={4} placeholder="Describe the mission..."
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-secondary text-sm focus:border-primary/40 focus:bg-white outline-none transition-all resize-none placeholder:text-secondary/30"
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <button type="submit" className="w-full btn-primary font-mono text-xs py-4 rounded-xl flex items-center justify-center gap-3 tracking-[0.15em] uppercase">
                    <Send size={14} /> Transmit Signal
                  </button>
                </motion.form>
              ) : status === 'sending' ? (
                <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-16 flex flex-col items-center justify-center space-y-6">
                  <div className="relative">
                    <Cpu size={36} className="text-primary animate-pulse" />
                    <motion.div animate={{ scale: [1, 2], opacity: [0.4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 border border-primary rounded-full" />
                  </div>
                  <div className="font-mono text-xs text-primary/60 tracking-[0.2em]">UPLOADING DATA PACKETS...</div>
                  <div className="w-40 h-[2px] bg-black/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2.2, ease: 'easeInOut' }} className="h-full bg-gradient-to-r from-primary to-primaryLight" />
                  </div>
                </motion.div>
              ) : (
                <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-16 flex flex-col items-center justify-center space-y-5 text-center">
                  <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20"><Shield size={24} className="text-green-500" /></div>
                  <h3 className="text-xl font-display font-bold text-secondary">Signal Received</h3>
                  <p className="text-sm text-secondary/40 max-w-[220px]">Your transmission reaches the architect. Stand by for response.</p>
                  <button onClick={() => setStatus('idle')} className="mt-2 px-5 py-2.5 border border-black/10 rounded-xl text-secondary/50 text-[11px] font-medium hover:border-primary/30 hover:text-primary transition-all">Close Channel</button>
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
    <footer className="py-8 border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[11px] text-secondary/30 tracking-wider">&copy; 2026 NITHEES BALAJI MOHAN</span>
        <div className="flex items-center gap-6">
          {[
            { icon: Github, href: 'https://github.com/nitheesb', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/nithees-balaji', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:nitheesbalaji@gmail.com', label: 'Email' },
          ].map(link => (
            <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={link.label}
              className="text-secondary/30 hover:text-primary transition-colors"><link.icon size={16} /></a>
          ))}
        </div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[11px] text-secondary/30 hover:text-primary transition-colors tracking-wider flex items-center gap-1.5">
          BACK TO TOP <ArrowUpRight size={10} />
        </button>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════
// SCROLL PROGRESS
// ═══════════════════════════════════════════════════════════
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-primaryLight z-[100] origin-left" style={{ scaleX }} />;
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
          <div className="bg-bg text-secondary font-sans selection:bg-primary/20 selection:text-secondary">
            <ScrollProgress />
            <CursorCanvas />
            <Navbar />
            <main>
              <HeroSection />
              <PageSection id="about" animation="clip">
                <TechMarquee />
                <AboutSection />
              </PageSection>
              <PageSection id="experience" animation="scale">
                <ExperienceSection />
              </PageSection>
              <PageSection id="skills" animation="fade">
                <SkillsSection />
              </PageSection>
              <PageSection id="services" animation="slide">
                <ServicesSection />
              </PageSection>
              <PageSection id="contact" animation="zoom">
                <ContactSection />
                <Footer />
              </PageSection>
            </main>
            <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, ease }}
              onClick={() => { playClick(); setIsTerminalOpen(true); }} aria-label="Open Command Terminal"
              className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-surface border border-black/[0.06] flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:shadow-[0_0_30px_rgba(255,94,0,0.3)] transition-all duration-300 group">
              <TerminalIcon size={18} className="group-hover:rotate-12 transition-transform" />
            </motion.button>
            <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} onAction={(cmd) => console.log(cmd)} />
          </div>
        )}
      </AudioProvider>
    </ErrorBoundary>
  );
}

export default App;
