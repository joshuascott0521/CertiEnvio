import { DashboardHeader } from "@/components/dashboard-header"
import { EntityFormSkeleton } from "@/components/ui/entity-form-skeleton"

export default function Loading() {
  return (
    <div>
      <DashboardHeader title="Bienvenido a Envia+" breadcrumb="Envia+ / Entidades / Editar" />
      <div className="p-6">
        <EntityFormSkeleton />
      </div>
    </div>
  )
}
