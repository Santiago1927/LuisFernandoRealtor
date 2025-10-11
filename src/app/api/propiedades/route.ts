import { NextRequest, NextResponse } from "next/server";
import { propertyService } from "../../../../firebase/firestoreService";
import { Property } from "../../../types/property";

/**
 * POST /api/propiedades
 * Crear una nueva propiedad
 */
export async function POST(request: NextRequest) {
  try {
    const propertyData: Omit<Property, "id"> = await request.json();

    // Debug: Log para verificar los datos que llegan a la API
    console.log("🌐 API DEBUG - Datos recibidos en POST:", {
      title: propertyData.title,
      city: propertyData.city,
      type: propertyData.type,
      hasCity: !!propertyData.city,
      cityType: typeof propertyData.city,
      allKeys: Object.keys(propertyData),
    });

    // Validaciones básicas
    if (!propertyData.title || !propertyData.address || !propertyData.price) {
      return NextResponse.json(
        { error: "Título, dirección y precio son requeridos" },
        { status: 400 }
      );
    }

    // Crear la propiedad usando el servicio de Firestore
    const newProperty = await propertyService.createProperty(propertyData);

    return NextResponse.json(
      {
        success: true,
        data: newProperty,
        message: "Propiedad creada exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      {
        error: "Error interno del servidor al crear la propiedad",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/propiedades
 * Obtener propiedades con paginación y filtros (opcional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "12");
    const city = searchParams.get("city");
    const type = searchParams.get("type");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const status = searchParams.get("status");

    // Si hay filtros, usar el método con filtros
    if (city || type || minPrice || maxPrice || status) {
      const filters: any = {};
      if (city) filters.city = city;
      if (type) filters.type = type;
      if (status) filters.status = status;
      if (minPrice) filters.minPrice = parseInt(minPrice);
      if (maxPrice) filters.maxPrice = parseInt(maxPrice);

      const properties = await propertyService.getPropertiesWithFilters(
        filters
      );

      // Aplicar paginación manual a los resultados filtrados
      const total = properties.length;
      const offset = (page - 1) * pageSize;
      const paginatedProperties = properties.slice(offset, offset + pageSize);

      return NextResponse.json({
        success: true,
        data: {
          properties: paginatedProperties,
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      });
    } else {
      // Sin filtros, usar paginación normal
      const { getPaginatedProperties } = await import(
        "../../../../firebase/firestoreService"
      );
      const result = await getPaginatedProperties(page, pageSize);

      return NextResponse.json({
        success: true,
        data: {
          ...result,
          page,
          pageSize,
          totalPages: Math.ceil(result.total / pageSize),
        },
      });
    }
  } catch (error) {
    console.error("Error getting properties:", error);
    return NextResponse.json(
      {
        error: "Error interno del servidor al obtener las propiedades",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
