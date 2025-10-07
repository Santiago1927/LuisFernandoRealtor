"use client";

import NextImage from "next/image";
import { useState, useCallback, useEffect } from "react";
import { ImageIcon, RefreshCw } from "lucide-react";
import { ImageUtils } from "@/lib/imageUtils";
import { imageUrlInterceptor } from "@/lib/imageUrlInterceptor";

interface SmartImageProps {
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

// Lista de dominios conocidos que pueden fallar
const UNRELIABLE_DOMAINS = [
  "firebasestorage.googleapis.com",
  "images.unsplash.com",
];

// Cache de URLs que han fallado
const failedUrls = new Set<string>();

/**
 * SmartImage - Componente inteligente que maneja errores de imagen automáticamente
 * Reemplaza automáticamente imágenes rotas con placeholders y maneja múltiples fallbacks
 */
export default function SmartImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  sizes,
  priority = false,
  quality,
  placeholder,
  blurDataURL,
  onError,
  showPlaceholder = true,
  showRetryButton = false,
  style,
  onClick,
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(() => {
    // Usar la URL directamente sin procesarla
    if (src && src.trim()) {
      return src;
    }
    return "/placeholder-property.svg";
  });

  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Reset states when src changes
  useEffect(() => {
    if (src && src !== currentSrc) {
      setCurrentSrc(src);
      setHasError(false);
      setRetryCount(0);
      setIsLoading(true);
    }
  }, [src, currentSrc]);

  const handleImageError = useCallback(
    (event?: any) => {
      setIsLoading(false);
      setHasError(true);

      // Si no es ya un placeholder, cambiar al placeholder
      if (currentSrc !== "/placeholder-property.svg") {
        setCurrentSrc("/placeholder-property.svg");
      }

      onError?.(event);
    },
    [currentSrc, onError]
  );

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleRetry = useCallback(() => {
    if (src && src !== "/placeholder-property.svg") {
      setRetryCount(0);
      setHasError(false);
      setIsLoading(true);
      setCurrentSrc(src);
    }
  }, [src]);

  // Si no hay src inicial, mostrar placeholder
  if (!src) {
    if (!showPlaceholder) return null;

    return (
      <div
        className={`flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 ${className}`}
        style={style}
        onClick={onClick}
      >
        <div className="text-center text-zinc-400 dark:text-zinc-500">
          <ImageIcon className="h-8 w-8 mx-auto mb-1" />
          <span className="text-xs">Sin imagen</span>
        </div>
      </div>
    );
  }

  // Si hay error final y no se quiere mostrar placeholder
  if (hasError && !showPlaceholder) {
    return null;
  }

  // Si hay error final, mostrar placeholder personalizado
  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-800 ${className}`}
        style={style}
        onClick={onClick}
      >
        <div className="text-center text-zinc-400 dark:text-zinc-500">
          <ImageIcon className="h-8 w-8 mx-auto mb-1" />
          <span className="text-xs">Error de imagen</span>
          {showRetryButton && src && src !== "/placeholder-property.svg" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRetry();
              }}
              className="mt-2 flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              Reintentar
            </button>
          )}
        </div>
      </div>
    );
  }

  // Auto-detectar si la imagen debería tener prioridad para LCP
  const shouldHavePriority =
    priority ||
    // Imágenes grandes que probablemente sean LCP
    (width && width >= 600) ||
    (height && height >= 400) ||
    // Imágenes que ocupan toda la altura/ancho (hero images)
    fill ||
    // Imágenes en páginas de propiedades (por el alt text)
    alt.toLowerCase().includes("casa") ||
    alt.toLowerCase().includes("property") ||
    alt.toLowerCase().includes("propiedad");

  // Configurar propiedades de la imagen
  const imageProps: any = {
    src: currentSrc,
    alt,
    className: `${className} ${
      isLoading ? "opacity-50" : "opacity-100"
    } transition-opacity duration-200`,
    sizes,
    priority: shouldHavePriority,
    onError: handleImageError,
    onLoad: handleImageLoad,
    style,
    onClick,
  };

  // Agregar dimensiones según el tipo
  if (fill) {
    imageProps.fill = true;
  } else {
    imageProps.width = width;
    imageProps.height = height;
  }

  // Propiedades opcionales
  if (quality !== undefined) imageProps.quality = quality;
  if (placeholder) imageProps.placeholder = placeholder;
  if (blurDataURL) imageProps.blurDataURL = blurDataURL;

  // Para SVGs, usar img regular para evitar warnings del loader personalizado
  if (currentSrc.endsWith(".svg")) {
    const svgProps = {
      src: currentSrc,
      alt,
      className: imageProps.className,
      style: {
        ...style,
        ...(fill
          ? {
              width: "100%",
              height: "100%",
              objectFit: "cover" as const,
            }
          : {
              width: width ? `${width}px` : undefined,
              height: height ? `${height}px` : undefined,
            }),
      },
      onError: handleImageError,
      onLoad: handleImageLoad,
      onClick,
    };

    return <img {...svgProps} />;
  }

  return <NextImage {...imageProps} />;
}
