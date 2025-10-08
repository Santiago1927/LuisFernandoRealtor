const fs = require("fs");
const path = require("path");

// Definir el nuevo color
const newColor = "#ffc107";

// Mapeo de reemplazos
const colorReplacements = {
  // Amber colors
  "amber-50": "custom-50",
  "amber-100": "custom-100",
  "amber-200": "custom-200",
  "amber-300": "custom-300",
  "amber-400": "custom-400",
  "amber-500": "custom-500",
  "amber-600": "custom-600",
  "amber-700": "custom-700",
  "amber-800": "custom-800",
  "amber-900": "custom-900",

  // Yellow colors
  "yellow-50": "custom-50",
  "yellow-100": "custom-100",
  "yellow-200": "custom-200",
  "yellow-300": "custom-300",
  "yellow-400": "custom-400",
  "yellow-500": "custom-500",
  "yellow-600": "custom-600",
  "yellow-700": "custom-700",
  "yellow-800": "custom-800",
  "yellow-900": "custom-900",

  // Gradientes comunes
  "from-amber-600 to-yellow-600": `from-custom-600 to-custom-600`,
  "from-amber-700 to-yellow-700": `from-custom-700 to-custom-700`,
  "from-amber-500 to-yellow-600": `from-custom-500 to-custom-600`,
  "bg-gradient-to-r from-amber-600 to-yellow-600": `bg-gradient-to-r from-custom-600 to-custom-600`,
  "bg-gradient-to-br from-amber-500 to-yellow-600": `bg-gradient-to-br from-custom-500 to-custom-600`,

  // Casos especiales con opacidad
  "border-amber-500/20": `border-custom-500/20`,
  "border-amber-500/30": `border-custom-500/30`,
  "bg-amber-500/50": `bg-custom-500/50`,
  "hover:bg-amber-400/10": `hover:bg-custom-400/10`,
  "active:bg-amber-400/20": `active:bg-custom-400/20`,
  "hover:text-amber-400": `hover:text-custom-400`,
  "text-amber-600": `text-custom-600`,
  "text-amber-800": `text-custom-800`,
  "text-amber-400": `text-custom-400`,
  "text-amber-300": `text-custom-300`,
  "text-amber-700": `text-custom-700`,
  "fill-amber-500": `fill-custom-500`,
  "bg-amber-100": `bg-custom-100`,
  "bg-amber-600": `bg-custom-600`,
  "bg-amber-700": `bg-custom-700`,
  "border-amber-200": `border-custom-200`,
  "border-amber-800": `border-custom-800`,
  "focus:border-amber-500": `focus:border-custom-500`,
  "focus:border-amber-400": `focus:border-custom-400`,
  "hover:bg-amber-100": `hover:bg-custom-100`,
  "hover:text-amber-700": `hover:text-custom-700`,
  "hover:bg-amber-600": `hover:bg-custom-600`,
  "hover:bg-amber-700": `hover:bg-custom-700`,
  "bg-amber-900/30": `bg-custom-900/30`,
  "to-amber-50/30": `to-custom-50/30`,
  "to-amber-900/10": `to-custom-900/10`,
};

// Función para buscar archivos recursivamente
function findFiles(dir, extension, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Ignorar node_modules y .git
      if (!file.startsWith(".") && file !== "node_modules") {
        findFiles(filePath, extension, fileList);
      }
    } else if (filePath.endsWith(extension)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Función para reemplazar colores en un archivo
function replaceColorsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let hasChanges = false;

    // Aplicar todos los reemplazos
    for (const [oldColor, newColor] of Object.entries(colorReplacements)) {
      const regex = new RegExp(
        oldColor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "g"
      );
      if (content.includes(oldColor)) {
        content = content.replace(regex, newColor);
        hasChanges = true;
      }
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`✅ Updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Ejecutar el script
console.log("🔄 Iniciando reemplazo de colores...");

const projectRoot = path.join(__dirname, "..");
const extensions = [".tsx", ".jsx", ".ts", ".js"];

extensions.forEach((ext) => {
  const files = findFiles(path.join(projectRoot, "src"), ext);
  console.log(`\n📁 Procesando archivos ${ext}: ${files.length} encontrados`);

  files.forEach(replaceColorsInFile);
});

console.log("\n✨ ¡Reemplazo de colores completado!");
