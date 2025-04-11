"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building2, Mail, MessageSquare, User, Settings } from "lucide-react"

const navItems = [
  {
    id: "inicio",
    href: "/dashboard",
    label: "Inicio",
    icon: Home,
    pattern: /^\/dashboard$/,
  },
  {
    id: "entidades",
    href: "/dashboard/entidades",
    label: "Entidades",
    icon: Building2,
    pattern: /^\/dashboard\/entidades|^\/entidad\/nueva|^\/entidad\/editar/,
  },
  {
    id: "envio-email",
    href: "/dashboard/envio-email",
    label: "Envió Email",
    icon: Mail,
    pattern: /^\/dashboard\/envio-email/,
  },
  {
    id: "envio-sms",
    href: "/dashboard/envio-sms",
    label: "Envió SMS",
    icon: MessageSquare,
    pattern: /^\/dashboard\/envio-sms/,
  },
  {
    id: "usuario",
    href: "/dashboard/usuario",
    label: "Usuario",
    icon: User,
    pattern: /^\/dashboard\/usuario/,
  },
  {
    id: "configuracion",
    href: "/dashboard/configuracion",
    label: "Configuración",
    icon: Settings,
    pattern: /^\/dashboard\/configuracion/,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  // Encontrar el ítem activo (solo uno puede estar activo)
  const activeItemId = navItems.find((item) => item.pattern.test(pathname))?.id

  return (
    <nav className="w-64 bg-white border-r min-h-screen">
      <div className="p-4">
        <div className="flex items-center justify-center mb-6 pt-2">
          <Mail className="h-10 w-10 text-sky-500" />
        </div>
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = item.id === activeItemId

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-sky-500 text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

