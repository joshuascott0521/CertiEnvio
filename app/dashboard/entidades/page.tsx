"use client";

import { useRouter } from "next/navigation";
import { Building2, Edit, PlusCircle } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Entity } from "@/types";

type Props = {
  Entity: Entity;
};
// interface Entity {
//   id: number
//   name: string
//   nit: string
//   type: string
//   address: string
//   city?: string
//   email: string
//   phone: string
//   website?: string
// }

const entities: Entity[] = [
  {
    id: 1,
    name: "Alcaldía de Prueba",
    nit: "800.000.000",
    type: "PQR+",
    address: "Cra 29 #14-57",
    email: "Al@prueba.com",
    phone: "324567345",
  },
  {
    id: 2,
    name: "Alcaldía de Prueba",
    nit: "800.000.000",
    type: "Gestión Legal+",
    address: "Cra 29 #14-57",
    city: "Baranca - Atlantico",
    email: "Al@prueba.com",
    phone: "324567345",
    website: "www.baranca.com",
  },
];

export default function EntidadesPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Entity[]>([]);

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setData(entities);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
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
    <div>
      <DashboardHeader title="Entidades" breadcrumb="Envia+ / Entidades" />
      <div className="p-6">
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

        <div className="space-y-4">
          {loading
            ? // Skeleton loader para entidades
              Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div className="flex">
                    <div className="mr-4">
                      <Skeleton className="h-10 w-10 rounded-md" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>

                  <div className="flex-1 mx-8">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-4 w-48 mb-2" />
                    <Skeleton className="h-4 w-40" />
                  </div>

                  <div className="mr-4">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>

                  <div>
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
              ))
            : // Datos reales
              data.map((entity) => (
                <div
                  key={entity.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div className="flex">
                    <div className="mr-4">
                      <Building2 className="h-10 w-10 text-gray-500" />
                    </div>
                    <div>
                      {entity.id !== 1 && (
                        <div className="text-sm text-gray-500">
                          Id: {entity.id}
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Entidad:</span>{" "}
                        {entity.name}
                      </div>
                      <div>
                        <span className="font-medium">NIT:</span> {entity.nit}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 mx-8">
                    <div>
                      <span className="font-medium">Tipo:</span> {entity.type}
                    </div>
                    <div>
                      <span className="font-medium">Dirección:</span>{" "}
                      {entity.address}
                    </div>
                    {entity.city && (
                      <div>
                        <span className="font-medium">Ciudad:</span>{" "}
                        {entity.city}
                      </div>
                    )}
                  </div>

                  <div className="mr-4">
                    <div>
                      <span className="font-medium">Correo:</span>{" "}
                      {entity.email}
                    </div>
                    <div>
                      <span className="font-medium">Celular:</span>{" "}
                      {entity.phone}
                    </div>
                    {entity.website && (
                      <div>
                        <span className="font-medium">Página WEB:</span>{" "}
                        {entity.website}
                      </div>
                    )}
                  </div>

                  <div>
                    <Button
                      variant="ghost"
                      className="rounded-full bg-yellow-100 hover:bg-yellow-200 p-3"
                      onClick={() => handleEditEntity(entity.id)}
                      disabled={isPending}
                    >
                      <Edit className="h-5 w-5 text-yellow-500" />
                    </Button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
