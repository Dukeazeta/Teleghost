import Link from "next/link";

export default function NavBar() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-6 rounded-full border border-white/10 bg-white/50 text-neutral-800 backdrop-blur-md px-4 py-2 shadow/10 shadow-black/5 dark:bg-neutral-900/50 dark:text-neutral-100 dark:border-white/10">
        <Link href="#features" className="text-sm hover:opacity-80 transition">Features</Link>
        <Link href="#advertisers" className="text-sm hover:opacity-80 transition">For Advertisers</Link>
        <Link href="#publishers" className="text-sm hover:opacity-80 transition">For Publishers</Link>
        <Link href="#faq" className="text-sm hover:opacity-80 transition">FAQ</Link>
        <Link
          href="#cta"
          className="ml-2 rounded-full bg-black text-white px-4 py-2 text-sm font-medium hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition"
        >
          Join TeleGhost
        </Link>
      </nav>
    </div>
  );
}

