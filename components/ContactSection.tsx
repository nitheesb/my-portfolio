import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, Shield, Wifi, Cpu } from 'lucide-react';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

const ContactSection: React.FC = () => {
    const { playClick, playHover } = useAudioFeedback();
    const [status, setStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        playClick();
        setStatus('transmitting');

        // Simulate transmission
        setTimeout(() => {
            setStatus('success');
        }, 2500);
    };

    return (
        <section className="min-h-full w-full flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
            {/* Decorative hexagonal pattern in background (CSS only) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(#ff5e00 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div>

            <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left: Terminal Info */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] font-bold tracking-widest uppercase"
                    >
                        <Wifi size={12} className="animate-pulse" />
                        <span>Encrypted Channel Open</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-display font-bold text-black leading-tight">
                        INITIATE <br /> <span className="text-primary italic">TRANSMISSION</span>
                    </h2>

                    <div className="space-y-4 font-mono text-sm text-gray-500">
                        <p className="flex gap-3">
                            <span className="text-primary font-bold">{'>'}</span>
                            Ready for high-impact cloud architecture & DevOps consultations.
                        </p>
                        <p className="flex gap-3">
                            <span className="text-primary font-bold">{'>'}</span>
                            Expected Response Latency: <span className="text-black font-bold">{'< 24h'}</span>
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Coordinates</span>
                            <a href="mailto:nitheesbalaji@gmail.com" onMouseEnter={playHover} className="text-black hover:text-primary transition-colors font-mono">nitheesbalaji@gmail.com</a>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Direct Uplink</span>
                            <a href="#" onMouseEnter={playHover} className="text-black hover:text-primary transition-colors font-mono">LinkedIn Profile</a>
                        </div>
                    </div>
                </div>

                {/* Right: Contact Console */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-black border border-primary/20 rounded-lg overflow-hidden shadow-2xl relative"
                >
                    {/* Console Header */}
                    <div className="bg-gray-900 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                        </div>
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Signal_Composer.v1</span>
                        <Shield size={12} className="text-primary/50" />
                    </div>

                    <AnimatePresence mode="wait">
                        {status === 'idle' ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="p-6 space-y-6"
                            >
                                <div className="space-y-1">
                                    <label className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">Source_ID</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="ENTER NAME"
                                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono text-sm focus:border-primary outline-none transition-all placeholder:text-gray-700"
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">Return_Address</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="EMAIL@DOMAIN.COM"
                                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono text-sm focus:border-primary outline-none transition-all placeholder:text-gray-700"
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">Message_Payload</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="DESCRIBE THE MISSION..."
                                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono text-sm focus:border-primary outline-none transition-all resize-none placeholder:text-gray-700"
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    onMouseEnter={playHover}
                                    className="w-full py-4 bg-primary text-black font-mono font-bold text-xs flex items-center justify-center gap-3 uppercase tracking-[0.2em] hover:bg-primary-hover transition-colors rounded shadow-[0_0_20px_rgba(255,94,0,0.3)]"
                                >
                                    <Send size={14} />
                                    Transmit Signal
                                </button>
                            </motion.form>
                        ) : status === 'transmitting' ? (
                            <motion.div
                                key="transmitting"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="p-12 flex flex-col items-center justify-center space-y-6 min-h-[400px]"
                            >
                                <div className="relative">
                                    <Cpu size={48} className="text-primary animate-pulse" />
                                    <motion.div
                                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="absolute inset-0 border-2 border-primary rounded-full"
                                    />
                                </div>
                                <div className="font-mono text-xs text-primary animate-pulse tracking-widest">UPLOADING DATA PACKETS...</div>
                                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2.2, ease: "easeInOut" }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                className="p-12 flex flex-col items-center justify-center space-y-6 min-h-[400px] text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
                                    <Shield size={32} className="text-green-500" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tighter">Signal Received</h3>
                                <p className="font-mono text-xs text-gray-500 max-w-[240px]">
                                    Your transmission reaches the architect. Handshake verified. Stand by for response.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-4 px-6 py-2 border border-white/20 text-white font-mono text-[10px] uppercase hover:bg-white/10 transition-colors"
                                >
                                    Close Channel
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;
