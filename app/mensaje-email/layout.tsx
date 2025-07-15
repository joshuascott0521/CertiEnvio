import type { ReactNode } from "react";

import { AuthGuard } from "@/components/auth-guard";

interface MessageLayoutProps {
  children: ReactNode;
}

export default function MessageLayout({ children }: MessageLayoutProps) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-white">{children}</div>
    </AuthGuard>
  );
}