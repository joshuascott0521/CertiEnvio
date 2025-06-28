"use client"

import { useState, useEffect, useTransition, useRef } from "react"
import { Search } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Email } from "@/types"
import EmailCard from "@/components/ui/emailCard"
import { useRouter } from "next/navigation"
import { messageService } from "@/services/api"

export default function EnvioEmailPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Email[]>([])

  const ultimaPaginaDetectada = useRef(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchEmail = async (currentPage: number) => {
    if (!hasMore) return;

    setIsLoadingMore(true);

    try {
      const response = await messageService.getEmailAll({ page: currentPage, size: pageSize });

      if (response.success && Array.isArray(response.data)) {
        console.log("Página:", currentPage, "Items:", response.data.length);

        if (response.data.length === 0) {
          // El backend no devolvió más datos → no hay más
          setHasMore(false);
        } else {
          setData((prev) => [...prev, ...response.data]);
        }
      } else {
        // Por si success: false o data inesperada
        console.warn("Respuesta inesperada del backend");
        setHasMore(false);
      }
    } catch (error: any) {
      console.error("Error al obtener emails:", error);

      // Si viene un error tipo 404 o red (como estás viendo)
      setHasMore(false); // ⛔️ Ya no sigas intentando
    }

    setIsLoadingMore(false);
  };


  useEffect(() => {
    setLoading(true);
    setPage(1);
    setData([]);        // Limpia resultados anteriores si recargas
    setHasMore(true);   // 👈 importante: se debe reiniciar
    fetchEmail(1).then(() => setLoading(false));
  }, []);


  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20 && !isLoadingMore && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoadingMore]);

  useEffect(() => {
    if (page === 1 || !hasMore) return;
    fetchEmail(page);
  }, [page]);



  const handleMessageClick = (id: string) => {
    startTransition(() => {
      window.open(`/mensaje-email/${id}`, "_blank")
    })
  }

  return (
    <div>
      <DashboardHeader title="Bienvenido a CertiEnvíos" breadcrumb="CertiEnvíos / Inicio / Email" />
      <div className="px-6 py-3">
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

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border rounded-lg p-4 flex justify-between items-center">
                <div className="flex">
                  <div className="mr-4">
                    <Skeleton className="h-10 w-10 rounded-md" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>

                <div className="flex-1 mx-8">
                  <Skeleton className="h-4 w-40 mb-2" />
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-48" />
                </div>

                <div className="mr-4">
                  <Skeleton className="h-4 w-48 mb-2" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>

                <div>
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="h-[520px] overflow-y-auto space-y-4 rounded-lg border border-gray-200 bg-white shadow-sm px-4 py-3"
          >
            {Array.from(new Map(data.map((msg) => [msg.Id, msg])).values()).map((message) => (
              <EmailCard key={message.Id} message={message} onClick={handleMessageClick} />
            ))}

            {hasMore && (
              <p className="text-center text-gray-400">Cargando datos...</p>
            )}

            {!hasMore && data.length > 0 && (
              <p className="text-center text-gray-400">No hay más resultados.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
