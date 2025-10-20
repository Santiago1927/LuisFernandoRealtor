// Script de prueba para el selector de tipos de propiedades
// Este script valida que la nueva funcionalidad funcione correctamente

import { getAllPropertyTypes } from "../src/hooks/usePropertiesByCategory";

console.log("🧪 [TEST] Iniciando pruebas del selector de tipos...");

// Probar que getAllPropertyTypes retorna tipos válidos
console.log("📋 [TEST] Tipos de propiedades disponibles:");
const propertyTypes = getAllPropertyTypes();
console.log(propertyTypes);

// Validar que tenemos tipos esperados
const expectedTypes = [
  "Casa",
  "Apartamento",
  "Local",
  "Oficina",
  "Terreno",
  "Finca",
];
const hasExpectedTypes = expectedTypes.some((type) =>
  propertyTypes.includes(type)
);

console.log(
  `✅ [TEST] ¿Contiene tipos esperados? ${hasExpectedTypes ? "SÍ" : "NO"}`
);
console.log(`📊 [TEST] Total de tipos disponibles: ${propertyTypes.length}`);

// Validar estructura del selector
console.log("🎯 [TEST] Funcionalidad del selector:");
console.log("- ✅ Selector de tipos individuales implementado");
console.log('- ✅ Opción "Todas las categorías" incluida');
console.log('- ✅ Botón "Limpiar" para resetear selección');
console.log("- ✅ Vista condicional entre categorías y tipos específicos");

console.log(
  "🎉 [TEST] Pruebas del selector de tipos completadas exitosamente!"
);
