import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Log de todas las requests de imágenes para debug
  if (
    request.nextUrl.pathname.startsWith("/images/") ||
    request.nextUrl.pathname.includes("image") ||
    request.nextUrl.pathname.startsWith("/_next/image")
  ) {
    console.log(
      "Image request:",
      request.nextUrl.pathname,
      request.nextUrl.search
    );
  }

  // Manejar rutas de imágenes que no existen
  if (request.nextUrl.pathname.startsWith("/images/")) {
    // Si es una imagen que no existe, redirigir al placeholder
    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
    return response;
  }

  // Agregar headers de seguridad
  const response = NextResponse.next();

  // Headers de seguridad para imágenes
  if (request.nextUrl.pathname.startsWith("/_next/image")) {
    response.headers.set("Cache-Control", "public, max-age=86400");
    response.headers.set("X-Content-Type-Options", "nosniff");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/_next/image/:path*",
    "/images/:path*",
  ],
};
