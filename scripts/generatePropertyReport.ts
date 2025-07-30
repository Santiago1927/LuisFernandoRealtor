import { propertyService } from '../firebase/firestoreService';
import { writeFileSync } from 'fs';

async function generatePropertyReport() {
  try {
    console.log('🔍 Generando reporte completo de propiedades...\n');
    
    const properties = await propertyService.getAllProperties();
    
    console.log(`✅ Se encontraron ${properties.length} propiedades en la base de datos\n`);
    
    if (properties.length === 0) {
      console.log('❌ No hay propiedades registradas en la base de datos.');
      return;
    }
    
    // Crear reporte detallado
    let report = `📊 REPORTE COMPLETO DE PROPIEDADES - ${new Date().toLocaleDateString()}\n`;
    report += `${'='.repeat(80)}\n\n`;
    report += `Total de propiedades encontradas: ${properties.length}\n\n`;
    
    // Mostrar cada propiedad
    properties.forEach((property, index) => {
      const num = (index + 1).toString().padStart(2, '0');
      report += `📍 PROPIEDAD ${num}: ${property.title}\n`;
      report += `${'─'.repeat(50)}\n`;
      report += `🆔 ID: ${property.id}\n`;
      report += `📍 Dirección: ${property.address}\n`;
      report += `🌆 Ciudad: ${property.city || 'No especificada'}\n`;
      report += `💰 Precio: $${property.price?.toLocaleString() || '0'}\n`;
      report += `🏠 Tipo: ${getTypeLabel(property.type)}\n`;
      report += `📊 Estado: ${getStatusLabel(property.status)}\n`;
      report += `🛏️  Habitaciones: ${property.bedrooms || 'No especificado'}\n`;
      report += `🚿 Baños: ${property.bathrooms || 'No especificado'}\n`;
      report += `📐 Área: ${property.area ? `${property.area} m²` : 'No especificada'}\n`;
      report += `📞 Teléfono: ${property.phone || 'No especificado'}\n`;
      report += `📝 Descripción: ${property.description || 'Sin descripción'}\n`;
      report += `🖼️  Imágenes: ${property.images?.length || 0} archivo(s)\n`;
      report += `🎥 Videos: ${property.videos?.length || 0} archivo(s)\n`;
      
      if (property.lat && property.lng) {
        report += `🗺️  Coordenadas: ${property.lat}, ${property.lng}\n`;
      }
      
      report += `📅 Fecha creación: ${formatDate(property.createdAt)}\n`;
      report += `⏰ Última actualización: ${formatDate(property.updatedAt)}\n`;
      
      // Mostrar URLs de imágenes si existen
      if (property.images && property.images.length > 0) {
        report += `🖼️  URLs de imágenes:\n`;
        property.images.forEach((img, i) => {
          report += `   ${i + 1}. ${img}\n`;
        });
      }
      
      // Mostrar URLs de videos si existen
      if (property.videos && property.videos.length > 0) {
        report += `🎥 URLs de videos:\n`;
        property.videos.forEach((video, i) => {
          report += `   ${i + 1}. ${video}\n`;
        });
      }
      
      report += `\n${'='.repeat(80)}\n\n`;
    });
    
    // Estadísticas generales
    report += `📊 ESTADÍSTICAS GENERALES\n`;
    report += `${'='.repeat(50)}\n\n`;
    
    // Por tipo
    const typeStats = properties.reduce((acc, prop) => {
      acc[prop.type] = (acc[prop.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    report += `🏠 POR TIPO DE PROPIEDAD:\n`;
    Object.entries(typeStats).forEach(([type, count]) => {
      report += `   ${getTypeLabel(type)}: ${count} propiedades\n`;
    });
    report += `\n`;
    
    // Por estado
    const statusStats = properties.reduce((acc, prop) => {
      acc[prop.status] = (acc[prop.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    report += `📊 POR ESTADO:\n`;
    Object.entries(statusStats).forEach(([status, count]) => {
      report += `   ${getStatusLabel(status)}: ${count} propiedades\n`;
    });
    report += `\n`;
    
    // Por ciudad
    const cityStats = properties.reduce((acc, prop) => {
      const city = prop.city || 'Sin ciudad especificada';
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    report += `🌆 POR CIUDAD:\n`;
    Object.entries(cityStats).forEach(([city, count]) => {
      report += `   ${city}: ${count} propiedades\n`;
    });
    report += `\n`;
    
    // Estadísticas de precios
    const prices = properties.map(p => p.price).filter(p => p && p > 0);
    if (prices.length > 0) {
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
      
      report += `💰 ANÁLISIS DE PRECIOS:\n`;
      report += `   Precio mínimo: $${minPrice.toLocaleString()}\n`;
      report += `   Precio máximo: $${maxPrice.toLocaleString()}\n`;
      report += `   Precio promedio: $${Math.round(avgPrice).toLocaleString()}\n`;
      report += `   Propiedades con precio: ${prices.length} de ${properties.length}\n`;
    }
    
    // Mostrar el reporte en consola
    console.log(report);
    
    // Guardar reporte en archivo
    const filename = `property-report-${new Date().toISOString().split('T')[0]}.txt`;
    writeFileSync(filename, report, 'utf-8');
    console.log(`\n📄 Reporte guardado en: ${filename}`);
    
  } catch (error) {
    console.error('❌ Error al generar el reporte:', error);
  }
}

function getTypeLabel(type: string): string {
  const labels = {
    'house': '🏠 Casa',
    'apartment': '🏢 Apartamento',
    'commercial': '🏪 Comercial',
    'land': '🌳 Terreno'
  };
  return labels[type as keyof typeof labels] || `❔ ${type}`;
}

function getStatusLabel(status: string): string {
  const labels = {
    'available': '✅ Disponible',
    'sold': '💰 Vendida',
    'rented': '🔑 Alquilada'
  };
  return labels[status as keyof typeof labels] || `❔ ${status}`;
}

function formatDate(date: any): string {
  if (!date) return 'No disponible';
  
  try {
    const d = new Date(date);
    return d.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return 'Fecha inválida';
  }
}

// Ejecutar el generador de reporte
generatePropertyReport(); 