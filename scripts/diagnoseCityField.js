const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");

// Configuración de Firebase (usando las mismas credenciales del proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyBz_WOWNnBsYAWl_qg7a_R6Eo5FhJZdYIE",
  authDomain: "luisfernandorealtor-56c8c.firebaseapp.com",
  projectId: "luisfernandorealtor-56c8c",
  storageBucket: "luisfernandorealtor-56c8c.appspot.com",
  messagingSenderId: "473154113308",
  appId: "1:473154113308:web:26c93c53bb7a4b50f3e6c0",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function diagnoseCityField() {
  try {
    console.log(
      '🔍 Iniciando diagnóstico del campo "city" en propiedades...\n'
    );

    // Obtener todas las propiedades
    const propertiesRef = collection(db, "properties");
    const snapshot = await getDocs(propertiesRef);

    const properties = [];
    snapshot.forEach((doc) => {
      properties.push({ id: doc.id, ...doc.data() });
    });

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
  } catch (error) {
    console.error("❌ Error durante el diagnóstico:", error);
  }
}

// Ejecutar el diagnóstico
diagnoseCityField()
  .then(() => {
    console.log("\n🏁 Diagnóstico completado");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error fatal:", error);
    process.exit(1);
  });
