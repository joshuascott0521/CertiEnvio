"use client";

import type React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Building2,
  Mail,
  MessageSquare,
  User,
  Settings,
} from "lucide-react";
import { useTransition } from "react";

interface NavItem {
  id: string;
  href: string;
  label: string;
  icon: React.ElementType;
  pattern: RegExp;
}

const navItems: NavItem[] = [
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
];

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Encontrar el ítem activo (solo uno puede estar activo)
  const activeItemId = navItems.find((item) => item.pattern.test(pathname))?.id;

  const handleNavigation = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <nav className="w-64 bg-white border-r min-h-screen">
      <div className="px-4 py-2">
        <div className="flex items-center justify-center">
          <img
            src="/CertiLogo.png"
            alt="Logo CertiEnvíos"
            className="w-[140px] h-auto object-contain"
          />
          {/* // <Mail className="h-10 w-10 text-sky-500" /> */}
        </div>
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeItemId;

            return (
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors w-full text-left ${
                  isActive
                    ? "bg-sky-500 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                } ${isPending ? "opacity-70" : ""}`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
