"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  IconCategory,
  IconTrendingUp,
  IconUsers,
  IconBrandTelegram,
  IconTargetArrow,
  IconStar,
  IconArrowRight,
} from "@tabler/icons-react";

interface Category {
  id: string;
  name: string;
  description: string;
  channelCount: number;
  avgReach: string;
  icon: React.ReactNode;
  featured?: boolean;
}

const categories: Category[] = [
  {
    id: "tech",
    name: "Technology",
    description: "Tech news, gadgets, programming",
    channelCount: 156,
    avgReach: "50K",
    icon: <IconCategory className="h-6 w-6" />,
    featured: true,
  },
  {
    id: "business",
    name: "Business & Finance",
    description: "Trading, investment, business news",
    channelCount: 98,
    avgReach: "75K",
    icon: <IconTrendingUp className="h-6 w-6" />,
    featured: true,
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    description: "Fashion, travel, food, wellness",
    channelCount: 203,
    avgReach: "40K",
    icon: <IconStar className="h-6 w-6" />,
  },
  {
    id: "education",
    name: "Education",
    description: "Online courses, tutorials, skills",
    channelCount: 87,
    avgReach: "30K",
    icon: <IconUsers className="h-6 w-6" />,
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Movies, music, comedy, gaming",
    channelCount: 234,
    avgReach: "60K",
    icon: <IconBrandTelegram className="h-6 w-6" />,
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    description: "Sports news, fitness tips, health",
    channelCount: 112,
    avgReach: "45K",
    icon: <IconTargetArrow className="h-6 w-6" />,
  },
];

export function MobileCategoriesView() {
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/dashboard/advertisers/categories/${categoryId}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-6"
      >
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Browse Categories
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Explore 25+ categories with 1000+ active channels
        </p>
      </motion.div>

      {/* Featured Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Featured Categories
        </h2>
        
        <div className="space-y-3">
          {categories
            .filter((category) => category.featured)
            .map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                onClick={() => handleCategoryClick(category.id)}
                className="group cursor-pointer p-4 border-2 border-yellow-200 dark:border-yellow-800 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl hover:border-yellow-300 dark:hover:border-yellow-700 transition-all duration-200 active:scale-95"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/40 rounded-lg">
                      {category.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {category.name}
                        </h3>
                        <IconStar className="h-3 w-3 text-yellow-500 fill-current" />
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {category.description}
                      </p>
                      <div className="flex items-center space-x-3 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        <span>{category.channelCount} channels</span>
                        <span>{category.avgReach} avg. reach</span>
                      </div>
                    </div>
                  </div>
                  <IconArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* All Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          All Categories
        </h2>
        
        <div className="space-y-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
              onClick={() => handleCategoryClick(category.id)}
              className="group cursor-pointer p-4 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 rounded-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 active:scale-95"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                      {category.name}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {category.description}
                    </p>
                    <div className="flex items-center space-x-3 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      <span>{category.channelCount} channels</span>
                      <span>{category.avgReach} avg. reach</span>
                    </div>
                  </div>
                </div>
                <IconArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}