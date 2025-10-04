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

const PLACEHOLDER_IMAGE = "/placeholder-property.svg";

async function checkUrlExists(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.warn(`Error checking URL: ${url}`, error.message);
    return false;
  }
}

async function fixImageErrors() {
  console.log("🔧 Corrigiendo errores de imágenes en Firestore...\n");

  try {
    // Obtener todas las propiedades
    const propertiesCollection = collection(db, "properties");
    const snapshot = await getDocs(propertiesCollection);

    let totalProperties = 0;
    let propertiesWithImages = 0;
    let propertiesFixed = 0;
    let brokenUrls = 0;

    for (const docSnapshot of snapshot.docs) {
      totalProperties++;
      const property = docSnapshot.data();
      const propertyId = docSnapshot.id;

      if (
        property.images &&
        Array.isArray(property.images) &&
        property.images.length > 0
      ) {
        propertiesWithImages++;
        console.log(
          `📋 Verificando propiedad: ${
            property.title || "Sin título"
          } (ID: ${propertyId})`
        );

        let needsUpdate = false;
        const validImages = [];

        for (let i = 0; i < property.images.length; i++) {
          const imageUrl = property.images[i];

          if (!imageUrl || typeof imageUrl !== "string") {
            console.log(`   ❌ Imagen ${i + 1}: URL inválida o vacía`);
            validImages.push(PLACEHOLDER_IMAGE);
            needsUpdate = true;
            brokenUrls++;
            continue;
          }

          // Verificar si es una URL de Firebase Storage
          if (imageUrl.includes("firebasestorage.googleapis.com")) {
            console.log(`   🔍 Verificando Firebase Storage URL ${i + 1}...`);

            const isValid = await checkUrlExists(imageUrl);

            if (!isValid) {
              console.log(
                `   ❌ Imagen ${i + 1}: URL rota - ${imageUrl.substring(
                  0,
                  80
                )}...`
              );
              validImages.push(PLACEHOLDER_IMAGE);
              needsUpdate = true;
              brokenUrls++;
            } else {
              console.log(`   ✅ Imagen ${i + 1}: URL válida`);
              validImages.push(imageUrl);
            }
          } else {
            // Para otras URLs, mantenerlas pero marcar para revisión
            console.log(
              `   ℹ️  Imagen ${i + 1}: URL externa - ${imageUrl.substring(
                0,
                50
              )}...`
            );
            validImages.push(imageUrl);
          }
        }

        // Actualizar el documento si es necesario
        if (needsUpdate) {
          try {
            await updateDoc(doc(db, "properties", propertyId), {
              images: validImages,
            });
            console.log(
              `   ✅ Propiedad actualizada con ${validImages.length} imágenes válidas\n`
            );
            propertiesFixed++;
          } catch (error) {
            console.error(
              `   ❌ Error actualizando propiedad ${propertyId}:`,
              error.message
            );
          }
        } else {
          console.log(`   ✅ Todas las imágenes están válidas\n`);
        }
      }
    }

    console.log("\n📊 RESUMEN DE LA CORRECCIÓN:");
    console.log(`📁 Total propiedades verificadas: ${totalProperties}`);
    console.log(`📸 Propiedades con imágenes: ${propertiesWithImages}`);
    console.log(`🔧 Propiedades corregidas: ${propertiesFixed}`);
    console.log(`❌ URLs rotas reemplazadas: ${brokenUrls}`);

    if (propertiesFixed > 0) {
      console.log(
        "\n✅ ¡Corrección completada! Las URLs rotas han sido reemplazadas por placeholders."
      );
      console.log(
        "💡 Recomendación: Haz un nuevo deploy para aplicar los cambios."
      );
    } else {
      console.log("\n✅ No se encontraron URLs rotas que corregir.");
    }
  } catch (error) {
    console.error("❌ Error durante la corrección:", error);
    throw error;
  }
}

// Ejecutar script
if (require.main === module) {
  fixImageErrors().catch(console.error);
}

module.exports = { fixImageErrors };
