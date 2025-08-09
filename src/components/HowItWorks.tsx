"use client";

import Reveal from "@/components/Reveal";

export default function HowItWorks() {
  return (
    <section className="px-6 py-16 sm:py-24" aria-labelledby="hiw-title">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 id="hiw-title" className="text-2xl sm:text-3xl font-bold">Say Goodbye to Stressful Telegram Ads. Here’s How To Get Started With TeleGhost</h2>
        </Reveal>
        <div className="mt-10 grid gap-12 sm:grid-cols-2">
          <Reveal>
            <div id="advertisers">
              <h3 className="font-semibold text-lg">For Advertisers</h3>
              <ol className="mt-4 space-y-2 text-neutral-700 dark:text-neutral-300 list-decimal list-inside">
                <li>Create an Account</li>
                <li>Access your ads manager dashboard</li>
                <li>Fund your ads manager</li>
                <li>Explore and pick a target channel</li>
                <li>Send an ad request</li>
                <li>Await approval, track campaign and get results</li>
              </ol>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div id="publishers">
              <h3 className="font-semibold text-lg">For Publishers</h3>
              <ol className="mt-4 space-y-2 text-neutral-700 dark:text-neutral-300 list-decimal list-inside">
                <li>Create an Account</li>
                <li>Access your publishers dashboard</li>
                <li>Register your channel</li>
                <li>Await moderation and start earning rewards</li>
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

