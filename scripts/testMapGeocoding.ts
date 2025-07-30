import { geocodingService } from '../src/services/geocodingService';

async function testGeocoding() {
  console.log('🗺️  Probando servicio de geocodificación...\n');

  // Direcciones de prueba colombianas
  const testAddresses = [
    'Carrera 80 #45-23, Medellín',
    'Calle 100 #15-30, Bogotá',
    'Avenida El Dorado, Bogotá',
    'Poblado, Medellín',
    'Unicentro, Pasto',
    'Centro, Cali',
  ];

  for (const address of testAddresses) {
    console.log(`📍 Probando: "${address}"`);
    
    try {
      // Geocodificar (dirección → coordenadas)
      const geocodeResult = await geocodingService.geocodeColombianAddress(address);
      
      if (geocodeResult) {
        console.log(`   ✅ Geocodificación exitosa:`);
        console.log(`   📍 Coordenadas: ${geocodeResult.lat}, ${geocodeResult.lng}`);
        console.log(`   🏙️  Ciudad: ${geocodeResult.city || 'No especificada'}`);
        console.log(`   📝 Dirección completa: ${geocodeResult.address}`);
        
        // Reverse geocoding (coordenadas → dirección)
        const reverseResult = await geocodingService.reverseGeocode(
          geocodeResult.lat, 
          geocodeResult.lng
        );
        
        if (reverseResult) {
          console.log(`   🔄 Reverse geocoding: ${reverseResult.address}`);
        }
        
      } else {
        console.log(`   ❌ No se encontró la dirección`);
      }
      
    } catch (error) {
      console.log(`   ❌ Error: ${error}`);
    }
    
    console.log(`   ${'-'.repeat(60)}`);
    
    // Pausa para no saturar la API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Probar validación de direcciones
  console.log('\n🔍 Probando validación de direcciones:');
  
  const addressesToValidate = [
    'Carrera 80 #45-23',
    'Calle 100',
    'abc123',
    'Avenida El Dorado #68-45',
    'Cr 45 #23-15',
    'dirección inválida',
  ];

  addressesToValidate.forEach(addr => {
    const isValid = geocodingService.validateColombianAddress(addr);
    console.log(`   ${isValid ? '✅' : '❌'} "${addr}" - ${isValid ? 'Válida' : 'Inválida'}`);
  });

  // Mostrar ejemplos de formato
  console.log('\n📋 Ejemplos de formato válido:');
  const examples = geocodingService.getAddressFormatExamples();
  examples.forEach((example, index) => {
    console.log(`   ${index + 1}. ${example}`);
  });

  console.log('\n🎉 Prueba de geocodificación completada!');
}

testGeocoding().catch(console.error); 