/**
 * Script de diagnóstico para identificar problemas en el formulario de propiedades
 * Verifica la conexión a Firebase, validaciones, y posibles errores en el procesamiento
 */

const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} = require("firebase/firestore");
const { getAuth } = require("firebase/auth");

// Configuración de Firebase (usando las mismas credenciales del proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyA3bE-FMGrxFw4VQXfwJZd35EcPu6rTlzg",
  authDomain: "inmobiliaria-pasto.firebaseapp.com",
  projectId: "inmobiliaria-pasto",
  storageBucket: "inmobiliaria-pasto.appspot.com",
  messagingSenderId: "1077064324329",
  appId: "1:1077064324329:web:7c4fdacc6b854ec57cfe0f",
};

async function diagnosePropertyForm() {
  console.log("🔍 DIAGNÓSTICO DEL FORMULARIO DE PROPIEDADES");
  console.log("============================================");

  try {
    // 1. Verificar inicialización de Firebase
    console.log("📱 1. Inicializando Firebase...");
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    console.log("✅ Firebase inicializado correctamente");

    // 2. Verificar conexión a Firestore
    console.log("\n🔥 2. Probando conexión a Firestore...");

    // Datos de prueba para una propiedad mínima válida
    const testPropertyData = {
      title: "Prueba de Diagnóstico",
      address: "Calle de Prueba 123",
      city: "Pasto",
      price: 100000000,
      description: "Propiedad de prueba para diagnóstico",
      bedrooms: 2,
      bathrooms: 1,
      area: 80,
      type: "Casa",
      status: "available",
      phone: "3001234567",

      // Campos adicionales obligatorios
      encargado_inmueble: "Test Manager",
      publication_status: "Activo",
      business_type: "Vender",
      currency_type: "Pesos colombianos",

      // Ubicación geográfica
      country: "Colombia",
      department: "Nariño",
      zone_neighborhood: "Centro",
      postal_code: "520002",

      // Fechas
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),

      // Arrays obligatorios
      images: [],
      videos: [],
      zonas_comunes: [],
      formas_de_pago: ["Recursos propios"],
      area_construida: [],

      // Valores booleanos
      conjunto_cerrado: false,
      has_private_area: false,
      has_built_area: false,
      has_total_area: false,
      has_balcony_area: false,
      has_terrace_area: false,
      has_storage_area: false,

      // Valores numéricos opcionales
      valor_administracion: 0,
      total_area: 80,
      built_area: 75,

      // Otros campos opcionales
      edad_propiedad: "Usado",
      construction_year: "2020",
      stratum: "3",
      floor: "1",
      parking_type: "En línea",
      parking_spaces: "1 Vehículo",
    };

    console.log("📝 Intentando crear propiedad de prueba...");

    try {
      const docRef = await addDoc(
        collection(db, "properties"),
        testPropertyData
      );
      console.log(
        "✅ Propiedad de prueba creada exitosamente con ID:",
        docRef.id
      );
      console.log(
        "🎉 El formulario de propiedades debería funcionar correctamente"
      );

      return {
        success: true,
        propertyId: docRef.id,
        message: "Formulario funcionando correctamente",
      };
    } catch (firestoreError) {
      console.log("❌ Error al crear propiedad en Firestore:");
      console.log("Code:", firestoreError.code);
      console.log("Message:", firestoreError.message);

      // Análisis específico de errores comunes
      if (firestoreError.code === "permission-denied") {
        console.log("\n🔒 PROBLEMA IDENTIFICADO: Permisos de Firestore");
        console.log(
          "SOLUCIÓN: Verificar reglas de seguridad en Firebase Console"
        );
        console.log(
          "Las reglas actuales requieren autenticación para escribir"
        );
      } else if (firestoreError.code === "unavailable") {
        console.log("\n🌐 PROBLEMA IDENTIFICADO: Conexión a Internet");
        console.log(
          "SOLUCIÓN: Verificar conexión a internet y estado de Firebase"
        );
      } else if (firestoreError.message.includes("quota")) {
        console.log("\n💰 PROBLEMA IDENTIFICADO: Cuota de Firebase excedida");
        console.log("SOLUCIÓN: Verificar uso en Firebase Console");
      }

      return {
        success: false,
        error: firestoreError,
        message: "Error en conexión a Firestore",
      };
    }
  } catch (initError) {
    console.log("❌ Error al inicializar Firebase:");
    console.log(initError.message);

    return {
      success: false,
      error: initError,
      message: "Error de inicialización de Firebase",
    };
  }
}

// Función para verificar la estructura de datos
function validatePropertyStructure(propertyData) {
  console.log("\n🔍 3. Validando estructura de datos...");

  const requiredFields = [
    "title",
    "address",
    "city",
    "price",
    "description",
    "bedrooms",
    "bathrooms",
    "area",
    "type",
    "status",
  ];

  const missingFields = requiredFields.filter((field) => !propertyData[field]);

  if (missingFields.length > 0) {
    console.log("❌ Campos obligatorios faltantes:", missingFields);
    return false;
  }

  console.log("✅ Todos los campos obligatorios están presentes");
  return true;
}

// Función para generar recomendaciones
function generateRecommendations(diagnosisResult) {
  console.log("\n💡 RECOMENDACIONES PARA SOLUCIONAR PROBLEMAS:");
  console.log("===============================================");

  if (diagnosisResult.success) {
    console.log("✅ El sistema está funcionando correctamente");
    console.log("📝 Si sigues teniendo problemas, verifica:");
    console.log("   1. Que estés autenticado en la aplicación");
    console.log("   2. Que todos los campos obligatorios estén completos");
    console.log("   3. Que las imágenes no excedan el tamaño máximo");
  } else {
    console.log("❌ Problemas detectados. Acciones recomendadas:");
    console.log("   1. Verificar conexión a internet");
    console.log("   2. Comprobar estado de Firebase en Firebase Console");
    console.log("   3. Verificar autenticación del usuario");
    console.log("   4. Revisar reglas de seguridad de Firestore");
    console.log("   5. Comprobar cuotas y límites de Firebase");
  }

  console.log("\n🛠️  PASOS PARA PROBAR EL FORMULARIO:");
  console.log("   1. Ir a http://localhost:3000/admin");
  console.log("   2. Iniciar sesión como administrador");
  console.log('   3. Hacer clic en "Nueva Propiedad"');
  console.log("   4. Completar TODOS los campos obligatorios");
  console.log("   5. Intentar guardar la propiedad");
}

// Ejecutar diagnóstico
diagnosePropertyForm()
  .then((result) => {
    generateRecommendations(result);
  })
  .catch((error) => {
    console.error("💥 Error inesperado en el diagnóstico:", error);
  });
