"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import {
  IconUser,
  IconBell,
  IconShield,
  IconHelp,
  IconLogout,
  IconArrowRight,
  IconSettings,
} from "@tabler/icons-react";

export function MobileSettingsView() {
  const router = useRouter();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const settingsItems = [
    {
      id: "profile",
      icon: IconUser,
      title: "Profile Settings",
      description: "Manage your account information",
      action: () => router.push("/profile"),
    },
    {
      id: "notifications",
      icon: IconBell,
      title: "Notifications",
      description: "Configure your notification preferences",
      action: () => router.push("/settings/notifications"),
    },
    {
      id: "security",
      icon: IconShield,
      title: "Security & Privacy",
      description: "Password, 2FA, and privacy settings",
      action: () => router.push("/settings/security"),
    },
    {
      id: "help",
      icon: IconHelp,
      title: "Help & Support",
      description: "Get help and contact support",
      action: () => router.push("/help"),
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-6"
      >
        <IconSettings className="h-12 w-12 text-neutral-600 dark:text-neutral-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Settings
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Manage your account and preferences
        </p>
      </motion.div>

      {/* Settings Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-3"
      >
        {settingsItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              onClick={item.action}
              className="group cursor-pointer p-4 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 rounded-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 active:scale-95"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <Icon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {item.description}
                    </p>
                  </div>
                </div>
                <IconArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Logout Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="pt-6 border-t border-neutral-200 dark:border-neutral-800"
      >
        <motion.div
          onClick={handleSignOut}
          className="group cursor-pointer p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-xl hover:border-red-300 dark:hover:border-red-700 transition-all duration-200 active:scale-95"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-lg">
                <IconLogout className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-medium text-red-800 dark:text-red-200">
                  Sign Out
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Sign out of your account
                </p>
              </div>
            </div>
            <IconArrowRight className="h-4 w-4 text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}