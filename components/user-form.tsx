"use client"

import { userService, userTypeService } from "@/services/api"
import { User, UserType } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

interface UserFormProps {
    isEditing?: boolean
    userData?: User
}

export function UserForm({ isEditing = false, userData }: UserFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isSaving, setIsSaving] = useState(false);
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
    });

    const [tipoUsuario, setTipoUsuario] = useState<UserType[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const tipoRes = await userTypeService.getAll();
                if (!tipoRes.success) throw new Error(tipoRes.error);
                setTipoUsuario(tipoRes.data);

                if (userData) {
                    setFormData({
                        Id: userData.Id || "",
                        Documento: userData.Documento || "",
                        Nombre: userData.Nombre || "",
                        TipoUsuId: userData.TipoUsuId || "",
                        TipoUsuarioNombre: userData.TipoUsuarioNombre || "",
                        Role: userData.Role || "",
                        Email: userData.Email || "",
                        Celular: userData.Celular || "",
                        Estado: userData.Estado || "",
                    })
                }
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
            }
        }
        loadData();
        console.log(tipoUsuario)
        console.log(formData)
    }, []);

    return(
        <div className="p-6">
            <h2>Probando Edicion</h2>
        </div>
    )
}