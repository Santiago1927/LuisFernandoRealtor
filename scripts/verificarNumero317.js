// Script para verificar que el número 317 777 2601 esté en todos los archivos correctos
console.log("🔍 Verificando presencia del número 317 777 2601...\n");

const fs = require("fs");
const path = require("path");

const filesToCheck = [
  {
    file: "src/components/layout/Header.tsx",
    description: "Header Principal",
    expectedTexts: ["317 777 2601"],
  },
  {
    file: "src/components/layout/MobileHeader.tsx",
    description: "Header Mobile + Sidebar Móvil",
    expectedTexts: ["317 777 2601", "tel:+573177772601"],
  },
  {
    file: "src/components/layout/Footer.tsx",
    description: "Footer",
    expectedTexts: ["+57 317 777 2601", "tel:+573177772601"],
  },
  {
    file: "src/app/contacto/page.tsx",
    description: "Página de Contacto",
    expectedTexts: ["317 777 2601", "tel:+573177772601"],
  },
  {
    file: "src/app/propiedades/[id]/page.tsx",
    description: "Página de Propiedades",
    expectedTexts: ["+57 317 777 2601"],
  },
];

let allChecksPass = true;

filesToCheck.forEach(({ file, description, expectedTexts }) => {
  const filePath = path.join(process.cwd(), file);

  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${description}: Archivo no encontrado - ${file}`);
    allChecksPass = false;
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");
  let fileChecks = [];

  expectedTexts.forEach((text) => {
    if (content.includes(text)) {
      fileChecks.push(`✅ "${text}"`);
    } else {
      fileChecks.push(`❌ "${text}" NO ENCONTRADO`);
      allChecksPass = false;
    }
  });

  console.log(`📁 ${description}:`);
  fileChecks.forEach((check) => console.log(`   ${check}`));
  console.log();
});

if (allChecksPass) {
  console.log(
    "🎉 ¡VERIFICACIÓN EXITOSA! El número 317 777 2601 está presente en todas las ubicaciones requeridas."
  );
} else {
  console.log(
    "⚠️  VERIFICACIÓN FALLIDA: Algunos archivos no contienen el número esperado."
  );
}

console.log("\n📊 Resumen de ubicaciones:");
console.log("   • Header Principal: Solo visual");
console.log("   • Header Mobile: Solo visual");
console.log("   • Sidebar Móvil: Con enlace tel: funcional");
console.log("   • Footer: Con enlace tel: funcional");
console.log("   • Página Contacto: Con enlace tel: funcional");
console.log("   • Página Propiedades: Como información del agente");
