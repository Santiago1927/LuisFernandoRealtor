#!/usr/bin/env node

// Script para reemplazar Image de Next.js por SmartImage en componentes críticos
// Ejecutar con: node scripts/replaceWithSmartImage.js

const fs = require("fs");
const path = require("path");

// Archivos específicos donde queremos reemplazar Image por SmartImage
const TARGET_FILES = [
  "src/components/admin/PropertyList.tsx",
  "src/app/propiedades/[id]/page.tsx",
  "src/app/admin/propiedades/[id]/page.tsx",
  "src/components/home/CarouselSection.tsx",
  "src/components/home/MainSection.tsx",
  "src/components/home/BackgroundCarousel.tsx",
];

function replaceImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let hasChanges = false;

    // Reemplazar import de Next.js Image por SmartImage
    const imageImportRegex =
      /import\s+Image\s+from\s+["']next\/image["'];?\s*\n/g;
    if (imageImportRegex.test(content)) {
      console.log(
        `🔄 Actualizando imports en ${path.relative(process.cwd(), filePath)}`
      );

      // Reemplazar el import
      content = content.replace(
        imageImportRegex,
        'import SmartImage from "@/components/ui/SmartImage";\n'
      );

      // Reemplazar todas las ocurrencias de <Image por <SmartImage
      content = content.replace(/<Image\b/g, "<SmartImage");

      hasChanges = true;
    }

    // También buscar imports con alias
    const aliasImportRegex =
      /import\s+\{\s*Image\s*\}\s+from\s+["']next\/image["'];?\s*\n/g;
    if (aliasImportRegex.test(content)) {
      console.log(
        `🔄 Actualizando imports con alias en ${path.relative(
          process.cwd(),
          filePath
        )}`
      );

      content = content.replace(
        aliasImportRegex,
        'import SmartImage from "@/components/ui/SmartImage";\n'
      );

      // Reemplazar todas las ocurrencias de <Image por <SmartImage
      content = content.replace(/<Image\b/g, "<SmartImage");

      hasChanges = true;
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(
        `✅ Archivo actualizado: ${path.relative(process.cwd(), filePath)}`
      );
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error.message);
    return false;
  }
}

function replaceWithSmartImage() {
  console.log(
    "🔄 Reemplazando Next.js Image por SmartImage en archivos críticos...\n"
  );

  const projectRoot = process.cwd();
  let modifiedFiles = 0;
  let totalFiles = 0;

  TARGET_FILES.forEach((relativePath) => {
    const fullPath = path.join(projectRoot, relativePath);

    if (fs.existsSync(fullPath)) {
      totalFiles++;
      console.log(`📄 Procesando: ${relativePath}`);

      const wasModified = replaceImportsInFile(fullPath);
      if (wasModified) {
        modifiedFiles++;
      } else {
        console.log(
          `   ℹ️  No se encontraron imports de Image para reemplazar`
        );
      }
    } else {
      console.log(`⚠️  Archivo no encontrado: ${relativePath}`);
    }

    console.log(""); // Línea en blanco
  });

  console.log("📊 Resumen:");
  console.log(`📁 Archivos procesados: ${totalFiles}`);
  console.log(`✏️  Archivos modificados: ${modifiedFiles}`);

  if (modifiedFiles > 0) {
    console.log("\n✅ Reemplazo completado exitosamente");
    console.log("💡 Beneficios de SmartImage:");
    console.log("- Manejo automático de errores de imágenes");
    console.log("- Fallback inteligente a placeholder");
    console.log("- Detección de URLs de Firebase Storage rotas");
    console.log("- Cache de URLs fallidas para mejor rendimiento");

    console.log("\n🔧 Siguientes pasos:");
    console.log("1. Verificar que la aplicación funciona correctamente");
    console.log("2. Probar que las imágenes rotas muestran placeholders");
    console.log("3. Reiniciar el servidor de desarrollo si es necesario");
  } else {
    console.log("\n✅ Todos los archivos ya están actualizados");
  }

  return { totalFiles, modifiedFiles };
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  replaceWithSmartImage();
}

module.exports = { replaceWithSmartImage };
