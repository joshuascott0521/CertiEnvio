"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { EntityForm } from "@/components/entity-form"
import { entityService } from "@/services/api"
import { Entity } from "@/types"
import { useParams } from "next/navigation"


export default function EditarEntidadPage() {
  const params = useParams();
  const id = Number(params?.id);

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Entity | null>(null)

  useEffect(() => {
    setLoading(true);
    const loadEntity = async () => {
      try{
        const {success, data, error} = await entityService.getById(id);
        if(!success) throw new Error(error);
        setData(data);
      }catch(error){
        console.error("Error al obtener datos de la entidad", error);
      }finally{
        setLoading(false)
      }
    }

    if(id) loadEntity();
  }, [id])

  if (loading) {
    return <div className="p-6">Cargando...</div>
  }

  return (
    <div>
      <DashboardHeader title="Bienvenido a CertiEnvíos" breadcrumb="CertiEnvíos / Entidades / Editar" />
      <div className="p-6">
        <EntityForm isEditing entityData={data || undefined} />
      </div>
    </div>
  )
}
