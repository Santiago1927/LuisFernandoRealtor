// Script maestro para ejecutar todas las pruebas de formularios
// Ejecutar desde la terminal: node scripts/testAllForms.js

const { runTests: runOwnerTests } = require("./testOwnerForm");
const { runTests: runBuyerTests } = require("./testBuyerForm");
const { runTests: runContactTests } = require("./testContactForm");

console.log("🚀 SUITE COMPLETA DE PRUEBAS - FORMULARIOS DE CONTACTO");
console.log("=".repeat(70));
console.log("📅 Fecha:", new Date().toLocaleString("es-CO"));
console.log("🔧 Entorno: Desarrollo");
console.log("=".repeat(70));

async function runAllTests() {
  const results = {
    owner: null,
    buyer: null,
    contact: null,
    total: { passed: 0, failed: 0, total: 0 },
  };

  try {
    console.log("\n🏠 EJECUTANDO PRUEBAS DEL FORMULARIO DE PROPIETARIO...\n");
    results.owner = runOwnerTests();

    console.log("\n🏪 EJECUTANDO PRUEBAS DEL FORMULARIO DE COMPRADOR...\n");
    results.buyer = runBuyerTests();

    console.log("\n📧 EJECUTANDO PRUEBAS DEL FORMULARIO DE CONTACTO...\n");
    results.contact = runContactTests();

    // Calcular totales
    results.total.passed =
      results.owner.passed + results.buyer.passed + results.contact.passed;
    results.total.failed =
      results.owner.failed + results.buyer.failed + results.contact.failed;
    results.total.total =
      results.owner.total + results.buyer.total + results.contact.total;

    // Mostrar resumen general
    console.log("\n" + "=".repeat(70));
    console.log("🎯 RESUMEN GENERAL DE TODAS LAS PRUEBAS");
    console.log("=".repeat(70));

    // Resumen por formulario
    console.log("\n📊 RESULTADOS POR FORMULARIO:");
    console.log(
      `   🏠 Propietario: ${results.owner.passed}/${
        results.owner.total
      } (${Math.round((results.owner.passed / results.owner.total) * 100)}%)`
    );
    console.log(
      `   🏪 Comprador:   ${results.buyer.passed}/${
        results.buyer.total
      } (${Math.round((results.buyer.passed / results.buyer.total) * 100)}%)`
    );
    console.log(
      `   📧 Contacto:    ${results.contact.passed}/${
        results.contact.total
      } (${Math.round(
        (results.contact.passed / results.contact.total) * 100
      )}%)`
    );

    // Totales generales
    console.log("\n📈 TOTALES GENERALES:");
    console.log(`   ✅ Pruebas exitosas: ${results.total.passed}`);
    console.log(`   ❌ Pruebas fallidas: ${results.total.failed}`);
    console.log(`   📊 Total ejecutadas: ${results.total.total}`);
    console.log(
      `   🎯 Porcentaje éxito: ${Math.round(
        (results.total.passed / results.total.total) * 100
      )}%`
    );

    // Evaluación del estado
    const successRate = (results.total.passed / results.total.total) * 100;
    console.log("\n🏆 EVALUACIÓN DEL SISTEMA:");
    if (successRate >= 90) {
      console.log(
        "   🟢 EXCELENTE - Los formularios están funcionando correctamente"
      );
    } else if (successRate >= 75) {
      console.log(
        "   🟡 BUENO - Los formularios tienen algunos problemas menores"
      );
    } else if (successRate >= 50) {
      console.log("   🟠 REGULAR - Los formularios necesitan atención");
    } else {
      console.log("   🔴 CRÍTICO - Los formularios tienen problemas serios");
    }

    // Recomendaciones
    console.log("\n💡 RECOMENDACIONES:");
    if (results.owner.failed > 0) {
      console.log("   • Revisar validaciones del formulario de Propietario");
    }
    if (results.buyer.failed > 0) {
      console.log("   • Revisar validaciones del formulario de Comprador");
    }
    if (results.contact.failed > 0) {
      console.log("   • Revisar validaciones del formulario de Contacto");
    }
    if (results.total.failed === 0) {
      console.log(
        "   • ✨ Todos los formularios están funcionando perfectamente"
      );
      console.log("   • Considerar agregar más casos de prueba edge");
    }

    console.log("\n" + "=".repeat(70));
    console.log("🏁 PRUEBAS COMPLETADAS");
    console.log("=".repeat(70));

    return results;
  } catch (error) {
    console.error("\n❌ ERROR AL EJECUTAR LAS PRUEBAS:", error.message);
    return null;
  }
}

// Función para generar reporte detallado
function generateDetailedReport(results) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const reportContent = `
REPORTE DETALLADO DE PRUEBAS - FORMULARIOS DE CONTACTO
=====================================================
Fecha: ${new Date().toLocaleString("es-CO")}
Entorno: Desarrollo

RESUMEN EJECUTIVO:
- Total de pruebas: ${results.total.total}
- Exitosas: ${results.total.passed}
- Fallidas: ${results.total.failed}
- Tasa de éxito: ${Math.round(
    (results.total.passed / results.total.total) * 100
  )}%

DETALLES POR FORMULARIO:

1. FORMULARIO DE PROPIETARIO:
   - Pruebas ejecutadas: ${results.owner.total}
   - Exitosas: ${results.owner.passed}
   - Fallidas: ${results.owner.failed}
   - Porcentaje: ${Math.round(
     (results.owner.passed / results.owner.total) * 100
   )}%

2. FORMULARIO DE COMPRADOR:
   - Pruebas ejecutadas: ${results.buyer.total}
   - Exitosas: ${results.buyer.passed}
   - Fallidas: ${results.buyer.failed}
   - Porcentaje: ${Math.round(
     (results.buyer.passed / results.buyer.total) * 100
   )}%

3. FORMULARIO DE CONTACTO:
   - Pruebas ejecutadas: ${results.contact.total}
   - Exitosas: ${results.contact.passed}
   - Fallidas: ${results.contact.failed}
   - Porcentaje: ${Math.round(
     (results.contact.passed / results.contact.total) * 100
   )}%

ESTADO DEL SISTEMA: ${
    results.total.passed === results.total.total
      ? "PERFECTO"
      : "NECESITA ATENCIÓN"
  }

Reporte generado automáticamente por el sistema de pruebas.
`;

  return reportContent;
}

// Ejecutar si se llama directamente
if (require.main === module) {
  console.log("⏳ Iniciando suite completa de pruebas...\n");

  runAllTests()
    .then((results) => {
      if (results) {
        // Generar reporte detallado si se necesita
        const report = generateDetailedReport(results);

        console.log("\n📄 Reporte detallado generado en memoria");
        console.log(
          "💾 Para guardar el reporte, implementar escritura a archivo"
        );

        // Código de salida basado en resultados
        process.exit(results.total.failed === 0 ? 0 : 1);
      } else {
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error("💥 Error fatal:", error);
      process.exit(1);
    });
}

module.exports = { runAllTests, generateDetailedReport };
