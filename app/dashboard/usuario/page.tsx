"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { User } from "@/types";
import { userService } from "@/services/api";
import { Button } from "@/components/ui/button";
import { PlusCircle, CircleUserRound, Edit } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";


export default function UsuarioPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    setLoading(true);
    const obtenerUsuarios = async () => {
      try {
        const { success, data, error } = await userService.getProfile();
        if (!success) throw new Error(error);
        setData(data);
      } catch (error) {
        console.error("Error al obtener los usuarios")
      } finally {
        setLoading(false)
      }
    }
    obtenerUsuarios();
  }, []);

  const handleEditUser = (id: string) => {
    startTransition(() => {
      router.push(`/usuarios/editar/${id}`);
    });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <DashboardHeader title="Entidades" breadcrumb="CertiEnvíos / Usuarios" />
      <div className="p-6 pb-0 bg-gray-50 shrink-0">
        <Button
          className="mb-4 bg-green-500 hover:bg-green-600 text-white"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center">
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Cargando...
            </div>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Agregar
            </>
          )}
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="space-y-4">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="border rounded-lg p-6 max-w-6xl mx-auto bg-white shadow-sm flex flex-col md:flex-row justify-between items-center gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <div>
                      <Skeleton className="h-4 w-40 mb-2" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>
                  <div>
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-52 mb-2" />
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-4 w-44" />
                  </div>
                </div>
                <div className="md:align-center">
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            ))
            : data.map((user) => (
              <div
                key={user.Id}
                className="border rounded-lg p-6 max-w-6xl mx-auto bg-white shadow-sm flex flex-col md:flex-row justify-between items-center gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  <div className="flex items-center gap-2">
                    <CircleUserRound className="h-10 w-10 text-gray-500 mt-1" />
                    <div>
                      <div>
                        <span className="font-medium">Nombre:</span> {user.Nombre}
                      </div>
                      <div>
                        <span className="font-medium">Documento:</span> {user.Documento}
                      </div>
                      <div>
                        <span className="font-medium">Estado:</span> {user.Estado}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className="font-medium">Tipo:</span> {user.TipoUsuarioNombre}
                    </div>
                    <div>
                      <span className="font-medium">Rol:</span> {user.Role}
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className="font-medium">Correo:</span> {user.Email}
                    </div>
                    <div>
                      <span className="font-medium">Celular:</span> {user.Celular}
                    </div>
                  </div>
                </div>

                {/* Botón de editar */}
                <div className="md:align-center">
                  <Button
                    variant="ghost"
                    className="rounded-full bg-yellow-200 hover:bg-yellow-300 p-3"
                    onClick={() => handleEditUser(user.Id)}
                    disabled={isPending}
                  >
                    <Edit className="h-5 w-5 text-yellow-600" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
