import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración usando las variables de entorno
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log("🔧 Configuración de Firebase:");
console.log("API Key:", firebaseConfig.apiKey?.substring(0, 10) + "...");
console.log("Project ID:", firebaseConfig.projectId);
console.log("Auth Domain:", firebaseConfig.authDomain);
console.log("Storage Bucket:", firebaseConfig.storageBucket);

try {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  console.log("✅ Firebase App inicializada correctamente");
  console.log("✅ Firebase Auth inicializado");
  console.log("✅ Firestore inicializado");

  console.log("📊 Estado de los servicios:");
  console.log("Auth app name:", auth.app.name);
  console.log("DB app name:", db.app.name);
} catch (error) {
  console.error("❌ Error al inicializar Firebase:", error);
}
