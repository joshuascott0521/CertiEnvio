import { DashboardHeader } from "@/components/dashboard-header"
import { SkeletonCard } from "@/components/ui/skeleton-card"

export default function Loading() {
  return (
    <div>
      <DashboardHeader title="Usuario" breadcrumb="Envia+ / Usuario" />
      <div className="p-4 max-w-screen-xl mx-auto bg-gray-50">
        <h2 className="text-2xl font-bold">Mi Cuenta</h2>
        <div className="space-y-4 mt-4">
          <SkeletonCard rows={4} />
          <SkeletonCard rows={3} />
        </div>
      </div>
    </div>
  )
}
