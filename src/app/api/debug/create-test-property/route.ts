/**
 * API Route temporal - Crear propiedad de prueba
 *
 * POST /api/debug/create-test-property
 * Crea una propiedad de prueba no destacada para testing
 */

import { NextRequest, NextResponse } from "next/server";
import { propertyService } from "../../../../../firebase/firestoreService";

export async function POST(request: NextRequest) {
  try {
    console.log("🔧 [DEBUG] Creando propiedad de prueba...");

    // Datos de la propiedad de prueba
    const testProperty = {
      title: "Casa de Prueba General " + Date.now(),
      description:
        "Esta es una propiedad de prueba para verificar la sección de propiedades generales",
      price: 250000000,
      city: "Bogotá",
      neighborhood: "Zona de Prueba",
      address: "Calle Test 123",
      propertyType: "Casa",
      type: "Casa" as const,
      rooms: 3,
      bathrooms: 2,
      area: 150,
      status: "available" as const,
      publication_status: "Activo" as const, // NO destacada
      images: [],
      videos: [],
      owner: {
        name: "Propietario de Prueba",
        phone: "3001234567",
        email: "test@example.com",
      },
      coordinates: {
        latitude: 4.6097,
        longitude: -74.0817,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Crear la propiedad
    const propertyId = await propertyService.createProperty(testProperty);

    console.log(`✅ [DEBUG] Propiedad de prueba creada con ID: ${propertyId}`);

    return NextResponse.json({
      success: true,
      message: "Propiedad de prueba creada exitosamente",
      propertyId,
      property: {
        id: propertyId,
        ...testProperty,
      },
    });
  } catch (error) {
    console.error("❌ [DEBUG] Error creando propiedad de prueba:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Error al crear propiedad de prueba",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
