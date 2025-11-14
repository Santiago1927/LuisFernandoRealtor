/**
 * Script para actualizar el campo business_type en todas las propiedades
 * Cambia "Vender" por "Venta" y "Permutar" por "Permuta"
 *
 * Uso: npx tsx scripts/updateBusinessType.mjs
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

// Configuración de Firebase (usando las variables de entorno)
const firebaseConfig = {
  apiKey: "AIzaSyA0TbaZphhlB2bYWqoSFUVvbbiUnDt7jjk",
  authDomain: "inmapp-842fa.firebaseapp.com",
  projectId: "inmapp-842fa",
  storageBucket: "inmapp-842fa.firebasestorage.app",
  messagingSenderId: "47451790122",
  appId: "1:47451790122:web:ee44b4680617202a12dc53",
  measurementId: "G-2NVB1GTJ99",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateBusinessTypes() {
  try {
    console.log("🔍 Buscando propiedades para actualizar...\n");

    const propertiesRef = collection(db, "properties");
    const snapshot = await getDocs(propertiesRef);

    if (snapshot.empty) {
      console.log("⚠️ No se encontraron propiedades en la base de datos");
      return;
    }

    console.log(`📊 Total de propiedades encontradas: ${snapshot.size}\n`);

    let updatedCount = 0;
    const updates = [];

    snapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      const currentBusinessType = data.business_type;

      let newBusinessType = currentBusinessType;
      let needsUpdate = false;

      // Mapear los valores antiguos a los nuevos
      if (currentBusinessType === "Vender") {
        newBusinessType = "Venta";
        needsUpdate = true;
      } else if (currentBusinessType === "Permutar") {
        newBusinessType = "Permuta";
        needsUpdate = true;
      }

      if (needsUpdate) {
        updates.push({
          id: docSnapshot.id,
          title: data.title || docSnapshot.id,
          oldValue: currentBusinessType,
          newValue: newBusinessType,
          ref: doc(db, "properties", docSnapshot.id),
        });
        updatedCount++;
      }
    });

    if (updatedCount === 0) {
      console.log("\n✅ No hay propiedades que necesiten actualización");
      return;
    }

    console.log(`📝 Propiedades a actualizar:\n`);
    updates.forEach((update, index) => {
      console.log(
        `${index + 1}. ${update.title}: "${update.oldValue}" → "${
          update.newValue
        }"`
      );
    });

    console.log(`\n🔄 Aplicando cambios a ${updatedCount} propiedades...`);

    // Actualizar en lotes de 500 (límite de Firestore)
    const batchSize = 500;
    for (let i = 0; i < updates.length; i += batchSize) {
      const batch = writeBatch(db);
      const batchUpdates = updates.slice(i, i + batchSize);

      batchUpdates.forEach((update) => {
        batch.update(update.ref, { business_type: update.newValue });
      });

      await batch.commit();
      console.log(
        `✅ Lote ${Math.floor(i / batchSize) + 1} completado (${
          batchUpdates.length
        } propiedades)`
      );
    }

    console.log(`\n✅ ¡Actualización completada exitosamente!`);
    console.log(`   Total de propiedades actualizadas: ${updatedCount}`);
  } catch (error) {
    console.error("\n❌ Error durante la actualización:", error);
    throw error;
  }
}

// Ejecutar el script
updateBusinessTypes()
  .then(() => {
    console.log("\n🎉 Script finalizado correctamente");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Error fatal:", error);
    process.exit(1);
  });
