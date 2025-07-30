import { propertyService } from '../firebase/firestoreService';

async function testConnection() {
  console.log('🔄 Testando conexión a Firebase...');
  
  try {
    // Intentar obtener todas las propiedades
    const properties = await propertyService.getAllProperties();
    
    console.log(`✅ Conexión exitosa!`);
    console.log(`📊 Total de propiedades encontradas: ${properties.length}`);
    
    if (properties.length === 0) {
      console.log('ℹ️  La base de datos está vacía. No hay propiedades registradas.');
    } else {
      console.log('\n🏠 PROPIEDADES ENCONTRADAS:');
      console.log('=====================================');
      
      properties.forEach((property, index) => {
        console.log(`\n${index + 1}. ${property.title}`);
        console.log(`   📍 ${property.address}`);
        console.log(`   💰 $${property.price?.toLocaleString() || '0'}`);
        console.log(`   🏷️  ${property.type} - ${property.status}`);
        if (property.city) console.log(`   🌆 ${property.city}`);
        if (property.phone) console.log(`   📞 ${property.phone}`);
        console.log(`   📝 ${property.description?.substring(0, 80)}...`);
        console.log(`   📅 Creado: ${new Date(property.createdAt).toLocaleDateString()}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    console.log('🔧 Verifica que Firebase esté configurado correctamente.');
  }
}

testConnection(); 