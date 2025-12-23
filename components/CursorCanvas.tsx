
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const CursorCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Config
    const PRIMARY_COLOR = { r: 255, g: 94, b: 0 }; // #ff5e00

    // State
    const mouse = { x: 0, y: 0, prevX: 0, prevY: 0 };
    const particles: Particle[] = [];
    let hasMoved = false;

    // High DPI Canvas Setup
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (!hasMoved) {
        const cw = rect.width;
        const ch = rect.height;
        mouse.x = cw / 2;
        mouse.y = ch / 2;
        mouse.prevX = cw / 2;
        mouse.prevY = ch / 2;
      }
    };

    const onResize = () => {
      setupCanvas();
    };

    const onMouseMove = (e: MouseEvent) => {
      hasMoved = true;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Create particles based on mouse movement
      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Create more particles when moving faster
      const particleCount = Math.min(Math.floor(distance / 5), 3);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 10,
          y: mouse.y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          maxLife: 60 + Math.random() * 40,
          size: 2 + Math.random() * 3
        });
      }
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    setupCanvas();

    let animationFrameId: number;

    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update particle
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Apply slight gravity and friction
        p.vy += 0.05;
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Remove dead particles
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Calculate opacity based on life
        const lifeRatio = 1 - (p.life / p.maxLife);
        const alpha = lifeRatio * 0.8;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * lifeRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PRIMARY_COLOR.r}, ${PRIMARY_COLOR.g}, ${PRIMARY_COLOR.b}, ${alpha})`;
        ctx.fill();

        // Add glow effect
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2 * lifeRatio);
        gradient.addColorStop(0, `rgba(${PRIMARY_COLOR.r}, ${PRIMARY_COLOR.g}, ${PRIMARY_COLOR.b}, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${PRIMARY_COLOR.r}, ${PRIMARY_COLOR.g}, ${PRIMARY_COLOR.b}, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2 * lifeRatio, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Limit particle count for performance
      if (particles.length > 300) {
        particles.splice(0, particles.length - 300);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100] hidden md:block"
    />
  );
};

export default CursorCanvas;
