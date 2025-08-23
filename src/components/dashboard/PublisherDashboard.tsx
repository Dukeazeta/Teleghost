"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconPlus,
  IconTrendingUp,
  IconWallet,
  IconChartBar,
  IconArrowRight,
  IconCash,
} from "@tabler/icons-react";
import { ChannelsGrid } from "./ChannelsGrid";
import { UnifiedTransaction } from "@/lib/walletService";

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

interface PublisherDashboardProps {
  channels: Channel[];
  transactions: UnifiedTransaction[];
  balance: number;
  onAddChannel: () => void;
  onWithdraw: () => void;
  onViewChannel: (id: string) => void;
  onEditChannel: (id: string) => void;
  onToggleChannel: (id: string, action: "pause" | "resume") => void;
}

export function PublisherDashboard({
  channels,
  transactions,
  balance,
  onAddChannel,
  onWithdraw,
  onViewChannel,
  onEditChannel,
  onToggleChannel,
}: PublisherDashboardProps) {
  const router = useRouter();

  const activeChannels = channels.filter(c => c.status === "active").length;
  const totalSubscribers = channels.reduce((sum, channel) => sum + channel.subscribers, 0);
  const totalNewOrders = channels.reduce((sum, channel) => sum + channel.new_orders, 0);
  const avgRating = channels.length > 0 
    ? (channels.reduce((sum, channel) => sum + channel.rating, 0) / channels.length).toFixed(1)
    : "0";

  return (
    <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 pb-24 sm:pb-8">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-6 sm:py-8"
      >
        <h1 className="text-2xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 sm:mb-3">
          Welcome back
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mb-6 sm:mb-8">
          Manage your channels, track earnings, and grow your audience
        </p>
        
        {/* Key Stats - Inline */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm">
          <div className="text-center min-w-0">
            <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{activeChannels}</div>
            <div className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">Active channels</div>
          </div>
          <div className="text-center min-w-0">
            <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">{totalSubscribers.toLocaleString()}</div>
            <div className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">Total subscribers</div>
          </div>
          <div className="text-center min-w-0">
            <div className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">{totalNewOrders}</div>
            <div className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">New orders</div>
          </div>
          <div className="text-center min-w-0">
            <div className="text-xl sm:text-2xl font-bold text-yellow-600 dark:text-yellow-400">⭐ {avgRating}</div>
            <div className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">Avg rating</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions - Dropdown Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Quick Actions
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <IconPlus className="h-4 w-4" />
                New Action
                <IconArrowRight className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={onAddChannel}>
                <IconPlus className="mr-2 h-4 w-4" />
                Add Channel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onWithdraw}>
                <IconCash className="mr-2 h-4 w-4" />
                Withdraw Funds
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/dashboard/publishers/analytics")}>
                <IconChartBar className="mr-2 h-4 w-4" />
                View Analytics
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Action Items with Dividers */}
        <div className="space-y-1">
          <div 
            onClick={onAddChannel}
            className="group flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 rounded-lg cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                <IconPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                  Add New Channel
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Monetize your Telegram channel
                </p>
              </div>
            </div>
            <IconArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
          </div>
          
          <div className="border-t border-neutral-200 dark:border-neutral-800" />
          
          <div className="flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 rounded-lg transition-colors duration-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                <IconWallet className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                  Wallet Balance
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  ${balance.toFixed(2)} available
                </p>
              </div>
            </div>
            <Button onClick={onWithdraw} variant="outline" size="sm">
              Withdraw
            </Button>
          </div>
          
          <div className="border-t border-neutral-200 dark:border-neutral-800" />
          
          <div 
            onClick={() => router.push("/dashboard/publishers/analytics")}
            className="group flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 rounded-lg cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                <IconChartBar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                  View Analytics
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Track performance & earnings
                </p>
              </div>
            </div>
            <IconArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
          </div>
        </div>
      </motion.div>

      {/* Channels Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Your Channels ({channels.length})
          </h2>
          {channels.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <IconChartBar className="h-4 w-4" />
                  Manage
                  <IconArrowRight className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={onAddChannel}>
                  <IconPlus className="mr-2 h-4 w-4" />
                  Add Channel
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/dashboard/publishers/analytics")}>
                  <IconTrendingUp className="mr-2 h-4 w-4" />
                  View Analytics
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard/publishers/earnings")}>
                  <IconWallet className="mr-2 h-4 w-4" />
                  Earnings History
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Channels Grid */}
        <ChannelsGrid
          channels={channels}
          onAddChannel={onAddChannel}
          onViewChannel={onViewChannel}
          onEditChannel={onEditChannel}
          onToggleChannel={onToggleChannel}
        />
      </motion.div>
    </div>
  );
}