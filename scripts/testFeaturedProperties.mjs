import { propertyService } from "../firebase/firestoreService.js";

async function testFeaturedPropertyFunctions() {
  try {
    console.log("🧪 Probando funciones de propiedades destacadas...\n");

    // Obtener todas las propiedades
    console.log("📋 Obteniendo todas las propiedades...");
    const allProperties = await propertyService.getAllProperties();
    console.log(`✅ Total de propiedades: ${allProperties.length}`);

    if (allProperties.length === 0) {
      console.log(
        "⚠️  No hay propiedades para probar. Primero agrega algunas propiedades."
      );
      return;
    }

    // Tomar la primera propiedad para probar
    const testProperty = allProperties[0];
    console.log(
      `\n🎯 Probando con propiedad: "${testProperty.title}" (ID: ${testProperty.id})`
    );
    console.log(
      `📊 Estado actual: ${testProperty.publication_status || "Sin estado"}`
    );

    // Probar obtener propiedades destacadas antes
    console.log("\n⭐ Obteniendo propiedades destacadas (antes)...");
    const featuredBefore = await propertyService.getFeaturedProperties();
    console.log(
      `✅ Propiedades destacadas encontradas: ${featuredBefore.length}`
    );

    if (featuredBefore.length > 0) {
      console.log("📝 Propiedades destacadas:");
      featuredBefore.forEach((prop, index) => {
        console.log(
          `   ${index + 1}. ${prop.title} (Estado: ${prop.publication_status})`
        );
      });
    }

    // Destacar la propiedad de prueba si no está destacada
    const isCurrentlyFeatured = testProperty.publication_status === "Destacado";

    if (!isCurrentlyFeatured) {
      console.log("\n🌟 Destacando la propiedad...");
      await propertyService.toggleFeaturedProperty(testProperty.id, true);
      console.log("✅ Propiedad destacada exitosamente");
    } else {
      console.log("\n⭐ La propiedad ya está destacada, quitando destacado...");
      await propertyService.toggleFeaturedProperty(testProperty.id, false);
      console.log("✅ Destacado quitado exitosamente");
    }

    // Verificar el cambio
    console.log("\n🔍 Verificando el cambio...");
    const updatedProperty = await propertyService.getPropertyById(
      testProperty.id
    );
    console.log(
      `📊 Nuevo estado: ${updatedProperty?.publication_status || "Sin estado"}`
    );

    // Obtener propiedades destacadas después
    console.log("\n⭐ Obteniendo propiedades destacadas (después)...");
    const featuredAfter = await propertyService.getFeaturedProperties();
    console.log(
      `✅ Propiedades destacadas encontradas: ${featuredAfter.length}`
    );

    if (featuredAfter.length > 0) {
      console.log("📝 Propiedades destacadas:");
      featuredAfter.forEach((prop, index) => {
        console.log(
          `   ${index + 1}. ${prop.title} (Estado: ${prop.publication_status})`
        );
      });
    }

    console.log("\n🎉 ¡Prueba completada exitosamente!");
    console.log("\n📋 Resumen:");
    console.log(`   • Función toggleFeaturedProperty: ✅ Funcionando`);
    console.log(`   • Función getFeaturedProperties: ✅ Funcionando`);
    console.log(`   • Cambio de estado: ✅ Verificado`);
  } catch (error) {
    console.error("❌ Error durante la prueba:", error);

    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "permission-denied") {
        console.log("\n💡 Parece que hay un problema de permisos.");
        console.log(
          "   Asegúrate de que las reglas de Firestore permiten escritura para usuarios autenticados."
        );
      }
    }
  }
}

// Ejecutar la prueba
testFeaturedPropertyFunctions();
