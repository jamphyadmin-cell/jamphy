"use client";

import Image from "next/image";
import Link from "next/link";

export default function AdminLogoLink() {
  return (
    <Link 
      href="/" 
      onClick={(e) => {
        if (!window.confirm("Are you sure you want to leave the admin console? Any unsaved changes will be lost.")) {
          e.preventDefault();
        }
      }}
    >
      <Image
        src="/logo.png"
        alt="Jamphy Admin Logo"
        width={160}
        height={160}
        className="rounded-2xl cursor-pointer hover:opacity-80 transition-opacity"
      />
    </Link>
  );
}
