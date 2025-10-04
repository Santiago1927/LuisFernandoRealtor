// Script de prueba REAL para el formulario de Comprador (BuyerForm)
// Este script envía datos reales al endpoint /api/send para probar el envío de emails
// Ejecutar desde la terminal: node scripts/testBuyerFormEmail.js

console.log("📧 INICIANDO PRUEBAS REALES DE EMAIL - FORMULARIO DE COMPRADOR");
console.log("=".repeat(70));

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

// Casos de prueba para envío real de emails de compradores
const emailTestCases = [
  {
    name: "📧 EMAIL 1: Comprador buscando apartamento",
    description: "Joven profesional busca apartamento en Medellín",
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

      // Preferencias específicas
      preferencias: {
        parqueadero: true,
        balcon: true,
        estudio: false,
        terraza: true,
        piscina: true,
        vigilancia: true,
      },

      comentarios:
        "Busco apartamento en zona segura, cerca al metro, preferiblemente en El Poblado o Envigado. Trabajo desde casa así que necesito buena iluminación natural.",
    },
  },

  {
    name: "📧 EMAIL 2: Familia buscando casa",
    description: "Familia con niños busca casa en sector residencial",
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

      // Preferencias para familia
      preferencias: {
        parqueadero: true,
        patio: true,
        estudio: true,
        deposito: true,
        vigilancia: false, // Buscan barrio tranquilo sin conjunto
        zona_verde: true,
      },

      comentarios:
        "Familia con dos niños busca casa con patio para que jueguen. Preferiblemente cerca a colegios y parques. Nos interesa sector residencial tranquilo.",
    },
  },

  {
    name: "📧 EMAIL 3: Inversionista buscando oficina",
    description: "Empresario busca oficina para inversión comercial",
    data: {
      userType: "buyer",
      nombre: "Dr. Mauricio Saldarriaga",
      correo: "mauricio.saldarriaga@empresa.com",
      telefono: "3156789012",
      ciudad: "Medellín",
      tipoPropiedad: "Oficina",
      presupuesto: 280000000,
      areaMinima: 60,
      areaMaxima: 120,

      // Preferencias comerciales
      preferencias: {
        parqueadero: true,
        recepcion: true,
        divisiones: true,
        aire_acondicionado: true,
        vigilancia: true,
        ascensor: true,
      },

      comentarios:
        "Busco oficina en sector comercial consolidado, preferiblemente en El Poblado o Laureles. Para uso profesional de consulta médica. Necesito fácil acceso y parqueadero para pacientes.",
    },
  },

  {
    name: "📧 EMAIL 4: Comprador de lote",
    description: "Arquitecto busca lote para proyecto personal",
    data: {
      userType: "buyer",
      nombre: "Arq. Carolina Vásquez",
      correo: "carolina.vasquez@arqui.com",
      telefono: "3178901234",
      ciudad: "Sabaneta",
      tipoPropiedad: "Lote",
      presupuesto: 200000000,
      areaMinima: 200,
      areaMaxima: 400,

      // Preferencias para lote
      preferencias: {
        topografia_plana: true,
        servicios_publicos: true,
        vias_pavimentadas: true,
        zonificacion_residencial: true,
      },

      comentarios:
        "Arquitecta busca lote para construir casa de habitación propia. Prefiero terreno plano, con todos los servicios, en sector con potencial de valorización.",
    },
  },

  {
    name: "📧 EMAIL 5: Comprador con presupuesto ajustado",
    description: "Joven pareja busca primera vivienda",
    data: {
      userType: "buyer",
      nombre: "Camilo y Sandra",
      correo: "camiloysandra2024@email.com",
      telefono: "3134567890",
      ciudad: "Itagüí",
      tipoPropiedad: "Apartamento",
      presupuesto: 180000000,
      habitacionesDeseadas: 2,
      bañosDeseados: 1,
      areaMinima: 50,
      areaMaxima: 70,

      // Preferencias básicas
      preferencias: {
        parqueadero: false, // No es indispensable
        balcon: true,
        vigilancia: true,
        transporte_publico: true,
      },

      comentarios:
        "Joven pareja busca primera vivienda. Priorizamos ubicación con buen transporte público y comercio cercano. Estamos abiertos a apartamentos que necesiten remodelación menor.",
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
  console.log("=".repeat(70));
  console.log("📊 RESUMEN DE PRUEBAS DE EMAIL - FORMULARIO DE COMPRADOR");
  console.log(`✅ Emails enviados exitosamente: ${successCount}`);
  console.log(`❌ Emails con error: ${failureCount}`);
  console.log(`📊 Total de pruebas: ${emailTestCases.length}`);
  console.log(
    `🎯 Porcentaje de éxito: ${Math.round(
      (successCount / emailTestCases.length) * 100
    )}%`
  );
  console.log("=".repeat(70));

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
