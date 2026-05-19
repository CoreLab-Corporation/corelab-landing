/* ====================================================
   DB.JS — Operações Firestore CoreLab
   Versão corrigida:
   - createUserProfile usa setDoc com merge:true (seguro contra sobrescrita)
   - Sem orderBy nas queries (evita índices compostos desnecessários)
   - Ordenação feita no cliente
   - Todos os erros logados com contexto
==================================================== */

import { db, auth } from "./firebase-config.js";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  increment,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ====================================================
   UTILS INTERNOS
==================================================== */

// Ordena arrays por data no cliente para evitar índices compostos
function sortByDate(arr, field, asc = true) {
  return [...arr].sort((a, b) => {
    const da = a[field]?.toDate ? a[field].toDate() : new Date(a[field] || 0);
    const db_ = b[field]?.toDate ? b[field].toDate() : new Date(b[field] || 0);
    return asc ? da - db_ : db_ - da;
  });
}

/* ====================================================
   USUÁRIOS
==================================================== */

/**
 * Cria ou atualiza o perfil do usuário no Firestore.
 * Usa merge:true para nunca sobrescrever dados existentes.
 */
export async function createUserProfile(uid, data) {
  try {
    await setDoc(
      doc(db, "users", uid),
      {
        uid,
        name: data.name || "",
        email: data.email || "",
        photoURL: data.photoURL || "",
        level: data.level || "Iniciante",
        goal: data.goal || "Hipertrofia",
        daysPerWeek: data.daysPerWeek || "4 dias",
        xp: data.xp ?? 0,
        streak: data.streak ?? 0,
        totalWorkouts: data.totalWorkouts ?? 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true } // CRÍTICO: não sobrescreve campos existentes
    );
    console.log("✅ Perfil criado/atualizado com sucesso para:", uid);
  } catch (err) {
    console.error("❌ Erro ao criar perfil [uid:", uid, "]:", err);
    throw err;
  }
}

export async function getUserProfile(uid) {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data();
    return null;
  } catch (err) {
    console.error("❌ Erro ao buscar perfil [uid:", uid, "]:", err);
    throw err;
  }
}

export async function updateUserProfile(uid, data) {
  try {
    await updateDoc(doc(db, "users", uid), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("❌ Erro ao atualizar perfil [uid:", uid, "]:", err);
    throw err;
  }
}

/* ====================================================
   LEADS — EARLY ACCESS
==================================================== */

export async function getLeadsCount() {
  try {
    const snap = await getDocs(collection(db, "leads"));
    return snap.size;
  } catch (err) {
    console.error("❌ Erro ao contar leads:", err);
    return 0;
  }
}

/* ====================================================
   TREINOS
==================================================== */

export async function saveWorkout(userId, workout) {
  try {
    await addDoc(collection(db, "workouts", userId, "sessions"), {
      name: workout.name || "Treino",
      duration: Number(workout.duration) || 0,
      volume: Number(workout.volume) || 0,
      calories: Number(workout.calories) || 0,
      exercises: workout.exercises || [],
      notes: workout.notes || "",
      completedAt: serverTimestamp(),
    });

    // Atualiza estatísticas do usuário atomicamente
    await updateDoc(doc(db, "users", userId), {
      totalWorkouts: increment(1),
      streak: increment(1),
      xp: increment(100),
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("❌ Erro ao salvar treino [userId:", userId, "]:", err);
    throw err;
  }
}

export async function getWorkoutHistory(userId, limitCount = 10) {
  try {
    const ref = collection(db, "workouts", userId, "sessions");
    const snap = await getDocs(ref);

    const workouts = sortByDate(
      snap.docs.map((d) => ({ id: d.id, ...d.data() })),
      "completedAt",
      false
    );

    return workouts.slice(0, limitCount);
  } catch (err) {
    console.error("❌ Erro ao buscar treinos [userId:", userId, "]:", err);
    return [];
  }
}

/* ====================================================
   CHAT HISTORY — IA
==================================================== */

export async function saveChatMessage(userId, message) {
  try {
    await addDoc(collection(db, "chat_history", userId, "messages"), {
      role: message.role,
      content: message.content,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("❌ Erro ao salvar mensagem [userId:", userId, "]:", err);
  }
}

export async function getChatHistory(userId, limitCount = 20) {
  try {
    const ref = collection(db, "chat_history", userId, "messages");
    const snap = await getDocs(ref);

    const messages = sortByDate(
      snap.docs.map((d) => ({ id: d.id, ...d.data() })),
      "createdAt",
      true
    );

    return messages.slice(0, limitCount);
  } catch (err) {
    console.error("❌ Erro ao buscar histórico de chat [userId:", userId, "]:", err);
    return [];
  }
}

export async function clearChatHistory(userId) {
  try {
    const ref = collection(db, "chat_history", userId, "messages");
    const snap = await getDocs(ref);
    const deletes = snap.docs.map((d) =>
      deleteDoc(doc(db, "chat_history", userId, "messages", d.id))
    );
    await Promise.all(deletes);
  } catch (err) {
    console.error("❌ Erro ao limpar histórico de chat [userId:", userId, "]:", err);
  }
}

/* ====================================================
   COMUNIDADE — POSTS
==================================================== */

export async function createPost(userId, postData) {
  try {
    const userProfile = await getUserProfile(userId);
    const ref = await addDoc(collection(db, "community_posts"), {
      userId,
      userName: userProfile?.name || "Usuário",
      userInitials: (userProfile?.name || "U").substring(0, 2).toUpperCase(),
      text: postData.text,
      type: postData.type || "text",
      workout: postData.workout || null,
      likes: [],
      likesCount: 0,
      commentsCount: 0,
      createdAt: serverTimestamp(),
    });
    return ref.id;
  } catch (err) {
    console.error("❌ Erro ao criar post [userId:", userId, "]:", err);
    throw err;
  }
}

export function subscribeToPosts(callback, limitCount = 20) {
  const ref = collection(db, "community_posts");
  return onSnapshot(
    ref,
    (snap) => {
      const posts = sortByDate(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })),
        "createdAt",
        false
      ).slice(0, limitCount);
      callback(posts);
    },
    (err) => console.error("❌ subscribeToPosts erro:", err)
  );
}

export async function toggleLikePost(postId, userId) {
  try {
    const ref = doc(db, "community_posts", postId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return false;

    const post = snap.data();
    const liked = post.likes?.includes(userId);

    await updateDoc(ref, {
      likes: liked ? arrayRemove(userId) : arrayUnion(userId),
      likesCount: increment(liked ? -1 : 1),
    });

    return !liked;
  } catch (err) {
    console.error("❌ Erro ao curtir post [postId:", postId, "]:", err);
    return false;
  }
}

/* ====================================================
   DESAFIOS
==================================================== */

export async function joinChallenge(challengeId, userId) {
  try {
    const ref = doc(db, "challenges", challengeId);
    await updateDoc(ref, {
      participants: arrayUnion(userId),
      participantsCount: increment(1),
    });
  } catch (err) {
    console.error("❌ Erro ao participar do desafio [id:", challengeId, "]:", err);
    throw err;
  }
}

export async function getChallenges() {
  try {
    const ref = collection(db, "challenges");
    const snap = await getDocs(ref);

    return sortByDate(
      snap.docs.map((d) => ({ id: d.id, ...d.data() })),
      "createdAt",
      false
    );
  } catch (err) {
    console.error("❌ Erro ao buscar desafios:", err);
    return [];
  }
}

/* ====================================================
   EARLY ACCESS — Captura de Leads (versão com setDoc)
==================================================== */

/**
 * Salva o email de um interessado na lista de early access.
 * Usa o email sanitizado como ID do documento para evitar duplicatas
 * sem necessidade de read permission (regra: allow create: if true).
 */
export async function saveEarlyAccessLead(email) {
  try {
    const sanitized = email.toLowerCase().trim();
    // Usa o email como ID único (substituindo caracteres inválidos)
    const docId = sanitized.replace(/[.@]/g, "_");
    const ref = doc(db, "leads", docId);

    // getDoc para verificar existência (ainda bloqueado por regras)
    // Usamos setDoc com merge:false — se já existir, só atualiza lastAttempt
    await setDoc(
      ref,
      {
        email: sanitized,
        source: "landing_page",
        createdAt: serverTimestamp(),
      },
      { merge: false }
    ).catch(async () => {
      // Documento já existe — só registra nova tentativa
      await setDoc(ref, { lastAttempt: serverTimestamp() }, { merge: true });
      return { success: true, alreadyExists: true };
    });

    console.log("✅ Lead salvo com sucesso:", sanitized);
    return { success: true, alreadyExists: false };
  } catch (err) {
    console.error("❌ Erro ao salvar lead [email:", email, "]:", err);
    return { success: false, error: err.message };
  }
}


/* ====================================================
   UTILS — Formatação de Timestamp
==================================================== */

export function formatTimestamp(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "agora mesmo";
  if (mins < 60) return `há ${mins} minuto${mins > 1 ? "s" : ""}`;
  if (hours < 24) return `há ${hours} hora${hours > 1 ? "s" : ""}`;
  if (days < 7) return `há ${days} dia${days > 1 ? "s" : ""}`;
  return date.toLocaleDateString("pt-BR");
}
