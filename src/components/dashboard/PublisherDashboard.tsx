"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconPlus,
  IconBrandTelegram,
  IconStar,
  IconTrendingUp,
  IconEye,
  IconEdit,
  IconPlayerPlay,
  IconPlayerPause,
  IconWallet,
  IconUsers,
  IconChartBar,
  IconArrowRight,
  IconCash,
  IconActivity,
} from "@tabler/icons-react";

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

interface PublisherTransaction {
  id: string;
  type: "earning" | "withdrawal" | "bonus";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
  channel_id?: string;
}

interface PublisherDashboardProps {
  channels: Channel[];
  transactions: PublisherTransaction[];
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">●  Active</Badge>;
      case "paused":
        return <Badge variant="warning">⏸  Paused</Badge>;
      case "pending_review":
        return <Badge variant="outline">⏳  Under Review</Badge>;
      case "suspended":
        return <Badge variant="destructive">⚠  Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getNicheBadge = (niche: string) => {
    const colors: Record<string, string> = {
      Technology: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      "Business & Finance": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      "Lifestyle & Entertainment": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      Education: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      Health: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[niche] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"}`}>
        {niche}
      </span>
    );
  };

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
        className="space-y-4 sm:space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Your Channels ({channels.length})
          </h2>
          <div className="flex items-center space-x-2">
            {channels.length > 3 && (
              <Button variant="outline" size="sm">
                View All
              </Button>
            )}
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
          </div>
        </div>

        {channels.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <IconBrandTelegram className="mx-auto h-12 w-12 text-neutral-300 dark:text-neutral-700 mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              No channels added yet
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-4 sm:mb-6 text-sm sm:text-base">
              Add your first Telegram channel to start earning from advertisements
            </p>
            <Button onClick={onAddChannel}>
              <IconPlus className="mr-2 h-4 w-4" />
              Add Your First Channel
            </Button>
          </div>
        ) : (
          <div className="space-y-1">
            {channels.map((channel, index) => (
              <React.Fragment key={channel.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="group flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 rounded-lg transition-colors duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm sm:text-base truncate">
                        {channel.name}
                      </h3>
                      {getStatusBadge(channel.status)}
                      {channel.new_orders > 0 && (
                        <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded-full text-xs font-medium">
                          {channel.new_orders} new
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                      {getNicheBadge(channel.niche)}
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <IconUsers className="h-3 w-3" />
                        {channel.subscribers.toLocaleString()}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <IconStar className="h-3 w-3" />
                        {channel.rating.toFixed(1)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <IconActivity className="h-3 w-3" />
                        {channel.engagement_rate.toFixed(1)}%
                      </span>
                      <span>•</span>
                      <span className="font-medium text-purple-600 dark:text-purple-400">
                        ${channel.price_per_post.toFixed(0)}/post
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                      {channel.description}
                    </p>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <IconArrowRight className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => onViewChannel(channel.id)}>
                        <IconEye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditChannel(channel.id)}>
                        <IconEdit className="mr-2 h-4 w-4" />
                        Edit Channel
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {channel.status === "active" ? (
                        <DropdownMenuItem onClick={() => onToggleChannel(channel.id, "pause")}>
                          <IconPlayerPause className="mr-2 h-4 w-4" />
                          Pause Channel
                        </DropdownMenuItem>
                      ) : channel.status === "paused" ? (
                        <DropdownMenuItem onClick={() => onToggleChannel(channel.id, "resume")}>
                          <IconPlayerPlay className="mr-2 h-4 w-4" />
                          Resume Channel
                        </DropdownMenuItem>
                      ) : null}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
                
                {index < channels.length - 1 && (
                  <div className="border-t border-neutral-200 dark:border-neutral-800" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}