"use client";

import React from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconChevronDown,
  IconUser,
  IconSettings,
  IconHelp,
  IconLogout,
  IconCreditCard,
} from "@tabler/icons-react";

interface DashboardHeaderProps {
  balance: number;
}

export function DashboardHeader({ balance }: DashboardHeaderProps) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();

  // Dynamic role detection based on current URL
  const currentUserType = pathname.includes('/dashboard/publishers') ? 'publisher' : 'advertiser';
  const displayRole = currentUserType === 'publisher' ? 'Publisher' : 'Advertiser';

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleSwitchToPublisher = () => {
    router.push("/dashboard/publishers");
  };

  const handleSwitchToAdvertiser = () => {
    router.push("/dashboard/advertisers");
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.emailAddresses?.[0]?.emailAddress) {
      return user.emailAddresses[0].emailAddress.slice(0, 2).toUpperCase();
    }
    return "AD";
  };

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/TeleGhost.svg"
            alt="TeleGhost"
            width={140}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Right side - Budget and Profile */}
        <div className="flex items-center space-x-4">
          {/* Budget Display */}
          <div className="hidden sm:flex items-center space-x-2 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-full px-4 py-2">
            <IconCreditCard className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              ${balance.toFixed(2)}
            </span>
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2 rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} alt={user?.firstName || "Profile"} />
                <AvatarFallback className="text-xs">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0]}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{displayRole}</p>
              </div>
              <IconChevronDown className="h-4 w-4 text-neutral-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {user?.firstName && user?.lastName 
                    ? `${user.firstName} ${user.lastName}`
                    : user?.emailAddresses?.[0]?.emailAddress}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {user?.emailAddresses?.[0]?.emailAddress}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <IconUser className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/dashboard/${currentUserType}s/settings`)}>
                <IconSettings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/help")}>
                <IconHelp className="mr-2 h-4 w-4" />
                Help & Support
              </DropdownMenuItem>
              {currentUserType === 'advertiser' ? (
                <DropdownMenuItem onClick={handleSwitchToPublisher}>
                  <IconUser className="mr-2 h-4 w-4" />
                  Switch to Publisher
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={handleSwitchToAdvertiser}>
                  <IconUser className="mr-2 h-4 w-4" />
                  Switch to Advertiser
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <IconLogout className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Budget Display - Hidden since we have bottom nav */}
      {/* <div className="sm:hidden px-6 pb-3">
        <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full px-4 py-2 w-fit">
          <IconCreditCard className="h-4 w-4 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-green-700 dark:text-green-300">
            Budget: ${balance.toFixed(2)}
          </span>
        </div>
      </div> */}
    </header>
  );
}