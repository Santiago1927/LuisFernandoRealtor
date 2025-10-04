// Script de prueba REAL para el formulario de Contacto General
// Este script envía datos reales al endpoint /api/send para probar el envío de emails
// Ejecutar desde la terminal: node scripts/testContactFormEmail.js

console.log(
  "📧 INICIANDO PRUEBAS REALES DE EMAIL - FORMULARIO DE CONTACTO GENERAL"
);
console.log("=".repeat(75));

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

// Casos de prueba para envío real de emails de contacto general
const emailTestCases = [
  {
    name: "📧 EMAIL 1: Consulta sobre avalúo",
    description: "Cliente solicita información sobre servicios de avalúo",
    data: {
      userType: "contact",
      nombre: "Juliana Restrepo",
      correo: "juliana.restrepo@email.com",
      telefono: "3198765432",
      asunto: "Consulta sobre avalúo comercial",
      mensaje:
        "Buenos días, necesito realizar un avalúo comercial de mi propiedad ubicada en El Poblado. Es un apartamento de 85m² en edificio de 10 años. ¿Podrían enviarme información sobre costos y tiempos? Gracias.",
    },
  },

  {
    name: "📧 EMAIL 2: Consulta sobre inversión",
    description: "Inversionista pregunta sobre oportunidades",
    data: {
      userType: "contact",
      nombre: "Eduardo Ramírez",
      correo: "eduardo.ramirez@inversiones.com",
      telefono: "3156789012",
      asunto: "Oportunidades de inversión inmobiliaria",
      mensaje:
        "Estimado Luis Fernando, soy inversionista y estoy interesado en conocer las mejores oportunidades de inversión inmobiliaria en el Valle de Aburrá. Manejo un presupuesto de hasta 800 millones de pesos y busco propiedades con potencial de valorización. Me gustaría agendar una cita para conversar sobre las opciones disponibles.",
    },
  },

  {
    name: "📧 EMAIL 3: Consulta sobre documentación legal",
    description: "Cliente pregunta sobre trámites y documentos",
    data: {
      userType: "contact",
      nombre: "María José Henao",
      correo: "mariajose.henao@email.com",
      telefono: "3007654321",
      asunto: "Documentación necesaria para venta",
      mensaje:
        "Hola, estoy pensando en vender mi casa en Envigado y tengo algunas dudas sobre la documentación necesaria. La propiedad está a mi nombre pero hay una mejora que hice sin permiso hace 5 años. ¿Esto representa algún problema? ¿Qué documentos necesito tener listos? Agradezco su orientación.",
    },
  },

  {
    name: "📧 EMAIL 4: Consulta sobre financiación",
    description: "Cliente pregunta sobre opciones de crédito",
    data: {
      userType: "contact",
      nombre: "Andrés Felipe Gómez",
      correo: "andres.gomez@email.com",
      telefono: "3189012345",
      asunto: "Asesoría en financiación de vivienda",
      mensaje:
        "Buenos días Luis Fernando, trabajo como empleado hace 3 años y tengo capacidad de pago para un apartamento de hasta 300 millones. Quisiera saber qué opciones de financiación recomienda y si maneja alianzas con bancos. También me gustaría conocer sobre los subsidios disponibles para primera vivienda.",
    },
  },

  {
    name: "📧 EMAIL 5: Consulta sobre administración de propiedades",
    description: "Propietario pregunta sobre servicios de administración",
    data: {
      userType: "contact",
      nombre: "Claudia Patricia Torres",
      correo: "claudia.torres@email.com",
      telefono: "3123456789",
      asunto: "Administración de propiedades en alquiler",
      mensaje:
        "Estimado Luis Fernando, tengo 3 apartamentos que quiero poner en alquiler pero vivo en el exterior y necesito alguien confiable que me los administre. ¿Ofrecen este servicio? Me interesa saber sobre los costos, qué incluye el servicio y cómo manejan la selección de inquilinos.",
    },
  },

  {
    name: "📧 EMAIL 6: Consulta técnica sobre construcción",
    description: "Cliente pregunta sobre licencias y permisos",
    data: {
      userType: "contact",
      nombre: "Ing. Carlos Ruiz",
      correo: "carlos.ruiz@construcciones.com",
      telefono: "3167890123",
      asunto: "Consulta sobre licencias de construcción",
      mensaje:
        "Buen día, compré un lote en Sabaneta y quiero iniciar la construcción de una casa. Necesito asesoría sobre el proceso de licencias, planos, tiempos de aprobación y costos aproximados. ¿Manejan este tipo de asesorías o me pueden recomendar profesionales especializados?",
    },
  },

  {
    name: "📧 EMAIL 7: Consulta sobre permuta",
    description: "Cliente interesado en intercambio de propiedades",
    data: {
      userType: "contact",
      nombre: "Rosa Elena Vásquez",
      correo: "rosa.vasquez@email.com",
      telefono: "3145678901",
      asunto: "Posibilidad de permuta",
      mensaje:
        "Hola Luis Fernando, tengo una casa en Itagüí y me gustaría cambiarla por un apartamento en Medellín. La casa vale aproximadamente 350 millones y busco apartamento en zona segura, de 2-3 habitaciones. ¿Manejan este tipo de operaciones? ¿Qué documentación necesitaría?",
    },
  },
];

// Función principal para ejecutar pruebas
async function runEmailTests() {
  console.log(
    `⏳ Iniciando ${emailTestCases.length} pruebas de envío de email...\n`
  );

  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < emailTestCases.length; i++) {
    const testCase = emailTestCases[i];
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
        successCount++;
      } else {
        console.log(`   ❌ ERROR AL ENVIAR EMAIL`);
        console.log(`   📊 Status: ${result.status || "Unknown"}`);
        console.log(
          `   ⚠️  Error: ${result.data?.error?.message || result.error}`
        );
        failureCount++;
      }
    } catch (error) {
      console.log(`   ❌ EXCEPCIÓN AL ENVIAR EMAIL`);
      console.log(`   ⚠️  Error: ${error.message}`);
      failureCount++;
    }

    console.log(""); // Línea en blanco

    // Pausa entre envíos para no saturar el servicio
    if (i < emailTestCases.length - 1) {
      console.log("⏱️  Esperando 2 segundos antes del siguiente envío...\n");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  // Resumen final
  console.log("=".repeat(75));
  console.log(
    "📊 RESUMEN DE PRUEBAS DE EMAIL - FORMULARIO DE CONTACTO GENERAL"
  );
  console.log(`✅ Emails enviados exitosamente: ${successCount}`);
  console.log(`❌ Emails con error: ${failureCount}`);
  console.log(`📊 Total de pruebas: ${emailTestCases.length}`);
  console.log(
    `🎯 Porcentaje de éxito: ${Math.round(
      (successCount / emailTestCases.length) * 100
    )}%`
  );
  console.log("=".repeat(75));

  if (failureCount > 0) {
    console.log("\n⚠️  NOTAS IMPORTANTES:");
    console.log(
      "   • Verifica que el servidor de desarrollo esté ejecutándose (npm run dev)"
    );
    console.log(
      "   • Confirma que RESEND_API_KEY esté configurada en .env.local"
    );
    console.log(
      "   • Revisa la consola del servidor para más detalles de errores"
    );
  } else {
    console.log("\n🎉 ¡TODAS LAS PRUEBAS DE EMAIL FUERON EXITOSAS!");
    console.log(
      "   📬 Verifica tu bandeja de entrada para confirmar la recepción"
    );
  }
}

// Verificar que Node.js tenga fetch disponible (Node 18+)
if (typeof fetch === "undefined") {
  console.error("❌ Error: fetch() no está disponible.");
  console.error("   Necesitas Node.js 18+ o instalar node-fetch");
  process.exit(1);
}

// Ejecutar las pruebas
runEmailTests().catch(console.error);
