// Script de prueba REAL para el formulario de Propietario usando módulos nativos de Node.js
// Este script envía datos reales al endpoint /api/send sin usar fetch
// Ejecutar desde la terminal: node scripts/testOwnerFormEmailNative.js

const http = require("http");
const util = require("util");

console.log(
  "📧 INICIANDO PRUEBAS REALES DE EMAIL - FORMULARIO DE PROPIETARIO (NATIVO)"
);
console.log("=".repeat(75));

const API_HOST = "localhost";
const API_PORT = 3000;
const API_PATH = "/api/send";

// Función para hacer peticiones HTTP usando módulos nativos
function makeRequest(data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);

    const options = {
      hostname: API_HOST,
      port: API_PORT,
      path: API_PATH,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = http.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        try {
          const result = JSON.parse(responseData);
          resolve({
            success: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            data: result,
          });
        } catch (error) {
          resolve({
            success: false,
            status: res.statusCode,
            error: `Error parsing response: ${error.message}`,
            rawResponse: responseData,
          });
        }
      });
    });

    req.on("error", (error) => {
      reject({
        success: false,
        error: error.message,
      });
    });

    req.on("timeout", () => {
      req.destroy();
      reject({
        success: false,
        error: "Request timeout",
      });
    });

    // Timeout de 10 segundos
    req.setTimeout(10000);

    req.write(postData);
    req.end();
  });
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
      const result = await makeRequest(testCase.data);

      if (result.success) {
        console.log(`   ✅ EMAIL ENVIADO EXITOSAMENTE`);
        console.log(`   📊 Status: ${result.status}`);
        if (result.data && result.data.id) {
          console.log(`   🆔 Email ID: ${result.data.id}`);
        }
        successCount++;
      } else {
        console.log(`   ❌ ERROR AL ENVIAR EMAIL`);
        console.log(`   📊 Status: ${result.status || "Unknown"}`);
        console.log(
          `   ⚠️  Error: ${
            result.error || result.data?.error?.message || "Unknown error"
          }`
        );
        if (result.rawResponse) {
          console.log(
            `   📄 Raw Response: ${result.rawResponse.substring(0, 200)}...`
          );
        }
        failureCount++;
      }
    } catch (error) {
      console.log(`   ❌ EXCEPCIÓN AL ENVIAR EMAIL`);
      console.log(`   ⚠️  Error: ${error.error || error.message}`);
      failureCount++;
    }

    console.log(""); // Línea en blanco

    // Pausa entre envíos para no saturar el servicio
    if (i < emailTestCases.length - 1) {
      console.log("⏱️  Esperando 3 segundos antes del siguiente envío...\n");
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  // Resumen final
  console.log("=".repeat(75));
  console.log("📊 RESUMEN DE PRUEBAS DE EMAIL - FORMULARIO DE PROPIETARIO");
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

// Función de prueba de conectividad
async function testConnectivity() {
  console.log("🔍 VERIFICANDO CONECTIVIDAD CON EL SERVIDOR...\n");

  return new Promise((resolve) => {
    const options = {
      hostname: API_HOST,
      port: API_PORT,
      path: "/",
      method: "GET",
      timeout: 5000,
    };

    const req = http.request(options, (res) => {
      console.log(`✅ Servidor respondiendo en ${API_HOST}:${API_PORT}`);
      console.log(`   📊 Status: ${res.statusCode}`);
      console.log(`   📄 Headers: ${JSON.stringify(res.headers, null, 2)}\n`);
      resolve(true);
    });

    req.on("error", (error) => {
      console.log(`❌ Error conectando al servidor:`);
      console.log(`   ⚠️  ${error.message}\n`);
      resolve(false);
    });

    req.on("timeout", () => {
      console.log(`❌ Timeout conectando al servidor\n`);
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

// Ejecutar las pruebas
async function main() {
  const isConnected = await testConnectivity();

  if (!isConnected) {
    console.log(
      "❌ No se puede conectar al servidor. Verifica que esté ejecutándose con 'npm run dev'"
    );
    process.exit(1);
  }

  await runEmailTests();
}

main().catch(console.error);
