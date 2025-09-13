"use client";

import React from "react";
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
  IconDotsVertical,
  IconEye,
  IconEdit,
  IconPlayerPause,
  IconPlayerPlay,
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

interface ChannelRowProps {
  channel: Channel;
  onView: () => void;
  onEdit: () => void;
  onToggle: (action: "pause" | "resume") => void;
}

export function ChannelRow({ channel, onView, onEdit, onToggle }: ChannelRowProps) {
  const statusBadge = (status: Channel["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="outline">Active</Badge>;
      case "paused":
        return <Badge variant="outline">Paused</Badge>;
      case "pending_review":
        return <Badge variant="outline">Under review</Badge>;
      case "suspended":
        return <Badge variant="outline">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="group border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr_0.8fr_0.8fr_0.4fr] items-center gap-4 px-3 sm:px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-medium text-neutral-900 dark:text-neutral-100 truncate">{channel.name}</span>
            {channel.new_orders > 0 && (
              <span className="text-xs text-neutral-500 dark:text-neutral-400">{channel.new_orders} new</span>
            )}
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{channel.niche}</div>
        </div>
        <div className="text-sm text-neutral-900 dark:text-neutral-100">{channel.subscribers.toLocaleString()}</div>
        <div className="text-sm text-neutral-900 dark:text-neutral-100">{channel.rating.toFixed(1)}</div>
        <div className="text-sm text-neutral-900 dark:text-neutral-100">{channel.engagement_rate.toFixed(1)}%</div>
        <div className="text-sm text-neutral-900 dark:text-neutral-100">${channel.price_per_post.toFixed(0)}/post</div>
        <div className="text-sm text-neutral-600 dark:text-neutral-300">{channel.total_orders}</div>
        <div className="flex items-center justify-end gap-1">
          {statusBadge(channel.status)}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
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
              <DropdownMenuItem onClick={() => window.open(channel.telegram_link, "_blank") }>
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
      </div>

      {/* Mobile layout */}
      <div className="md:hidden px-3 sm:px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-medium text-neutral-900 dark:text-neutral-100 truncate">{channel.name}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{channel.niche} • {channel.subscribers.toLocaleString()} subs • ⭐ {channel.rating.toFixed(1)}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">Eng {channel.engagement_rate.toFixed(1)}% • {channel.total_orders} orders</div>
          </div>
          <div className="flex items-center gap-2">
            {statusBadge(channel.status)}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
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
        </div>
        <div className="mt-2 text-sm text-neutral-900 dark:text-neutral-100">${channel.price_per_post.toFixed(0)}/post</div>
      </div>
    </div>
  );
}
