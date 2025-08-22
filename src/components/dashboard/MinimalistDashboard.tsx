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

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "ad_spend";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface MinimalistDashboardProps {
  campaigns: Campaign[];
  transactions: Transaction[];
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
        return <Badge variant="success">●  Active</Badge>;
      case "paused":
        return <Badge variant="warning">⏸  Paused</Badge>;
      case "completed":
        return <Badge variant="secondary">✓  Complete</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const activeCampaigns = campaigns.filter(c => c.status === "active").length;
  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalReach = campaigns.reduce((sum, campaign) => sum + campaign.reach, 0);

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
          Manage your campaigns, track performance, and grow your reach
        </p>
        
        {/* Key Stats - Inline */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm">
          <div className="text-center min-w-0">
            <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{activeCampaigns}</div>
            <div className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">Active campaigns</div>
          </div>
          <div className="text-center min-w-0">
            <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">${totalSpent.toFixed(0)}</div>
            <div className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">Total spent</div>
          </div>
          <div className="text-center min-w-0">
            <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">{totalReach.toLocaleString()}</div>
            <div className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">People reached</div>
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
              <DropdownMenuItem onClick={onCreateCampaign}>
                <IconTarget className="mr-2 h-4 w-4" />
                Create Campaign
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <IconCreditCard className="mr-2 h-4 w-4" />
                    Add Funds
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Funds</DialogTitle>
                    <DialogDescription>
                      Add USDT to your advertising account. Minimum deposit is $10.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="amount" className="text-sm font-medium">
                        Amount (USD)
                      </label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={addFundsAmount}
                        onChange={(e) => setAddFundsAmount(e.target.value)}
                        min="10"
                        step="0.01"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                      </DialogTrigger>
                      <Button
                        onClick={handleAddFunds}
                        disabled={!addFundsAmount || parseFloat(addFundsAmount) < 10 || isAddingFunds}
                        size="sm"
                      >
                        {isAddingFunds ? "Processing..." : "Add Funds"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/dashboard/advertisers/categories")}>
                <IconCategory className="mr-2 h-4 w-4" />
                Browse Categories
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Action Items with Dividers */}
        <div className="space-y-1">
          <div 
            onClick={onCreateCampaign}
            className="group flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 rounded-lg cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                <IconPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                  Create New Campaign
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Launch your advertising campaign
                </p>
              </div>
            </div>
            <IconArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
          </div>
          
          <div className="border-t border-neutral-200 dark:border-neutral-800" />
          
          <div className="flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 rounded-lg transition-colors duration-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                <IconCreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                  Account Balance
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  ${balance.toFixed(2)} available
                </p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Add Funds
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Funds</DialogTitle>
                  <DialogDescription>
                    Add USDT to your advertising account. Minimum deposit is $10.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="amount2" className="text-sm font-medium">
                      Amount (USD)
                    </label>
                    <Input
                      id="amount2"
                      type="number"
                      placeholder="Enter amount"
                      value={addFundsAmount}
                      onChange={(e) => setAddFundsAmount(e.target.value)}
                      min="10"
                      step="0.01"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    </DialogTrigger>
                    <Button
                      onClick={handleAddFunds}
                      disabled={!addFundsAmount || parseFloat(addFundsAmount) < 10 || isAddingFunds}
                      size="sm"
                    >
                      {isAddingFunds ? "Processing..." : "Add Funds"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="border-t border-neutral-200 dark:border-neutral-800" />
          
          <div 
            onClick={() => router.push("/dashboard/advertisers/categories")}
            className="group flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 rounded-lg cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                <IconCategory className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                  Browse Categories
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  25+ categories, 1000+ channels
                </p>
              </div>
            </div>
            <IconArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
          </div>
        </div>
      </motion.div>

      {/* Recent Campaigns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4 sm:space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Recent Campaigns
          </h2>
          <div className="flex items-center space-x-2">
            {campaigns.length > 3 && (
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
            <h3 className="text-base sm:text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              No campaigns yet
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-4 sm:mb-6 text-sm sm:text-base">
              Create your first campaign to start reaching your audience
            </p>
            <Button onClick={onCreateCampaign}>
              <IconPlus className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
          </div>
        ) : (
          <div className="space-y-1">
            {campaigns.slice(0, 5).map((campaign, index) => (
              <React.Fragment key={campaign.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="group flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 rounded-lg transition-colors duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm sm:text-base truncate">
                        {campaign.name}
                      </h3>
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
                    
                    {/* Progress Bar */}
                    {campaign.budget > 0 && (
                      <div className="mt-2 w-full max-w-xs">
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1">
                          <div
                            className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%`,
                            }}
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
                </motion.div>
                
                {index < Math.min(campaigns.length - 1, 4) && (
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