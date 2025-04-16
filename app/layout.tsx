import "./globals.css"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { AuthProvider } from "@/contexts/auth-context"

export const metadata: Metadata = {
  title: "Envia+",
  description: "Sistema de envío de correos",
    generator: 'v0.dev'
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <link rel="preload" as="image" href="/bg.webp" />
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'