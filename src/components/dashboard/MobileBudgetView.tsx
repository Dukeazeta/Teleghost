"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  IconPlus,
  IconCreditCard,
  IconTrendingUp,
  IconArrowUpRight,
  IconArrowDownLeft,
} from "@tabler/icons-react";
import { UnifiedTransaction } from "@/lib/walletService";

interface MobileBudgetViewProps {
  balance: number;
  transactions: UnifiedTransaction[];
  onAddFunds: (amount: number) => void;
}

export function MobileBudgetView({ 
  balance, 
  transactions, 
  onAddFunds 
}: MobileBudgetViewProps) {
  const [addFundsAmount, setAddFundsAmount] = useState("");
  const [isAddingFunds, setIsAddingFunds] = useState(false);

  const handleAddFunds = async () => {
    const amount = parseFloat(addFundsAmount);
    if (amount > 0) {
      setIsAddingFunds(true);
      try {
        await onAddFunds(amount);
        setAddFundsAmount("");
      } catch (error) {
        console.error("Error adding funds:", error);
      } finally {
        setIsAddingFunds(false);
      }
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <IconArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case "withdrawal":
        return <IconArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />;
      case "ad_spend":
        return <IconCreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case "earning":
        return <IconArrowDownLeft className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      case "bonus":
        return <IconArrowDownLeft className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
      default:
        return <IconCreditCard className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />;
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
        <IconCreditCard className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
        <h2 className="text-sm text-green-700 dark:text-green-300 mb-2">Available Balance</h2>
        <div className="text-4xl font-bold text-green-800 dark:text-green-200 mb-4">
          ${balance.toFixed(2)}
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">
              <IconPlus className="mr-2 h-4 w-4" />
              Add Funds
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Funds</DialogTitle>
              <DialogDescription>
                Add USDT to your advertising account. Minimum deposit is $10.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount (USD)
                </label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={addFundsAmount}
                  onChange={(e) => setAddFundsAmount(e.target.value)}
                  min="10"
                  step="0.01"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                </DialogTrigger>
                <Button
                  onClick={handleAddFunds}
                  disabled={!addFundsAmount || parseFloat(addFundsAmount) < 10 || isAddingFunds}
                  size="sm"
                >
                  {isAddingFunds ? "Processing..." : "Add Funds"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Recent Transactions
        </h3>
        
        {transactions.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl">
            <IconTrendingUp className="mx-auto h-12 w-12 text-neutral-300 dark:text-neutral-700 mb-4" />
            <h4 className="text-base font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              No transactions yet
            </h4>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4">
              Add funds to start advertising
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800"
              >
                <div className="flex items-center space-x-3">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-sm font-medium ${
                      transaction.type === "deposit"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
                    {transaction.status}
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