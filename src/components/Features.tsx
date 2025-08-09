"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  IconTarget,
  IconCoin,
  IconTrendingUp,
  IconShield
} from "@tabler/icons-react";

export default function Features() {
  const features = [
    {
      title: "Streamlined Process",
      description:
        "Save time and energy by picking your target channel from 25+ ready-made categories — no more endless searching.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Pay For Views Not Hours",
      description:
        "Pay only for real views — not hours and days. Choose the views/impressions you want. Pay only when they are achieved.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Set and Earn",
      description:
        "Earn rewards for every ad shown on your channel. List it, sit back — we bring the advertisers.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
    },
    {
      title: "Secure & Trusted",
      description:
        "Built with security in mind. All transactions are protected and your data is safe with our enterprise-grade infrastructure.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];

  return (
    <section id="features" className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto bg-white dark:bg-black">
      <div className="px-8">
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white"
        >
          TeleGhost Fixes Every One of These Problems Instantly
        </motion.h4>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300"
        >
          From streamlined processes to guaranteed results, TeleGhost provides everything you need for successful Telegram advertising campaigns.
        </motion.p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} className={feature.className} index={index}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({
  children,
  className,
  index,
}: {
  children?: React.ReactNode;
  className?: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}
    >
      {children}
    </motion.div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".category-card", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative flex py-8 px-2 gap-4 h-full">
      <div className="w-full p-5 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full rounded-lg">
        <div className="flex flex-1 w-full h-full flex-col space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <IconTarget className="h-6 w-6 text-blue-500" />
            <span className="font-semibold">Channel Categories</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["Tech", "Business", "News", "Entertainment", "Sports", "Lifestyle"].map((category) => (
              <div
                key={category}
                className="category-card p-2 bg-neutral-100 dark:bg-neutral-800 rounded text-xs text-center"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export const SkeletonTwo = () => {
  const coins = [
    { value: "1K", label: "Views" },
    { value: "5K", label: "Views" },
    { value: "10K", label: "Views" },
    { value: "25K", label: "Views" },
  ];

  const coinVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 5,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 5,
      zIndex: 100,
    },
  };

  return (
    <div className="relative flex flex-col items-center p-8 gap-6 h-full overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <IconCoin className="h-6 w-6 text-yellow-500" />
        <span className="font-semibold">Pay Per View</span>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {coins.map((coin, idx) => (
          <motion.div
            variants={coinVariants}
            key={`coin-${idx}`}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-full p-4 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden cursor-pointer"
          >
            <div className="text-center">
              <div className="text-lg font-bold">{coin.value}</div>
              <div className="text-xs text-neutral-500">{coin.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export const SkeletonThree = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [values, setValues] = React.useState<number[]>([0, 0, 0]);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".earning-bar", {
        width: "100%",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.5,
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  // Generate amounts on client after mount to avoid SSR/CSR mismatch
  useEffect(() => {
    setValues([0, 1, 2].map(() => Math.floor(Math.random() * 1000)));
  }, []);

  return (
    <div ref={ref} className="relative flex flex-col items-center p-8 gap-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <IconTrendingUp className="h-6 w-6 text-green-500" />
        <span className="font-semibold">Earnings Dashboard</span>
      </div>
      <div className="w-full space-y-4">
        {["Today", "This Week", "This Month"].map((period, idx) => (
          <div key={period} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{period}</span>
              <span className="font-semibold">${values[idx]}</span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
              <div
                className="earning-bar bg-green-500 h-2 rounded-full"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="h-60 md:h-60 flex flex-col items-center justify-center relative bg-transparent dark:bg-transparent">
      <div className="flex items-center gap-2 mb-6">
        <IconShield className="h-8 w-8 text-blue-500" />
        <span className="font-semibold text-lg">Enterprise Security</span>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {["SSL Encrypted", "GDPR Compliant", "24/7 Monitoring", "Secure Payments"].map((feature) => (
          <div key={feature} className="text-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <div className="text-xs font-medium">{feature}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

