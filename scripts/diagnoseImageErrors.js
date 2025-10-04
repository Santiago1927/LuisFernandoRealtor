const { initializeApp } = require("firebase/app");
const { 
  getFirestore, 
  collection, 
  getDocs 
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

async function diagnoseImageErrors() {
  console.log("🔍 DIAGNÓSTICO DE ERRORES DE IMÁGENES\n");
  console.log("=".repeat(60));

  try {
    // Obtener todas las propiedades
    const propertiesCollection = collection(db, "properties");
    const snapshot = await getDocs(propertiesCollection);
    
    let totalProperties = 0;
    let propertiesWithImages = 0;
    let suspiciousUrls = [];
    let problematicProperties = [];

    console.log("📋 Analizando propiedades...\n");

    for (const docSnapshot of snapshot.docs) {
      totalProperties++;
      const property = docSnapshot.data();
      const propertyId = docSnapshot.id;
      
      if (property.images && Array.isArray(property.images) && property.images.length > 0) {
        propertiesWithImages++;
        
        for (let i = 0; i < property.images.length; i++) {
          const imageUrl = property.images[i];
          
          // Buscar URLs problemáticas
          if (imageUrl && typeof imageUrl === 'string') {
            
            // Verificar si contiene caracteres raros como en el error
            if (imageUrl.includes('%2F') || imageUrl.includes('imagez1') || imageUrl.includes('3F7')) {
              suspiciousUrls.push({
                propertyId,
                propertyTitle: property.title || 'Sin título',
                imageIndex: i,
                url: imageUrl,
                issue: 'URL codificada o malformada'
              });
            }
            
            // Verificar URLs de Firebase Storage con tokens expirados
            if (imageUrl.includes('firebasestorage.googleapis.com')) {
              // Verificar si la URL tiene formato correcto
              const hasToken = imageUrl.includes('token=');
              const hasAltMedia = imageUrl.includes('alt=media');
              
              if (!hasToken || !hasAltMedia) {
                suspiciousUrls.push({
                  propertyId,
                  propertyTitle: property.title || 'Sin título',
                  imageIndex: i,
                  url: imageUrl,
                  issue: 'URL de Firebase Storage mal formateada'
                });
              }
            }
            
            // Verificar URLs muy largas o con codificación extraña
            if (imageUrl.length > 500 || /[%][0-9A-Fa-f][0-9A-Fa-f][%][0-9A-Fa-f][0-9A-Fa-f]/.test(imageUrl)) {
              suspiciousUrls.push({
                propertyId,
                propertyTitle: property.title || 'Sin título',
                imageIndex: i,
                url: imageUrl,
                issue: 'URL excesivamente codificada'
              });
            }
          } else {
            suspiciousUrls.push({
              propertyId,
              propertyTitle: property.title || 'Sin título',
              imageIndex: i,
              url: imageUrl,
              issue: 'URL no válida (null, undefined o no string)'
            });
          }
        }
        
        if (suspiciousUrls.some(u => u.propertyId === propertyId)) {
          problematicProperties.push({
            id: propertyId,
            title: property.title || 'Sin título',
            imageCount: property.images.length
          });
        }
      }
    }

    console.log("📊 RESULTADOS DEL DIAGNÓSTICO:");
    console.log("=".repeat(60));
    console.log(`📁 Total propiedades: ${totalProperties}`);
    console.log(`📸 Propiedades con imágenes: ${propertiesWithImages}`);
    console.log(`⚠️  URLs sospechosas encontradas: ${suspiciousUrls.length}`);
    console.log(`🏠 Propiedades problemáticas: ${problematicProperties.length}\n`);

    if (suspiciousUrls.length > 0) {
      console.log("🚨 URLS PROBLEMÁTICAS DETECTADAS:");
      console.log("=".repeat(60));
      
      suspiciousUrls.forEach((item, index) => {
        console.log(`${index + 1}. Propiedad: ${item.propertyTitle}`);
        console.log(`   ID: ${item.propertyId}`);
        console.log(`   Imagen: ${item.imageIndex + 1}`);
        console.log(`   Problema: ${item.issue}`);
        console.log(`   URL: ${item.url.substring(0, 100)}${item.url.length > 100 ? '...' : ''}`);
        console.log("");
      });

      console.log("💡 SOLUCIONES RECOMENDADAS:");
      console.log("=".repeat(60));
      console.log("1. Ejecutar el script de limpieza de URLs");
      console.log("2. Re-subir las imágenes problemáticas");
      console.log("3. Verificar la configuración de Firebase Storage");
      console.log("4. Implementar validación de URLs en el frontend");
      console.log("5. Usar el componente SmartImage para manejo de errores");
    } else {
      console.log("✅ No se encontraron URLs problemáticas.");
    }

    // Generar comandos de limpieza
    if (problematicProperties.length > 0) {
      console.log("\n🔧 PROPIEDADES QUE NECESITAN LIMPIEZA:");
      console.log("=".repeat(60));
      problematicProperties.forEach(prop => {
        console.log(`- ${prop.title} (ID: ${prop.id}) - ${prop.imageCount} imágenes`);
      });
    }

  } catch (error) {
    console.error("❌ Error durante el diagnóstico:", error);
    throw error;
  }
}

// Ejecutar diagnóstico
if (require.main === module) {
  diagnoseImageErrors().catch(console.error);
}

module.exports = { diagnoseImageErrors };