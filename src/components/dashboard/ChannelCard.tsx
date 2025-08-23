"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconUsers,
  IconStar,
  IconActivity,
  IconEye,
  IconEdit,
  IconPlayerPlay,
  IconPlayerPause,
  IconDotsVertical,
  IconTrendingUp,
  IconExternalLink,
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

interface ChannelCardProps {
  channel: Channel;
  onView: () => void;
  onEdit: () => void;
  onToggle: (action: "pause" | "resume") => void;
  index?: number;
}

export function ChannelCard({ channel, onView, onEdit, onToggle, index = 0 }: ChannelCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5" />
            Active
          </Badge>
        );
      case "paused":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-1.5" />
            Paused
          </Badge>
        );
      case "pending_review":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-1.5" />
            Under Review
          </Badge>
        );
      case "suspended":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-1.5" />
            Suspended
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getNicheBadge = (niche: string) => {
    const colors: Record<string, string> = {
      Technology: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
      "Business & Finance": "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
      "Lifestyle & Entertainment": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800",
      Education: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800",
      Health: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-400 dark:border-pink-800",
    };
    
    return (
      <Badge
        variant="outline"
        className={`${colors[niche] || "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"} font-medium`}
      >
        {niche}
      </Badge>
    );
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.3, 
        ease: "easeOut",
        delay: index * 0.1 
      }
    }
  };

  const hoverVariants: Variants = {
    hover: {
      y: -2,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group"
    >
      <motion.div
        variants={hoverVariants}
        className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 h-full flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                {channel.name}
              </h3>
              {channel.new_orders > 0 && (
                <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded-full text-xs font-medium">
                  {channel.new_orders} new
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mb-3">
              {getStatusBadge(channel.status)}
              {getNicheBadge(channel.niche)}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <IconDotsVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={onView}>
                <IconEye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <IconEdit className="mr-2 h-4 w-4" />
                Edit Channel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open(channel.telegram_link, '_blank')}>
                <IconExternalLink className="mr-2 h-4 w-4" />
                Open Channel
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {channel.status === "active" ? (
                <DropdownMenuItem onClick={() => onToggle("pause")}>
                  <IconPlayerPause className="mr-2 h-4 w-4" />
                  Pause Channel
                </DropdownMenuItem>
              ) : channel.status === "paused" ? (
                <DropdownMenuItem onClick={() => onToggle("resume")}>
                  <IconPlayerPlay className="mr-2 h-4 w-4" />
                  Resume Channel
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-neutral-500 dark:text-neutral-400 mb-1">
              <IconUsers className="h-3 w-3" />
              <span>Subscribers</span>
            </div>
            <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {channel.subscribers.toLocaleString()}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-neutral-500 dark:text-neutral-400 mb-1">
              <IconStar className="h-3 w-3" />
              <span>Rating</span>
            </div>
            <div className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
              {channel.rating.toFixed(1)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-neutral-500 dark:text-neutral-400 mb-1">
              <IconActivity className="h-3 w-3" />
              <span>Engagement</span>
            </div>
            <div className="text-lg font-semibold text-green-600 dark:text-green-400">
              {channel.engagement_rate.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 flex-1">
          {channel.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            {channel.total_orders} orders completed
          </div>
          <div className="flex items-center gap-2">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              ${channel.price_per_post.toFixed(0)}/post
            </div>
            {channel.status === "active" && (
              <IconTrendingUp className="h-4 w-4 text-green-500" />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="outline"
            size="sm"
            onClick={onView}
            className="flex-1"
          >
            <IconEye className="mr-2 h-4 w-4" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="flex-1"
          >
            <IconEdit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}