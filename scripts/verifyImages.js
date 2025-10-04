// Script para verificar todas las imágenes del proyecto
// Ejecutar con: node scripts/verifyImages.js

const fs = require("fs");
const path = require("path");

// Función para verificar si un archivo existe
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

// Función para obtener todas las referencias de imágenes en el código
function findImageReferences(directory) {
  const imageRefs = new Set();

  function searchInFile(filePath) {
    if (
      !filePath.endsWith(".tsx") &&
      !filePath.endsWith(".ts") &&
      !filePath.endsWith(".js")
    ) {
      return;
    }

    try {
      const content = fs.readFileSync(filePath, "utf8");

      // Buscar referencias a imágenes locales
      const localImageRegex = /['"](\/images\/[^'"]*)['"]/g;
      let match;
      while ((match = localImageRegex.exec(content)) !== null) {
        imageRefs.add(match[1]);
      }

      // Buscar src en componentes Image
      const srcRegex =
        /src\s*=\s*['"](\/[^'"]*\.(jpg|jpeg|png|webp|gif|svg))['"]/gi;
      while ((match = srcRegex.exec(content)) !== null) {
        imageRefs.add(match[1]);
      }
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error.message);
    }
  }

  function walkDirectory(dir) {
    try {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (
          stat.isDirectory() &&
          !filePath.includes("node_modules") &&
          !filePath.includes(".next")
        ) {
          walkDirectory(filePath);
        } else if (stat.isFile()) {
          searchInFile(filePath);
        }
      }
    } catch (error) {
      console.error(`Error walking directory ${dir}:`, error.message);
    }
  }

  walkDirectory(directory);
  return Array.from(imageRefs);
}

// Función principal
function verifyImages() {
  console.log("🔍 Verificando imágenes del proyecto...\n");

  const projectRoot = path.resolve(__dirname, "..");
  const publicDir = path.join(projectRoot, "public");

  // Encontrar todas las referencias de imágenes
  const imageRefs = findImageReferences(path.join(projectRoot, "src"));

  console.log(`📋 Referencias de imágenes encontradas: ${imageRefs.length}\n`);

  let missingImages = [];
  let existingImages = [];

  // Verificar cada referencia
  imageRefs.forEach((ref) => {
    const fullPath = path.join(publicDir, ref.replace(/^\//, ""));

    if (fileExists(fullPath)) {
      existingImages.push(ref);
      console.log(`✅ ${ref}`);
    } else {
      missingImages.push(ref);
      console.log(`❌ ${ref} -> ${fullPath}`);
    }
  });

  console.log("\n📊 Resumen:");
  console.log(`✅ Imágenes existentes: ${existingImages.length}`);
  console.log(`❌ Imágenes faltantes: ${missingImages.length}`);

  if (missingImages.length > 0) {
    console.log("\n🚨 Imágenes faltantes:");
    missingImages.forEach((img) => console.log(`   - ${img}`));

    console.log("\n💡 Soluciones:");
    console.log("1. Crear las imágenes faltantes");
    console.log("2. Actualizar las referencias en el código");
    console.log("3. Usar el placeholder: /placeholder-property.svg");
  }

  // Verificar archivos en el directorio de imágenes
  console.log("\n📁 Archivos en /public/images/:");
  try {
    function listFiles(dir, prefix = "") {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          console.log(`📁 ${prefix}${file}/`);
          listFiles(filePath, `${prefix}  `);
        } else {
          console.log(`📄 ${prefix}${file}`);
        }
      });
    }

    const imagesDir = path.join(publicDir, "images");
    if (fileExists(imagesDir)) {
      listFiles(imagesDir);
    } else {
      console.log("❌ Directorio /public/images/ no existe");
    }
  } catch (error) {
    console.error("Error listando archivos:", error.message);
  }

  return {
    total: imageRefs.length,
    existing: existingImages.length,
    missing: missingImages.length,
    missingImages,
  };
}

// Ejecutar verificación
if (require.main === module) {
  const result = verifyImages();
  process.exit(result.missing > 0 ? 1 : 0);
}

module.exports = { verifyImages };
