import { NextResponse } from "next/server";
import { propertyService } from "../../../../firebase/firestoreService";
import { Property } from "../../../types/property";

export async function GET() {
  try {
    console.log("🧪 [TEST] Iniciando test de propiedades destacadas...");

    // Obtener propiedades destacadas
    const featuredProperties = await propertyService.getFeaturedProperties(10);

    console.log("🧪 [TEST] Resultado:", {
      count: featuredProperties.length,
      properties: featuredProperties.map((p: Property) => ({
        id: p.id,
        title: p.title,
        publication_status: p.publication_status,
      })),
    });

    return NextResponse.json({
      success: true,
      count: featuredProperties.length,
      properties: featuredProperties.map((p: Property) => ({
        id: p.id,
        title: p.title,
        publication_status: p.publication_status,
        createdAt: p.createdAt,
      })),
    });
  } catch (error) {
    console.error("🧪 [TEST] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
