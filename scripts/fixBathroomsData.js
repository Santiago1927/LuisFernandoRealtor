/**
 * Script para corregir datos incorrectos de baños en Firestore
 * Busca propiedades con valores de baños > 20 y los corrige dividiendo por 10
 */

const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} = require("firebase/firestore");

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA3bE-FMGrxFw4VQXfwJZd35EcPu6rTlzg",
  authDomain: "inmobiliaria-pasto.firebaseapp.com",
  projectId: "inmobiliaria-pasto",
  storageBucket: "inmobiliaria-pasto.appspot.com",
  messagingSenderId: "1077064324329",
  appId: "1:1077064324329:web:7c4fdacc6b854ec57cfe0f",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fixBathroomsData() {
  try {
    console.log("🔍 Buscando propiedades con datos incorrectos de baños...");

    // Obtener todas las propiedades
    const propertiesRef = collection(db, "properties");
    const querySnapshot = await getDocs(propertiesRef);

    let propertiesWithIssues = [];
    let totalProperties = 0;

    querySnapshot.forEach((doc) => {
      totalProperties++;
      const data = doc.data();
      const bathrooms = data.bathrooms;

      console.log(`📋 Propiedad: ${data.title}`);
      console.log(`   Baños: ${bathrooms} (tipo: ${typeof bathrooms})`);

      // Si los baños son mayor a 20, probablemente es un error
      if (bathrooms && bathrooms > 20) {
        propertiesWithIssues.push({
          id: doc.id,
          title: data.title,
          currentBathrooms: bathrooms,
          suggestedBathrooms: Math.floor(bathrooms / 10),
        });
      }
    });

    console.log(`\n📊 Total de propiedades analizadas: ${totalProperties}`);
    console.log(
      `⚠️  Propiedades con posibles errores: ${propertiesWithIssues.length}`
    );

    if (propertiesWithIssues.length > 0) {
      console.log("\n🔧 PROPIEDADES QUE NECESITAN CORRECCIÓN:");
      console.log("=========================================");

      for (const property of propertiesWithIssues) {
        console.log(`\n🏠 ${property.title}`);
        console.log(`   ID: ${property.id}`);
        console.log(`   Baños actuales: ${property.currentBathrooms}`);
        console.log(`   Baños sugeridos: ${property.suggestedBathrooms}`);

        // Corregir automáticamente
        try {
          const propertyRef = doc(db, "properties", property.id);
          await updateDoc(propertyRef, {
            bathrooms: property.suggestedBathrooms,
          });
          console.log(
            `   ✅ CORREGIDO: ${property.currentBathrooms} → ${property.suggestedBathrooms}`
          );
        } catch (error) {
          console.log(`   ❌ ERROR al corregir: ${error.message}`);
        }
      }

      console.log(
        `\n🎉 Proceso completado. Se corrigieron ${propertiesWithIssues.length} propiedades.`
      );
    } else {
      console.log(
        "\n✅ No se encontraron propiedades con errores en los baños."
      );
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Ejecutar el script
fixBathroomsData();
