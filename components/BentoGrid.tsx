import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

const MotionDiv = motion.div as any;

const BentoGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
      {PROJECTS.map((project, index) => (
        <MotionDiv
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between ${project.colSpan || 'col-span-1'}`}
        >
          {/* Top Section */}
          <div className="flex justify-between items-start mb-4">
             <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded font-bold uppercase tracking-wider">{project.company}</span>
                    <span className="font-mono text-[10px] text-gray-400">{project.period}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-black leading-tight group-hover:text-primary transition-colors">
                    {project.role}
                </h3>
             </div>
             <div className="bg-gray-50 p-2 rounded-full text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowUpRight size={18} />
             </div>
          </div>

          {/* Middle Section: Description */}
          <div className="mb-6 flex-grow">
             <p className="font-mono text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-4">
                {project.description.mission} <span className="text-gray-400">// {project.description.outcome}</span>
             </p>
             
             <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] border border-gray-100 bg-gray-50 px-2 py-1 rounded text-gray-500 font-bold">
                        {tag}
                    </span>
                ))}
             </div>
          </div>

          {/* Bottom Section: Stats */}
          <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-4 mt-auto">
             {project.stats.map((stat, i) => (
                 <div key={i}>
                    <div className="text-lg font-bold font-display" style={{ color: stat.color === '#ffffff' || stat.color === '#171717' ? '#171717' : stat.color }}>
                        {stat.value}
                    </div>
                    <div className="text-[9px] font-mono text-gray-400 font-bold uppercase">{stat.label}</div>
                 </div>
             ))}
          </div>

        </MotionDiv>
      ))}
    </div>
  );
};

export default BentoGrid;