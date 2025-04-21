"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingLabel } from "@/components/ui/FloatingLabel";
import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"

export default function UsuarioPage() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [nombre, setNombre] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [actualPassword, setActualPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirNewPassword, setConfirNewPassword] = useState("");
  const [tipoUsuId, setTipoUsuId] = useState("");
  const [estado, setEstado] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const obtenerUsuario = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) return;

        const response = await axios.get(
          `https://apienviaplusdev.creapptech.com/Usuario/Get/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        setNombre(data.Nombre || "");
        setIdentificacion(data.Documento || "");
        setCelular(data.Celular || "");
        setEmail(data.Email || "");
        setTipoUsuId(data.TipoUsuId || "");
        setEstado(data.Estado || "");
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuario();
  }, []);

  const actualizarDatos = async () => {
    try {
      setIsUpdating(true);
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) return;

      const payload = {
        Id: userId,
        Nombre: nombre,
        Documento: identificacion,
        Celular: celular,
        Email: email,
        TipoUsuId: tipoUsuId,
        Estado: estado,
      };

      await axios.put(
        `https://apienviaplusdev.creapptech.com/Usuario/Update`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error al actualizar datos:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const cambioPassword = async () => {
    try {
      setIsUpdating(true);
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) return;

      const payload = {
        Id: userId,
        PasswordAntigua: actualPassword,
        PasswordNueva: newPassword,
        PasswordConfirmacion: confirNewPassword,
      };

      await axios.put(
        `https://apienviaplusdev.creapptech.com/Usuario/UpdatePassword`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setActualPassword("");
      setNewPassword("");
      setConfirNewPassword("");
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <DashboardHeader title="Usuario" breadcrumb="Envia+ / Usuario" />
        <main className="flex-grow bg-gray-50">
          <div className="p-4 max-w-screen-xl w-full mx-auto">
            <h2 className="text-2xl font-bold mb-4">Mi Cuenta</h2>

            <Card className="rounded-xl p-4 bg-white shadow mt-4">
              <CardContent className="py-2 px-4">
                <Skeleton className="h-6 w-1/4 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-9 w-full rounded-md" />
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <Skeleton className="h-9 w-32 rounded-md" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl p-4 bg-white shadow mt-4">
              <CardContent className="py-2 px-4">
                <Skeleton className="h-6 w-1/4 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-9 w-full rounded-md" />
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <Skeleton className="h-9 w-32 rounded-md" />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Usuario" breadcrumb="Envia+ / Usuario" />
      <main className="flex-grow bg-gray-50">
        <div className="p-4 max-w-screen-xl w-full mx-auto">
          <h2 className="text-2xl font-bold">Mi Cuenta</h2>
          <Card className="rounded-xl p-2 bg-white shadow mt-4">
            <CardContent className="py-2 px-8">
              <h3 className="text-lg font-bold pb-2 border-b-2 border-gray-300">
                Datos del usuario
              </h3>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                <FloatingLabel id="nombre" className="w-full max-w-lg" label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <FloatingLabel id="identificacion" className="w-full max-w-lg" label="No. Identificación" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} />
                <FloatingLabel id="celular" className="w-full max-w-lg" label="Celular" value={celular} onChange={(e) => setCelular(e.target.value)} />
                <FloatingLabel id="email" className="w-full max-w-lg" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className="col-span-full flex justify-center md:justify-end">
                  <button
                    className={`w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isUpdating}
                    onClick={actualizarDatos}
                  >
                    {isUpdating ? "Guardando..." : "Guardar"}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-xl p-2 bg-white shadow mt-4">
            <CardContent className="py-2 px-8">
              <h3 className="text-lg font-bold pb-2 border-b-2 border-gray-300">
                Cambiar Contraseña
              </h3>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                <FloatingLabel id="actual" className="w-full max-w-lg" label="Contraseña Actual" type="password" value={actualPassword} onChange={(e) => setActualPassword(e.target.value)} />
                <div className="hidden md:block" />
                <FloatingLabel id="new" className="w-full max-w-lg" label="Contraseña Nueva" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <FloatingLabel id="confirm" className="w-full max-w-lg" label="Confirmar Contraseña" type="password" value={confirNewPassword} onChange={(e) => setConfirNewPassword(e.target.value)} />
                <div className="col-span-full flex justify-center md:justify-end">
                  <button
                    className={`w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isUpdating}
                    onClick={cambioPassword}
                  >
                    {isUpdating ? "Guardando..." : "Guardar"}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
