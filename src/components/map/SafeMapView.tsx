"use client";

import dynamic from "next/dynamic";
import { ComponentType } from "react";

interface MapViewProps {
  address: string;
  lat?: number;
  lng?: number;
  onLocationChange?: (lat: number, lng: number, address: string) => void;
  draggable?: boolean;
  className?: string;
  height?: string;
}

// Importación dinámica más robusta con manejo de errores
const DynamicLeafletMap = dynamic<MapViewProps>(
  () =>
    import("./ClientLeafletMap")
      .then((mod) => mod.default)
      .catch(() => {
        // Fallback en caso de error de carga
        const ErrorFallback = () => (
          <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="text-red-500 mb-2">⚠️</div>
              <div className="text-gray-600 dark:text-gray-400">
                Error al cargar el mapa
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Por favor, recarga la página
              </div>
            </div>
          </div>
        );
        ErrorFallback.displayName = "MapErrorFallback";
        return ErrorFallback;
      }),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="text-center">
          <div className="w-8 h-8 animate-spin rounded-full border-2 border-gray-300 border-t-transparent mx-auto mb-2" />
          <div className="text-gray-600 dark:text-gray-400">
            Cargando mapa...
          </div>
        </div>
      </div>
    ),
  }
);

export default DynamicLeafletMap;
