/**
 * Script para verificar propiedades directamente desde el servicio
 */

import { propertyService } from "../firebase/firestoreService.ts";

async function checkProperties() {
  try {
    console.log("🔍 Verificando propiedades...");

    const properties = await propertyService.getAllProperties();

    console.log(`✅ ${properties.length} propiedades encontradas:`);

    properties.forEach((property, index) => {
      console.log(
        `\n${(index + 1).toString().padStart(2, "0")}. ${property.title}`
      );
      console.log(
        `    🚿 Baños: ${
          property.bathrooms
        } (tipo: ${typeof property.bathrooms})`
      );

      if (property.bathrooms === 30) {
        console.log("    ⚠️  PROBLEMA DETECTADO: Valor 30 encontrado");
      } else if (property.bathrooms === 3) {
        console.log("    ✅ Valor correcto: 3");
      }
    });
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

checkProperties();
