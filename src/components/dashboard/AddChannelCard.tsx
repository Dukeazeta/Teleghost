"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  IconPlus,
  IconBrandTelegram,
  IconSparkles,
} from "@tabler/icons-react";

interface AddChannelCardProps {
  onClick: () => void;
  className?: string;
  isEmpty?: boolean;
}

export function AddChannelCard({ onClick, className, isEmpty = false }: AddChannelCardProps) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.3, 
        ease: "easeOut",
        delay: 0.1 
      }
    }
  };

  const hoverVariants: Variants = {
    hover: {
      y: -2,
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const buttonVariants: Variants = {
    idle: {
      scale: 1,
      transition: { duration: 2, repeat: Infinity, repeatType: "reverse" as const }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  if (isEmpty) {
    // Large empty state card for when no channels exist
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="col-span-full"
      >
        <motion.div
          variants={hoverVariants}
          onClick={onClick}
          className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-xl p-12 text-center cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-200 group"
        >
          {/* Floating Icons Animation */}
          <div className="relative mb-6">
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg"
            >
              <IconBrandTelegram className="h-10 w-10 text-white" />
            </motion.div>
            
            {/* Sparkle Effects */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5
              }}
              className="absolute -top-2 -right-2"
            >
              <IconSparkles className="h-6 w-6 text-yellow-400" />
            </motion.div>
            
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1
              }}
              className="absolute -bottom-2 -left-2"
            >
              <IconSparkles className="h-4 w-4 text-purple-400" />
            </motion.div>
          </div>

          <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
            Start Monetizing Your Channel
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
            Add your first Telegram channel and start earning from targeted advertisements. 
            Join thousands of publishers already making money.
          </p>
          
          <motion.div
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <IconPlus className="mr-2 h-5 w-5" />
              Add Your First Channel
            </Button>
          </motion.div>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>Quick approval</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>Instant payouts</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Regular add channel card for when channels exist
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={className}
    >
      <motion.div
        variants={hoverVariants}
        onClick={onClick}
        className="bg-white dark:bg-neutral-900 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200 h-full flex flex-col items-center justify-center group min-h-[320px]"
      >
        {/* Plus Button */}
        <motion.div
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-200"
        >
          <IconPlus className="h-8 w-8 text-white" strokeWidth={2.5} />
        </motion.div>

        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          Add New Channel
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Monetize another Telegram channel and increase your earning potential
        </p>
        
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          Click to get started
        </div>

        {/* Hover Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-4 text-xs text-blue-600 dark:text-blue-400 font-medium"
        >
          <IconPlus className="inline h-3 w-3 mr-1" />
          Quick setup in 2 minutes
        </motion.div>
      </motion.div>
    </motion.div>
  );
}