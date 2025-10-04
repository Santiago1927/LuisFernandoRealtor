// Script de prueba REAL para el formulario de Propietario (OwnerForm)
// Este script envía datos reales al endpoint /api/send para probar el envío de emails
// Ejecutar desde la terminal: node scripts/testOwnerFormEmail.js

console.log("📧 INICIANDO PRUEBAS REALES DE EMAIL - FORMULARIO DE PROPIETARIO");
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

// Casos de prueba para envío real de emails
const emailTestCases = [
  {
    name: "📧 EMAIL 1: Propietario con apartamento completo",
    description: "Apartamento en Medellín con todas las características",
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

      // Características adicionales
      estudio: true,
      deposito: false,
      balcon: true,
      vigilancia: true,
      piscina: true,

      // Parqueadero
      tieneParqueadero: true,
      numeroParqueaderos: 1,
      areaParqueadero: 12,

      // Terraza
      tieneTerraza: true,
      areaTerraza: 25,

      // Sin patio
      tienePatio: false,

      // Administración
      tieneAdministracion: true,
      valorAdministracion: 320000,

      // Información financiera
      valorAproximado: 380000000,
      situacionJuridica: "Escritura pública registrada",
      comentariosAdicionales:
        "Apartamento en excelente estado, vista espectacular a la ciudad. Edificio con gimnasio y salón social.",
    },
  },

  {
    name: "📧 EMAIL 2: Casa en Envigado",
    description: "Casa familiar con patio y múltiples características",
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
      piso: 0, // Casa no tiene piso

      // Características
      estudio: true,
      deposito: true,
      balcon: false,
      vigilancia: false,
      piscina: false,

      // Parqueadero
      tieneParqueadero: true,
      numeroParqueaderos: 2,
      areaParqueadero: 30,

      // Sin terraza
      tieneTerraza: false,

      // Con patio
      tienePatio: true,
      areaPatio: 45,

      // Sin administración
      tieneAdministracion: false,

      // Información financiera
      valorAproximado: 520000000,
      situacionJuridica: "Escritura pública registrada",
      comentariosAdicionales:
        "Casa familiar en sector residencial tranquilo, cerca a colegios y centros comerciales.",
    },
  },

  {
    name: "📧 EMAIL 3: Lote para construir",
    description: "Lote en Sabaneta sin construcción",
    data: {
      userType: "owner",
      firstQuestion: "true",
      secondQuestion: "true",
      nombre: "Ana Sofía Gutierrez",
      correo: "ana.gutierrez@email.com",
      telefono: "3009876543",
      ciudad: "Sabaneta",
      tipoPropiedad: "Lote",
      direccion: "Carrera 67 #28-45, Sector Mayorca",
      edadPropiedad: 0, // Lote sin construcción
      areaConstruida: 0, // Sin construcción
      habitaciones: 0,
      baños: 0,
      piso: 0,

      // Sin características de construcción
      estudio: false,
      deposito: false,
      balcon: false,
      vigilancia: true, // Conjunto cerrado
      piscina: false,

      // Sin parqueadero construido
      tieneParqueadero: false,
      tieneTerraza: false,
      tienePatio: false,
      tieneAdministracion: false,

      // Información del lote
      areaLote: 240, // Área del lote en m²
      valorAproximado: 180000000,
      situacionJuridica: "Escritura pública registrada",
      comentariosAdicionales:
        "Lote plano, esquinero, en conjunto cerrado con vías pavimentadas. Ideal para construir casa familiar.",
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
  console.log("📊 RESUMEN DE PRUEBAS DE EMAIL - FORMULARIO DE PROPIETARIO");
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
