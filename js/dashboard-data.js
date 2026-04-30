/* ====================================================
   DASHBOARD-DATA.JS — CoreLab
   Gerencia entrada, leitura e atualização em tempo real
   de todos os dados do usuário no dashboard.
==================================================== */

import { db } from './firebase-config.js';
import {
  doc, collection, addDoc, setDoc, getDoc,
  getDocs, updateDoc, onSnapshot, query,
  orderBy, limit, serverTimestamp, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ====================================================
   SALVAR TREINO
==================================================== */
export async function saveWorkoutEntry(userId, data) {
  try {
    // Salva sessão de treino
    await addDoc(
      collection(db, 'workouts', userId, 'sessions'), {
        name:        data.name     || 'Treino',
        duration:    Number(data.duration)  || 0,
        volume:      Number(data.volume)    || 0,
        calories:    Number(data.calories)  || 0,
        exercises:   data.exercises || [],
        notes:       data.notes    || '',
        completedAt: serverTimestamp()
      }
    );

    // Atualiza contadores no perfil do usuário
    const userRef = doc(db, 'users', userId);
    const snap    = await getDoc(userRef);
    const profile = snap.data() || {};

    await updateDoc(userRef, {
      totalWorkouts: (profile.totalWorkouts || 0) + 1,
      streak:        (profile.streak        || 0) + 1,
      xp:            (profile.xp            || 0) + 100,
      updatedAt:     serverTimestamp()
    });

    return { success: true };
  } catch (err) {
    console.error('Erro ao salvar treino:', err);
    return { success: false, error: err.message };
  }
}

/* ====================================================
   BUSCAR TREINOS — tempo real
==================================================== */
export function subscribeWorkouts(userId, callback, limitCount = 30) {
  const q = query(
    collection(db, 'workouts', userId, 'sessions'),
    orderBy('completedAt', 'desc'),
    limit(limitCount)
  );
  return onSnapshot(q, snap => {
    const workouts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(workouts);
  });
}

/* ====================================================
   SALVAR MEDIDA CORPORAL
==================================================== */
export async function saveBodyMeasurement(userId, data) {
  try {
    await addDoc(
      collection(db, 'body_measurements', userId, 'entries'), {
        weight:    Number(data.weight)    || 0,  // kg
        fatPct:    Number(data.fatPct)    || 0,  // %
        waist:     Number(data.waist)     || 0,  // cm
        chest:     Number(data.chest)     || 0,  // cm
        biceps:    Number(data.biceps)    || 0,  // cm
        thigh:     Number(data.thigh)     || 0,  // cm
        recordedAt: serverTimestamp()
      }
    );
    return { success: true };
  } catch (err) {
    console.error('Erro ao salvar medida:', err);
    return { success: false, error: err.message };
  }
}

/* ====================================================
   BUSCAR MEDIDAS — tempo real
==================================================== */
export function subscribeBodyMeasurements(userId, callback, limitCount = 20) {
  const q = query(
    collection(db, 'body_measurements', userId, 'entries'),
    orderBy('recordedAt', 'asc'),
    limit(limitCount)
  );
  return onSnapshot(q, snap => {
    const entries = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(entries);
  });
}

/* ====================================================
   SALVAR REGISTRO DE SONO
==================================================== */
export async function saveSleepEntry(userId, data) {
  try {
    await addDoc(
      collection(db, 'sleep_records', userId, 'entries'), {
        hours:     Number(data.hours)     || 0,
        quality:   Number(data.quality)   || 5,  // 1-10
        bedtime:   data.bedtime   || '',
        wakeTime:  data.wakeTime  || '',
        recordedAt: serverTimestamp()
      }
    );
    return { success: true };
  } catch (err) {
    console.error('Erro ao salvar sono:', err);
    return { success: false, error: err.message };
  }
}

/* ====================================================
   BUSCAR SONO — tempo real
==================================================== */
export function subscribeSleepRecords(userId, callback, limitCount = 14) {
  const q = query(
    collection(db, 'sleep_records', userId, 'entries'),
    orderBy('recordedAt', 'asc'),
    limit(limitCount)
  );
  return onSnapshot(q, snap => {
    const entries = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(entries);
  });
}

/* ====================================================
   SALVAR NUTRIÇÃO DO DIA
==================================================== */
export async function saveNutritionEntry(userId, data) {
  try {
    await addDoc(
      collection(db, 'nutrition_records', userId, 'entries'), {
        calories:  Number(data.calories)  || 0,
        protein:   Number(data.protein)   || 0,  // g
        carbs:     Number(data.carbs)     || 0,  // g
        fats:      Number(data.fats)      || 0,  // g
        water:     Number(data.water)     || 0,  // ml
        recordedAt: serverTimestamp()
      }
    );
    return { success: true };
  } catch (err) {
    console.error('Erro ao salvar nutrição:', err);
    return { success: false, error: err.message };
  }
}

/* ====================================================
   BUSCAR NUTRIÇÃO — tempo real
==================================================== */
export function subscribeNutritionRecords(userId, callback, limitCount = 14) {
  const q = query(
    collection(db, 'nutrition_records', userId, 'entries'),
    orderBy('recordedAt', 'asc'),
    limit(limitCount)
  );
  return onSnapshot(q, snap => {
    const entries = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(entries);
  });
}

/* ====================================================
   SALVAR / ATUALIZAR META
==================================================== */
export async function saveGoal(userId, goalId, data) {
  try {
    await setDoc(
      doc(db, 'goals', userId, 'items', goalId), {
        name:      data.name      || '',
        icon:      data.icon      || '🎯',
        current:   Number(data.current)  || 0,
        target:    Number(data.target)   || 100,
        unit:      data.unit      || '',
        deadline:  data.deadline  || '',
        color:     data.color     || 'var(--green)',
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
    return { success: true };
  } catch (err) {
    console.error('Erro ao salvar meta:', err);
    return { success: false, error: err.message };
  }
}

/* ====================================================
   BUSCAR METAS — tempo real
==================================================== */
export function subscribeGoals(userId, callback) {
  const q = collection(db, 'goals', userId, 'items');
  return onSnapshot(q, snap => {
    const goals = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(goals);
  });
}

/* ====================================================
   DELETAR META
==================================================== */
export async function deleteGoal(userId, goalId) {
  try {
    await deleteDoc(doc(db, 'goals', userId, 'items', goalId));
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/* ====================================================
   BUSCAR PERFIL — tempo real
==================================================== */
export function subscribeProfile(userId, callback) {
  return onSnapshot(doc(db, 'users', userId), snap => {
    if (snap.exists()) callback(snap.data());
  });
}

/* ====================================================
   ATUALIZAR PERFIL
==================================================== */
export async function updateUserProfile(userId, data) {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/* ====================================================
   SALVAR DADO DE CARDIO
==================================================== */
export async function saveCardioEntry(userId, data) {
  try {
    await addDoc(
      collection(db, 'cardio_records', userId, 'entries'), {
        type:       data.type       || 'HIIT',  // HIIT, LISS, Corrida etc
        duration:   Number(data.duration)  || 0,  // min
        calories:   Number(data.calories)  || 0,
        avgHr:      Number(data.avgHr)     || 0,  // bpm
        maxHr:      Number(data.maxHr)     || 0,
        distance:   Number(data.distance)  || 0,  // km
        vo2est:     Number(data.vo2est)    || 0,
        recordedAt: serverTimestamp()
      }
    );
    return { success: true };
  } catch (err) {
    console.error('Erro ao salvar cardio:', err);
    return { success: false, error: err.message };
  }
}

/* ====================================================
   BUSCAR CARDIO — tempo real
==================================================== */
export function subscribeCardioRecords(userId, callback, limitCount = 20) {
  const q = query(
    collection(db, 'cardio_records', userId, 'entries'),
    orderBy('recordedAt', 'asc'),
    limit(limitCount)
  );
  return onSnapshot(q, snap => {
    const entries = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(entries);
  });
}

/* ====================================================
   UTILS — Formata timestamp
==================================================== */
export function formatDate(timestamp) {
  if (!timestamp) return '—';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

export function formatDateFull(timestamp) {
  if (!timestamp) return '—';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('pt-BR');
}

export function timeAgo(timestamp) {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const now  = new Date();
  const diff = now - date;
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins  < 1)  return 'agora mesmo';
  if (mins  < 60) return `há ${mins}min`;
  if (hours < 24) return `há ${hours}h`;
  if (days  < 7)  return `há ${days}d`;
  return date.toLocaleDateString('pt-BR');
}