import type { ReactNode } from "react"
import { Suspense } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface DashboardLayoutProps {
  children: ReactNode
}

function DashboardSkeleton() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="h-16 bg-sky-500 mb-6"></div>
      <div className="p-6">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex">
      <DashboardNav />
      <div className="flex-1 flex flex-col">
        <div className="absolute top-4 right-4 z-50 md:hidden">
          <button className="bg-gray-800/60 text-white rounded-full p-2">
            <X className="h-5 w-5" />
          </button>
        </div>
        <main className="flex-1">
          <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>
        </main>
      </div>
    </div>
  )
}
