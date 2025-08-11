"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TabsValue = string;

export function Tabs({ value, onValueChange: _onValueChange, children }: {
  value: TabsValue;
  onValueChange: (v: TabsValue) => void;
  children: React.ReactNode;
}) {
  return <div data-value={value}>{children}</div>;
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("inline-flex rounded-full bg-neutral-100 dark:bg-neutral-800 p-1", className)}>{children}</div>;
}

export function TabsTrigger({ value, currentValue, onClick, children }: {
  value: TabsValue;
  currentValue: TabsValue;
  onClick: (v: TabsValue) => void;
  children: React.ReactNode;
}) {
  const isActive = value === currentValue;
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={() => onClick(value)}
      className={cn(
        "relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors",
        isActive ? "text-black dark:text-white" : "text-neutral-600 dark:text-neutral-300"
      )}
    >
      {children}
    </button>
  );
}

export function TabsIndicator({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative h-0">
      <span
        className="pointer-events-none absolute -top-10 left-1 w-1/2 h-10 rounded-full bg-white dark:bg-neutral-900 shadow/10 shadow-black/5 border border-neutral-200 dark:border-neutral-700 transition-transform"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
    </div>
  );
}


