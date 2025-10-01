/**
 * SCRIPT DE TESTING PARA PLANTILLAS DE EMAIL OPTIMIZADAS PARA GMAIL
 *
 * Este script permite probar el envío de emails con datos realistas
 * para validar que las plantillas funcionan correctamente antes de producción.
 *
 * Funcionalidades:
 * - Testing individual por tipo de plantilla
 * - Validación de datos requeridos
 * - Envío real a través de la API
 * - Manejo de errores y feedback detallado
 *
 * Uso:
 *   tsx scripts/testEmailTemplates.ts [buyer|owner|contact|all|data]
 *
 * Ejemplos:
 *   tsx scripts/testEmailTemplates.ts buyer    # Prueba solo compradores
 *   tsx scripts/testEmailTemplates.ts all      # Prueba todas las plantillas
 *   tsx scripts/testEmailTemplates.ts data     # Muestra datos de prueba
 */

import { testData, validateEmailData } from "../src/components/emails/config";

/**
 * Función principal para probar el envío de un tipo específico de email
 *
 * @param type - Tipo de plantilla a probar: 'buyer', 'owner' o 'contact'
 *
 * Proceso:
 * 1. Obtiene los datos de prueba correspondientes
 * 2. Valida que todos los campos requeridos están presentes
 * 3. Envía el email a través de la API de Next.js
 * 4. Reporta el resultado del envío
 */
async function testEmailAPI(type: "buyer" | "owner" | "contact") {
  console.log(`\n🧪 Testing ${type} email template...`);

  // Obtener datos de prueba específicos para este tipo de plantilla
  const data = testData[type];

  // Validar que todos los campos requeridos están presentes
  const validation = validateEmailData(data, type);
  if (!validation.isValid) {
    console.error(
      `❌ Validation failed for ${type}:`,
      validation.missingFields
    );
    return;
  }

  console.log(`✅ Data validation passed for ${type}`);

  try {
    const response = await fetch("http://localhost:3000/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      console.log(`✅ Email sent successfully for ${type}:`, result);
    } else {
      console.error(`❌ Email failed for ${type}:`, result);
    }
  } catch (error) {
    console.error(`❌ Network error for ${type}:`, error);
  }
}

async function testAllTemplates() {
  console.log("🚀 Starting email template testing...");
  console.log("📧 Testing optimized Gmail templates for Luis Fernando Realtor");

  // Test each template type
  await testEmailAPI("buyer");
  await testEmailAPI("owner");
  await testEmailAPI("contact");

  console.log("\n🎉 Email template testing completed!");
  console.log("\n📝 Next steps:");
  console.log("1. Check your email inbox for the test messages");
  console.log(
    "2. Verify the templates display correctly in Gmail (web and mobile)"
  );
  console.log("3. Test responsiveness by resizing browser window");
  console.log("4. Check dark mode compatibility in Gmail");
  console.log("5. Preview templates at: http://localhost:3000/emails");
}

// Función para testing individual
async function testSingleTemplate(type?: string) {
  if (!type) {
    console.log(
      "Usage: tsx scripts/testEmailTemplates.ts [buyer|owner|contact]"
    );
    return;
  }

  if (!["buyer", "owner", "contact"].includes(type)) {
    console.error("❌ Invalid template type. Use: buyer, owner, or contact");
    return;
  }

  await testEmailAPI(type as "buyer" | "owner" | "contact");
}

// Función para mostrar datos de prueba
function showTestData() {
  console.log("📄 Test data for email templates:");
  console.log("\n🏠 Buyer Template Data:");
  console.log(JSON.stringify(testData.buyer, null, 2));

  console.log("\n🏘️ Owner Template Data:");
  console.log(JSON.stringify(testData.owner, null, 2));

  console.log("\n💌 Contact Template Data:");
  console.log(JSON.stringify(testData.contact, null, 2));
}

// Main execution
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "all":
    testAllTemplates();
    break;
  case "data":
    showTestData();
    break;
  case "buyer":
  case "owner":
  case "contact":
    testSingleTemplate(command);
    break;
  default:
    console.log("🎯 Email Template Testing Script");
    console.log("\nUsage:");
    console.log(
      "  tsx scripts/testEmailTemplates.ts all       # Test all templates"
    );
    console.log(
      "  tsx scripts/testEmailTemplates.ts buyer     # Test buyer template"
    );
    console.log(
      "  tsx scripts/testEmailTemplates.ts owner     # Test owner template"
    );
    console.log(
      "  tsx scripts/testEmailTemplates.ts contact   # Test contact template"
    );
    console.log(
      "  tsx scripts/testEmailTemplates.ts data      # Show test data"
    );
    console.log("\n📧 Templates are optimized for Gmail web and mobile");
    break;
}
