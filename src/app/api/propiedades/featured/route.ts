import { NextResponse } from "next/server";
import { propertyService } from "../../../../../firebase/firestoreService";

export async function GET() {
  try {
    // Obtener solo propiedades destacadas - SIN FALLBACK
    const featuredProperties = await propertyService.getFeaturedProperties(8);

    // Retornar solo las propiedades que realmente están destacadas
    // Si no hay ninguna, retornar array vacío
    return NextResponse.json(featuredProperties);
  } catch (error) {
    console.error("Error fetching featured properties for frontend:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
