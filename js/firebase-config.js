/* ====================================================
   FIREBASE CONFIG — CoreLab
   Credenciais do projeto corelab-app-ecfd5
==================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  connectFirestoreEmulator,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBVquVlMKbkem815fdDUPNvj9Z3TitUxIc",
  authDomain: "corelab-app-ecfd5.firebaseapp.com",
  projectId: "corelab-app-ecfd5",
  storageBucket: "corelab-app-ecfd5.firebasestorage.app",
  messagingSenderId: "270988545375",
  appId: "1:270988545375:web:700ebf60dff3506740baea",
  measurementId: "G-GV4NR8NZM5",
};

// Inicializa o app com verificação de instância duplicada
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (err) {
  // Se o app já foi inicializado (erro comum em páginas que re-importam), recupera
  if (err.code === "app/duplicate-app") {
    const { getApp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
    app = getApp();
  } else {
    throw err;
  }
}

const auth = getAuth(app);
const db = getFirestore(app);

// Configuração do provedor Google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export { auth, db, googleProvider };
