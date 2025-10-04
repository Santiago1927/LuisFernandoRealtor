import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Reducir logs de imagen para evitar spam en producción
  if (process.env.NODE_ENV === "development") {
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
  }

  // Manejar rutas de imágenes que no existen
  if (request.nextUrl.pathname.startsWith("/images/")) {
    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
    return response;
  }

  // Mejorar el manejo de errores para _next/image
  if (request.nextUrl.pathname.startsWith("/_next/image")) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "public, max-age=86400");
    response.headers.set("X-Content-Type-Options", "nosniff");

    // Agregar header para permitir CORS en imágenes
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");

    return response;
  }

  // Agregar headers de seguridad generales
  const response = NextResponse.next();

  // Headers de seguridad globales
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/_next/image/:path*",
    "/images/:path*",
  ],
};
