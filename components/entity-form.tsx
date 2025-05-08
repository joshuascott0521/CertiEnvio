"use client"

import { useState, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Aplication, Departamento, Entity, Municipio } from "@/types"
import { aplicationService, regionService } from "@/services/api"
import { entityService } from "@/services/api"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"



interface EntityFormProps {
  isEditing?: boolean
  entityData?: Entity
}

export function EntityForm({ isEditing = false, entityData }: EntityFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState<Entity>({
    Id: 0,
    Nombre: "",
    NIT: "",
    AplicativoId: 0,
    NombreAplicativo: "",
    Direccion: "",
    Email: "",
    Celular: "",
    PaginaWeb: "",
    DepartamentoCod: 0,
    NombreDepartamento: "",
    MunicipioCod: 0,
    NombreMunicipio: "",
    Estado: 0,
    Imagenes: [],
  })

  const [logoFile, setLogoFile] = useState<File | undefined>(undefined);

  const [escudoFile, setEscudoFile] = useState<File | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(isEditing)

  const [aplicativo, setAplicativo] = useState<Aplication[]>([]);
  const [departamento, setDepartamento] = useState<Departamento[]>([]);
  const [municipio, setMunicipio] = useState<Municipio[]>([]);
  const [toastOpen, setToastOpen] = useState(false)
  const [errorToastOpen, setErrorToastOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("") 
  const { toast } = useToast()





  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const aplicationRes = await aplicationService.getAll();
        if (!aplicationRes.success) throw new Error(aplicationRes.error);

        const departamentoRes = await regionService.getDepartamento();
        if (!departamentoRes.success) throw new Error(departamentoRes.error);

        setAplicativo(aplicationRes.data);
        setDepartamento(departamentoRes.data);

        if (isEditing && entityData) {
          setFormData({
            Id: entityData.Id,
            Nombre: entityData.Nombre || "",
            NIT: entityData.NIT || "",
            AplicativoId: entityData.AplicativoId || 0,
            NombreAplicativo: entityData.NombreAplicativo || "",
            Direccion: entityData.Direccion || "",
            Email: entityData.Email || "",
            Celular: entityData.Celular || "",
            PaginaWeb: entityData.PaginaWeb || "",
            DepartamentoCod: entityData.DepartamentoCod || 0,
            NombreDepartamento: entityData.NombreDepartamento || "",
            MunicipioCod: entityData.MunicipioCod || 0,
            NombreMunicipio: entityData.NombreMunicipio || "",
            Estado: entityData.Estado || 1,
            Imagenes: entityData.Imagenes || []
          });

          if (entityData.DepartamentoCod) {
            const municipioRes = await regionService.getMunicipio(entityData.DepartamentoCod);
            console.log("Municipios recibidos:", municipioRes);
            if (municipioRes.success) {
              setMunicipio(municipioRes.data);
            } else {
              console.error("Error al obtener municipios:", municipioRes.error);
              setMunicipio([]);
            }
          }
        }

      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);


  const handleChange = (field: keyof Entity, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = isEditing
        ? await entityService.update(
          formData.Id,
          {
            Id: formData.Id,
            Nombre: formData.Nombre,
            NIT: formData.NIT,
            AplicativoId: formData.AplicativoId,
            Direccion: formData.Direccion,
            Email: formData.Email,
            Celular: formData.Celular,
            PaginaWeb: formData.PaginaWeb,
            DepartamentoCod: formData.DepartamentoCod,
            MunicipioCod: formData.MunicipioCod,
            Estado: formData.Estado,
          },
          logoFile,
          escudoFile
        )
        : await entityService.create(
          {
            Nombre: formData.Nombre,
            NIT: formData.NIT,
            AplicativoId: formData.AplicativoId,
            Direccion: formData.Direccion,
            Email: formData.Email,
            Celular: formData.Celular,
            PaginaWeb: formData.PaginaWeb,
            DepartamentoCod: formData.DepartamentoCod,
            MunicipioCod: formData.MunicipioCod,
            Estado: formData.Estado,
          },
          logoFile,
          escudoFile
        );

      console.log("📦 Respuesta al crear entidad:", response);
      if (!response.success) {
        throw new Error(response.error);
      }

      toast({
        variant: "success",
        title: "Éxito",
        description: "La entidad fue guardada correctamente",
      })
      
      startTransition(() => {
        router.push("/dashboard/entidades");
      });
    } catch (error: any) {
      console.error("Error al guardar la entidad:", error);
      setErrorMessage(error.message || "Error desconocido")
      toast({
        variant: "error",
        title: "Error al guardar",
        description: error.message || "Ocurrió un error inesperado.",
      })
      
    } finally {
      setIsSaving(false);
    }
  };




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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Inputs */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre Entidad</Label>
            <Input id="name" value={formData.Nombre} onChange={(e) => handleChange("Nombre", e.target.value)} disabled={isSaving || isPending} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nit">NIT Entidad</Label>
            <Input id="nit" value={formData.NIT} onChange={(e) => handleChange("NIT", e.target.value)} disabled={isSaving || isPending} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aplicativo">Aplicativo</Label>
            <Select
              value={formData.AplicativoId?.toString() ?? ""}
              onValueChange={(value) => {
                const id = Number(value);
                const app = aplicativo.find((a) => a.Id === id);
                if (app) {
                  setFormData((prev) => ({
                    ...prev,
                    AplicativoId: app.Id,
                    NombreAplicativo: app.Nombre
                  }));
                }
              }}
              disabled={isSaving || isPending}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Aplicativo" />
              </SelectTrigger>
              <SelectContent>
                {aplicativo.map((app) => (
                  <SelectItem key={app.Id} value={app.Id.toString()}>
                    {app.Nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.Email} onChange={(e) => handleChange("Email", e.target.value)} disabled={isSaving || isPending} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="celular">Celular</Label>
            <Input id="celular" value={formData.Celular} onChange={(e) => handleChange("Celular", e.target.value)} disabled={isSaving || isPending} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input id="direccion" value={formData.Direccion} onChange={(e) => handleChange("Direccion", e.target.value)} disabled={isSaving || isPending} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="departamento">Departamento</Label>
            <Select
              value={formData.DepartamentoCod?.toString() ?? ""}
              onValueChange={async (value) => {
                const id = Number(value);
                const dep = departamento.find((a) => a.Cod === id);
                if (dep) {
                  setFormData((prev) => ({
                    ...prev,
                    DepartamentoCod: dep.Cod,
                    NombreDepartamento: dep.Nombre,
                    MunicipioCod: 0,
                    NombreMunicipio: "",
                  }));

                  // 🔥 Cargar municipios correctamente
                  const municipioRes = await regionService.getMunicipio(dep.Cod);
                  if (municipioRes.success) {
                    setMunicipio(municipioRes.data);
                  } else {
                    console.error("Error al obtener municipios:", municipioRes.error);
                    setMunicipio([]);
                  }
                }
              }}

              disabled={isSaving || isPending}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Departamento" />
              </SelectTrigger>
              <SelectContent>
                {departamento.map((dep) => (
                  <SelectItem key={dep.Cod} value={dep.Cod.toString()}>
                    {dep.Nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="municipio">Municipio</Label>
            <Select
              value={formData.MunicipioCod ? formData.MunicipioCod.toString() : ""}
              onValueChange={(value) => {
                const cod = Number(value);
                const mun = municipio.find((m) => m.Cod === cod);
                if (mun) {
                  setFormData((prev) => ({
                    ...prev,
                    MunicipioCod: mun.Cod,
                    NombreMunicipio: mun.Nombre,
                  }));
                }
              }}
              disabled={isSaving || isPending || municipio.length === 0}
            >



              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Municipio" />
              </SelectTrigger>
              <SelectContent>
                {municipio.map((mun) => (
                  <SelectItem key={mun.Cod} value={mun.Cod.toString()}>
                    {mun.Nombre}
                  </SelectItem>
                ))}
              </SelectContent>

            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Página WEB</Label>
            <Input id="website" value={formData.PaginaWeb} onChange={(e) => handleChange("PaginaWeb", e.target.value)} disabled={isSaving || isPending} />
          </div>
          <div className="hidden md:block"></div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col items-center space-y-2">
              {formData.Imagenes?.find(img => img.TipoImg === "Logo") && (
                <img
                  src={`data:image/${formData.Imagenes.find(img => img.TipoImg === "Logo")?.Extension};base64,${formData.Imagenes.find(img => img.TipoImg === "Logo")?.ImagenBase64}`}
                  alt="Logo"
                  className="h-24 w-auto rounded shadow"
                />
              )}
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
            <div className="flex flex-col items-center space-y-2">
              {formData.Imagenes?.find(img => img.TipoImg === "Escudo") && (
                <img
                  src={`data:image/${formData.Imagenes.find(img => img.TipoImg === "Escudo")?.Extension};base64,${formData.Imagenes.find(img => img.TipoImg === "Escudo")?.ImagenBase64}`}
                  alt="Logo"
                  className="h-24 w-auto rounded shadow"
                />
              )}
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
        </div>

        {/* Subir Archivos */}


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
        {/* Toast de error */}
       
      </div>

    </form>
  )
}
