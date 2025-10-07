import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

async function findLuxuryHouse() {
  try {
    console.log("🔍 Buscando la casa de lujo...");

    const propertiesRef = collection(db, "properties");
    const snapshot = await getDocs(propertiesRef);

    const properties = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      properties.push({
        id: doc.id,
        title: data.title,
        bathrooms: data.bathrooms,
        type: data.type,
        price: data.price,
      });
    });

    console.log("📋 Propiedades encontradas:");
    properties.forEach((prop) => {
      console.log(`ID: ${prop.id}`);
      console.log(`Título: ${prop.title}`);
      console.log(`Baños: ${prop.bathrooms} (tipo: ${typeof prop.bathrooms})`);
      console.log(`Precio: ${prop.price}`);
      console.log("---");
    });

    // Buscar específicamente "Casa de lujo"
    const luxuryHouse = properties.find(
      (p) => p.title && p.title.toLowerCase().includes("casa de lujo")
    );

    if (luxuryHouse) {
      console.log("🏠 CASA DE LUJO ENCONTRADA:");
      console.log(`ID: ${luxuryHouse.id}`);
      console.log(
        `Baños: ${luxuryHouse.bathrooms} (${typeof luxuryHouse.bathrooms})`
      );
      console.log(`URL: http://localhost:3000/propiedades/${luxuryHouse.id}`);
    } else {
      console.log("❌ No se encontró la casa de lujo");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

findLuxuryHouse();
