import Image from "next/image";
import Link from "next/link";
import {
  IconBrandTelegram,
  IconBrandX,
  IconBrandInstagram,
  IconBrandYoutube,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-neutral-200/60 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="flex flex-col gap-5">
            <Link href="#hero" className="inline-flex items-center">
              <Image
                src="/TeleGhost.svg"
                alt="TeleGhost"
                width={220}
                height={44}
                className="h-10 w-auto mix-blend-multiply dark:mix-blend-screen"
                priority
              />
            </Link>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 max-w-xs">
              The Telegram ads marketplace for Africa. Launch secure, high-impact campaigns with real, targeted reach.
            </p>
            <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-300">
              <Link href="https://t.me/Tele_Ghost" aria-label="Telegram" className="hover:text-black dark:hover:text-white transition" target="_blank" rel="noopener noreferrer">
                <IconBrandTelegram size={20} />
              </Link>
              <Link href="https://x.com/Tele_Ghost?t=jtcKr-_5fMSFrnl9tvTObQ&s=09" aria-label="X" className="hover:text-black dark:hover:text-white transition" target="_blank" rel="noopener noreferrer">
                <IconBrandX size={20} />
              </Link>
              <Link href="https://www.instagram.com/teleghostads?igsh=b2NhbGkzMDVmcGVr" aria-label="Instagram" className="hover:text-black dark:hover:text-white transition" target="_blank" rel="noopener noreferrer">
                <IconBrandInstagram size={20} />
              </Link>
              <Link href="https://youtube.com/@teleghost_ads?si=zSQ93bZb1-QitJX8" aria-label="YouTube" className="hover:text-black dark:hover:text-white transition" target="_blank" rel="noopener noreferrer">
                <IconBrandYoutube size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
              <li><Link href="#features" className="hover:opacity-80">Features</Link></li>
              <li><Link href="#advertisers" className="hover:opacity-80">For Advertisers</Link></li>
              <li><Link href="#publishers" className="hover:opacity-80">For Publishers</Link></li>
              <li><Link href="#faq" className="hover:opacity-80">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
              <li><Link href="#" className="hover:opacity-80">Blog</Link></li>
              <li><Link href="#" className="hover:opacity-80">Guides</Link></li>
              <li><Link href="#" className="hover:opacity-80">Support</Link></li>
              <li><Link href="#" className="hover:opacity-80">Status</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
              <li><Link href="#" className="hover:opacity-80">About</Link></li>
              <li><Link href="#" className="hover:opacity-80">Contact</Link></li>
              <li><Link href="#" className="hover:opacity-80">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
              <li><Link href="#" className="hover:opacity-80">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:opacity-80">Terms of Service</Link></li>
              <li><Link href="#" className="hover:opacity-80">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200/60 dark:border-white/10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500">
            TeleGhost© <span suppressHydrationWarning>{new Date().getFullYear()}</span>
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-600 dark:text-neutral-300">
            <Link href="#" className="hover:opacity-80">Privacy</Link>
            <Link href="#" className="hover:opacity-80">Terms</Link>
            <Link href="#" className="hover:opacity-80">Security</Link>
            <Link href="#" className="hover:opacity-80">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

