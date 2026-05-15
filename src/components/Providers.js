"use client";

import { SessionProvider } from "next-auth/react";
import ProfileCompletionModal from "./ProfileCompletionModal";

export function Providers({ children }) {
  return (
    <SessionProvider>
      {children}
      <ProfileCompletionModal />
    </SessionProvider>
  );
}
