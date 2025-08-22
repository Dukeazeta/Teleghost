"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useIsHydrated, hydrationSafeVariants } from "@/lib/useHydrationSafe";

export default function UnifiedSignupPage() {
  const [userType, setUserType] = useState<"advertiser" | "publisher">("advertiser");
  const mounted = useIsHydrated();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="flex items-center justify-center min-h-screen p-6">
        <motion.div 
          {...hydrationSafeVariants.slideUp(mounted)}
          className="w-full max-w-md"
        >
          {/* Brand Header */}
          <motion.div 
            {...hydrationSafeVariants.staggeredFadeIn(mounted, 0.1)}
            className="text-center mb-8"
          >
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/TeleGhost.svg" 
                alt="TeleGhost" 
                width={200} 
                height={40} 
                className="h-10 w-auto mx-auto mix-blend-multiply dark:mix-blend-screen"
                priority 
              />
            </Link>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Join TeleGhost
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Create your account as an advertiser or publisher
            </p>
          </motion.div>
          
          {/* Segmented control for user type */}
          <motion.div 
            {...hydrationSafeVariants.staggeredFadeIn(mounted, 0.2)}
            className="relative mb-6"
          >
            <div className="grid grid-cols-2 p-1 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <button
                type="button"
                aria-pressed={userType === "advertiser"}
                onClick={() => setUserType("advertiser")}
                className={`relative z-10 px-4 py-3 text-sm font-medium rounded-full transition-all duration-200 ${
                  userType === "advertiser"
                    ? "text-black dark:text-white"
                    : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-200"
                }`}
              >
                Advertiser
              </button>
              <button
                type="button"
                aria-pressed={userType === "publisher"}
                onClick={() => setUserType("publisher")}
                className={`relative z-10 px-4 py-3 text-sm font-medium rounded-full transition-all duration-200 ${
                  userType === "publisher"
                    ? "text-black dark:text-white"
                    : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-200"
                }`}
              >
                Publisher
              </button>
            </div>
            <motion.span
              layout
              className="pointer-events-none absolute top-1 bottom-1 w-1/2 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm"
              animate={mounted ? { left: userType === "advertiser" ? 4 : "50%" } : { left: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </motion.div>
          
          <motion.div 
            {...hydrationSafeVariants.staggeredFadeIn(mounted, 0.3)}
            className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 p-6"
          >
            <SignUp
              redirectUrl={userType === "advertiser" ? "/dashboard/advertisers" : "/dashboard/publishers"}
              signInUrl={userType === "advertiser" ? "/login/advertisers" : "/login/publishers"}
            />
          </motion.div>
          
          <motion.div 
            {...hydrationSafeVariants.staggeredFadeIn(mounted, 0.5)}
            className="mt-8 text-center"
          >
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Already have an account?{" "}
              <Link
                href={userType === "advertiser" ? "/login/advertisers" : "/login/publishers"}
                className="text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 font-medium transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}