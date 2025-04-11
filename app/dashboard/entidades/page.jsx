"use client"

import { useRouter } from "next/navigation"
import { Building2, Edit, PlusCircle } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"

const entities = [
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
]

export default function EntidadesPage() {
  const router = useRouter()

  const handleAddEntity = () => {
    router.push("/entidad/nueva")
  }

  const handleEditEntity = (id) => {
    router.push(`/entidad/editar/${id}`)
  }

  return (
    <div>
      <DashboardHeader title="Entidades" breadcrumb="Envia+ / Entidades" />
      <div className="p-6">
        <Button className="mb-4 bg-green-500 hover:bg-green-600 text-white" onClick={handleAddEntity}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Agregar
        </Button>

        <div className="space-y-4">
          {entities.map((entity) => (
            <div key={entity.id} className="border rounded-lg p-4 flex justify-between items-center">
              <div className="flex">
                <div className="mr-4">
                  <Building2 className="h-10 w-10 text-gray-500" />
                </div>
                <div>
                  {entity.id !== 1 && <div className="text-sm text-gray-500">Id: {entity.id}</div>}
                  <div>
                    <span className="font-medium">Entidad:</span> {entity.name}
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
                  <span className="font-medium">Dirección:</span> {entity.address}
                </div>
                {entity.city && (
                  <div>
                    <span className="font-medium">Ciudad:</span> {entity.city}
                  </div>
                )}
              </div>

              <div className="mr-4">
                <div>
                  <span className="font-medium">Correo:</span> {entity.email}
                </div>
                <div>
                  <span className="font-medium">Celular:</span> {entity.phone}
                </div>
                {entity.website && (
                  <div>
                    <span className="font-medium">Página WEB:</span> {entity.website}
                  </div>
                )}
              </div>

              <div>
                <Button
                  variant="ghost"
                  className="rounded-full bg-yellow-100 hover:bg-yellow-200 p-3"
                  onClick={() => handleEditEntity(entity.id)}
                >
                  <Edit className="h-5 w-5 text-yellow-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

