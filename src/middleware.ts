import { NextRequest, NextResponse } from "next/server";

// URLs problemáticas específicas que causan errores 400
const BLOCKED_IMAGE_PATTERNS = [
  // Patrones de los errores observados en DevTools
  /image\?url=%2Fimages%2Fcarousel%2F/i,
  /imagez1-3F7/i,
  /%2Fimages%2Fcarousel%2F/i,
  /properties%2Fimages%2F/i,
  // URLs con doble codificación
  /%2F.*%2F.*%2F/i,
  // URL específica que causa errores 400 masivos
  /1759776573091_casa-lujo\.jpg/i,
];

// URLs de Firebase Storage conocidas como rotas
const BLOCKED_FIREBASE_URLS = [
  "1753389229074_dinero.png",
  "1753389282759_WhatsApp",
  "1753417841583_th.outside926x816",
  "1759776573091_casa-lujo.jpg",
];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // INTERCEPTAR requests de optimización de imágenes de Next.js
  if (url.pathname.startsWith("/_next/image")) {
    const imageUrl = url.searchParams.get("url");

    // BLOQUEO INMEDIATO para imagen problemática específica
    if (imageUrl && imageUrl.includes("1759776573091_casa-lujo.jpg")) {
      url.pathname = "/placeholder-property.svg";
      url.search = "";
      return NextResponse.redirect(url);
    }

    if (imageUrl) {
      // Logging disabled to prevent console spam

      // Detectar URLs malformadas específicas
      if (
        imageUrl.includes("http%3Dcrop") ||
        imageUrl.includes("%3Dcrop") ||
        imageUrl.match(/http%3D.*crop.*w=\d+/)
      ) {
        // URL malformada detectada, redirigir a placeholder
        url.pathname = "/placeholder-property.svg";
        url.search = "";
        return NextResponse.redirect(url);
      }

      // Verificar patrones problemáticos
      const isProblematic = BLOCKED_IMAGE_PATTERNS.some(
        (pattern) => pattern.test(imageUrl) || pattern.test(request.url)
      );

      // Verificar URLs de Firebase rotas
      const isBlockedFirebase = BLOCKED_FIREBASE_URLS.some((blocked) =>
        imageUrl.includes(blocked)
      );

      if (isProblematic || isBlockedFirebase) {
        // Warning logging disabled to prevent console spam

        // Redirigir a placeholder
        url.pathname = "/placeholder-property.svg";
        url.search = "";
        return NextResponse.redirect(url);
      }

      // Si la URL está mal codificada, intentar corregirla
      if (imageUrl.includes("%2F")) {
        try {
          const decodedUrl = decodeURIComponent(imageUrl);
          // Logging disabled to prevent console spam

          // Actualizar la URL decodificada
          url.searchParams.set("url", decodedUrl);
          return NextResponse.rewrite(url);
        } catch (error) {
          // Warning logging disabled to prevent console spam
          url.pathname = "/placeholder-property.svg";
          url.search = "";
          return NextResponse.redirect(url);
        }
      }
    }
  }

  // BLOQUEAR requests directos a imágenes problemáticas
  if (request.nextUrl.pathname.startsWith("/images/")) {
    const pathname = request.nextUrl.pathname;

    // Verificar si contiene patrones problemáticos
    const isProblematic = BLOCKED_IMAGE_PATTERNS.some(
      (pattern) => pattern.test(pathname) || pattern.test(request.url)
    );

    if (isProblematic) {
      console.warn("🚨 BLOCKED direct image access:", pathname);
      return NextResponse.redirect(
        new URL("/placeholder-property.svg", request.url)
      );
    }

    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
    return response;
  }

  // Debug logging disabled to prevent console spam
  if (process.env.NODE_ENV === "development") {
    if (
      request.nextUrl.pathname.includes("image") ||
      request.nextUrl.search.includes("image")
    ) {
      // Image request logging disabled
    }
  }

  // Headers de seguridad y optimización
  const response = NextResponse.next();

  // Headers para imágenes
  if (
    request.nextUrl.pathname.startsWith("/_next/image") ||
    request.nextUrl.pathname.startsWith("/images/")
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=86400, stale-while-revalidate=604800"
    );
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Access-Control-Allow-Origin", "*");
  }

  // Headers de seguridad generales
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|favicon.ico).*)",
    "/_next/image/:path*",
    "/images/:path*",
  ],
};
