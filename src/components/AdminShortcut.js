"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminShortcut() {
  const pathname = usePathname();
  
  if (pathname === "/admin") return null;

  return (
    <Link
      href="/admin"
      className="fixed bottom-4 right-4 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-950/30 text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800/80 backdrop-blur transition-all z-50 border border-transparent hover:border-zinc-700"
    >
      Admin
    </Link>
  );
}
