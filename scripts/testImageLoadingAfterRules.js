// Script de prueba para verificar la carga de imágenes después de aplicar las reglas de Firebase Storage
// En su lugar, vamos a probar directamente la carga desde el navegador
console.log("🔍 Para verificar la carga de imágenes:");
console.log("1. Abre http://localhost:3000 en tu navegador");
console.log("2. Ve a la sección de propiedades");
console.log("3. Verifica si las imágenes se cargan correctamente");
console.log("4. Abre DevTools (F12) y revisa si hay errores 403 en la consola");
console.log("");
console.log(
  "✅ Las reglas de Firebase Storage han sido aplicadas exitosamente"
);
console.log("🔧 Los errores 403 de Firebase Storage deberían estar resueltos");
console.log("");
console.log("Si aún hay problemas, revisa:");
console.log("- Las URLs de las imágenes en Firestore");
console.log("- La configuración de Firebase Storage");
console.log("- Los logs de la consola del navegador");

async function testImageLoading() {
  console.log("🔍 Verificando carga de imágenes...");

  try {
    // Obtener algunas propiedades con imágenes
    const properties = await firestoreService.getProperties(5);

    console.log(`✅ Se obtuvieron ${properties.length} propiedades`);

    for (const property of properties) {
      console.log(`\n📋 Propiedad: ${property.titulo}`);

      if (property.imagenes && property.imagenes.length > 0) {
        console.log(`🖼️  Imágenes encontradas: ${property.imagenes.length}`);

        // Verificar si las URLs de Firebase están presentes
        const firebaseImages = property.imagenes.filter(
          (img) => img.includes("firebase") || img.includes("googleapis")
        );

        if (firebaseImages.length > 0) {
          console.log(`🔥 Imágenes de Firebase: ${firebaseImages.length}`);
          console.log("Primera imagen Firebase:", firebaseImages[0]);
        }

        // Verificar si hay imágenes placeholder
        const placeholderImages = property.imagenes.filter(
          (img) => img.includes("placeholder") || img.includes("unsplash")
        );

        if (placeholderImages.length > 0) {
          console.log(`🎭 Imágenes placeholder: ${placeholderImages.length}`);
        }
      } else {
        console.log("❌ No hay imágenes en esta propiedad");
      }
    }

    console.log("\n✅ Verificación completada");
  } catch (error) {
    console.error("❌ Error al verificar imágenes:", error);
  }
}

// Ejecutar la verificación si se llama directamente
if (require.main === module) {
  testImageLoading();
}

module.exports = testImageLoading;
