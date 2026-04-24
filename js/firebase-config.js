/* ====================================================
   FIREBASE CONFIG — CoreLab
   Substitua os valores pelas suas credenciais reais
==================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ⚠️ SUBSTITUA PELOS SEUS DADOS DO FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSyBVquVlMKbkem815fdDUPNvj9Z3TitUxIc",
  authDomain: "corelab-app-ecfd5.firebaseapp.com",
  projectId: "corelab-app-ecfd5",
  storageBucket: "corelab-app-ecfd5.firebasestorage.app",
  messagingSenderId: "270988545375",
  appId: "1:270988545375:web:700ebf60dff3506740baea",
  measurementId: "G-GV4NR8NZM5"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Configurações do Google Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, db, googleProvider };