import { DashboardHeader } from "@/components/dashboard-header"
import { EntityForm } from "@/components/entity-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CertiEnvíos | Nueva Entidad",
  description: "Crear una nueva entidad en el sistema CertiEnvíos",
}

export default function NuevaEntidadPage() {
  return (
    <div>
      <DashboardHeader title="Bienvenido a CertiEnvíos" breadcrumb="CertiEnvíos / Entidades / Agregar" />
      <div className="p-6">
        <EntityForm />
      </div>
    </div>
  )
}
