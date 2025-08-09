"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Brief() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".floating-element", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative px-6 py-20 sm:py-32 overflow-hidden bg-white dark:bg-black">

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Built for Africa
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black dark:text-white leading-tight">
            The first Telegram ads platform built exclusively for{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              African advertisers
            </span>{" "}
            and content creators
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl max-w-3xl mx-auto text-neutral-600 dark:text-neutral-300 leading-relaxed"
          >
            Laser focused reach, streamlined process, high impact, low cost campaigns all ensures your ads yield profitable outcomes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 pt-8"
          >
            {[
              { number: "25+", label: "Channel Categories" },
              { number: "1000+", label: "Active Channels" },
              { number: "99.9%", label: "Uptime Guarantee" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
                  {stat.number}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

