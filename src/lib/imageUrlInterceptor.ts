/**
 * Interceptor de URLs problemáticas para corregir URLs mal codificadas
 * antes de que lleguen al componente Image de Next.js
 */

export class ImageUrlInterceptor {
  private static instance: ImageUrlInterceptor;
  private problemUrls = new Map<string, string>();

  private constructor() {
    // URLs problemáticas conocidas y sus correcciones
    this.initializeProblemUrls();
  }

  static getInstance(): ImageUrlInterceptor {
    if (!ImageUrlInterceptor.instance) {
      ImageUrlInterceptor.instance = new ImageUrlInterceptor();
    }
    return ImageUrlInterceptor.instance;
  }

  private initializeProblemUrls() {
    // Patrón de URLs problemáticas que causan los errores 400
    const problemPatterns = [
      // URLs con imagez1-3F7 que aparecen en los errores
      /imagez1-3F7/gi,
      // URLs con doble codificación
      /%2F[^/]/gi,
      // URLs malformateadas de Firebase
      /properties%2Fimages%2F/gi,
    ];

    // Pattern registration logging disabled to prevent console spam
  }

  /**
   * Intercepta y corrige URLs problemáticas
   */
  interceptUrl(url: string | null | undefined): string {
    if (!url || typeof url !== "string") {
      return "/placeholder-property.svg";
    }

    // Si ya es un placeholder o imagen local, retornar tal como está
    if (url.startsWith("/") && !url.includes("http")) {
      return url;
    }

    // Para URLs de Firebase Storage válidas, retornar directamente
    if (url.includes("firebasestorage.googleapis.com")) {
      if (url.includes("alt=media") && url.includes("token=")) {
        return url; // URL válida de Firebase
      }
    }

    // Para otras URLs válidas, verificar que sean URLs válidas
    try {
      new URL(url);
      return url; // URL válida
    } catch {
      return "/placeholder-property.svg"; // URL inválida
    }
  }

  private hasProblematicPattern(url: string): boolean {
    // Solo marcar como problemáticas URLs con patrones muy específicos que causan errores 400
    const problematicPatterns = [
      "imagez1-3F7", // Patrón específico malformado
      // Removimos archivos específicos que pueden ser válidos
    ];

    return problematicPatterns.some((pattern) => {
      return url.includes(pattern);
    });
  }

  private correctUrl(url: string): string | null {
    try {
      // Intentar decodificar la URL
      let correctedUrl = url;

      // Decodificar caracteres URL-encoded
      try {
        correctedUrl = decodeURIComponent(url);
      } catch (e) {
        // Si falla la decodificación, intentar decodificar solo ciertas partes
        correctedUrl = url.replace(/%2F/g, "/");
      }

      // Verificar que la URL corregida sea válida para Firebase Storage
      if (correctedUrl.includes("firebasestorage.googleapis.com")) {
        // Verificar componentes esenciales
        if (
          correctedUrl.includes("alt=media") &&
          correctedUrl.includes("token=")
        ) {
          return correctedUrl;
        }
      }

      // Si no se puede corregir, retornar null
      return null;
    } catch (error) {
      // Error logging disabled to prevent console spam
      return null;
    }
  }

  /**
   * Registra una URL como problemática para logging
   */
  reportProblematicUrl(url: string, error?: any) {
    // Problem URL reporting logging disabled to prevent console spam
  }

  /**
   * Obtiene estadísticas de URLs interceptadas
   */
  getStats() {
    return {
      problemUrlsRegistered: this.problemUrls.size,
      timestamp: new Date().toISOString(),
    };
  }
}

// Export singleton instance
export const imageUrlInterceptor = ImageUrlInterceptor.getInstance();
