"use client";

import NextImage from "next/image";
import { useState, useCallback } from "react";
import { ImageIcon } from "lucide-react";

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
  style,
  onClick,
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(() => {
    // Si la URL ya falló antes, usar placeholder inmediatamente
    if (src && failedUrls.has(src)) {
      return "/placeholder-property.svg";
    }
    return src || "/placeholder-property.svg";
  });

  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const isFirebaseStorage = useCallback((url: string) => {
    return url.includes("firebasestorage.googleapis.com");
  }, []);

  const isUnreliableDomain = useCallback((url: string) => {
    return UNRELIABLE_DOMAINS.some((domain) => url.includes(domain));
  }, []);

  const handleImageError = useCallback(() => {
    console.warn(`Image load failed: ${currentSrc}`);

    // Marcar URL como fallida
    if (currentSrc) {
      failedUrls.add(currentSrc);
    }

    // Si ya estamos usando el placeholder y sigue fallando
    if (currentSrc === "/placeholder-property.svg") {
      setHasError(true);
      onError?.();
      return;
    }

    // Para URLs de Firebase Storage rotas, ir directo al placeholder
    if (src && isFirebaseStorage(src)) {
      console.warn(`Firebase Storage URL failed: ${src}`);
      setCurrentSrc("/placeholder-property.svg");
      onError?.();
      return;
    }

    // Para otros dominios no confiables, intentar una vez más antes del placeholder
    if (src && isUnreliableDomain(src) && retryCount < 1) {
      setRetryCount((prev) => prev + 1);
      // Intentar recargar después de un breve delay
      setTimeout(() => {
        setCurrentSrc(`${src}?retry=${retryCount + 1}`);
      }, 1000);
      return;
    }

    // Como último recurso, usar placeholder
    setCurrentSrc("/placeholder-property.svg");
    onError?.();
  }, [
    currentSrc,
    src,
    isFirebaseStorage,
    isUnreliableDomain,
    retryCount,
    onError,
  ]);

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
        className={`flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 ${className}`}
        style={style}
        onClick={onClick}
      >
        <div className="text-center text-zinc-400 dark:text-zinc-500">
          <ImageIcon className="h-8 w-8 mx-auto mb-1" />
          <span className="text-xs">Error de imagen</span>
        </div>
      </div>
    );
  }

  // Configurar propiedades de la imagen
  const imageProps: any = {
    src: currentSrc,
    alt,
    className,
    sizes,
    priority,
    onError: handleImageError,
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
