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
    const PARTICLE_COUNT = 150;
    const MOUSE_RADIUS = 180;
    const REPULSION_FORCE = 6; // Strength of the push
    const RETURN_SPEED = 0.04; // How fast they go back
    const DAMPING = 0.92;
    const COLOR_BASE = '#ff5e00'; // Brand Orange

    let width = window.innerWidth;
    let height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }

    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };
    let isActive = false;

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: 0,
          vy: 0,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2
        });
      }
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Re-distribute particles on resize
      initParticles();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isActive = true;
    };

    const onMouseLeave = () => {
      isActive = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave); // Reset when leaving window
    onResize(); // Initial setup

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render and update each particle
      particles.forEach((p) => {
        // 1. Calculate repulsion from mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.hypot(dx, dy);

        let forceX = 0;
        let forceY = 0;

        if (distance < MOUSE_RADIUS && isActive) {
          const angle = Math.atan2(dy, dx);
          // The closer, the stronger the push
          const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
          const repulsion = -force * REPULSION_FORCE;

          forceX = Math.cos(angle) * repulsion;
          forceY = Math.sin(angle) * repulsion;
        }

        // 2. Add force to velocity
        p.vx += forceX;
        p.vy += forceY;

        // 3. Return to origin (Spring force)
        const returnDx = p.originX - p.x;
        const returnDy = p.originY - p.y;

        p.vx += returnDx * RETURN_SPEED;
        p.vy += returnDy * RETURN_SPEED;

        // 4. Apply physics
        p.vx *= DAMPING;
        p.vy *= DAMPING;

        p.x += p.vx;
        p.y += p.vy;

        // 5. Draw
        // Draw as small distinct geometric shapes/dashes for "Tech" feel
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(COLOR_BASE, p.alpha);
        ctx.fill();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1] hidden md:block" // Lower z-index to be behind content but visible
      style={{ mixBlendMode: 'plus-lighter' }} // Cool blend mode for sparks
    />
  );
};

// Helper to convert hex to rgba
function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default CursorCanvas;
