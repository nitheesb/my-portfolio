import React, { useEffect, useRef } from 'react';

const ClusterVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const particleCount = 50;
    const maxDistance = 180;

    class Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      pulse: number;

      constructor() {
        this.reset();
        this.pulse = Math.random() * Math.PI;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 400 - 200;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.vz = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
        this.pulse += 0.02;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        if (this.z < -200 || this.z > 200) this.vz *= -1;
      }

      project(x: number, y: number, z: number) {
        const perspective = 800 / (800 + z);
        return {
          x: (x - width / 2) * perspective + width / 2,
          y: (y - height / 2) * perspective + height / 2,
          scale: perspective
        };
      }
    }

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      particles = Array.from({ length: particleCount }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw subtle background grid hint
      ctx.strokeStyle = 'rgba(255, 94, 0, 0.03)';
      ctx.lineWidth = 0.5;
      for(let i = 0; i < width; i += 100) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
      }
      for(let i = 0; i < height; i += 100) {
          ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
      }

      particles.forEach(p => p.update());

      particles.forEach((p1, i) => {
        const proj1 = p1.project(p1.x, p1.y, p1.z);
        
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            const proj2 = p2.project(p2.x, p2.y, p2.z);
            const alpha = (1 - dist / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(proj1.x, proj1.y);
            ctx.lineTo(proj2.x, proj2.y);
            // Dynamic connection color based on "pulse"
            const glow = Math.sin(p1.pulse) * 0.05;
            ctx.strokeStyle = `rgba(255, 94, 0, ${alpha + glow})`;
            ctx.lineWidth = 0.8 * proj1.scale;
            ctx.stroke();
          }
        });

        const opacity = (0.1 + (proj1.scale * 0.2)) * (0.8 + Math.sin(p1.pulse) * 0.2);
        ctx.beginPath();
        ctx.arc(proj1.x, proj1.y, p1.size * proj1.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 94, 0, ${opacity})`;
        ctx.fill();
        
        // Add a "core" to nodes
        if (proj1.scale > 0.8) {
            ctx.beginPath();
            ctx.arc(proj1.x, proj1.y, 0.5 * proj1.scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 2})`;
            ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full opacity-60 pointer-events-none" />;
};

export default ClusterVisual;