import { DashboardHeader } from "@/components/dashboard-header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CertiEnvíos | Dashboard",
  description: "Panel principal del sistema CertiEnvíos",
}

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader title="Inicio" breadcrumb="CertiEnvíos / Inicio" />
      <div className="p-6">
        <h2 className="text-2xl font-bold">Panel Principal</h2>
        <p>Bienvenido al sistema de envío de correos Envia+</p>
      </div>
    </div>
  )
}
