"use client";

import React from "react";
import { MapPin } from "lucide-react";

interface FallbackMapProps {
  address: string;
  lat?: number;
  lng?: number;
  onLocationChange?: (lat: number, lng: number, address: string) => void;
  draggable?: boolean;
  className?: string;
  height?: string;
}

/**
 * Componente de fallback para cuando el mapa no puede cargar
 */
export default function FallbackMap({
  address,
  lat,
  lng,
  height = "400px",
  className = "",
}: FallbackMapProps) {
  return (
    <div
      className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 ${className}`}
      style={{ height }}
    >
      <div className="text-center p-6">
        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <div className="text-gray-600 dark:text-gray-400 mb-2">
          Mapa temporalmente deshabilitado
        </div>
        {address && (
          <div className="text-sm text-gray-500 dark:text-gray-500">
            Dirección: {address}
          </div>
        )}
        {lat && lng && (
          <div className="text-xs text-gray-400 mt-1">
            Coordenadas: {lat.toFixed(4)}, {lng.toFixed(4)}
          </div>
        )}
      </div>
    </div>
  );
}
