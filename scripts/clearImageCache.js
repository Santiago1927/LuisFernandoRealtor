#!/usr/bin/env node

// Script para limpiar caché y regenerar imágenes optimizadas
// Ejecutar con: node scripts/clearImageCache.js

const fs = require("fs");
const path = require("path");

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
}

function clearImageCache() {
  console.log("🧹 Limpiando caché de imágenes de Next.js...\n");

  const projectRoot = process.cwd();
  const nextFolder = path.join(projectRoot, ".next");
  const cacheFolder = path.join(nextFolder, "cache");
  const imagesCacheFolder = path.join(cacheFolder, "images");

  let cleaned = false;

  // Limpiar caché de imágenes
  if (fs.existsSync(imagesCacheFolder)) {
    console.log("📁 Eliminando caché de imágenes...");
    deleteFolderRecursive(imagesCacheFolder);
    console.log("✅ Caché de imágenes eliminado");
    cleaned = true;
  }

  // Limpiar toda la carpeta .next/cache si existe
  if (fs.existsSync(cacheFolder)) {
    console.log("📁 Eliminando caché completo...");
    deleteFolderRecursive(cacheFolder);
    console.log("✅ Caché completo eliminado");
    cleaned = true;
  }

  // Eliminar archivos de build para forzar regeneración
  const staticFolder = path.join(nextFolder, "static");
  if (fs.existsSync(staticFolder)) {
    console.log("📁 Eliminando archivos estáticos...");
    deleteFolderRecursive(staticFolder);
    console.log("✅ Archivos estáticos eliminados");
    cleaned = true;
  }

  if (!cleaned) {
    console.log("ℹ️  No se encontró caché para limpiar");
  }

  console.log("\n🎯 Acciones recomendadas después de limpiar:");
  console.log("1. npm run dev (para desarrollo)");
  console.log("2. npm run build (para producción)");
  console.log("3. Verificar que las imágenes se cargan correctamente");

  console.log("\n💡 Si persisten los errores 400:");
  console.log("- Verificar las URLs de Firebase Storage");
  console.log("- Comprobar permisos de acceso a imágenes");
  console.log("- Revisar configuración de dominios en next.config.mjs");
}

if (require.main === module) {
  clearImageCache();
}

module.exports = { clearImageCache };
