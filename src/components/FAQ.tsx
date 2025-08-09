"use client";

import Reveal from "@/components/Reveal";

export default function FAQ() {
  return (
    <section id="faq" className="px-6 py-16 sm:py-24" aria-labelledby="faq-title">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <h2 id="faq-title" className="text-2xl sm:text-3xl font-bold">FAQ</h2>
        </Reveal>
        <div className="mt-6 space-y-6">
          <Reveal>
            <div>
              <h3 className="font-semibold">What is TeleGhost?</h3>
              <p className="text-neutral-600 dark:text-neutral-300">TeleGhost is an ad network that connects African Telegram channel owners to advertisers.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h3 className="font-semibold">How do I register my channel on TeleGhost?</h3>
              <p className="text-neutral-600 dark:text-neutral-300">Create a publishers account, click on add channels then follow the further instructions correctly.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div>
              <h3 className="font-semibold">What payment methods are supported?</h3>
              <p className="text-neutral-600 dark:text-neutral-300">Payments are made in USDT cryptocurrency.</p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div>
              <h3 className="font-semibold">Is this platform available outside Africa?</h3>
              <p className="text-neutral-600 dark:text-neutral-300">Yes it is.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

