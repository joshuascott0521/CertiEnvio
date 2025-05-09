import type { ReactNode } from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { AuthGuard } from "@/components/auth-guard";

interface UsuarioLayoutProps {
  children: ReactNode;
}

export default function EntidadLayout({ children }: UsuarioLayoutProps) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-white flex">
        <DashboardNav />
        <div className="flex-1 flex flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
