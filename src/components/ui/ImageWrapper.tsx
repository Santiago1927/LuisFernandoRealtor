"use client";

import { useEffect, useState } from "react";
import SmartImage from "@/components/ui/SmartImage";

// URLs problemáticas específicas identificadas en los errores
const KNOWN_BROKEN_URLS = new Set([
  "https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/properties%2Fimages%2F1753389229074_dinero.png?alt=media&token=f01812ca-e581-4759-8baf-2f3ce6151cab",
  "https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/properties%2Fimages%2F1753389282759_WhatsApp%20Image%202025-06-26%20at%2011.06.42%20PM.jpeg?alt=media&token=65816a32-3730-4620-b750-459c8eb8a5d3",
  "https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/properties%2Fimages%2F1753417841583_th.outside926x816.682ddf3969e69_infocdn__rrpmqjnyzboojm5ojhfpatlpccpu4ejuvwmczwtsjpg.webp?alt=media&token=46aa6747-c36c-4269-9aa9-bced4fd7b196",
]);

// Patrones problemáticos basados en los errores observados en DevTools
const PROBLEMATIC_URL_PATTERNS = [
  // URLs del carousel mal codificadas (%2Fimages%2Fcarousel%2F)
  /images%2Fcarousel%2F/gi,
  /carousel%2F/gi,
  // URLs con doble codificación
  /%2F.*%2F/gi,
  // URLs que contienen caracteres extraños de Next.js (imagez1-3F7)
  /imagez1|3F7/gi,
  // Patrón específico de los errores mostrados
  /%2Fimages%2F/gi,
  // URLs con properties mal codificadas
  /properties%2Fimages%2F/gi,
];

interface ImageWrapperProps {
  src: string | undefined | null;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  onError?: (event?: any) => void;
  showPlaceholder?: boolean;
  showRetryButton?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

/**
 * Wrapper que intercepta URLs problemáticas conocidas
 * y las reemplaza con placeholders antes de pasarlas a SmartImage
 */
export default function ImageWrapper(props: ImageWrapperProps) {
  const [correctedSrc, setCorrectedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!props.src) {
      setCorrectedSrc("/placeholder-property.svg");
      return;
    }

    // Verificar si es una URL conocida como problemática
    if (KNOWN_BROKEN_URLS.has(props.src)) {
      console.warn(
        "🚨 Intercepted known broken URL:",
        props.src.substring(0, 50) + "..."
      );
      setCorrectedSrc("/placeholder-property.svg");
      return;
    }

    console.log("🔍 ImageWrapper processing URL:", props.src.substring(0, 50) + "...");

    // PASO 2: Verificar patrones problemáticos usando RegExp
    const hasProblematicPattern = PROBLEMATIC_URL_PATTERNS.some(pattern => {
      if (pattern instanceof RegExp) {
        const matches = pattern.test(props.src!);
        if (matches) {
          console.warn(`🚨 Pattern match found: ${pattern.source} in URL:`, props.src!.substring(0, 50) + "...");
        }
        return matches;
      }
      return false;
    });

    // PASO 3: Verificar URLs excesivamente largas (más de 500 caracteres)
    const isTooLong = props.src.length > 500;
    if (isTooLong) {
      console.warn("🚨 URL too long (>500 chars):", props.src.substring(0, 50) + "...");
    }

    if (hasProblematicPattern || isTooLong) {
      console.warn("🚨 Intercepted problematic pattern in URL:", props.src.substring(0, 50) + "...");
      
      // Intentar corregir la URL
      try {
        let corrected = props.src;
        
        // Decodificar URL si está mal codificada
        if (props.src.includes('%2F')) {
          corrected = decodeURIComponent(props.src);
          console.log("🔧 Attempted to decode URL:", corrected.substring(0, 50) + "...");
        }
        
        // Verificar si la corrección es válida para Firebase Storage
        if (corrected.includes("firebasestorage.googleapis.com") && 
            corrected.includes("alt=media") && 
            corrected.includes("token=")) {
          console.log("✅ Corrected URL successfully");
          setCorrectedSrc(corrected);
          return;
        }
        
        // Para URLs locales (carousel), verificar si existe el archivo
        if (corrected.startsWith("/images/")) {
          console.log("✅ Local image URL detected, passing through:", corrected);
          setCorrectedSrc(corrected);
          return;
        }
        
      } catch (error) {
        console.warn("❌ Could not decode URL:", error);
      }
      
      // Si no se puede corregir, usar placeholder
      console.warn("❌ Using placeholder for uncorrectable URL");
      setCorrectedSrc("/placeholder-property.svg");
      return;
    }

    // PASO 4: URL parece estar bien, pasarla sin modificar
    console.log("✅ URL appears clean, passing through");
    setCorrectedSrc(props.src);
  }, [props.src]);

  // Renderizar SmartImage con la URL corregida
  return <SmartImage {...props} src={correctedSrc} />;
}
