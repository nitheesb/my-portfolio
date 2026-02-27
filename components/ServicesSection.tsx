import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import ScrambleText from './ScrambleText';

const MotionDiv = motion.div as any;

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 flex items-end justify-between">
            <div>
                <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-4 text-black">
                    AVAILABLE <span className="gradient-text">PROTOCOLS</span>
                </h2>
                <div className="font-mono text-sm text-gray-500">
                    // SELECT_MODULE_TO_EXECUTE
                </div>
            </div>
            <div className="hidden md:block font-mono text-xs text-gray-500 text-right">
                <div>SYSTEM_CAPACITY: 100%</div>
                <div>THREADS: AVAILABLE</div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
                <MotionDiv
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative glass-card rounded-2xl p-8 hover:border-primary/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500"
                >
                    {/* Hover Corner Effect */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="mb-6 flex justify-between items-start">
                        <div className="p-3 bg-gradient-to-br from-primary to-primaryLight rounded-xl text-white shadow-[0_4px_12px_rgba(255,94,0,0.2)] group-hover:shadow-[0_4px_20px_rgba(255,94,0,0.35)] transition-shadow duration-300">
                            <service.icon size={28} />
                        </div>
                        <div className="font-mono text-xs text-gray-400 group-hover:text-primary transition-colors font-bold">
                            {service.id}
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold font-display mb-3 text-black group-hover:text-primary transition-colors">
                        <ScrambleText text={service.title} hover={false} />
                    </h3>
                    
                    <p className="text-gray-500 font-mono text-sm leading-relaxed mb-6">
                        {service.description}
                    </p>

                    <ul className="space-y-2">
                        {service.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-2 text-xs font-mono text-gray-400 group-hover:text-gray-600 transition-colors font-bold">
                                <span className="w-1 h-1 bg-primary rounded-full shrink-0"></span> {feature}
                            </li>
                        ))}
                    </ul>
                </MotionDiv>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;