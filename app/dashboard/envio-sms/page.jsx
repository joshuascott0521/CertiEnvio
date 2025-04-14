"use client"

import { useRouter } from "next/navigation"
import { Download, MessageSquare, Search } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const messages = [
  {
    id: 1,
    entidad: "Alcaldía de Baranca",
    aplicativo: "PQR+",
    remitente: "Alcaldia@prueba.com",
    destinatario: "Andrés Moreno Pérez",
    correo: "Andresperez@prueba.com",
    asunto: "ASIGNANCION DE NUEVO PQR",
    fecha: "31/12/2025",
    estado: "Notificado",
    celular: "3112343344",
  },
  {
    id: 2,
    entidad: "Alcaldía de Baranca",
    aplicativo: "PQR+",
    remitente: "Alcaldia@prueba.com",
    destinatario: "Andrés Moreno Pérez",
    correo: "Andresperez@prueba.com",
    asunto: "Asignación nuevo PQR",
    fecha: "31/12/2025",
    estado: "Enviado",
    celular: "3112343344",
  },
  {
    id: 3,
    entidad: "Alcaldía de Baranca",
    aplicativo: "PQR+",
    remitente: "Alcaldia@prueba.com",
    destinatario: "Andrés Moreno Pérez",
    correo: "Andresperez@prueba.com",
    asunto: "Asignación nuevo PQR",
    fecha: "31/12/2025",
    estado: "Abierto",
    celular: "3112343344",
  },
  {
    id: 4,
    entidad: "Alcaldía de Baranca",
    aplicativo: "PQR+",
    remitente: "Alcaldia@prueba.com",
    destinatario: "Andrés Moreno Pérez",
    correo: "Andresperez@prueba.com",
    asunto: "Asignación nuevo PQR",
    fecha: "31/12/2025",
    estado: "Rechazado",
    celular: "3112343344",
  },
  {
    id: 5,
    entidad: "Alcaldía de Baranca",
    aplicativo: "PQR+",
    remitente: "Alcaldia@prueba.com",
    destinatario: "Andrés Moreno Pérez",
    correo: "Andresperez@prueba.com",
    asunto: "Asignación nuevo PQR",
    fecha: "31/12/2025",
    estado: "Enviado",
    celular: "3112343344",
  },
]

// Función para obtener el color de fondo según el estado
function getStatusBgColor(status) {
  switch (status) {
    case "Notificado":
      return "bg-green-500"
    case "Enviado":
      return "bg-gray-600"
    case "Abierto":
      return "bg-yellow-500"
    case "Rechazado":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export default function EnvioSMSPage() {
  const router = useRouter()

  const handleMessageClick = (id) => {
    window.open(`/mensaje-sms/${id}`, "_blank")
  }

  return (
    <div>
      <DashboardHeader title="Bienvenido a Envia+" breadcrumb="Envia+ / Inicio / SMS" />
      <div className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Buscar" className="pl-10 border-gray-300" />
          </div>
          <Select defaultValue="all-entities">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Todas las Entidades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-entities">Todas las Entidades</SelectItem>
              <SelectItem value="alcaldia">Alcaldía de Baranca</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-apps">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Todos Aplicativos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-apps">Todos Aplicativos</SelectItem>
              <SelectItem value="pqr">PQR+</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-status">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Todos los Estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">Todos los Estados</SelectItem>
              <SelectItem value="notificado">Notificado</SelectItem>
              <SelectItem value="enviado">Enviado</SelectItem>
              <SelectItem value="abierto">Abierto</SelectItem>
              <SelectItem value="rechazado">Rechazado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="border rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => handleMessageClick(message.id)}
            >
              <div className="flex">
                <div className="mr-4">
                  <MessageSquare className="h-10 w-10 text-gray-400" />
                </div>
                <div>
                  <div>
                    <span className="font-medium">Entidad:</span> {message.entidad}
                  </div>
                  <div>
                    <span className="font-medium">Aplicativo:</span> {message.aplicativo}
                  </div>
                  <div>
                    <span className="font-medium">Remitente:</span> {message.remitente}
                  </div>
                </div>
              </div>

              <div className="flex-1 mx-8">
                <div>
                  <span className="font-medium">Destinatario:</span> {message.destinatario}
                </div>
                <div>
                  <span className="font-medium">Correo:</span> {message.correo}
                </div>
                <div>
                  <span className="font-medium">Asunto:</span> {message.asunto}
                </div>
              </div>

              <div className="mr-4">
                <div>
                  <span className="font-medium">Fecha Ultimo Estado:</span> {message.fecha}
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Estado:</span>
                  <span className={`text-white text-sm px-3 py-0.5 rounded-full ${getStatusBgColor(message.estado)}`}>
                    {message.estado}
                  </span>
                </div>
              </div>

              <div onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" className="text-gray-400 hover:text-gray-600">
                  <Download className="h-6 w-6" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

