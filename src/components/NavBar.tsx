"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Close on Escape and set initial focus
  useEffect(() => {
    if (open) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", onKey);
      firstLinkRef.current?.focus();
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [open]);

  // Lock body scroll when menu is open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original;
    }
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-auto">
      <nav className="flex items-center justify-between sm:justify-start gap-2 sm:gap-6 rounded-full border border-white/10 bg-white/60 text-neutral-800 backdrop-blur-md px-3 sm:px-4 py-2 shadow/10 shadow-black/5 dark:bg-neutral-900/60 dark:text-neutral-100 dark:border-white/10">
        {/* Brand */}
        <Link href="#hero" className="inline-flex items-center gap-2">
          <Image src="/TeleGhost.svg" alt="TeleGhost" width={160} height={32} priority className="h-8 sm:h-9 w-auto mix-blend-multiply dark:mix-blend-screen" />
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6">
          <Link href="#features" className="text-sm hover:opacity-80 transition">Features</Link>
          <Link href="#advertisers" className="text-sm hover:opacity-80 transition">For Advertisers</Link>
          <Link href="#publishers" className="text-sm hover:opacity-80 transition">For Publishers</Link>
          <Link href="#faq" className="text-sm hover:opacity-80 transition">FAQ</Link>
          <Link href="/login/advertisers" className="text-sm hover:opacity-80 transition">Login</Link>
          <Link
            href="#cta"
            className="ml-2 rounded-full bg-black text-white px-4 py-2 text-sm font-medium hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition"
          >
            Join
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-menu"
          ref={buttonRef}
          className="sm:hidden inline-flex items-center justify-center rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block w-6 h-6">
            <span
              className={`absolute left-0 right-0 top-1 block h-0.5 rounded bg-current transition-transform duration-200 ${
                open ? "translate-y-2.5 rotate-45" : "translate-y-0 rotate-0"
              }`}
            />
            <span
              className={`absolute left-0 right-0 top-1/2 block h-0.5 -translate-y-1/2 rounded bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 right-0 bottom-1 block h-0.5 rounded bg-current transition-transform duration-200 ${
                open ? "-translate-y-2.5 -rotate-45" : "translate-y-0 rotate-0"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile overlay + menu */}
      <div
        className={`sm:hidden fixed inset-0 z-40 transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      </div>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal={open}
        ref={menuRef}
        className={`sm:hidden fixed z-50 left-1/2 -translate-x-1/2 top-16 w-[calc(100%-1.5rem)] max-w-md transition-all duration-200 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl border border-white/10 bg-white/95 text-neutral-800 backdrop-blur-md p-3 shadow/10 shadow-black/10 dark:bg-neutral-900/95 dark:text-neutral-100 dark:border-white/10">
          <div className="flex flex-col">
            <Link
              ref={firstLinkRef}
              href="#features"
              onClick={() => setOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            >
              Features
            </Link>
            <Link
              href="#advertisers"
              onClick={() => setOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            >
              For Advertisers
            </Link>
            <Link
              href="#publishers"
              onClick={() => setOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            >
              For Publishers
            </Link>
            <Link
              href="#faq"
              onClick={() => setOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            >
              FAQ
            </Link>
            <Link
              href="/login/advertisers"
              onClick={() => setOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            >
              Login
            </Link>
            <Link
              href="#cta"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-black text-white px-4 py-3 text-sm font-medium text-center hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition"
            >
              Join TeleGhost
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

