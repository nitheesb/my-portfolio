import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';
import { Cpu, Terminal, Layers } from 'lucide-react';

const SkillsMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="py-24 bg-[#080808] border-y border-gray-900 relative">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row gap-12">
            
            {/* Left: Category Selector */}
            <div className="md:w-1/3">
                <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                    <Cpu className="text-primary" />
                    <span>SYSTEM_MODULES</span>
                </h2>
                <div className="space-y-2">
                    {SKILL_CATEGORIES.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCategory(index)}
                            className={`w-full text-left px-6 py-4 font-mono text-sm border-l-2 transition-all duration-300 flex justify-between items-center group ${
                                activeCategory === index 
                                ? 'bg-white/5 border-primary text-white' 
                                : 'border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-600'
                            }`}
                        >
                            <span>{cat.category}</span>
                            <span className={`opacity-0 group-hover:opacity-100 transition-opacity text-primary ${activeCategory === index ? 'opacity-100' : ''}`}>
                                [LOAD]
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right: Skills Display */}
            <div className="md:w-2/3 bg-black border border-gray-800 p-8 relative overflow-hidden min-h-[400px]">
                {/* Decorative Scanline */}
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 animate-[pulse_3s_ease-in-out_infinite]"></div>
                
                <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                    <div className="font-mono text-xs text-primary flex items-center gap-2">
                        <Terminal size={14} />
                        <span>root@core:~/modules/{SKILL_CATEGORIES[activeCategory].category.toLowerCase().replace(/ /g, '_')}</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SKILL_CATEGORIES[activeCategory].items.map((skill, index) => (
                        <motion.div
                            key={`${activeCategory}-${skill.name}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-surface border border-gray-800 p-4 hover:border-primary/50 transition-colors group"
                        >
                            <div className="flex justify-between items-end mb-2">
                                <span className="font-display font-bold text-lg text-gray-200 group-hover:text-primary transition-colors">
                                    {skill.name}
                                </span>
                                <span className="font-mono text-xs text-gray-600">
                                    v{Math.floor(Math.random() * 5)}.{Math.floor(Math.random() * 9)}
                                </span>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="h-1 w-full bg-gray-800 mt-2 overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                                    className="h-full bg-secondary shadow-[0_0_10px_rgba(0,242,255,0.5)]"
                                />
                            </div>
                            
                            <div className="mt-2 flex justify-between font-mono text-[10px] text-gray-500">
                                <span>STATUS: ACTIVE</span>
                                <span>{skill.level}% EFFICIENCY</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Decor elements */}
                <div className="absolute bottom-4 right-4 text-right">
                    <div className="grid grid-cols-3 gap-1 mb-1">
                        {[...Array(9)].map((_, i) => (
                            <div key={i} className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-primary' : 'bg-gray-800'}`}></div>
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