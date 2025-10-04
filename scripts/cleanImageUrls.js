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

function cleanFirebaseUrl(url) {
  if (!url || typeof url !== "string") return PLACEHOLDER_IMAGE;

  try {
    // Si ya es un placeholder, mantenerlo
    if (
      url.startsWith("/") ||
      !url.includes("firebasestorage.googleapis.com")
    ) {
      return url;
    }

    // Limpiar URL de Firebase Storage
    let cleanUrl = url;

    // Decodificar caracteres URL-encoded problemáticos
    cleanUrl = decodeURIComponent(cleanUrl);

    // Verificar que tenga los componentes esenciales
    if (
      cleanUrl.includes("firebasestorage.googleapis.com") &&
      cleanUrl.includes("alt=media") &&
      cleanUrl.includes("token=")
    ) {
      return cleanUrl;
    } else {
      console.warn(
        `URL de Firebase mal formateada: ${url.substring(0, 80)}...`
      );
      return PLACEHOLDER_IMAGE;
    }
  } catch (error) {
    console.warn(`Error limpiando URL: ${error.message}`);
    return PLACEHOLDER_IMAGE;
  }
}

async function cleanImageUrls() {
  console.log("🧹 LIMPIANDO URLs DE IMÁGENES PROBLEMÁTICAS\n");
  console.log("=".repeat(60));

  try {
    // Obtener todas las propiedades
    const propertiesCollection = collection(db, "properties");
    const snapshot = await getDocs(propertiesCollection);

    let totalProperties = 0;
    let propertiesProcessed = 0;
    let propertiesUpdated = 0;
    let urlsFixed = 0;

    for (const docSnapshot of snapshot.docs) {
      totalProperties++;
      const property = docSnapshot.data();
      const propertyId = docSnapshot.id;

      if (
        property.images &&
        Array.isArray(property.images) &&
        property.images.length > 0
      ) {
        propertiesProcessed++;
        console.log(
          `📋 Procesando: ${property.title || "Sin título"} (ID: ${propertyId})`
        );

        let needsUpdate = false;
        const cleanedImages = [];

        for (let i = 0; i < property.images.length; i++) {
          const originalUrl = property.images[i];
          const cleanedUrl = cleanFirebaseUrl(originalUrl);

          cleanedImages.push(cleanedUrl);

          if (originalUrl !== cleanedUrl) {
            console.log(`   🔧 Imagen ${i + 1}: URL limpiada`);
            console.log(`      Original: ${originalUrl.substring(0, 80)}...`);
            console.log(`      Limpia:   ${cleanedUrl.substring(0, 80)}...`);
            needsUpdate = true;
            urlsFixed++;
          } else {
            console.log(`   ✅ Imagen ${i + 1}: URL válida`);
          }
        }

        // Actualizar el documento si es necesario
        if (needsUpdate) {
          try {
            await updateDoc(doc(db, "properties", propertyId), {
              images: cleanedImages,
            });
            console.log(`   ✅ Propiedad actualizada correctamente\n`);
            propertiesUpdated++;
          } catch (error) {
            console.error(
              `   ❌ Error actualizando propiedad ${propertyId}:`,
              error.message
            );
          }
        } else {
          console.log(`   ✅ No necesita actualización\n`);
        }
      }
    }

    console.log("📊 RESUMEN DE LIMPIEZA:");
    console.log("=".repeat(60));
    console.log(`📁 Total propiedades: ${totalProperties}`);
    console.log(`📸 Propiedades procesadas: ${propertiesProcessed}`);
    console.log(`🔧 Propiedades actualizadas: ${propertiesUpdated}`);
    console.log(`🧹 URLs limpiadas: ${urlsFixed}`);

    if (propertiesUpdated > 0) {
      console.log("\n✅ ¡Limpieza completada exitosamente!");
      console.log("💡 Recomendaciones siguientes:");
      console.log("   1. Hacer un nuevo deploy de la aplicación");
      console.log("   2. Limpiar la caché del navegador");
      console.log("   3. Verificar que las imágenes se cargan correctamente");
      console.log(
        "   4. Considerar re-subir las imágenes que fueron reemplazadas por placeholders"
      );
    } else {
      console.log("\n✅ No se encontraron URLs que necesiten limpieza.");
    }
  } catch (error) {
    console.error("❌ Error durante la limpieza:", error);
    throw error;
  }
}

// Ejecutar limpieza
if (require.main === module) {
  cleanImageUrls().catch(console.error);
}

module.exports = { cleanImageUrls };
