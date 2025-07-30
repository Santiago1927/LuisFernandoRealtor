import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

async function testDirectConnection() {
  console.log('🚀 Probando conexión directa con Firebase...\n');
  
  try {
    // Intentar obtener la colección de propiedades directamente
    console.log('📋 Obteniendo colección de propiedades...');
    const propertiesRef = collection(db, 'properties');
    const snapshot = await getDocs(propertiesRef);
    
    console.log(`✅ ¡Conexión exitosa!`);
    console.log(`📊 Total de propiedades encontradas: ${snapshot.size}\n`);
    
    if (snapshot.size > 0) {
      console.log('🏠 Listado de propiedades:');
      console.log('─'.repeat(60));
      
      snapshot.docs.forEach((doc, index) => {
        const data = doc.data();
        console.log(`${index + 1}. ${data.title || 'Sin título'}`);
        console.log(`   📍 ${data.city || 'Sin ciudad'} - ${data.address || 'Sin dirección'}`);
        console.log(`   💰 $${data.price ? data.price.toLocaleString() : '0'}`);
        console.log(`   🏷️  ${data.type || 'Sin tipo'}`);
        console.log('');
      });
    } else {
      console.log('⚠️  No se encontraron propiedades en la base de datos');
    }
    
  } catch (error: any) {
    console.error('❌ Error de conexión:', error.message);
    
    if (error.code === 'permission-denied') {
      console.log('\n🔐 Problema de permisos detectado:');
      console.log('   → Las reglas de Firestore no permiten lectura pública');
      console.log('   → Revisa el archivo: firebase-rules-instructions.md');
      console.log('   → Aplica las reglas en Firebase Console');
    } else if (error.code === 'unavailable') {
      console.log('\n🌐 Problema de conectividad:');
      console.log('   → Verifica tu conexión a internet');
      console.log('   → Firebase puede estar temporalmente no disponible');
    } else {
      console.log('\n🔧 Problema de configuración:');
      console.log(`   → Código de error: ${error.code}`);
      console.log('   → Verifica firebase/firebaseConfig.ts');
    }
  }
}

if (require.main === module) {
  testDirectConnection();
} 