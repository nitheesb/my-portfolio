import { useCallback, useRef, useEffect } from 'react';

export const useAudioFeedback = () => {
  const audioCtx = useRef<AudioContext | null>(null);
  const ambientOsc = useRef<OscillatorNode | null>(null);
  const ambientGain = useRef<GainNode | null>(null);
  const isMuted = useRef(false);

  const initCtx = () => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const playBlip = useCallback((frequency = 440, duration = 0.05, volume = 0.1) => {
    if (isMuted.current) return;
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

  const playKeyPress = useCallback(() => {
    if (isMuted.current) return;
    initCtx();
    if (!audioCtx.current) return;

    const ctx = audioCtx.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Mechanical keyboard click sound
    osc.type = 'square';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.02);

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.02);
  }, []);

  const startAmbient = useCallback(() => {
    if (isMuted.current) return;
    initCtx();
    if (!audioCtx.current || ambientOsc.current) return;

    const ctx = audioCtx.current;

    // Create low-frequency hum (server room ambience)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(60, ctx.currentTime); // Low hum

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(120, ctx.currentTime); // Harmonic

    gain.gain.setValueAtTime(0.015, ctx.currentTime); // Very subtle

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();

    ambientOsc.current = osc1;
    ambientGain.current = gain;
  }, []);

  const stopAmbient = useCallback(() => {
    if (ambientOsc.current && audioCtx.current) {
      ambientGain.current?.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 0.5);
      setTimeout(() => {
        ambientOsc.current?.stop();
        ambientOsc.current = null;
        ambientGain.current = null;
      }, 500);
    }
  }, []);

  const toggleMute = useCallback(() => {
    isMuted.current = !isMuted.current;
    if (isMuted.current) {
      stopAmbient();
    }
    return isMuted.current;
  }, [stopAmbient]);

  return {
    playClick,
    playHover,
    playError,
    playKeyPress,
    startAmbient,
    stopAmbient,
    toggleMute
  };
};