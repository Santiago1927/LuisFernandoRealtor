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
  private readonly baseUrl = "https://nominatim.openstreetmap.org";
  private readonly userAgent = "LuisFernandoRealtor/1.0";
  private readonly rateLimitDelay = 1000; // 1 segundo entre requests
  private lastRequestTime = 0;
  private failedRequests = new Set<string>();

  /**
   * Verificar si el servicio está disponible
   */
  private async checkServiceAvailability(): Promise<boolean> {
    try {
      const testUrl = `${this.baseUrl}/search?format=json&q=Colombia&limit=1`;
      const response = await fetch(testUrl, {
        headers: {
          "User-Agent": this.userAgent,
        },
        // Timeout corto para test
        signal: AbortSignal.timeout(5000),
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Geocodificar: Convertir dirección en coordenadas
   * @param address Dirección completa (ej: "Carrera 80 #45-23, Medellín, Colombia")
   * @returns Coordenadas y información de la dirección
   */
  async geocode(address: string): Promise<GeocodingResult | null> {
    // Si ya falló esta dirección anteriormente, no intentar de nuevo
    if (this.failedRequests.has(address)) {
      return null;
    }

    try {
      // Rate limiting básico
      const now = Date.now();
      if (now - this.lastRequestTime < this.rateLimitDelay) {
        await new Promise((resolve) =>
          setTimeout(
            resolve,
            this.rateLimitDelay - (now - this.lastRequestTime)
          )
        );
      }
      this.lastRequestTime = Date.now();

      const encodedAddress = encodeURIComponent(address);
      const url = `${this.baseUrl}/search?format=json&q=${encodedAddress}&limit=1&addressdetails=1`;

      const response = await fetch(url, {
        headers: {
          "User-Agent": this.userAgent,
          Accept: "application/json",
        },
        // Timeout de 10 segundos
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        // Si es 403 o 429, marcar como servicio no disponible temporalmente
        if (response.status === 403 || response.status === 429) {
          this.failedRequests.add(address);
          // Logging silencioso para evitar spam
          return null;
        }
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
        city:
          addressDetails.city ||
          addressDetails.town ||
          addressDetails.municipality,
        country: addressDetails.country,
        postalCode: addressDetails.postcode,
      };
    } catch (error) {
      // Marcar como fallido para evitar reintentos
      this.failedRequests.add(address);

      // Solo log ocasional en desarrollo para evitar spam
      if (process.env.NODE_ENV === "development" && Math.random() < 0.1) {
        console.warn(
          "Geocoding service unavailable:",
          error instanceof Error ? error.message : "Unknown error"
        );
      }
      return null;
    }
  }

  /**
   * Reverse Geocoding: Convertir coordenadas en dirección
   * @param lat Latitud
   * @param lng Longitud
   * @returns Información de la dirección
   */
  async reverseGeocode(
    lat: number,
    lng: number
  ): Promise<ReverseGeocodingResult | null> {
    try {
      const url = `${this.baseUrl}/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;

      const response = await fetch(url, {
        headers: {
          "User-Agent": this.userAgent,
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
        addressParts.push(
          `${addressDetails.road} ${addressDetails.house_number}`
        );
      } else if (addressDetails.road) {
        addressParts.push(addressDetails.road);
      }

      if (addressDetails.neighbourhood || addressDetails.suburb) {
        addressParts.push(
          addressDetails.neighbourhood || addressDetails.suburb
        );
      }

      if (
        addressDetails.city ||
        addressDetails.town ||
        addressDetails.municipality
      ) {
        addressParts.push(
          addressDetails.city ||
            addressDetails.town ||
            addressDetails.municipality
        );
      }

      if (addressDetails.country) {
        addressParts.push(addressDetails.country);
      }

      return {
        address: addressParts.join(", ") || data.display_name,
        city:
          addressDetails.city ||
          addressDetails.town ||
          addressDetails.municipality,
        country: addressDetails.country,
        postalCode: addressDetails.postcode,
      };
    } catch (error) {
      console.error("Error en reverse geocoding:", error);
      return null;
    }
  }

  /**
   * Geocodificar direcciones colombianas con mejor precisión
   * @param address Dirección
   * @param city Ciudad (opcional para mejorar precisión)
   * @returns Resultado de geocodificación
   */
  async geocodeColombianAddress(
    address: string,
    city?: string
  ): Promise<GeocodingResult | null> {
    // Si ya falló esta combinación, retornar null inmediatamente con coordenadas por defecto
    const cacheKey = `${address}_${city || ""}`;
    if (this.failedRequests.has(cacheKey)) {
      // Retornar coordenadas por defecto para Colombia (Bogotá)
      return {
        lat: 4.6097,
        lng: -74.0817,
        address: address,
        city: city || "Bogotá",
        country: "Colombia",
      };
    }

    const searchQueries = [];

    // Solo intentar una consulta para evitar múltiples errores
    if (city) {
      searchQueries.push(`${address}, ${city}, Colombia`);
    } else {
      searchQueries.push(`${address}, Colombia`);
    }

    for (const query of searchQueries) {
      const result = await this.geocode(query);
      if (result) {
        return result;
      }

      // Si falló, marcar en cache y retornar coordenadas por defecto
      this.failedRequests.add(cacheKey);
      break; // Solo intentar una vez
    }

    // Retornar coordenadas por defecto para Colombia
    return {
      lat: 4.6097,
      lng: -74.0817,
      address: address,
      city: city || "Bogotá",
      country: "Colombia",
    };
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

    return patterns.some((pattern) => pattern.test(address));
  }

  /**
   * Sugerir formato correcto para direcciones
   * @returns Array de ejemplos de formato
   */
  getAddressFormatExamples(): string[] {
    return [
      "Carrera 80 #45-23",
      "Calle 100 #15-30",
      "Avenida El Dorado #68-45",
      "Diagonal 15 #45-67",
      "Transversal 25 #12-34",
      "Cr 45 #23-15",
      "Cl 67 #34-12",
    ];
  }
}

export const geocodingService = new GeocodingService();
