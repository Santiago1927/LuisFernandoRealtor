/**
 * Script para crear propiedades de prueba
 * Esto ayudará a verificar el funcionamiento de la sección de propiedades generales
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config({ path: ".env.local" });

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createTestProperties() {
  try {
    console.log("🏗️ [SCRIPT] Creando propiedades de prueba...");

    // Verificar propiedades existentes
    const existingQuery = collection(db, "properties");
    const existingSnapshot = await getDocs(existingQuery);

    console.log(`📊 [INFO] Propiedades existentes: ${existingSnapshot.size}`);

    if (existingSnapshot.size > 0) {
      console.log("📝 [INFO] Propiedades encontradas:");
      existingSnapshot.docs.forEach((doc, index) => {
        const data = doc.data();
        console.log(
          `${index + 1}. ${data.title || "Sin título"} - Status: ${
            data.publication_status || "Sin status"
          }`
        );
      });

      // Modificar algunas propiedades existentes para que NO sean destacadas
      const propertiesToUpdate = existingSnapshot.docs.slice(1); // Dejar la primera como destacada

      for (let i = 0; i < propertiesToUpdate.length; i++) {
        const propertyDoc = propertiesToUpdate[i];
        const data = propertyDoc.data();

        if (data.publication_status === "Destacado") {
          await updateDoc(doc(db, "properties", propertyDoc.id), {
            publication_status: "Publicado",
            status: "Disponible",
            updatedAt: Timestamp.now(),
          });

          console.log(
            `✅ [UPDATE] Propiedad "${data.title}" cambiada a "Publicado"`
          );
        }
      }
    }

    // Crear algunas propiedades de prueba adicionales
    const testProperties = [
      {
        title: "Casa de Prueba General 1",
        description: "Esta es una propiedad de prueba para la sección general",
        price: 250000000,
        city: "Bogotá",
        neighborhood: "Zona Rosa",
        address: "Calle de Prueba 123",
        propertyType: "Casa",
        rooms: 3,
        bathrooms: 2,
        area: 150,
        status: "Disponible",
        publication_status: "Publicado", // NO destacada
        images: [],
        owner: {
          name: "Propietario de Prueba",
          phone: "3001234567",
          email: "test@example.com",
        },
        coordinates: {
          latitude: 4.6097,
          longitude: -74.0817,
        },
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
      {
        title: "Apartamento de Prueba General 2",
        description: "Otro apartamento de prueba para la sección general",
        price: 180000000,
        city: "Medellín",
        neighborhood: "El Poblado",
        address: "Carrera de Prueba 456",
        propertyType: "Apartamento",
        rooms: 2,
        bathrooms: 1,
        area: 80,
        status: "Disponible",
        publication_status: "Publicado", // NO destacada
        images: [],
        owner: {
          name: "Otro Propietario",
          phone: "3009876543",
          email: "test2@example.com",
        },
        coordinates: {
          latitude: 6.2442,
          longitude: -75.5812,
        },
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
    ];

    for (const property of testProperties) {
      const docRef = await addDoc(collection(db, "properties"), property);
      console.log(
        `✅ [CREATE] Propiedad creada: ${property.title} (ID: ${docRef.id})`
      );
    }

    console.log("🎉 [SUCCESS] Propiedades de prueba creadas exitosamente");
  } catch (error) {
    console.error("❌ [ERROR] Error creando propiedades:", error);
  }
}

// Ejecutar el script
createTestProperties().then(() => {
  console.log("🏁 [FIN] Script completado");
  process.exit(0);
});
