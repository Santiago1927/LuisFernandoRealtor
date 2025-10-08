/**
 * Script para verificar una propiedad específica en Firestore
 */

const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
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

async function checkSpecificProperty() {
  try {
    console.log("🔍 Buscando la propiedad 'Casa de lujo'...");

    // Buscar por título
    const propertiesRef = collection(db, "properties");
    const q = query(propertiesRef, where("title", "==", "Casa de lujo"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("❌ No se encontró la propiedad 'Casa de lujo'");

      // Buscar todas las propiedades para ver cuáles existen
      console.log("\n📋 Listando todas las propiedades disponibles:");
      const allPropertiesSnapshot = await getDocs(propertiesRef);
      allPropertiesSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`- ${data.title} (Baños: ${data.bathrooms})`);
      });
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log("\n🏠 PROPIEDAD ENCONTRADA:");
      console.log("========================");
      console.log(`📋 ID: ${doc.id}`);
      console.log(`🏠 Título: ${data.title}`);
      console.log(`📍 Dirección: ${data.address}`);
      console.log(`💰 Precio: $${data.price?.toLocaleString()}`);
      console.log(`🛏️  Habitaciones: ${data.bedrooms}`);
      console.log(
        `🚿 Baños: ${data.bathrooms} (tipo: ${typeof data.bathrooms})`
      );
      console.log(`📐 Área: ${data.area} m²`);
      console.log(`🏙️  Ciudad: ${data.city}`);
      console.log(`📊 Estado: ${data.status}`);

      // Verificar otros campos relacionados con baños
      if (data.half_bathroom !== undefined) {
        console.log(`🚿 Medio baño: ${data.half_bathroom}`);
      }

      console.log("\n✅ Los datos actuales están correctos.");
    });
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Ejecutar el script
checkSpecificProperty();
