import { Mail, MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
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
          <Button variant="outline" size="icon" className="absolute top-0 right-0 rounded-full">
            <X className="h-4 w-4" />
          </Button>

          {/* Encabezado del mensaje */}
          <div className="flex items-center mb-4">
            <div className="bg-gray-200 rounded-full p-2 mr-3">
              <MessageSquare className="h-6 w-6 text-gray-500" />
            </div>
            <Skeleton className="h-6 w-64 flex-1" />
            <div className="flex flex-col items-end">
              <Skeleton className="h-8 w-32 rounded-md" />
              <Skeleton className="h-4 w-24 mt-1" />
            </div>
          </div>

          {/* Información del remitente y destinatario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">Remitente</h3>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">Destinatario</h3>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-5/6" />
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
                      <Skeleton className="w-16 h-16 rounded-full" />
                    </div>

                    <Skeleton className="mt-40 h-20 w-full rounded-lg" />

                    <div className="absolute bottom-4 left-0 right-0 flex items-center px-4">
                      <Skeleton className="flex-1 h-8 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-4">Cronología SMS</h3>
              <div className="space-y-6">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-sky-100 rounded-full p-2 mr-3">
                      <Mail className="h-5 w-5 text-sky-500" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Botón de descarga */}
          <div className="flex justify-end">
            <Skeleton className="h-10 w-48 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
