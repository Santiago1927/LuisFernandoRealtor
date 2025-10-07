/**
 * Script para diagnosticar problemas de CSS chunks en Next.js
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 Diagnosticando problemas de CSS chunks...\n");

// Verificar directorio .next
const nextDir = path.join(process.cwd(), ".next");
console.log("📁 Verificando directorio .next...");
if (fs.existsSync(nextDir)) {
  console.log("✅ Directorio .next existe");

  // Verificar static
  const staticDir = path.join(nextDir, "static");
  if (fs.existsSync(staticDir)) {
    console.log("✅ Directorio static existe");

    // Buscar archivos CSS
    const findCSSFiles = (dir) => {
      const files = [];
      try {
        const items = fs.readdirSync(dir);
        items.forEach((item) => {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            files.push(...findCSSFiles(fullPath));
          } else if (item.endsWith(".css")) {
            files.push(fullPath);
          }
        });
      } catch (error) {
        console.log(`⚠️  Error leyendo directorio ${dir}:`, error.message);
      }
      return files;
    };

    const cssFiles = findCSSFiles(staticDir);
    console.log(`📄 Archivos CSS encontrados: ${cssFiles.length}`);
    cssFiles.forEach((file) => {
      const relativePath = path.relative(process.cwd(), file);
      const stats = fs.statSync(file);
      console.log(`   - ${relativePath} (${stats.size} bytes)`);
    });
  } else {
    console.log("❌ Directorio static no existe");
  }
} else {
  console.log("❌ Directorio .next no existe - ejecuta npm run dev primero");
}

// Verificar archivos de configuración
console.log("\n🔧 Verificando configuración...");

const configFiles = [
  "next.config.mjs",
  "tailwind.config.ts",
  "postcss.config.js",
  "tsconfig.json",
];

configFiles.forEach((file) => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} existe`);
  } else {
    console.log(`❌ ${file} no existe`);
  }
});

// Verificar estilos globales
console.log("\n🎨 Verificando archivos CSS...");
const cssToCheck = ["src/app/styles/globals.css"];

cssToCheck.forEach((file) => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`✅ ${file} existe (${stats.size} bytes)`);
  } else {
    console.log(`❌ ${file} no existe`);
  }
});

console.log("\n✨ Diagnóstico completado");
