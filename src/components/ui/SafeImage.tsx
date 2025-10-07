"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface SafeImageProps {
  src: string | undefined | null;
  alt: string;
  fallbackSrc?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  onError?: () => void;
  showPlaceholder?: boolean;
}

/**
 * Componente SafeImage - Maneja errores de carga de imágenes con fallbacks
 * Proporciona múltiples niveles de fallback para garantizar que siempre se muestre algo
 */
export default function SafeImage({
  src,
  alt,
  fallbackSrc = "/placeholder-property.svg",
  fill = false,
  width,
  height,
  className = "",
  sizes,
  priority = false,
  onError,
  showPlaceholder = true,
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);

  const handleError = () => {
    console.warn(`Error loading image: ${src}`);
    setError(true);
    onError?.();
  };

  const handleFallbackError = () => {
    console.warn(`Error loading fallback image: ${fallbackSrc}`);
    setFallbackError(true);
  };

  // Si no hay src o hay errores, mostrar placeholder
  if (!src || (error && fallbackError)) {
    if (!showPlaceholder) return null;

    return (
      <div
        className={`flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 ${className}`}
      >
        <div className="text-center text-zinc-400 dark:text-zinc-500">
          <ImageIcon className="h-12 w-12 mx-auto mb-2" />
          <span className="text-sm">Sin imagen disponible</span>
        </div>
      </div>
    );
  }

  // Si hay error con la imagen principal, usar fallback
  if (error && !fallbackError) {
    const imageProps = {
      src: fallbackSrc,
      alt: `${alt || "Imagen"} (imagen de respaldo)`,
      className,
      sizes,
      priority,
      onError: handleFallbackError,
      ...(fill ? { fill: true } : { width, height }),
    };

    return <Image {...imageProps} />;
  }

  // Imagen principal
  const imageProps = {
    src,
    alt: alt || "",
    className,
    sizes,
    priority,
    onError: handleError,
    ...(fill ? { fill: true } : { width, height }),
  };

  return <Image {...imageProps} />;
}
