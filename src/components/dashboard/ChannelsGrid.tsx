"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChannelCard } from "./ChannelCard";
import { AddChannelCard } from "./AddChannelCard";

interface Channel {
  id: string;
  name: string;
  niche: string;
  subscribers: number;
  engagement_rate: number;
  rating: number;
  price_per_post: number;
  status: "active" | "paused" | "pending_review" | "suspended";
  new_orders: number;
  total_orders: number;
  telegram_link: string;
  description: string;
}

interface ChannelsGridProps {
  channels: Channel[];
  onAddChannel: () => void;
  onViewChannel: (id: string) => void;
  onEditChannel: (id: string) => void;
  onToggleChannel: (id: string, action: "pause" | "resume") => void;
}

export function ChannelsGrid({
  channels,
  onAddChannel,
  onViewChannel,
  onEditChannel,
  onToggleChannel,
}: ChannelsGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  // Show empty state if no channels
  if (channels.length === 0) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <AddChannelCard onClick={onAddChannel} isEmpty={true} />
      </motion.div>
    );
  }

  // Sort channels: active first, then by new orders, then by name
  const sortedChannels = [...channels].sort((a, b) => {
    // Active channels first
    if (a.status === "active" && b.status !== "active") return -1;
    if (a.status !== "active" && b.status === "active") return 1;
    
    // Then by new orders (descending)
    if (a.new_orders !== b.new_orders) {
      return b.new_orders - a.new_orders;
    }
    
    // Finally by name (ascending)
    return a.name.localeCompare(b.name);
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Channel Cards */}
        {sortedChannels.map((channel, index) => (
          <ChannelCard
            key={channel.id}
            channel={channel}
            onView={() => onViewChannel(channel.id)}
            onEdit={() => onEditChannel(channel.id)}
            onToggle={(action) => onToggleChannel(channel.id, action)}
            index={index}
          />
        ))}

        {/* Add Channel Card */}
        <AddChannelCard onClick={onAddChannel} />
      </div>

      {/* Grid Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-8 p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-800"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {channels.length}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              Total Channels
            </div>
          </div>
          
          <div>
            <div className="text-lg font-semibold text-green-600 dark:text-green-400">
              {channels.filter(c => c.status === "active").length}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              Active
            </div>
          </div>
          
          <div>
            <div className="text-lg font-semibold text-orange-600 dark:text-orange-400">
              {channels.filter(c => c.status === "paused").length}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              Paused
            </div>
          </div>
          
          <div>
            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {channels.reduce((sum, channel) => sum + channel.new_orders, 0)}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              New Orders
            </div>
          </div>
        </div>
      </motion.div>

      {/* Load More for Large Collections */}
      {channels.length > 12 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-6 text-center"
        >
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200">
            Load More Channels ({channels.length - 12} remaining)
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}