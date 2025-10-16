import { NextRequest, NextResponse } from "next/server";
import { propertyService } from "../../../../../firebase/firestoreService";
import { Property } from "../../../../types/property";

/**
 * GET /api/propiedades/destacadas
 * Obtener propiedades destacadas para debug
 */
export async function GET(request: NextRequest) {
  try {
    console.log("🔍 [API] Solicitando propiedades destacadas...");

    // Obtener propiedades destacadas
    const featuredProperties = await propertyService.getFeaturedProperties(8);

    console.log(
      `✅ [API] Propiedades destacadas encontradas: ${featuredProperties.length}`
    );

    // También obtener todas las propiedades para comparar
    const allProperties = await propertyService.getAllProperties();
    const withStatus = allProperties.filter(
      (p: Property) => p.publication_status
    );
    const featured = allProperties.filter(
      (p: Property) => p.publication_status === "Destacado"
    );

    return NextResponse.json({
      success: true,
      featured: featuredProperties,
      debug: {
        totalProperties: allProperties.length,
        withStatus: withStatus.length,
        featuredCount: featured.length,
        featuredIds: featured.map((p: Property) => ({
          id: p.id,
          title: p.title,
          status: p.publication_status,
        })),
      },
    });
  } catch (error) {
    console.error("❌ [API] Error al obtener propiedades destacadas:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        featured: [],
        debug: {},
      },
      { status: 500 }
    );
  }
}
