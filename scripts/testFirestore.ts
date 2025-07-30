import { propertyService } from '../firebase/firestoreService';

async function testFirestoreConnection() {
  try {
    console.log('🔍 Probando conexión a Firestore...');
    
    const properties = await propertyService.getAllProperties();
    console.log(`✅ Conexión exitosa! Encontradas ${properties.length} propiedades`);
    
    if (properties.length > 0) {
      console.log('\n📋 Propiedades encontradas:');
      properties.forEach((property, index) => {
        console.log(`${index + 1}. ${property.title} - ${property.city} - $${property.price.toLocaleString()}`);
      });
    } else {
      console.log('\n⚠️  No se encontraron propiedades en la base de datos');
      console.log('💡 Necesitas agregar algunas propiedades manualmente desde el panel de administración');
    }
    
  } catch (error) {
    console.error('❌ Error al conectar con Firestore:', error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'permission-denied') {
      console.log('\n🔐 Problema de permisos:');
      console.log('- Verifica que las reglas de Firestore permitan lectura pública');
      console.log('- Verifica la configuración de Firebase en firebaseConfig.ts');
    }
  }
}

if (require.main === module) {
  testFirestoreConnection();
} 