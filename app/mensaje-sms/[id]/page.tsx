"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Mail, MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MessageData {
  id: number
  entidad: string
  aplicativo: string
  remitente: string
  destinatario: string
  correoDestinatario: string
  asunto: string
  fecha: string
  estado: string
  celular: string
  contenido: string
  historial: Array<{
    estado: string
    fecha: string
  }>
}

// Datos de ejemplo para el mensaje
const messageData: MessageData = {
  id: 1,
  entidad: "Alcaldía de Baranca",
  aplicativo: "PQR+",
  remitente: "Alcaldia@prueba.com",
  destinatario: "Andrés Moreno Pérez",
  correoDestinatario: "Andres@prueba.com",
  asunto: "ASIGNANCION DE NUEVO PQR",
  fecha: "31/12/2025",
  estado: "Notificado",
  celular: "3112343344",
  contenido: "Se le ha asignado un PQR con radicado No. 20231025 de la secretaria de hacienda municipal de Baranca",
  historial: [
    { estado: "Enviado", fecha: "31/12/2025" },
    { estado: "Notificado", fecha: "31/12/2025" },
  ],
}

interface MensajeSMSPageProps {
  params: {
    id: string
  }
}

export default function MensajeSMSPage({ params }: MensajeSMSPageProps) {
  const router = useRouter()
  const id = Number.parseInt(params.id)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<MessageData | null>(null)

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setMessage(messageData)
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [id])

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="bg-sky-500 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">Bienvenido a Envia+</h1>
          </div>
          <div className="flex items-center">
            <Mail className="h-8 w-8 text-white" />
            <span className="text-3xl font-bold">+</span>
          </div>
        </header>
        <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-6 w-6 rounded-full border-2 border-t-transparent border-sky-500 animate-spin"></div>
            <p>Cargando mensaje...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-sky-500 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Bienvenido a Envia+</h1>
        </div>
        <div className="flex items-center">
          <Mail className="h-8 w-8 text-white" />
          <span className="text-3xl font-bold">+</span>
        </div>
      </header>

      {/* Contenido */}
      <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <div className="relative">
          <Button variant="outline" size="icon" className="absolute top-0 right-0 rounded-full" onClick={handleBack}>
            <X className="h-4 w-4" />
          </Button>

          {/* Encabezado del mensaje */}
          <div className="flex items-center mb-4">
            <div className="bg-gray-200 rounded-full p-2 mr-3">
              <MessageSquare className="h-6 w-6 text-gray-500" />
            </div>
            <h2 className="text-xl font-bold flex-1">Asunto: {message?.asunto}</h2>
            <div className="flex flex-col items-end">
              <div className="bg-green-500 text-white px-4 py-1 rounded-md font-medium">NOTIFICADO</div>
              <div className="text-sm mt-1">Fecha: {message?.fecha}</div>
            </div>
          </div>

          {/* Información del remitente y destinatario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">Remitente</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Entidad:</span> {message?.entidad}
                </div>
                <div>
                  <span className="font-medium">Aplicativo:</span> {message?.aplicativo}
                </div>
                <div>
                  <span className="font-medium">Correo:</span> {message?.remitente}
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">Destinatario</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Nombre Destinatario:</span> {message?.destinatario}
                </div>
                <div>
                  <span className="font-medium">Celular:</span> {message?.celular}
                </div>
                <div>
                  <span className="font-medium">Correo Destinatario:</span> {message?.correoDestinatario}
                </div>
              </div>
            </div>
          </div>

          {/* Contenido del SMS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2 border rounded-lg p-4">
              <h3 className="font-bold mb-4">Contenido SMS</h3>
              <div className="flex justify-center">
                <div className="relative w-64 h-[400px] border-8 border-gray-300 rounded-3xl overflow-hidden bg-white">
                  {/* Barra de estado del teléfono */}
                  <div className="h-6 bg-gray-100 flex items-center justify-between px-4 text-xs">
                    <span>9:30</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
                      <div className="w-1 h-2 bg-gray-400 rounded-sm"></div>
                      <div className="w-1 h-2 bg-gray-400 rounded-sm"></div>
                    </div>
                  </div>

                  {/* Contenido del mensaje */}
                  <div className="p-4">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                        300?877
                      </div>
                    </div>

                    <div className="mt-40 bg-gray-100 p-3 rounded-lg text-xs">{message?.contenido}</div>

                    <div className="absolute bottom-4 left-0 right-0 flex items-center px-4">
                      <div className="flex-1 h-8 bg-gray-100 rounded-full flex items-center px-3 text-xs text-gray-400">
                        Mensaje de Texto SMS
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-4">Cronología SMS</h3>
              <div className="space-y-6">
                {message?.historial.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-sky-100 rounded-full p-2 mr-3">
                      <Mail className={`h-5 w-5 ${item.estado === "Enviado" ? "text-sky-500" : "text-green-500"}`} />
                    </div>
                    <div>
                      <div className="font-medium">{item.estado}</div>
                      <div className="text-sm text-gray-500">Fecha: {item.fecha}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Botón de descarga */}
          <div className="flex justify-end">
            <Button className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2">
              <div className="bg-white rounded-full p-1">
                <Mail className="h-4 w-4 text-green-500" />
              </div>
              Descargar Certificado
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
