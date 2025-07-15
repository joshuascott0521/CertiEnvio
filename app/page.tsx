import { LoginForm } from "@/components/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CertiEnvíos | Login",
  description: "Iniciar sesión en el sistema de envío de correos CertiEnvíos",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[url('/Login.webp')] bg-cover bg-center from-sky-400 to-sky-600 flex items-center justify-start p-4">
      <div className="w-full max-w-sm ml-[200px]">
        <LoginForm />
      </div>
      <footer className="fixed bottom-4 text-center text-white text-sm w-full">
        ©️ CreappTech - Somos una empresa líder en soluciones integrales basadas en tecnología e innovación.
      </footer>
    </main>
  )
}
