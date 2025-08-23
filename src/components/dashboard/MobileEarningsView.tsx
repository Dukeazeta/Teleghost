"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  IconWallet,
  IconTrendingUp,
  IconArrowUpRight,
  IconArrowDownLeft,
  IconCash,
  IconGift,
} from "@tabler/icons-react";
import { UnifiedTransaction } from "@/lib/walletService";

interface MobileEarningsViewProps {
  balance: number;
  transactions: UnifiedTransaction[];
  onWithdraw: () => void;
}

export function MobileEarningsView({ 
  balance, 
  transactions, 
  onWithdraw 
}: MobileEarningsViewProps) {

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "earning":
      case "bonus":
        return <IconArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case "withdrawal":
        return <IconArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />;
      case "deposit":
        return <IconArrowDownLeft className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case "ad_spend":
        return <IconArrowUpRight className="h-4 w-4 text-orange-600 dark:text-orange-400" />;
      default:
        return <IconWallet className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "earning":
      case "bonus":
        return "text-green-600 dark:text-green-400";
      case "withdrawal":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-neutral-600 dark:text-neutral-400";
    }
  };

  const getTransactionSign = (type: string) => {
    switch (type) {
      case "earning":
      case "bonus":
        return "+";
      case "withdrawal":
        return "-";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24">
      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8 px-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800"
      >
        <IconWallet className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
        <h2 className="text-sm text-green-700 dark:text-green-300 mb-2">Available Balance</h2>
        <div className="text-4xl font-bold text-green-800 dark:text-green-200 mb-4">
          ${balance.toFixed(2)}
        </div>
        
        <Button onClick={onWithdraw} className="w-full gap-2">
          <IconCash className="h-4 w-4" />
          Withdraw Funds
        </Button>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Recent Earnings & Withdrawals
        </h3>
        
        {transactions.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl">
            <IconTrendingUp className="mx-auto h-12 w-12 text-neutral-300 dark:text-neutral-700 mb-4" />
            <h4 className="text-base font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              No earnings yet
            </h4>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4">
              Start accepting ad campaigns to earn money
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 8).map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800"
              >
                <div className="flex items-center space-x-3">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {transaction.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${getTransactionColor(transaction.type)}`}>
                    {getTransactionSign(transaction.type)}${transaction.amount.toFixed(2)}
                  </span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
                    {transaction.type}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}