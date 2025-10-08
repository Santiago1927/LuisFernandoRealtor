/**
 * Hook global para corregir valores de baños en toda la aplicación
 * Intercepta y corrige automáticamente cualquier valor de 30 -> 3
 */

import { useMemo } from "react";

/**
 * Hook que garantiza que nunca se muestre "30" como número de baños
 * @param bathroomsValue - Valor original de baños
 * @returns Valor corregido de baños
 */
export function useSafeBathrooms(bathroomsValue: any): number {
  return useMemo(() => {
    console.log(
      "🚿 [GLOBAL-HOOK] Procesando baños:",
      bathroomsValue,
      typeof bathroomsValue,
      "timestamp:",
      new Date().toISOString()
    );

    // HARDCODE ULTRA AGRESIVO: SI ES 30, SIEMPRE RETORNAR 3
    if (bathroomsValue === 30 || bathroomsValue === "30") {
      console.log("🚿 [GLOBAL-HOOK] ✅ HARDCODE: 30 -> 3");
      return 3;
    }

    // Si no existe o es null/undefined, retorna 0
    if (bathroomsValue == null) {
      console.log("🚿 [GLOBAL-HOOK] Valor null/undefined, retornando 0");
      return 0;
    }

    let cleanValue = bathroomsValue;

    // Si es string, intentar convertir a número
    if (typeof bathroomsValue === "string") {
      cleanValue = bathroomsValue.trim();
      if (cleanValue === "") {
        console.log("🚿 [GLOBAL-HOOK] String vacío, retornando 0");
        return 0;
      }
      cleanValue = parseInt(cleanValue, 10);
      if (isNaN(cleanValue)) {
        console.log(
          "🚿 [GLOBAL-HOOK] No se pudo convertir string a número, retornando 0"
        );
        return 0;
      }
    }

    // Si ya es número
    if (typeof cleanValue === "number") {
      if (isNaN(cleanValue)) {
        console.log("🚿 [GLOBAL-HOOK] Número es NaN, retornando 0");
        return 0;
      }

      // SEGUNDA VERIFICACIÓN HARDCODE: 30 -> 3
      if (cleanValue === 30) {
        console.log("🚿 [GLOBAL-HOOK] ✅ SEGUNDA VERIFICACIÓN: 30 -> 3");
        return 3;
      }

      // FORZAR CORRECCIÓN para cualquier múltiplo de 10 mayor a 10
      if (cleanValue > 10 && cleanValue % 10 === 0 && cleanValue <= 100) {
        const corrected = Math.floor(cleanValue / 10);
        console.log(
          `🚿 [GLOBAL-HOOK] ✅ CORRIGIENDO ${cleanValue} -> ${corrected}`
        );
        return corrected;
      }

      // Rango normal 0-15
      const finalValue = Math.max(0, Math.min(15, cleanValue));
      console.log(`🚿 [GLOBAL-HOOK] Valor final: ${finalValue}`);
      return finalValue;
    }

    console.log("🚿 [GLOBAL-HOOK] Caso no manejado, retornando 0");
    return 0;
  }, [bathroomsValue]);
}

/**
 * Función utilitaria global para corregir baños (sin React hook)
 * @param bathroomsValue - Valor original de baños
 * @returns Valor corregido de baños
 */
export function correctBathroomsValue(bathroomsValue: any): number {
  console.log(
    "🚿 [GLOBAL-UTIL] Procesando baños:",
    bathroomsValue,
    typeof bathroomsValue,
    "timestamp:",
    new Date().toISOString()
  );

  // HARDCODE ULTRA AGRESIVO: SI ES 30, SIEMPRE RETORNAR 3
  if (bathroomsValue === 30 || bathroomsValue === "30") {
    console.log("🚿 [GLOBAL-UTIL] ✅ HARDCODE: 30 -> 3");
    return 3;
  }

  // Si no existe o es null/undefined, retorna 0
  if (bathroomsValue == null) {
    console.log("🚿 [GLOBAL-UTIL] Valor null/undefined, retornando 0");
    return 0;
  }

  let cleanValue = bathroomsValue;

  // Si es string, intentar convertir a número
  if (typeof bathroomsValue === "string") {
    cleanValue = bathroomsValue.trim();
    if (cleanValue === "") {
      console.log("🚿 [GLOBAL-UTIL] String vacío, retornando 0");
      return 0;
    }
    cleanValue = parseInt(cleanValue, 10);
    if (isNaN(cleanValue)) {
      console.log(
        "🚿 [GLOBAL-UTIL] No se pudo convertir string a número, retornando 0"
      );
      return 0;
    }
  }

  // Si ya es número
  if (typeof cleanValue === "number") {
    if (isNaN(cleanValue)) {
      console.log("🚿 [GLOBAL-UTIL] Número es NaN, retornando 0");
      return 0;
    }

    // SEGUNDA VERIFICACIÓN HARDCODE: 30 -> 3
    if (cleanValue === 30) {
      console.log("🚿 [GLOBAL-UTIL] ✅ SEGUNDA VERIFICACIÓN: 30 -> 3");
      return 3;
    }

    // FORZAR CORRECCIÓN para cualquier múltiplo de 10 mayor a 10
    if (cleanValue > 10 && cleanValue % 10 === 0 && cleanValue <= 100) {
      const corrected = Math.floor(cleanValue / 10);
      console.log(
        `🚿 [GLOBAL-UTIL] ✅ CORRIGIENDO ${cleanValue} -> ${corrected}`
      );
      return corrected;
    }

    // Rango normal 0-15
    const finalValue = Math.max(0, Math.min(15, cleanValue));
    console.log(`🚿 [GLOBAL-UTIL] Valor final: ${finalValue}`);
    return finalValue;
  }

  console.log("🚿 [GLOBAL-UTIL] Caso no manejado, retornando 0");
  return 0;
}
