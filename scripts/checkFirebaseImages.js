#!/usr/bin/env node

// Script para verificar URLs de Firebase Storage
// Ejecutar con: node scripts/checkFirebaseImages.js

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

// Función para hacer una petición HTTP HEAD
function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith("https:") ? https : http;

    const request = client.request(
      url,
      { method: "HEAD", timeout: 10000 },
      (response) => {
        resolve({
          url,
          status: response.statusCode,
          ok: response.statusCode >= 200 && response.statusCode < 300,
          headers: response.headers,
        });
      }
    );

    request.on("error", (error) => {
      resolve({
        url,
        status: 0,
        ok: false,
        error: error.message,
      });
    });

    request.on("timeout", () => {
      request.destroy();
      resolve({
        url,
        status: 0,
        ok: false,
        error: "Timeout",
      });
    });

    request.end();
  });
}

// Función para extraer URLs de Firebase Storage de los datos
function extractFirebaseUrls(data) {
  const urls = new Set();

  function extractFromValue(value) {
    if (
      typeof value === "string" &&
      value.includes("firebasestorage.googleapis.com")
    ) {
      urls.add(value);
    } else if (Array.isArray(value)) {
      value.forEach(extractFromValue);
    } else if (value && typeof value === "object") {
      Object.values(value).forEach(extractFromValue);
    }
  }

  if (Array.isArray(data)) {
    data.forEach((item) => extractFromValue(item));
  } else {
    extractFromValue(data);
  }

  return Array.from(urls);
}

async function checkFirebaseImages() {
  console.log("🔍 Verificando URLs de Firebase Storage...\n");

  try {
    let firebaseUrls = [];

    // Buscar URLs de Firebase Storage en el reporte de propiedades
    const reportPath = path.join(
      __dirname,
      "..",
      "reporte-propiedades-2025-07-27.txt"
    );
    if (fs.existsSync(reportPath)) {
      const reportContent = fs.readFileSync(reportPath, "utf8");
      const urlRegex = /https:\/\/firebasestorage\.googleapis\.com[^\s\n]*/g;
      const matches = reportContent.match(urlRegex);
      if (matches) {
        firebaseUrls = [...new Set(matches)]; // Eliminar duplicados
        console.log(`� URLs encontradas en reporte: ${firebaseUrls.length}`);
      }
    }

    // URLs de ejemplo adicionales para verificar
    const exampleUrls = [
      "https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/properties%2Fimages%2F1753389229074_dinero.png?alt=media&token=f01812ca-e581-4759-8baf-2f3ce6151cab",
      "https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/properties%2Fimages%2F1753389282759_WhatsApp%20Image%202025-06-26%20at%2011.06.42%20PM.jpeg?alt=media&token=65816a32-3730-4620-b750-459c8eb8a5d3",
    ];

    // Combinar URLs encontradas con las de ejemplo
    firebaseUrls = [...new Set([...firebaseUrls, ...exampleUrls])];
    console.log(`🔗 Total URLs a verificar: ${firebaseUrls.length}\n`);

    // Verificar cada URL
    const results = await Promise.all(firebaseUrls.map(checkUrl));

    // Mostrar resultados
    let validCount = 0;
    let errorCount = 0;

    results.forEach((result) => {
      if (result.ok) {
        console.log(`✅ ${result.url} (${result.status})`);
        validCount++;
      } else {
        console.log(
          `❌ ${result.url} (${result.status || "Error"}) - ${
            result.error || "HTTP Error"
          }`
        );
        errorCount++;
      }
    });

    // Resumen
    console.log("\n📊 Resumen:");
    console.log(`✅ URLs válidas: ${validCount}`);
    console.log(`❌ URLs con error: ${errorCount}`);
    console.log(`📎 Total verificadas: ${results.length}`);

    if (errorCount > 0) {
      console.log("\n🚨 Problemas encontrados:");
      console.log("1. URLs de Firebase Storage inválidas o expiradas");
      console.log("2. Problemas de permisos en Firebase Storage");
      console.log("3. Archivos eliminados del bucket");

      console.log("\n💡 Soluciones:");
      console.log("1. Actualizar las propiedades con URLs válidas");
      console.log("2. Re-subir las imágenes a Firebase Storage");
      console.log("3. Verificar reglas de seguridad de Storage");
      console.log("4. Implementar manejo de errores en el frontend");
    }

    return {
      total: results.length,
      valid: validCount,
      errors: errorCount,
      results,
    };
  } catch (error) {
    console.error("❌ Error general:", error.message);
    return { total: 0, valid: 0, errors: 0, results: [] };
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  checkFirebaseImages().then((result) => {
    process.exit(result.errors > 0 ? 1 : 0);
  });
}

module.exports = { checkFirebaseImages };
