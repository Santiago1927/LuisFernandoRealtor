import { getPaginatedProperties } from '../firebase/firestoreService';

async function testPagination() {
  console.log('🧪 Probando paginación corregida...\n');
  
  try {
    // Probar primera página
    console.log('📄 PÁGINA 1 (primeras 12 propiedades):');
    const page1 = await getPaginatedProperties(1, 12);
    console.log(`   Propiedades obtenidas: ${page1.properties.length}`);
    console.log(`   Total en BD: ${page1.total}`);
    console.log(`   Títulos: ${page1.properties.map(p => p.title).join(', ')}`);
    
    // Probar segunda página
    console.log('\n📄 PÁGINA 2 (siguientes 8 propiedades):');
    const page2 = await getPaginatedProperties(2, 12);
    console.log(`   Propiedades obtenidas: ${page2.properties.length}`);
    console.log(`   Total en BD: ${page2.total}`);
    console.log(`   Títulos: ${page2.properties.map(p => p.title).join(', ')}`);
    
    // Verificar totales
    console.log('\n✅ VERIFICACIÓN:');
    console.log(`   Total esperado: 20`);
    console.log(`   Total reportado: ${page1.total}`);
    console.log(`   Página 1: ${page1.properties.length} propiedades`);
    console.log(`   Página 2: ${page2.properties.length} propiedades`);
    console.log(`   Total páginas: ${page1.properties.length + page2.properties.length}`);
    
    if (page1.total === 20 && page1.properties.length + page2.properties.length === 20) {
      console.log('\n🎉 ¡PAGINACIÓN CORREGIDA EXITOSAMENTE!');
    } else {
      console.log('\n❌ Aún hay problemas con la paginación');
    }
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error);
  }
}

testPagination(); 