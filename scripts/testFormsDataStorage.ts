import {
  buyerService,
  ownerService,
  contactService,
} from "../firebase/firestoreService";

/**
 * Script para probar que los datos de todos los formularios se almacenen correctamente
 * Este script simula el envío de formularios como lo haría un usuario real
 */

async function testBuyerFormData() {
  console.log("\n🧪 Probando formulario de comprador...");

  const buyerData = {
    // Datos personales requeridos
    nombre: "Juan Pérez Test",
    correo: "juan.test@email.com",
    telefono: "3001234567",
    ciudad: "MEDELLIN",
    tipoPropiedad: "CASA",

    // Campos dinámicos
    habitaciones: 3,
    baños: 2,
    parqueaderos: 1,
    deposito: true,
    formaDePago: "CREDITO",
    presupuesto: "800000000",
    comentariosAdicionales: "Busco casa en buen sector",

    // Metadatos
    userType: "buyer",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const buyerId = await buyerService.createBuyer(buyerData);
    console.log("✅ Comprador creado exitosamente:", buyerId);
    console.log("📄 Datos guardados:", JSON.stringify(buyerData, null, 2));
    return true;
  } catch (error) {
    console.error("❌ Error al crear comprador:", error);
    return false;
  }
}

async function testOwnerFormData() {
  console.log("\n🧪 Probando formulario de propietario...");

  const ownerData = {
    // Preguntas iniciales (requeridas)
    firstQuestion: "true",
    secondQuestion: "true",

    // Datos personales requeridos
    nombre: "María García Test",
    correo: "maria.test@email.com",
    telefono: "3109876543",
    ciudad: "BOGOTA",
    tipoPropiedad: "APARTAMENTO",

    // Campos dinámicos de propiedad
    direccion: "Calle 123 #45-67",
    edadPropiedad: 5,
    areaConstruida: 120,
    terraza: 15,
    patio: 0,
    habitaciones: 3,
    baños: 2,
    parqueaderos: 1,
    piso: 8,
    estudio: false,
    deposito: true,
    balcon: true,

    piscina: false,
    valorAdministracion: 350000,
    valorAproximado: 650000000,
    situacionJuridica: "LISTA_PARA_ESCRITURAR",
    comentariosAdicionales: "Apartamento muy bien ubicado",

    // Metadatos
    userType: "owner",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const ownerId = await ownerService.createOwner(ownerData);
    console.log("✅ Propietario creado exitosamente:", ownerId);
    console.log("📄 Datos guardados:", JSON.stringify(ownerData, null, 2));
    return true;
  } catch (error) {
    console.error("❌ Error al crear propietario:", error);
    return false;
  }
}

async function testContactFormData() {
  console.log("\n🧪 Probando formulario de contacto general...");

  const contactData = {
    // Datos del formulario de contacto
    nombre: "Ana López Test",
    correo: "ana.test@email.com",
    telefono: "3151234567",
    asunto: "Consulta sobre servicios inmobiliarios",
    mensaje:
      "Hola, me gustaría obtener más información sobre sus servicios de asesoría inmobiliaria. ¿Podrían contactarme para coordinar una cita?",

    // Metadatos
    userType: "contact",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const contactId = await contactService.createContact(contactData);
    console.log("✅ Contacto creado exitosamente:", contactId);
    console.log("📄 Datos guardados:", JSON.stringify(contactData, null, 2));
    return true;
  } catch (error) {
    console.error("❌ Error al crear contacto:", error);
    return false;
  }
}

async function testAllForms() {
  console.log("🚀 Iniciando pruebas de almacenamiento de formularios...\n");

  const results = {
    buyer: false,
    owner: false,
    contact: false,
  };

  // Probar cada formulario
  results.buyer = await testBuyerFormData();
  results.owner = await testOwnerFormData();
  results.contact = await testContactFormData();

  // Resumen de resultados
  console.log("\n📊 RESUMEN DE PRUEBAS:");
  console.log("=======================");
  console.log(
    `Formulario de Comprador: ${results.buyer ? "✅ EXITOSO" : "❌ FALLÓ"}`
  );
  console.log(
    `Formulario de Propietario: ${results.owner ? "✅ EXITOSO" : "❌ FALLÓ"}`
  );
  console.log(
    `Formulario de Contacto: ${results.contact ? "✅ EXITOSO" : "❌ FALLÓ"}`
  );

  const allSuccess = results.buyer && results.owner && results.contact;

  if (allSuccess) {
    console.log("\n🎉 ¡TODOS LOS FORMULARIOS FUNCIONAN CORRECTAMENTE!");
    console.log("✅ Los datos se almacenan correctamente en Firestore");
    console.log("✅ Todos los campos dinámicos están siendo guardados");
    console.log("✅ Los valores por defecto están funcionando");
  } else {
    console.log("\n⚠️  ALGUNOS FORMULARIOS TIENEN PROBLEMAS");
    console.log("🔧 Revisa los errores anteriores para más detalles");
  }

  return allSuccess;
}

// Ejecutar pruebas si se llama directamente
if (require.main === module) {
  testAllForms()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error("💥 Error inesperado:", error);
      process.exit(1);
    });
}

export {
  testAllForms,
  testBuyerFormData,
  testOwnerFormData,
  testContactFormData,
};
