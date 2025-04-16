"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingLabel } from "@/components/ui/FloatingLabel";
import axios from "axios";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    const obtenerUsuario = async () => {
      setLoading(true);
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
        // Set sample data for preview/development
        setNombre("Usuario de Prueba");
        setIdentificacion("123456789");
        setCelular("3001234567");
        setEmail("usuario@ejemplo.com");
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

      const response = await axios.put(
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

      const response = await axios.put(
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

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Usuario" breadcrumb="Envia+ / Usuario" />
      <main className="flex-grow bg-gray-50">
        <div className="p-4 max-w-screen-xl w-full mx-auto">
          <h2 className="text-2xl font-bold">Mi Cuenta</h2>
          <Card className="rounded-xl p-2 bg-white shadow mt-4">
            <CardContent className="p-2">
              <h3 className="text-lg font-bold pb-2 border-b-2 border-gray-300">
                Datos del usuario
              </h3>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                <FloatingLabel
                  id="nombre"
                  className="w-full md:w-[500px]"
                  label="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <FloatingLabel
                  id="identificacion"
                  className="w-full md:w-[550px]"
                  label="No. Identificación"
                  value={identificacion}
                  onChange={(e) => setIdentificacion(e.target.value)}
                />
                <FloatingLabel
                  id="celular"
                  className="w-full md:w-[500px]"
                  label="Celular"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                />
                <FloatingLabel
                  id="email"
                  className="w-full md:w-[550px]"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="col-span-full flex justify-end">
                  <button
                    className={`bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 ${
                      isUpdating ? "opacity-50 cursor-not-allowed" : ""
                    }`}
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
            <CardContent className="p-2">
              <h3 className="text-lg font-bold pb-2 border-b-2 border-gray-300">
                Cambiar Contraseña
              </h3>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                <FloatingLabel
                  id="actual"
                  className="w-full md:w-[550px]"
                  label="Contraseña Actual"
                  type="password"
                  value={actualPassword}
                  onChange={(e) => setActualPassword(e.target.value)}
                />
                <div className="hidden md:block" />
                <FloatingLabel
                  id="new"
                  className="w-full md:w-[550px]"
                  label="Contraseña Nueva"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <FloatingLabel
                  id="confirm"
                  className="w-full md:w-[550px]"
                  label="Confirmar Contraseña"
                  type="password"
                  value={confirNewPassword}
                  onChange={(e) => setConfirNewPassword(e.target.value)}
                />
                <div className="col-span-full flex justify-end">
                  <button
                    className={`bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 ${
                      isUpdating ? "opacity-50 cursor-not-allowed" : ""
                    }`}
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
