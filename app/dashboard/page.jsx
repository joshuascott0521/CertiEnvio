import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader title="Inicio" breadcrumb="Envia+ / Inicio" />
      <div className="p-6">
        <h2 className="text-2xl font-bold">Panel Principal</h2>
        <p>Bienvenido al sistema de envío de correos Envia+</p>
      </div>
    </div>
  )
}

