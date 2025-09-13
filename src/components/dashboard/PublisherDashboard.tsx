"use client";

import React from "react";
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
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 pb-24 sm:pb-8">
      {/* Header */}
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Overview</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Key metrics and recent activity</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <Button size="sm" onClick={onAddChannel}>
            <IconPlus className="h-4 w-4" />
            New
          </Button>
          <Button size="sm" variant="outline" onClick={() => router.push("/dashboard/publishers/analytics")}>Analytics</Button>
        </div>
      </header>

      {/* Metrics strip */}
      <section aria-label="Key metrics" className="border border-neutral-200 dark:border-neutral-800 rounded-lg">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-neutral-800">
          <div className="px-4 py-3">
            <div className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">{activeChannels}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">Active channels</div>
          </div>
          <div className="px-4 py-3">
            <div className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">{totalSubscribers.toLocaleString()}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">Total subscribers</div>
          </div>
          <div className="px-4 py-3">
            <div className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">{totalNewOrders}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">New orders</div>
          </div>
          <div className="px-4 py-3">
            <div className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">{avgRating}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">Avg rating</div>
          </div>
        </div>
      </section>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Main content */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">Your channels ({channels.length})</h2>
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

          <ChannelsGrid
            channels={channels}
            onAddChannel={onAddChannel}
            onViewChannel={onViewChannel}
            onEditChannel={onEditChannel}
            onToggleChannel={onToggleChannel}
          />
        </section>

        {/* Aside */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Wallet */}
          <section className="border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Wallet</h3>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">Balance</div>
                <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">${balance.toFixed(2)}</div>
              </div>
              <Button onClick={onWithdraw} size="sm" variant="outline">Withdraw</Button>
            </div>
          </section>

          {/* Shortcuts */}
          <section className="border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Shortcuts</h3>
            </div>
            <div className="px-2 py-2">
              <button onClick={onAddChannel} className="w-full text-left px-2 py-2 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900/50 text-sm text-neutral-900 dark:text-neutral-100">Add channel</button>
              <button onClick={() => router.push("/dashboard/publishers/analytics")} className="w-full text-left px-2 py-2 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900/50 text-sm text-neutral-900 dark:text-neutral-100">Analytics</button>
              <button onClick={() => router.push("/dashboard/publishers/earnings")} className="w-full text-left px-2 py-2 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900/50 text-sm text-neutral-900 dark:text-neutral-100">Earnings</button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
