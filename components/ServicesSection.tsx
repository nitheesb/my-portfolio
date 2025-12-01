import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import ScrambleText from './ScrambleText';

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-bg">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 flex items-end justify-between">
            <div>
                <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-4">
                    <span className="text-primary">AVAILABLE</span> PROTOCOLS
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
                <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-white border border-gray-200 p-8 hover:border-primary hover:shadow-lg transition-all duration-300"
                >
                    {/* Hover Corner Effect */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="mb-6 flex justify-between items-start">
                        <div className="p-3 bg-gray-50 rounded text-primary group-hover:bg-primary group-hover:text-black transition-colors">
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
                                <span className="text-primary opacity-50">&gt;&gt;</span> {feature}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;