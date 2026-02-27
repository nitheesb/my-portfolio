
import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

const MotionDiv = motion.div as any;

const BentoGrid: React.FC = () => {
   const getColSpanClass = (colSpan?: string) => {
      if (colSpan === 'md:col-span-2') return 'lg:col-span-2';
      return 'lg:col-span-1';
   };

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10 auto-rows-fr">
         {PROJECTS.map((project, index) => (
            <MotionDiv
               key={project.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
               className={`
            group relative glass-card rounded-2xl p-6 
            hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-primary/20 hover:-translate-y-1 transition-all duration-500 
            flex flex-col justify-between 
            h-full overflow-hidden
            ${getColSpanClass(project.colSpan)}
          `}
            >
               {/* Gradient top accent */}
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

               {/* Top Section */}
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[9px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">{project.company}</span>
                        <span className="font-mono text-[9px] text-gray-400">{project.period}</span>
                     </div>
                     <h3 className="text-xl md:text-2xl font-display font-bold text-black leading-tight group-hover:text-primary transition-colors">
                        {project.role}
                     </h3>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 group-hover:translate-y-0 duration-300">
                     <ArrowUpRight size={20} className="text-primary" />
                  </div>
               </div>

               {/* Middle Section: Description */}
               <div className="mb-6 flex-grow">
                  <p className="font-mono text-xs text-gray-600 leading-relaxed mb-4">
                     {project.description.mission} <br />
                     <span className="text-gray-400 mt-1 block">{project.description.execution}</span>
                  </p>

                  <div className="flex flex-wrap gap-2">
                     {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-primary/5 text-primary px-2.5 py-1 rounded-full font-bold font-mono">
                           {tag}
                        </span>
                     ))}
                  </div>
               </div>

               {/* Bottom Section: Stats */}
               <div className="grid grid-cols-2 gap-4 border-t border-gray-100/50 pt-4 mt-auto w-full">
                  {project.stats.map((stat, i) => (
                     <div key={i}>
                        <div className="text-xl font-bold font-display leading-none mb-1 gradient-text">
                           {stat.value}
                        </div>
                        <div className="text-[9px] font-mono text-gray-400 font-bold uppercase tracking-wider">{stat.label}</div>
                     </div>
                  ))}
               </div>
            </MotionDiv>
         ))}
      </div>
   );
};

export default BentoGrid;
