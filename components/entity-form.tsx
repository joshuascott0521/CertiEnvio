"use client"

import type React from "react"

import { useState, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EntityData {
  id?: number
  name?: string
  nit?: string
  aplicativo?: string
  email?: string
  celular?: string
  direccion?: string
  departamento?: string
  municipio?: string
  website?: string
}

interface EntityFormProps {
  isEditing?: boolean
  entityData?: EntityData
}

export function EntityForm({ isEditing = false, entityData = {} }: EntityFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<EntityData>({
    name: entityData.name || "",
    nit: entityData.nit || "",
    aplicativo: entityData.aplicativo || "",
    email: entityData.email || "",
    celular: entityData.celular || "",
    direccion: entityData.direccion || "",
    departamento: entityData.departamento || "",
    municipio: entityData.municipio || "",
    website: entityData.website || "",
  })

  // Simular carga de datos cuando se está editando
  const [isLoading, setIsLoading] = useState(isEditing)

  useEffect(() => {
    if (isEditing) {
      // Simular carga de datos de la API
      const timer = setTimeout(() => {
        setFormData({
          name: entityData.name || "Alcaldía de Baranca",
          nit: entityData.nit || "900.000.000",
          aplicativo: entityData.aplicativo || "Gestión PQR+",
          email: entityData.email || "Baranca@prueba.com",
          celular: entityData.celular || "3003334455",
          direccion: entityData.direccion || "Cra 19 #16-47",
          departamento: entityData.departamento || "Atlantico",
          municipio: entityData.municipio || "Baranca",
          website: entityData.website || "www.baranca.com.co",
        })
        setIsLoading(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isEditing, entityData])

  const handleChange = (field: keyof EntityData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Simular guardado en la API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Guardando entidad:", formData)

      // Navegar a la página de entidades después de guardar
      startTransition(() => {
        router.push("/dashboard/entidades")
      })
    } catch (error) {
      console.error("Error al guardar:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    startTransition(() => {
      router.push("/dashboard/entidades")
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-6 w-6 rounded-full border-2 border-t-transparent border-green-500 animate-spin"></div>
          <p>Cargando información de la entidad...</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Registro de Entidad</h2>

        <div className="border-b pb-2 mb-6">
          <h3 className="text-lg font-medium">Datos de la entidad</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre Entidad</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              disabled={isSaving || isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nit">NIT Entidad</Label>
            <Input
              id="nit"
              value={formData.nit}
              onChange={(e) => handleChange("nit", e.target.value)}
              disabled={isSaving || isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aplicativo">Aplicativo</Label>
            <Select
              value={formData.aplicativo}
              onValueChange={(value) => handleChange("aplicativo", value)}
              disabled={isSaving || isPending}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar aplicativo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gestión PQR+">Gestión PQR+</SelectItem>
                <SelectItem value="PQR+">PQR+</SelectItem>
                <SelectItem value="Gestión Legal+">Gestión Legal+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={isSaving || isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="celular">
              Celular <span className="text-red-500">*</span>
            </Label>
            <Input
              id="celular"
              value={formData.celular}
              onChange={(e) => handleChange("celular", e.target.value)}
              disabled={isSaving || isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              value={formData.direccion}
              onChange={(e) => handleChange("direccion", e.target.value)}
              disabled={isSaving || isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="departamento">Departamento</Label>
            <Select
              value={formData.departamento}
              onValueChange={(value) => handleChange("departamento", value)}
              disabled={isSaving || isPending}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Atlantico">Atlantico</SelectItem>
                <SelectItem value="Bolivar">Bolivar</SelectItem>
                <SelectItem value="Magdalena">Magdalena</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="municipio">Municipio</Label>
            <Select
              value={formData.municipio}
              onValueChange={(value) => handleChange("municipio", value)}
              disabled={isSaving || isPending}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar municipio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Baranca">Baranca</SelectItem>
                <SelectItem value="Soledad">Soledad</SelectItem>
                <SelectItem value="Malambo">Malambo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Página WEB</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)}
              disabled={isSaving || isPending}
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-6">
          <Button
            type="button"
            variant="outline"
            className="bg-green-500 hover:bg-green-600 text-white border-none"
            disabled={isSaving || isPending}
          >
            <Link2 className="mr-2 h-4 w-4" />
            Subir Logo
          </Button>

          <Button
            type="button"
            variant="outline"
            className="bg-green-500 hover:bg-green-600 text-white border-none"
            disabled={isSaving || isPending}
          >
            <Link2 className="mr-2 h-4 w-4" />
            Subir Escudo
          </Button>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          className="bg-gray-400 hover:bg-gray-500 text-white border-none"
          onClick={handleCancel}
          disabled={isSaving || isPending}
        >
          Cancelar
        </Button>

        <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white" disabled={isSaving || isPending}>
          {isSaving ? (
            <div className="flex items-center">
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Guardando...
            </div>
          ) : (
            "Guardar"
          )}
        </Button>
      </div>
    </form>
  )
}
