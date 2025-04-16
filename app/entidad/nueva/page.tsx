import { DashboardHeader } from "@/components/dashboard-header"
import { EntityForm } from "@/components/entity-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Envia+ | Nueva Entidad",
  description: "Crear una nueva entidad en el sistema Envia+",
}

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
