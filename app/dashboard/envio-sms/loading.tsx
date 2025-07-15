import { DashboardHeader } from "@/components/dashboard-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div>
      <DashboardHeader title="Bienvenido a CertiEnvíos" breadcrumb="CertiEnvíos / Inicio / SMS" />
      <div className="p-6">
        <div className="flex gap-4 mb-6">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[200px]" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 flex justify-between items-center">
              <div className="flex">
                <div className="mr-4">
                  <Skeleton className="h-10 w-10 rounded-md" />
                </div>
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>

              <div className="flex-1 mx-8">
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>

              <div className="mr-4">
                <Skeleton className="h-4 w-48 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>

              <div>
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
