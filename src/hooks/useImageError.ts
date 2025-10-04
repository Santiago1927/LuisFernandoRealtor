"use client";

import { useState, useCallback } from "react";

interface UseImageErrorOptions {
  fallbackSrc?: string;
  onError?: (src: string) => void;
  maxRetries?: number;
}

export function useImageError({
  fallbackSrc = "/placeholder-property.svg",
  onError,
  maxRetries = 1,
}: UseImageErrorOptions = {}) {
  const [errorSources, setErrorSources] = useState<Set<string>>(new Set());
  const [retryCount, setRetryCount] = useState<Record<string, number>>({});

  const handleImageError = useCallback(
    (src: string) => {
      const currentRetries = retryCount[src] || 0;

      if (currentRetries < maxRetries) {
        // Incrementar contador de reintentos
        setRetryCount((prev) => ({
          ...prev,
          [src]: currentRetries + 1,
        }));

        // Reintentar después de un delay
        setTimeout(() => {
          // Forzar re-render para reintentar
          window.location.reload();
        }, 1000);

        return;
      }

      // Marcar como error después de agotar reintentos
      setErrorSources((prev) => new Set(prev).add(src));
      onError?.(src);

      console.warn(`Image failed to load after ${maxRetries} retries:`, src);
    },
    [retryCount, maxRetries, onError]
  );

  const getSafeSrc = useCallback(
    (src: string | undefined | null): string => {
      if (!src) return fallbackSrc;
      if (errorSources.has(src)) return fallbackSrc;
      return src;
    },
    [errorSources, fallbackSrc]
  );

  const hasError = useCallback(
    (src: string): boolean => {
      return errorSources.has(src);
    },
    [errorSources]
  );

  const clearError = useCallback((src: string) => {
    setErrorSources((prev) => {
      const newSet = new Set(prev);
      newSet.delete(src);
      return newSet;
    });
    setRetryCount((prev) => {
      const newCount = { ...prev };
      delete newCount[src];
      return newCount;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrorSources(new Set());
    setRetryCount({});
  }, []);

  return {
    handleImageError,
    getSafeSrc,
    hasError,
    clearError,
    clearAllErrors,
    errorSources: Array.from(errorSources),
  };
}
