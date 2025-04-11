"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { EntityForm } from "@/components/entity-form"

// Datos de ejemplo para simular la carga de una entidad
const entityData = {
  id: 1,
  name: "Alcaldía de Baranca",
  nit: "900.000.000",
  aplicativo: "Gestión PQR+",
  email: "Baranca@prueba.com",
  celular: "3003334455",
  direccion: "Cra 19 #16-47",
  departamento: "Atlantico",
  municipio: "Baranca",
  website: "www.baranca.com.co",
}

export default function EditarEntidadPage({ params }) {
  const [loading, setLoading] = useState(true)
  const [entity, setEntity] = useState(null)

  useEffect(() => {
    // Aquí se cargarían los datos de la entidad desde una API
    // Simulamos una carga con setTimeout
    const loadEntity = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setEntity(entityData)
      setLoading(false)
    }

    loadEntity()
  }, [params.id])

  if (loading) {
    return <div className="p-6">Cargando...</div>
  }

  return (
    <div>
      <DashboardHeader title="Bienvenido a Envia+" breadcrumb="Envia+ / Entidades / Editar" />
      <div className="p-6">
        <EntityForm isEditing entityData={entity} />
      </div>
    </div>
  )
}

