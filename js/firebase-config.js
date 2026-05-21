/* ====================================================
   FIREBASE CONFIG — CoreLab
   Credenciais do projeto corelab-app-ecfd5
==================================================== */

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBVquVlMKbkem815fdDUPNvj9Z3TitUxIc",
  authDomain: "corelab-app-ecfd5.firebaseapp.com",
  projectId: "corelab-app-ecfd5",
  storageBucket: "corelab-app-ecfd5.firebasestorage.app",
  messagingSenderId: "270988545375",
  appId: "1:270988545375:web:700ebf60dff3506740baea",
  measurementId: "G-GV4NR8NZM5",
};

// Evita inicializar múltiplas vezes (safe em multi-página)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

// O banco foi criado com ID "default" (sem parênteses) — especificar explicitamente
const db = getFirestore(app, "default");

// Configuração do provedor Google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export { auth, db, googleProvider };
