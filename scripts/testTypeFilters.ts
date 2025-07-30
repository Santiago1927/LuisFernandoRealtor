import { propertyService } from '../firebase/firestoreService';

async function testTypeFilters() {
  console.log('🔍 Probando filtros de tipo de propiedad...\n');
  
  try {
    // Obtener todas las propiedades para ver los tipos existentes
    const allProperties = await propertyService.getAllProperties();
    console.log(`📊 Total de propiedades: ${allProperties.length}\n`);
    
    // Contar tipos únicos
    const typeCounts: { [key: string]: number } = {};
    allProperties.forEach(property => {
      typeCounts[property.type] = (typeCounts[property.type] || 0) + 1;
    });
    
    console.log('📋 Tipos de propiedades encontrados:');
    console.log('─'.repeat(50));
    Object.entries(typeCounts).forEach(([type, count]) => {
      console.log(`  🏷️  ${type}: ${count} propiedad(es)`);
    });
    console.log('');
    
    // Probar filtros específicos
    const typesToTest = ['Casa', 'Apartamento', 'Local', 'Lote', 'Penthouse'];
    
    for (const typeFilter of typesToTest) {
      console.log(`🔎 Probando filtro: "${typeFilter}"`);
      
      try {
        const filteredProperties = await propertyService.getPropertiesWithFilters({
          type: typeFilter
        });
        
        console.log(`  ✅ Encontradas: ${filteredProperties.length} propiedades`);
        
        if (filteredProperties.length > 0) {
          console.log('  📝 Ejemplos:');
          filteredProperties.slice(0, 3).forEach((property, index) => {
            console.log(`    ${index + 1}. ${property.title} (${property.type})`);
          });
        }
        
      } catch (error) {
        console.log(`  ❌ Error al filtrar por ${typeFilter}:`, error);
      }
      
      console.log('');
    }
    
    // Verificar que los tipos en inglés se conviertan correctamente
    console.log('🔄 Verificando conversión de tipos en inglés...');
    const englishTypes = ['house', 'apartment', 'commercial', 'land'];
    
    for (const englishType of englishTypes) {
      const propertiesWithEnglishType = allProperties.filter(p => {
        // Verificar el tipo original antes de la normalización
        return p.type.toLowerCase() === englishType;
      });
      
      if (propertiesWithEnglishType.length > 0) {
        console.log(`  🔧 Encontradas ${propertiesWithEnglishType.length} propiedades con tipo "${englishType}"`);
        console.log(`      Convertidas automáticamente al español`);
      }
    }
    
  } catch (error: any) {
    console.error('❌ Error al probar filtros:', error.message);
    
    if (error.code === 'permission-denied') {
      console.log('\n🔐 Problema de permisos:');
      console.log('   → Aplica las reglas de Firebase Console');
      console.log('   → Revisa: firebase-rules-instructions.md');
    }
  }
}

if (require.main === module) {
  testTypeFilters();
} 