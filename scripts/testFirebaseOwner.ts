import { ownerService } from '../firebase/firestoreService';

async function testOwnerCreation() {
  console.log('=== TESTING OWNER CREATION ===');
  
  const testData = {
    nombre: "Test User",
    correo: "test@example.com",
    telefono: "1234567890",
    ciudad: "Pasto",
    tipoPropiedad: "Casa",
    firstQuestion: "true",
    secondQuestion: "true",
    userType: "owner",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  try {
    console.log('Creating owner with data:', testData);
    const ownerId = await ownerService.createOwner(testData);
    console.log('✅ Owner created successfully with ID:', ownerId);
  } catch (error) {
    console.error('❌ Error creating owner:', error);
  }
}

testOwnerCreation();
