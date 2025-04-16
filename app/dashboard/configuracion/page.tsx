import { DashboardHeader } from "@/components/dashboard-header"

export default function ConfiguracionPage() {
  return (
    <div>
      <DashboardHeader title="Configuración" breadcrumb="Envia+ / Configuración" />
      <div className="p-6">
        <h2 className="text-2xl font-bold">Configuración del Sistema</h2>
        <p>Página para configurar el sistema</p>
      </div>
    </div>
  )
}
