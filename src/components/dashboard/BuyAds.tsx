"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  IconCategory,
  IconTargetArrow,
  IconBrandTelegram,
  IconUsers,
  IconTrendingUp,
  IconArrowRight,
  IconStar,
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

export function BuyAds() {
  const router = useRouter();

  const handleBrowseCategories = () => {
    router.push("/dashboard/advertisers/categories");
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/dashboard/advertisers/categories/${categoryId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Start Your Ad Campaign</CardTitle>
            <CardDescription className="text-lg">
              Choose from 25+ channel categories to reach your target audience
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={handleBrowseCategories} size="lg" className="text-base">
              <IconCategory className="mr-2 h-5 w-5" />
              Browse All Categories
              <IconArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Featured Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            Featured Categories
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Most popular advertising categories with high engagement rates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories
            .filter((category) => category.featured)
            .map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2 border-yellow-200 dark:border-yellow-800 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                  <CardHeader
                    className="pb-3"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/40 rounded-lg">
                          {category.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <div className="flex items-center space-x-1">
                            <IconStar className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                              Featured
                            </span>
                          </div>
                        </div>
                      </div>
                      <IconArrowRight className="h-5 w-5 text-neutral-400" />
                    </div>
                  </CardHeader>
                  <CardContent
                    className="pt-0"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <CardDescription className="mb-3">
                      {category.description}
                    </CardDescription>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {category.channelCount} channels
                      </span>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Avg. reach: {category.avgReach}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* All Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            All Categories
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Explore all available channel categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
            >
              <Card
                className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                        {category.icon}
                      </div>
                      <CardTitle className="text-base">{category.name}</CardTitle>
                    </div>
                    <IconArrowRight className="h-4 w-4 text-neutral-400" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm mb-3">
                    {category.description}
                  </CardDescription>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500 dark:text-neutral-400">
                      {category.channelCount} channels
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-400">
                      {category.avgReach} avg. reach
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Need Help Choosing?
              </h3>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                Our team can help you select the perfect channels for your campaign
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={() => router.push("/help")}>
                  Contact Support
                </Button>
                <Button onClick={handleBrowseCategories}>
                  <IconCategory className="mr-2 h-4 w-4" />
                  Explore Categories
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}