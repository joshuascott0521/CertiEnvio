"use client";

import { useRouter } from "next/navigation";
import { Building2, Edit, PlusCircle } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Entity } from "@/types";
import { entityService } from "@/services/api";

type Props = {
  Entity: Entity;
};


export default function EntidadesPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Entity[]>([]);

  useEffect(() => {
    // carga de datos
    setLoading(true);
    const obtenerEntidades = async () => {
      try {
        const { success, data, error } = await entityService.getAll();
        console.log(success, data, error);
        if (!success) throw new Error(error);
        setData(data);
      } catch (error) {
        console.error("Error al obtener todas las entidades", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerEntidades();
  }, []);

  const handleAddEntity = () => {
    startTransition(() => {
      router.push("/entidad/nueva");
    });
  };

  const handleEditEntity = (id: number) => {
    startTransition(() => {
      router.push(`/entidad/editar/${id}`);
    });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <DashboardHeader title="Entidades" breadcrumb="Envia+ / Entidades" />
      <div className="p-6 bg-gray-50 shrink-0">
        <Button
          className="mb-4 bg-green-500 hover:bg-green-600 text-white"
          onClick={handleAddEntity}
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
            ? // Skeleton loader para entidades
            Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="border rounded-lg p-6 max-w-6xl mx-auto bg-white shadow-sm flex flex-col md:flex-row justify-between items-center gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  {/* Icono + Entidad/NIT */}
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <div>
                      <Skeleton className="h-4 w-40 mb-2" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>

                  {/* Tipo + Dirección + Ciudad */}
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-4 w-48 mb-2" />
                    <Skeleton className="h-4 w-40" />
                  </div>

                  {/* Correo + Celular + Página Web */}
                  <div>
                    <Skeleton className="h-4 w-52 mb-2" />
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-4 w-44" />
                  </div>
                </div>

                {/* Botón de editar */}
                <div className="md:align-center">
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            ))
            :
            // Datos reales...

            data
              .map((entity) => (
                <div
                  key={entity.Id}
                  className="border rounded-lg p-6 max-w-6xl mx-auto bg-white shadow-sm flex flex-col md:flex-row justify-between items-center gap-4"
                >
                  {/* Sección de información principal */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-10 w-10 text-gray-500 mt-1" />
                      <div>
                        {/* Tooltip Para Label Entidad */}
                        <div className="relative group w-fit max-w-[250px]">
                        <div className="truncate block relative z-10">
                          <span className="font-medium">Entidad:</span>{" "}
                          <span>{entity.Nombre}</span>
                        </div>
                        <div className="absolute z-20 left-0 right-0 bottom-full mb-2 mx-auto hidden group-hover:flex flex-col items-center
                                        opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200"
                        >
                          <div className="bg-blue-600 text-white text-xs rounded px-3 py-2 whitespace-normal break-words max-w-xs text-center shadow-lg">
                            {entity.Nombre}
                          </div>
                          <div className="w-2 h-2 rotate-45 bg-blue-600 -mt-1 shadow-lg"></div>
                        </div>
                      </div>
                        {/* Nit */}
                        <div>
                          <span className="font-medium">NIT:</span> {entity.NIT}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span className="font-medium">Tipo:</span> {entity.NombreAplicativo}
                      </div>
                      <div>
                        <span className="font-medium">Dirección:</span> {entity.Direccion}
                      </div>
                      {entity.MunicipioCod && (
                        <div>
                          <span className="font-medium">Ciudad:</span> {entity.NombreMunicipio}
                        </div>
                      )}
                    </div>

                    <div>
                      {/* Tooltip para label de correo */}
                      <div className="relative group w-fit max-w-[250px]">
                        <div className="truncate block relative z-10">
                          <span className="font-medium">Correo:</span>{" "}
                          <span>{entity.Email}</span>
                        </div>
                        <div className="absolute z-20 left-0 right-0 bottom-full mb-2 mx-auto hidden group-hover:flex flex-col items-center
                                        opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200"
                        >
                          <div className="bg-blue-600 text-white text-xs rounded px-3 py-2 whitespace-normal break-words max-w-xs text-center shadow-lg">
                            {entity.Email}
                          </div>
                          <div className="w-2 h-2 rotate-45 bg-blue-600 -mt-1 shadow-lg"></div>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Celular:</span> {entity.Celular}
                      </div>
                      {/* Tooltip label Correo */}
                      {entity.PaginaWeb && (
                        <div className="relative group w-fit max-w-[250px]">
                          <div className="truncate block relative z-10">
                            <span className="font-medium">Página Web:</span>{" "}
                            <span>{entity.PaginaWeb}</span>
                          </div>
                          <div className="absolute z-20 left-0 right-0 top-full mt-2 mx-auto hidden group-hover:flex flex-col items-center
                                        opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200">
                            <div className="w-2 h-2 rotate-45 bg-blue-600 -mb-1 shadow-lg"></div>
                            <div className="bg-blue-600 text-white text-xs rounded px-3 py-2 whitespace-normal break-words max-w-xs text-center shadow-lg">
                              {entity.PaginaWeb}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Botón de editar */}
                  <div className="md:align-center">
                    <Button
                      variant="ghost"
                      className="rounded-full bg-yellow-200 hover:bg-yellow-300 p-3"
                      onClick={() => handleEditEntity(entity.Id)}
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
