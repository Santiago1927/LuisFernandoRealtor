import { propertyService } from "../../firebase/firestoreService";

/**
 * Script para corregir propiedades existentes sin ciudad
 * Se ejecuta mediante: npm run fix-cities
 */
async function fixMissingCities() {
  try {
    console.log("🔧 Iniciando corrección de ciudades faltantes...");

    // Obtener todas las propiedades
    const properties = await propertyService.getAllProperties();
    console.log(`📊 Total de propiedades encontradas: ${properties.length}`);

    // Filtrar propiedades sin ciudad o con ciudad vacía
    const propertiesWithoutCity = properties.filter(
      (prop) => !prop.city || prop.city.trim() === ""
    );

    console.log(`❌ Propiedades sin ciudad: ${propertiesWithoutCity.length}`);

    if (propertiesWithoutCity.length === 0) {
      console.log("✅ Todas las propiedades ya tienen ciudad asignada");
      return;
    }

    // Actualizar cada propiedad sin ciudad
    let corrected = 0;
    for (const property of propertiesWithoutCity) {
      try {
        console.log(
          `🔄 Corrigiendo propiedad: ${property.id} - "${property.title}"`
        );

        await propertyService.updateProperty(property.id, {
          city: "Pasto", // Asignar ciudad por defecto
        });

        corrected++;
        console.log(`✅ Corregida: ${property.id}`);
      } catch (error) {
        console.error(`❌ Error corrigiendo ${property.id}:`, error);
      }
    }

    console.log(`\n🎉 Proceso completado:`);
    console.log(`   Propiedades corregidas: ${corrected}`);
    console.log(
      `   Propiedades con errores: ${propertiesWithoutCity.length - corrected}`
    );
  } catch (error) {
    console.error("❌ Error en el proceso de corrección:", error);
  }
}

// Ejecutar solo si se llama directamente
if (require.main === module) {
  fixMissingCities()
    .then(() => {
      console.log("🏁 Script finalizado");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Error fatal:", error);
      process.exit(1);
    });
}

export { fixMissingCities };
