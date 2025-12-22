import React, { useEffect, useRef } from 'react';

const CursorCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const SEGMENT_COUNT = 15;
    const SEGMENT_LENGTH = 10;
    const STROKE_COLOR = '#ff5e00'; // Brand Orange
    const DAMPING = 0.85; // Less damping = more swing
    const STIFFNESS = 0.12;

    interface Point {
      x: number;
      y: number;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouse: Point = { x: width / 2, y: height / 2 };
    let segments: Point[] = Array(SEGMENT_COUNT).fill({ x: width / 2, y: height / 2 });

    // Physics velocity for each segment
    let vels: Point[] = Array(SEGMENT_COUNT).fill({ x: 0, y: 0 });

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    onResize(); // Initial size

    const animate = (time: number) => {
      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = time;
      }
      previousTimeRef.current = time;

      ctx.clearRect(0, 0, width, height);

      // 1. Move Head (first segment) towards mouse
      // We use a simple lerp for the head to make it feel responsive but slightly weighted
      const head = segments[0];
      const dx = mouse.x - head.x;
      const dy = mouse.y - head.y;

      // Direct set for instant response or lerp for "weight"?
      // Let's do a fast lerp for the head so it's snappy but not jittery
      segments[0] = {
        x: head.x + dx * 0.4,
        y: head.y + dy * 0.4
      };

      // 2. Physics Simulation for the rest of the rope (Inverse Kinematics / Spring-ish)
      // We simulate each point trying to stay SEGMENT_LENGTH away from the previous one
      // plus some momentum (verlet integration-ish or velocity damping)

      for (let i = 1; i < SEGMENT_COUNT; i++) {
        const prev = segments[i - 1];
        const curr = segments[i];

        // Spring/Drag mechanic
        // Target position is where the previous segment is

        // Calculate pull force towards previous node
        const tx = prev.x - curr.x;
        const ty = prev.y - curr.y;

        // Add force to velocity
        vels[i].x += tx * STIFFNESS;
        vels[i].y += ty * STIFFNESS;

        // Apply sliding damping
        vels[i].x *= DAMPING;
        vels[i].y *= DAMPING;

        // Update position
        segments[i] = {
          x: curr.x + vels[i].x,
          y: curr.y + vels[i].y
        };

        // Constraint: Ensure segments don't stretch too much (Chain constraint)
        // This makes it feel like a rope of fixed maximum length
        const dist = Math.hypot(segments[i].x - segments[i - 1].x, segments[i].y - segments[i - 1].y);
        if (dist > SEGMENT_LENGTH * 2) {
          // Too far, snap closer
          const angle = Math.atan2(segments[i].y - segments[i - 1].y, segments[i].x - segments[i - 1].x);
          segments[i] = {
            x: segments[i - 1].x + Math.cos(angle) * SEGMENT_LENGTH * 2,
            y: segments[i - 1].y + Math.sin(angle) * SEGMENT_LENGTH * 2
          };
          // Kill velocity if we hit hard limit to prevent explosion
          vels[i] = { x: 0, y: 0 };
        }
      }

      // 3. Render
      if (SEGMENT_COUNT > 1) {
        ctx.beginPath();
        ctx.moveTo(segments[0].x, segments[0].y);

        // Catmull-Rom or Quadratic Bezier for smooth curve through points
        for (let i = 1; i < SEGMENT_COUNT - 1; i++) {
          const xc = (segments[i].x + segments[i + 1].x) / 2;
          const yc = (segments[i].y + segments[i + 1].y) / 2;
          ctx.quadraticCurveTo(segments[i].x, segments[i].y, xc, yc);
        }
        // Last segment
        ctx.lineTo(segments[SEGMENT_COUNT - 1].x, segments[SEGMENT_COUNT - 1].y);

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Create a gradient for the stroke if possible, or just solid color
        // Variable width is harder with stroke(). 
        // To do variable width properly in 2D canvas, we often need to draw filled paths/polygons.
        // For simplicity and performance, let's stick to a solid stroke that tapers opacity or 
        // simply use a fixed width that looks good. 
        // OR: Draw scaling circles (blobby trail) if line width modulation is key.

        // Let's try the "Variable Width" approach by drawing many small lines or circles?
        // No, standard stroke is cleaner. Let's do a tapered opacity stroke using a loop,
        // or just one nice stroke.
        // "Antigravity" usually implies a clean, single thread.

        ctx.strokeStyle = STROKE_COLOR;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = STROKE_COLOR;
        ctx.stroke();

        // Optional: Draw a "Head" dot
        ctx.beginPath();
        ctx.arc(segments[0].x, segments[0].y, 3, 0, Math.PI * 2);
        ctx.fillStyle = STROKE_COLOR;
        ctx.fill();
      }

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
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100] hidden md:block mix-blend-screen"
    />
  );
};

export default CursorCanvas;
