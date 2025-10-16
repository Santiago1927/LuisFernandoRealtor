import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🔍 [HOOK-TEST] Simulando hook useFeaturedProperties...");

    // Simular exactamente lo que hace el hook
    const { propertyService } = await import(
      "../../../../firebase/firestoreService"
    );

    // Intentar obtener propiedades destacadas primero
    const featuredProperties = await propertyService.getFeaturedProperties(8);
    console.log(
      "📊 [HOOK-TEST] Propiedades destacadas encontradas:",
      featuredProperties.length
    );
    console.log(
      "📝 [HOOK-TEST] Propiedades destacadas:",
      featuredProperties.map((p) => ({
        id: p.id,
        title: p.title,
        publication_status: p.publication_status,
      }))
    );

    if (featuredProperties.length > 0) {
      console.log("✅ [HOOK-TEST] Retornando propiedades destacadas");
      return NextResponse.json({
        success: true,
        source: "featured",
        count: featuredProperties.length,
        properties: featuredProperties.map((p) => ({
          id: p.id,
          title: p.title,
          publication_status: p.publication_status,
        })),
      });
    }

    console.log(
      "⚠️ [HOOK-TEST] No hay propiedades destacadas, usando fallback..."
    );
    // Si no hay propiedades destacadas, fallback a las más recientes
    const { getPaginatedProperties } = await import(
      "../../../../firebase/firestoreService"
    );
    const { properties } = await getPaginatedProperties(1, 8);
    console.log(
      "📊 [HOOK-TEST] Propiedades fallback encontradas:",
      properties.length
    );

    return NextResponse.json({
      success: true,
      source: "fallback",
      count: properties.length,
      properties: properties.map((p) => ({
        id: p.id,
        title: p.title,
        publication_status: p.publication_status || "undefined",
      })),
    });
  } catch (error) {
    console.error("❌ [HOOK-TEST] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
