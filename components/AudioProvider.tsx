import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAudioFeedback } from '../hooks/useAudioFeedback';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioContextType {
    playClick: () => void;
    playHover: () => void;
    playError: () => void;
    playKeyPress: () => void;
    isMuted: boolean;
    toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within AudioProvider');
    }
    return context;
};

interface AudioProviderProps {
    children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
    const { playClick, playHover, playError, playKeyPress, startAmbient, stopAmbient, toggleMute: toggleMuteHook, setMuted } = useAudioFeedback();
    const [isMuted, setIsMuted] = useState(() => {
        const saved = localStorage.getItem('audioMuted');
        // Default to true (muted) if no preference saved
        return saved === null ? true : saved === 'true';
    });

    useEffect(() => {
        setMuted(isMuted);
    }, [isMuted, setMuted]);

    useEffect(() => {
        if (!isMuted) {
            // Start ambient sound after a short delay
            const timer = setTimeout(() => {
                startAmbient();
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            stopAmbient();
        }
    }, [isMuted, startAmbient, stopAmbient]);

    const toggleMute = () => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        localStorage.setItem('audioMuted', String(newMuted));
    };

    return (
        <AudioContext.Provider value={{ playClick, playHover, playError, playKeyPress, isMuted, toggleMute }}>
            {children}

            {/* Mute Toggle Button */}
            <div className="fixed top-6 right-6 md:top-8 md:right-24 z-[100] flex items-center gap-3">
                {isMuted && (
                    <span className="hidden md:block font-mono text-[10px] font-bold tracking-widest text-primary/70 animate-pulse">
                        TURN ON FOR SFX
                    </span>
                )}
                <button
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    className="bg-black/50 backdrop-blur-sm border border-primary/30 text-primary w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/10 transition-all duration-300 shadow-[0_0_15px_rgba(255,94,0,0.1)] group"
                >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-pulse" />}

                    {/* Tooltip for mobile or extra clarity */}
                    <span className="absolute -bottom-8 right-0 bg-black/80 text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap md:hidden">
                        {isMuted ? "SFX OFF" : "SFX ON"}
                    </span>
                </button>
            </div>
        </AudioContext.Provider>
    );
};
