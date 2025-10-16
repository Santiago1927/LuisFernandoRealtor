/**
 * API Route - Propiedades Generales
 *
 * GET /api/propiedades/general
 * Obtiene todas las propiedades que NO están destacadas
 *
 * Filtros aplicados:
 * - publication_status != "Destacado"
 * - status = "Disponible" (solo propiedades activas)
 *
 * Ordenamiento: Más recientes primero (createdAt desc)
 */

import { NextRequest, NextResponse } from "next/server";
import { getGeneralProperties } from "../../../../../firebase/firestoreService";

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 [API] GET /api/propiedades/general - Iniciando...");

    // Para optimización del build, usar un límite fijo en lugar de parámetros dinámicos
    const defaultLimit = 50; // Límite razonable para propiedades generales

    // Obtener propiedades generales desde Firestore
    const properties = await getGeneralProperties(defaultLimit);

    console.log(
      `✅ [API] Propiedades generales obtenidas: ${properties.length}`
    );

    return NextResponse.json(properties);
  } catch (error) {
    console.error("❌ [API] Error al obtener propiedades generales:", error);

    return NextResponse.json(
      {
        error: "Error al obtener propiedades generales",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
