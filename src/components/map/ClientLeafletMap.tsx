"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { geocodingService } from "../../services/geocodingService";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { MapPin, Navigation, RefreshCw, RotateCcw } from "lucide-react";

interface MapViewProps {
  address: string;
  lat?: number;
  lng?: number;
  onLocationChange?: (lat: number, lng: number, address: string) => void;
  draggable?: boolean;
  className?: string;
  height?: string;
}

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function DraggableMarker({
  position,
  onPositionChange,
  draggable = true,
  address,
}: {
  position: [number, number];
  onPositionChange: (lat: number, lng: number) => void;
  draggable: boolean;
  address: string;
}) {
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const { lat, lng } = marker.getLatLng();
        onPositionChange(lat, lng);
      }
    },
  };

  return (
    <Marker
      draggable={draggable}
      eventHandlers={draggable ? eventHandlers : undefined}
      position={position}
      ref={markerRef}
      icon={customIcon}
    >
      <Popup>
        <div className="text-sm">
          <div className="font-semibold mb-1">📍 Ubicación</div>
          <div className="text-gray-600 mb-2">{address}</div>
          <div className="text-xs text-gray-500">
            Lat: {position[0].toFixed(6)}
            <br />
            Lng: {position[1].toFixed(6)}
          </div>
          {draggable && (
            <div className="text-xs text-blue-600 mt-2">
              💡 Arrastra el marcador para ajustar la ubicación
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  );
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (map && center) {
      try {
        // Pequeño delay para asegurar que el mapa esté completamente montado
        setTimeout(() => {
          if (map) {
            map.setView(center, 16);
          }
        }, 100);
      } catch (error) {
        console.warn("Error al centrar el mapa:", error);
      }
    }
  }, [map, center]);
  return null;
}

export default function ClientLeafletMap({
  address,
  lat,
  lng,
  onLocationChange,
  draggable = true,
  className = "",
  height = "400px",
}: MapViewProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [currentAddress, setCurrentAddress] = useState(address);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geocodingAttempted, setGeocodingAttempted] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  // Asegurar que el mapa esté listo después del montaje
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapReady(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const geocodeAddress = useCallback(
    async (addressToGeocode: string) => {
      if (!addressToGeocode.trim()) return;

      // Evitar llamadas múltiples a la misma dirección
      if (currentAddress === addressToGeocode) return;

      setLoading(true);
      setError(null);
      try {
        const result = await geocodingService.geocodeColombianAddress(
          addressToGeocode
        );
        if (result) {
          const newPosition: [number, number] = [result.lat, result.lng];
          setPosition(newPosition);
          setCurrentAddress(result.address);
          onLocationChange?.(result.lat, result.lng, result.address);
        } else {
          // Usar coordenadas por defecto sin mostrar error para evitar spam
          const defaultPosition: [number, number] = [4.6097, -74.0817]; // Bogotá
          setPosition(defaultPosition);
          setCurrentAddress(addressToGeocode);
          onLocationChange?.(
            defaultPosition[0],
            defaultPosition[1],
            addressToGeocode
          );
        }
      } catch (err) {
        // Usar coordenadas por defecto silenciosamente
        const defaultPosition: [number, number] = [4.6097, -74.0817]; // Bogotá
        setPosition(defaultPosition);
        setCurrentAddress(addressToGeocode);
        onLocationChange?.(
          defaultPosition[0],
          defaultPosition[1],
          addressToGeocode
        );

        // Solo log ocasional en desarrollo
        if (process.env.NODE_ENV === "development" && Math.random() < 0.1) {
          console.warn(
            "Geocoding unavailable:",
            err instanceof Error ? err.message : "Service error"
          );
        }
      } finally {
        setLoading(false);
        setGeocodingAttempted(true);
      }
    },
    [onLocationChange, currentAddress]
  );

  const reverseGeocode = useCallback(
    async (latitude: number, longitude: number) => {
      setLoading(true);
      try {
        const result = await geocodingService.reverseGeocode(
          latitude,
          longitude
        );
        if (result) {
          setCurrentAddress(result.address);
          onLocationChange?.(latitude, longitude, result.address);
        }
      } catch (err) {
        console.error("Error en reverse geocoding:", err);
      } finally {
        setLoading(false);
      }
    },
    [onLocationChange]
  );

  const handleMarkerPositionChange = useCallback(
    (latitude: number, longitude: number) => {
      const newPosition: [number, number] = [latitude, longitude];
      setPosition(newPosition);
      if (draggable) {
        reverseGeocode(latitude, longitude);
      }
    },
    [draggable, reverseGeocode]
  );

  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]);
      setCurrentAddress(address);
      setGeocodingAttempted(true);
    } else if (address && !geocodingAttempted && address.trim().length > 5) {
      // Solo geocodificar direcciones que parezcan válidas
      geocodeAddress(address);
      setGeocodingAttempted(true);
    }
  }, [address, lat, lng, geocodeAddress, geocodingAttempted]);

  const retryGeocoding = () => {
    setGeocodingAttempted(false);
    setError(null);
    geocodeAddress(address);
  };

  const resetMap = () => {
    setPosition(null);
    setCurrentAddress("");
    setError(null);
    setLoading(false);
    setGeocodingAttempted(false);
    onLocationChange?.(0, 0, "");
  };

  const defaultCenter: [number, number] = [6.2442, -75.5812];
  const mapCenter = position || defaultCenter;

  return (
    <div className={`map-wrapper ${className}`}>
      {loading && (
        <div className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
          <RefreshCw className="w-5 h-5 animate-spin text-blue-600 mr-2" />
          <span className="text-blue-700 dark:text-blue-300">
            Buscando ubicación...
          </span>
        </div>
      )}

      {error && (
        <Alert className="mb-4 border-red-200 bg-red-50 dark:bg-red-900/20">
          <MapPin className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700 dark:text-red-300">
            <div className="mb-2">{error}</div>
            <div className="text-sm mb-3">
              <strong>Formatos sugeridos:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Carrera 80 #45-23, Medellín</li>
                <li>Calle 100 #15-30, Bogotá</li>
                <li>Avenida El Dorado #68-45</li>
              </ul>
            </div>
            <Button
              onClick={retryGeocoding}
              size="sm"
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              <Navigation className="w-4 h-4 mr-1" />
              Intentar nuevamente
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {position && currentAddress && (
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-2 flex-1">
              <MapPin className="w-5 h-5 text-custom-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {currentAddress}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {position[0].toFixed(6)}, {position[1].toFixed(6)}
                </div>
              </div>
            </div>
            {draggable && (
              <Button
                onClick={resetMap}
                size="sm"
                variant="outline"
                className="ml-2 border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                title="Reiniciar mapa"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      <div
        className={`map-container ${!draggable ? "readonly" : ""}`}
        style={{ height }}
      >
        {position && mapReady ? (
          <MapContainer
            center={mapCenter}
            zoom={16}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={draggable}
            dragging={draggable}
            touchZoom={draggable}
            doubleClickZoom={draggable}
            boxZoom={draggable}
            keyboard={draggable}
            whenReady={() => {
              // Mapa completamente cargado
              console.log("Mapa de Leaflet listo");
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker
              position={position}
              onPositionChange={handleMarkerPositionChange}
              draggable={draggable}
              address={currentAddress}
            />
            <MapController center={position} />
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <div className="text-gray-600 dark:text-gray-400">
                {geocodingAttempted
                  ? "Ubicación no encontrada"
                  : "Ingresa una dirección para mostrar el mapa"}
              </div>
            </div>
          </div>
        )}
      </div>

      {draggable && position && (
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
          💡 Puedes arrastrar el marcador para ajustar la ubicación exacta
        </div>
      )}
    </div>
  );
}

// Exportación explícita para compatibilidad con importación dinámica
export { ClientLeafletMap };
