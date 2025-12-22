import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Cpu, FileText, Wrench } from 'lucide-react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    currentSection: number;
    onNavigate: (index: number) => void;
}

const MENU_ITEMS = [
    { id: 0, label: 'HOME', icon: Home },
    { id: 1, label: 'SYSTEMS', icon: Cpu },
    { id: 2, label: 'LOGS', icon: FileText },
    { id: 3, label: 'CORE', icon: Wrench },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, currentSection, onNavigate }) => {
    const handleNavigate = (index: number) => {
        onNavigate(index);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md"
                >
                    {/* Tactical Border Frame */}
                    <div className="absolute inset-4 border-2 border-primary/50 rounded-lg pointer-events-none">
                        {/* Corner Screws */}
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary rounded-full"></div>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full"></div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
                    </div>

                    {/* Header */}
                    <div className="relative z-10 flex justify-between items-center p-6 border-b border-primary/30">
                        <div className="font-mono text-primary font-bold tracking-widest">
                            <span className="text-xs">TACTICAL_MENU</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center border border-primary/50 rounded bg-black/50 text-primary hover:bg-primary/20 transition-all"
                            aria-label="Close menu"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100%-120px)] gap-6 px-8">
                        {MENU_ITEMS.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = currentSection === item.id;

                            return (
                                <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handleNavigate(item.id)}
                                    className={`w-full max-w-sm relative group ${isActive ? 'bg-primary/20' : 'bg-black/50'
                                        } border-2 ${isActive ? 'border-primary' : 'border-primary/30'
                                        } rounded-lg p-4 hover:bg-primary/10 transition-all`}
                                >
                                    {/* Industrial Rivets */}
                                    <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-primary/50 rounded-full"></div>
                                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary/50 rounded-full"></div>
                                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-primary/50 rounded-full"></div>
                                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-primary/50 rounded-full"></div>

                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 flex items-center justify-center rounded ${isActive ? 'bg-primary text-black' : 'bg-primary/10 text-primary'
                                            }`}>
                                            <Icon size={24} />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="font-mono text-xs text-primary/60">
                                                {String(item.id + 1).padStart(2, '0')}
                                            </div>
                                            <div className={`font-mono font-bold tracking-widest ${isActive ? 'text-primary' : 'text-white'
                                                }`}>
                                                {item.label}
                                            </div>
                                        </div>
                                        {isActive && (
                                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                        )}
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Footer Status */}
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center font-mono text-[10px] text-primary/60 tracking-widest">
                        <span>DATAPAD_v2.1</span>
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            ONLINE
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
