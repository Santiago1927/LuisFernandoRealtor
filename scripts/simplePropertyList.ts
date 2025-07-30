import { propertyService } from '../firebase/firestoreService';

async function listAllProperties() {
  console.log('🔍 Obteniendo todas las propiedades...\n');
  
  try {
    const properties = await propertyService.getAllProperties();
    
    console.log(`✅ ${properties.length} PROPIEDADES ENCONTRADAS:`);
    console.log('='.repeat(100));
    
    properties.forEach((property, index) => {
      console.log(`\n${(index + 1).toString().padStart(2, '0')}. ${property.title}`);
      console.log(`    📍 ${property.address}`);
      console.log(`    💰 $${property.price.toLocaleString()}`);
      console.log(`    🏠 ${property.type} | 📊 ${property.status}`);
      console.log(`    🌆 ${property.city || 'Ciudad no especificada'}`);
      console.log(`    🛏️  ${property.bedrooms || 0} hab | 🚿 ${property.bathrooms || 0} baños | 📐 ${property.area || 0} m²`);
      console.log(`    📞 ${property.phone || 'Sin teléfono'}`);
      console.log(`    📅 ${new Date(property.createdAt).toLocaleDateString()}`);
      console.log(`    🆔 ${property.id}`);
    });
    
    console.log('\n' + '='.repeat(100));
    console.log('📊 RESUMEN:');
    
    // Por tipo
    const byType = properties.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('🏠 Por tipo:');
    Object.entries(byType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });
    
    // Por estado
    const byStatus = properties.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('\n📊 Por estado:');
    Object.entries(byStatus).forEach(([status, count]) => {
      console.log(`   ${status}: ${count}`);
    });
    
    // Por ciudad
    const byCity = properties.reduce((acc, p) => {
      const city = p.city || 'Sin ciudad';
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('\n🌆 Por ciudad:');
    Object.entries(byCity).forEach(([city, count]) => {
      console.log(`   ${city}: ${count}`);
    });
    
    // Estadísticas adicionales
    const withImages = properties.filter(p => p.images && p.images.length > 0).length;
    const withPhone = properties.filter(p => p.phone && p.phone.trim()).length;
    const withCoords = properties.filter(p => p.lat && p.lng).length;
    
    console.log('\n📈 Estadísticas adicionales:');
    console.log(`   Con imágenes: ${withImages}/${properties.length}`);
    console.log(`   Con teléfono: ${withPhone}/${properties.length}`);
    console.log(`   Con coordenadas: ${withCoords}/${properties.length}`);
    
    const prices = properties.map(p => p.price).filter(p => p > 0);
    if (prices.length > 0) {
      console.log(`\n💰 Precios:`);
      console.log(`   Mínimo: $${Math.min(...prices).toLocaleString()}`);
      console.log(`   Máximo: $${Math.max(...prices).toLocaleString()}`);
      console.log(`   Promedio: $${Math.round(prices.reduce((a, b) => a + b) / prices.length).toLocaleString()}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

listAllProperties(); 