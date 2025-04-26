"use client"

import { useState, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Entity } from "@/types"

interface EntityData {
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
  entityData?: Entity
}

export function EntityForm({ isEditing = false, entityData }: EntityFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState<EntityData>({
    name: "",
    nit: "",
    aplicativo: "",
    email: "",
    celular: "",
    direccion: "",
    departamento: "",
    municipio: "",
    website: "",
  })

  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [escudoFile, setEscudoFile] = useState<File | null>(null)

  const [isLoading, setIsLoading] = useState(isEditing)

  useEffect(() => {
    if (isEditing && entityData) {
      setFormData({
        name: entityData.Nombre || "",
        nit: entityData.NIT || "",
        aplicativo: entityData.NombreAplicativo || "",
        email: entityData.Email || "",
        celular: entityData.Celular || "",
        direccion: entityData.Direccion || "",
        departamento: entityData.NombreDepartamento || "",
        municipio: entityData.NombreMunicipio || "",
        website: entityData.PaginaWeb || "",
      })
      setIsLoading(false)
    }
  }, [isEditing, entityData])

  const handleChange = (field: keyof EntityData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name || "")
      formDataToSend.append('nit', formData.nit || "")
      formDataToSend.append('aplicativo', formData.aplicativo || "")
      formDataToSend.append('email', formData.email || "")
      formDataToSend.append('celular', formData.celular || "")
      formDataToSend.append('direccion', formData.direccion || "")
      formDataToSend.append('departamento', formData.departamento || "")
      formDataToSend.append('municipio', formData.municipio || "")
      formDataToSend.append('website', formData.website || "")

      if (logoFile) {
        formDataToSend.append('logo', logoFile)
      }
      if (escudoFile) {
        formDataToSend.append('escudo', escudoFile)
      }

      // Aquí enviarías formDataToSend a tu API con fetch o axios
      console.log("Formulario listo para enviar:", formDataToSend)

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
          {/* Inputs */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre Entidad</Label>
            <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} disabled={isSaving || isPending} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nit">NIT Entidad</Label>
            <Input id="nit" value={formData.nit} onChange={(e) => handleChange("nit", e.target.value)} disabled={isSaving || isPending} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aplicativo">Aplicativo</Label>
            <Select value={formData.aplicativo} onValueChange={(value) => handleChange("aplicativo", value)} disabled={isSaving || isPending}>
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
            <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} disabled={isSaving || isPending} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="celular">Celular</Label>
            <Input id="celular" value={formData.celular} onChange={(e) => handleChange("celular", e.target.value)} disabled={isSaving || isPending} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input id="direccion" value={formData.direccion} onChange={(e) => handleChange("direccion", e.target.value)} disabled={isSaving || isPending} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="departamento">Departamento</Label>
            <Input id="departamento" value={formData.departamento} onChange={(e) => handleChange("departamento", e.target.value)} disabled={isSaving || isPending} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="municipio">Municipio</Label>
            <Input id="municipio" value={formData.municipio} onChange={(e) => handleChange("municipio", e.target.value)} disabled={isSaving || isPending} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Página WEB</Label>
            <Input id="website" value={formData.website} onChange={(e) => handleChange("website", e.target.value)} disabled={isSaving || isPending} />
          </div>
        </div>

        {/* Subir Archivos */}
        <div className="flex space-x-4 mt-6">
          {/* Subir Logo */}
          <div>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setLogoFile(file);
              }}
            />
            <Button
              type="button"
              variant="outline"
              className="bg-green-500 hover:bg-green-600 text-white border-none"
              onClick={() => document.getElementById('logo-upload')?.click()}
              disabled={isSaving || isPending}
            >
              <Link2 className="mr-2 h-4 w-4" />
              Subir Logo
            </Button>
            {logoFile && <p className="text-xs text-gray-600 mt-1">{logoFile.name}</p>}
          </div>

          {/* Subir Escudo */}
          <div>
            <input
              id="escudo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setEscudoFile(file);
              }}
            />
            <Button
              type="button"
              variant="outline"
              className="bg-green-500 hover:bg-green-600 text-white border-none"
              onClick={() => document.getElementById('escudo-upload')?.click()}
              disabled={isSaving || isPending}
            >
              <Link2 className="mr-2 h-4 w-4" />
              Subir Escudo
            </Button>
            {escudoFile && <p className="text-xs text-gray-600 mt-1">{escudoFile.name}</p>}
          </div>
        </div>

        {/* Botones Finales */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button
            type="button"
            variant="outline"
            className="bg-gray-400 hover:bg-gray-500 text-white border-none"
            onClick={handleCancel}
            disabled={isSaving || isPending}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white"
            disabled={isSaving || isPending}
          >
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
      </div>
    </form>
  )
}
