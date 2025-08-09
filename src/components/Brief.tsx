"use client";

import Reveal from "@/components/Reveal";

export default function Brief() {
  return (
    <section className="px-6 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="text-xl font-semibold">The first Telegram ads platform built exclusively for African advertisers and content creators</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-neutral-600 dark:text-neutral-300">
            Laser focused reach, streamlined process, high impact, low cost campaigns all ensures your ads yield profitable outcomes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

