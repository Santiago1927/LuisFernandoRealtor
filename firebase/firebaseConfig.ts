// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA0TbaZphhlB2bYWqoSFUVvbbiUnDt7jjk",
  authDomain: "inmapp-842fa.firebaseapp.com",
  projectId: "inmapp-842fa",
  storageBucket: "inmapp-842fa.firebasestorage.app",
  messagingSenderId: "47451790122",
  appId: "1:47451790122:web:ee44b4680617202a12dc53",
  measurementId: "G-2NVB1GTJ99"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services only on client side
let analytics: any = null;
if (typeof window !== 'undefined') {
  import('firebase/analytics').then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  });
}

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);