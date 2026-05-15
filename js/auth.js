/* ====================================================
   AUTH.JS — Autenticação CoreLab
   Versão corrigida:
   - createUserProfile usa merge:true (não sobrescreve)
   - Verificação robusta de perfil existente antes de criar
   - Erros de auth mapeados em PT-BR
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
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const user = credential.user;

    // Atualiza o displayName no Auth
    await updateProfile(user, { displayName: name });

    // Cria o perfil no Firestore (com merge para não sobrescrever se já existir)
    await createUserProfile(user.uid, {
      name,
      email,
      photoURL: "",
    });

    // Desloga após cadastro para forçar login manual
    await signOut(auth);

    return { success: true, user };
  } catch (err) {
    console.error("Erro no cadastro:", err);
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
    console.error("Erro no login:", err);
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

    // Verifica se o perfil já existe antes de criar
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
    console.error("Erro no login Google:", err);
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
    console.error("Erro no logout:", err);
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
    console.error("Erro ao resetar senha:", err);
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
    "auth/popup-blocked": "Popup bloqueado pelo navegador. Permita popups para este site.",
    "auth/account-exists-with-different-credential":
      "Já existe uma conta com este email usando outro método de login.",
  };
  return errors[code] || "Ocorreu um erro. Tente novamente.";
}
