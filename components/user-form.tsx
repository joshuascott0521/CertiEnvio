"use client"

import { userService, userTypeService } from "@/services/api"
import { User, UserType } from "@/types"
import { useRouter } from "next/navigation"
import React, { FormEvent, useEffect, useState, useTransition } from "react"
import SectionHeader from "./ui/SectionHeader"
import { FloatingLabel } from "./ui/FloatingLabel"
import { useToast } from "@/hooks/use-toast"
import { Button } from "./ui/button"


interface UserFormProps {
    isEditing?: boolean
    userData?: User
}

export function UserForm({ isEditing = false, userData }: UserFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast()
    const [formData, setFormData] = useState<User>({
        Id: "",
        Documento: "",
        Nombre: "",
        TipoUsuId: "",
        TipoUsuarioNombre: "",
        Role: "",
        Email: "",
        Celular: "",
        Estado: "",
        Password: "",
        VerifyPassword: ""
    });

    const handleCancel = () => {
        startTransition(() => {
            router.push("/dashboard/usuario")
        })
    }

    const handleChange = (field: keyof User, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    useEffect(() => {
        if (isEditing && userData) {
            setFormData({
                ...userData,
                Password: "",
                VerifyPassword: ""
            });
        }
    }, [isEditing, userData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const response = isEditing
                ? await userService.updateProfile(
                    {
                        Id: formData.Id,
                        Documento: formData.Documento,
                        Nombre: formData.Nombre,
                        TipoUsuId: formData.TipoUsuId,
                        Email: formData.Email,
                        Celular: formData.Celular,
                        Estado: formData.Estado
                    }
                )
                : await userService.createProfile(
                    {
                        Email: formData.Email,
                        Documento: formData.Documento,
                        Nombre: formData.Nombre,
                        TipoUsuId: formData.TipoUsuId,
                        Password: formData.Password,
                        VerifyPassword: formData.VerifyPassword,
                        Celular: formData.Celular
                    }
                );
            console.log("Respuesta al crear usuario", response)
            if (!response.success) {
                throw new Error(response.error);
            }
            toast({
                variant: "success",
                title: "Éxito",
                description: "El usuario fue guardado correctamente"
            })

            startTransition(() => {
                router.push("/dashboard/usuarios");
            });
        } catch (error: any) {
            console.error("Error al guardar la entidad:", error);
            toast({
                variant: "error",
                title: "Error al guardar",
                description: error.message || "Ocurrió un error inesperado.",
            })
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <SectionHeader title="Registro de Usuarios" subtitle="Datos del Usuario" />
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <FloatingLabel id="nombre" className="w-full max-w-lg" label="Nombre" value={formData.Nombre} onChange={(e) => handleChange("Nombre", e.target.value)} />
                    <FloatingLabel id="identificacion" className="w-full max-w-lg" label="No. Identificación" value={formData.Documento} onChange={(e) => handleChange("Documento", e.target.value)} />
                    <FloatingLabel id="celular" className="w-full max-w-lg" label="Celular" value={formData.Celular} onChange={(e) => handleChange("Celular", e.target.value)} />
                    <FloatingLabel id="email" className="w-full max-w-lg" label="Email" value={formData.Email} onChange={(e) => handleChange("Email", e.target.value)} />
                    <div className="col-span-full flex justify-center md:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            className="bg-gray-400 hover:bg-gray-500 text-white border-none"
                            onClick={handleCancel}
                            disabled={isSaving || isPending}
                        >
                            Cancelar
                        </Button>
                        <button
                            className={`w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600`}
                        //disabled={isUpdating}
                        //onClick={actualizarDatos}
                        >
                            {/*{isUpdating ? "Guardando..." : "Guardar"}*/}
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}