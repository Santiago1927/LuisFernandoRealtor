/**
 * Script para probar la funcionalidad de categorización de propiedades
 */

import { propertyService } from "../firebase/firestoreService";
import { PROPERTY_CATEGORIES } from "../src/hooks/usePropertiesByCategory";

async function testPropertyCategorization() {
  console.log("🧪 Probando categorización de propiedades...\n");

  try {
    // Obtener todas las propiedades
    const allProperties = await propertyService.getAllProperties();
    console.log(
      `📊 Total de propiedades encontradas: ${allProperties.length}\n`
    );

    // Contar propiedades por tipo
    const typeCount: { [key: string]: number } = {};
    allProperties.forEach((property) => {
      typeCount[property.type] = (typeCount[property.type] || 0) + 1;
    });

    console.log("📋 Propiedades por tipo:");
    console.log("─".repeat(50));
    Object.entries(typeCount).forEach(([type, count]) => {
      console.log(`  🏷️  ${type}: ${count} propiedad(es)`);
    });
    console.log("");

    // Probar categorización
    console.log("🗂️  Categorización por grupos:");
    console.log("═".repeat(50));

    Object.entries(PROPERTY_CATEGORIES).forEach(([categoryName, types]) => {
      const categoryProperties = allProperties.filter((property) =>
        types.includes(property.type)
      );

      console.log(`\n📁 ${categoryName.toUpperCase()}`);
      console.log(`   Tipos incluidos: ${types.join(", ")}`);
      console.log(`   Total propiedades: ${categoryProperties.length}`);

      if (categoryProperties.length > 0) {
        console.log("   Ejemplos:");
        categoryProperties.slice(0, 3).forEach((property, index) => {
          console.log(
            `     ${index + 1}. ${property.title} (${property.type})`
          );
        });
      }
    });

    // Verificar propiedades sin categoría
    const allCategoryTypes = Object.values(PROPERTY_CATEGORIES).flat();
    const uncategorizedProperties = allProperties.filter(
      (property) => !allCategoryTypes.includes(property.type)
    );

    if (uncategorizedProperties.length > 0) {
      console.log("\n⚠️  PROPIEDADES SIN CATEGORÍA:");
      console.log("─".repeat(30));
      uncategorizedProperties.forEach((property) => {
        console.log(`  ❔ ${property.title} (${property.type})`);
      });
    } else {
      console.log(
        "\n✅ Todas las propiedades están categorizadas correctamente"
      );
    }
  } catch (error) {
    console.error("❌ Error al probar categorización:", error);
  }
}

if (require.main === module) {
  testPropertyCategorization();
}
