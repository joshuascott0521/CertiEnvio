import { DashboardHeader } from "@/components/dashboard-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div>
      <DashboardHeader title="Inicio" breadcrumb="CertiEnvíos / Inicio" />
      <div className="p-6">
        <h2 className="text-2xl font-bold">Panel Principal</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>

        <Skeleton className="h-96 w-full rounded-xl mt-6" />
      </div>
    </div>
  )
}
