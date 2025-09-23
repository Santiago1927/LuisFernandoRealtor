"use client";

import React from "react";
import dynamic from "next/dynamic";

// Importación dinámica del mapa de Leaflet para evitar problemas de SSR
const ClientLeafletMap = dynamic(
  () => import("./ClientLeafletMap").then((mod) => mod.default),
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

interface OptimizedMapProps {
  address: string;
  lat?: number;
  lng?: number;
  onLocationChange?: (lat: number, lng: number, address: string) => void;
  draggable?: boolean;
  className?: string;
  height?: string;
}

// Componente principal que usa el mapa de Leaflet con OpenStreetMap
export default function OptimizedMap(props: OptimizedMapProps) {
  return <ClientLeafletMap {...props} />;
}
