/**
 * Utilidades para el manejo y validación de URLs de imágenes
 */

export const ImageUtils = {
  /**
   * Valida si una URL de imagen es válida
   */
  isValidImageUrl(url: string | null | undefined): boolean {
    if (!url || typeof url !== "string") return false;

    // URLs locales son válidas
    if (url.startsWith("/")) return true;

    // Verificar protocolo válido
    if (!url.startsWith("http://") && !url.startsWith("https://")) return false;

    return true;
  },

  /**
   * Limpia y decodifica URLs de Firebase Storage problemáticas
   */
  cleanFirebaseUrl(url: string | null | undefined): string | null {
    if (!url || typeof url !== "string") return null;

    // Si no es URL de Firebase, retornar tal como está
    if (!url.includes("firebasestorage.googleapis.com")) return url;

    try {
      // Decodificar URL si está sobre-codificada
      let cleanUrl = decodeURIComponent(url);

      // Verificar que tenga los componentes esenciales
      if (cleanUrl.includes("alt=media") && cleanUrl.includes("token=")) {
        return cleanUrl;
      }

      return null; // URL malformateada
    } catch (error) {
      console.warn("Error cleaning Firebase URL:", error);
      return null;
    }
  },

  /**
   * Genera un cache key único para una URL
   */
  getCacheKey(url: string): string {
    return btoa(encodeURIComponent(url)).replace(/[+/=]/g, "");
  },

  /**
   * Verifica si una URL está en la lista de dominios no confiables
   */
  isUnreliableDomain(url: string): boolean {
    const unreliableDomains = [
      "firebasestorage.googleapis.com",
      "images.unsplash.com",
    ];

    return unreliableDomains.some((domain) => url.includes(domain));
  },

  /**
   * Genera URLs de reintento con timestamp
   */
  generateRetryUrl(originalUrl: string, retryCount: number): string {
    const separator = originalUrl.includes("?") ? "&" : "?";
    const timestamp = Date.now();
    return `${originalUrl}${separator}retry=${retryCount}&t=${timestamp}`;
  },

  /**
   * Extrae información de debugging de una URL de imagen
   */
  getUrlDebugInfo(url: string): {
    isFirebase: boolean;
    isEncoded: boolean;
    hasToken: boolean;
    hasAltMedia: boolean;
    length: number;
    domain: string | null;
  } {
    try {
      const urlObj = new URL(url);

      return {
        isFirebase: url.includes("firebasestorage.googleapis.com"),
        isEncoded: url.includes("%"),
        hasToken: url.includes("token="),
        hasAltMedia: url.includes("alt=media"),
        length: url.length,
        domain: urlObj.hostname,
      };
    } catch (error) {
      return {
        isFirebase: false,
        isEncoded: false,
        hasToken: false,
        hasAltMedia: false,
        length: url.length,
        domain: null,
      };
    }
  },
};
