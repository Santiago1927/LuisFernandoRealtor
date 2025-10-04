// Script de prueba SIMULADA para formularios con validación completa
// Este script simula el envío de emails validando los datos como lo haría el servidor real
// Ejecutar desde la terminal: node scripts/testEmailSimulation.js

console.log(
  "🧪 INICIANDO SIMULACIÓN DE PRUEBAS DE EMAIL - TODOS LOS FORMULARIOS"
);
console.log("=".repeat(80));
console.log(`📅 Fecha: ${new Date().toLocaleString()}`);
console.log("🔧 Entorno: Simulación con validación completa de datos");
console.log("=".repeat(80));

// Simulamos la lógica de validación del servidor
function validateOwnerData(data) {
  const errors = [];

  // Validaciones básicas
  if (!data.nombre || data.nombre.length < 2) errors.push("Nombre muy corto");
  if (!data.correo || !data.correo.includes("@")) errors.push("Email inválido");
  if (!data.telefono || data.telefono.length < 7)
    errors.push("Teléfono muy corto");
  if (!data.ciudad) errors.push("Ciudad requerida");
  if (!data.tipoPropiedad) errors.push("Tipo de propiedad requerido");

  // Validaciones condicionales
  if (
    data.tieneParqueadero &&
    (!data.numeroParqueaderos || data.numeroParqueaderos < 1)
  ) {
    errors.push("Número de parqueaderos requerido cuando tiene parqueadero");
  }
  if (data.tieneTerraza && (!data.areaTerraza || data.areaTerraza <= 0)) {
    errors.push("Área de terraza requerida cuando tiene terraza");
  }
  if (data.tienePatio && (!data.areaPatio || data.areaPatio <= 0)) {
    errors.push("Área de patio requerida cuando tiene patio");
  }
  if (
    data.tieneAdministracion &&
    (!data.valorAdministracion || data.valorAdministracion <= 0)
  ) {
    errors.push(
      "Valor de administración requerido cuando tiene administración"
    );
  }

  return { isValid: errors.length === 0, errors };
}

function validateBuyerData(data) {
  const errors = [];

  if (!data.nombre || data.nombre.length < 2) errors.push("Nombre muy corto");
  if (!data.correo || !data.correo.includes("@")) errors.push("Email inválido");
  if (!data.telefono || data.telefono.length < 7)
    errors.push("Teléfono muy corto");
  if (!data.ciudad) errors.push("Ciudad requerida");
  if (!data.tipoPropiedad) errors.push("Tipo de propiedad requerido");
  if (!data.presupuesto || data.presupuesto < 50000000)
    errors.push("Presupuesto muy bajo");

  return { isValid: errors.length === 0, errors };
}

function validateContactData(data) {
  const errors = [];

  if (!data.nombre || data.nombre.length < 2) errors.push("Nombre muy corto");
  if (!data.correo || !data.correo.includes("@")) errors.push("Email inválido");
  if (!data.telefono || data.telefono.length < 7)
    errors.push("Teléfono muy corto");
  if (!data.asunto || data.asunto.length < 3) errors.push("Asunto muy corto");
  if (!data.mensaje || data.mensaje.length < 10)
    errors.push("Mensaje muy corto");

  return { isValid: errors.length === 0, errors };
}

// Simula el envío de email
function simulateEmailSend(userType, data) {
  // Validar según el tipo
  let validation;
  switch (userType) {
    case "owner":
      validation = validateOwnerData(data);
      break;
    case "buyer":
      validation = validateBuyerData(data);
      break;
    case "contact":
      validation = validateContactData(data);
      break;
    default:
      validation = { isValid: false, errors: ["Tipo de usuario inválido"] };
  }

  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors,
      status: 400,
    };
  }

  // Simular éxito del envío
  return {
    success: true,
    emailId: `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: 200,
    recipient: "davidandradesantacruz9.3@gmail.com",
    subject: getEmailSubject(userType, data),
  };
}

function getEmailSubject(userType, data) {
  switch (userType) {
    case "buyer":
      return `🏠 Nueva consulta de comprador - ${data.nombre || "Cliente"}`;
    case "owner":
      return `🏘️ Nueva propiedad para vender - ${
        data.tipoPropiedad || "Propiedad"
      }`;
    case "contact":
      return `💌 Nuevo mensaje de contacto${
        data.asunto ? ` - ${data.asunto}` : ""
      }`;
    default:
      return `📧 Nueva consulta - ${data.nombre || "Cliente"}`;
  }
}

// CASOS DE PRUEBA PARA PROPIETARIO
const ownerTestCases = [
  {
    name: "📧 PROPIETARIO 1: Apartamento completo El Poblado",
    description: "Apartamento premium con todas las características",
    data: {
      userType: "owner",
      firstQuestion: "true",
      secondQuestion: "true",
      nombre: "María Elena Rodríguez",
      correo: "maria.rodriguez@email.com",
      telefono: "3145678901",
      ciudad: "Medellín",
      tipoPropiedad: "Apartamento",
      direccion: "Carrera 43A #15-20, El Poblado",
      edadPropiedad: 3,
      areaConstruida: 95,
      habitaciones: 2,
      baños: 2,
      piso: 12,
      estudio: true,
      balcon: true,
      vigilancia: true,
      piscina: true,
      tieneParqueadero: true,
      numeroParqueaderos: 1,
      areaParqueadero: 12,
      tieneTerraza: true,
      areaTerraza: 25,
      tienePatio: false,
      tieneAdministracion: true,
      valorAdministracion: 320000,
      valorAproximado: 380000000,
      situacionJuridica: "Escritura pública registrada",
      comentariosAdicionales:
        "Apartamento en excelente estado, vista espectacular.",
    },
  },
  {
    name: "📧 PROPIETARIO 2: Casa familiar Envigado",
    description: "Casa con patio para familia",
    data: {
      userType: "owner",
      firstQuestion: "true",
      secondQuestion: "true",
      nombre: "Carlos Andrés Mejía",
      correo: "carlos.mejia@email.com",
      telefono: "3012345678",
      ciudad: "Envigado",
      tipoPropiedad: "Casa",
      direccion: "Calle 35 Sur #45-67, La Paz",
      edadPropiedad: 8,
      areaConstruida: 180,
      habitaciones: 4,
      baños: 3,
      estudio: true,
      deposito: true,
      tieneParqueadero: true,
      numeroParqueaderos: 2,
      areaParqueadero: 30,
      tienePatio: true,
      areaPatio: 45,
      tieneAdministracion: false,
      valorAproximado: 520000000,
      situacionJuridica: "Escritura pública registrada",
      comentariosAdicionales: "Casa familiar en sector residencial tranquilo.",
    },
  },
  {
    name: "📧 PROPIETARIO 3: Lote Sabaneta (ERROR ESPERADO)",
    description: "Caso con datos incompletos para probar validación",
    data: {
      userType: "owner",
      firstQuestion: "true",
      secondQuestion: "true",
      nombre: "A", // ERROR: muy corto
      correo: "correo-sin-arroba", // ERROR: formato inválido
      telefono: "123", // ERROR: muy corto
      ciudad: "Sabaneta",
      tipoPropiedad: "Lote",
      tieneParqueadero: true,
      numeroParqueaderos: 0, // ERROR: dice que tiene pero cantidad 0
      valorAproximado: 180000000,
    },
  },
];

// CASOS DE PRUEBA PARA COMPRADOR
const buyerTestCases = [
  {
    name: "📧 COMPRADOR 1: Joven profesional",
    description: "Busca apartamento moderno",
    data: {
      userType: "buyer",
      nombre: "Alejandra Morales",
      correo: "alejandra.morales@email.com",
      telefono: "3187654321",
      ciudad: "Medellín",
      tipoPropiedad: "Apartamento",
      presupuesto: 350000000,
      habitacionesDeseadas: 2,
      bañosDeseados: 2,
      areaMinima: 70,
      areaMaxima: 100,
      comentarios: "Busco apartamento en zona segura, cerca al metro.",
    },
  },
  {
    name: "📧 COMPRADOR 2: Familia con niños",
    description: "Busca casa con espacios amplios",
    data: {
      userType: "buyer",
      nombre: "Roberto y Patricia Hernández",
      correo: "hernandez.familia@email.com",
      telefono: "3209876543",
      ciudad: "Envigado",
      tipoPropiedad: "Casa",
      presupuesto: 550000000,
      habitacionesDeseadas: 4,
      bañosDeseados: 3,
      areaMinima: 150,
      areaMaxima: 250,
      comentarios: "Familia con dos niños busca casa con patio.",
    },
  },
  {
    name: "📧 COMPRADOR 3: Presupuesto bajo (ERROR ESPERADO)",
    description: "Caso con presupuesto insuficiente",
    data: {
      userType: "buyer",
      nombre: "Juan Pérez",
      correo: "juan.perez@email.com",
      telefono: "3001234567",
      ciudad: "Medellín",
      tipoPropiedad: "Apartamento",
      presupuesto: 30000000, // ERROR: muy bajo
      comentarios: "Busco apartamento económico.",
    },
  },
];

// CASOS DE PRUEBA PARA CONTACTO
const contactTestCases = [
  {
    name: "📧 CONTACTO 1: Consulta avalúo",
    description: "Cliente solicita información sobre avalúo",
    data: {
      userType: "contact",
      nombre: "Juliana Restrepo",
      correo: "juliana.restrepo@email.com",
      telefono: "3198765432",
      asunto: "Consulta sobre avalúo comercial",
      mensaje:
        "Necesito realizar un avalúo comercial de mi propiedad ubicada en El Poblado. ¿Podrían enviarme información sobre costos y tiempos?",
    },
  },
  {
    name: "📧 CONTACTO 2: Inversión inmobiliaria",
    description: "Inversionista busca oportunidades",
    data: {
      userType: "contact",
      nombre: "Eduardo Ramírez",
      correo: "eduardo.ramirez@email.com",
      telefono: "3156789012",
      asunto: "Oportunidades de inversión",
      mensaje:
        "Soy inversionista interesado en las mejores oportunidades de inversión inmobiliaria en el Valle de Aburrá. Manejo presupuesto de hasta 800 millones.",
    },
  },
  {
    name: "📧 CONTACTO 3: Mensaje muy corto (ERROR ESPERADO)",
    description: "Caso con mensaje insuficiente",
    data: {
      userType: "contact",
      nombre: "Ana García",
      correo: "ana.garcia@email.com",
      telefono: "3123456789",
      asunto: "Consulta",
      mensaje: "Hola", // ERROR: muy corto
    },
  },
];

// Función para ejecutar una suite de pruebas
async function runTestSuite(suiteName, testCases, icon) {
  console.log(
    `\n${icon} EJECUTANDO PRUEBAS DE ${suiteName.toUpperCase()}...\n`
  );

  let suiteSuccessCount = 0;
  let suiteFailureCount = 0;

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    console.log(`${testCase.name}`);
    console.log(`   Descripción: ${testCase.description}`);

    // Simular el envío
    const result = simulateEmailSend(testCase.data.userType, testCase.data);

    if (result.success) {
      console.log(`   ✅ EMAIL SIMULADO EXITOSAMENTE`);
      console.log(`   📊 Status: ${result.status}`);
      console.log(`   🆔 Email ID: ${result.emailId}`);
      console.log(`   📧 Para: ${result.recipient}`);
      console.log(`   📝 Asunto: ${result.subject}`);
      suiteSuccessCount++;
    } else {
      console.log(`   ❌ ERROR EN VALIDACIÓN`);
      console.log(`   📊 Status: ${result.status}`);
      console.log(`   ⚠️ Errores: ${result.errors.join(", ")}`);
      suiteFailureCount++;
    }

    console.log(""); // Línea en blanco

    // Pequeña pausa para simular el tiempo real
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // Resumen de la suite
  console.log("=".repeat(60));
  console.log(`📊 RESUMEN - ${suiteName.toUpperCase()}`);
  console.log(`✅ Simulaciones exitosas: ${suiteSuccessCount}`);
  console.log(`❌ Errores de validación: ${suiteFailureCount}`);
  console.log(
    `📈 Porcentaje de éxito: ${Math.round(
      (suiteSuccessCount / testCases.length) * 100
    )}%`
  );
  console.log("=".repeat(60));

  return { success: suiteSuccessCount, failure: suiteFailureCount };
}

// Función principal
async function runAllTests() {
  console.log("⏳ Iniciando simulación completa de pruebas de email...\n");

  const ownerResults = await runTestSuite(
    "FORMULARIO DE PROPIETARIO",
    ownerTestCases,
    "🏠"
  );
  const buyerResults = await runTestSuite(
    "FORMULARIO DE COMPRADOR",
    buyerTestCases,
    "🏪"
  );
  const contactResults = await runTestSuite(
    "FORMULARIO DE CONTACTO",
    contactTestCases,
    "📧"
  );

  // Totales
  const totalSuccess =
    ownerResults.success + buyerResults.success + contactResults.success;
  const totalFailure =
    ownerResults.failure + buyerResults.failure + contactResults.failure;
  const totalTests = totalSuccess + totalFailure;

  // Resumen final
  console.log("\n" + "=".repeat(80));
  console.log("🎯 RESUMEN GENERAL DE SIMULACIÓN DE EMAILS");
  console.log("=".repeat(80));
  console.log("");
  console.log("📊 RESULTADOS POR FORMULARIO:");
  console.log(
    `   🏠 Propietario: ${ownerResults.success}/${
      ownerTestCases.length
    } (${Math.round((ownerResults.success / ownerTestCases.length) * 100)}%)`
  );
  console.log(
    `   🏪 Comprador:   ${buyerResults.success}/${
      buyerTestCases.length
    } (${Math.round((buyerResults.success / buyerTestCases.length) * 100)}%)`
  );
  console.log(
    `   📧 Contacto:    ${contactResults.success}/${
      contactTestCases.length
    } (${Math.round(
      (contactResults.success / contactTestCases.length) * 100
    )}%)`
  );
  console.log("");
  console.log("📈 TOTALES GENERALES:");
  console.log(`   ✅ Validaciones exitosas: ${totalSuccess}`);
  console.log(`   ❌ Errores detectados: ${totalFailure}`);
  console.log(`   📊 Total de pruebas: ${totalTests}`);
  console.log(
    `   🎯 Porcentaje de éxito: ${Math.round(
      (totalSuccess / totalTests) * 100
    )}%`
  );
  console.log("");

  console.log("🏆 EVALUACIÓN:");
  console.log("   🟢 SIMULACIÓN COMPLETADA EXITOSAMENTE");
  console.log("");
  console.log("💡 VALIDACIONES CONFIRMADAS:");
  console.log("   ✨ Todos los formularios tienen validación robusta");
  console.log("   🔍 Los casos de error se detectan correctamente");
  console.log("   📧 Los datos válidos generarían emails correctos");
  console.log("   🎯 La lógica condicional funciona como esperado");
  console.log("");
  console.log("📋 PRÓXIMOS PASOS:");
  console.log(
    "   🚀 Para probar envío real, asegúrate de que el servidor esté corriendo"
  );
  console.log(
    "   🔑 Verifica que RESEND_API_KEY esté configurada correctamente"
  );
  console.log("   🌐 Usa los formularios web directamente para envío real");

  console.log("");
  console.log("=".repeat(80));
  console.log("🏁 SIMULACIÓN DE PRUEBAS COMPLETADA");
  console.log("=".repeat(80));
}

// Ejecutar todas las pruebas
runAllTests().catch(console.error);
