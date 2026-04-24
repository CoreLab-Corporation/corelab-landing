/* ====================================================
   DB.JS — Operações Firestore CoreLab
==================================================== */

import { db, auth } from './firebase-config.js';
import {
  doc, setDoc, getDoc, updateDoc, addDoc,
  collection, query, where, orderBy, limit,
  getDocs, serverTimestamp, arrayUnion, arrayRemove,
  increment, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ====================================================
   USUÁRIOS
==================================================== */

// Cria perfil do usuário após cadastro
export async function createUserProfile(uid, data) {
  try {
    await setDoc(doc(db, 'users', uid), {
      uid,
      name: data.name || '',
      email: data.email || '',
      photoURL: data.photoURL || '',
      level: 'Iniciante',
      goal: 'Hipertrofia',
      daysPerWeek: '4 dias',
      xp: 0,
      streak: 0,
      totalWorkouts: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log('Perfil criado com sucesso!');
  } catch (err) {
    console.error('Erro ao criar perfil:', err);
    throw err;
  }
}

// Busca perfil do usuário
export async function getUserProfile(uid) {
  try {
    const ref = doc(db, 'users', uid);
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data();
    return null;
  } catch (err) {
    console.error('Erro ao buscar perfil:', err);
    throw err;
  }
}

// Atualiza perfil do usuário
export async function updateUserProfile(uid, data) {
  try {
    await updateDoc(doc(db, 'users', uid), {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    console.error('Erro ao atualizar perfil:', err);
    throw err;
  }
}

/* ====================================================
   LEADS — EARLY ACCESS
==================================================== */

// Salva lead do Early Access
export async function saveEarlyAccessLead(email) {
  try {
    // Verifica se email já existe
    const q = query(
      collection(db, 'leads'),
      where('email', '==', email)
    );
    const existing = await getDocs(q);
    if (!existing.empty) {
      return { success: true, alreadyExists: true };
    }

    await addDoc(collection(db, 'leads'), {
      email,
      origin: 'early_access',
      status: 'pending',
      createdAt: serverTimestamp()
    });

    return { success: true, alreadyExists: false };
  } catch (err) {
    console.error('Erro ao salvar lead:', err);
    throw err;
  }
}

// Busca total de leads
export async function getLeadsCount() {
  try {
    const snap = await getDocs(collection(db, 'leads'));
    return snap.size;
  } catch (err) {
    console.error('Erro ao contar leads:', err);
    return 0;
  }
}

/* ====================================================
   TREINOS
==================================================== */

// Salva treino realizado
export async function saveWorkout(userId, workout) {
  try {
    await addDoc(collection(db, 'workouts', userId, 'sessions'), {
      name: workout.name || 'Treino',
      duration: workout.duration || 0,
      volume: workout.volume || 0,
      calories: workout.calories || 0,
      exercises: workout.exercises || [],
      notes: workout.notes || '',
      completedAt: serverTimestamp()
    });

    // Atualiza contadores do usuário
    await updateDoc(doc(db, 'users', userId), {
      totalWorkouts: increment(1),
      streak: increment(1),
      xp: increment(100),
      updatedAt: serverTimestamp()
    });

  } catch (err) {
    console.error('Erro ao salvar treino:', err);
    throw err;
  }
}

// Busca histórico de treinos
export async function getWorkoutHistory(userId, limitCount = 10) {
  try {
    const q = query(
      collection(db, 'workouts', userId, 'sessions'),
      orderBy('completedAt', 'desc'),
      limit(limitCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Erro ao buscar treinos:', err);
    return [];
  }
}

/* ====================================================
   CHAT HISTORY — IA
==================================================== */

// Salva mensagem do chat
export async function saveChatMessage(userId, message) {
  try {
    await addDoc(
      collection(db, 'chat_history', userId, 'messages'),
      {
        role: message.role,
        content: message.content,
        createdAt: serverTimestamp()
      }
    );
  } catch (err) {
    console.error('Erro ao salvar mensagem:', err);
  }
}

// Busca histórico do chat
export async function getChatHistory(userId, limitCount = 20) {
  try {
    const q = query(
      collection(db, 'chat_history', userId, 'messages'),
      orderBy('createdAt', 'asc'),
      limit(limitCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Erro ao buscar histórico:', err);
    return [];
  }
}

// Limpa histórico do chat
export async function clearChatHistory(userId) {
  try {
    const q = query(
      collection(db, 'chat_history', userId, 'messages')
    );
    const snap = await getDocs(q);
    const deletes = snap.docs.map(d =>
      deleteDoc(doc(db, 'chat_history', userId, 'messages', d.id))
    );
    await Promise.all(deletes);
  } catch (err) {
    console.error('Erro ao limpar histórico:', err);
  }
}

/* ====================================================
   COMUNIDADE — POSTS
==================================================== */

// Cria post na comunidade
export async function createPost(userId, postData) {
  try {
    const userProfile = await getUserProfile(userId);
    const ref = await addDoc(collection(db, 'community_posts'), {
      userId,
      userName: userProfile?.name || 'Usuário',
      userInitials: (userProfile?.name || 'U').substring(0, 2).toUpperCase(),
      text: postData.text,
      type: postData.type || 'text',
      workout: postData.workout || null,
      likes: [],
      likesCount: 0,
      commentsCount: 0,
      createdAt: serverTimestamp()
    });
    return ref.id;
  } catch (err) {
    console.error('Erro ao criar post:', err);
    throw err;
  }
}

// Busca posts da comunidade em tempo real
export function subscribeToPosts(callback, limitCount = 20) {
  const q = query(
    collection(db, 'community_posts'),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );
  return onSnapshot(q, snap => {
    const posts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(posts);
  });
}

// Curtir/descurtir post
export async function toggleLikePost(postId, userId) {
  try {
    const ref = doc(db, 'community_posts', postId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;

    const post = snap.data();
    const liked = post.likes?.includes(userId);

    await updateDoc(ref, {
      likes: liked ? arrayRemove(userId) : arrayUnion(userId),
      likesCount: increment(liked ? -1 : 1)
    });

    return !liked;
  } catch (err) {
    console.error('Erro ao curtir post:', err);
  }
}

/* ====================================================
   DESAFIOS
==================================================== */

// Participa de um desafio
export async function joinChallenge(challengeId, userId) {
  try {
    const ref = doc(db, 'challenges', challengeId);
    await updateDoc(ref, {
      participants: arrayUnion(userId),
      participantsCount: increment(1)
    });
  } catch (err) {
    console.error('Erro ao participar do desafio:', err);
    throw err;
  }
}

// Busca desafios disponíveis
export async function getChallenges() {
  try {
    const q = query(
      collection(db, 'challenges'),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Erro ao buscar desafios:', err);
    return [];
  }
}

/* ====================================================
   UTILS
==================================================== */

// Formata timestamp do Firestore para data legível
export function formatTimestamp(timestamp) {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return 'agora mesmo';
  if (mins < 60) return `há ${mins} minuto${mins > 1 ? 's' : ''}`;
  if (hours < 24) return `há ${hours} hora${hours > 1 ? 's' : ''}`;
  if (days < 7) return `há ${days} dia${days > 1 ? 's' : ''}`;
  return date.toLocaleDateString('pt-BR');
}