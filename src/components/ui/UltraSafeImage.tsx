"use client";

import NextImage from "next/image";
import { useState, useCallback } from "react";
import { ImageIcon } from "lucide-react";

interface UltraSafeImageProps {
  src: string | undefined | null;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

// Lista blanca de imágenes que sabemos que funcionan
const SAFE_IMAGE_PATTERNS = [
  /^\/images\/carousel\/Foto-[1-5]\.JPG$/,
  /^\/images\/home\.webp$/,
  /^\/placeholder-property\.svg$/,
  /^\/logo\.(svg|png)$/,
  /^\/realhaus-logo\.svg$/,
  /^\/favicon\.ico$/,
];

// Lista negra de patrones que causan errores 400
const BLOCKED_PATTERNS = [
  /imagez1-3F7/gi,
  /images%2Fcarousel%2F/gi,
  /%2Fimages%2F/gi,
  /properties%2Fimages%2F/gi,
  /image\?url=%2F/gi,
];

/**
 * UltraSafeImage - Componente que SOLO permite imágenes seguras
 * Bloquea agresivamente cualquier URL que pueda causar errores 400
 */
export default function UltraSafeImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  sizes,
  priority = false,
  quality,
  style,
  onClick,
}: UltraSafeImageProps) {
  const [hasError, setHasError] = useState(false);

  // Función para determinar si una URL es segura
  const isSafeUrl = useCallback((url: string): boolean => {
    // URLs locales en la lista blanca
    if (url.startsWith("/")) {
      return SAFE_IMAGE_PATTERNS.some((pattern) => pattern.test(url));
    }

    // URLs de Unsplash (sabemos que funcionan)
    if (url.includes("images.unsplash.com")) {
      return true;
    }

    // Bloquear Firebase Storage (todas las URLs están rotas)
    if (url.includes("firebasestorage.googleapis.com")) {
      // Warning logging disabled to prevent console spam
      return false;
    }

    // Verificar patrones bloqueados
    const isBlocked = BLOCKED_PATTERNS.some((pattern) => pattern.test(url));
    if (isBlocked) {
      // Warning logging disabled to prevent console spam
      return false;
    }

    return true;
  }, []);

  const handleError = useCallback(() => {
    // Warning logging disabled to prevent console spam
    setHasError(true);
  }, []);

  // Si no hay src o src no es segura, mostrar placeholder
  if (!src || !isSafeUrl(src) || hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 ${className}`}
        style={style}
        onClick={onClick}
      >
        <div className="text-center text-zinc-400 dark:text-zinc-500">
          <ImageIcon className="h-8 w-8 mx-auto mb-1" />
          <span className="text-xs">
            {hasError
              ? "Error de imagen"
              : src
              ? "Imagen bloqueada"
              : "Sin imagen"}
          </span>
        </div>
      </div>
    );
  }

  // Configurar propiedades de la imagen
  const imageProps: any = {
    src,
    alt,
    className,
    sizes,
    priority,
    onError: handleError,
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

  // Logging disabled to prevent console spam
  return <NextImage {...imageProps} />;
}
