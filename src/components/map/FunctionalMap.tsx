"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Plus, Minus, Navigation } from "lucide-react";

interface FunctionalMapProps {
  address: string;
  lat?: number;
  lng?: number;
  onLocationChange?: (lat: number, lng: number, address: string) => void;
  draggable?: boolean;
  className?: string;
  height?: string;
}

export default function FunctionalMap({
  address,
  lat = 4.6097,
  lng = -74.0817,
  onLocationChange,
  draggable = true,
  className = "",
  height = "400px",
}: FunctionalMapProps) {
  const [position, setPosition] = useState({ lat, lng });
  const [zoom, setZoom] = useState(16);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (lat && lng) {
      setPosition({ lat, lng });
    }
  }, [lat, lng]);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!draggable || isDragging) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Calcular nueva posición basada en el click
    const deltaX = (clickX - centerX) / rect.width;
    const deltaY = (clickY - centerY) / rect.height;

    // Escala basada en el zoom (más zoom = menos movimiento)
    const scale = 0.01 / (zoom / 10);

    const newLat = position.lat - deltaY * scale;
    const newLng = position.lng + deltaX * scale;

    setPosition({ lat: newLat, lng: newLng });
    onLocationChange?.(newLat, newLng, address);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (!draggable) return;
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !draggable) return;

    const deltaX = event.clientX - dragStart.x;
    const deltaY = event.clientY - dragStart.y;

    const scale = 0.0001 / (zoom / 10);

    const newLat = position.lat + deltaY * scale;
    const newLng = position.lng - deltaX * scale;

    setPosition({ lat: newLat, lng: newLng });
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onLocationChange?.(position.lat, position.lng, address);
    }
  };

  const zoomIn = () => {
    setZoom(Math.min(20, zoom + 1));
  };

  const zoomOut = () => {
    setZoom(Math.max(1, zoom - 1));
  };

  const centerOnLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newLat = pos.coords.latitude;
          const newLng = pos.coords.longitude;
          setPosition({ lat: newLat, lng: newLng });
          onLocationChange?.(newLat, newLng, address);
        },
        (error) => {
          console.warn("No se pudo obtener la ubicación:", error);
        }
      );
    }
  };

  return (
    <div
      className={`relative bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden cursor-pointer ${className}`}
      style={{ height }}
      onClick={handleMapClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Fondo del mapa con patrón */}
      <div className="absolute inset-0">
        <svg
          width="100%"
          height="100%"
          className="text-blue-200 dark:text-blue-700"
        >
          <defs>
            <pattern
              id="mapGrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <rect width="40" height="40" fill="currentColor" opacity="0.1" />
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
            </pattern>
            <pattern
              id="mapDots"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapGrid)" />
          <rect width="100%" height="100%" fill="url(#mapDots)" />
        </svg>
      </div>

      {/* Calles simuladas */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-400 dark:bg-gray-600 opacity-60"></div>
        <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-400 dark:bg-gray-600 opacity-60"></div>
        <div className="absolute top-0 bottom-0 left-1/4 w-1 bg-gray-400 dark:bg-gray-600 opacity-60"></div>
        <div className="absolute top-0 bottom-0 left-3/4 w-1 bg-gray-400 dark:bg-gray-600 opacity-60"></div>
      </div>

      {/* Marcador central */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full z-20">
        <div className="relative">
          {/* Pin del marcador */}
          <div className="w-8 h-8 bg-red-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          {/* Sombra del pin */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black opacity-30 rounded-full blur-sm"></div>

          {/* Popup de información */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg text-xs whitespace-nowrap border border-gray-200 dark:border-gray-600">
            <div className="font-semibold text-gray-800 dark:text-gray-200">
              📍 {address || "Ubicación"}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
            </div>
            {/* Flecha del popup */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"></div>
          </div>
        </div>
      </div>

      {/* Controles de zoom */}
      <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-600">
        <button
          onClick={(e) => {
            e.stopPropagation();
            zoomIn();
          }}
          className="block w-10 h-10 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 transition-colors"
          title="Zoom in"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            zoomOut();
          }}
          className="block w-10 h-10 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 transition-colors"
          title="Zoom out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Botón de ubicación actual */}
      <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
        <button
          onClick={(e) => {
            e.stopPropagation();
            centerOnLocation();
          }}
          className="w-10 h-10 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 transition-colors rounded-lg"
          title="Mi ubicación"
        >
          <Navigation className="w-4 h-4" />
        </button>
      </div>

      {/* Indicador de zoom */}
      <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-lg text-xs border border-gray-200 dark:border-gray-600">
        <span className="text-gray-600 dark:text-gray-400">Zoom: {zoom}</span>
      </div>

      {/* Información de coordenadas */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg text-xs border border-gray-200 dark:border-gray-600">
        <div className="text-gray-600 dark:text-gray-400">
          <div>Lat: {position.lat.toFixed(6)}</div>
          <div>Lng: {position.lng.toFixed(6)}</div>
        </div>
      </div>

      {/* Instrucciones */}
      {draggable && (
        <div className="absolute bottom-4 center left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-lg shadow-lg text-xs">
          💡 Haz clic para mover el marcador
        </div>
      )}
    </div>
  );
}
