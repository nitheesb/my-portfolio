import React, { useEffect, useRef } from 'react';

const CursorCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const PARTICLE_DENSITY = 0.00018; // Particles per pixel area
    const SPOTLIGHT_RADIUS = 300;
    const CURSOR_LAG = 0.15; // Lower = more lag/weight
    const COLOR_BASE = '#ff5e00';

    let width = window.innerWidth;
    let height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      size: number;
    }

    let particles: Particle[] = [];

    // "Real" mouse position
    let mouse = { x: width / 2, y: height / 2 };
    // "Virtual" fluid cursor position
    let cursor = { x: width / 2, y: height / 2 };

    let isActive = false;

    const initParticles = () => {
      particles = [];
      const count = Math.floor(width * height * PARTICLE_DENSITY);

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isActive) {
        cursor.x = mouse.x;
        cursor.y = mouse.y;
        isActive = true;
      }
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    onResize();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Lerp cursor towards mouse for fluid delay
      cursor.x += (mouse.x - cursor.x) * CURSOR_LAG;
      cursor.y += (mouse.y - cursor.y) * CURSOR_LAG;

      particles.forEach((p) => {
        const dx = p.x - cursor.x;
        const dy = p.y - cursor.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = SPOTLIGHT_RADIUS * SPOTLIGHT_RADIUS;

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          // Opacity fades out towards edge
          const alpha = 1 - (dist / SPOTLIGHT_RADIUS);

          // Extra "glint" in the very center
          const glint = alpha > 0.9 ? 1 : alpha;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(COLOR_BASE, glint);
          ctx.fill();
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1] hidden md:block"
      style={{ mixBlendMode: 'plus-lighter' }}
    />
  );
};

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default CursorCanvas;
