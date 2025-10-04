#!/usr/bin/env node

// Script para limpiar URLs rotas de Firebase Storage
// Ejecutar con: node scripts/fixBrokenFirebaseUrls.js

const fs = require("fs");
const path = require("path");
const https = require("https");

// URLs rotas conocidas de Firebase Storage
const BROKEN_FIREBASE_URLS = [
  "https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/properties%2Fimages%2F1753389229074_dinero.png?alt=media&token=f01812ca-e581-4759-8baf-2f3ce6151cab",
  "https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/properties%2Fimages%2F1753389282759_WhatsApp%20Image%202025-06-26%20at%2011.06.42%20PM.jpeg?alt=media&token=65816a32-3730-4620-b750-459c8eb8a5d3",
  "https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/properties%2Fimages%2F1753417841583_th.outside926x816.682ddf3969e69_infocdn__rrpmqjnyzboojm5ojhfpatlpccpu4ejuvwmczwtsjpg.webp?alt=media&token=46aa6747-c36c-4269-9aa9-bced4fd7b196",
];

// Mapeo de URLs rotas a imágenes locales de reemplazo
const URL_REPLACEMENTS = {
  // Imagen de dinero -> usar placeholder
  "https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/properties%2Fimages%2F1753389229074_dinero.png?alt=media&token=f01812ca-e581-4759-8baf-2f3ce6151cab":
    "/placeholder-property.svg",

  // Imagen de WhatsApp -> usar placeholder
  "https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/properties%2Fimages%2F1753389282759_WhatsApp%20Image%202025-06-26%20at%2011.06.42%20PM.jpeg?alt=media&token=65816a32-3730-4620-b750-459c8eb8a5d3":
    "/placeholder-property.svg",

  // Imagen exterior -> usar placeholder
  "https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/properties%2Fimages%2F1753417841583_th.outside926x816.682ddf3969e69_infocdn__rrpmqjnyzboojm5ojhfpatlpccpu4ejuvwmczwtsjpg.webp?alt=media&token=46aa6747-c36c-4269-9aa9-bced4fd7b196":
    "/placeholder-property.svg",
};

function findFilesToProcess(
  directory,
  extensions = [".tsx", ".ts", ".js", ".jsx"]
) {
  const files = [];

  function walkDirectory(dir) {
    try {
      const entries = fs.readdirSync(dir);

      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);

        if (
          stat.isDirectory() &&
          !entry.includes("node_modules") &&
          !entry.includes(".next")
        ) {
          walkDirectory(fullPath);
        } else if (
          stat.isFile() &&
          extensions.some((ext) => entry.endsWith(ext))
        ) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.error(`Error walking directory ${dir}:`, error.message);
    }
  }

  walkDirectory(directory);
  return files;
}

function fixBrokenUrlsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let hasChanges = false;

    // Reemplazar URLs rotas conocidas
    Object.entries(URL_REPLACEMENTS).forEach(([brokenUrl, replacement]) => {
      if (content.includes(brokenUrl)) {
        console.log(
          `🔧 Reemplazando URL rota en ${path.relative(
            process.cwd(),
            filePath
          )}`
        );
        console.log(`   ${brokenUrl.substring(0, 80)}...`);
        console.log(`   -> ${replacement}`);
        content = content.replace(
          new RegExp(brokenUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
          replacement
        );
        hasChanges = true;
      }
    });

    // Buscar y reportar otras URLs de Firebase Storage
    const firebaseUrlRegex =
      /https:\/\/firebasestorage\.googleapis\.com[^\s"'`,)}\]]+/g;
    const matches = content.match(firebaseUrlRegex);

    if (matches) {
      matches.forEach((url) => {
        if (!Object.keys(URL_REPLACEMENTS).includes(url)) {
          console.log(
            `⚠️  URL de Firebase encontrada en ${path.relative(
              process.cwd(),
              filePath
            )}:`
          );
          console.log(`   ${url}`);
        }
      });
    }

    // Guardar cambios si los hay
    if (hasChanges) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(
        `✅ Archivo actualizado: ${path.relative(process.cwd(), filePath)}`
      );
    }

    return hasChanges;
  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error.message);
    return false;
  }
}

async function fixBrokenFirebaseUrls() {
  console.log("🔧 Buscando y corrigiendo URLs rotas de Firebase Storage...\n");

  const projectRoot = process.cwd();
  const srcDirectory = path.join(projectRoot, "src");

  // Encontrar todos los archivos a procesar
  const files = findFilesToProcess(srcDirectory);
  console.log(`📁 Archivos a procesar: ${files.length}\n`);

  let totalFiles = 0;
  let modifiedFiles = 0;

  // Procesar cada archivo
  for (const file of files) {
    totalFiles++;
    const wasModified = fixBrokenUrlsInFile(file);
    if (wasModified) {
      modifiedFiles++;
    }
  }

  console.log("\n📊 Resumen:");
  console.log(`📁 Archivos procesados: ${totalFiles}`);
  console.log(`✏️  Archivos modificados: ${modifiedFiles}`);
  console.log(
    `🔗 URLs rotas reemplazadas: ${Object.keys(URL_REPLACEMENTS).length}`
  );

  if (modifiedFiles > 0) {
    console.log("\n✅ URLs rotas corregidas exitosamente");
    console.log("💡 Recomendaciones:");
    console.log("1. Revisar los cambios antes de hacer commit");
    console.log("2. Probar la aplicación para verificar que funciona");
    console.log("3. Considerar subir nuevas imágenes a Firebase Storage");
  } else {
    console.log("\n✅ No se encontraron URLs rotas para corregir");
  }

  return {
    totalFiles,
    modifiedFiles,
    urlsFixed: Object.keys(URL_REPLACEMENTS).length,
  };
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  fixBrokenFirebaseUrls()
    .then((result) => {
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Error:", error.message);
      process.exit(1);
    });
}

module.exports = { fixBrokenFirebaseUrls };
