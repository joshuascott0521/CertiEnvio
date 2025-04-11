import { DashboardHeader } from "@/components/dashboard-header"

export default function EnvioEmailSMSPage() {
  return (
    <div>
      <DashboardHeader title="Envió Email SMS" breadcrumb="Envia+ / Envió Email SMS" />
      <div className="p-6">
        <h2 className="text-2xl font-bold">Envío de Correos SMS</h2>
        <p>Página para enviar correos electrónicos por SMS</p>
      </div>
    </div>
  )
}

