import { DashboardHeader } from "@/components/dashboard-header"

export default function UsuarioPage() {
  return (
    <div>
      <DashboardHeader title="Usuario" breadcrumb="Envia+ / Usuario" />
      <div className="p-6">
        <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
        <p>Página para administrar usuarios</p>
      </div>
    </div>
  )
}

