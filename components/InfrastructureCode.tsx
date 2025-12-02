import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Check, Play, Copy } from 'lucide-react';

const MotionDiv = motion.div as any;

const CODE_LINES = [
  { text: 'resource "google_container_cluster" "primary" {', indent: 0, color: 'text-purple-400' },
  { text: 'name     = "nithees-prod-cluster"', indent: 1, color: 'text-green-300' },
  { text: 'location = "asia-southeast1"', indent: 1, color: 'text-green-300' },
  { text: '', indent: 0, color: '' },
  { text: 'remove_default_node_pool = true', indent: 1, color: 'text-blue-300' },
  { text: 'initial_node_count       = 1', indent: 1, color: 'text-blue-300' },
  { text: '}', indent: 0, color: 'text-purple-400' },
  { text: '', indent: 0, color: '' },
  { text: 'resource "google_container_node_pool" "primary_nodes" {', indent: 0, color: 'text-purple-400' },
  { text: 'name       = "high-mem-pool"', indent: 1, color: 'text-green-300' },
  { text: 'cluster    = google_container_cluster.primary.name', indent: 1, color: 'text-gray-300' },
  { text: 'node_count = 3', indent: 1, color: 'text-blue-300' },
  { text: '', indent: 0, color: '' },
  { text: 'node_config {', indent: 1, color: 'text-yellow-400' },
  { text: 'preemptible  = true', indent: 2, color: 'text-blue-300' },
  { text: 'machine_type = "e2-standard-4"', indent: 2, color: 'text-green-300' },
  { text: '}', indent: 1, color: 'text-yellow-400' },
  { text: '}', indent: 0, color: 'text-purple-400' },
];

const InfrastructureCode: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<string[]>([]);

  // Typing Effect
  useEffect(() => {
    if (visibleLines < CODE_LINES.length) {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 150); // Speed of typing
      return () => clearTimeout(timeout);
    } else {
        // Start "Deployment" after typing finishes
        setTimeout(() => startDeployment(), 1000);
    }
  }, [visibleLines]);

  const startDeployment = () => {
      setIsDeploying(true);
      const steps = [
          "Initializing Terraform backend...",
          "Plan: 2 to add, 0 to change, 0 to destroy.",
          "google_container_cluster.primary: Creating...",
          "google_container_cluster.primary: Creation complete after 3m12s",
          "Apply complete! Resources: 2 added, 0 destroyed."
      ];
      
      steps.forEach((step, index) => {
          setTimeout(() => {
              setDeployStatus(prev => [...prev, step]);
          }, index * 1200);
      });
  };

  return (
    <section className="py-20 bg-bg border-b border-border">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Explanation */}
            <div>
                <MotionDiv 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 text-primary font-mono text-xs mb-4 font-bold"
                >
                    <Terminal size={14} />
                    <span>INFRASTRUCTURE AS CODE</span>
                </MotionDiv>
                <h2 className="text-3xl md:text-5xl font-display font-bold uppercase mb-6 leading-tight text-black">
                    DEFINING <br/> <span className="text-primary">REALITY</span> WITH CODE
                </h2>
                <p className="text-gray-600 font-mono text-sm leading-relaxed mb-8">
                    I don't just manage servers; I program them. My infrastructure is version-controlled, automated, and self-healing. Using Terraform and Kubernetes, I define entire data centers in a few lines of code.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 p-4 rounded shadow-sm">
                        <div className="text-2xl font-bold text-black mb-1">100%</div>
                        <div className="text-[10px] text-gray-500 font-mono uppercase font-bold">Reproducibility</div>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded shadow-sm">
                        <div className="text-2xl font-bold text-black mb-1">0</div>
                        <div className="text-[10px] text-gray-500 font-mono uppercase font-bold">Manual Config</div>
                    </div>
                </div>
            </div>

            {/* Right: Code Window (Keep dark for contrast) */}
            <MotionDiv 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-[#1e1e1e] rounded-lg shadow-2xl border border-gray-800 overflow-hidden font-mono text-xs md:text-sm relative"
            >
                {/* Window Bar */}
                <div className="bg-[#252526] px-4 py-2 flex justify-between items-center border-b border-[#333]">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-gray-500 text-xs">main.tf</div>
                    <div className="text-gray-500"><Play size={12} /></div>
                </div>

                {/* Code Area */}
                <div className="p-6 h-[400px] overflow-hidden relative">
                    {CODE_LINES.slice(0, visibleLines).map((line, idx) => (
                        <div key={idx} className="flex leading-6">
                            <div className="w-8 text-gray-600 select-none text-right pr-4">{idx + 1}</div>
                            <div style={{ paddingLeft: `${line.indent * 1.5}rem` }} className={line.color}>
                                {line.text}
                            </div>
                        </div>
                    ))}
                    
                    {/* Cursor */}
                    {visibleLines < CODE_LINES.length && (
                        <MotionDiv 
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="w-2 h-4 bg-primary inline-block ml-1 align-middle"
                        />
                    )}

                    {/* Deployment Terminal Overlay */}
                    {isDeploying && (
                        <div className="absolute bottom-0 left-0 w-full bg-[#0d0d0d]/95 border-t border-primary/30 p-4 font-mono text-xs backdrop-blur-sm transition-all duration-500">
                             <div className="text-primary mb-2 flex items-center gap-2">
                                 <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                 Running terraform apply...
                             </div>
                             <div className="space-y-1 text-gray-300">
                                 {deployStatus.map((status, i) => (
                                     <div key={i} className="flex gap-2">
                                         <span className="text-green-500">➜</span>
                                         {status}
                                     </div>
                                 ))}
                             </div>
                        </div>
                    )}
                </div>
            </MotionDiv>

        </div>
    </section>
  );
};

export default InfrastructureCode;