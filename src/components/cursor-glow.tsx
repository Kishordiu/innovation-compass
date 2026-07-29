import { useEffect, useRef, useState } from "react";

/** Unique particle counter */
let _pid = 0;

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  vx: number;
  vy: number;
  life: number; // 0→1, 1 = fully decayed
}

const PARTICLE_COLORS = [
  "oklch(0.74 0.098 78)", // gold
  "oklch(0.82 0.075 82)", // light gold
  "oklch(0.90 0.055 88)", // warm ivory
  "oklch(0.78 0.088 76)", // deeper gold
  "oklch(0.86 0.06 90)", // cream shimmer
];

/** 
 * Interaction Layer: 
 * Desktop: Soft trailing cursor with premium sparkle particle trail. 
 * Mobile: Premium touch ripple with micro particle bloom.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    setIsDesktop(isFine);

    if (!isFine) {
      // MOBILE TOUCH LOGIC (Ripple & Bloom)
      const onTouch = (e: PointerEvent) => {
        // Create an ephemeral container for the interaction feedback
        const touchContainer = document.createElement("div");
        touchContainer.style.cssText = `
          position: fixed; left: 0; top: 0; pointer-events: none; z-index: 9999;
        `;
        document.body.appendChild(touchContainer);

        // 1. Soft ripple
        const ripple = document.createElement("div");
        ripple.style.cssText = `
          position: absolute;
          width: 60px; height: 60px;
          border-radius: 50%;
          background: radial-gradient(circle, oklch(0.74 0.098 78 / 0.5) 0%, transparent 60%);
          transform: translate3d(${e.clientX - 30}px, ${e.clientY - 30}px, 0) scale(0.2);
          opacity: 1;
          transition: transform 0.7s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.7s ease-out;
        `;
        touchContainer.appendChild(ripple);

        // 2. Micro particle bloom
        const pCount = 5;
        const pElements: HTMLDivElement[] = [];
        for (let i = 0; i < pCount; i++) {
          const p = document.createElement("div");
          const angle = Math.random() * Math.PI * 2;
          const dist = 15 + Math.random() * 20;
          const size = 2 + Math.random() * 3;
          const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
          
          p.style.cssText = `
            position: absolute;
            width: ${size}px; height: ${size}px;
            border-radius: 50%;
            background: ${color};
            box-shadow: 0 0 ${size * 2}px 1px ${color};
            transform: translate3d(${e.clientX - size/2}px, ${e.clientY - size/2}px, 0);
            opacity: 1;
            transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.6s ease-out;
          `;
          touchContainer.appendChild(p);
          pElements.push({ el: p, angle, dist, size });
        }

        // Trigger animations next frame
        requestAnimationFrame(() => {
          ripple.style.transform = `translate3d(${e.clientX - 30}px, ${e.clientY - 30}px, 0) scale(2)`;
          ripple.style.opacity = "0";

          pElements.forEach(({ el, angle, dist, size }) => {
            const tx = e.clientX + Math.cos(angle) * dist - size/2;
            const ty = e.clientY + Math.sin(angle) * dist - size/2;
            el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(0)`;
            el.style.opacity = "0";
          });
        });

        // Cleanup
        setTimeout(() => touchContainer.remove(), 750);
      };

      window.addEventListener("pointerdown", onTouch, { passive: true });
      return () => window.removeEventListener("pointerdown", onTouch);
    }

    // DESKTOP CURSOR LOGIC
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frame = 0;
    let lastSpawnX = targetX;
    let lastSpawnY = targetY;

    const particles: Particle[] = [];
    const particleEls = new Map<number, HTMLSpanElement>();

    function spawnParticle(cx: number, cy: number, velocityMulti = 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.3 + Math.random() * 1.2) * velocityMulti;
      const p: Particle = {
        id: ++_pid,
        x: cx + (Math.random() - 0.5) * 6,
        y: cy + (Math.random() - 0.5) * 6,
        size: 1.5 + Math.random() * 3,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        opacity: 0.6 + Math.random() * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        life: 0,
      };
      particles.push(p);

      if (containerRef.current) {
        const el = document.createElement("span");
        el.style.cssText = `
          position: absolute; left: 0; top: 0; pointer-events: none; border-radius: 50%;
          width: ${p.size}px; height: ${p.size}px; background: ${p.color};
          box-shadow: 0 0 ${p.size * 2}px 1px ${p.color};
          transform: translate3d(${p.x - p.size / 2}px, ${p.y - p.size / 2}px, 0);
          opacity: ${p.opacity}; will-change: transform, opacity;
        `;
        containerRef.current.appendChild(el);
        particleEls.set(p.id, el);
      }
    }

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX - 3}px, ${targetY - 3}px, 0)`;
      }

      const dx = targetX - lastSpawnX;
      const dy = targetY - lastSpawnY;
      const distSq = dx * dx + dy * dy;
      if (distSq > 36) {
        // Adaptive particle count based on speed
        const speedFactor = Math.min(distSq / 100, 3);
        const count = 1 + Math.floor(Math.random() * speedFactor);
        for (let i = 0; i < count; i++) spawnParticle(targetX, targetY, speedFactor * 0.5);
        lastSpawnX = targetX;
        lastSpawnY = targetY;
      }
    };

    const loop = () => {
      // Smoother glow lerp
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.1;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - 140}px, ${y - 140}px, 0)`;
      }

      // Update particles
      const DECAY_RATE = 0.02;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += DECAY_RATE;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;

        const el = particleEls.get(p.id);
        if (el) {
          const o = Math.max(0, p.opacity * Math.pow(1 - p.life, 1.5));
          const scale = 1 - p.life * 0.3;
          el.style.opacity = String(o);
          el.style.transform = `translate3d(${p.x - p.size / 2}px, ${p.y - p.size / 2}px, 0) scale(${scale})`;
        }

        if (p.life >= 1) {
          particles.splice(i, 1);
          const el = particleEls.get(p.id);
          if (el) {
            el.remove();
            particleEls.delete(p.id);
          }
        }
      }

      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      particleEls.forEach((el) => el.remove());
      particleEls.clear();
    };
  }, []);

  if (!isDesktop) return null; // We render nothing directly for mobile, listeners handle it

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Ambient glow halo — soft lagging blob */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 size-[280px] rounded-full bg-gold/10 blur-3xl will-change-transform"
      />
      {/* Precise dot — snaps instantly */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 size-[6px] rounded-full bg-gold shadow-[0_0_10px_3px_var(--color-gold)] will-change-transform"
      />
      {/* Particle container */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden" />
    </div>
  );
}
