import { useCallback, useRef } from 'react';

export const useAudioFeedback = () => {
  const audioCtx = useRef<AudioContext | null>(null);

  const initCtx = () => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const playBlip = useCallback((frequency = 440, duration = 0.05, volume = 0.1) => {
    initCtx();
    if (!audioCtx.current) return;

    const ctx = audioCtx.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.5, ctx.currentTime + duration);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, []);

  const playClick = useCallback(() => {
    playBlip(800, 0.03, 0.05);
  }, [playBlip]);

  const playHover = useCallback(() => {
    playBlip(1200, 0.02, 0.02);
  }, [playBlip]);

  const playError = useCallback(() => {
    playBlip(150, 0.2, 0.1);
  }, [playBlip]);

  return { playClick, playHover, playError };
};