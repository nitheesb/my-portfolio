
import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

const MotionDiv = motion.div as any;

const BentoGrid: React.FC = () => {
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
            group relative bg-white border border-gray-200 p-6 
            hover:shadow-2xl hover:border-primary transition-all duration-500 
            flex flex-col justify-between 
            h-full overflow-hidden
            ${project.colSpan ? `lg:${project.colSpan}` : 'lg:col-span-1'}
          `}
            >
               {/* Decorative scanline for premium feel */}
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-x-full group-hover:animate-scan-once pointer-events-none"></div>

               {/* Top Section */}
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[9px] bg-gray-100 text-gray-600 px-2 py-1 rounded font-bold uppercase tracking-wider">{project.company}</span>
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
                        <span key={tag} className="text-[10px] border border-gray-100 bg-gray-50 px-2 py-1 rounded text-gray-500 font-bold">
                           #{tag}
                        </span>
                     ))}
                  </div>
               </div>

               {/* Bottom Section: Stats */}
               <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4 mt-auto w-full">
                  {project.stats.map((stat, i) => (
                     <div key={i}>
                        <div className="text-lg font-bold font-display leading-none mb-1" style={{ color: stat.color === '#ffffff' || stat.color === '#171717' ? '#171717' : stat.color }}>
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
