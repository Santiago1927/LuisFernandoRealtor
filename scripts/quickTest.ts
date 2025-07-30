import { propertyService } from '../firebase/firestoreService';

async function quickTest() {
  console.log('🚀 Quick test - Property type functionality\n');
  
  try {
    // Obtener una propiedad existente para ver su tipo
    console.log('📋 Getting existing properties...');
    const properties = await propertyService.getAllProperties();
    
    if (properties.length > 0) {
      const firstProperty = properties[0];
      console.log('✅ First property found:');
      console.log(`   ID: ${firstProperty.id}`);
      console.log(`   Title: ${firstProperty.title}`);
      console.log(`   Type: "${firstProperty.type}" (${typeof firstProperty.type})`);
      console.log(`   Status: "${firstProperty.status}"`);
      
      // Verificar tipos únicos
      const types = Array.from(new Set(properties.map(p => p.type)));
      console.log('\n🏷️  All types found in database:');
      types.forEach(type => {
        const count = properties.filter(p => p.type === type).length;
        console.log(`   "${type}": ${count} properties`);
      });
      
    } else {
      console.log('❌ No properties found in database');
    }
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 'permission-denied') {
      console.log('\n🔐 Permission denied - need to apply Firebase rules');
      console.log('   See: firebase-rules-instructions.md');
    }
  }
}

if (require.main === module) {
  quickTest();
} 