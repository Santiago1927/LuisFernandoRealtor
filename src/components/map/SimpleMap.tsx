"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface SimpleMapProps {
  address: string;
  lat?: number;
  lng?: number;
  onLocationChange?: (lat: number, lng: number, address: string) => void;
  draggable?: boolean;
  className?: string;
  height?: string;
}

// Componente de mapa simple sin dependencias externas problemáticas
function SimpleMapComponent({
  address,
  lat = 4.6097,
  lng = -74.0817,
  height = "400px",
  className = "",
  onLocationChange,
}: SimpleMapProps) {
  const [mapPosition, setMapPosition] = useState({ lat, lng });
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (lat && lng) {
      setMapPosition({ lat, lng });
    }
  }, [lat, lng]);

  useEffect(() => {
    // Simular carga del mapa
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!onLocationChange) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Simular conversión de coordenadas de pixel a lat/lng
    // En un mapa real, esto sería más preciso
    const newLat = mapPosition.lat + (y - rect.height / 2) * 0.001;
    const newLng = mapPosition.lng + (x - rect.width / 2) * 0.001;

    setMapPosition({ lat: newLat, lng: newLng });
    onLocationChange(newLat, newLng, address);
  };

  if (!mapLoaded) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <div className="w-8 h-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent mx-auto mb-2" />
          <div className="text-gray-600 dark:text-gray-400">
            Cargando mapa...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-blue-50 dark:bg-blue-900 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden cursor-crosshair ${className}`}
      style={{ height }}
      onClick={handleMapClick}
    >
      {/* Simulación de un mapa con cuadrícula */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="text-blue-300">
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Marcador de posición */}
      <div
        className="absolute w-6 h-6 transform -translate-x-3 -translate-y-6 z-10"
        style={{
          left: "50%",
          top: "50%",
        }}
      >
        <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
          📍 {address || "Ubicación"}
        </div>
      </div>

      {/* Controles del mapa */}
      <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 space-y-2">
        <button
          className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600 transition-colors"
          title="Zoom in"
        >
          +
        </button>
        <button
          className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600 transition-colors"
          title="Zoom out"
        >
          −
        </button>
      </div>

      {/* Información de coordenadas */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg text-xs">
        <div className="text-gray-600 dark:text-gray-400">
          Lat: {mapPosition.lat.toFixed(4)}
        </div>
        <div className="text-gray-600 dark:text-gray-400">
          Lng: {mapPosition.lng.toFixed(4)}
        </div>
      </div>

      {/* Mensaje de ayuda */}
      <div className="absolute bottom-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-lg shadow-lg text-xs max-w-48">
        💡 Haz clic en el mapa para cambiar la ubicación
      </div>
    </div>
  );
}

// Exportar con dynamic import para evitar errores de SSR
const SimpleMap = dynamic(() => Promise.resolve(SimpleMapComponent), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="text-center">
        <div className="w-8 h-8 animate-spin rounded-full border-2 border-gray-300 border-t-transparent mx-auto mb-2" />
        <div className="text-gray-600 dark:text-gray-400">Cargando mapa...</div>
      </div>
    </div>
  ),
});

export default SimpleMap;
