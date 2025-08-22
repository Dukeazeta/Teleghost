"use client";

import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdvertiserLoginPage() {
  const router = useRouter();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    // This will be handled by the SignedIn component, but we can add additional logic here if needed
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <SignedOut>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Advertiser Login
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Sign in to your TeleGhost advertiser account
            </p>
          </div>
          
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 p-6">
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 
                    "bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black",
                  card: "shadow-none border-0",
                  headerTitle: "text-neutral-900 dark:text-neutral-100",
                  headerSubtitle: "text-neutral-600 dark:text-neutral-400",
                  socialButtonsBlockButton: 
                    "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800",
                  formFieldInput: 
                    "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100",
                  formFieldLabel: "text-neutral-700 dark:text-neutral-300",
                  dividerLine: "bg-neutral-300 dark:bg-neutral-700",
                  dividerText: "text-neutral-500 dark:text-neutral-400",
                  footerActionLink: "text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300"
                }
              }}
              redirectUrl="/dashboard/advertisers"
              signUpUrl="/signup/advertisers"
            />
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Don&apos;t have an account?{" "}
              <a 
                href="/signup/advertisers" 
                className="text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 font-medium"
              >
                Sign up here
              </a>
            </p>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="text-center">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 dark:bg-green-900/40 rounded-full">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
                Successfully Logged In!
              </h2>
              <p className="text-green-700 dark:text-green-300 mb-4">
                You&apos;re already signed in to your advertiser account.
              </p>
              <button 
                onClick={() => router.push("/dashboard/advertisers")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
