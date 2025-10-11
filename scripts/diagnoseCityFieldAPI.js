const fetch = require("node-fetch");

async function diagnoseCityFieldViaAPI() {
  try {
    console.log('🔍 Iniciando diagnóstico del campo "city" vía API...\n');

    // Obtener todas las propiedades via API
    const response = await fetch(
      "http://localhost:3000/api/propiedades?page=1&pageSize=1000"
    );

    if (!response.ok) {
      throw new Error(`Error API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const properties = data.properties || [];

    console.log(`📊 Total de propiedades encontradas: ${properties.length}\n`);

    // Analizar el campo city
    const propertiesWithoutCity = [];
    const propertiesWithEmptyCity = [];
    const cityCounts = {};

    properties.forEach((property) => {
      const city = property.city;

      if (city === undefined || city === null) {
        propertiesWithoutCity.push({
          id: property.id,
          title: property.title || "Sin título",
          city: city,
        });
      } else if (typeof city === "string" && city.trim() === "") {
        propertiesWithEmptyCity.push({
          id: property.id,
          title: property.title || "Sin título",
          city: city,
        });
      } else {
        // Contar ciudades
        const cityName = String(city).trim();
        cityCounts[cityName] = (cityCounts[cityName] || 0) + 1;
      }
    });

    // Mostrar resultados
    console.log("🏙️  DISTRIBUCIÓN POR CIUDADES:");
    Object.entries(cityCounts)
      .sort(([, a], [, b]) => b - a)
      .forEach(([city, count]) => {
        console.log(`   ${city}: ${count} propiedades`);
      });

    console.log("\n❌ PROPIEDADES SIN CAMPO CITY (undefined/null):");
    if (propertiesWithoutCity.length === 0) {
      console.log("   ✅ Ninguna propiedad sin campo city");
    } else {
      propertiesWithoutCity.forEach((prop) => {
        console.log(
          `   - ID: ${prop.id} | Título: "${prop.title}" | City: ${prop.city}`
        );
      });
    }

    console.log("\n🔄 PROPIEDADES CON CITY VACÍO (string vacío):");
    if (propertiesWithEmptyCity.length === 0) {
      console.log("   ✅ Ninguna propiedad con city vacío");
    } else {
      propertiesWithEmptyCity.forEach((prop) => {
        console.log(
          `   - ID: ${prop.id} | Título: "${prop.title}" | City: "${prop.city}"`
        );
      });
    }

    console.log("\n📈 RESUMEN:");
    console.log(`   Total propiedades: ${properties.length}`);
    console.log(
      `   Con city válido: ${
        properties.length -
        propertiesWithoutCity.length -
        propertiesWithEmptyCity.length
      }`
    );
    console.log(
      `   Sin city (null/undefined): ${propertiesWithoutCity.length}`
    );
    console.log(`   Con city vacío: ${propertiesWithEmptyCity.length}`);
    console.log(`   Ciudades únicas: ${Object.keys(cityCounts).length}`);

    // Identificar problemas
    const totalProblematic =
      propertiesWithoutCity.length + propertiesWithEmptyCity.length;
    if (totalProblematic > 0) {
      console.log(
        `\n⚠️  PROBLEMA ENCONTRADO: ${totalProblematic} propiedades tienen problemas con el campo city`
      );
      console.log(
        "   Esto explicaría por qué el filtro por ciudad no funciona correctamente."
      );

      console.log("\n🛠️  PROPIEDADES QUE NECESITAN CORRECCIÓN:");
      [...propertiesWithoutCity, ...propertiesWithEmptyCity].forEach((prop) => {
        console.log(`   - ${prop.id}: "${prop.title}"`);
      });
    } else {
      console.log("\n✅ No se encontraron problemas con el campo city");
    }

    // Mostrar algunas propiedades de ejemplo para verificar la estructura
    if (properties.length > 0) {
      console.log("\n🔍 EJEMPLOS DE PROPIEDADES (primeras 3):");
      properties.slice(0, 3).forEach((prop, index) => {
        console.log(`   ${index + 1}. ID: ${prop.id}`);
        console.log(`      Título: "${prop.title || "Sin título"}"`);
        console.log(`      City: "${prop.city}" (tipo: ${typeof prop.city})`);
        console.log(`      Type: "${prop.type}"`);
        console.log(`      Price: ${prop.price}`);
        console.log("      ---");
      });
    }
  } catch (error) {
    console.error("❌ Error durante el diagnóstico:", error.message);

    if (error.message.includes("ECONNREFUSED")) {
      console.log(
        "\n💡 Asegúrate de que el servidor esté ejecutándose con: npm run dev"
      );
    }
  }
}

// Ejecutar el diagnóstico
diagnoseCityFieldViaAPI()
  .then(() => {
    console.log("\n🏁 Diagnóstico completado");
  })
  .catch((error) => {
    console.error("❌ Error fatal:", error);
  });
