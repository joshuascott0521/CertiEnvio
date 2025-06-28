"use client"
import { Card, CardContent } from "@/components/ui/card"
import { messageService } from "@/services/api"
import { Email } from "@/types"
import { Archive, Battery, FileText, Mail, MailCheck, MailMinus, MailQuestion, MailX, Minus, MoreHorizontal, Square, Star, Trash2, Wifi, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { use, useEffect, useRef, useState } from "react"

export default function MensajeEmailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const { id } = use(params)
    const parsedId = parseInt(id)
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState<Email | null>(null)
    const ultimoEstado = message?.Detalles?.at(-1)?.Estado;

    useEffect(() => {
        const fetchSms = async () => {
            try {
                const response = await messageService.getEmailById(parsedId);
                if (!response.success) throw new Error(response.error);
                setMessage(response.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchSms();
    }, [parsedId])

    const handleBack = () => router.back()

    const formatearFecha = (fechaStr: string): string => {
        const fecha = new Date(fechaStr);
        return fecha.toLocaleString("es-CO", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const getEstadoColor = (estado?: string) => {
        switch (estado) {
            case "Notificado":
                return "bg-green-500"
            case "Enviado":
                return "bg-gray-500"
            case "Spam":
                return "bg-red-800"
            case "Rechazado":
                return "bg-red-500"
            case "Sin notificar":
                return "bg-sky-500"
            default:
                return "bg-gray-500"
        }
    };

    const iframeRef = useRef<HTMLIFrameElement>(null)

    useEffect(() => {
        const iframe = iframeRef.current
        if (!iframe) return

        const handleResize = () => {
            try {
                const doc = iframe.contentDocument || iframe.contentWindow?.document
                if (doc?.body) {
                    iframe.style.height = doc.body.scrollHeight + "px"
                }
            } catch (err) {
                console.warn("No se pudo ajustar la altura del iframe:", err)
            }
        }

        iframe.addEventListener("load", handleResize)
        return () => iframe.removeEventListener("load", handleResize)
    }, [message?.Cuerpo])

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <header className="bg-sky-500 text-white p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-2xl font-bold">Bienvenido a CertiEnvíos</h1>
                    </div>
                    <div className="flex items-center">
                        <Mail className="h-8 w-8 text-white" />
                        <span className="text-3xl font-bold">+</span>
                    </div>
                </header>
                <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="h-6 w-6 rounded-full border-2 border-t-transparent border-sky-500 animate-spin"></div>
                        <p>Cargando Email...</p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen flex flex-col">
            {/* Encabezado */}
            <header className="bg-sky-500 text-white p-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold">Bienvenido a CertiEnvíos</h1>
                </div>
                <div className="flex items-center">
                    <Mail className="h-8 w-8 text-white" />
                    <span className="text-3xl font-bold">+</span>
                </div>
            </header>
            {/* Información del email */}
            <div className="flex-1 p-5 w-full bg-gray-50">
                <div className="relative">
                    {/* encabezado del email */}
                    <div className="flex items-center">
                        <Mail className="h-10 w-10 text-gray-400" />
                        <h2 className="pl-2 text-xl font-bold flex-1">Asunto: {message?.Asunto}</h2>
                        <div className="flex flex-col items-end">
                            <div className={`${getEstadoColor(ultimoEstado)} text-white px-4 py-1 rounded-md font-medium`}>
                                {ultimoEstado || "SIN ESTADO"}
                            </div>
                            <div className="text-sm mt-1">
                                Fecha: {message?.Detalles?.at(-1)?.Fecha ? formatearFecha(message.Detalles.at(-1)!.Fecha) : "Desconocida"}
                            </div>
                        </div>
                    </div>
                    {/* informacion del remitente y destinatario */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                        {/* informacion del remitente*/}
                        <Card className="rounded-xl">
                            <h3 className="px-3 py-2 font-bold">Remitente</h3>
                            <CardContent className="pb-2 px-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div><span className="font-medium">Entidad: </span> {message?.NombreEntidad}</div>
                                    <div className="flex flex-row items-center justify-center"><span className="font-medium">Aplicativo:&nbsp;</span> {message?.NombreAplicativo}</div>
                                    <div className="col-span-2"><span className="font-medium">Correo: </span> {message?.Remitente}</div>
                                </div>
                            </CardContent>
                        </Card>
                        {/* informacion del destinatario */}
                        <Card className="rounded-xl">
                            <h3 className="font-bold px-3 py-2">Destinatario</h3>
                            <CardContent className="pb-2 px-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div><span className="font-medium">Nombre Destinatario:</span> {message?.NombreTercero}</div>
                                    <div><span className="font-medium">Contacto:</span> {message?.CorreoDestinatario}</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Vista previa del email */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-7 mb-3">
                        <Card className="md:col-span-4 py-3 px-4">
                            <h3 className="font-bold mb-4">Contenido Email</h3>
                            <CardContent>
                                <div className="relative">
                                    <div className="bg-zinc-800 p-3 rounded-2xl shadow-2xl">
                                        <div className="bg-black p-3 rounded-xl">
                                            <div className="bg-white w-full h-[450px] rounded-lg overflow-hidden shadow-inner">
                                                <div className="bg-gray-100 h-8 flex items-center px-4 border-b border-gray-200">
                                                    <div className="flex space-x-2">
                                                        <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center"></div>
                                                        <div className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center"></div>
                                                        <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center"></div>
                                                    </div>
                                                    <div className="flex-1 text-center">
                                                        <span className="text-sm font-medium text-gray-700">Bandeja de Entrada</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Wifi className="w-4 h-4 text-gray-600" />
                                                        <Battery className="w-4 h-4 text-gray-600" />
                                                        <span className="text-xs text-gray-600">10:30</span>
                                                    </div>
                                                </div>

                                                {/* Email Content */}
                                                <div className="flex flex-col h-full">
                                                    {/* Email Header */}
                                                    <div className="p-6 border-b border-gray-200 bg-white">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <h1 className="text-xl font-semibold text-gray-900">
                                                                {message?.Asunto}
                                                            </h1>
                                                            <div className="flex items-center space-x-2">
                                                                <div className="p-2 text-gray-400">
                                                                    <Star className="w-4 h-4" />
                                                                </div>
                                                                <div className="p-2 text-gray-400">
                                                                    <Archive className="w-4 h-4" />
                                                                </div>
                                                                <div className="p-2 text-gray-400">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </div>
                                                                <div className="p-2 text-gray-400">
                                                                    <MoreHorizontal className="w-4 h-4" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                                                                {message?.Remitente.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900">{message?.Remitente}</div>
                                                                <div className="text-sm text-gray-500">Para: {message?.CorreoDestinatario}</div>
                                                            </div>
                                                            <div className="ml-auto text-sm text-gray-500">
                                                                {message?.Detalles?.at(-1)?.Fecha ? formatearFecha(message.Detalles.at(-1)!.Fecha) : "Desconocida"}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Email Body */}
                                                    <div className="flex-1 p-6 mb-4 bg-gray-100 rounded-xl overflow-y-auto">
                                                        <div className="bg-white rounded-xl shadow-sm">
                                                            <iframe
                                                                ref={iframeRef}
                                                                title="Vista previa del correo"
                                                                srcDoc={`<style>
                                                                            html, body {
                                                                            margin: 0;
                                                                            padding: 0;
                                                                            overflow-y: auto;
                                                                            }
                                                                            *::-webkit-scrollbar {
                                                                            width: 8px;
                                                                            }
                                                                        </style>
                                                                        ${message?.Cuerpo ?? "<p>Sin contenido</p>"}`}
                                                                className="w-full h-full rounded-3xl"
                                                                style={{ pointerEvents: "none", border: "none" }}
                                                            />



                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        {/* Monitor Stand */}
                                        <div className="mt-4 flex justify-center">
                                            <div className="w-20 h-8 bg-zinc-700 rounded-t-lg"></div>
                                        </div>
                                        
                                    </div>
                                    {/* Monitor Base*/}
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-zinc-700 rounded-full"></div>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="">
                            <Card className="pt-2 px-4 pb-4">
                                <h3 className="font-bold mb-4">Cronología Email</h3>
                                <div className="relative space-y-6">
                                    {message?.Detalles.map((item, index) => (
                                        <div key={index} className="relative flex items-start gap-3">
                                            {/* Línea punteada entre íconos excepto el último */}
                                            {index < message.Detalles.length - 1 && (
                                                <span className="absolute top-8 left-[17px] h-full border-l-2 border-dashed border-gray-400 z-0"></span>
                                            )}
                                            {/* Ícono */}
                                            <div className="relative z-10 bg-gray-100 rounded-full p-2">
                                                {item.Estado === "Enviado" &&
                                                    <Mail className="h-5 w-5 text-gray-500" />
                                                }
                                                {item.Estado === "Sin notificar" &&
                                                    <MailQuestion className="h-5 w-5 text-sky-500" />
                                                }
                                                {item.Estado === "Rechazado" &&
                                                    <MailX className="h-5 w-5 text-red-500" />
                                                }
                                                {item.Estado === "Spam" &&
                                                    <MailMinus className="h-5 w-5 text-red-800" />
                                                }
                                                {item.Estado === "Notificado" &&
                                                    <MailCheck className="h-5 w-5 text-green-500" />
                                                }

                                            </div>
                                            {/* Texto */}
                                            <div>
                                                <div className="font-medium">{item.Estado}</div>
                                                <div className="text-sm text-gray-500">
                                                    Fecha: {item.Fecha ? formatearFecha(item.Fecha) : "Desconocida"}
                                                </div>
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