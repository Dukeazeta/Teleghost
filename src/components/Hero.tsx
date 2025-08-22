"use client";

import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[80vh] sm:min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 bg-white dark:bg-black">
      {/* Dot Background Pattern */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      {/* Content */}
      <div className="relative z-20">
      <Reveal y={10}>
        <p className="mt-24 text-[10px] sm:text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400">Telegram Ads Marketplace</p>
      </Reveal>
      <Reveal>
        <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl mx-auto">
          The #1 Telegram Ads Marketplace in Africa
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300">
          Tap into Africa’s most trusted Telegram channels by category. Launch secure ad campaigns with real, targeted reach.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <div id="cta" className="mt-8 mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <a href="/signup/advertisers" className="rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition dark:bg-white dark:text-black dark:hover:bg-neutral-200">
            Launch Ads
          </a>
          <a href="/signup/publishers" className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium hover:bg-black/5 transition dark:border-white/20 dark:hover:bg-white/10">
            Monetize
          </a>
        </div>
      </Reveal>
      </div>
    </section>
  );
}

