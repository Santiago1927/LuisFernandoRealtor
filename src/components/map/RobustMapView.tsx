"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import FallbackMap from "./FallbackMap";
import SimpleMap from "./SimpleMap";

interface MapViewProps {
  address: string;
  lat?: number;
  lng?: number;
  onLocationChange?: (lat: number, lng: number, address: string) => void;
  draggable?: boolean;
  className?: string;
  height?: string;
}

// Intentar cargar el mapa completo de Leaflet, con fallback a mapa simple
const WorkingLeafletMap = dynamic(() => import("./WorkingMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="text-center">
        <div className="w-8 h-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent mx-auto mb-2" />
        <div className="text-gray-600 dark:text-gray-400">
          Cargando mapa avanzado...
        </div>
      </div>
    </div>
  ),
});

// Componente wrapper con manejo de errores y fallbacks
export default function RobustMapView(props: MapViewProps) {
  const [mapError, setMapError] = useState(false);
  const [useSimpleMap, setUseSimpleMap] = useState(false);

  useEffect(() => {
    // Detectar si hay problemas con Leaflet y cambiar a mapa simple
    const checkLeafletSupport = () => {
      try {
        // Verificar si el navegador soporta todas las características necesarias
        if (typeof window !== "undefined" && window.navigator) {
          return true;
        }
        return false;
      } catch (error) {
        console.warn("Leaflet not supported, using simple map:", error);
        setUseSimpleMap(true);
        return false;
      }
    };

    checkLeafletSupport();
  }, []);

  // Si hay error o se prefiere el mapa simple, usar SimpleMap
  if (mapError || useSimpleMap) {
    return <SimpleMap {...props} />;
  }

  // Wrapper para capturar errores del mapa de Leaflet
  return (
    <div>
      <WorkingLeafletMap {...props} />
    </div>
  );
}
