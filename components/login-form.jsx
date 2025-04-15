"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, AlertCircle } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validación de email
    if (!email) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El correo no es válido";
    }

    // Validación de contraseña
    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(
        "https://apienviaplusdev.creapptech.com/Usuario/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: email,
            Password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Si llegamos aquí, el login fue exitoso
      console.log("Login exitoso:", data);

      // Guardar token o datos de usuario si es necesario
      if (rememberMe && data.token) {
        localStorage.setItem("authToken", data.token);
      }

      // Redirigir al dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error de login:", error);
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "Error al iniciar sesión. Intente nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-[rgba(255,255,255,0.6)] text-white border-none backdrop-blur-sm rounded-[50px] h-[500px]  ">
      <CardHeader className="p-0 pt-4 flex justify-center items-center">
        <CardTitle className="p-0 m-0">
          <img
            src="/logo3.png"
            alt="Logo CertiEnvíos"
            className="w-[250px] h-auto object-contain"
          />
        </CardTitle>
      </CardHeader>

      <CardContent>
        {errors.general && (
          <Alert
            variant="destructive"
            className="mb-4 bg-red-500/20 text-white border-red-500"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.general}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">CORREO</Label>
            <div className="relative">
              <Input
                id="email"
                placeholder="usuario@ejemplo.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-[80%] mx-auto pl-9 bg-sky-600/50 border-sky-500 text-white placeholder:text-sky-300 ${
                  errors.email ? "border-red-400" : ""
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">PASSWORD</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-[80%] mx-auto pl-9 bg-sky-600/50 border-sky-500 text-white ${
                  errors.password ? "border-red-400" : ""
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                className="border-sky-500 data-[state=checked]:bg-sky-500"
              />
              <label htmlFor="remember" className="text-sm">
                RECORDAR ME!
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm hover:underline">
              OLVIDÉ MI CONTRASEÑA?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
