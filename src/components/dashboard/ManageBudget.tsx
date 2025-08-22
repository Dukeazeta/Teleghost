"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  IconArrowUpRight,
  IconArrowDownLeft,
  IconWallet,
  IconCreditCard,
  IconHistory,
} from "@tabler/icons-react";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "ad_spend";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface ManageBudgetProps {
  balance: number;
  transactions: Transaction[];
  onAddFunds: (amount: number) => void;
}

export function ManageBudget({ balance, transactions, onAddFunds }: ManageBudgetProps) {
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
      default:
        return <IconWallet className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
              <IconWallet className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${balance.toFixed(2)}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Available for advertising
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              <IconPlus className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" size="sm">
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
              <Button variant="outline" size="sm" className="w-full">
                <IconHistory className="mr-2 h-4 w-4" />
                View Full History
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your latest account activity and spending history
            </CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <IconHistory className="mx-auto h-12 w-12 text-neutral-300 dark:text-neutral-700 mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                  No transactions yet
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-4">
                  Start by adding funds to your account to begin advertising.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <IconPlus className="mr-2 h-4 w-4" />
                      Add Your First Funds
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
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg"
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
                    <div className="flex items-center space-x-3">
                      <span
                        className={`text-sm font-medium ${
                          transaction.type === "deposit"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                      </span>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </motion.div>
                ))}
                {transactions.length > 5 && (
                  <div className="text-center pt-4">
                    <Button variant="outline" size="sm">
                      View All Transactions
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}