import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  hue: number;
}

interface MistWisp {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  opacity: number;
}

export const AmbientAtmosphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Scroll velocity tracking to give dynamic physical reaction to scrolling
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.08;
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize 45 glowing warm amber cabin fireplace embers
    const particles: Particle[] = [];
    const particleCount = 42;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedY: -(Math.random() * 0.6 + 0.25),
        speedX: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.7 + 0.2,
        fadeSpeed: (Math.random() * 0.006 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        hue: Math.random() > 0.3 ? 38 : 28, // Warm amber / orange
      });
    }

    // Initialize 5 soft misty fog wisps
    const mistWisps: MistWisp[] = [];
    for (let i = 0; i < 5; i++) {
      mistWisps.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 250 + 180,
        speedX: (Math.random() * 0.2 + 0.08) * (Math.random() > 0.5 ? 1 : -1),
        opacity: Math.random() * 0.04 + 0.02,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampen scroll velocity smoothly back to zero
      scrollVelocity *= 0.92;

      // Draw soft drifting mist wisps
      for (const m of mistWisps) {
        m.x += m.speedX;
        if (m.x - m.radius > width) m.x = -m.radius;
        if (m.x + m.radius < 0) m.x = width + m.radius;

        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.radius);
        grad.addColorStop(0, `rgba(180, 215, 230, ${m.opacity})`);
        grad.addColorStop(0.6, `rgba(140, 180, 200, ${m.opacity * 0.4})`);
        grad.addColorStop(1, 'rgba(10, 20, 25, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw glowing embers
      for (const p of particles) {
        // Natural upward drift + scroll velocity reaction
        p.y += p.speedY - scrollVelocity * 0.4;
        p.x += p.speedX + Math.sin(p.y * 0.015) * 0.3;

        // Wrap around bounds
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        } else if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Pulse opacity
        p.opacity += p.fadeSpeed;
        if (p.opacity > 0.85 || p.opacity < 0.15) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Draw soft glow around ember
        const glowRadius = p.size * 3.5;
        const emberGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        emberGrad.addColorStop(0, `hsla(${p.hue}, 95%, 65%, ${p.opacity})`);
        emberGrad.addColorStop(0.4, `hsla(${p.hue}, 90%, 55%, ${p.opacity * 0.45})`);
        emberGrad.addColorStop(1, `hsla(${p.hue}, 90%, 50%, 0)`);

        ctx.fillStyle = emberGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Crisp hot center point
        ctx.fillStyle = `hsla(${p.hue + 15}, 100%, 85%, ${p.opacity * 0.9})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-75"
    />
  );
};
