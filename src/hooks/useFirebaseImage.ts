"use client";

import { useState, useEffect } from "react";

interface UseFirebaseImageOptions {
  onError?: (url: string, error: Error) => void;
  timeout?: number;
}

export function useFirebaseImage({
  onError,
  timeout = 10000,
}: UseFirebaseImageOptions = {}) {
  const [loadingUrls, setLoadingUrls] = useState<Set<string>>(new Set());
  const [errorUrls, setErrorUrls] = useState<Set<string>>(new Set());
  const [validUrls, setValidUrls] = useState<Set<string>>(new Set());

  const validateFirebaseUrl = async (url: string): Promise<boolean> => {
    if (!url || !url.includes("firebasestorage.googleapis.com")) {
      return false;
    }

    try {
      setLoadingUrls((prev) => new Set(prev).add(url));

      // Crear una promesa con timeout
      const fetchPromise = fetch(url, { method: "HEAD" });
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Timeout")), timeout);
      });

      const response = await Promise.race([fetchPromise, timeoutPromise]);

      if (response.ok) {
        setValidUrls((prev) => new Set(prev).add(url));
        setErrorUrls((prev) => {
          const newSet = new Set(prev);
          newSet.delete(url);
          return newSet;
        });
        return true;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Firebase image validation failed for ${url}:`, error);
      setErrorUrls((prev) => new Set(prev).add(url));
      setValidUrls((prev) => {
        const newSet = new Set(prev);
        newSet.delete(url);
        return newSet;
      });
      onError?.(url, error as Error);
      return false;
    } finally {
      setLoadingUrls((prev) => {
        const newSet = new Set(prev);
        newSet.delete(url);
        return newSet;
      });
    }
  };

  const getSafeImageSrc = (src: string | undefined | null): string => {
    if (!src) return "/placeholder-property.svg";

    // Si ya se verificó que tiene error, usar placeholder
    if (errorUrls.has(src)) return "/placeholder-property.svg";

    // Si es una URL de Firebase Storage y no se ha validado, intentar validar
    if (
      src.includes("firebasestorage.googleapis.com") &&
      !validUrls.has(src) &&
      !loadingUrls.has(src)
    ) {
      validateFirebaseUrl(src);
    }

    return src;
  };

  const isLoading = (url: string): boolean => loadingUrls.has(url);
  const hasError = (url: string): boolean => errorUrls.has(url);
  const isValid = (url: string): boolean => validUrls.has(url);

  const clearCache = () => {
    setLoadingUrls(new Set());
    setErrorUrls(new Set());
    setValidUrls(new Set());
  };

  return {
    getSafeImageSrc,
    validateFirebaseUrl,
    isLoading,
    hasError,
    isValid,
    clearCache,
    stats: {
      loading: loadingUrls.size,
      errors: errorUrls.size,
      valid: validUrls.size,
    },
  };
}
