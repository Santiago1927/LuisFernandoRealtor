import { propertyService } from '../firebase/firestoreService';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function savePropertyReport() {
  try {
    console.log('🔍 Generando reporte completo de propiedades...');
    
    const properties = await propertyService.getAllProperties();
    
    let report = `📊 REPORTE COMPLETO DE PROPIEDADES
Fecha: ${new Date().toLocaleString('es-CO')}
Total encontradas: ${properties.length} propiedades

${'='.repeat(100)}

`;

    // Lista detallada de propiedades
    properties.forEach((property, index) => {
      report += `${(index + 1).toString().padStart(2, '0')}. ${property.title}
    📍 Dirección: ${property.address}
    🌆 Ciudad: ${property.city || 'No especificada'}  
    💰 Precio: $${property.price.toLocaleString()}
    🏠 Tipo: ${property.type}
    📊 Estado: ${property.status}
    🛏️  Habitaciones: ${property.bedrooms || 0}
    🚿 Baños: ${property.bathrooms || 0}
    📐 Área: ${property.area || 0} m²
    📞 Teléfono: ${property.phone || 'Sin teléfono'}
    📅 Creado: ${new Date(property.createdAt).toLocaleDateString('es-CO')}
    🆔 ID: ${property.id}
    📝 Descripción: ${property.description || 'Sin descripción'}

`;

      if (property.images && property.images.length > 0) {
        report += `    🖼️  Imágenes (${property.images.length}):\n`;
        property.images.forEach((img, i) => {
          report += `       ${i + 1}. ${img}\n`;
        });
        report += '\n';
      }

      if (property.videos && property.videos.length > 0) {
        report += `    🎥 Videos (${property.videos.length}):\n`;
        property.videos.forEach((video, i) => {
          report += `       ${i + 1}. ${video}\n`;
        });
        report += '\n';
      }

      if (property.lat && property.lng) {
        report += `    🗺️  Coordenadas: ${property.lat}, ${property.lng}\n\n`;
      }

      report += `-`.repeat(100) + '\n\n';
    });

    // Estadísticas
    report += `📊 ESTADÍSTICAS GENERALES
${'='.repeat(50)}

`;

    // Por tipo
    const byType = properties.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    report += '🏠 POR TIPO:\n';
    Object.entries(byType).forEach(([type, count]) => {
      const percentage = ((count / properties.length) * 100).toFixed(1);
      report += `   ${type}: ${count} propiedades (${percentage}%)\n`;
    });

    // Por estado
    const byStatus = properties.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    report += '\n📊 POR ESTADO:\n';
    Object.entries(byStatus).forEach(([status, count]) => {
      const percentage = ((count / properties.length) * 100).toFixed(1);
      report += `   ${status}: ${count} propiedades (${percentage}%)\n`;
    });

    // Por ciudad
    const byCity = properties.reduce((acc, p) => {
      const city = p.city || 'Sin ciudad especificada';
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    report += '\n🌆 POR CIUDAD:\n';
    Object.entries(byCity).forEach(([city, count]) => {
      const percentage = ((count / properties.length) * 100).toFixed(1);
      report += `   ${city}: ${count} propiedades (${percentage}%)\n`;
    });

    // Estadísticas adicionales
    const withImages = properties.filter(p => p.images && p.images.length > 0).length;
    const withPhone = properties.filter(p => p.phone && p.phone.trim()).length;
    const withCoords = properties.filter(p => p.lat && p.lng).length;

    report += `\n📈 ESTADÍSTICAS ADICIONALES:
   Con imágenes: ${withImages} de ${properties.length} (${((withImages/properties.length)*100).toFixed(1)}%)
   Con teléfono: ${withPhone} de ${properties.length} (${((withPhone/properties.length)*100).toFixed(1)}%)
   Con coordenadas: ${withCoords} de ${properties.length} (${((withCoords/properties.length)*100).toFixed(1)}%)

`;

    // Precios
    const prices = properties.map(p => p.price).filter(p => p > 0);
    if (prices.length > 0) {
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const avgPrice = Math.round(prices.reduce((a, b) => a + b) / prices.length);

      report += `💰 ANÁLISIS DE PRECIOS:
   Precio mínimo: $${minPrice.toLocaleString()}
   Precio máximo: $${maxPrice.toLocaleString()}
   Precio promedio: $${avgPrice.toLocaleString()}
   Propiedades con precio válido: ${prices.length} de ${properties.length}

`;
    }

    // Propiedades destacadas
    if (properties.length > 0) {
      const expensive = properties.reduce((prev, current) => 
        (prev.price > current.price) ? prev : current
      );
      const recent = properties.reduce((prev, current) => 
        (new Date(prev.createdAt) > new Date(current.createdAt)) ? prev : current
      );

      report += `⭐ PROPIEDADES DESTACADAS:
   💎 Más cara: "${expensive.title}" - $${expensive.price.toLocaleString()}
   🆕 Más reciente: "${recent.title}" - ${new Date(recent.createdAt).toLocaleDateString('es-CO')}

`;
    }

    // Guardar archivo
    const filename = `reporte-propiedades-${new Date().toISOString().split('T')[0]}.txt`;
    const filepath = join(process.cwd(), filename);
    writeFileSync(filepath, report, 'utf-8');

    console.log(`✅ Reporte generado exitosamente!`);
    console.log(`📄 Archivo guardado: ${filename}`);
    console.log(`📊 Total de propiedades: ${properties.length}`);
    console.log(`📁 Ubicación: ${filepath}`);

    // Mostrar resumen rápido en consola
    console.log(`\n📊 RESUMEN EJECUTIVO:`);
    console.log(`   🏠 Tipos: ${Object.entries(byType).map(([k,v]) => `${k}(${v})`).join(', ')}`);
    console.log(`   📊 Estados: ${Object.entries(byStatus).map(([k,v]) => `${k}(${v})`).join(', ')}`);
    console.log(`   🌆 Ciudades: ${Object.entries(byCity).map(([k,v]) => `${k}(${v})`).join(', ')}`);
    
    if (prices.length > 0) {
      console.log(`   💰 Precios: $${Math.min(...prices).toLocaleString()} - $${Math.max(...prices).toLocaleString()}`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

savePropertyReport(); 