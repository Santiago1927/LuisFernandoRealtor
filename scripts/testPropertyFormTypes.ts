import { propertyService } from '../firebase/firestoreService';

async function testPropertyFormTypes() {
  console.log('🧪 Probando creación de propiedad con tipos específicos...\n');
  
  const testProperty = {
    title: 'Propiedad de Prueba - Tipo Casa',
    address: 'Dirección de Prueba',
    city: 'Pasto',
    price: 100000000,
    description: 'Propiedad creada para probar que los tipos se guardan correctamente',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    type: 'Casa' as const,
    status: 'available' as const,
    images: [],
    videos: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    lat: 1.2136,
    lng: -77.2811,
  };

  try {
    console.log('📝 Creando propiedad de prueba...');
    const createdProperty = await propertyService.createProperty(testProperty);
    console.log('✅ Propiedad creada exitosamente!');
    console.log(`📋 ID: ${createdProperty.id}`);
    console.log(`🏷️  Tipo guardado: "${createdProperty.type}"`);
    console.log(`🏠 Título: ${createdProperty.title}`);
    
    // Verificar que se puede leer correctamente
    console.log('\n🔍 Verificando lectura...');
    const readProperty = await propertyService.getPropertyById(createdProperty.id);
    
    if (readProperty) {
      console.log('✅ Propiedad leída correctamente');
      console.log(`🏷️  Tipo leído: "${readProperty.type}"`);
      
      if (readProperty.type === testProperty.type) {
        console.log('✅ El tipo se guardó y leyó correctamente!');
      } else {
        console.log(`❌ Error: Tipo esperado "${testProperty.type}", pero se leyó "${readProperty.type}"`);
      }
    } else {
      console.log('❌ No se pudo leer la propiedad creada');
    }
    
    // Limpiar - eliminar la propiedad de prueba
    console.log('\n🗑️  Eliminando propiedad de prueba...');
    await propertyService.deleteProperty(createdProperty.id);
    console.log('✅ Propiedad de prueba eliminada');
    
  } catch (error: any) {
    console.error('❌ Error en la prueba:', error.message);
    
    if (error.code === 'permission-denied') {
      console.log('\n🔐 Problema de permisos:');
      console.log('   → Necesitas estar autenticado o aplicar reglas de escritura');
      console.log('   → Ver: firebase-rules-instructions.md');
    }
  }
}

async function testAllPropertyTypes() {
  console.log('🧪 Probando todos los tipos de propiedades...\n');
  
  const propertyTypes = [
    'Casa',
    'Apartamento', 
    'Casa Campestre',
    'Penthouse',
    'Apartaestudio',
    'Lote',
    'Oficina',
    'Local',
    'Bodega',
    'Proyecto Inmobiliario'
  ];

  for (const type of propertyTypes) {
    console.log(`🔍 Probando tipo: "${type}"`);
    
    const testProperty = {
      title: `Propiedad de Prueba - ${type}`,
      address: 'Dirección de Prueba',
      city: 'Pasto',
      price: 100000000,
      description: `Propiedad tipo ${type} para pruebas`,
      bedrooms: 2,
      bathrooms: 1,
      area: 80,
      type: type as any,
      status: 'available' as const,
      images: [],
      videos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      lat: 1.2136,
      lng: -77.2811,
    };

    try {
      const created = await propertyService.createProperty(testProperty);
      const read = await propertyService.getPropertyById(created.id);
      
      if (read && read.type === type) {
        console.log(`  ✅ ${type}: OK`);
      } else {
        console.log(`  ❌ ${type}: Error - esperado "${type}", obtenido "${read?.type}"`);
      }
      
      // Limpiar
      await propertyService.deleteProperty(created.id);
      
    } catch (error) {
      console.log(`  ❌ ${type}: Error - ${error}`);
    }
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--all')) {
    testAllPropertyTypes();
  } else {
    testPropertyFormTypes();
  }
} 