// Script de debug simple para probar en la consola del navegador
// Copiar y pegar este código en la consola del navegador

async function testFeaturedProperties() {
  try {
    console.log("🧪 Iniciando prueba de propiedades destacadas...");

    // Obtener todas las propiedades primero para verificar el estado
    const response = await fetch("/api/propiedades");
    const allData = await response.json();

    console.log(`📊 Total de propiedades: ${allData.properties?.length || 0}`);

    if (allData.properties && allData.properties.length > 0) {
      console.log("📋 Estados de publication_status:");
      allData.properties.forEach((prop, index) => {
        console.log(
          `  ${index + 1}. ${prop.title}: "${
            prop.publication_status || "undefined"
          }"`
        );
      });

      // Buscar propiedades destacadas
      const featured = allData.properties.filter(
        (p) => p.publication_status === "Destacado"
      );
      console.log(
        `\n⭐ Propiedades destacadas encontradas: ${featured.length}`
      );

      if (featured.length > 0) {
        console.log("📝 Propiedades destacadas:");
        featured.forEach((prop, index) => {
          console.log(`  ${index + 1}. ${prop.title}`);
        });
      }

      return {
        total: allData.properties.length,
        featured: featured.length,
        properties: allData.properties,
      };
    } else {
      console.log("❌ No se encontraron propiedades");
      return { total: 0, featured: 0, properties: [] };
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Función para destacar una propiedad (necesita autenticación)
async function highlightProperty(propertyId) {
  try {
    console.log(`🌟 Intentando destacar propiedad: ${propertyId}`);

    // Esta función requiere estar autenticado en la aplicación
    // Se debe ejecutar desde la interfaz de usuario
    console.log(
      "⚠️ Esta función debe ejecutarse desde la interfaz de usuario autenticada"
    );
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

console.log("✅ Funciones de debug cargadas:");
console.log(
  "- testFeaturedProperties(): Verifica el estado de las propiedades"
);
console.log(
  "- highlightProperty(id): Destaca una propiedad (solo desde UI autenticada)"
);
console.log("\nEjecuta: testFeaturedProperties()");
