/**
 * Script de diagnóstico para propiedades generales
 * Verifica qué propiedades deberían aparecer en la sección "Propiedades generales"
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// Configuración de Firebase (misma del proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyA7ZB_8HLRznj4A0AKiGLGo6-9Wf2MQYo8",
  authDomain: "real-estate-react-app-4e4bb.firebaseapp.com",
  projectId: "real-estate-react-app-4e4bb",
  storageBucket: "real-estate-react-app-4e4bb.appspot.com",
  messagingSenderId: "295326781890",
  appId: "1:295326781890:web:81c4cfe2b7dfac0ba95e83",
  measurementId: "G-5JKV6P6WKS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function diagnosticGeneral() {
  try {
    console.log(
      "🔍 [DIAGNOSTIC] Iniciando diagnóstico de propiedades generales..."
    );

    // 1. Obtener TODAS las propiedades
    console.log("\n📊 [PASO 1] Obteniendo todas las propiedades...");
    const allPropertiesQuery = collection(db, "properties");
    const allSnapshot = await getDocs(allPropertiesQuery);

    console.log(
      `Total de propiedades en la base de datos: ${allSnapshot.size}`
    );

    allSnapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`${index + 1}. ID: ${doc.id}`);
      console.log(`   - Título: ${data.title || "Sin título"}`);
      console.log(`   - Estado: ${data.status || "Sin estado"}`);
      console.log(
        `   - Publication Status: ${
          data.publication_status || "Sin publication_status"
        }`
      );
      console.log(`   - Ciudad: ${data.city || "Sin ciudad"}`);
      console.log(`   - Precio: ${data.price || "Sin precio"}`);
      console.log("");
    });

    // 2. Obtener propiedades destacadas
    console.log("\n⭐ [PASO 2] Verificando propiedades destacadas...");
    const featuredQuery = query(
      collection(db, "properties"),
      where("publication_status", "==", "Destacado")
    );
    const featuredSnapshot = await getDocs(featuredQuery);

    console.log(`Propiedades destacadas: ${featuredSnapshot.size}`);
    featuredSnapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`${index + 1}. ${data.title} (ID: ${doc.id})`);
    });

    // 3. Obtener propiedades disponibles (no destacadas)
    console.log(
      "\n📋 [PASO 3] Verificando propiedades disponibles (no destacadas)..."
    );
    const availableQuery = query(
      collection(db, "properties"),
      where("status", "==", "Disponible")
    );
    const availableSnapshot = await getDocs(availableQuery);

    console.log(`Propiedades disponibles: ${availableSnapshot.size}`);
    const generalProperties = [];

    availableSnapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      const isGeneral = data.publication_status !== "Destacado";

      console.log(`${index + 1}. ${data.title} (ID: ${doc.id})`);
      console.log(`   - Status: ${data.status}`);
      console.log(`   - Publication Status: ${data.publication_status}`);
      console.log(
        `   - ¿Es general?: ${isGeneral ? "✅ SÍ" : "❌ NO (es destacada)"}`
      );

      if (isGeneral) {
        generalProperties.push({
          id: doc.id,
          title: data.title,
          publication_status: data.publication_status,
        });
      }
      console.log("");
    });

    // 4. Resumen final
    console.log("\n📈 [RESUMEN FINAL]");
    console.log(`Total propiedades: ${allSnapshot.size}`);
    console.log(`Propiedades destacadas: ${featuredSnapshot.size}`);
    console.log(`Propiedades disponibles: ${availableSnapshot.size}`);
    console.log(
      `Propiedades generales (disponibles y no destacadas): ${generalProperties.length}`
    );

    if (generalProperties.length > 0) {
      console.log("\n✅ [PROPIEDADES GENERALES ENCONTRADAS]:");
      generalProperties.forEach((prop, index) => {
        console.log(
          `${index + 1}. ${prop.title} (${
            prop.publication_status || "Sin status"
          })`
        );
      });
    } else {
      console.log("\n⚠️ [NO SE ENCONTRARON PROPIEDADES GENERALES]");
      console.log("Posibles causas:");
      console.log("- Todas las propiedades están marcadas como 'Destacado'");
      console.log("- No hay propiedades con status 'Disponible'");
      console.log("- Problema en la lógica de filtrado");
    }
  } catch (error) {
    console.error("❌ [ERROR] Error en diagnóstico:", error);
  }
}

// Ejecutar diagnóstico
diagnosticGeneral().then(() => {
  console.log("\n🏁 [FIN] Diagnóstico completado");
  process.exit(0);
});
