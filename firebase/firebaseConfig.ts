// Importaciones de las funciones necesarias de Firebase SDK
// Estas funciones permiten inicializar y configurar los servicios de Firebase
import { initializeApp } from "firebase/app";        // Función principal para inicializar Firebase
import { getAuth } from "firebase/auth";             // Servicio de autenticación
import { getStorage } from "firebase/storage";       // Servicio de almacenamiento de archivos
import { getFirestore } from "firebase/firestore";   // Servicio de base de datos NoSQL

// TODO: Agregar SDKs para otros productos de Firebase que se quieran usar
// https://firebase.google.com/docs/web/setup#available-libraries

/**
 * Configuración de Firebase leída desde variables de entorno
 * (prefijo NEXT_PUBLIC_ para exponerlas al cliente según Next.js)
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyA0TbaZphhlB2bYWqoSFUVvbbiUnDt7jjk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "inmapp-842fa.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "inmapp-842fa",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "inmapp-842fa.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "47451790122",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:47451790122:web:ee44b4680617202a12dc53",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-2NVB1GTJ99",
};

/**
 * Inicialización de la aplicación Firebase
 * 
 * Esta función crea una instancia de Firebase App que será utilizada
 * por todos los servicios de Firebase (Auth, Firestore, Storage, etc.)
 */
const app = initializeApp(firebaseConfig);

/**
 * Inicialización condicional de Firebase Analytics
 * 
 * Firebase Analytics solo se inicializa en el lado del cliente (navegador)
 * para evitar errores durante el renderizado del servidor (SSR).
 * 
 * Características:
 * - Verificación de que window está definido (lado del cliente)
 * - Carga dinámica del módulo de analytics
 * - Inicialización asíncrona para evitar bloqueos
 */
let analytics: any = null;
if (typeof window !== 'undefined') {
  // Importación dinámica del módulo de analytics
  import('firebase/analytics').then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  });
}

/**
 * Exportación de servicios de Firebase inicializados
 * 
 * Estos servicios están listos para ser utilizados en toda la aplicación:
 * - auth: Para autenticación de usuarios (login, registro, etc.)
 * - storage: Para almacenamiento y gestión de archivos
 * - db: Para operaciones de base de datos (lectura, escritura, consultas)
 */
export const auth = getAuth(app);        // Servicio de autenticación
export const storage = getStorage(app);  // Servicio de almacenamiento
export const db = getFirestore(app);     // Servicio de base de datos Firestore