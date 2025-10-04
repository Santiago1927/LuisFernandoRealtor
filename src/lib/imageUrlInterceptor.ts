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

    // Registrar patrones problemáticos
    problemPatterns.forEach((pattern) => {
      console.warn("Registered problem pattern:", pattern);
    });
  }

  /**
   * Intercepta y corrige URLs problemáticas
   */
  interceptUrl(url: string | null | undefined): string {
    if (!url || typeof url !== "string") {
      return "/placeholder-property.svg";
    }

    // Si ya es un placeholder, retornar tal como está
    if (url.startsWith("/") && !url.includes("http")) {
      return url;
    }

    // Verificar si la URL contiene patrones problemáticos
    if (this.hasProblematicPattern(url)) {
      console.warn(
        "🚨 Intercepted problematic URL:",
        url.substring(0, 80) + "..."
      );

      // Intentar corregir la URL
      const correctedUrl = this.correctUrl(url);

      if (correctedUrl && correctedUrl !== url) {
        console.log("✅ Corrected URL:", correctedUrl.substring(0, 80) + "...");
        return correctedUrl;
      } else {
        console.warn("❌ Could not correct URL, using placeholder");
        return "/placeholder-property.svg";
      }
    }

    return url;
  }

  private hasProblematicPattern(url: string): boolean {
    const problematicPatterns = [
      "imagez1-3F7",
      "properties%2Fimages%2F",
      // Patrón de doble codificación
      /%2F.*%2F/g,
      // URLs excesivamente largas (más de 500 caracteres)
      url.length > 500,
    ];

    return problematicPatterns.some((pattern) => {
      if (typeof pattern === "string") {
        return url.includes(pattern);
      } else if (pattern instanceof RegExp) {
        return pattern.test(url);
      } else {
        return pattern; // boolean case
      }
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
      console.error("Error correcting URL:", error);
      return null;
    }
  }

  /**
   * Registra una URL como problemática para logging
   */
  reportProblematicUrl(url: string, error?: any) {
    console.warn("🚨 Problematic URL reported:", {
      url: url.substring(0, 100) + "...",
      error: error?.message || "Unknown error",
      timestamp: new Date().toISOString(),
    });
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
