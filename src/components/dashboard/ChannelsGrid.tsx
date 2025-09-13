"use client";

import React from "react";
import { ChannelRow } from "./ChannelRow";
import { Button } from "@/components/ui/button";

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
  // Show empty state if no channels
  if (channels.length === 0) {
    return (
      <div className="w-full border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr_0.8fr_0.8fr_0.4fr] gap-4 px-3 sm:px-4 py-3 bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-400">
          <div>Channel</div>
          <div>Subscribers</div>
          <div>Rating</div>
          <div>Engagement</div>
          <div>Price</div>
          <div>Orders</div>
          <div className="text-right">Status</div>
        </div>
        <div className="p-6 text-center text-neutral-600 dark:text-neutral-400">
          No channels yet. <Button variant="outline" size="sm" onClick={onAddChannel} className="ml-2">Add Channel</Button>
        </div>
      </div>
    );
  }

  // Sort channels: active first, then by new orders, then by name
  const sortedChannels = [...channels].sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (a.status !== "active" && b.status === "active") return 1;
    if (a.new_orders !== b.new_orders) return b.new_orders - a.new_orders;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="w-full">
      {/* List container */}
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr_0.8fr_0.8fr_0.4fr] gap-4 px-3 sm:px-4 py-3 bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-400">
          <div>Channel</div>
          <div>Subscribers</div>
          <div>Rating</div>
          <div>Engagement</div>
          <div>Price</div>
          <div>Orders</div>
          <div className="text-right">Status</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {sortedChannels.map((channel) => (
            <ChannelRow
              key={channel.id}
              channel={channel}
              onView={() => onViewChannel(channel.id)}
              onEdit={() => onEditChannel(channel.id)}
              onToggle={(action) => onToggleChannel(channel.id, action)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
