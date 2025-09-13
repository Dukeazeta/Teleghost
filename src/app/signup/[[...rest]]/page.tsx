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
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
        <motion.div 
          {...hydrationSafeVariants.slideUp(mounted)}
          className="w-full max-w-sm sm:max-w-md"
        >
          {/* Brand Header */}
          <motion.div 
            {...hydrationSafeVariants.staggeredFadeIn(mounted, 0.1)}
            className="text-center mb-6 sm:mb-8"
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
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Join TeleGhost
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
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
                className={`relative z-10 px-4 py-3 text-sm sm:text-base font-medium rounded-full transition-all duration-200 min-h-[44px] touch-manipulation ${
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
                className={`relative z-10 px-4 py-3 text-sm sm:text-base font-medium rounded-full transition-all duration-200 min-h-[44px] touch-manipulation ${
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
            className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6"
          >
            <SignUp
              redirectUrl={userType === "advertiser" ? "/dashboard/advertisers" : "/dashboard/publishers"}
              signInUrl={userType === "advertiser" ? "/login/advertisers" : "/login/publishers"}
              appearance={{
                elements: {
                  // Main container
                  rootBox: "w-full",
                  card: "bg-transparent border-0 shadow-none p-0 w-full",
                  
                  // Header
                  headerTitle: "text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2",
                  headerSubtitle: "text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-4",
                  
                  // Form elements
                  formButtonPrimary: 
                    "w-full bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-lg py-3 sm:py-3.5 px-4 font-medium transition-colors duration-200 text-base sm:text-base min-h-[48px] touch-manipulation",
                  
                  formFieldInput: 
                    "w-full px-3 sm:px-4 py-3 sm:py-3.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-transparent text-base sm:text-base min-h-[48px]",
                  
                  formFieldLabel: 
                    "text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300 mb-2 block",
                  
                  // Links and text
                  footerActionText: "text-sm sm:text-base text-neutral-600 dark:text-neutral-400",
                  footerActionLink: "text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 font-medium underline-offset-4 hover:underline",
                  
                  // Social buttons
                  socialButtonsBlockButton: 
                    "w-full border border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 rounded-lg py-3 sm:py-3.5 px-4 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200 text-base sm:text-base min-h-[48px] touch-manipulation",
                  
                  // Divider
                  dividerLine: "bg-neutral-300 dark:bg-neutral-600",
                  dividerText: "text-sm sm:text-base text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-900 px-4",
                  
                  // Error messages
                  formFieldErrorText: "text-red-600 dark:text-red-400 text-sm sm:text-base mt-2",
                  
                  // Loading state
                  formButtonPrimary__loading: "opacity-50 cursor-not-allowed",
                  
                  // Responsive adjustments
                  formFieldRow: "mb-4 sm:mb-5",
                  socialButtonsBlockButtonText: "text-base sm:text-base font-medium",
                  
                  // Additional mobile-friendly styles
                  formFieldInputShowPasswordButton: "min-h-[48px] px-3",
                  formFieldAction: "text-sm sm:text-base",
                  identityPreviewText: "text-sm sm:text-base",
                  identityPreviewEditButton: "text-sm sm:text-base min-h-[44px]",
                },
                layout: {
                  socialButtonsPlacement: "bottom",
                  showOptionalFields: false,
                },
                variables: {
                  fontSize: "16px",
                  borderRadius: "8px",
                  spacingUnit: "1rem",
                }
              }}
            />
          </motion.div>
          
          <motion.div 
            {...hydrationSafeVariants.staggeredFadeIn(mounted, 0.5)}
            className="mt-8 text-center"
          >
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
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