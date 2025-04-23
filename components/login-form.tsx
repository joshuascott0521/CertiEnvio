"use client";

import type React from "react";
import Cookies from "js-cookie";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FormErrors } from "../types";
import { authService } from "../services/api";
import { useAuth } from "@/contexts/auth-context";

type Props = {
  FormErrors: FormErrors;
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  const { login } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const success = await login(email, password, rememberMe);

      if (success) {
        startTransition(() => {
          router.push(redirectPath);
        });
        console.log("💗💗💗💗", success);
      } else {
        setErrors({
          general: "Credenciales inválidas. Por favor, intente nuevamente.",
        });
      }
    } catch (error: any) {
      const message =
        error?.message || "Error al iniciar sesión. Intente nuevamente.";
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-[#fefefe] bg-opacity-70 border-none backdrop-blur-sm rounded-3xl p-6">
      <CardHeader className="p-0 pt-0 flex justify-center items-center">
        <CardTitle className="p-0 m-0">
          <img
            src="/CertiLogo.png"
            alt="Logo CertiEnvíos"
            className="w-[250px] h-auto object-contain pb-2"
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
            <Label htmlFor="email" className="text-login">
              CORREO
            </Label>
            <div className="relative">
              <Input
                id="email"
                placeholder="usuario@ejemplo.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-5 bg-white bg-opacity-40 border-none rounded-full text-login placeholder:text-login ${
                  errors.email ? "border-red-400" : ""
                }`}
                disabled={loading || isPending}
              />
            </div>
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-login">
              PASSWORD
            </Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-5 bg-white bg-opacity-40 border-none rounded-full text-login ${
                  errors.password ? "border-red-400" : ""
                }`}
                disabled={loading || isPending}
              />
            </div>
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-row items-center space-x-1 gap-1 flex-wrap sm:flex-nowrap">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                className="bg-white border-login data-[state=checked]:bg-login"
                disabled={loading || isPending}
              />
              <label
                htmlFor="remember"
                className="font-montserrat font-semibold text-xs text-login"
              >
                RECORDAR ME!
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="font-montserrat font-semibold text-xs text-login hover:text-loginHover hover:underline"
            >
              OLVIDÉ MI CONTRASEÑA?
            </Link>
          </div>
          <div className="pt-6">
            <Button
              type="submit"
              className="w-[150px] bg-orange-500 hover:bg-orange-600 text-white rounded-full mx-auto block"
              disabled={loading || isPending}
            >
              {loading || isPending ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Ingresando...
                </div>
              ) : (
                "Ingresar"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
