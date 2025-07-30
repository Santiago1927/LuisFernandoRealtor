'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { geocodingService, GeocodingResult } from '../../services/geocodingService';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { MapPin, Navigation, RefreshCw } from 'lucide-react';

// Props del componente MapView
interface MapViewProps {
  address: string;
  lat?: number;
  lng?: number;
  onLocationChange?: (lat: number, lng: number, address: string) => void;
  draggable?: boolean;
  className?: string;
  height?: string;
}

// Icono personalizado para el marcador
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Componente para manejar el marcador arrastrable
function DraggableMarker({ 
  position, 
  onPositionChange, 
  draggable = true,
  address 
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
            Lat: {position[0].toFixed(6)}<br />
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

// Componente para centrar el mapa en una posición
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 16);
  }, [map, center]);

  return null;
}

// Componente principal MapView
function MapView({ 
  address, 
  lat, 
  lng, 
  onLocationChange, 
  draggable = true,
  className = '',
  height = '400px'
}: MapViewProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [currentAddress, setCurrentAddress] = useState(address);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geocodingAttempted, setGeocodingAttempted] = useState(false);

  // Función para geocodificar una dirección
  const geocodeAddress = useCallback(async (addressToGeocode: string) => {
    if (!addressToGeocode.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await geocodingService.geocodeColombianAddress(addressToGeocode);
      
      if (result) {
        const newPosition: [number, number] = [result.lat, result.lng];
        setPosition(newPosition);
        setCurrentAddress(result.address);
        
        if (onLocationChange) {
          onLocationChange(result.lat, result.lng, result.address);
        }
      } else {
        setError('No se pudo encontrar la dirección. Verifica el formato e intenta nuevamente.');
        
        // Mostrar ejemplos de formato
        const examples = geocodingService.getAddressFormatExamples();
        console.log('Ejemplos de formato válido:', examples);
      }
    } catch (err) {
      setError('Error al buscar la dirección. Intenta nuevamente.');
      console.error('Error en geocodificación:', err);
    } finally {
      setLoading(false);
      setGeocodingAttempted(true);
    }
  }, [onLocationChange]);

  // Función para reverse geocoding
  const reverseGeocode = useCallback(async (latitude: number, longitude: number) => {
    setLoading(true);
    
    try {
      const result = await geocodingService.reverseGeocode(latitude, longitude);
      
      if (result) {
        setCurrentAddress(result.address);
        
        if (onLocationChange) {
          onLocationChange(latitude, longitude, result.address);
        }
      }
    } catch (err) {
      console.error('Error en reverse geocoding:', err);
    } finally {
      setLoading(false);
    }
  }, [onLocationChange]);

  // Manejar cambio de posición del marcador
  const handleMarkerPositionChange = useCallback((latitude: number, longitude: number) => {
    const newPosition: [number, number] = [latitude, longitude];
    setPosition(newPosition);
    
    if (draggable) {
      reverseGeocode(latitude, longitude);
    }
  }, [draggable, reverseGeocode]);

  // Efecto para geocodificar cuando cambia la dirección
  useEffect(() => {
    if (lat && lng) {
      // Si ya tenemos coordenadas, usarlas directamente
      setPosition([lat, lng]);
      setCurrentAddress(address);
      setGeocodingAttempted(true);
    } else if (address && !geocodingAttempted) {
      // Geocodificar la dirección
      geocodeAddress(address);
    }
  }, [address, lat, lng, geocodeAddress, geocodingAttempted]);

  // Función para reintentar geocodificación
  const retryGeocoding = () => {
    setGeocodingAttempted(false);
    setError(null);
    geocodeAddress(address);
  };

  // Coordenadas por defecto (Medellín, Colombia)
  const defaultCenter: [number, number] = [6.2442, -75.5812];
  const mapCenter = position || defaultCenter;

  return (
    <div className={`map-wrapper ${className}`}>
      {/* Estado de carga */}
      {loading && (
        <div className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
          <RefreshCw className="w-5 h-5 animate-spin text-blue-600 mr-2" />
          <span className="text-blue-700 dark:text-blue-300">
            Buscando ubicación...
          </span>
        </div>
      )}

      {/* Mensaje de error */}
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

      {/* Información de la dirección */}
      {position && currentAddress && (
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
          <div className="flex items-start space-x-2">
            <MapPin className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {currentAddress}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {position[0].toFixed(6)}, {position[1].toFixed(6)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenedor del mapa */}
      <div 
        className={`map-container ${!draggable ? 'readonly' : ''}`}
        style={{ height }}
      >
        {position ? (
          <MapContainer
            center={mapCenter}
            zoom={16}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={draggable}
            dragging={draggable}
            touchZoom={draggable}
            doubleClickZoom={draggable}
            boxZoom={draggable}
            keyboard={draggable}
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
                {geocodingAttempted ? 'Ubicación no encontrada' : 'Ingresa una dirección para mostrar el mapa'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Instrucciones para modo editable */}
      {draggable && position && (
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
          💡 Puedes arrastrar el marcador para ajustar la ubicación exacta
        </div>
      )}
    </div>
  );
}

// Exportar componente con carga dinámica para evitar problemas de SSR
export default dynamic(() => Promise.resolve(MapView), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="text-center">
        <RefreshCw className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-2" />
        <div className="text-gray-600 dark:text-gray-400">Cargando mapa...</div>
      </div>
    </div>
  ),
}); 