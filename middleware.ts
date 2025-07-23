import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas que no requieren autenticación
const publicRoutes = ["/", "/forgot-password", "/mensaje-email"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar si la ruta actual es pública
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Obtener el token de autenticación de las cookies
  const authToken = request.cookies.get("authToken")?.value;

  // Si la ruta no es pública y no hay token, redirigir al inicio de sesión
  if (!isPublicRoute && !authToken) {
    const url = new URL("/", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Si la ruta es pública y hay token, redirigir al dashboard (opcional)
  if (isPublicRoute && authToken && pathname !== "/forgot-password") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * 1. /api (rutas API)
     * 2. /_next (archivos de Next.js)
     * 3. /_vercel (archivos de Vercel)
     * 4. /favicon.ico, /sitemap.xml, etc.
     */
    "/((?!api|_next|_vercel|.*\\..*|_static).*)",
  ],
};
