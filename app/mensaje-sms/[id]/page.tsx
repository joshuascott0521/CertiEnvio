"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Mail, MessageCircle, FileText, Mic, CirclePlus, Wifi, Signal, Battery } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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
  entidad: "Alcaldía de Barranca",
  aplicativo: "PQR+",
  remitente: "Alcaldia@prueba.com",
  destinatario: "Andrés Moreno Pérez",
  correoDestinatario: "Andres@prueba.com",
  asunto: "ASIGNACIÓN DE NUEVO PQR",
  fecha: "31/12/2025",
  estado: "Notificado",
  celular: "3112343344",
  contenido: "Se le ha asignado un PQR con radicado No. 20231025 de la secretaria de hacienda municipal de Barranca",
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
      <div className="flex-1 p-5 w-full bg-gray-50">
        <div className="relative">
          {/* Encabezado del mensaje */}
          <div className="flex items-center">
            <img src="/3.svg" alt="Logo-sms" className="w-10 h-10" />
            <h2 className="pl-2 text-xl font-bold flex-1">Asunto: {message?.asunto}</h2>
            <div className="flex flex-col items-end">
              <div className="bg-green-600 text-white px-4 py-1 rounded-md font-medium">NOTIFICADO</div>
              <div className="text-sm mt-1">Fecha: {message?.fecha}</div>
            </div>
          </div>
          <hr className="border-b border-gray-300 my-2" />


          {/* Información del remitente y destinatario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
            <Card className="rounded-xl">
              <h3 className="px-3 py-2 font-bold">Remitente</h3>
              <CardContent className="pb-2 px-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div><span className="font-medium">Entidad:</span> {message?.entidad}</div>
                  <div><span className="font-medium">Aplicativo:</span> {message?.aplicativo}</div>
                  <div><span className="font-medium">Correo:</span> {message?.remitente}</div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-xl">
              <h3 className="font-bold px-3 py-2">Destinatario</h3>
              <CardContent className="pb-2 px-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div><span className="font-medium">Nombre Destinatario:</span> {message?.destinatario}</div>
                  <div><span className="font-medium">Celular:</span> {message?.celular}</div>
                  <div><span className="font-medium">Correo Destinatario:</span> {message?.correoDestinatario}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenido del SMS */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-7 mb-3">
            <Card className="md:col-span-4 py-3 px-4">
              <h3 className="font-bold mb-4">Contenido SMS</h3>
              <CardContent>
                <div className="flex justify-center">
                  {/*Telefono*/}
                  <div className="relative w-[260px] h-[500px] bg-[url('/phone.jpg')] bg-cover bg-center bg-no-repeat">
                    {/* Barra de estado superior */}
                    <div className="absolute top-6 left-5 right-5 flex items-center justify-between px-2 text-[10px] text-gray-700">
                      <span className="font-semibold">9:30</span>
                      <div className="flex items-center space-x-1">
                        <Signal className="w-4 h-4" />
                        <Wifi className="w-4 h-4" />
                        <Battery className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="absolute top-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-xs font-bold space-y-1">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-md">
                        <img
                          src="/4.svg"
                          alt="User"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <span className="text-[11px] text-gray-700">{message?.celular}</span>
                    </div>
                    <hr className="absolute top-28 left-5 right-5 border-t border-gray-150 mt-2" />
                    {/* Contenido del mensaje con scroll */}
                    <div className="scroll-message absolute bottom-20 left-7 right-7 bg-gray-50 text-black text-xs p-3 rounded-lg shadow max-h-40 overflow-y-auto">
                      {message?.contenido}
                    </div>





                    {/* Barra de mensaje */}
                    <div className="absolute bottom-6 left-7 right-7 flex items-center justify-between border border-gray-300 rounded-full px-4 py-[6px] bg-white shadow-sm">
                      <CirclePlus className="text-gray-500" />
                      <span className="mx-3 text-xs text-gray-400 whitespace-nowrap">
                        Mensaje de Texto SMS
                      </span>
                      <Mic className="text-gray-500" />
                    </div>

                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="">
              <Card className="pt-2 px-4 pb-4">
                <h3 className="font-bold mb-4">Cronología SMS</h3>
                <div className="relative space-y-6">
                  {message?.historial.map((item, index) => (
                    <div key={index} className="relative flex items-start gap-3">
                      {/* Línea punteada entre íconos excepto el último */}
                      {index < message.historial.length - 1 && (
                        <span className="absolute top-8 left-[17px] h-full border-l-2 border-dashed border-gray-400 z-0"></span>
                      )}
                      {/* Ícono */}
                      <div className="relative z-10 bg-sky-100 rounded-full p-2">
                        <Mail className={`h-5 w-5 ${item.estado === "Enviado" ? "text-sky-500" : "text-green-500"}`} />
                      </div>
                      {/* Texto */}
                      <div>
                        <div className="font-medium">{item.estado}</div>
                        <div className="text-sm text-gray-500">Fecha: {item.fecha}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Botón de descarga */}
              <div className="flex items-center justify-center w-full p-4">
                <button className="flex items-center bg-green-500 text-white rounded-full hover:bg-green-600 transition-all max-w-full sm:max-w-fit shadow-md">

                  {/* Ícono PDF */}
                  <span className="flex items-center justify-center p-2 sm:p-3 rounded-full bg-green-500">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>

                  {/* Texto */}
                  <span className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 font-semibold text-sm sm:text-base md:text-lg whitespace-nowrap">
                    Descargar Certificado
                  </span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
