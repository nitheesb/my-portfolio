import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';
import { Cpu, Terminal, Layers } from 'lucide-react';

const SkillsMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="py-20 bg-bg border-b border-gray-900 relative">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            
            {/* Left: Category Selector */}
            <div className="md:w-1/3">
                <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                    <Cpu className="text-primary" />
                    <span>SYSTEM_MODULES</span>
                </h2>
                <div className="space-y-1">
                    {SKILL_CATEGORIES.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCategory(index)}
                            className={`w-full text-left px-4 py-3 font-mono text-xs md:text-sm border-l-2 transition-all duration-300 flex justify-between items-center group ${
                                activeCategory === index 
                                ? 'bg-white/5 border-primary text-white' 
                                : 'border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-600'
                            }`}
                        >
                            <span>{cat.category}</span>
                            <span className={`opacity-0 group-hover:opacity-100 transition-opacity text-primary ${activeCategory === index ? 'opacity-100' : ''}`}>
                                &lt;&lt;
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right: Skills Display */}
            <div className="md:w-2/3 bg-surface/50 border border-gray-800 p-6 md:p-8 relative overflow-hidden min-h-[350px] md:min-h-[400px] rounded-lg backdrop-blur-sm">
                
                <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                    <div className="font-mono text-[10px] md:text-xs text-primary flex items-center gap-2 overflow-hidden whitespace-nowrap">
                        <Terminal size={14} />
                        <span className="truncate">root@core:~/modules/{SKILL_CATEGORIES[activeCategory].category.toLowerCase().replace(/ /g, '_')}</span>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/20"></div>
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/20"></div>
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/50"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {SKILL_CATEGORIES[activeCategory].items.map((skill, index) => (
                        <motion.div
                            key={`${activeCategory}-${skill.name}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group"
                        >
                            <div className="flex justify-between items-end mb-1">
                                <span className="font-display font-bold text-base md:text-lg text-gray-300 group-hover:text-primary transition-colors">
                                    {skill.name}
                                </span>
                                <span className="font-mono text-[10px] text-gray-600">
                                    {skill.level}%
                                </span>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="h-1 w-full bg-gray-800 mt-1 overflow-hidden rounded-full">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ duration: 0.8, delay: 0.1 + (index * 0.05) }}
                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Decor elements */}
                <div className="absolute bottom-4 right-4 text-right opacity-30">
                    <div className="grid grid-cols-4 gap-1">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className={`w-0.5 h-0.5 ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`}></div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrix;