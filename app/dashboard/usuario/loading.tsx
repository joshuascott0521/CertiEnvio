import { DashboardHeader } from "@/components/dashboard-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Usuario" breadcrumb="CertiEnvíos / Usuario" />
      <main className="flex-grow bg-gray-50">
        <div className="p-4 max-w-screen-xl w-full mx-auto">
          <h2 className="text-2xl font-bold mb-4">Mi Cuenta</h2>

          {/* Card de usuario */}
          <div className="rounded-xl p-4 bg-white shadow space-y-4">
            <Skeleton className="h-6 w-1/4 mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-md" />
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>

          {/* Card de contraseña */}
          <div className="rounded-xl p-4 bg-white shadow mt-6 space-y-4">
            <Skeleton className="h-6 w-1/4 mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-md" />
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
