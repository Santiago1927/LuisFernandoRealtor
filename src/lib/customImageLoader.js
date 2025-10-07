/**
 * Custom Image Loader para Next.js
 * Intercepta y corrige URLs problemáticas antes de que lleguen al optimizador
 */

// URLs problemáticas específicas que causan errores 400
const BLOCKED_PATTERNS = [
  /imagez1-3F7/gi, // Solo el patrón más problemático
];

const BLOCKED_FIREBASE_URLS = [
  // Solo URLs que realmente causan errores 400 consistentes
  "1753389282759_WhatsApp", // URL malformada
];

export default function customImageLoader({ src, width = 800, quality = 75 }) {
  // Si es placeholder o SVG, retornar directamente
  if (src.startsWith("/placeholder") || src.endsWith(".svg")) {
    return src;
  }

  // Si es una imagen local, retornar con parámetros básicos
  if (src.startsWith("/") && !src.startsWith("//")) {
    return `${src}?w=${width}&q=${quality}`;
  }

  // Para URLs de Firebase Storage, verificar que sean válidas y retornarlas directamente
  if (src.includes("firebasestorage.googleapis.com")) {
    // Verificar que tenga los componentes esenciales
    if (src.includes("alt=media") && src.includes("token=")) {
      return src; // Retornar URL de Firebase sin procesamiento adicional
    } else {
      return "/placeholder-property.svg";
    }
  }

  // Para otras URLs externas válidas, retornarlas directamente
  try {
    new URL(src); // Validar que es una URL válida
    return src; // Retornar URL externa sin procesamiento adicional
  } catch (error) {
    return "/placeholder-property.svg";
  }
}
