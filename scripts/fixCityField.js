// Script para verificar y corregir el campo city en las propiedades
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
  apiKey: "AIzaSyC19a6opw3YvnVA9EgV0PoXNbVFLYnGYI8",
  authDomain: "luis-fernando-realtor.firebaseapp.com",
  projectId: "luis-fernando-realtor",
  storageBucket: "luis-fernando-realtor.appspot.com",
  messagingSenderId: "966021689348",
  appId: "1:966021689348:web:69e3db3b1c3feaa77b7ee6",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkAndFixCityField() {
  try {
    console.log("🔍 Verificando y corrigiendo campo city en propiedades...\n");

    const propertiesRef = collection(db, "properties");
    const snapshot = await getDocs(propertiesRef);

    if (snapshot.empty) {
      console.log("❌ No se encontraron propiedades");
      return;
    }

    console.log(`📊 Total de propiedades encontradas: ${snapshot.size}\n`);

    let propertiesFixed = 0;

    for (const docSnapshot of snapshot.docs) {
      const data = docSnapshot.data();
      const propertyId = docSnapshot.id;

      console.log(`🔍 Verificando: ${data.title || "Sin título"}`);

      // Verificar si no tiene city o está vacío
      if (!data.city || data.city.trim() === "") {
        console.log(`   ⚠️  Campo city faltante o vacío: "${data.city}"`);

        try {
          // Actualizar con "Pasto" por defecto
          await updateDoc(doc(db, "properties", propertyId), {
            city: "Pasto",
          });

          console.log(`   ✅ Actualizado con city: "Pasto"`);
          propertiesFixed++;
        } catch (updateError) {
          console.log(`   ❌ Error actualizando: ${updateError.message}`);
        }
      } else {
        console.log(`   ✅ Ciudad correcta: ${data.city}`);
      }
    }

    console.log(`\n📈 RESUMEN:`);
    console.log(`✅ Propiedades corregidas: ${propertiesFixed}`);
    console.log(`📊 Total procesadas: ${snapshot.size}`);

    if (propertiesFixed > 0) {
      console.log("\n🎉 Se han corregido las propiedades sin ciudad.");
      console.log(
        "💡 Ahora el filtro por ciudad debería funcionar correctamente."
      );
    } else {
      console.log(
        "\n✅ Todas las propiedades ya tenían ciudad correctamente configurada."
      );
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

checkAndFixCityField();
