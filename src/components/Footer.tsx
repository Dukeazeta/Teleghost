export default function Footer() {
  return (
    <footer className="px-6 py-16 border-t border-white/10 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-semibold text-lg">TeleGhost</div>
        <p className="text-neutral-500">TeleGhost© {new Date().getFullYear()}</p>
        <div className="flex gap-4 text-neutral-600 dark:text-neutral-300">
          <a href="#features" className="hover:opacity-80">Features</a>
          <a href="#advertisers" className="hover:opacity-80">Advertisers</a>
          <a href="#publishers" className="hover:opacity-80">Publishers</a>
          <a href="#faq" className="hover:opacity-80">FAQ</a>
        </div>
      </div>
    </footer>
  );
}

