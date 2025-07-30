import { propertyService } from '../firebase/firestoreService';

// Mapeo de tipos de inglés a español
const typeMapping: { [key: string]: string } = {
  'house': 'Casa',
  'apartment': 'Apartamento', 
  'commercial': 'Local',
  'land': 'Lote'
};

async function migratePropertyTypes() {
  console.log('🔄 Iniciando migración de tipos de propiedades...\n');
  
  try {
    // Obtener todas las propiedades
    const allProperties = await propertyService.getAllProperties();
    console.log(`📊 Total de propiedades encontradas: ${allProperties.length}`);
    
    // Encontrar propiedades con tipos en inglés
    const propertiesToMigrate = allProperties.filter(property => 
      Object.keys(typeMapping).includes(property.type.toLowerCase())
    );
    
    console.log(`🔧 Propiedades a migrar: ${propertiesToMigrate.length}\n`);
    
    if (propertiesToMigrate.length === 0) {
      console.log('✅ No hay propiedades que necesiten migración. Todos los tipos ya están en español.');
      return;
    }
    
    // Mostrar qué se va a migrar
    console.log('📋 Lista de propiedades a migrar:');
    console.log('─'.repeat(70));
    propertiesToMigrate.forEach((property, index) => {
      const newType = typeMapping[property.type.toLowerCase()];
      console.log(`${index + 1}. "${property.title}"`);
      console.log(`   🔄 ${property.type} → ${newType}`);
      console.log('');
    });
    
    // Confirmar migración
    console.log('⚠️  ¿Deseas continuar con la migración? Esta acción actualizará la base de datos.');
    console.log('   Para continuar, ejecuta: npm run migrate-types -- --confirm\n');
    
    // Verificar si se pasó el flag de confirmación
    const args = process.argv.slice(2);
    const isConfirmed = args.includes('--confirm');
    
    if (!isConfirmed) {
      console.log('❌ Migración cancelada. Usa --confirm para ejecutar la migración.');
      return;
    }
    
    console.log('🚀 Iniciando migración confirmada...\n');
    
    let migratedCount = 0;
    let errorCount = 0;
    
    // Migrar cada propiedad
    for (const property of propertiesToMigrate) {
      const oldType = property.type;
      const newType = typeMapping[property.type.toLowerCase()];
      
      try {
        await propertyService.updateProperty(property.id, {
          type: newType as any
        });
        
        console.log(`✅ Migrada: "${property.title}" (${oldType} → ${newType})`);
        migratedCount++;
        
      } catch (error) {
        console.error(`❌ Error migrando "${property.title}":`, error);
        errorCount++;
      }
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('📊 RESUMEN DE MIGRACIÓN:');
    console.log(`✅ Propiedades migradas exitosamente: ${migratedCount}`);
    console.log(`❌ Errores durante la migración: ${errorCount}`);
    console.log(`📊 Total procesadas: ${propertiesToMigrate.length}`);
    
    if (migratedCount > 0) {
      console.log('\n🎉 ¡Migración completada! Los filtros de tipo ahora funcionarán correctamente.');
      console.log('💡 Recarga la aplicación web para ver los cambios.');
    }
    
  } catch (error: any) {
    console.error('❌ Error durante la migración:', error.message);
    
    if (error.code === 'permission-denied') {
      console.log('\n🔐 Problema de permisos:');
      console.log('   → Necesitas aplicar las reglas de Firebase Console');
      console.log('   → Las reglas deben permitir escritura para usuarios autenticados');
      console.log('   → Revisa: firebase-rules-instructions.md');
    }
  }
}

if (require.main === module) {
  migratePropertyTypes();
} 