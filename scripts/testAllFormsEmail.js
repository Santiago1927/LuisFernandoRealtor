// Script principal para ejecutar TODAS las pruebas de envío de emails
// Este script ejecuta secuencialmente todos los tests de formularios con envío real
// Ejecutar desde la terminal: node scripts/testAllFormsEmail.js

console.log("🚀 SUITE COMPLETA DE PRUEBAS DE EMAIL - TODOS LOS FORMULARIOS");
console.log("=".repeat(80));
console.log(`📅 Fecha: ${new Date().toLocaleString()}`);
console.log("🔧 Entorno: Desarrollo con envío real de emails");
console.log("=".repeat(80));
console.log("⏳ Iniciando suite completa de pruebas de email...\n");

const API_BASE_URL = "http://localhost:3000"; // Asegúrate de que el servidor esté corriendo

// Función para hacer peticiones HTTP
async function makeRequest(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return {
      success: response.ok,
      status: response.status,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Función para ejecutar un conjunto de casos de prueba
async function runTestSuite(suiteName, testCases, icon) {
  console.log(`${icon} EJECUTANDO PRUEBAS DE ${suiteName.toUpperCase()}...\n`);

  let suiteSuccessCount = 0;
  let suiteFailureCount = 0;

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    console.log(`${testCase.name}`);
    console.log(`   Descripción: ${testCase.description}`);

    try {
      const result = await makeRequest(
        `${API_BASE_URL}/api/send`,
        testCase.data
      );

      if (result.success) {
        console.log(`   ✅ EMAIL ENVIADO EXITOSAMENTE`);
        console.log(`   📊 Status: ${result.status}`);
        if (result.data.id) {
          console.log(`   🆔 Email ID: ${result.data.id}`);
        }
        suiteSuccessCount++;
      } else {
        console.log(`   ❌ ERROR AL ENVIAR EMAIL`);
        console.log(`   📊 Status: ${result.status || "Unknown"}`);
        console.log(
          `   ⚠️  Error: ${result.data?.error?.message || result.error}`
        );
        suiteFailureCount++;
      }
    } catch (error) {
      console.log(`   ❌ EXCEPCIÓN AL ENVIAR EMAIL`);
      console.log(`   ⚠️  Error: ${error.message}`);
      suiteFailureCount++;
    }

    console.log(""); // Línea en blanco

    // Pausa entre envíos para no saturar el servicio
    if (i < testCases.length - 1) {
      console.log("⏱️  Esperando 3 segundos antes del siguiente envío...\n");
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  // Resumen de la suite
  console.log("=".repeat(60));
  console.log(`📊 RESUMEN DE PRUEBAS - ${suiteName.toUpperCase()}`);
  console.log(`✅ Emails enviados exitosamente: ${suiteSuccessCount}`);
  console.log(`❌ Emails con error: ${suiteFailureCount}`);
  console.log(
    `📈 Porcentaje de éxito: ${Math.round(
      (suiteSuccessCount / testCases.length) * 100
    )}%`
  );
  console.log("=".repeat(60));
  console.log(""); // Línea en blanco

  return { success: suiteSuccessCount, failure: suiteFailureCount };
}

// CASOS DE PRUEBA PARA FORMULARIO DE PROPIETARIO
const ownerTestCases = [
  {
    name: "📧 PROPIETARIO 1: Apartamento completo en El Poblado",
    description: "Apartamento con todas las características premium",
    data: {
      userType: "owner",
      firstQuestion: "true",
      secondQuestion: "true",
      nombre: "María Elena Rodríguez",
      correo: "maria.rodriguez@testmail.com",
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
        "Apartamento en excelente estado, vista espectacular a la ciudad.",
    },
  },
  {
    name: "📧 PROPIETARIO 2: Casa familiar en Envigado",
    description: "Casa con patio y características familiares",
    data: {
      userType: "owner",
      firstQuestion: "true",
      secondQuestion: "true",
      nombre: "Carlos Andrés Mejía",
      correo: "carlos.mejia@testmail.com",
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
];

// CASOS DE PRUEBA PARA FORMULARIO DE COMPRADOR
const buyerTestCases = [
  {
    name: "📧 COMPRADOR 1: Joven profesional",
    description: "Busca apartamento moderno en zona central",
    data: {
      userType: "buyer",
      nombre: "Alejandra Morales",
      correo: "alejandra.morales@testmail.com",
      telefono: "3187654321",
      ciudad: "Medellín",
      tipoPropiedad: "Apartamento",
      presupuesto: 350000000,
      habitacionesDeseadas: 2,
      bañosDeseados: 2,
      areaMinima: 70,
      areaMaxima: 100,
      comentarios:
        "Busco apartamento en zona segura, cerca al metro, preferiblemente en El Poblado.",
    },
  },
  {
    name: "📧 COMPRADOR 2: Familia buscando casa",
    description: "Familia con niños necesita espacio y seguridad",
    data: {
      userType: "buyer",
      nombre: "Roberto y Patricia Hernández",
      correo: "hernandez.familia@testmail.com",
      telefono: "3209876543",
      ciudad: "Envigado",
      tipoPropiedad: "Casa",
      presupuesto: 550000000,
      habitacionesDeseadas: 4,
      bañosDeseados: 3,
      areaMinima: 150,
      areaMaxima: 250,
      comentarios:
        "Familia con dos niños busca casa con patio para que jueguen.",
    },
  },
];

// CASOS DE PRUEBA PARA CONTACTO GENERAL
const contactTestCases = [
  {
    name: "📧 CONTACTO 1: Consulta sobre avalúo",
    description: "Cliente solicita información sobre servicios de avalúo",
    data: {
      userType: "contact",
      nombre: "Juliana Restrepo",
      correo: "juliana.restrepo@testmail.com",
      telefono: "3198765432",
      asunto: "Consulta sobre avalúo comercial",
      mensaje:
        "Necesito realizar un avalúo comercial de mi propiedad ubicada en El Poblado. ¿Podrían enviarme información sobre costos y tiempos?",
    },
  },
  {
    name: "📧 CONTACTO 2: Oportunidades de inversión",
    description: "Inversionista busca asesoría especializada",
    data: {
      userType: "contact",
      nombre: "Eduardo Ramírez",
      correo: "eduardo.ramirez@testmail.com",
      telefono: "3156789012",
      asunto: "Oportunidades de inversión inmobiliaria",
      mensaje:
        "Soy inversionista interesado en las mejores oportunidades de inversión inmobiliaria en el Valle de Aburrá.",
    },
  },
];

// Función principal que ejecuta todas las suites
async function runAllEmailTests() {
  console.log("🔍 VERIFICANDO PRERREQUISITOS...\n");

  // Verificar que Node.js tenga fetch disponible
  if (typeof fetch === "undefined") {
    console.error("❌ Error: fetch() no está disponible.");
    console.error("   Necesitas Node.js 18+ o instalar node-fetch");
    process.exit(1);
  }

  console.log("✅ Node.js con fetch() disponible");
  console.log(
    "⚠️  Asegúrate de que el servidor esté corriendo con 'npm run dev'\n"
  );

  // Pausa inicial
  console.log("⏱️  Iniciando en 3 segundos...\n");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  let totalSuccess = 0;
  let totalFailure = 0;
  let totalTests = 0;

  // Ejecutar cada suite
  const ownerResults = await runTestSuite(
    "FORMULARIO DE PROPIETARIO",
    ownerTestCases,
    "🏠"
  );
  console.log("⏱️  Pausa de 5 segundos entre suites...\n");
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const buyerResults = await runTestSuite(
    "FORMULARIO DE COMPRADOR",
    buyerTestCases,
    "🏪"
  );
  console.log("⏱️  Pausa de 5 segundos entre suites...\n");
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const contactResults = await runTestSuite(
    "FORMULARIO DE CONTACTO",
    contactTestCases,
    "📧"
  );

  // Calcular totales
  totalSuccess =
    ownerResults.success + buyerResults.success + contactResults.success;
  totalFailure =
    ownerResults.failure + buyerResults.failure + contactResults.failure;
  totalTests = totalSuccess + totalFailure;

  // Resumen general final
  console.log("=".repeat(80));
  console.log("🎯 RESUMEN GENERAL DE TODAS LAS PRUEBAS DE EMAIL");
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
  console.log(`   ✅ Emails enviados exitosamente: ${totalSuccess}`);
  console.log(`   ❌ Emails con error: ${totalFailure}`);
  console.log(`   📊 Total de pruebas ejecutadas: ${totalTests}`);
  console.log(
    `   🎯 Porcentaje de éxito general: ${Math.round(
      (totalSuccess / totalTests) * 100
    )}%`
  );
  console.log("");

  // Evaluación del sistema
  let evaluation = "";
  let recommendations = [];

  if (totalFailure === 0) {
    evaluation = "🟢 EXCELENTE - Todos los emails se enviaron correctamente";
    recommendations.push("✨ Sistema de emails funcionando perfectamente");
    recommendations.push(
      "📬 Verifica tu bandeja de entrada para confirmar la recepción"
    );
    recommendations.push(
      "🔄 Considera implementar pruebas automáticas regulares"
    );
  } else if (totalSuccess / totalTests >= 0.8) {
    evaluation = "🟡 BUENO - La mayoría de emails se enviaron correctamente";
    recommendations.push("🔍 Revisar casos fallidos para identificar patrones");
    recommendations.push("⚙️  Verificar configuración de RESEND_API_KEY");
  } else {
    evaluation = "🔴 NECESITA ATENCIÓN - Múltiples fallos detectados";
    recommendations.push("⚠️  Verificar que el servidor esté ejecutándose");
    recommendations.push("🔑 Confirmar configuración de RESEND_API_KEY");
    recommendations.push("🌐 Verificar conectividad de red");
    recommendations.push("📋 Revisar logs del servidor para más detalles");
  }

  console.log("🏆 EVALUACIÓN DEL SISTEMA:");
  console.log(`   ${evaluation}`);
  console.log("");
  console.log("💡 RECOMENDACIONES:");
  recommendations.forEach((rec) => console.log(`   ${rec}`));

  console.log("");
  console.log("=".repeat(80));
  console.log("🏁 PRUEBAS DE EMAIL COMPLETADAS");
  console.log("=".repeat(80));
  console.log("");
  console.log("📄 Reporte detallado mostrado arriba");
  console.log(
    "💾 Para monitoreo continuo, considera implementar logging persistente"
  );
}

// Ejecutar todas las pruebas
runAllEmailTests().catch(console.error);
