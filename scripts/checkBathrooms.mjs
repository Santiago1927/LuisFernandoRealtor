import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9QTJcGdVxCTMrTFlVkkdvbMgMNE8a_pk",
  authDomain: "luisfernandorealtor-ae9bb.firebaseapp.com",
  projectId: "luisfernandorealtor-ae9bb",
  storageBucket: "luisfernandorealtor-ae9bb.firebasestorage.app",
  messagingSenderId: "346282506085",
  appId: "1:346282506085:web:b61bb18d5dd38c2b7a7b94",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkBathrooms() {
  try {
    console.log("🔍 Verificando valores de baños...");

    const propertiesRef = collection(db, "properties");
    const querySnapshot = await getDocs(propertiesRef);

    console.log(`✅ ${querySnapshot.size} propiedades encontradas:\n`);

    let index = 0;
    querySnapshot.forEach((doc) => {
      index++;
      const property = doc.data();
      const bathrooms = property.bathrooms;

      console.log(`${index.toString().padStart(2, "0")}. ${property.title}`);
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
