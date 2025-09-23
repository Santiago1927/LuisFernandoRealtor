"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

interface WorkingMapProps {
  address: string;
  lat?: number;
  lng?: number;
  onLocationChange?: (lat: number, lng: number, address: string) => void;
  draggable?: boolean;
  className?: string;
  height?: string;
}

function WorkingLeafletMap({
  address,
  lat = 4.6097,
  lng = -74.0817,
  onLocationChange,
  draggable = true,
  className = "",
  height = "400px",
}: WorkingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let map: any = null;
    let marker: any = null;

    async function initializeMap() {
      try {
        // Importar Leaflet dinámicamente
        const L = await import("leaflet");

        // Configurar iconos
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        });

        if (mapRef.current && !mapInstance) {
          // Crear el mapa
          map = L.map(mapRef.current).setView([lat, lng], 16);

          // Añadir la capa de tiles con mejor configuración
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
            minZoom: 1,
            crossOrigin: true,
          }).addTo(map);

          // Añadir marcador
          marker = L.marker([lat, lng], { draggable })
            .addTo(map)
            .bindPopup(`📍 ${address}`)
            .openPopup();

          // Evento de arrastre del marcador
          if (draggable && onLocationChange) {
            marker.on("dragend", function (e: any) {
              const position = e.target.getLatLng();
              onLocationChange(position.lat, position.lng, address);
            });
          }

          setMapInstance(map);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error inicializando el mapa:", err);
        setError("Error al cargar el mapa");
        setIsLoading(false);
      }
    }

    if (mapRef.current) {
      initializeMap();
    }

    // Cleanup
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [lat, lng, address, draggable, onLocationChange, mapInstance]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-red-50 dark:bg-red-900 rounded-lg border-2 border-dashed border-red-300 dark:border-red-600 ${className}`}
        style={{ height }}
      >
        <div className="text-center p-6">
          <div className="text-red-500 mb-2">⚠️</div>
          <div className="text-red-600 dark:text-red-400 mb-2">{error}</div>
          <div className="text-sm text-red-500 dark:text-red-500">
            Dirección: {address}
          </div>
          {lat && lng && (
            <div className="text-xs text-red-400 mt-1">
              Coordenadas: {lat.toFixed(4)}, {lng.toFixed(4)}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <div className="w-8 h-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent mx-auto mb-2" />
          <div className="text-gray-600 dark:text-gray-400">
            Cargando mapa interactivo...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg overflow-hidden ${className}`}
      style={{ height }}
    >
      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}

// Exportar con dynamic import para evitar errores de SSR
const WorkingMap = dynamic(() => Promise.resolve(WorkingLeafletMap), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="text-center">
        <div className="w-8 h-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent mx-auto mb-2" />
        <div className="text-gray-600 dark:text-gray-400">
          Iniciando mapa...
        </div>
      </div>
    </div>
  ),
});

export default WorkingMap;
