import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';
import { Terminal } from 'lucide-react';

const MotionDiv = motion.div as any;

function ProgressRing({ progress, size = 72, strokeWidth = 4 }: { progress: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,94,0,0.1)" strokeWidth={strokeWidth} fill="none" />
      <motion.circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke="url(#desktopSkillGrad)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        strokeDasharray={circumference}
      />
      <defs>
        <linearGradient id="desktopSkillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff5e00" />
          <stop offset="100%" stopColor="#ff8c42" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const SkillsMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="py-20 relative">
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <span className="font-mono text-[10px] text-primary font-bold tracking-[0.2em] block mb-3">SYSTEM_MODULES</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-black">
              SKILL <span className="gradient-text">MATRIX</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-gray-400 mt-2 md:mt-0 flex items-center gap-2">
            <Terminal size={12} className="text-primary" />
            <span>root@core:~/modules/{SKILL_CATEGORIES[activeCategory].category.toLowerCase().replace(/ /g, '_')}</span>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-3 mb-10 overflow-x-auto mobile-hide-scrollbar pb-2">
          {SKILL_CATEGORIES.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(i)}
              className={`whitespace-nowrap font-mono text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-300 ${
                activeCategory === i
                  ? 'bg-primary text-white shadow-[0_2px_15px_rgba(255,94,0,0.3)]'
                  : 'bg-white/80 text-gray-500 border border-gray-200 hover:border-primary/30 hover:text-gray-700'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {SKILL_CATEGORIES[activeCategory].items.map((skill, i) => (
            <MotionDiv
              key={`${activeCategory}-${skill.name}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="glass-card rounded-2xl p-6 flex flex-col items-center text-center hover:border-primary/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 group cursor-default"
            >
              <div className="relative mb-3">
                <ProgressRing progress={skill.level} />
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold font-display text-black group-hover:text-primary transition-colors">
                  {skill.level}
                </span>
              </div>
              <span className="text-black font-bold text-sm font-display">{skill.name}</span>
              <span className="text-[10px] font-mono text-gray-400 mt-1">PROFICIENCY</span>
            </MotionDiv>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsMatrix;
