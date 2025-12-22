
import React, { useEffect, useRef } from 'react';

const CursorCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Config
    const TRAIL_LENGTH = 35;
    const DOT_REF_COLOR = { r: 255, g: 94, b: 0 }; // #ff5e00 (Primary Orange) pre-parse

    // State
    const mouse = { x: 0, y: 0 };
    const dots = Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 }));

    // Init position logic
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

      // Reset dots if this is first load to center or off-screen
      if (!hasMoved) {
        const cw = rect.width;
        const ch = rect.height;
        mouse.x = cw / 2;
        mouse.y = ch / 2;
        dots.forEach(dot => { dot.x = cw / 2; dot.y = ch / 2; });
      }
    };

    const onResize = () => {
      setupCanvas();
    };

    const onMouseMove = (e: MouseEvent) => {
      hasMoved = true;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    setupCanvas();

    let animationFrameId: number;

    const animate = () => {
      // Clear with DPR aware sizing -> we can just clear the whole buffer
      // However, we scaled the context, so clearing (0,0,width,height) works in logical pixels
      // canvas.width/height is physical, so we divide by dpr or use getBoundingClientRect values
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      let targetX = mouse.x;
      let targetY = mouse.y;

      // Draw Loop
      dots.forEach((dot, index) => {
        const ease = 0.25;

        dot.x += (targetX - dot.x) * ease;
        dot.y += (targetY - dot.y) * ease;

        targetX = dot.x;
        targetY = dot.y;

        const size = Math.max(0.5, (TRAIL_LENGTH - index) * 0.25);
        const opacity = Math.max(0.1, 1 - (index / TRAIL_LENGTH));

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size + 1.5, 0, Math.PI * 2);
        // Direct RBGA string construction is faster than regex parsing every frame
        ctx.fillStyle = `rgba(${DOT_REF_COLOR.r}, ${DOT_REF_COLOR.g}, ${DOT_REF_COLOR.b}, ${opacity})`;
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

export default CursorCanvas;
