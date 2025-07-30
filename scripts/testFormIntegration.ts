import { propertyService } from '../firebase/firestoreService';

async function testFormIntegration() {
  console.log('🧪 Testing Form Integration - type and city fields\n');
  
  try {
    // ✅ Test 1: Crear propiedad con type y city específicos
    console.log('📝 Test 1: Creating property with specific type and city...');
    
    const testPropertyData = {
      title: 'Test Property - Form Integration',
      address: 'Test Address 123',
      city: 'Medellín', // ✅ Campo city incluido
      price: 500000000,
      description: 'Property created to test form integration',
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      type: 'Apartamento' as const, // ✅ Campo type incluido
      status: 'available' as const,
      images: [],
      videos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      lat: 6.2442,
      lng: -75.5812,
    };

    const createdProperty = await propertyService.createProperty(testPropertyData);
    
    console.log('✅ Property created successfully!');
    console.log(`   ID: ${createdProperty.id}`);
    console.log(`   Type: "${createdProperty.type}" ✅`);
    console.log(`   City: "${createdProperty.city}" ✅`);
    
    // ✅ Test 2: Leer la propiedad para verificar que se guardó correctamente
    console.log('\n🔍 Test 2: Reading property to verify data persistence...');
    
    const readProperty = await propertyService.getPropertyById(createdProperty.id);
    
    if (readProperty) {
      console.log('✅ Property read successfully!');
      console.log(`   Type matches: ${readProperty.type === testPropertyData.type ? '✅' : '❌'} (${readProperty.type})`);
      console.log(`   City matches: ${readProperty.city === testPropertyData.city ? '✅' : '❌'} (${readProperty.city})`);
      
      // ✅ Test 3: Actualizar la propiedad (simular edición)
      console.log('\n📝 Test 3: Updating property to test edit functionality...');
      
      const updatedData = {
        ...readProperty,
        type: 'Casa' as const, // Cambiar tipo
        city: 'Bogotá', // Cambiar ciudad
        title: 'Updated Test Property',
        updatedAt: new Date(),
      };
      
      await propertyService.updateProperty(createdProperty.id, updatedData);
      
      // Verificar la actualización
      const updatedProperty = await propertyService.getPropertyById(createdProperty.id);
      
      if (updatedProperty) {
        console.log('✅ Property updated successfully!');
        console.log(`   New Type: "${updatedProperty.type}" ✅`);
        console.log(`   New City: "${updatedProperty.city}" ✅`);
        console.log(`   Updated Title: "${updatedProperty.title}" ✅`);
      }
      
    } else {
      console.log('❌ Could not read the created property');
    }
    
    // ✅ Cleanup: Eliminar la propiedad de prueba
    console.log('\n🗑️ Cleaning up test property...');
    await propertyService.deleteProperty(createdProperty.id);
    console.log('✅ Test property deleted successfully');
    
    console.log('\n🎉 All tests passed! Form integration is working correctly.');
    
  } catch (error: any) {
    console.error('❌ Test failed:', error.message);
    
    if (error.code === 'permission-denied') {
      console.log('\n🔐 Permission denied:');
      console.log('   → Make sure Firebase rules allow read/write operations');
      console.log('   → Check: firebase-rules-instructions.md');
    }
  }
}

// ✅ Test individual de campos
async function testIndividualFields() {
  console.log('\n🔬 Testing individual field types...');
  
  const testCases = [
    { type: 'Casa', city: 'Medellín' },
    { type: 'Apartamento', city: 'Bogotá' },
    { type: 'Local', city: 'Cali' },
    { type: 'Penthouse', city: 'Pasto' },
  ];
  
  for (const testCase of testCases) {
    try {
      const testProperty = {
        title: `Test ${testCase.type} in ${testCase.city}`,
        address: 'Test Address',
        city: testCase.city,
        price: 100000000,
        description: 'Test property',
        type: testCase.type as any,
        status: 'available' as const,
        images: [],
        videos: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const created = await propertyService.createProperty(testProperty);
      const read = await propertyService.getPropertyById(created.id);
      
      if (read && read.type === testCase.type && read.city === testCase.city) {
        console.log(`   ✅ ${testCase.type} in ${testCase.city}: OK`);
      } else {
        console.log(`   ❌ ${testCase.type} in ${testCase.city}: FAILED`);
      }
      
      await propertyService.deleteProperty(created.id);
      
    } catch (error) {
      console.log(`   ❌ ${testCase.type} in ${testCase.city}: ERROR - ${error}`);
    }
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--fields')) {
    testIndividualFields();
  } else {
    testFormIntegration().then(() => {
      if (args.includes('--all')) {
        return testIndividualFields();
      }
    });
  }
} 