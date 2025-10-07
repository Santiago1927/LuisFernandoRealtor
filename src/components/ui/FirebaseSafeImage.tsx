"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { ImageIcon } from "lucide-react";

interface FirebaseSafeImageProps {
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

// Cache global para URLs verificadas
const urlCache = new Map<string, { valid: boolean; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

/**
 * Componente FirebaseSafeImage - Maneja URLs de Firebase Storage de forma segura
 * Verifica automáticamente URLs de Firebase y usa fallbacks cuando fallan
 */
export default function FirebaseSafeImage({
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
}: FirebaseSafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Función para verificar si una URL de Firebase es válida
  const verifyFirebaseUrl = useCallback(
    async (url: string): Promise<boolean> => {
      if (!url.includes("firebasestorage.googleapis.com")) {
        return true; // No es Firebase, asumir que es válida
      }

      // Verificar cache
      const cached = urlCache.get(url);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.valid;
      }

      try {
        setIsVerifying(true);
        const response = await fetch(url, { method: "HEAD" });
        const isValid = response.ok;

        // Guardar en cache
        urlCache.set(url, { valid: isValid, timestamp: Date.now() });

        return isValid;
      } catch (error) {
        console.warn("Error verifying Firebase URL:", url, error);
        urlCache.set(url, { valid: false, timestamp: Date.now() });
        return false;
      } finally {
        setIsVerifying(false);
      }
    },
    []
  );

  // Verificar URL cuando cambia src
  useEffect(() => {
    if (!src) {
      setCurrentSrc(fallbackSrc);
      return;
    }

    // Si es una URL de Firebase, verificarla
    if (src.includes("firebasestorage.googleapis.com")) {
      verifyFirebaseUrl(src).then((isValid) => {
        if (isValid) {
          setCurrentSrc(src);
          setHasError(false);
        } else {
          console.warn("Firebase image not accessible:", src);
          setCurrentSrc(fallbackSrc);
          setHasError(true);
          onError?.();
        }
      });
    } else {
      setCurrentSrc(src);
      setHasError(false);
    }
  }, [src, fallbackSrc, verifyFirebaseUrl, onError]);

  const handleImageError = useCallback(() => {
    console.warn("Image failed to load:", currentSrc);

    // Si ya estamos usando el fallback, mostrar placeholder
    if (currentSrc === fallbackSrc) {
      setHasError(true);
    } else {
      // Intentar con fallback
      setCurrentSrc(fallbackSrc);
    }

    onError?.();
  }, [currentSrc, fallbackSrc, onError]);

  // Si hay error con todo y no queremos mostrar placeholder
  if (hasError && !showPlaceholder) {
    return null;
  }

  // Si hay error final, mostrar placeholder
  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 ${className}`}
      >
        <div className="text-center text-zinc-400 dark:text-zinc-500">
          <ImageIcon className="h-12 w-12 mx-auto mb-2" />
          <span className="text-sm">Imagen no disponible</span>
        </div>
      </div>
    );
  }

  // Mostrar loading si está verificando
  if (isVerifying) {
    return (
      <div
        className={`flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 ${className}`}
      >
        <div className="text-center text-zinc-400 dark:text-zinc-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-400 mx-auto mb-2"></div>
          <span className="text-sm">Verificando imagen...</span>
        </div>
      </div>
    );
  }

  // Propiedades de la imagen
  const imageProps = {
    src: currentSrc,
    alt: alt || "",
    className,
    sizes,
    priority,
    onError: handleImageError,
    ...(fill ? { fill: true } : { width, height }),
  };

  return <Image {...imageProps} />;
}
