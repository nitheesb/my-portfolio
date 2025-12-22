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
    const { playClick, playHover, playError, playKeyPress, startAmbient, stopAmbient, toggleMute: toggleMuteHook } = useAudioFeedback();
    const [isMuted, setIsMuted] = useState(() => {
        const saved = localStorage.getItem('audioMuted');
        return saved === 'true';
    });

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
        const newMuted = toggleMuteHook();
        setIsMuted(newMuted);
        localStorage.setItem('audioMuted', String(newMuted));
    };

    return (
        <AudioContext.Provider value={{ playClick, playHover, playError, playKeyPress, isMuted, toggleMute }}>
            {children}

            {/* Mute Toggle Button */}
            <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                className="fixed top-6 right-6 md:top-8 md:right-24 z-[100] bg-black/50 backdrop-blur-sm border border-primary/30 text-primary w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/10 transition-all duration-300"
            >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
        </AudioContext.Provider>
    );
};
