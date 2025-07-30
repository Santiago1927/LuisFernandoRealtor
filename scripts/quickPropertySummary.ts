import { propertyService } from '../firebase/firestoreService';

async function showQuickSummary() {
  try {
    const properties = await propertyService.getAllProperties();
    
    console.log(`\n🏠 RESUMEN DE PROPIEDADES EN LA BASE DE DATOS`);
    console.log(`${'='.repeat(120)}`);
    console.log(`📊 Total encontradas: ${properties.length} propiedades`);
    console.log(`${'='.repeat(120)}\n`);
    
    if (properties.length === 0) {
      console.log('❌ No hay propiedades registradas.');
      return;
    }
    
    // Encabezados de tabla
    console.log('ID'.padEnd(22) + 
                'TÍTULO'.padEnd(25) + 
                'DIRECCIÓN'.padEnd(30) + 
                'PRECIO'.padEnd(15) + 
                'TIPO'.padEnd(12) + 
                'ESTADO');
    console.log('-'.repeat(120));
    
    // Mostrar cada propiedad en formato tabla
    properties.forEach((property, index) => {
      const id = property.id.substring(0, 20) + '..';
      const title = (property.title || 'Sin título').length > 23 ? 
                   property.title.substring(0, 22) + '...' : 
                   property.title || 'Sin título';
      const address = (property.address || 'Sin dirección').length > 28 ? 
                     property.address.substring(0, 27) + '...' : 
                     property.address || 'Sin dirección';
      const price = property.price ? `$${property.price.toLocaleString()}` : '$0';
      const type = getShortType(property.type);
      const status = getShortStatus(property.status);
      
      console.log(
        id.padEnd(22) + 
        title.padEnd(25) + 
        address.padEnd(30) + 
        price.padEnd(15) + 
        type.padEnd(12) + 
        status
      );
    });
    
    console.log('-'.repeat(120));
    
    // Estadísticas rápidas
    const stats = generateQuickStats(properties);
    console.log(`\n📊 ESTADÍSTICAS RÁPIDAS:`);
    console.log(`   Por tipo: ${stats.types}`);
    console.log(`   Por estado: ${stats.statuses}`);
    console.log(`   Por ciudad: ${stats.cities}`);
    console.log(`   Precios: Mín: ${stats.minPrice} | Máx: ${stats.maxPrice} | Promedio: ${stats.avgPrice}`);
    
    // Propiedades destacadas
    console.log(`\n⭐ PROPIEDADES DESTACADAS:`);
    
    const expensive = properties.reduce((prev, current) => 
      (prev.price > current.price) ? prev : current
    );
    console.log(`   💎 Más cara: "${expensive.title}" - $${expensive.price.toLocaleString()}`);
    
    const recent = properties.reduce((prev, current) => 
      (new Date(prev.createdAt) > new Date(current.createdAt)) ? prev : current
    );
    console.log(`   🆕 Más reciente: "${recent.title}" - ${formatShortDate(recent.createdAt)}`);
    
    const withImages = properties.filter(p => p.images && p.images.length > 0);
    console.log(`   📸 Con imágenes: ${withImages.length} de ${properties.length} propiedades`);
    
    const withPhone = properties.filter(p => p.phone && p.phone.trim() !== '');
    console.log(`   📞 Con teléfono: ${withPhone.length} de ${properties.length} propiedades`);
    
    console.log(`\n${'='.repeat(120)}`);
    
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : 'Error desconocido');
  }
}

function getShortType(type: string): string {
  const types = {
    'house': 'Casa',
    'apartment': 'Apartamento',
    'commercial': 'Comercial',
    'land': 'Terreno'
  };
  return types[type as keyof typeof types] || type;
}

function getShortStatus(status: string): string {
  const statuses = {
    'available': '✅ Disponible',
    'sold': '💰 Vendida',
    'rented': '🔑 Alquilada'
  };
  return statuses[status as keyof typeof statuses] || status;
}

function generateQuickStats(properties: any[]) {
  // Estadísticas por tipo
  const typeCount = properties.reduce((acc, p) => {
    acc[p.type] = (acc[p.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const types = Object.entries(typeCount).map(([k, v]) => `${getShortType(k)}(${v})`).join(', ');
  
  // Estadísticas por estado
  const statusCount = properties.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const statuses = Object.entries(statusCount).map(([k, v]) => `${getShortStatus(k).split(' ')[1]}(${v})`).join(', ');
  
  // Estadísticas por ciudad
  const cityCount = properties.reduce((acc, p) => {
    const city = p.city || 'Sin ciudad';
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const cities = Object.entries(cityCount).map(([k, v]) => `${k}(${v})`).join(', ');
  
  // Precios
  const prices = properties.map(p => p.price).filter(p => p > 0);
  const minPrice = prices.length > 0 ? `$${Math.min(...prices).toLocaleString()}` : 'N/A';
  const maxPrice = prices.length > 0 ? `$${Math.max(...prices).toLocaleString()}` : 'N/A';
  const avgPrice = prices.length > 0 ? 
    `$${Math.round(prices.reduce((a, b) => a + b, 0) / prices.length).toLocaleString()}` : 'N/A';
  
  return { types, statuses, cities, minPrice, maxPrice, avgPrice };
}

function formatShortDate(date: any): string {
  try {
    return new Date(date).toLocaleDateString('es-CO');
  } catch {
    return 'Fecha inválida';
  }
}

showQuickSummary(); 