import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Configuración de Firebase (asegúrate de que coincida con tu configuración)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkPropertyStatus() {
  try {
    console.log("🔍 Verificando estado de propiedades...");

    const querySnapshot = await getDocs(collection(db, "properties"));

    console.log(`📊 Total de propiedades: ${querySnapshot.size}`);

    let destacadas = 0;
    let disponibles = 0;
    let sinStatus = 0;

    querySnapshot.docs.forEach((doc) => {
      const data = doc.data();
      const status = data.publication_status;

      console.log(
        `📝 Propiedad: ${data.title || "Sin título"} - Status: ${
          status || "undefined"
        }`
      );

      if (status === "Destacado") {
        destacadas++;
      } else if (status === "Disponible" || status === "Activo") {
        disponibles++;
      } else {
        sinStatus++;
        console.log(
          `⚠️  Propiedad sin publication_status: ${data.title} (ID: ${doc.id})`
        );
      }
    });

    console.log("\n📈 RESUMEN:");
    console.log(`✨ Propiedades destacadas: ${destacadas}`);
    console.log(`✅ Propiedades disponibles: ${disponibles}`);
    console.log(`❓ Propiedades sin status: ${sinStatus}`);

    if (sinStatus > 0) {
      console.log("\n🔧 ACCIÓN REQUERIDA:");
      console.log("Algunas propiedades no tienen publication_status definido.");
      console.log("Esto puede causar que aparezcan como destacadas por error.");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

checkPropertyStatus();
