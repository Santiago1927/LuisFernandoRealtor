const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");
const https = require("https");
const http = require("http");

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

async function testImageUrls() {
  console.log("🔍 VERIFICANDO CARGA DE IMÁGENES");
  console.log("\n" + "=".repeat(60));

  try {
    const propertiesRef = collection(db, "properties");
    const snapshot = await getDocs(propertiesRef);

    let totalImages = 0;
    let workingImages = 0;
    let failedImages = 0;

    console.log("📋 Probando URLs de imágenes...\n");

    for (const doc of snapshot.docs) {
      const property = doc.data();

      if (
        property.images &&
        Array.isArray(property.images) &&
        property.images.length > 0
      ) {
        console.log(
          `🏠 Propiedad: ${property.title} (${property.images.length} imágenes)`
        );

        for (let i = 0; i < property.images.length; i++) {
          const imageUrl = property.images[i];
          totalImages++;

          try {
            const isWorking = await testUrl(imageUrl);
            if (isWorking) {
              console.log(`   ✅ Imagen ${i + 1}: OK`);
              workingImages++;
            } else {
              console.log(`   ❌ Imagen ${i + 1}: FALLÓ`);
              console.log(`      URL: ${imageUrl}`);
              failedImages++;
            }
          } catch (error) {
            console.log(`   ❌ Imagen ${i + 1}: ERROR - ${error.message}`);
            failedImages++;
          }
        }
        console.log();
      }
    }

    console.log("📊 RESUMEN DE PRUEBAS:");
    console.log("=".repeat(60));
    console.log(`📸 Total imágenes probadas: ${totalImages}`);
    console.log(`✅ Imágenes funcionando: ${workingImages}`);
    console.log(`❌ Imágenes fallidas: ${failedImages}`);
    console.log(
      `📈 Tasa de éxito: ${
        totalImages > 0 ? ((workingImages / totalImages) * 100).toFixed(1) : 0
      }%`
    );

    if (failedImages === 0) {
      console.log("\n🎉 ¡Todas las imágenes están funcionando correctamente!");
    } else {
      console.log(`\n⚠️  ${failedImages} imágenes necesitan atención.`);
    }
  } catch (error) {
    console.error("❌ Error al verificar las imágenes:", error);
  }
}

function testUrl(url) {
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

    request.setTimeout(10000, () => {
      request.destroy();
      resolve(false);
    });
  });
}

testImageUrls()
  .then(() => {
    console.log("\n✅ Verificación completada.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
