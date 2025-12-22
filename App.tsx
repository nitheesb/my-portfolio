import React, { useState } from 'react';
import { Terminal as TerminalIcon, ChevronDown, ExternalLink, Code, Server, Shield, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

import CursorCanvas from './components/CursorCanvas';
import Terminal from './components/Terminal';
import HeroHUD from './components/HeroHUD';
import MagneticWrapper from './components/MagneticWrapper';

// --- DATA ---
const PROJECTS = [
    { title: "E-Commerce Microservices", desc: "High-scale GKE cluster handling 50k+ RPS. Implemented GitOps workflow with ArgoCD.", tags: ["GKE", "ArgoCD", "Terraform"] },
    { title: "FinTech Security Vault", desc: "Zero-trust architecture for banking client. HashiCorp Vault integration & mTLS mesh.", tags: ["Vault", "Istio", "AWS"] },
    { title: "Serverless Data Pipeline", desc: "Event-driven ETL processing 5TB/day. 40% cost reduction via Spot Instances.", tags: ["Lambda", "Kinesis", "Python"] },
    { title: "Global CDN Optimization", desc: "Edge routing logic for media delivery. <50ms latency worldwide.", tags: ["Cloudflare", "Rust", "WASM"] }
];

const SKILLS = [
    { name: "Kubernetes", level: 98 },
    { name: "Terraform", level: 95 },
    { name: "AWS / GCP", level: 92 },
    { name: "CI/CD (GitHub Actions)", level: 94 },
    { name: "Python / Go", level: 90 },
    { name: "Prometheus / Grafana", level: 88 }
];

// --- COMPONENTS ---

const ProjectCard = ({ project, index }: { project: any, index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group relative border border-white/10 bg-black/40 backdrop-blur-md p-8 rounded-xl overflow-hidden hover:border-[#ff5e00]/50 transition-colors"
    >
        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
            <ExternalLink size={16} className="text-[#ff5e00]" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ff5e00] transition-colors">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
                <span key={tag} className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 bg-white/5 border border-white/5 rounded text-gray-300">
                    {tag}
                </span>
            ))}
        </div>
    </motion.div>
);

const SkillBar = ({ skill, index }: { skill: any, index: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className="mb-4"
    >
        <div className="flex justify-between mb-1">
            <span className="font-mono text-xs text-gray-300 uppercase tracking-widest">{skill.name}</span>
            <span className="font-mono text-xs text-[#ff5e00]">{skill.level}%</span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-[#ff5e00] shadow-[0_0_10px_#ff5e00]"
            />
        </div>
    </motion.div>
);

function App() {
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-[#ff5e00] selection:text-black">

            {/* BACKGROUND */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <CursorCanvas />
            </div>

            {/* NAV */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-black/10 transition-all duration-500">
                <div className="text-[#ff5e00] font-mono font-bold tracking-widest text-xl cursor-pointer">
                    NBM.SYS
                </div>
                <button
                    onClick={() => setIsTerminalOpen(true)}
                    className="bg-[#ff5e00]/10 border border-[#ff5e00]/50 text-[#ff5e00] px-4 py-2 rounded font-mono text-xs hover:bg-[#ff5e00] hover:text-black transition-all"
                >
                    CMD_TERMINAL
                </button>
            </nav>

            <main className="flex flex-col w-full relative z-10">

                {/* HERO */}
                <section className="min-h-screen flex flex-col justify-center items-center px-4 relative">
                    <HeroHUD />
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-5xl relative z-20"
                    >
                        <div className="inline-flex items-center gap-2 border border-[#ff5e00]/30 bg-[#ff5e00]/5 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
                            <span className="w-1.5 h-1.5 bg-[#ff5e00] rounded-full animate-pulse"></span>
                            <span className="font-mono text-[10px] text-[#ff5e00] tracking-[0.3em]">AVAILABLE_FOR_HIRE</span>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter mb-4 leading-none">
                            <span className="block text-white">DEVOPS</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#ff5e00] to-orange-900">ARCHITECT</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                            Building resilient engines for the modern web.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <MagneticWrapper strength={0.2}>
                                <button className="bg-[#ff5e00] text-black font-bold px-8 py-4 rounded uppercase tracking-widest hover:scale-105 transition-all">
                                    Initialize
                                </button>
                            </MagneticWrapper>
                        </div>
                    </motion.div>
                </section>

                {/* PROJECTS GRID */}
                <section className="py-32 px-6 container mx-auto">
                    <div className="flex items-end gap-4 mb-20 border-b border-white/10 pb-4">
                        <h2 className="text-4xl md:text-6xl font-bold">MISSION_LOGS</h2>
                        <span className="text-[#ff5e00] font-mono text-xl mb-2">/01</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
                    </div>
                </section>

                {/* SKILLS ARSENAL */}
                <section className="py-32 bg-black/50 border-y border-white/5">
                    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold mb-8">
                                ARSENAL
                                <span className="text-[#ff5e00] font-mono text-xl ml-2">/02</span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                A curated stack of high-performance tools. Optimized for automation, scaling, and cost-efficiency.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border border-white/10 p-4 rounded flex items-center gap-3">
                                    <Server size={20} className="text-[#ff5e00]" />
                                    <span className="font-mono text-xs">INFRASTRUCTURE</span>
                                </div>
                                <div className="border border-white/10 p-4 rounded flex items-center gap-3">
                                    <Shield size={20} className="text-[#ff5e00]" />
                                    <span className="font-mono text-xs">SECURITY</span>
                                </div>
                                <div className="border border-white/10 p-4 rounded flex items-center gap-3">
                                    <Cpu size={20} className="text-[#ff5e00]" />
                                    <span className="font-mono text-xs">COMPUTE</span>
                                </div>
                                <div className="border border-white/10 p-4 rounded flex items-center gap-3">
                                    <Code size={20} className="text-[#ff5e00]" />
                                    <span className="font-mono text-xs">AUTOMATION</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
                            {SKILLS.map((s, i) => <SkillBar key={i} skill={s} index={i} />)}
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="py-20 text-center">
                    <h3 className="text-2xl font-bold mb-8">READY TO DEPLOY?</h3>
                    <a href="mailto:contact@nithees.io" className="text-[#ff5e00] text-xl font-mono hover:underline">INITIATE_CONTACT()</a>
                </footer>

            </main>

            <Terminal
                isOpen={isTerminalOpen}
                onClose={() => setIsTerminalOpen(false)}
                onAction={(cmd) => console.log(cmd)}
            />
        </div>
    );
}

export default App;