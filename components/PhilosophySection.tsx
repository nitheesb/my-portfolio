import React from 'react';
import { motion } from 'framer-motion';
import { PHILOSOPHY_CARDS } from '../constants';

const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12 md:mb-20">
            <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-display font-bold uppercase text-black"
            >
                Architecting <span className="text-primary">Resilience</span>
            </motion.h2>
            <p className="mt-4 text-gray-500 font-mono text-sm md:text-base max-w-2xl">
                // ENGINEERING_PRINCIPLES.v2
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PHILOSOPHY_CARDS.map((card, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="group bg-white border border-gray-200 p-8 rounded-lg hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                        <card.icon className="text-primary" size={24} />
                    </div>
                    <h3 className="text-xl font-bold font-display uppercase tracking-wider mb-4 text-black group-hover:text-primary transition-colors">
                        {card.title}
                    </h3>
                    <p className="text-gray-600 font-mono text-sm leading-relaxed text-justify">
                        {card.desc}
                    </p>
                </motion.div>
            ))}
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

export default PhilosophySection;