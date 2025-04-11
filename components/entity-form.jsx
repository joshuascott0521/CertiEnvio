"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EntityForm({ isEditing = false, entityData = {} }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
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

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar la entidad
    console.log("Guardando entidad:", formData)
    router.push("/dashboard/entidades")
  }

  const handleCancel = () => {
    router.push("/dashboard/entidades")
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
            <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nit">NIT Entidad</Label>
            <Input id="nit" value={formData.nit} onChange={(e) => handleChange("nit", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aplicativo">Aplicativo</Label>
            <Select value={formData.aplicativo} onValueChange={(value) => handleChange("aplicativo", value)}>
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
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="celular">
              Celular <span className="text-red-500">*</span>
            </Label>
            <Input id="celular" value={formData.celular} onChange={(e) => handleChange("celular", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              value={formData.direccion}
              onChange={(e) => handleChange("direccion", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="departamento">Departamento</Label>
            <Select value={formData.departamento} onValueChange={(value) => handleChange("departamento", value)}>
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
            <Select value={formData.municipio} onValueChange={(value) => handleChange("municipio", value)}>
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
            <Input id="website" value={formData.website} onChange={(e) => handleChange("website", e.target.value)} />
          </div>
        </div>

        <div className="flex space-x-4 mt-6">
          <Button type="button" variant="outline" className="bg-green-500 hover:bg-green-600 text-white border-none">
            <Link2 className="mr-2 h-4 w-4" />
            Subir Logo
          </Button>

          <Button type="button" variant="outline" className="bg-green-500 hover:bg-green-600 text-white border-none">
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
        >
          Cancelar
        </Button>

        <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
          Guardar
        </Button>
      </div>
    </form>
  )
}

