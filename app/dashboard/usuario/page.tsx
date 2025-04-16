"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingLabel } from "@/components/ui/FloatingLabel";
import axios from "axios";
import { useState, useEffect } from "react";

export default function UsuarioPage() {
  const [nombre, setNombre] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerUsuario = async () => {
      setLoading(true);
      try {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("authToken");

          if (!token) {
            console.log("No authentication token found");
            // Set sample data for preview/development
            setNombre("");
            setIdentificacion("");
            setCelular("");
            setEmail("");
            setLoading(false);
            return;
          }

          const response = await axios.get(
            "https://apienviaplusdev.creapptech.com/Usuario/Get",
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
        }
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

  return (
    <div>
      <DashboardHeader title="Usuario" breadcrumb="Envia+ / Usuario" />
      {loading && (
        <div className="p-4 max-w-screen-xl mx-auto bg-gray-50 flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
        </div>
      )}
      {!loading && (
        <div className="p-4 max-w-screen-xl mx-auto bg-gray-50">
          <h2 className="text-2xl font-bold">Mi Cuenta</h2>
          <Card className="rounded-xl p-2 bg-white shadow mt-4">
            <CardContent>
              <h3 className="text-lg font-bold pb-2 border-b border-gray-300">
                Datos del usuario
              </h3>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                <FloatingLabel
                  id="nombre"
                  label="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <FloatingLabel
                  id="identificacion"
                  label="No. Identificación"
                  value={identificacion}
                  onChange={(e) => setIdentificacion(e.target.value)}
                />
                <FloatingLabel
                  id="celular"
                  label="Celular"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                />
                <FloatingLabel
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Guardar
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-xl p-2 bg-white shadow mt-4">
            <CardContent>
              <h3 className="text-lg font-bold pb-2 border-b border-gray-300">
                Cambiar Contraseña
              </h3>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                <FloatingLabel
                  id="password"
                  label="Contraseña Actual"
                  type="password"
                  value=""
                  onChange={() => {}}
                />
                <FloatingLabel
                  id="newPassword"
                  label="Nueva Contraseña"
                  type="password"
                  value=""
                  onChange={() => {}}
                />
                <FloatingLabel
                  id="confirmPassword"
                  label="Confirmar Contraseña"
                  type="password"
                  value=""
                  onChange={() => {}}
                />
                <div>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Guardar
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
