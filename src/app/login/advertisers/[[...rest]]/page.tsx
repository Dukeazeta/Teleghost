"use client";

import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function AdvertiserLoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    // This will be handled by the SignedIn component, but we can add additional logic here if needed
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
        <motion.div 
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={mounted ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm sm:max-w-md"
        >
          <SignedOut>
            {/* Brand Header */}
            <motion.div 
              initial={mounted ? { opacity: 0, y: 10 } : false}
              animate={mounted ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-6 sm:mb-8"
            >
              <Link href="/" className="inline-block mb-4 sm:mb-6">
                <Image 
                  src="/TeleGhost.svg" 
                  alt="TeleGhost" 
                  width={200} 
                  height={40} 
                  className="h-8 sm:h-10 w-auto mx-auto mix-blend-multiply dark:mix-blend-screen"
                  priority 
                />
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Welcome Back
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                Sign in to your advertiser account
              </p>
            </motion.div>
            
            <motion.div 
              initial={mounted ? { opacity: 0, y: 20 } : false}
              animate={mounted ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6"
            >
              <SignIn 
                redirectUrl="/dashboard/advertisers"
                signUpUrl="/signup"
                appearance={{
                  elements: {
                    // Main container
                    rootBox: "w-full",
                    card: "bg-transparent border-0 shadow-none p-0 w-full",
                    
                    // Header
                    headerTitle: "text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2",
                    headerSubtitle: "text-sm text-neutral-600 dark:text-neutral-400 mb-4",
                    
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
              initial={mounted ? { opacity: 0, y: 10 } : false}
              animate={mounted ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 sm:mt-8 text-center"
            >
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 font-medium transition-colors duration-200"
                >
                  Sign up here
                </Link>
              </p>
            </motion.div>
          </SignedOut>

          <SignedIn>
            <motion.div 
              initial={mounted ? { opacity: 0, scale: 0.95 } : false}
              animate={mounted ? { opacity: 1, scale: 1 } : false}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6">
                <motion.div 
                  initial={mounted ? { scale: 0 } : false}
                  animate={mounted ? { scale: 1 } : false}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900/40 rounded-full"
                >
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-3">
                  Welcome Back!
                </h2>
                <p className="text-green-700 dark:text-green-300 mb-6 text-lg">
                  You&apos;re already signed in to your advertiser account.
                </p>
                <button 
                  onClick={() => router.push("/dashboard/advertisers")}
                  className="bg-black dark:bg-white dark:text-black text-white px-8 py-3 rounded-full font-medium transition-all duration-200 hover:bg-neutral-800 dark:hover:bg-neutral-200 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:outline-none"
                >
                  Go to Dashboard
                </button>
              </div>
            </motion.div>
          </SignedIn>
        </motion.div>
      </div>
    </div>
  );
}