import { useEffect, useRef, useState } from "react";

/** Soft trailing cursor accent with a light dust sparkle. Desktop pointers only. */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX - 3}px, ${targetY - 3}px, 0)`;
      }
    };

    const loop = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - 130}px, ${y - 130}px, 0)`;
      }
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      <div
        ref={glowRef}
        className="absolute left-0 top-0 size-[260px] rounded-full bg-gold/12 blur-3xl transition-opacity duration-500"
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-gold/70 shadow-[0_0_12px_2px_var(--gold)]"
      />
    </div>
  );
}
