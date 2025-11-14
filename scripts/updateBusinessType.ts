/**
 * Script para actualizar el campo business_type en todas las propiedades
 * Cambia "Vender" por "Venta" y "Permutar" por "Permuta"
 */

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as path from "path";
import * as fs from "fs";

// Inicializar Firebase Admin si no está inicializado
if (getApps().length === 0) {
  const serviceAccountPath = path.join(
    process.cwd(),
    "inmapp-842fa-firebase-adminsdk-kgxtv-de8d4c3f3c.json"
  );

  if (!fs.existsSync(serviceAccountPath)) {
    console.error(
      "❌ Error: No se encontró el archivo de credenciales de Firebase Admin"
    );
    console.error(`Buscando en: ${serviceAccountPath}`);
    process.exit(1);
  }

  const serviceAccount = require(serviceAccountPath);

  initializeApp({
    credential: cert(serviceAccount),
  });

  console.log("✅ Firebase Admin inicializado correctamente");
}

const db = getFirestore();

async function updateBusinessTypes() {
  try {
    console.log("🔍 Buscando propiedades para actualizar...\n");

    const propertiesRef = db.collection("properties");
    const snapshot = await propertiesRef.get();

    if (snapshot.empty) {
      console.log("⚠️ No se encontraron propiedades en la base de datos");
      return;
    }

    console.log(`📊 Total de propiedades encontradas: ${snapshot.size}\n`);

    let updatedCount = 0;
    const batch = db.batch();

    for (const doc of snapshot.docs) {
      const data = doc.data();
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
        batch.update(doc.ref, { business_type: newBusinessType });
        console.log(`✏️  Actualizando propiedad: ${data.title || doc.id}`);
        console.log(
          `   Antes: "${currentBusinessType}" → Después: "${newBusinessType}"`
        );
        updatedCount++;
      }
    }

    if (updatedCount === 0) {
      console.log("\n✅ No hay propiedades que necesiten actualización");
      return;
    }

    console.log(`\n📝 Aplicando cambios a ${updatedCount} propiedades...`);
    await batch.commit();

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
