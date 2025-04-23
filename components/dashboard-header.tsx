"use client";

import { ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "../contexts/auth-context";

interface DashboardHeaderProps {
  title: string;
  breadcrumb?: string;
}

export function DashboardHeader({ title, breadcrumb }: DashboardHeaderProps) {
  const { logout } = useAuth();
  return (
    <header className="h-16 bg-sky-500 text-white px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-medium">{title}</h1>
        {breadcrumb && <p className="text-sm text-sky-100">{breadcrumb}</p>}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-white hover:bg-sky-600 flex items-center space-x-2"
          >
            <div className="flex items-center">
              <div className="bg-white rounded-full p-1 mr-2">
                <User className="h-6 w-6 text-sky-500" />
              </div>
              <div className="text-right">
                <div className="font-medium">Ronald Moreno</div>
                <div className="text-xs">Administrador</div>
              </div>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={logout}>Cerrar Sesión</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
