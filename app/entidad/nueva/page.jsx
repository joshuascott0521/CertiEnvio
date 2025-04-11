import { DashboardHeader } from "@/components/dashboard-header"
import { EntityForm } from "@/components/entity-form"

export default function NuevaEntidadPage() {
  return (
    <div>
      <DashboardHeader title="Bienvenido a Envia+" breadcrumb="Envia+ / Entidades / Agregar" />
      <div className="p-6">
        <EntityForm />
      </div>
    </div>
  )
}

