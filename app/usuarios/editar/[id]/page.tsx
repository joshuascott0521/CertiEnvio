"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { UserForm } from "@/components/user-form";
import { userService } from "@/services/api";
import { User } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarUsuarioPage() {
    const params = useParams();
    const id = params?.id as string;

    const [data, setData] = useState<User | null>(null)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const { success, data, error } = await userService.getById(id);
                if (!success) throw new Error(error);
                setData(data);
            } catch (error) {
                console.error("Error al obtener datos del usuario", error);
            }
        }
        if(id) loadUser();
    }, [id])

    return(
        <div>
            <DashboardHeader title="Bienvenido a CertiEnvíos" breadcrumb="CertiEnvíos / Usuarios / Editar"/>
            <div className="p-6">
                <UserForm isEditing userData={data || undefined}/>
            </div>
        </div>
    )
}