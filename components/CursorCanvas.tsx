
import React, { useEffect, useRef } from 'react';

const CursorCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Config
    const TRAIL_LENGTH = 35;
    const DOT_COLOR = '#ff5e00'; // Primary Orange
    
    // State
    const mouse = { x: width / 2, y: height / 2 };
    // Initialize dots at center
    const dots = Array.from({ length: TRAIL_LENGTH }, () => ({ 
      x: width / 2, 
      y: height / 2 
    }));

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    onResize();

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update dots
      // Instead of simple follow-the-leader, we use a spring-like ease for the whole chain
      // to make it feel like a fluid string.
      
      let targetX = mouse.x;
      let targetY = mouse.y;

      dots.forEach((dot, index) => {
        // The first dot follows mouse, others follow previous dot
        // We use a constant easing factor to create the fluid "drag" effect
        const ease = 0.25; 
        
        dot.x += (targetX - dot.x) * ease;
        dot.y += (targetY - dot.y) * ease;
        
        // Update target for next dot (so dot[i+1] follows dot[i])
        targetX = dot.x;
        targetY = dot.y;
        
        // Style Dot
        // Head is larger, tail is smaller
        const size = Math.max(0.5, (TRAIL_LENGTH - index) * 0.25); 
        // Head is opaque, tail fades out
        const opacity = Math.max(0.1, 1 - (index / TRAIL_LENGTH)); 
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size + 1.5, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(DOT_COLOR, opacity);
        ctx.fill();
      });

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
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100] hidden md:block mix-blend-screen"
    />
  );
};

// Helper to convert hex to rgba for opacity control
function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default CursorCanvas;
