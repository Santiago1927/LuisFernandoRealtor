/**
 * Script de migración para agregar publication_status a propiedades existentes
 * Ejecutar este script una sola vez para migrar los datos existentes
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

// Configuración de Firebase (usar las mismas credenciales del proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyAcbOq5X9FABHn8cHILhD-v5qyL5Mc0zT8",
  authDomain: "inmapp-842fa.firebaseapp.com",
  projectId: "inmapp-842fa",
  storageBucket: "inmapp-842fa.appspot.com",
  messagingSenderId: "710785890016",
  appId: "1:710785890016:web:e1234567890abcdef",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migratePropertiesPublicationStatus() {
  try {
    console.log("🔄 Iniciando migración de publication_status...\n");

    // Obtener todas las propiedades
    const propertiesRef = collection(db, "properties");
    const querySnapshot = await getDocs(propertiesRef);

    console.log(`📊 Total de propiedades encontradas: ${querySnapshot.size}`);

    if (querySnapshot.size === 0) {
      console.log("⚠️  No hay propiedades para migrar.");
      return;
    }

    let migratedCount = 0;
    let alreadyHadStatus = 0;

    // Procesar cada propiedad
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();
      const docId = docSnapshot.id;

      console.log(
        `\n📝 Procesando: ${data.title || "Sin título"} (ID: ${docId})`
      );
      console.log(
        `   publication_status actual: "${
          data.publication_status || "undefined"
        }"`
      );

      // Si ya tiene publication_status, saltar
      if (data.publication_status) {
        console.log("   ✅ Ya tiene publication_status, saltando...");
        alreadyHadStatus++;
        continue;
      }

      // Actualizar con publication_status = "Activo"
      try {
        await updateDoc(doc(db, "properties", docId), {
          publication_status: "Activo",
          updatedAt: Timestamp.now(),
        });

        console.log('   ✅ Actualizada con publication_status: "Activo"');
        migratedCount++;
      } catch (updateError) {
        console.error(`   ❌ Error actualizando ${docId}:`, updateError);
      }
    }

    console.log("\n🎉 ¡Migración completada!");
    console.log(`📊 Resumen:`);
    console.log(`   • Total procesadas: ${querySnapshot.size}`);
    console.log(`   • Migradas exitosamente: ${migratedCount}`);
    console.log(`   • Ya tenían status: ${alreadyHadStatus}`);

    if (migratedCount > 0) {
      console.log(
        "\n💡 Ahora puedes destacar propiedades desde la interfaz de usuario."
      );
      console.log(
        '   Las propiedades migradas tienen publication_status = "Activo"'
      );
      console.log(
        '   Puedes cambiarlas a "Destacado" usando el botón en la página de detalle.'
      );
    }
  } catch (error) {
    console.error("❌ Error durante la migración:", error);
  }
}

// Ejecutar la migración
migratePropertiesPublicationStatus();
