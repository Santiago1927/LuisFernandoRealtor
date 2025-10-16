import { propertyService } from "../firebase/firestoreService.js";

async function debugFeaturedProperties() {
  try {
    console.log("🔍 Debug de propiedades destacadas...\n");

    // Obtener todas las propiedades
    console.log("📋 Obteniendo todas las propiedades...");
    const allProperties = await propertyService.getAllProperties();
    console.log(`✅ Total de propiedades: ${allProperties.length}\n`);

    if (allProperties.length === 0) {
      console.log("⚠️  No hay propiedades en la base de datos.");
      return;
    }

    // Verificar el estado de publication_status de cada propiedad
    console.log("📊 Estado de publication_status de todas las propiedades:");
    allProperties.forEach((property, index) => {
      console.log(`   ${index + 1}. ${property.title}`);
      console.log(`      ID: ${property.id}`);
      console.log(
        `      publication_status: "${
          property.publication_status || "undefined"
        }"`
      );
      console.log(`      type: ${typeof property.publication_status}`);
      console.log("");
    });

    // Intentar obtener propiedades destacadas
    console.log("⭐ Obteniendo propiedades destacadas...");
    const featuredProperties = await propertyService.getFeaturedProperties();
    console.log(
      `✅ Propiedades destacadas encontradas: ${featuredProperties.length}\n`
    );

    if (featuredProperties.length > 0) {
      console.log("📝 Propiedades destacadas:");
      featuredProperties.forEach((prop, index) => {
        console.log(`   ${index + 1}. ${prop.title}`);
        console.log(`      publication_status: "${prop.publication_status}"`);
        console.log("");
      });
    } else {
      console.log("❌ No se encontraron propiedades destacadas");

      // Buscar propiedades que podrían estar destacadas con otros valores
      const possibleFeatured = allProperties.filter(
        (p) =>
          p.publication_status &&
          (p.publication_status.toLowerCase().includes("destacad") ||
            p.publication_status.toLowerCase().includes("featured"))
      );

      if (possibleFeatured.length > 0) {
        console.log("\n🔍 Propiedades con publication_status similar:");
        possibleFeatured.forEach((prop, index) => {
          console.log(
            `   ${index + 1}. ${prop.title}: "${prop.publication_status}"`
          );
        });
      }
    }

    // Verificar si hay propiedades con status "Activo"
    const activeProperties = allProperties.filter(
      (p) => p.publication_status === "Activo"
    );
    console.log(
      `\n📈 Propiedades con status "Activo": ${activeProperties.length}`
    );

    // Verificar si hay propiedades sin publication_status
    const withoutStatus = allProperties.filter((p) => !p.publication_status);
    console.log(
      `📊 Propiedades sin publication_status: ${withoutStatus.length}`
    );
  } catch (error) {
    console.error("❌ Error durante el debug:", error);
  }
}

// Ejecutar el debug
debugFeaturedProperties();
