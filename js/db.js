/* ====================================================
   DB.JS — Operações Firestore CoreLab
   Versão corrigida e ampliada com suporte a Modo Convidado (Demo):
   - Redireciona consultas para LocalStorage quando no modo convidado
   - Mantém estado de histórico de chat, perfil e posts da comunidade
   - Seguro e isolado de contas de produção
==================================================== */

import { db, auth } from "./firebase-config.js";
import { DEMO_DATA } from "./demoData.js";
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
   MOCK / GUEST REDIRECTION UTILS
==================================================== */

// Verifica se o usuário atual é convidado (anônimo)
function checkGuest() {
  return auth.currentUser && auth.currentUser.isAnonymous;
}

// Helper para ler lista de dados do localStorage com re-hidratação de Timestamps do Firestore
function getLocalData(key, defaultData) {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Re-hidrata os campos de data para responder a .toDate()
      return parsed.map(item => {
        const newItem = { ...item };
        for (const k in newItem) {
          if (newItem[k] && typeof newItem[k] === 'object' && newItem[k]._date) {
            const dateVal = new Date(newItem[k]._date);
            newItem[k] = { toDate: () => dateVal };
          } else if (k === 'completedAt' || k === 'recordedAt' || k === 'createdAt' || k === 'updatedAt') {
            if (typeof newItem[k] === 'string') {
              const dateVal = new Date(newItem[k]);
              newItem[k] = { toDate: () => dateVal };
            }
          }
        }
        return newItem;
      });
    } catch (e) {
      console.error("Erro ao ler dados locais no db.js:", e);
    }
  }
  saveLocalData(key, defaultData);
  return defaultData;
}

// Helper para salvar dados locais transformando objetos toDate em serializáveis
function saveLocalData(key, data) {
  const serializable = JSON.parse(JSON.stringify(data, (k, v) => {
    if (v && typeof v === 'object' && v.toDate) {
      return { _date: v.toDate().toISOString() };
    }
    if (v && typeof v === 'object' && v._date) {
      return v;
    }
    return v;
  }));
  localStorage.setItem(key, JSON.stringify(serializable));
}

// Helper para obter perfil do usuário local
function getLocalProfile(key, defaultProfile) {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Erro ao ler perfil local no db.js:", e);
    }
  }
  localStorage.setItem(key, JSON.stringify(defaultProfile));
  return defaultProfile;
}

// Helper para salvar perfil local
function saveLocalProfile(key, profile) {
  localStorage.setItem(key, JSON.stringify(profile));
}

// Registro de listeners reativos locais de banco de dados
const guestDbListeners = {
  posts: []
};

// Dispara atualizações para posts locais
function triggerGuestDbListener(type, data) {
  if (guestDbListeners[type]) {
    guestDbListeners[type].forEach(cb => {
      try { cb(data); } catch(e) { console.error("Erro no callback db local:", e); }
    });
  }
}

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
  if (checkGuest()) {
    const key = `corelab_demo_profile_${uid}`;
    const profile = getLocalProfile(key, DEMO_DATA.userProfile);
    const updated = {
      ...profile,
      uid,
      name: data.name || profile.name || "",
      email: data.email || profile.email || "",
      photoURL: data.photoURL || profile.photoURL || "",
      updatedAt: new Date().toISOString()
    };
    saveLocalProfile(key, updated);
    return;
  }

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
      { merge: true }
    );
    console.log("✅ Perfil criado/atualizado com sucesso para:", uid);
  } catch (err) {
    console.error("❌ Erro ao criar perfil [uid:", uid, "]:", err);
    throw err;
  }
}

export async function getUserProfile(uid) {
  if (checkGuest()) {
    const key = `corelab_demo_profile_${uid}`;
    return getLocalProfile(key, DEMO_DATA.userProfile);
  }

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
  if (checkGuest()) {
    const key = `corelab_demo_profile_${uid}`;
    const profile = getLocalProfile(key, DEMO_DATA.userProfile);
    const updated = {
      ...profile,
      ...data,
      updatedAt: new Date().toISOString()
    };
    saveLocalProfile(key, updated);
    return;
  }

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
  if (checkGuest()) {
    return DEMO_DATA.earlyAccessLeads;
  }

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
  if (checkGuest()) {
    const key = `corelab_demo_workouts_${userId}`;
    const workouts = getLocalData(key, DEMO_DATA.workouts);
    
    const newWorkout = {
      id: "demo_w_" + Date.now(),
      name: workout.name || "Treino",
      duration: Number(workout.duration) || 0,
      volume: Number(workout.volume) || 0,
      calories: Number(workout.calories) || 0,
      exercises: workout.exercises || [],
      notes: workout.notes || "",
      completedAt: { toDate: () => new Date() }
    };
    
    workouts.unshift(newWorkout);
    saveLocalData(key, workouts);

    // Atualiza estatísticas do perfil
    const profileKey = `corelab_demo_profile_${userId}`;
    const profile = getLocalProfile(profileKey, DEMO_DATA.userProfile);
    profile.totalWorkouts = (profile.totalWorkouts || 0) + 1;
    profile.streak = (profile.streak || 0) + 1;
    profile.xp = (profile.xp || 0) + 100;
    saveLocalProfile(profileKey, profile);
    return;
  }

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
  if (checkGuest()) {
    const workouts = getLocalData(`corelab_demo_workouts_${userId}`, DEMO_DATA.workouts);
    return workouts.slice(0, limitCount);
  }

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
  if (checkGuest()) {
    const key = `corelab_demo_chat_${userId}`;
    const history = getLocalData(key, DEMO_DATA.chatHistory);
    
    const newMsg = {
      id: "demo_msg_" + Date.now(),
      role: message.role,
      content: message.content,
      createdAt: { toDate: () => new Date() }
    };
    
    history.push(newMsg);
    saveLocalData(key, history);
    return;
  }

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
  if (checkGuest()) {
    const history = getLocalData(`corelab_demo_chat_${userId}`, DEMO_DATA.chatHistory);
    return history.slice(-limitCount); // Retorna as últimas mensagens
  }

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
  if (checkGuest()) {
    const key = `corelab_demo_chat_${userId}`;
    saveLocalData(key, []);
    return;
  }

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
  if (checkGuest()) {
    const key = `corelab_demo_posts_${userId}`;
    const posts = getLocalData(key, DEMO_DATA.communityPosts);
    const profile = getLocalProfile(`corelab_demo_profile_${userId}`, DEMO_DATA.userProfile);
    
    const newPost = {
      id: "demo_p_" + Date.now(),
      userId,
      userName: profile.name || "Usuário Convidado",
      userInitials: (profile.name || "U").substring(0, 2).toUpperCase(),
      text: postData.text,
      type: postData.type || "text",
      workout: postData.workout || null,
      likes: [],
      likesCount: 0,
      commentsCount: 0,
      createdAt: { toDate: () => new Date() }
    };
    
    posts.unshift(newPost); // Novo post no topo
    saveLocalData(key, posts);
    triggerGuestDbListener("posts", posts);
    return newPost.id;
  }

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
  if (checkGuest()) {
    const guestUid = auth.currentUser ? auth.currentUser.uid : "demo_guest_uid";
    const posts = getLocalData(`corelab_demo_posts_${guestUid}`, DEMO_DATA.communityPosts);
    setTimeout(() => callback(posts), 10);
    
    guestDbListeners.posts.push(callback);
    return () => {
      guestDbListeners.posts = guestDbListeners.posts.filter(cb => cb !== callback);
    };
  }

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
  if (checkGuest()) {
    const key = `corelab_demo_posts_${userId}`;
    const posts = getLocalData(key, DEMO_DATA.communityPosts);
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex > -1) {
      const post = posts[postIndex];
      if (!post.likes) post.likes = [];
      
      const liked = post.likes.includes(userId);
      if (liked) {
        post.likes = post.likes.filter(id => id !== userId);
        post.likesCount = Math.max(0, (post.likesCount || 1) - 1);
      } else {
        post.likes.push(userId);
        post.likesCount = (post.likesCount || 0) + 1;
      }
      
      posts[postIndex] = post;
      saveLocalData(key, posts);
      triggerGuestDbListener("posts", posts);
      return !liked;
    }
    return false;
  }

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
  if (checkGuest()) {
    const key = `corelab_demo_challenges_${userId}`;
    const challenges = getLocalData(key, DEMO_DATA.challenges);
    const chIndex = challenges.findIndex(c => c.id === challengeId);
    
    if (chIndex > -1) {
      const ch = challenges[chIndex];
      if (!ch.participants) ch.participants = [];
      if (!ch.participants.includes(userId)) {
        ch.participants.push(userId);
        ch.participantsCount = (ch.participantsCount || 0) + 1;
        challenges[chIndex] = ch;
        saveLocalData(key, challenges);
      }
    }
    return;
  }

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
  if (checkGuest()) {
    const guestUid = auth.currentUser ? auth.currentUser.uid : "demo_guest_uid";
    return getLocalData(`corelab_demo_challenges_${guestUid}`, DEMO_DATA.challenges);
  }

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
   EARLY ACCESS — Captura de Leads
==================================================== */

export async function saveEarlyAccessLead(email) {
  try {
    const sanitized = email.toLowerCase().trim();
    const docId = sanitized.replace(/[.@]/g, "_");
    const ref = doc(db, "leads", docId);

    await setDoc(
      ref,
      {
        email: sanitized,
        source: "landing_page",
        createdAt: serverTimestamp(),
      },
      { merge: false }
    ).catch(async () => {
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
