"use client";

import { useState, useEffect, useCallback } from 'react';

// Unified transaction types that work across both roles
export type UnifiedTransactionType = 
  | "deposit"      // Adding funds to wallet
  | "withdrawal"   // Withdrawing funds from wallet  
  | "ad_spend"     // Advertiser spending on campaigns
  | "earning"      // Publisher earning from ads
  | "bonus"        // Bonus payments
  | "refund";      // Refunds

export interface UnifiedTransaction {
  id: string;
  type: UnifiedTransactionType;
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
  metadata?: {
    campaign_id?: string;
    channel_id?: string;
    role?: "advertiser" | "publisher";
  };
}

// Unified wallet state
interface WalletState {
  balance: number;
  transactions: UnifiedTransaction[];
  loading: boolean;
}

// Demo data with unified transaction history
const DEMO_TRANSACTIONS: UnifiedTransaction[] = [
  // Recent publisher earnings
  {
    id: "1",
    type: "earning",
    amount: 125.00,
    description: "Payment from Tech Product Launch campaign",
    date: "2024-01-22T10:30:00Z",
    status: "completed",
    metadata: { channel_id: "1", role: "publisher" }
  },
  {
    id: "2", 
    type: "earning",
    amount: 72.00,
    description: "Payment from Business Consulting campaign",
    date: "2024-01-20T14:15:00Z",
    status: "completed",
    metadata: { channel_id: "2", role: "publisher" }
  },
  // Advertiser spending
  {
    id: "3",
    type: "ad_spend",
    amount: 127.50,
    description: "Tech Product Launch campaign spend",
    date: "2024-01-20T09:45:00Z",
    status: "completed",
    metadata: { campaign_id: "1", role: "advertiser" }
  },
  {
    id: "4",
    type: "ad_spend", 
    amount: 85.00,
    description: "Business Consulting campaign spend",
    date: "2024-01-18T16:20:00Z",
    status: "completed",
    metadata: { campaign_id: "2", role: "advertiser" }
  },
  // Initial deposit
  {
    id: "5",
    type: "deposit",
    amount: 1000.00,
    description: "Initial wallet funding",
    date: "2024-01-15T08:00:00Z",
    status: "completed"
  },
  // Withdrawal
  {
    id: "6",
    type: "withdrawal",
    amount: 500.00,
    description: "Withdrawal to bank account",
    date: "2024-01-18T11:30:00Z", 
    status: "completed"
  }
];

// Calculate balance from transactions
const calculateBalance = (transactions: UnifiedTransaction[]): number => {
  return transactions
    .filter(tx => tx.status === "completed")
    .reduce((balance, tx) => {
      switch (tx.type) {
        case "deposit":
        case "earning":
        case "bonus":
        case "refund":
          return balance + tx.amount;
        case "withdrawal":
        case "ad_spend":
          return balance - tx.amount;
        default:
          return balance;
      }
    }, 0);
};

// Unified wallet hook
export const useUnifiedWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    balance: 0,
    transactions: [],
    loading: true
  });

  // Fetch wallet data (unified across roles)
  const fetchWalletData = useCallback(async () => {
    setWalletState(prev => ({ ...prev, loading: true }));
    
    try {
      // Try to fetch from API first
      const response = await fetch('/api/wallet');
      
      if (response.ok) {
        const data = await response.json();
        setWalletState({
          balance: data.balance || 0,
          transactions: data.transactions || [],
          loading: false
        });
      } else {
        // Fallback to demo data
        const balance = calculateBalance(DEMO_TRANSACTIONS);
        setWalletState({
          balance,
          transactions: DEMO_TRANSACTIONS,
          loading: false
        });
      }
    } catch (error) {
      console.log('Using demo wallet data');
      // Network error - use demo data
      const balance = calculateBalance(DEMO_TRANSACTIONS);
      setWalletState({
        balance,
        transactions: DEMO_TRANSACTIONS,
        loading: false
      });
    }
  }, []);

  // Add funds to wallet
  const addFunds = useCallback(async (amount: number): Promise<void> => {
    const newTransaction: UnifiedTransaction = {
      id: `tx_${Date.now()}`,
      type: "deposit",
      amount,
      description: "Funds added to wallet",
      date: new Date().toISOString(),
      status: "completed"
    };

    setWalletState(prev => {
      const updatedTransactions = [newTransaction, ...prev.transactions];
      return {
        ...prev,
        balance: prev.balance + amount,
        transactions: updatedTransactions
      };
    });

    // TODO: Sync with API
    try {
      await fetch('/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, description: newTransaction.description })
      });
    } catch (error) {
      console.log('Failed to sync deposit with server:', error);
    }
  }, []);

  // Spend funds (for advertisers)
  const spendFunds = useCallback(async (amount: number, description: string, campaignId?: string): Promise<boolean> => {
    if (walletState.balance < amount) {
      return false; // Insufficient funds
    }

    const newTransaction: UnifiedTransaction = {
      id: `tx_${Date.now()}`,
      type: "ad_spend",
      amount,
      description,
      date: new Date().toISOString(),
      status: "completed",
      metadata: { campaign_id: campaignId, role: "advertiser" }
    };

    setWalletState(prev => {
      const updatedTransactions = [newTransaction, ...prev.transactions];
      return {
        ...prev,
        balance: prev.balance - amount,
        transactions: updatedTransactions
      };
    });

    return true;
  }, [walletState.balance]);

  // Add earnings (for publishers)
  const addEarnings = useCallback(async (amount: number, description: string, channelId?: string): Promise<void> => {
    const newTransaction: UnifiedTransaction = {
      id: `tx_${Date.now()}`,
      type: "earning", 
      amount,
      description,
      date: new Date().toISOString(),
      status: "completed",
      metadata: { channel_id: channelId, role: "publisher" }
    };

    setWalletState(prev => {
      const updatedTransactions = [newTransaction, ...prev.transactions];
      return {
        ...prev,
        balance: prev.balance + amount,
        transactions: updatedTransactions
      };
    });
  }, []);

  // Request withdrawal
  const requestWithdrawal = useCallback(async (amount: number): Promise<boolean> => {
    if (walletState.balance < amount) {
      return false; // Insufficient funds
    }

    const newTransaction: UnifiedTransaction = {
      id: `tx_${Date.now()}`,
      type: "withdrawal",
      amount,
      description: "Withdrawal request",
      date: new Date().toISOString(),
      status: "pending" // Withdrawals start as pending
    };

    setWalletState(prev => {
      const updatedTransactions = [newTransaction, ...prev.transactions];
      return {
        ...prev,
        // Don't deduct from balance until withdrawal is completed
        transactions: updatedTransactions
      };
    });

    return true;
  }, [walletState.balance]);

  // Filter transactions by role
  const getTransactionsByRole = useCallback((role: "advertiser" | "publisher") => {
    return walletState.transactions.filter(tx => {
      // Show general transactions (deposits, withdrawals) to both roles
      if (!tx.metadata?.role) return true;
      // Show role-specific transactions
      return tx.metadata.role === role;
    });
  }, [walletState.transactions]);

  // Initialize wallet on mount
  useEffect(() => {
    fetchWalletData();
  }, [fetchWalletData]);

  return {
    ...walletState,
    addFunds,
    spendFunds,
    addEarnings,
    requestWithdrawal,
    getTransactionsByRole,
    refreshWallet: fetchWalletData
  };
};