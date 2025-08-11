"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ProfileType = "advertiser" | "publisher";

export default function Signup({ initialProfile = "advertiser" as ProfileType }) {
  const [profile, setProfile] = useState<ProfileType>(initialProfile);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-16 bg-white dark:bg-black">
      <div className="w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
              {profile === "advertiser" ? "Sign up as Advertiser" : "Sign up as Publisher"}
            </h1>
            <Link href="/" className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200">Back to home</Link>
          </div>

          {/* Segmented control */}
          <div className="relative mb-6">
            <div className="grid grid-cols-2 p-1 rounded-full bg-neutral-100 dark:bg-neutral-800">
              <button
                type="button"
                aria-pressed={profile === "advertiser"}
                onClick={() => setProfile("advertiser")}
                className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  profile === "advertiser"
                    ? "text-black dark:text-white"
                    : "text-neutral-600 dark:text-neutral-300"
                }`}
              >
                Advertiser
              </button>
              <button
                type="button"
                aria-pressed={profile === "publisher"}
                onClick={() => setProfile("publisher")}
                className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  profile === "publisher"
                    ? "text-black dark:text-white"
                    : "text-neutral-600 dark:text-neutral-300"
                }`}
              >
                Publisher
              </button>
            </div>
            <motion.span
              layout
              className="pointer-events-none absolute top-1 bottom-1 w-1/2 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700"
              animate={{ left: profile === "advertiser" ? 4 : "50%" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>

          {/* Google button */}
          <Button type="button" variant="outline" className="w-full justify-center" onClick={() => {}}>
            <IconBrandGoogle size={18} />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4 text-xs text-neutral-500">
            <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
            or
            <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
          </div>

          {/* Simple email form mock to match current design */}
          <form className="space-y-4">
            <div>
              <label className="block text-xs mb-1 text-neutral-600 dark:text-neutral-300">Email</label>
              <Input type="email" required placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-xs mb-1 text-neutral-600 dark:text-neutral-300">Password</label>
              <Input type="password" required placeholder="••••••••" />
            </div>
            <Button type="submit" size="md" className="w-full">
              {profile === "advertiser" ? "Create advertiser account" : "Create publisher account"}
            </Button>
          </form>

          {/* Context note */}
          <p className="mt-4 text-[11px] text-neutral-500">
            By continuing you agree to our Terms and acknowledge our Privacy Policy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}


