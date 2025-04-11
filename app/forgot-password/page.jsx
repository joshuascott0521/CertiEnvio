import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-sky-700/80 text-white border-none">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">Recuperar Contraseña</CardTitle>
            <CardDescription className="text-sky-100">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">CORREO</Label>
                <Input
                  id="email"
                  placeholder="usuario@ejemplo.com"
                  type="email"
                  required
                  className="bg-sky-600/50 border-sky-500 text-white placeholder:text-sky-300"
                />
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Enviar Instrucciones
              </Button>
              <div className="text-center">
                <Link href="/" className="inline-flex items-center text-sm hover:underline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al inicio de sesión
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <footer className="fixed bottom-4 text-center text-white text-sm">
        ©️ eAppTech - Somos una empresa líder en soluciones integrales basadas en tecnología e innovación.
      </footer>
    </main>
  )
}

