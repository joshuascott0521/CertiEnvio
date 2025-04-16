import type { ReactNode } from "react"
import { DashboardNav } from "@/components/dashboard-nav"

interface EntidadLayoutProps {
  children: ReactNode
}

export default function EntidadLayout({ children }: EntidadLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex">
      <DashboardNav />
      <div className="flex-1 flex flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
