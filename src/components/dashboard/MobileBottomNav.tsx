"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IconHome,
  IconCreditCard,
  IconCategory,
  IconSettings,
  IconPlus,
} from "@tabler/icons-react";

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCreateCampaign: () => void;
}

export function MobileBottomNav({ 
  activeTab, 
  onTabChange, 
  onCreateCampaign 
}: MobileBottomNavProps) {
  const navItems = [
    { id: "overview", icon: IconHome, label: "Home" },
    { id: "budget", icon: IconCreditCard, label: "Budget" },
    { id: "settings", icon: IconSettings, label: "Settings" },
    { id: "categories", icon: IconCategory, label: "Browse" },
  ];

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Glassmorphism Background */}
      <div className="relative">
        {/* Background with blur */}
        <div className="absolute inset-0 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-lg border-t border-neutral-200/50 dark:border-neutral-800/50" />
        
        {/* Content */}
        <div className="relative px-4 py-2">
          <div className="flex items-center justify-center">
            {/* Left Navigation Items */}
            <div className="flex items-center justify-center flex-1">
              {navItems.slice(0, 2).map((item, index) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={() => onTabChange(item.id)}
                    className={`relative flex flex-col items-center justify-center w-16 py-2 transition-all duration-200 ${
                      isActive 
                        ? "text-blue-600 dark:text-blue-400" 
                        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
                    }`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    <Icon 
                      className={`h-5 w-5 mb-1 transition-all duration-200 ${
                        isActive ? "scale-110" : "scale-100"
                      }`} 
                    />
                    <span className={`text-[10px] font-medium leading-tight transition-all duration-200 ${
                      isActive ? "opacity-100" : "opacity-70"
                    }`}>
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Floating Action Button - Centered */}
            <div className="flex items-center justify-center px-2">
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                onClick={onCreateCampaign}
                className="relative flex items-center justify-center w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-md transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-600/30"
              >
                <IconPlus className="h-5 w-5 text-white" />
              </motion.button>
            </div>
            
            {/* Right Navigation Items */}
            <div className="flex items-center justify-center flex-1">
              {navItems.slice(2).map((item, index) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index + 2) * 0.1, duration: 0.3 }}
                    onClick={() => onTabChange(item.id)}
                    className={`relative flex flex-col items-center justify-center w-16 py-2 transition-all duration-200 ${
                      isActive 
                        ? "text-blue-600 dark:text-blue-400" 
                        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
                    }`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    <Icon 
                      className={`h-5 w-5 mb-1 transition-all duration-200 ${
                        isActive ? "scale-110" : "scale-100"
                      }`} 
                    />
                    <span className={`text-[10px] font-medium leading-tight transition-all duration-200 ${
                      isActive ? "opacity-100" : "opacity-70"
                    }`}>
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Bottom safe area for devices with home indicator */}
        <div className="h-2 sm:h-0" />
      </div>
    </div>
  );
}