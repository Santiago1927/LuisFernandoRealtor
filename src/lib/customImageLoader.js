/**
 * Custom Image Loader para Next.js
 * Intercepta y corrige URLs problemáticas antes de que lleguen al optimizador
 */

// URLs problemáticas específicas que causan errores 400
const BLOCKED_PATTERNS = [
  /images%2Fcarousel%2F/gi,
  /imagez1-3F7/gi,
  /%2Fimages%2F/gi,
  /properties%2Fimages%2F/gi,
];

const BLOCKED_FIREBASE_URLS = [
  "1753389229074_dinero.png",
  "1753389282759_WhatsApp",
  "1753417841583_th.outside926x816",
];

export default function customImageLoader({ src, width, quality }) {
  console.log("🔍 Custom loader processing:", src);

  // Si es placeholder, retornar directamente
  if (src.startsWith("/placeholder")) {
    return src;
  }

  // Verificar patrones problemáticos
  const isProblematic = BLOCKED_PATTERNS.some((pattern) => pattern.test(src));
  const isBlockedFirebase = BLOCKED_FIREBASE_URLS.some((blocked) =>
    src.includes(blocked)
  );

  if (isProblematic || isBlockedFirebase) {
    console.warn("🚨 Custom loader BLOCKED URL:", src);
    return "/placeholder-property.svg";
  }

  // Si la URL está mal codificada, intentar corregirla
  if (src.includes("%2F")) {
    try {
      const decoded = decodeURIComponent(src);
      console.log("🔧 Custom loader decoded URL:", decoded);
      src = decoded;
    } catch (error) {
      console.warn("❌ Custom loader could not decode, using placeholder");
      return "/placeholder-property.svg";
    }
  }

  // Para URLs locales, retornar directamente
  if (src.startsWith("/")) {
    return src;
  }

  // Para URLs externas válidas, usar optimización estándar
  const params = new URLSearchParams();
  params.set("url", src);
  params.set("w", width.toString());

  if (quality) {
    params.set("q", quality.toString());
  }

  console.log("✅ Custom loader passing through:", src);
  return `/_next/image?${params.toString()}`;
}
