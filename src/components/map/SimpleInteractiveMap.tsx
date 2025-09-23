"use client";

import React, { useState } from "react";
import { MapPin, Crosshair } from "lucide-react";

interface SimpleInteractiveMapProps {
  address: string;
  lat?: number;
  lng?: number;
  onLocationChange?: (lat: number, lng: number, address: string) => void;
  draggable?: boolean;
  className?: string;
  height?: string;
}

export default function SimpleInteractiveMap({
  address,
  lat = 4.6097,
  lng = -74.0817,
  onLocationChange,
  draggable = true,
  className = "",
  height = "400px",
}: SimpleInteractiveMapProps) {
  const [position, setPosition] = useState({ lat, lng });
  const [isActive, setIsActive] = useState(false);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!draggable) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Calcular nueva posición basada en el click
    const deltaX = (clickX - centerX) / rect.width;
    const deltaY = (clickY - centerY) / rect.height;

    // Escala para el movimiento
    const scale = 0.01;

    const newLat = position.lat - deltaY * scale;
    const newLng = position.lng + deltaX * scale;

    setPosition({ lat: newLat, lng: newLng });
    setIsActive(true);

    // Llamar al callback
    onLocationChange?.(newLat, newLng, address);

    // Reset active state después de un momento
    setTimeout(() => setIsActive(false), 500);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600 ${className}`}
      style={{ height }}
    >
      {/* Fondo base del mapa */}
      <div
        className="w-full h-full bg-gradient-to-br from-green-100 via-blue-100 to-green-200 dark:from-green-900 dark:via-blue-900 dark:to-green-800 cursor-pointer relative"
        onClick={handleMapClick}
      >
        {/* Patrón de fondo que simula un mapa */}
        <div className="absolute inset-0 opacity-20">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            className="text-green-600 dark:text-green-400"
          >
            {/* Río o calle principal */}
            <path
              d="M0,50 Q25,40 50,50 T100,45"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            {/* Calles secundarias */}
            <line
              x1="20"
              y1="0"
              x2="25"
              y2="100"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1="60"
              y1="0"
              x2="55"
              y2="100"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1="80"
              y1="0"
              x2="85"
              y2="100"
              stroke="currentColor"
              strokeWidth="1"
            />

            {/* Bloques de edificios */}
            <rect
              x="10"
              y="20"
              width="8"
              height="15"
              fill="currentColor"
              opacity="0.3"
            />
            <rect
              x="25"
              y="60"
              width="12"
              height="20"
              fill="currentColor"
              opacity="0.3"
            />
            <rect
              x="65"
              y="25"
              width="10"
              height="18"
              fill="currentColor"
              opacity="0.3"
            />
            <rect
              x="45"
              y="70"
              width="15"
              height="12"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* Marcador en el centro */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
          <div
            className={`transition-all duration-300 ${
              isActive ? "scale-125" : "scale-100"
            }`}
          >
            {/* Pin del marcador */}
            <div className="relative">
              <div className="w-10 h-10 bg-red-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>

              {/* Efecto de pulso cuando está activo */}
              {isActive && (
                <div className="absolute inset-0 w-10 h-10 bg-red-400 rounded-full animate-ping opacity-75"></div>
              )}

              {/* Sombra del marcador */}
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-black opacity-20 rounded-full blur-sm"></div>
            </div>
          </div>
        </div>

        {/* Crosshair en el centro para indicar donde se puede hacer clic */}
        {draggable && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Crosshair className="w-8 h-8 text-gray-400 opacity-50" />
          </div>
        )}

        {/* Información de la ubicación */}
        <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg max-w-xs">
          <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
            📍 Ubicación seleccionada
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            {address || "Dirección no especificada"}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
          </div>
        </div>

        {/* Instrucciones */}
        {draggable && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
            🖱️ Haz clic para cambiar la ubicación
          </div>
        )}

        {/* Indicador de estado */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
            Mapa activo
          </span>
        </div>

        {/* Coordenadas en tiempo real */}
        <div className="absolute bottom-4 right-4 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-3 py-2 rounded-lg text-xs font-mono">
          <div>LAT: {position.lat.toFixed(6)}</div>
          <div>LNG: {position.lng.toFixed(6)}</div>
        </div>
      </div>
    </div>
  );
}
