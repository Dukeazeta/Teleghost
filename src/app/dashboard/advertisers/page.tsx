"use client";

import { UserButton, useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AdvertiserDashboard() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <SignedOut>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Access Denied
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Please sign in to access the advertiser dashboard.
            </p>
            <button
              onClick={() => router.push("/login/advertisers")}
              className="bg-black dark:bg-white dark:text-black text-white px-6 py-2 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="p-6">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                Advertiser Dashboard
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Campaign Stats */}
            <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Active Campaigns
              </h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">0</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                No active campaigns
              </p>
            </div>

            {/* Budget Overview */}
            <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Available Balance
              </h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">$0.00</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Add funds to start advertising
              </p>
            </div>

            {/* Total Reach */}
            <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Total Reach
              </h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">0</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                People reached
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bg-black dark:bg-white dark:text-black text-white p-4 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors text-left">
                <div className="font-semibold mb-1">Create Campaign</div>
                <div className="text-sm opacity-80">Start your first ad campaign</div>
              </button>
              
              <button className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-left">
                <div className="font-semibold mb-1 text-neutral-900 dark:text-neutral-100">Browse Channels</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">Find telegram channels</div>
              </button>
              
              <button className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-left">
                <div className="font-semibold mb-1 text-neutral-900 dark:text-neutral-100">Add Funds</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">Top up your balance</div>
              </button>
              
              <button className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-left">
                <div className="font-semibold mb-1 text-neutral-900 dark:text-neutral-100">View Analytics</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">Campaign performance</div>
              </button>
            </div>
          </div>

          {/* Getting Started */}
          <div className="mt-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Getting Started
              </h3>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                Welcome to TeleGhost! Here&apos;s how to launch your first campaign:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-blue-700 dark:text-blue-300">
                <li>Browse and select Telegram channels that match your target audience</li>
                <li>Add funds to your account using USDT cryptocurrency</li>
                <li>Create your first ad campaign with compelling content</li>
                <li>Monitor performance and optimize your campaigns</li>
              </ol>
            </div>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
