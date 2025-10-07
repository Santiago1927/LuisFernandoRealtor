const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} = require("firebase/firestore");

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB-0rP8OZZHxKGEQhb7NzWfUwIQe8E6A2c",
  authDomain: "inmapp-842fa.firebaseapp.com",
  projectId: "inmapp-842fa",
  storageBucket: "inmapp-842fa.firebasestorage.app",
  messagingSenderId: "727068995662",
  appId: "1:727068995662:web:9d7b9f8b8b4b4b4b4b4b4b",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// URLs de imágenes placeholder de alta calidad
const placeholderImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5JTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bHV4dXJ5JTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bHV4dXJ5JTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
];

async function fixBrokenImages() {
  console.log("🔧 REPARANDO IMÁGENES ROTAS");
  console.log("\n" + "=".repeat(60));

  try {
    const propertiesRef = collection(db, "properties");
    const snapshot = await getDocs(propertiesRef);

    let totalProperties = 0;
    let propertiesFixed = 0;

    console.log("📋 Verificando propiedades...\n");

    for (const docSnapshot of snapshot.docs) {
      const property = docSnapshot.data();
      totalProperties++;

      console.log(`🏠 Propiedad: ${property.title}`);

      if (
        property.images &&
        Array.isArray(property.images) &&
        property.images.length > 0
      ) {
        let needsUpdate = false;
        const newImages = [];

        for (let i = 0; i < property.images.length; i++) {
          const imageUrl = property.images[i];
          const isWorking = await testUrl(imageUrl);

          if (isWorking) {
            console.log(`   ✅ Imagen ${i + 1}: OK`);
            newImages.push(imageUrl);
          } else {
            console.log(`   🔧 Imagen ${i + 1}: REEMPLAZANDO por placeholder`);
            // Usar una imagen diferente para cada posición
            const placeholderIndex = i % placeholderImages.length;
            newImages.push(placeholderImages[placeholderIndex]);
            needsUpdate = true;
          }
        }

        if (needsUpdate) {
          try {
            const propertyRef = doc(db, "properties", docSnapshot.id);
            await updateDoc(propertyRef, { images: newImages });
            console.log(`   ✅ Propiedad actualizada con nuevas imágenes`);
            propertiesFixed++;
          } catch (error) {
            console.log(`   ❌ Error actualizando propiedad: ${error.message}`);
          }
        }
      } else {
        // Propiedad sin imágenes, agregar imágenes placeholder
        console.log(`   🔧 Agregando imágenes placeholder (no tenía imágenes)`);
        try {
          const propertyRef = doc(db, "properties", docSnapshot.id);
          await updateDoc(propertyRef, {
            images: [
              placeholderImages[0],
              placeholderImages[1],
              placeholderImages[2],
            ],
          });
          console.log(`   ✅ Propiedad actualizada con imágenes placeholder`);
          propertiesFixed++;
        } catch (error) {
          console.log(`   ❌ Error actualizando propiedad: ${error.message}`);
        }
      }
      console.log();
    }

    console.log("📊 RESUMEN DE REPARACIÓN:");
    console.log("=".repeat(60));
    console.log(`🏠 Total propiedades: ${totalProperties}`);
    console.log(`🔧 Propiedades reparadas: ${propertiesFixed}`);

    if (propertiesFixed > 0) {
      console.log(
        "\n🎉 ¡Reparación completada! Las imágenes ahora deberían mostrarse correctamente."
      );
      console.log("💡 Recarga la página web para ver los cambios.");
    } else {
      console.log("\n✅ No se encontraron imágenes que necesiten reparación.");
    }
  } catch (error) {
    console.error("❌ Error al reparar las imágenes:", error);
  }
}

function testUrl(url) {
  const https = require("https");
  const http = require("http");

  return new Promise((resolve) => {
    const client = url.startsWith("https:") ? https : http;

    const request = client.get(url, (response) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        resolve(true);
      } else {
        resolve(false);
      }
      response.resume(); // Consumir la respuesta
    });

    request.on("error", () => {
      resolve(false);
    });

    request.setTimeout(5000, () => {
      request.destroy();
      resolve(false);
    });
  });
}

fixBrokenImages()
  .then(() => {
    console.log("\n✅ Proceso completado.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
