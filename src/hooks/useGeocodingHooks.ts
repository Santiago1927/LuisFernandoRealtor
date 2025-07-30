import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Feature, hybridGeocodingService } from '../services/geocoding';

/**
 * Hook personalizado para debounce
 * Retrasa la ejecución de una función hasta que hayan pasado N milisegundos
 * desde la última vez que se invocó
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook para geocoding con autocompletado
 * Incluye debounce de 300ms para optimizar las peticiones a la API
 * 
 * @param query - Consulta de búsqueda (dirección que escribe el usuario)
 * @param enabled - Si la búsqueda está habilitada (por defecto true)
 * @returns { data, isLoading, error, suggestions } - Estados y datos del geocoding
 */
export function useGeocode(query: string, enabled: boolean = true) {
  // Aplicar debounce de 300ms al query
  const debouncedQuery = useDebounce(query.trim(), 300);
  
  // Usar React Query para el geocoding con cache inteligente
  const {
    data: suggestions = [],
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['geocode', debouncedQuery],
    queryFn: async (): Promise<Feature[]> => {
      if (!debouncedQuery || debouncedQuery.length < 3) {
        return [];
      }
      return await hybridGeocodingService.geocode(debouncedQuery);
    },
    enabled: enabled && !!debouncedQuery && debouncedQuery.length >= 3,
    staleTime: 5 * 60 * 1000, // 5 minutos - cache de sugerencias
    retry: 2, // Reintentar 2 veces en caso de error
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    /** Lista de sugerencias de direcciones */
    data: suggestions,
    suggestions, // Alias para mayor claridad
    /** Indica si está cargando (incluye debounce) */
    isLoading: isLoading || isFetching,
    /** Error si la petición falló */
    error: error as Error | null,
    /** Indica si hay una búsqueda activa */
    isSearching: !!debouncedQuery && debouncedQuery.length >= 3,
    /** Query con debounce aplicado */
    debouncedQuery,
  };
}

/**
 * Hook para reverse geocoding
 * Convierte coordenadas en dirección (usado cuando se arrastra el marcador)
 * 
 * @param lat - Latitud
 * @param lng - Longitud  
 * @param enabled - Si la búsqueda está habilitada
 * @returns { data, isLoading, error } - Estados y datos del reverse geocoding
 */
export function useReverseGeocode(
  lat: number | null, 
  lng: number | null, 
  enabled: boolean = true
) {
  const {
    data: address,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['reverseGeocode', lat, lng],
    queryFn: async (): Promise<string> => {
      if (lat === null || lng === null) {
        throw new Error('Coordenadas no válidas');
      }
      return await hybridGeocodingService.reverseGeocode(lat, lng);
    },
    enabled: enabled && lat !== null && lng !== null,
    staleTime: 10 * 60 * 1000, // 10 minutos - las coordenadas no cambian frecuentemente
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    /** Dirección formateada obtenida de las coordenadas */
    data: address,
    address, // Alias para mayor claridad
    /** Indica si está cargando */
    isLoading,
    /** Error si la petición falló */
    error: error as Error | null,
    /** Función para refetch manual */
    refetch,
  };
}

/**
 * Hook avanzado para manejo completo de direcciones con autocompletado
 * Combina geocoding y reverse geocoding en un solo hook
 * 
 * @param initialQuery - Query inicial
 * @param initialCoords - Coordenadas iniciales [lat, lng]
 * @returns Estado completo y funciones para manejo de direcciones
 */
export function useAddressSearch(
  initialQuery: string = '',
  initialCoords: [number, number] | null = null
) {
  const [query, setQuery] = useState(initialQuery);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(initialCoords);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Feature | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Geocoding para autocompletado
  const geocodingResult = useGeocode(query, showSuggestions);
  
  // Reverse geocoding para coordenadas
  const reverseGeocodingResult = useReverseGeocode(
    coordinates?.[0] || null,
    coordinates?.[1] || null,
    !!coordinates
  );

  /**
   * Seleccionar una sugerencia del dropdown
   */
  const selectSuggestion = useCallback((suggestion: Feature) => {
    const [lng, lat] = suggestion.center;
    setQuery(suggestion.place_name);
    setCoordinates([lat, lng]);
    setSelectedSuggestion(suggestion);
    setShowSuggestions(false);
  }, []);

  /**
   * Actualizar query de búsqueda
   */
  const updateQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setSelectedSuggestion(null);
    setShowSuggestions(newQuery.length >= 3);
  }, []);

  /**
   * Actualizar coordenadas (por ejemplo, al arrastrar marcador)
   */
  const updateCoordinates = useCallback((lat: number, lng: number) => {
    setCoordinates([lat, lng]);
    setSelectedSuggestion(null);
  }, []);

  /**
   * Cerrar dropdown de sugerencias
   */
  const closeSuggestions = useCallback(() => {
    setShowSuggestions(false);
  }, []);

  /**
   * Abrir dropdown de sugerencias
   */
  const openSuggestions = useCallback(() => {
    if (query.length >= 3) {
      setShowSuggestions(true);
    }
  }, [query]);

  // Actualizar query cuando se obtiene dirección por reverse geocoding
  useEffect(() => {
    if (reverseGeocodingResult.address && !selectedSuggestion) {
      setQuery(reverseGeocodingResult.address);
    }
  }, [reverseGeocodingResult.address, selectedSuggestion]);

  return {
    // Estados
    query,
    coordinates,
    selectedSuggestion,
    showSuggestions,
    
    // Geocoding
    suggestions: geocodingResult.suggestions,
    isLoadingSuggestions: geocodingResult.isLoading,
    geocodingError: geocodingResult.error,
    
    // Reverse Geocoding
    resolvedAddress: reverseGeocodingResult.address,
    isLoadingAddress: reverseGeocodingResult.isLoading,
    reverseGeocodingError: reverseGeocodingResult.error,
    
    // Estados combinados
    isLoading: geocodingResult.isLoading || reverseGeocodingResult.isLoading,
    hasError: !!geocodingResult.error || !!reverseGeocodingResult.error,
    
    // Funciones
    updateQuery,
    updateCoordinates,
    selectSuggestion,
    closeSuggestions,
    openSuggestions,
    
    // Funciones de utilidad
    clearSearch: () => {
      setQuery('');
      setCoordinates(null);
      setSelectedSuggestion(null);
      setShowSuggestions(false);
    },
    
    // Estado de la búsqueda
    hasResults: geocodingResult.suggestions.length > 0,
    isSearching: geocodingResult.isSearching,
  };
} 