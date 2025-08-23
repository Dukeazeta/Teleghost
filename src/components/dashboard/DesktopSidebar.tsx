"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  IconDashboard,
  IconTarget,
  IconChartBar,
  IconCreditCard,
  IconSettings,
  IconUsers,
  IconLogout,
  IconBrandTelegram,
  IconPlus,
  IconWallet,
} from "@tabler/icons-react";

interface SidebarNavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  isActive?: boolean;
}

interface DesktopSidebarProps {
  userType: "advertiser" | "publisher";
}

export function DesktopSidebar({ userType }: DesktopSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  // Define navigation items based on user type
  const advertiserNavItems: SidebarNavItem[] = [
    {
      icon: IconDashboard,
      label: "Overview",
      href: "/dashboard/advertisers",
      isActive: pathname === "/dashboard/advertisers",
    },
    {
      icon: IconTarget,
      label: "Campaigns",
      href: "/dashboard/advertisers/campaigns",
      isActive: pathname.includes("/campaigns"),
    },
    {
      icon: IconChartBar,
      label: "Analytics",
      href: "/dashboard/advertisers/analytics",
      isActive: pathname.includes("/analytics"),
    },
    {
      icon: IconCreditCard,
      label: "Billing",
      href: "/dashboard/advertisers/billing",
      isActive: pathname.includes("/billing"),
    },
    {
      icon: IconSettings,
      label: "Settings",
      href: "/dashboard/advertisers/settings",
      isActive: pathname.includes("/settings"),
    },
  ];

  const publisherNavItems: SidebarNavItem[] = [
    {
      icon: IconDashboard,
      label: "Overview",
      href: "/dashboard/publishers",
      isActive: pathname === "/dashboard/publishers",
    },
    {
      icon: IconBrandTelegram,
      label: "Channels",
      href: "/dashboard/publishers/channels",
      isActive: pathname.includes("/channels"),
    },
    {
      icon: IconChartBar,
      label: "Analytics",
      href: "/dashboard/publishers/analytics",
      isActive: pathname.includes("/analytics"),
    },
    {
      icon: IconWallet,
      label: "Earnings",
      href: "/dashboard/publishers/earnings",
      isActive: pathname.includes("/earnings"),
    },
    {
      icon: IconSettings,
      label: "Settings",
      href: "/dashboard/publishers/settings",
      isActive: pathname.includes("/settings"),
    },
  ];

  const navItems = userType === "advertiser" ? advertiserNavItems : publisherNavItems;

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="hidden lg:flex">
      <motion.div
        initial={{ width: 72 }}
        animate={{ width: isExpanded ? 280 : 72 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className="fixed left-0 top-0 h-full bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 z-40 flex flex-col shadow-lg"
      >
        {/* Logo/Brand Section */}
        <div className="flex items-center justify-center h-16 border-b border-neutral-200 dark:border-neutral-800">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <IconBrandTelegram className="h-5 w-5 text-white" />
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="font-bold text-lg text-neutral-900 dark:text-neutral-100"
                >
                  TeleGhost
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6">
          <nav className="space-y-2 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`
                    relative w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                    ${
                      item.isActive
                        ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 dark:bg-blue-400 rounded-r-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                        className="font-medium text-sm"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* User Profile Section */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 p-3">
          <div
            className={`
              flex items-center gap-3 p-3 rounded-lg transition-all duration-200
              hover:bg-neutral-50 dark:hover:bg-neutral-900/50 cursor-pointer
            `}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">
                {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || "U"}
              </span>
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                  className="flex-1 min-w-0"
                >
                  <div className="font-medium text-sm text-neutral-900 dark:text-neutral-100 truncate">
                    {user?.firstName || "User"}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
                    {userType}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick Action Button (Publishers) */}
        {userType === "publisher" && (
          <div className="p-3 border-t border-neutral-200 dark:border-neutral-800">
            <motion.button
              onClick={() => router.push("/dashboard/publishers/channels/add")}
              className="w-full flex items-center gap-3 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <IconPlus className="h-4 w-4 flex-shrink-0" />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    className="text-sm font-medium"
                  >
                    Add Channel
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Overlay to prevent content shifting */}
      <div className="w-18 flex-shrink-0" />
    </div>
  );
}