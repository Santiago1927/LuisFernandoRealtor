/**
 * Servicio de Geocodificación usando Nominatim (OpenStreetMap)
 * API gratuita para convertir direcciones en coordenadas y viceversa
 */

export interface GeocodingResult {
  lat: number;
  lng: number;
  address: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

export interface ReverseGeocodingResult {
  address: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

class GeocodingService {
  private readonly baseUrl = 'https://nominatim.openstreetmap.org';
  private readonly userAgent = 'LuisFernandoRealtor/1.0';

  /**
   * Geocodificar: Convertir dirección en coordenadas
   * @param address Dirección completa (ej: "Carrera 80 #45-23, Medellín, Colombia")
   * @returns Coordenadas y información de la dirección
   */
  async geocode(address: string): Promise<GeocodingResult | null> {
    try {
      const encodedAddress = encodeURIComponent(address);
      const url = `${this.baseUrl}/search?format=json&q=${encodedAddress}&limit=1&addressdetails=1`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
        },
      });

      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        return null;
      }

      const result = data[0];
      const addressDetails = result.address || {};

      return {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        address: result.display_name || address,
        city: addressDetails.city || addressDetails.town || addressDetails.municipality,
        country: addressDetails.country,
        postalCode: addressDetails.postcode,
      };
    } catch (error) {
      console.error('Error en geocodificación:', error);
      return null;
    }
  }

  /**
   * Reverse Geocoding: Convertir coordenadas en dirección
   * @param lat Latitud
   * @param lng Longitud
   * @returns Información de la dirección
   */
  async reverseGeocode(lat: number, lng: number): Promise<ReverseGeocodingResult | null> {
    try {
      const url = `${this.baseUrl}/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
        },
      });

      if (!response.ok) {
        throw new Error(`Reverse geocoding API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.address) {
        return null;
      }

      const addressDetails = data.address;
      
      // Construir dirección legible
      const addressParts = [];
      
      if (addressDetails.house_number && addressDetails.road) {
        addressParts.push(`${addressDetails.road} ${addressDetails.house_number}`);
      } else if (addressDetails.road) {
        addressParts.push(addressDetails.road);
      }
      
      if (addressDetails.neighbourhood || addressDetails.suburb) {
        addressParts.push(addressDetails.neighbourhood || addressDetails.suburb);
      }
      
      if (addressDetails.city || addressDetails.town || addressDetails.municipality) {
        addressParts.push(addressDetails.city || addressDetails.town || addressDetails.municipality);
      }
      
      if (addressDetails.country) {
        addressParts.push(addressDetails.country);
      }

      return {
        address: addressParts.join(', ') || data.display_name,
        city: addressDetails.city || addressDetails.town || addressDetails.municipality,
        country: addressDetails.country,
        postalCode: addressDetails.postcode,
      };
    } catch (error) {
      console.error('Error en reverse geocoding:', error);
      return null;
    }
  }

  /**
   * Geocodificar direcciones colombianas con mejor precisión
   * @param address Dirección
   * @param city Ciudad (opcional para mejorar precisión)
   * @returns Resultado de geocodificación
   */
  async geocodeColombianAddress(address: string, city?: string): Promise<GeocodingResult | null> {
    const searchQueries = [];

    // Intentar con ciudad específica si se proporciona
    if (city) {
      searchQueries.push(`${address}, ${city}, Colombia`);
      searchQueries.push(`${address}, ${city}`);
    }

    // Intentar con Colombia
    searchQueries.push(`${address}, Colombia`);
    
    // Intentar dirección sola
    searchQueries.push(address);

    for (const query of searchQueries) {
      const result = await this.geocode(query);
      if (result) {
        return result;
      }
      
      // Pequeña pausa entre requests para no saturar la API
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    return null;
  }

  /**
   * Validar formato de dirección colombiana
   * @param address Dirección a validar
   * @returns true si el formato parece válido
   */
  validateColombianAddress(address: string): boolean {
    if (!address || address.length < 5) {
      return false;
    }

    // Patrones comunes en direcciones colombianas
    const patterns = [
      /carrera\s+\d+/i,
      /calle\s+\d+/i,
      /cr\s*\d+/i,
      /cl\s*\d+/i,
      /avenida/i,
      /av\./i,
      /diagonal/i,
      /transversal/i,
      /#\d+/,
      /\d+-\d+/,
    ];

    return patterns.some(pattern => pattern.test(address));
  }

  /**
   * Sugerir formato correcto para direcciones
   * @returns Array de ejemplos de formato
   */
  getAddressFormatExamples(): string[] {
    return [
      'Carrera 80 #45-23',
      'Calle 100 #15-30',
      'Avenida El Dorado #68-45',
      'Diagonal 15 #45-67',
      'Transversal 25 #12-34',
      'Cr 45 #23-15',
      'Cl 67 #34-12',
    ];
  }
}

export const geocodingService = new GeocodingService(); 