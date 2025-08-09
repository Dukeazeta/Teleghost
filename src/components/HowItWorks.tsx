"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  IconUserPlus,
  IconDashboard,
  IconCreditCard,
  IconSearch,
  IconSend,
  IconChartBar,
  IconBuildingStore,
  IconShieldCheck,
} from "@tabler/icons-react";

export default function HowItWorks() {
  const advertiserFeatures = [
    {
      title: "Create an Account",
      description: "Sign up in seconds with your email and get instant access to our platform.",
      icon: <IconUserPlus />,
    },
    {
      title: "Access Dashboard", 
      description: "Navigate your intuitive ads manager dashboard with all tools at your fingertips.",
      icon: <IconDashboard />,
    },
    {
      title: "Fund Your Account",
      description: "Add funds securely using USDT cryptocurrency for transparent transactions.",
      icon: <IconCreditCard />,
    },
    {
      title: "Pick Target Channel",
      description: "Explore 25+ categorized channels and select the perfect match for your brand.",
      icon: <IconSearch />,
    },
    {
      title: "Send Ad Request",
      description: "Submit your ad content and campaign requirements with just a few clicks.",
      icon: <IconSend />,
    },
    {
      title: "Track & Get Results",
      description: "Monitor campaign performance in real-time and get detailed analytics.",
      icon: <IconChartBar />,
    },
  ];

  const publisherFeatures = [
    {
      title: "Create an Account",
      description: "Join our publisher network and start monetizing your Telegram channel today.",
      icon: <IconUserPlus />,
    },
    {
      title: "Access Dashboard",
      description: "Use your dedicated publisher dashboard to manage all your channels efficiently.",
      icon: <IconBuildingStore />,
    },
    {
      title: "Register Channel",
      description: "Add your Telegram channel details and set your preferred ad rates.",
      icon: <IconDashboard />,
    },
    {
      title: "Start Earning",
      description: "Get approved and begin earning rewards for every ad displayed on your channel.",
      icon: <IconShieldCheck />,
    },
  ];

  return (
    <section className="px-6 py-16 sm:py-24 bg-white dark:bg-black" aria-labelledby="hiw-title">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          id="hiw-title" 
          className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white mb-4"
        >
          Say Goodbye to Stressful Telegram Ads
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm lg:text-base max-w-2xl mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300 mb-16"
        >
          Here&apos;s how to get started with TeleGhost and transform your advertising experience.
        </motion.p>

        <div className="space-y-20">
          <div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              id="advertisers"
              className="text-2xl font-bold text-center mb-12"
            >
              For Advertisers
            </motion.h3>
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10 max-w-6xl mx-auto px-2">
              {advertiserFeatures.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index} />
              ))}
            </div>
          </div>

          <div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              id="publishers"
              className="text-2xl font-bold text-center mb-12"
            >
              For Publishers
            </motion.h3>
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-6xl mx-auto px-2">
              {publisherFeatures.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 3) && "lg:border-l dark:border-neutral-800",
        index < 3 && "lg:border-b dark:border-neutral-800"
      )}
    >

      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </motion.div>
  );
};
