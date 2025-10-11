// Script para verificar el campo city en las propiedades
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Configuración de Firebase (usar las mismas credenciales del proyecto)
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

async function checkCityField() {
  try {
    console.log("🔍 Verificando campo city en propiedades...\n");

    const propertiesRef = collection(db, "properties");
    const snapshot = await getDocs(propertiesRef);

    if (snapshot.empty) {
      console.log("❌ No se encontraron propiedades");
      return;
    }

    console.log(`📊 Total de propiedades encontradas: ${snapshot.size}\n`);

    let propertiesWithCity = 0;
    let propertiesWithoutCity = 0;
    let propertiesWithEmptyCity = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      const propertyInfo = {
        id: doc.id,
        title: data.title || "Sin título",
        city: data.city,
        address: data.address || "Sin dirección",
      };

      if (data.city) {
        if (data.city.trim() === "") {
          propertiesWithEmptyCity++;
          console.log(
            `🔸 ${propertyInfo.title} - Ciudad VACÍA: "${data.city}"`
          );
        } else {
          propertiesWithCity++;
          console.log(`✅ ${propertyInfo.title} - Ciudad: ${data.city}`);
        }
      } else {
        propertiesWithoutCity++;
        console.log(`❌ ${propertyInfo.title} - SIN CAMPO CITY`);
      }
    });

    console.log("\n📈 RESUMEN:");
    console.log(`✅ Propiedades con ciudad: ${propertiesWithCity}`);
    console.log(`🔸 Propiedades con ciudad vacía: ${propertiesWithEmptyCity}`);
    console.log(`❌ Propiedades sin campo city: ${propertiesWithoutCity}`);

    if (propertiesWithoutCity > 0 || propertiesWithEmptyCity > 0) {
      console.log(
        "\n⚠️  PROBLEMA DETECTADO: Hay propiedades sin ciudad o con ciudad vacía."
      );
      console.log(
        "💡 Esto explica por qué el filtro por ciudad no funciona correctamente."
      );
    } else {
      console.log(
        "\n✅ Todas las propiedades tienen campo city correctamente configurado."
      );
    }
  } catch (error) {
    console.error("❌ Error verificando propiedades:", error);
  } finally {
    process.exit(0);
  }
}

checkCityField();
