import { useState, useCallback, useEffect } from 'react';

interface UseImageErrorHandlerOptions {
  fallbackSrc?: string;
  maxRetries?: number;
  retryDelay?: number;
  onError?: (error: any) => void;
}

interface UseImageErrorHandlerReturn {
  src: string;
  isLoading: boolean;
  hasError: boolean;
  retry: () => void;
  handleError: (event?: any) => void;
}

export const useImageErrorHandler = (
  originalSrc: string | undefined | null,
  options: UseImageErrorHandlerOptions = {}
): UseImageErrorHandlerReturn => {
  const {
    fallbackSrc = '/placeholder-property.svg',
    maxRetries = 2,
    retryDelay = 1000,
    onError
  } = options;

  const [src, setSrc] = useState<string>(() => originalSrc || fallbackSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Reset when originalSrc changes
  useEffect(() => {
    if (originalSrc && originalSrc !== src) {
      setSrc(originalSrc);
      setHasError(false);
      setRetryCount(0);
      setIsLoading(true);
    }
  }, [originalSrc, src]);

  const handleError = useCallback((event?: any) => {
    console.warn(`Image load failed: ${src}`, event);
    
    setIsLoading(false);
    
    // Call custom error handler
    onError?.(event);
    
    // If we're already showing fallback, mark as error
    if (src === fallbackSrc) {
      setHasError(true);
      return;
    }

    // If we haven't exceeded retry limit, try again
    if (retryCount < maxRetries) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setSrc(`${originalSrc}?retry=${retryCount + 1}&t=${Date.now()}`);
        setIsLoading(true);
      }, retryDelay);
      return;
    }

    // Use fallback
    setSrc(fallbackSrc);
    setHasError(true);
  }, [src, fallbackSrc, retryCount, maxRetries, retryDelay, originalSrc, onError]);

  const retry = useCallback(() => {
    if (originalSrc) {
      setRetryCount(0);
      setHasError(false);
      setIsLoading(true);
      setSrc(`${originalSrc}?retry=manual&t=${Date.now()}`);
    }
  }, [originalSrc]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  return {
    src,
    isLoading,
    hasError,
    retry,
    handleError: handleError,
  };
};