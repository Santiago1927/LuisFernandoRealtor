"use client";

import { useEffect, useState } from 'react';
import SmartImage from '@/components/ui/SmartImage';

// URLs problemáticas específicas identificadas en los errores
const KNOWN_BROKEN_URLS = new Set([
  'https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/properties%2Fimages%2F1753389229074_dinero.png?alt=media&token=f01812ca-e581-4759-8baf-2f3ce6151cab',
  'https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/properties%2Fimages%2F1753389282759_WhatsApp%20Image%202025-06-26%20at%2011.06.42%20PM.jpeg?alt=media&token=65816a32-3730-4620-b750-459c8eb8a5d3',
  'https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/properties%2Fimages%2F1753417841583_th.outside926x816.682ddf3969e69_infocdn__rrpmqjnyzboojm5ojhfpatlpccpu4ejuvwmczwtsjpg.webp?alt=media&token=46aa6747-c36c-4269-9aa9-bced4fd7b196'
]);

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
      setCorrectedSrc('/placeholder-property.svg');
      return;
    }

    // Verificar si es una URL conocida como problemática
    if (KNOWN_BROKEN_URLS.has(props.src)) {
      console.warn('🚨 Intercepted known broken URL:', props.src.substring(0, 50) + '...');
      setCorrectedSrc('/placeholder-property.svg');
      return;
    }

    // Verificar patrones problemáticos
    const problematicPatterns = [
      'imagez1-3F7',
      'properties%2Fimages%2F',
      // URLs excesivamente largas
      props.src.length > 500
    ];

    const hasProblematicPattern = problematicPatterns.some(pattern => {
      if (typeof pattern === 'string') {
        return props.src!.includes(pattern);
      } else {
        return pattern; // boolean case
      }
    });

    if (hasProblematicPattern) {
      console.warn('🚨 Intercepted problematic pattern in URL:', props.src.substring(0, 50) + '...');
      
      // Intentar corregir la URL
      try {
        let corrected = decodeURIComponent(props.src);
        
        // Verificar si la corrección es válida para Firebase Storage
        if (corrected.includes('firebasestorage.googleapis.com') && 
            corrected.includes('alt=media') && 
            corrected.includes('token=')) {
          console.log('✅ Corrected URL successfully');
          setCorrectedSrc(corrected);
          return;
        }
      } catch (error) {
        console.warn('❌ Could not decode URL:', error);
      }
      
      // Si no se puede corregir, usar placeholder
      setCorrectedSrc('/placeholder-property.svg');
      return;
    }

    // URL parece estar bien
    setCorrectedSrc(props.src);
  }, [props.src]);

  // Renderizar SmartImage con la URL corregida
  return <SmartImage {...props} src={correctedSrc} />;
}