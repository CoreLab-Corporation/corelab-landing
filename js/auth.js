/* ====================================================
   AUTH.JS — Autenticação CoreLab
==================================================== */

import { auth, googleProvider } from "./firebase-config.js";
import { createUserProfile, getUserProfile } from "./db.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* ====================================================
   CADASTRO COM EMAIL E SENHA
==================================================== */
export async function registerWithEmail(name, email, password) {
  try {
    // Cria usuário no Firebase Auth
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = credential.user;

    // Atualiza nome no Auth
    await updateProfile(user, { displayName: name });

    // Cria perfil no Firestore
    await createUserProfile(user.uid, {
      name,
      email,
      photoURL: "",
    });

    return { success: true, user };
  } catch (err) {
    return { success: false, error: getAuthError(err.code) };
  }
}

/* ====================================================
   LOGIN COM EMAIL E SENHA
==================================================== */
export async function loginWithEmail(email, password) {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: credential.user };
  } catch (err) {
    return { success: false, error: getAuthError(err.code) };
  }
}

/* ====================================================
   LOGIN COM GOOGLE
==================================================== */
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Verifica se perfil já existe
    const existing = await getUserProfile(user.uid);
    if (!existing) {
      await createUserProfile(user.uid, {
        name: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      });
    }

    return { success: true, user };
  } catch (err) {
    return { success: false, error: getAuthError(err.code) };
  }
}

/* ====================================================
   LOGOUT
==================================================== */
export async function logout() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/* ====================================================
   RESET DE SENHA
==================================================== */
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (err) {
    return { success: false, error: getAuthError(err.code) };
  }
}

/* ====================================================
   OBSERVER — Estado da sessão
==================================================== */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

/* ====================================================
   USUÁRIO ATUAL
==================================================== */
export function getCurrentUser() {
  return auth.currentUser;
}

/* ====================================================
   TRADUÇÃO DE ERROS
==================================================== */
function getAuthError(code) {
  const errors = {
    "auth/email-already-in-use": "Este email já está cadastrado.",
    "auth/invalid-email": "Email inválido.",
    "auth/weak-password": "Senha muito fraca. Mínimo 6 caracteres.",
    "auth/user-not-found": "Usuário não encontrado.",
    "auth/wrong-password": "Senha incorreta.",
    "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde.",
    "auth/popup-closed-by-user": "Login cancelado.",
    "auth/network-request-failed": "Erro de conexão. Verifique sua internet.",
    "auth/invalid-credential": "Email ou senha incorretos.",
  };
  return errors[code] || "Ocorreu um erro. Tente novamente.";
}
