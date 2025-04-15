"use client";

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FloatingLabel } from "@/components/ui/FloatingLabel"
import axios from "axios";
import { use, useState } from "react";


export default function UsuarioPage() {
  const [nombre, setNombre] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <DashboardHeader title="Usuario" breadcrumb="Envia+ / Usuario" />
      <div className="p-4 max-w-screen-xl mx-auto bg-gray-50">
        <h2 className="text-2xl font-bold">Mi Cuenta</h2>
        <Card className="rounded-xl p-2 bg-white shadow mt-4">
          <CardContent>
            <h3 className="text-lg font-bold pb-2 border-b border-gray-300">Datos del usuario</h3>
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
            <h3 className="text-lg font-bold pb-2 border-b border-gray-300">Cambiar Contraseña</h3>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              <FloatingLabel
                id="password"
                label="Contraseña Actual"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <FloatingLabel
                id="password"
                label="Contraseña Actual"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <FloatingLabel
                id="password"
                label="Contraseña Actual"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
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
    </div>
  )
}

