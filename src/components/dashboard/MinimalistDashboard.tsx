"use client";

import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  IconPlus,
  IconTarget,
  IconCreditCard,
  IconChartBar,
  IconPlayerPlay,
  IconPlayerPause,
  IconEdit,
  IconEye,
  IconTrendingUp,
  IconCategory,
  IconArrowRight,
} from "@tabler/icons-react";
import { UnifiedTransaction } from "@/lib/walletService";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed" | "draft" | "pending";
  budget: number;
  spent: number;
  reach: number;
  clicks: number;
  category: string;
  channelCount: number;
}

interface MinimalistDashboardProps {
  campaigns: Campaign[];
  transactions: UnifiedTransaction[];
  balance: number;
  onAddFunds: (amount: number) => void;
  onCreateCampaign: () => void;
  onViewCampaign: (id: string) => void;
  onEditCampaign: (id: string) => void;
  onToggleCampaign: (id: string, action: "pause" | "resume") => void;
}

export function MinimalistDashboard({
  campaigns,
  balance,
  onAddFunds,
  onCreateCampaign,
  onViewCampaign,
  onEditCampaign,
  onToggleCampaign,
}: MinimalistDashboardProps) {
  const router = useRouter();
  const [addFundsAmount, setAddFundsAmount] = useState("");
  const [isAddingFunds, setIsAddingFunds] = useState(false);

  const handleAddFunds = async () => {
    const amount = parseFloat(addFundsAmount);
    if (amount > 0) {
      setIsAddingFunds(true);
      try {
        await onAddFunds(amount);
        setAddFundsAmount("");
      } catch (error) {
        console.error("Error adding funds:", error);
      } finally {
        setIsAddingFunds(false);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline">Active</Badge>;
      case "paused":
        return <Badge variant="outline">Paused</Badge>;
      case "completed":
        return <Badge variant="outline">Complete</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const activeCampaigns = campaigns.filter(c => c.status === "active").length;
  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalReach = campaigns.reduce((sum, campaign) => sum + campaign.reach, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 pb-24 sm:pb-8">
      {/* Header */}
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Overview</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Key metrics and recent activity</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <Button size="sm" onClick={onCreateCampaign}>
            <IconPlus className="h-4 w-4" />
            New
          </Button>
          <Button size="sm" variant="outline" onClick={() => router.push("/dashboard/advertisers/analytics")}>Analytics</Button>
        </div>
      </header>

      {/* Metrics strip */}
      <section aria-label="Key metrics" className="border border-neutral-200 dark:border-neutral-800 rounded-lg">
        <div className="grid grid-cols-2 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-neutral-800">
          <div className="px-4 py-3">
            <div className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">{activeCampaigns}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">Active campaigns</div>
          </div>
          <div className="px-4 py-3">
            <div className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">${totalSpent.toFixed(0)}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">Total spent</div>
          </div>
          <div className="px-4 py-3">
            <div className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">{totalReach.toLocaleString()}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">People reached</div>
          </div>
        </div>
      </section>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Main content */}
        <section className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">Recent campaigns</h2>
            <div className="flex items-center gap-2">
              {campaigns.length > 3 && (
                <Button variant="outline" size="sm">View All</Button>
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
                  <DropdownMenuItem onClick={onCreateCampaign}>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Create Campaign
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/dashboard/advertisers/analytics")}>
                    <IconTrendingUp className="mr-2 h-4 w-4" />
                    View Analytics
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/advertisers/history")}>
                    <IconChartBar className="mr-2 h-4 w-4" />
                    Campaign History
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {campaigns.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <IconTarget className="mx-auto h-12 w-12 text-neutral-300 dark:text-neutral-700 mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">No campaigns yet</h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-4 sm:mb-6 text-sm sm:text-base">Create your first campaign to start reaching your audience</p>
              <Button onClick={onCreateCampaign}>
                <IconPlus className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
              {campaigns.slice(0, 5).map((campaign) => (
                <React.Fragment key={campaign.id}>
                  <div className="group flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 rounded-lg transition-colors duration-200">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm sm:text-base truncate">{campaign.name}</h3>
                        {getStatusBadge(campaign.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                        <span>{campaign.category}</span>
                        <span>•</span>
                        <span>${campaign.spent} / ${campaign.budget}</span>
                        <span>•</span>
                        <span className="hidden sm:inline">{campaign.reach.toLocaleString()} reach</span>
                        <span className="sm:hidden">{(campaign.reach / 1000).toFixed(0)}K reach</span>
                        <span>•</span>
                        <span>{campaign.channelCount} channels</span>
                      </div>

                      {campaign.budget > 0 && (
                        <div className="mt-2 w-full max-w-xs">
                          <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-1">
                            <div
                              className="bg-neutral-900 dark:bg-neutral-100 h-1 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <IconChartBar className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => onViewCampaign(campaign.id)}>
                          <IconEye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditCampaign(campaign.id)}>
                          <IconEdit className="mr-2 h-4 w-4" />
                          Edit Campaign
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {campaign.status === "active" ? (
                          <DropdownMenuItem onClick={() => onToggleCampaign(campaign.id, "pause")}>
                            <IconPlayerPause className="mr-2 h-4 w-4" />
                            Pause Campaign
                          </DropdownMenuItem>
                        ) : campaign.status === "paused" ? (
                          <DropdownMenuItem onClick={() => onToggleCampaign(campaign.id, "resume")}>
                            <IconPlayerPlay className="mr-2 h-4 w-4" />
                            Resume Campaign
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                          <IconTarget className="mr-2 h-4 w-4" />
                          Delete Campaign
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="border-t border-neutral-200 dark:border-neutral-800" />
                </React.Fragment>
              ))}
            </div>
          )}
        </section>

        {/* Aside */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Account */}
          <section className="border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Account</h3>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">Balance</div>
                <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">${balance.toFixed(2)}</div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">Add Funds</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Funds</DialogTitle>
                    <DialogDescription>Add USDT to your advertising account. Minimum deposit is $10.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="aside-amount" className="text-sm font-medium">Amount (USD)</label>
                      <Input id="aside-amount" type="number" placeholder="Enter amount" value={addFundsAmount} onChange={(e) => setAddFundsAmount(e.target.value)} min="10" step="0.01" />
                    </div>
                    <div className="flex justify-end gap-2">
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Cancel</Button>
                      </DialogTrigger>
                      <Button onClick={handleAddFunds} disabled={!addFundsAmount || parseFloat(addFundsAmount) < 10 || isAddingFunds} size="sm">
                        {isAddingFunds ? "Processing..." : "Add Funds"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </section>

          {/* Shortcuts */}
          <section className="border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Shortcuts</h3>
            </div>
            <div className="px-2 py-2">
              <button onClick={onCreateCampaign} className="w-full text-left px-2 py-2 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900/50 text-sm text-neutral-900 dark:text-neutral-100">Create campaign</button>
              <button onClick={() => router.push("/dashboard/advertisers/categories")} className="w-full text-left px-2 py-2 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900/50 text-sm text-neutral-900 dark:text-neutral-100">Browse categories</button>
              <button onClick={() => router.push("/dashboard/advertisers/history")} className="w-full text-left px-2 py-2 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900/50 text-sm text-neutral-900 dark:text-neutral-100">Campaign history</button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
