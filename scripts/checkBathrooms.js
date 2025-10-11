const { propertyService } = require("../firebase/firestoreService");

async function checkBathrooms() {
  try {
    console.log("🔍 Verificando valores de baños...");

    const properties = await propertyService.getAllProperties();

    console.log(`✅ ${properties.length} propiedades encontradas:\n`);

    properties.forEach((property, index) => {
      const bathrooms = property.bathrooms;
      console.log(
        `${(index + 1).toString().padStart(2, "0")}. ${property.title}`
      );
      console.log(`    🚿 Baños: ${bathrooms} (tipo: ${typeof bathrooms})`);

      if (bathrooms > 10) {
        console.log(`    ⚠️  PROBLEMA: Valor ${bathrooms} es demasiado alto`);
        const corrected = Math.floor(bathrooms / 10);
        console.log(`    ✅ Debería ser: ${corrected}`);
      }
      console.log("");
    });
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

checkBathrooms();
