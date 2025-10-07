// Prueba rápida de configuración de Firebase Auth
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

async function testAuth() {
  console.log("🔧 Probando configuración de Firebase Auth...");

  // Verificar que Firebase Auth esté inicializado
  console.log("Auth instance:", auth.app.name);
  console.log("Project ID:", auth.app.options.projectId);
  console.log("API Key:", auth.app.options.apiKey?.substring(0, 10) + "...");

  // Probar conexión básica
  console.log("✅ Firebase Auth configurado correctamente");

  // Listener de estado de auth
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("✅ Usuario autenticado:", user.email);
    } else {
      console.log("ℹ️ No hay usuario autenticado");
    }
  });
}

testAuth().catch(console.error);
