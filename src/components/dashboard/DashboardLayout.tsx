"use client";

import React from "react";
import { DesktopSidebar } from "./DesktopSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { MobileBottomNav } from "./MobileBottomNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: "advertiser" | "publisher";
  balance?: number;
  mobileActiveTab?: string;
  onMobileTabChange?: (tab: string) => void;
  onCreateCampaign?: () => void;
  showMobileNav?: boolean;
}

export function DashboardLayout({
  children,
  userType,
  balance = 0,
  mobileActiveTab = "overview",
  onMobileTabChange,
  onCreateCampaign,
  showMobileNav = true,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Desktop Sidebar */}
      <DesktopSidebar userType={userType} />
      
      {/* Main Content Area */}
      <div className="lg:ml-18">
        {/* Dashboard Header */}
        <DashboardHeader balance={balance} />
        
        {/* Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {children}
        </main>
        
        {/* Mobile Bottom Navigation */}
        {showMobileNav && onMobileTabChange && onCreateCampaign && (
          <MobileBottomNav
            activeTab={mobileActiveTab}
            onTabChange={onMobileTabChange}
            onCreateCampaign={onCreateCampaign}
          />
        )}
      </div>
    </div>
  );
}