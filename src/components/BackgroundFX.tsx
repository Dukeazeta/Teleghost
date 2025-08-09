"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function BackgroundFX() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.to(".bg-orb", {
        xPercent: 20,
        yPercent: 20,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-orb absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30 bg-fuchsia-400/40 dark:bg-fuchsia-500/30" />
      <div className="bg-orb absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl opacity-30 bg-cyan-400/40 dark:bg-cyan-500/30" />
      <div className="bg-orb absolute top-1/3 left-1/4 h-64 w-64 rounded-full blur-3xl opacity-20 bg-emerald-400/40 dark:bg-emerald-500/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent dark:via-black/30" />
    </div>
  );
}

