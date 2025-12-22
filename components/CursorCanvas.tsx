
import React, { useEffect, useRef, useState } from 'react';

const CursorCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Config
    const PRIMARY_COLOR = { r: 255, g: 94, b: 0 }; // #ff5e00
    const LOCKED_COLOR = { r: 0, g: 255, b: 100 }; // Green lock-on

    // State
    const mouse = { x: 0, y: 0 };
    let rotation = 0;
    let lockedState = false;

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

      if (!hasMoved) {
        const cw = rect.width;
        const ch = rect.height;
        mouse.x = cw / 2;
        mouse.y = ch / 2;
      }
    };

    const onResize = () => {
      setupCanvas();
    };

    const onMouseMove = (e: MouseEvent) => {
      hasMoved = true;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable = target.closest('button, a, input, [role="button"]');
      lockedState = !!isClickable;
      setIsLocked(lockedState);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    setupCanvas();

    let animationFrameId: number;

    const drawReticle = (x: number, y: number, locked: boolean) => {
      const color = locked ? LOCKED_COLOR : PRIMARY_COLOR;
      const alpha = locked ? 1 : 0.8;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Center dot
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
      ctx.fill();

      // Outer ring
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.6})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Corner brackets
      const bracketSize = 20;
      const bracketThickness = 2;
      const corners = [
        { x: bracketSize, y: bracketSize },
        { x: -bracketSize, y: bracketSize },
        { x: -bracketSize, y: -bracketSize },
        { x: bracketSize, y: -bracketSize }
      ];

      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.8})`;
      ctx.lineWidth = bracketThickness;

      corners.forEach((corner, i) => {
        const angle = (i * Math.PI / 2);
        ctx.save();
        ctx.rotate(angle);

        // L-shaped bracket
        ctx.beginPath();
        ctx.moveTo(bracketSize, bracketSize - 6);
        ctx.lineTo(bracketSize, bracketSize);
        ctx.lineTo(bracketSize - 6, bracketSize);
        ctx.stroke();

        ctx.restore();
      });

      // Crosshair lines
      const lineLength = 8;
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.4})`;
      ctx.lineWidth = 1;

      // Horizontal
      ctx.beginPath();
      ctx.moveTo(-lineLength - 5, 0);
      ctx.lineTo(-5, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(lineLength + 5, 0);
      ctx.stroke();

      // Vertical
      ctx.beginPath();
      ctx.moveTo(0, -lineLength - 5);
      ctx.lineTo(0, -5);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(0, lineLength + 5);
      ctx.stroke();

      // Lock-on pulse effect
      if (locked) {
        const pulseSize = 25 + Math.sin(Date.now() / 200) * 3;
        ctx.beginPath();
        ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.3 * alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Rotate the reticle
      rotation += lockedState ? 0.02 : 0.01;

      drawReticle(mouse.x, mouse.y, lockedState);

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
