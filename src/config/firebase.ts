import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAFvZ53efu8BWlHtu9J6jF9Z0XeA_WkoTw",
  authDomain: "ocrapp-4a820.firebaseapp.com",
  projectId: "ocrapp-4a820",
  storageBucket: "ocrapp-4a820.firebasestorage.app",
  messagingSenderId: "190693922121",
  appId: "1:190693922121:web:9281447f72f3670314f698",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
