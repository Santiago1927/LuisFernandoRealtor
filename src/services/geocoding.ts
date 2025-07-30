/**
 * Servicio de Geocodificación usando Mapbox Geocoding API
 * 
 * Flujo principal:
 * 1. Debounce → reduce peticiones mientras el usuario escribe
 * 2. Autocomplete → obtiene sugerencias de direcciones
 * 3. Selección → usuario elige una sugerencia
 * 4. Centrado del mapa → actualiza coordenadas y vista
 * 5. Reverse geocoding → convierte coordenadas a dirección al arrastrar marcador
 */

// Tipos para las respuestas de Mapbox
export interface Feature {
  id: string;
  place_name: string;
  text: string;
  center: [number, number]; // [lng, lat]
  geometry: {
    coordinates: [number, number];
    type: 'Point';
  };
  properties: {
    [key: string]: any;
  };
  context?: Array<{
    id: string;
    text: string;
    wikidata?: string;
    short_code?: string;
  }>;
}

export interface GeocodingResponse {
  type: 'FeatureCollection';
  query: string[];
  features: Feature[];
  attribution: string;
}

export interface GeocodingError {
  message: string;
  code?: string;
}

class MapboxGeocodingService {
  private readonly baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('⚠️  NEXT_PUBLIC_MAPBOX_API_KEY no está configurada. El geocoding no funcionará.');
    }
  }

  /**
   * Geocodificar dirección con autocompletado
   * Obtiene sugerencias mientras el usuario escribe
   * 
   * @param query - Consulta de búsqueda (dirección parcial)
   * @param options - Opciones adicionales de búsqueda
   * @returns Promise<Feature[]> - Lista de sugerencias
   */
  async geocode(
    query: string, 
    options: {
      limit?: number;
      country?: string;
      proximity?: [number, number]; // [lng, lat]
      types?: string[];
      language?: string;
    } = {}
  ): Promise<Feature[]> {
    if (!this.apiKey) {
      throw new Error('Mapbox API key no configurada');
    }

    if (!query.trim() || query.trim().length < 3) {
      return []; // No buscar con menos de 3 caracteres
    }

    try {
      const searchParams = new URLSearchParams({
        access_token: this.apiKey,
        autocomplete: 'true',
        limit: (options.limit || 5).toString(),
        language: options.language || 'es',
      });

      // Configurar país (por defecto Colombia)
      if (options.country) {
        searchParams.append('country', options.country);
      } else {
        searchParams.append('country', 'co'); // Colombia por defecto
      }

      // Configurar proximidad (bias hacia ubicación cercana)
      if (options.proximity) {
        searchParams.append('proximity', `${options.proximity[0]},${options.proximity[1]}`);
      } else {
        // Medellín como centro por defecto
        searchParams.append('proximity', '-75.5812,6.2442');
      }

      // Tipos de lugares (address, poi, etc.)
      if (options.types && options.types.length > 0) {
        searchParams.append('types', options.types.join(','));
      }

      const encodedQuery = encodeURIComponent(query.trim());
      const url = `${this.baseUrl}/${encodedQuery}.json?${searchParams}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
      }

      const data: GeocodingResponse = await response.json();
      
      return data.features || [];
      
    } catch (error) {
      console.error('❌ Error en geocoding:', error);
      throw error;
    }
  }

  /**
   * Reverse Geocoding: Convertir coordenadas en dirección
   * Se ejecuta cuando el usuario arrastra el marcador
   * 
   * @param lat - Latitud
   * @param lng - Longitud
   * @param options - Opciones adicionales
   * @returns Promise<string> - Dirección formateada
   */
  async reverseGeocode(
    lat: number, 
    lng: number,
    options: {
      types?: string[];
      language?: string;
    } = {}
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Mapbox API key no configurada');
    }

    try {
      const searchParams = new URLSearchParams({
        access_token: this.apiKey,
        language: options.language || 'es',
        limit: '1',
      });

      // Tipos de resultados
      if (options.types && options.types.length > 0) {
        searchParams.append('types', options.types.join(','));
      }

      const url = `${this.baseUrl}/${lng},${lat}.json?${searchParams}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
      }

      const data: GeocodingResponse = await response.json();
      
      if (data.features && data.features.length > 0) {
        return data.features[0].place_name;
      }
      
      // Fallback si no encuentra dirección específica
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      
    } catch (error) {
      console.error('❌ Error en reverse geocoding:', error);
      throw error;
    }
  }

  /**
   * Buscar direcciones específicamente en Colombia
   * Optimizado para direcciones colombianas
   * 
   * @param query - Consulta de búsqueda
   * @param city - Ciudad específica (opcional)
   * @returns Promise<Feature[]> - Sugerencias filtradas
   */
  async geocodeColombianAddress(query: string, city?: string): Promise<Feature[]> {
    const searchQuery = city ? `${query}, ${city}` : query;
    
    return this.geocode(searchQuery, {
      country: 'co',
      types: ['address', 'poi'],
      limit: 8,
      proximity: [-75.5812, 6.2442], // Medellín
    });
  }

  /**
   * Validar si la API está configurada correctamente
   * @returns boolean - true si la API key está presente
   */
  isConfigured(): boolean {
    return !!this.apiKey && this.apiKey.startsWith('pk.');
  }

  /**
   * Obtener información de configuración para debugging
   * @returns object - Estado de la configuración
   */
  getConfigInfo() {
    return {
      hasApiKey: !!this.apiKey,
      apiKeyValid: this.isConfigured(),
      apiKeyPrefix: this.apiKey ? this.apiKey.substring(0, 8) + '...' : 'No configurada',
    };
  }
}

// Instancia singleton del servicio
export const geocodingService = new MapboxGeocodingService();

// Fallback al servicio anterior si Mapbox no está configurado
import { geocodingService as nominatimService } from './geocodingService';

/**
 * Servicio híbrido que usa Mapbox si está disponible, sino Nominatim
 */
export const hybridGeocodingService = {
  async geocode(query: string): Promise<Feature[]> {
    if (geocodingService.isConfigured()) {
      try {
        return await geocodingService.geocode(query);
      } catch (error) {
        console.warn('⚠️  Mapbox falló, usando Nominatim como fallback');
        // Convertir resultado de Nominatim al formato de Mapbox
        const result = await nominatimService.geocode(query);
        if (result) {
          return [{
            id: 'nominatim-' + Date.now(),
            place_name: result.address,
            text: result.address,
            center: [result.lng, result.lat],
            geometry: {
              coordinates: [result.lng, result.lat],
              type: 'Point' as const,
            },
            properties: {
              city: result.city,
              country: result.country,
            },
          }];
        }
        return [];
      }
    } else {
      // Usar Nominatim como fallback
      const result = await nominatimService.geocode(query);
      if (result) {
        return [{
          id: 'nominatim-' + Date.now(),
          place_name: result.address,
          text: result.address,
          center: [result.lng, result.lat],
          geometry: {
            coordinates: [result.lng, result.lat],
            type: 'Point' as const,
          },
          properties: {
            city: result.city,
            country: result.country,
          },
        }];
      }
      return [];
    }
  },

  async reverseGeocode(lat: number, lng: number): Promise<string> {
    if (geocodingService.isConfigured()) {
      try {
        return await geocodingService.reverseGeocode(lat, lng);
      } catch (error) {
        console.warn('⚠️  Mapbox reverse geocoding falló, usando Nominatim');
        const result = await nominatimService.reverseGeocode(lat, lng);
        return result?.address || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      }
    } else {
      const result = await nominatimService.reverseGeocode(lat, lng);
      return result?.address || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  }
};

/**
 * ================================================
 * DOCUMENTACIÓN DEL FLUJO COMPLETO
 * ================================================
 * 
 * ## Flujo Principal:
 * 1. **Debounce (300ms)** → Usuario escribe "Carrera 80" → Esperamos 300ms
 * 2. **Autocomplete** → Se ejecuta geocoding → Obtiene 5-8 sugerencias
 * 3. **Selección** → Usuario hace click/Enter → Actualiza input y coordenadas
 * 4. **Centrado del mapa** → Mapa se centra en las coordenadas → Marcador se posiciona
 * 5. **Drag & Drop** → Usuario arrastra marcador → Reverse geocoding → Actualiza input
 * 
 * ## Componentes Clave:
 * - `AddressInputWithMap`: Componente principal con input y mapa
 * - `useAddressSearch`: Hook que maneja todo el estado
 * - `useGeocode`: Hook con debounce para autocompletado
 * - `useReverseGeocode`: Hook para coordenadas → dirección
 * - `hybridGeocodingService`: Servicio con fallback Mapbox → Nominatim
 * 
 * ## Estados Manejados:
 * - Loading: Durante búsquedas y reverse geocoding
 * - Error: Manejo de errores de red y API
 * - Empty: Sin resultados para la búsqueda
 * - Success: Sugerencias y direcciones obtenidas
 * 
 * ================================================
 * RECOMENDACIONES PARA PRODUCCIÓN
 * ================================================
 * 
 * ## 1. Caching Inteligente:
 * - Implementar Redis/Memcached para geocoding results
 * - Cache por 24-48 horas para direcciones populares
 * - Implementar cache de navegador con service workers
 * 
 * ## 2. Límites de Peticiones:
 * - Rate limiting por IP: 100 requests/hora
 * - Debounce aumentado a 500ms en mobile
 * - Batch requests para múltiples direcciones
 * 
 * ## 3. Optimizaciones:
 * - Prefetch de direcciones populares al cargar página
 * - Lazy loading del mapa hasta que se necesite
 * - Compresión de respuestas del servidor
 * 
 * ## 4. Monitoreo:
 * - Tracking de usage de la API (costos)
 * - Alertas por errores de geocoding
 * - Métricas de performance del autocompletado
 * 
 * ## 5. Backup Strategy:
 * - Mapbox como primario (más preciso)
 * - Nominatim como fallback (gratuito)
 * - Google Maps como último recurso
 * 
 * ## 6. UX Enhancements:
 * - Historial de búsquedas recientes
 * - Detección de ubicación actual del usuario
 * - Validación de direcciones antes de submit
 * 
 * ## 7. Seguridad:
 * - API keys en variables de entorno
 * - Validación server-side de coordenadas
 * - Sanitización de inputs de usuario
 */ 