"use client";

import { useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUnifiedWallet } from "@/lib/walletService";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MinimalistDashboard } from "@/components/dashboard/MinimalistDashboard";
import { MobileBudgetView } from "@/components/dashboard/MobileBudgetView";
import { MobileCategoriesView } from "@/components/dashboard/MobileCategoriesView";
import { MobileSettingsView } from "@/components/dashboard/MobileSettingsView";

// Define TypeScript interfaces
interface UserData {
  id: string;
  clerk_user_id: string;
  email: string;
  user_type: string;
  created_at: string;
  updated_at: string;
}

interface Campaign {
  id: string;
  advertiser_id: string;
  name: string;
  budget: number;
  status: "active" | "paused" | "completed" | "draft" | "pending";
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
  reach: number;
  clicks: number;
  category: string;
  channelCount: number;
  spent: number;
}

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "ad_spend";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

export default function AdvertiserDashboard() {
  const { user } = useUser();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileActiveTab, setMobileActiveTab] = useState("overview");
  
  // Use unified wallet service
  const { 
    balance, 
    transactions: walletTransactions, 
    loading: walletLoading,
    addFunds,
    getTransactionsByRole 
  } = useUnifiedWallet();
  
  // Filter transactions for advertiser role
  const transactions = getTransactionsByRole("advertiser");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard/advertisers');
        const data = await response.json();
        
        if (response.ok) {
          setCampaigns(data.campaigns || []);
          // Note: balance and transactions now come from unified wallet service
        } else {
          // API error - use demo campaign data only
          // Balance comes from unified wallet service
          setCampaigns([
            {
              id: "1",
              advertiser_id: "1",
              name: "Tech Product Launch",
              budget: 500,
              status: "active",
              start_date: "2024-01-15",
              end_date: "2024-02-15",
              created_at: "2024-01-15",
              updated_at: "2024-01-20",
              reach: 25000,
              clicks: 1250,
              category: "Technology",
              channelCount: 5,
              spent: 127.50
            },
            {
              id: "2",
              advertiser_id: "1",
              name: "Business Consulting",
              budget: 300,
              status: "paused",
              start_date: "2024-01-10",
              created_at: "2024-01-10",
              updated_at: "2024-01-18",
              reach: 15000,
              clicks: 780,
              category: "Business",
              channelCount: 3,
              spent: 85.00
            }
          ]);
          // Transactions managed by unified wallet service
        }
      } catch {
        // Network error - use demo campaign data
        // Balance comes from unified wallet service
        setCampaigns([
          {
            id: "1",
            advertiser_id: "1",
            name: "Tech Product Launch",
            budget: 500,
            status: "active",
            start_date: "2024-01-15",
            end_date: "2024-02-15",
            created_at: "2024-01-15",
            updated_at: "2024-01-20",
            reach: 25000,
            clicks: 1250,
            category: "Technology",
            channelCount: 5,
            spent: 127.50
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

  const handleAddFunds = async (amount: number) => {
    await addFunds(amount);
  };

  const handleCreateCampaign = () => {
    router.push("/dashboard/advertisers/campaigns/create");
  };

  const handleViewCampaign = (id: string) => {
    router.push(`/dashboard/advertisers/campaigns/${id}`);
  };

  const handleEditCampaign = (id: string) => {
    router.push(`/dashboard/advertisers/campaigns/${id}/edit`);
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const handleToggleCampaign = (id: string, action: "pause" | "resume") => {
    setCampaigns(prev => prev.map(c => 
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
        <DashboardLayout
          userType="advertiser"
          balance={balance}
          mobileActiveTab={mobileActiveTab}
          onMobileTabChange={setMobileActiveTab}
          onCreateCampaign={handleCreateCampaign}
        >
          {/* Desktop Content */}
          <div className="hidden sm:block">
            <MinimalistDashboard
              campaigns={campaigns}
              transactions={transactions}
              balance={balance}
              onAddFunds={handleAddFunds}
              onCreateCampaign={handleCreateCampaign}
              onViewCampaign={handleViewCampaign}
              onEditCampaign={handleEditCampaign}
              onToggleCampaign={handleToggleCampaign}
            />
          </div>

          {/* Mobile Content */}
          <div className="sm:hidden">
            {mobileActiveTab === "overview" && (
              <MinimalistDashboard
                campaigns={campaigns}
                transactions={transactions}
                balance={balance}
                onAddFunds={handleAddFunds}
                onCreateCampaign={handleCreateCampaign}
                onViewCampaign={handleViewCampaign}
                onEditCampaign={handleEditCampaign}
                onToggleCampaign={handleToggleCampaign}
              />
            )}
            
            {mobileActiveTab === "budget" && (
              <MobileBudgetView
                balance={balance}
                transactions={transactions}
                onAddFunds={handleAddFunds}
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
