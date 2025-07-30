import { NextRequest, NextResponse } from 'next/server';
import { propertyService } from '../../../../../firebase/firestoreService';
import { Property } from '../../../../types/property';

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/propiedades/[id]
 * Obtener una propiedad por ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID de propiedad requerido' },
        { status: 400 }
      );
    }

    const property = await propertyService.getPropertyById(id);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Propiedad no encontrada' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: property
    });
    
  } catch (error) {
    console.error('Error getting property:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor al obtener la propiedad',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/propiedades/[id]
 * Actualizar una propiedad existente
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const propertyData: Partial<Property> = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID de propiedad requerido' },
        { status: 400 }
      );
    }

    // Verificar que la propiedad existe
    const existingProperty = await propertyService.getPropertyById(id);
    if (!existingProperty) {
      return NextResponse.json(
        { error: 'Propiedad no encontrada' },
        { status: 404 }
      );
    }

    // Actualizar la propiedad
    await propertyService.updateProperty(id, propertyData);
    
    // Obtener la propiedad actualizada
    const updatedProperty = await propertyService.getPropertyById(id);
    
    return NextResponse.json({
      success: true,
      data: updatedProperty,
      message: 'Propiedad actualizada exitosamente'
    });
    
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor al actualizar la propiedad',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/propiedades/[id]
 * Eliminar una propiedad
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID de propiedad requerido' },
        { status: 400 }
      );
    }

    // Verificar que la propiedad existe
    const existingProperty = await propertyService.getPropertyById(id);
    if (!existingProperty) {
      return NextResponse.json(
        { error: 'Propiedad no encontrada' },
        { status: 404 }
      );
    }

    // Eliminar la propiedad
    await propertyService.deleteProperty(id);
    
    return NextResponse.json({
      success: true,
      message: 'Propiedad eliminada exitosamente'
    });
    
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor al eliminar la propiedad',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
} 