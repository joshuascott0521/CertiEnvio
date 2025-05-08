import "./globals.css"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { ToastProvider, ToastViewport } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "CertiEnvios",
  description: "Sistema de envío de Mensajeria",
  generator: "v0.dev",
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <link rel="preload" as="image" href="/bg.webp" />
      <body>
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
          <ToastViewport />
        </ToastProvider>
      </body>
    </html>
  )
}
