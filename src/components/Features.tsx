"use client";

import Reveal from "@/components/Reveal";

export default function Features() {
  return (
    <section id="features" className="px-6 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold">TeleGhost Fixes Every One of These Problems Instantly</h2>
        </Reveal>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          <Reveal>
            <div className="space-y-2">
              <h3 className="font-semibold">Streamlined Process</h3>
              <p className="text-neutral-600 dark:text-neutral-300">Save time and energy by picking your target channel from 25+ ready-made categories — no more endless searching.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-2">
              <h3 className="font-semibold">Pay For Views Not Hours</h3>
              <p className="text-neutral-600 dark:text-neutral-300">Pay only for real views — not hours and days. Choose the views/impressions you want. Pay only when they are achieved.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="space-y-2">
              <h3 className="font-semibold">Set and Earn</h3>
              <p className="text-neutral-600 dark:text-neutral-300">Earn rewards for every ad shown on your channel. List it, sit back — we bring the advertisers.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

