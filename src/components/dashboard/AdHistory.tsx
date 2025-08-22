"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconEye,
  IconEdit,
  IconTrash,
  IconPlayerPlay,
  IconPlayerPause,
  IconChartBar,
  IconTarget,
  IconClock,
  IconUsers,
  IconTrendingUp,
  IconPlus,
} from "@tabler/icons-react";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed" | "draft" | "pending";
  budget: number;
  spent: number;
  reach: number;
  clicks: number;
  start_date: string;
  end_date?: string;
  category: string;
  channelCount: number;
}

interface AdHistoryProps {
  campaigns: Campaign[];
  onCreateCampaign: () => void;
  onViewCampaign: (id: string) => void;
  onEditCampaign: (id: string) => void;
  onDeleteCampaign: (id: string) => void;
  onToggleCampaign: (id: string, action: "pause" | "resume") => void;
}

export function AdHistory({
  campaigns,
  onCreateCampaign,
  onViewCampaign,
  onEditCampaign,
  onDeleteCampaign,
  onToggleCampaign,
}: AdHistoryProps) {
  const [filter, setFilter] = useState<string>("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "paused":
        return <Badge variant="warning">Paused</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <IconPlayerPlay className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case "paused":
        return <IconPlayerPause className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
      case "completed":
        return <IconChartBar className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case "draft":
        return <IconEdit className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />;
      case "pending":
        return <IconClock className="h-4 w-4 text-orange-600 dark:text-orange-400" />;
      default:
        return <IconTarget className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />;
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (filter === "all") return true;
    return campaign.status === filter;
  });

  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalReach = campaigns.reduce((sum, campaign) => sum + campaign.reach, 0);
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              <IconTarget className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campaigns.length}</div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {activeCampaigns} active
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <IconTrendingUp className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                All time
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
              <IconUsers className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalReach.toLocaleString()}</div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                People reached
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. CTR</CardTitle>
              <IconChartBar className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {campaigns.length > 0
                  ? (
                      (campaigns.reduce((sum, c) => sum + c.clicks, 0) / totalReach) *
                      100
                    ).toFixed(1)
                  : "0"}%
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Click-through rate
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Campaigns Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div>
                <CardTitle>Campaign History</CardTitle>
                <CardDescription>
                  Manage and monitor your advertising campaigns
                </CardDescription>
              </div>
              <Button onClick={onCreateCampaign}>
                <IconPlus className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 pt-4">
              {["all", "active", "paused", "completed", "draft"].map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            {filteredCampaigns.length === 0 ? (
              <div className="text-center py-12">
                <IconTarget className="mx-auto h-12 w-12 text-neutral-300 dark:text-neutral-700 mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                  {filter === "all" ? "No campaigns yet" : `No ${filter} campaigns`}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-4">
                  {filter === "all"
                    ? "Start your first advertising campaign to reach your target audience."
                    : `You don't have any ${filter} campaigns at the moment.`}
                </p>
                <Button onClick={onCreateCampaign}>
                  <IconPlus className="mr-2 h-4 w-4" />
                  Create Your First Campaign
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCampaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                      {/* Campaign Info */}
                      <div className="flex items-start space-x-3">
                        {getStatusIcon(campaign.status)}
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                              {campaign.name}
                            </h3>
                            {getStatusBadge(campaign.status)}
                          </div>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                            {campaign.category} • {campaign.channelCount} channels
                          </p>
                          <div className="flex flex-wrap gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                            <span>Budget: ${campaign.budget}</span>
                            <span>Spent: ${campaign.spent}</span>
                            <span>Reach: {campaign.reach.toLocaleString()}</span>
                            <span>Clicks: {campaign.clicks}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewCampaign(campaign.id)}
                        >
                          <IconEye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditCampaign(campaign.id)}
                        >
                          <IconEdit className="h-4 w-4" />
                        </Button>
                        {campaign.status === "active" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onToggleCampaign(campaign.id, "pause")}
                          >
                            <IconPlayerPause className="h-4 w-4" />
                          </Button>
                        ) : campaign.status === "paused" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onToggleCampaign(campaign.id, "resume")}
                          >
                            <IconPlayerPlay className="h-4 w-4" />
                          </Button>
                        ) : null}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDeleteCampaign(campaign.id)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <IconTrash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {campaign.budget > 0 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                          <span>Campaign Progress</span>
                          <span>{((campaign.spent / campaign.budget) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}