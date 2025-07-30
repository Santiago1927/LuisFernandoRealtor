'use client';

import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Search, Loader2, AlertCircle, Navigation, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import MapView from './MapView';
import { useAddressSearch } from '../../hooks/useGeocodingHooks';
import { Feature } from '../../services/geocoding';

/**
 * Props del componente AddressInputWithMap
 */
interface AddressInputWithMapProps {
  /** Etiqueta del input */
  label?: string;
  /** Placeholder del input */
  placeholder?: string;
  /** Dirección inicial */
  initialAddress?: string;
  /** Coordenadas iniciales [lat, lng] */
  initialCoordinates?: [number, number];
  /** Callback cuando cambian la dirección y coordenadas */
  onLocationChange?: (address: string, lat: number, lng: number) => void;
  /** Si el input es requerido */
  required?: boolean;
  /** Clases CSS adicionales */
  className?: string;
  /** Altura del mapa */
  mapHeight?: string;
  /** Si el mapa es arrastrable */
  draggable?: boolean;
  /** Nombre del campo para formularios */
  name?: string;
}

/**
 * Componente de input con autocompletado de direcciones y mapa interactivo
 * 
 * Características:
 * - Autocompletado con debounce de 300ms
 * - Dropdown navegable por teclado
 * - Mapa interactivo con marcador arrastrable
 * - Reverse geocoding al arrastrar marcador
 * - Manejo de estados de carga y error
 */
export default function AddressInputWithMap({
  label = 'Dirección',
  placeholder = 'Escribe una dirección...',
  initialAddress = '',
  initialCoordinates,
  onLocationChange,
  required = false,
  className = '',
  mapHeight = '300px',
  draggable = true,
  name = 'address',
}: AddressInputWithMapProps) {
  // Referencias DOM
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Estados locales
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [inputFocused, setInputFocused] = useState(false);

  // Hook principal para manejo de direcciones
  const {
    query,
    coordinates,
    suggestions,
    showSuggestions,
    isLoadingSuggestions,
    geocodingError,
    resolvedAddress,
    isLoadingAddress,
    reverseGeocodingError,
    isLoading,
    hasError,
    updateQuery,
    updateCoordinates,
    selectSuggestion,
    closeSuggestions,
    openSuggestions,
    hasResults,
    isSearching,
  } = useAddressSearch(initialAddress, initialCoordinates);

  /**
   * Manejar cambios en el input
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateQuery(value);
    setFocusedIndex(-1);
  };

  /**
   * Manejar selección de sugerencia
   */
  const handleSuggestionSelect = (suggestion: Feature) => {
    selectSuggestion(suggestion);
    const [lng, lat] = suggestion.center;
    onLocationChange?.(suggestion.place_name, lat, lng);
    inputRef.current?.blur();
  };

  /**
   * Manejar teclas especiales (navegación por teclado)
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0) {
          handleSuggestionSelect(suggestions[focusedIndex]);
        }
        break;
      
      case 'Escape':
        closeSuggestions();
        inputRef.current?.blur();
        break;
    }
  };

  /**
   * Manejar cambios de ubicación desde el mapa (drag & drop)
   */
  const handleMapLocationChange = (lat: number, lng: number, address: string) => {
    updateCoordinates(lat, lng);
    onLocationChange?.(address, lat, lng);
  };

  /**
   * Manejar focus del input
   */
  const handleInputFocus = () => {
    setInputFocused(true);
    openSuggestions();
  };

  /**
   * Manejar blur del input (con retraso para permitir clicks en dropdown)
   */
  const handleInputBlur = () => {
    setInputFocused(false);
    // Retraso para permitir clicks en el dropdown
    setTimeout(() => {
      closeSuggestions();
      setFocusedIndex(-1);
    }, 150);
  };

  /**
   * Limpiar búsqueda
   */
  const handleClear = () => {
    updateQuery('');
    closeSuggestions();
    setFocusedIndex(-1);
    inputRef.current?.focus();
  };

  // Efecto para cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        closeSuggestions();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeSuggestions]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Label */}
      <Label htmlFor={name} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {/* Input container con dropdown */}
      <div className="relative">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
          
          <Input
            ref={inputRef}
            id={name}
            name={name}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            required={required}
            className="pl-10 pr-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:border-amber-500 dark:focus:border-amber-400"
            autoComplete="off"
          />

          {/* Botón de limpiar / Indicador de carga */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
            ) : query ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-auto p-0 hover:bg-transparent"
              >
                <X className="w-4 h-4 text-zinc-400 hover:text-zinc-600" />
              </Button>
            ) : (
              <Search className="w-4 h-4 text-zinc-400" />
            )}
          </div>
        </div>

        {/* Dropdown de sugerencias */}
        {showSuggestions && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {/* Loading state */}
            {isLoadingSuggestions && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="w-4 h-4 animate-spin text-amber-500 mr-2" />
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Buscando...
                </span>
              </div>
            )}

            {/* Error state */}
            {geocodingError && !isLoadingSuggestions && (
              <div className="p-4">
                <div className="flex items-center text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Error de red. Intenta nuevamente.</span>
                </div>
              </div>
            )}

            {/* No results */}
            {!isLoadingSuggestions && !geocodingError && !hasResults && query.length >= 3 && (
              <div className="p-4">
                <div className="flex items-center text-zinc-500 dark:text-zinc-400">
                  <Search className="w-4 h-4 mr-2" />
                  <span className="text-sm">No se encontraron resultados</span>
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  Intenta con "Carrera 80 #45-23, Medellín"
                </div>
              </div>
            )}

            {/* Sugerencias */}
            {hasResults &&
              suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    index === focusedIndex
                      ? 'bg-amber-50 dark:bg-amber-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-zinc-800'
                  }`}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                        {suggestion.text}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                        {suggestion.place_name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Mensajes de error */}
      {hasError && (
        <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700 dark:text-red-300">
            {geocodingError ? 'Error al buscar direcciones.' : 'Error al obtener la ubicación.'}
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto ml-2 text-red-600 hover:text-red-800"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Estado de carga para reverse geocoding */}
      {isLoadingAddress && (
        <div className="flex items-center space-x-2 text-sm text-amber-600 dark:text-amber-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Obteniendo dirección...</span>
        </div>
      )}

      {/* Mapa */}
      {(coordinates || query) && (
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
          <MapView
            address={resolvedAddress || query}
            lat={coordinates?.[0]}
            lng={coordinates?.[1]}
            onLocationChange={handleMapLocationChange}
            draggable={draggable}
            height={mapHeight}
          />
        </div>
      )}

      {/* Instrucciones */}
      <div className="text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
        <div>💡 Escribe al menos 3 caracteres para ver sugerencias</div>
        {draggable && coordinates && (
          <div>🎯 Arrastra el marcador en el mapa para ajustar la ubicación</div>
        )}
      </div>
    </div>
  );
} 