import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div>
      <DashboardHeader title="Entidades" breadcrumb="CertiEnvíos / Entidades" />
      <div className="p-6">
        <Button className="mb-4 bg-green-500 hover:bg-green-600 text-white">
          <PlusCircle className="h-4 w-4 mr-2" />
          Agregar
        </Button>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 flex justify-between items-center">
              <div className="flex">
                <div className="mr-4">
                  <Skeleton className="h-10 w-10 rounded-md" />
                </div>
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              <div className="flex-1 mx-8">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-48 mb-2" />
                <Skeleton className="h-4 w-40" />
              </div>

              <div className="mr-4">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>

              <div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
