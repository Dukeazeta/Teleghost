"use client";

import Reveal from "@/components/Reveal";

export default function Problem() {
  return (
    <section className="px-6 py-16 sm:py-24" aria-labelledby="problem-title">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <h2 id="problem-title" className="text-2xl sm:text-3xl font-bold">Buying Ads on Telegram Shouldn’t Be This Hard</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-6 grid gap-3 text-neutral-700 dark:text-neutral-300">
            <li>• You struggle to locate the right channel for your brand</li>
            <li>• You&apos;re tired of begging admins for responses</li>
            <li>• You get overcharged by admins for ads placement</li>
            <li>• Your ads keeps yielding poor results</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

