import { NextRequest, NextResponse } from "next/server";

// URLs problemáticas específicas que causan errores 400
const BLOCKED_IMAGE_PATTERNS = [
  // Patrones de los errores observados en DevTools
  /image\?url=%2Fimages%2Fcarousel%2F/i,
  /imagez1-3F7/i,
  /%2Fimages%2Fcarousel%2F/i,
  /properties%2Fimages%2F/i,
  // URLs con doble codificación
  /%2F.*%2F.*%2F/i
];

// URLs de Firebase Storage conocidas como rotas
const BLOCKED_FIREBASE_URLS = [
  '1753389229074_dinero.png',
  '1753389282759_WhatsApp',
  '1753417841583_th.outside926x816'
];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // INTERCEPTAR requests de optimización de imágenes de Next.js
  if (url.pathname.startsWith('/_next/image')) {
    const imageUrl = url.searchParams.get('url');
    
    if (imageUrl) {
      console.log('🔍 Intercepting Next.js image optimization:', imageUrl);
      
      // Verificar patrones problemáticos
      const isProblematic = BLOCKED_IMAGE_PATTERNS.some(pattern => 
        pattern.test(imageUrl) || pattern.test(request.url)
      );
      
      // Verificar URLs de Firebase rotas
      const isBlockedFirebase = BLOCKED_FIREBASE_URLS.some(blocked => 
        imageUrl.includes(blocked)
      );
      
      if (isProblematic || isBlockedFirebase) {
        console.warn('🚨 BLOCKED problematic image URL:', imageUrl);
        
        // Redirigir a placeholder
        url.pathname = '/placeholder-property.svg';
        url.search = '';
        return NextResponse.redirect(url);
      }
      
      // Si la URL está mal codificada, intentar corregirla
      if (imageUrl.includes('%2F')) {
        try {
          const decodedUrl = decodeURIComponent(imageUrl);
          console.log('🔧 Decoded image URL:', decodedUrl);
          
          // Actualizar la URL decodificada
          url.searchParams.set('url', decodedUrl);
          return NextResponse.rewrite(url);
        } catch (error) {
          console.warn('❌ Could not decode URL, using placeholder');
          url.pathname = '/placeholder-property.svg';
          url.search = '';
          return NextResponse.redirect(url);
        }
      }
    }
  }

  // BLOQUEAR requests directos a imágenes problemáticas
  if (request.nextUrl.pathname.startsWith('/images/')) {
    const pathname = request.nextUrl.pathname;
    
    // Verificar si contiene patrones problemáticos
    const isProblematic = BLOCKED_IMAGE_PATTERNS.some(pattern => 
      pattern.test(pathname) || pattern.test(request.url)
    );
    
    if (isProblematic) {
      console.warn('🚨 BLOCKED direct image access:', pathname);
      return NextResponse.redirect(new URL('/placeholder-property.svg', request.url));
    }
    
    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
    return response;
  }

  // Log de debugging para desarrollo
  if (process.env.NODE_ENV === 'development') {
    if (request.nextUrl.pathname.includes('image') || request.nextUrl.search.includes('image')) {
      console.log('🔍 Image request:', request.nextUrl.pathname, request.nextUrl.search);
    }
  }
  
  // Headers de seguridad y optimización
  const response = NextResponse.next();
  
  // Headers para imágenes
  if (request.nextUrl.pathname.startsWith('/_next/image') || 
      request.nextUrl.pathname.startsWith('/images/')) {
    response.headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Access-Control-Allow-Origin', '*');
  }
  
  // Headers de seguridad generales
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

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
    '/((?!api|_next/static|favicon.ico).*)',
    '/_next/image/:path*',
    '/images/:path*',
  ],
};
