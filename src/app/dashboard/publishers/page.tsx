"use client";

import { useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUnifiedWallet } from "@/lib/walletService";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PublisherDashboard } from "@/components/dashboard/PublisherDashboard";
import { MobileEarningsView } from "@/components/dashboard/MobileEarningsView";
import { MobileCategoriesView } from "@/components/dashboard/MobileCategoriesView";
import { MobileSettingsView } from "@/components/dashboard/MobileSettingsView";

// Define TypeScript interfaces for Publishers
interface UserData {
  id: string;
  clerk_user_id: string;
  email: string;
  user_type: string;
  created_at: string;
  updated_at: string;
}

interface Channel {
  id: string;
  publisher_id: string;
  name: string;
  niche: string;
  subscribers: number;
  engagement_rate: number;
  rating: number;
  price_per_post: number;
  status: "active" | "paused" | "pending_review" | "suspended";
  new_orders: number;
  total_orders: number;
  created_at: string;
  updated_at: string;
  telegram_link: string;
  description: string;
}

interface PublisherTransaction {
  id: string;
  type: "earning" | "withdrawal" | "bonus";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
  channel_id?: string;
}

export default function PublisherDashboardPage() {
  const { user } = useUser();
  const router = useRouter();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileActiveTab, setMobileActiveTab] = useState("overview");
  
  // Use unified wallet service
  const { 
    balance, 
    transactions: walletTransactions, 
    loading: walletLoading,
    requestWithdrawal,
    getTransactionsByRole 
  } = useUnifiedWallet();
  
  // Filter transactions for publisher role
  const transactions = getTransactionsByRole("publisher");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard/publishers');
        const data = await response.json();
        
        if (response.ok) {
          setChannels(data.channels || []);
          // Note: balance and transactions now come from unified wallet service
        } else {
          // API error - use demo channel data only
          // Balance comes from unified wallet service
          setChannels([
            {
              id: "1",
              publisher_id: "1",
              name: "Tech News Africa",
              niche: "Technology",
              subscribers: 15420,
              engagement_rate: 8.5,
              rating: 4.8,
              price_per_post: 25.00,
              status: "active",
              new_orders: 3,
              total_orders: 47,
              created_at: "2024-01-10",
              updated_at: "2024-01-22",
              telegram_link: "https://t.me/technewsafrica",
              description: "Latest technology news and updates in Africa"
            },
            {
              id: "2",
              publisher_id: "1",
              name: "Business Hub Nigeria",
              niche: "Business & Finance",
              subscribers: 8900,
              engagement_rate: 12.3,
              rating: 4.6,
              price_per_post: 18.00,
              status: "active",
              new_orders: 1,
              total_orders: 29,
              created_at: "2024-01-05",
              updated_at: "2024-01-20",
              telegram_link: "https://t.me/businesshubnigeria",
              description: "Business opportunities and financial insights"
            },
            {
              id: "3",
              publisher_id: "1",
              name: "Lifestyle Kenya",
              niche: "Lifestyle & Entertainment",
              subscribers: 12800,
              engagement_rate: 7.2,
              rating: 4.4,
              price_per_post: 22.00,
              status: "paused",
              new_orders: 0,
              total_orders: 33,
              created_at: "2023-12-28",
              updated_at: "2024-01-18",
              telegram_link: "https://t.me/lifestylekenya",
              description: "Lifestyle trends and entertainment news in Kenya"
            }
          ]);
          // Transactions managed by unified wallet service
        }
      } catch {
        // Network error - use demo channel data
        // Balance comes from unified wallet service
        setChannels([
          {
            id: "1",
            publisher_id: "1",
            name: "Tech News Africa",
            niche: "Technology",
            subscribers: 15420,
            engagement_rate: 8.5,
            rating: 4.8,
            price_per_post: 25.00,
            status: "active",
            new_orders: 3,
            total_orders: 47,
            created_at: "2024-01-10",
            updated_at: "2024-01-22",
            telegram_link: "https://t.me/technewsafrica",
            description: "Latest technology news and updates in Africa"
          }
        ]);
        // Transactions managed by unified wallet service
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleAddChannel = () => {
    router.push("/dashboard/publishers/channels/add");
  };

  const handleWithdraw = async () => {
    // Navigate to withdrawal page with current balance info
    router.push(`/dashboard/publishers/withdraw?balance=${balance}`);
  };

  const handleViewChannel = (id: string) => {
    router.push(`/dashboard/publishers/channels/${id}`);
  };

  const handleEditChannel = (id: string) => {
    router.push(`/dashboard/publishers/channels/${id}/edit`);
  };

  const handleToggleChannel = (id: string, action: "pause" | "resume") => {
    setChannels(prev => prev.map(c => 
      c.id === id 
        ? { ...c, status: action === "pause" ? "paused" : "active" }
        : c
    ));
  };

  if (loading || walletLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-black dark:border-white"></div>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <SignedOut>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Access Denied
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Please sign in to access the publisher dashboard.
            </p>
            <button
              onClick={() => router.push("/login/publishers")}
              className="bg-black dark:bg-white dark:text-black text-white px-6 py-2 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <DashboardLayout
          userType="publisher"
          balance={balance}
          mobileActiveTab={mobileActiveTab}
          onMobileTabChange={setMobileActiveTab}
          onCreateCampaign={handleAddChannel}
        >
          {/* Desktop Content */}
          <div className="hidden sm:block">
            <PublisherDashboard
              channels={channels}
              transactions={transactions}
              balance={balance}
              onAddChannel={handleAddChannel}
              onWithdraw={handleWithdraw}
              onViewChannel={handleViewChannel}
              onEditChannel={handleEditChannel}
              onToggleChannel={handleToggleChannel}
            />
          </div>

          {/* Mobile Content */}
          <div className="sm:hidden">
            {mobileActiveTab === "overview" && (
              <PublisherDashboard
                channels={channels}
                transactions={transactions}
                balance={balance}
                onAddChannel={handleAddChannel}
                onWithdraw={handleWithdraw}
                onViewChannel={handleViewChannel}
                onEditChannel={handleEditChannel}
                onToggleChannel={handleToggleChannel}
              />
            )}
            
            {mobileActiveTab === "budget" && (
              <MobileEarningsView
                balance={balance}
                transactions={transactions}
                onWithdraw={handleWithdraw}
              />
            )}
            
            {mobileActiveTab === "settings" && <MobileSettingsView />}
            
            {mobileActiveTab === "categories" && <MobileCategoriesView />}
          </div>
        </DashboardLayout>
      </SignedIn>
    </div>
  );
}