import type { ReactNode } from "react";

interface MessageLayoutProps {
  children: ReactNode;
}

export default function MessageLayout({ children }: MessageLayoutProps) {
  return <div className="min-h-screen bg-white">{children}</div>;
}
