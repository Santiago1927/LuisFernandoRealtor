"use client";

import NextImage from "next/image";
import { useState, useCallback, useEffect } from "react";
import { ImageIcon, RefreshCw } from "lucide-react";
import { ImageUtils } from "@/lib/imageUtils";

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
    // Si la URL ya falló antes, usar placeholder inmediatamente
    if (src && failedUrls.has(src)) {
      return "/placeholder-property.svg";
    }
    
    // Validar y limpiar URL usando utilidades
    if (src) {
      const cleanSrc = ImageUtils.cleanFirebaseUrl(src);
      if (cleanSrc && ImageUtils.isValidImageUrl(cleanSrc)) {
        return cleanSrc;
      }
    }
    
    return src || "/placeholder-property.svg";
  });

  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Reset states when src changes
  useEffect(() => {
    if (src && src !== currentSrc && !failedUrls.has(src)) {
      // Limpiar URL usando utilidades
      const cleanSrc = ImageUtils.cleanFirebaseUrl(src);
      
      if (cleanSrc && ImageUtils.isValidImageUrl(cleanSrc)) {
        setCurrentSrc(cleanSrc);
        setHasError(false);
        setRetryCount(0);
        setIsLoading(true);
      } else {
        // URL inválida, usar placeholder
        setCurrentSrc("/placeholder-property.svg");
        setHasError(true);
        setIsLoading(false);
      }
    }
  }, [src, currentSrc]);

  const isFirebaseStorage = useCallback((url: string) => {
    return url.includes("firebasestorage.googleapis.com");
  }, []);

  const isUnreliableDomain = useCallback((url: string) => {
    return ImageUtils.isUnreliableDomain(url);
  }, []);

  const handleImageError = useCallback((event?: any) => {
    console.warn(`Image load failed: ${currentSrc}`);
    setIsLoading(false);
    
    // Log adicional para debugging en desarrollo
    if (process.env.NODE_ENV === 'development' && event && event.target) {
      const debugInfo = ImageUtils.getUrlDebugInfo(currentSrc);
      console.warn(`Error details:`, {
        src: event.target.src,
        naturalWidth: event.target.naturalWidth,
        naturalHeight: event.target.naturalHeight,
        complete: event.target.complete,
        debugInfo
      });
    }

    // Marcar URL como fallida
    if (currentSrc) {
      failedUrls.add(currentSrc);
    }

    // Si ya estamos usando el placeholder y sigue fallando
    if (currentSrc === "/placeholder-property.svg") {
      setHasError(true);
      onError?.(event);
      return;
    }

    // Para URLs de Firebase Storage rotas, ir directo al placeholder
    if (src && isFirebaseStorage(src)) {
      console.warn(`Firebase Storage URL failed: ${src}`);
      setCurrentSrc("/placeholder-property.svg");
      onError?.(event);
      return;
    }

    // Para otros dominios no confiables, intentar una vez más antes del placeholder
    if (src && isUnreliableDomain(src) && retryCount < 2) {
      setRetryCount((prev) => prev + 1);
      // Intentar recargar después de un breve delay
      setTimeout(() => {
        const retryUrl = ImageUtils.generateRetryUrl(src, retryCount + 1);
        setCurrentSrc(retryUrl);
        setIsLoading(true);
      }, 1000);
      return;
    }

    // Como último recurso, usar placeholder
    setCurrentSrc("/placeholder-property.svg");
    setHasError(true);
    onError?.(event);
  }, [
    currentSrc,
    src,
    isFirebaseStorage,
    isUnreliableDomain,
    retryCount,
    onError,
  ]);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleRetry = useCallback(() => {
    if (src && src !== "/placeholder-property.svg") {
      setRetryCount(0);
      setHasError(false);
      setIsLoading(true);
      failedUrls.delete(src); // Remove from failed cache
      
      // Limpiar URL antes del retry
      const cleanSrc = ImageUtils.cleanFirebaseUrl(src);
      const retryUrl = ImageUtils.generateRetryUrl(cleanSrc || src, 0);
      setCurrentSrc(retryUrl);
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

  // Configurar propiedades de la imagen
  const imageProps: any = {
    src: currentSrc,
    alt,
    className: `${className} ${isLoading ? 'opacity-50' : 'opacity-100'} transition-opacity duration-200`,
    sizes,
    priority,
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

  return <NextImage {...imageProps} />;
}
