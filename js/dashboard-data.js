/* ==================================================== // Início do bloco de cabeçalho do dashboard-data
   DASHBOARD-DATA.JS — CoreLab // Título do arquivo de dados do dashboard
   Gerencia entrada, leitura e atualização em tempo real.
   Com suporte a Modo Convidado (Demo) redirecionando para LocalStorage.
==================================================== */

// Importa a instância do banco de dados (db) e autenticação (auth) do arquivo de configuração
import { db, auth } from "./firebase-config.js";
import { DEMO_DATA } from "./demoData.js";

// Início da importação de métodos essenciais do SDK do Firestore
import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  query,
  serverTimestamp,
  deleteDoc,
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
          } else if (k === 'completedAt' || k === 'recordedAt' || k === 'updatedAt') {
            if (typeof newItem[k] === 'string') {
              const dateVal = new Date(newItem[k]);
              newItem[k] = { toDate: () => dateVal };
            }
          }
        }
        return newItem;
      });
    } catch (e) {
      console.error("Erro ao ler dados locais:", e);
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
      console.error("Erro ao ler perfil local:", e);
    }
  }
  localStorage.setItem(key, JSON.stringify(defaultProfile));
  return defaultProfile;
}

// Helper para salvar perfil local
function saveLocalProfile(key, profile) {
  localStorage.setItem(key, JSON.stringify(profile));
}

// Registro de listeners reativos locais
const guestListeners = {
  profile: [],
  workouts: [],
  measurements: [],
  sleep: [],
  nutrition: [],
  cardio: [],
  goals: []
};

// Dispara atualizações para todos os callbacks inscritos localmente
function triggerGuestListener(type, data) {
  if (guestListeners[type]) {
    guestListeners[type].forEach(cb => {
      try { cb(data); } catch(e) { console.error("Erro no callback local:", e); }
    });
  }
}

/* ====================================================
   UTILS INTERNOS
==================================================== */
// Função auxiliar para ordenar arrays por data no cliente
function sortByDate(arr, field, asc = true) {
  return [...arr].sort((a, b) => {
    const da = a[field]?.toDate ? a[field].toDate() : new Date(a[field] || 0);
    const db_ = b[field]?.toDate ? b[field].toDate() : new Date(b[field] || 0);
    return asc ? da - db_ : db_ - da;
  });
}

/* ====================================================
   TREINOS
==================================================== */
// Salva um novo registro de sessão de treino
export async function saveWorkoutEntry(userId, data) {
  if (checkGuest()) {
    const key = `corelab_demo_workouts_${userId}`;
    const workouts = getLocalData(key, DEMO_DATA.workouts);
    
    const newWorkout = {
      id: "demo_w_" + Date.now(),
      name: data.name || "Treino",
      duration: Number(data.duration) || 0,
      volume: Number(data.volume) || 0,
      calories: Number(data.calories) || 0,
      exercises: data.exercises || [],
      notes: data.notes || "",
      completedAt: { toDate: () => new Date() }
    };
    
    workouts.unshift(newWorkout); // Adiciona no início (mais novo primeiro)
    saveLocalData(key, workouts);
    triggerGuestListener("workouts", workouts);

    // Atualiza estatísticas do perfil localmente
    const profileKey = `corelab_demo_profile_${userId}`;
    const profile = getLocalProfile(profileKey, DEMO_DATA.userProfile);
    profile.totalWorkouts = (profile.totalWorkouts || 0) + 1;
    profile.streak = (profile.streak || 0) + 1;
    profile.xp = (profile.xp || 0) + 100;
    saveLocalProfile(profileKey, profile);
    triggerGuestListener("profile", profile);

    return { success: true };
  }

  try {
    await addDoc(collection(db, "workouts", userId, "sessions"), {
      name: data.name || "Treino",
      duration: Number(data.duration) || 0,
      volume: Number(data.volume) || 0,
      calories: Number(data.calories) || 0,
      exercises: data.exercises || [],
      notes: data.notes || "",
      completedAt: serverTimestamp(),
    });
    
    // Atualiza estatísticas e XP no perfil do usuário
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    const profile = snap.exists() ? snap.data() : {};
    await updateDoc(userRef, {
      totalWorkouts: (profile.totalWorkouts || 0) + 1,
      streak: (profile.streak || 0) + 1,
      xp: (profile.xp || 0) + 100,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (err) {
    console.error("Erro ao salvar treino:", err);
    return { success: false, error: err.message };
  }
}

// Se inscreve nas atualizações da lista de treinos
export function subscribeWorkouts(userId, callback) {
  if (checkGuest()) {
    const workouts = getLocalData(`corelab_demo_workouts_${userId}`, DEMO_DATA.workouts);
    setTimeout(() => callback(workouts), 10); // Chamada assíncrona simulada
    
    guestListeners.workouts.push(callback);
    return () => {
      guestListeners.workouts = guestListeners.workouts.filter(cb => cb !== callback);
    };
  }

  const ref = collection(db, "workouts", userId, "sessions");
  return onSnapshot(
    ref,
    (snap) => {
      const workouts = sortByDate(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })),
        "completedAt",
        false,
      );
      callback(workouts);
    },
    (err) => console.error("subscribeWorkouts erro:", err),
  );
}

/* ====================================================
   MEDIDAS CORPORAIS
==================================================== */
// Salva um novo registro de medidas corporais
export async function saveBodyMeasurement(userId, data) {
  if (checkGuest()) {
    const key = `corelab_demo_measurements_${userId}`;
    const entries = getLocalData(key, DEMO_DATA.measurements);
    
    const newEntry = {
      id: "demo_m_" + Date.now(),
      weight: Number(data.weight) || 0,
      fatPct: Number(data.fatPct) || 0,
      waist: Number(data.waist) || 0,
      chest: Number(data.chest) || 0,
      biceps: Number(data.biceps) || 0,
      thigh: Number(data.thigh) || 0,
      recordedAt: { toDate: () => new Date() }
    };
    
    entries.push(newEntry);
    saveLocalData(key, entries);
    triggerGuestListener("measurements", entries);
    return { success: true };
  }

  try {
    await addDoc(collection(db, "body_measurements", userId, "entries"), {
      weight: Number(data.weight) || 0,
      fatPct: Number(data.fatPct) || 0,
      waist: Number(data.waist) || 0,
      chest: Number(data.chest) || 0,
      biceps: Number(data.biceps) || 0,
      thigh: Number(data.thigh) || 0,
      recordedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (err) {
    console.error("Erro ao salvar medida:", err);
    return { success: false, error: err.message };
  }
}

// Se inscreve nas atualizações de medidas corporais
export function subscribeBodyMeasurements(userId, callback) {
  if (checkGuest()) {
    const entries = getLocalData(`corelab_demo_measurements_${userId}`, DEMO_DATA.measurements);
    setTimeout(() => callback(entries), 10);
    
    guestListeners.measurements.push(callback);
    return () => {
      guestListeners.measurements = guestListeners.measurements.filter(cb => cb !== callback);
    };
  }

  const ref = collection(db, "body_measurements", userId, "entries");
  return onSnapshot(
    ref,
    (snap) => {
      const entries = sortByDate(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })),
        "recordedAt",
        true,
      );
      callback(entries);
    },
    (err) => console.error("subscribeBody erro:", err),
  );
}

/* ====================================================
   SONO
==================================================== */
// Salva um novo registro diário de sono
export async function saveSleepEntry(userId, data) {
  if (checkGuest()) {
    const key = `corelab_demo_sleep_${userId}`;
    const entries = getLocalData(key, DEMO_DATA.sleep);
    
    const newEntry = {
      id: "demo_s_" + Date.now(),
      hours: Number(data.hours) || 0,
      quality: Number(data.quality) || 5,
      bedtime: data.bedtime || "",
      wakeTime: data.wakeTime || "",
      recordedAt: { toDate: () => new Date() }
    };
    
    entries.push(newEntry);
    saveLocalData(key, entries);
    triggerGuestListener("sleep", entries);
    return { success: true };
  }

  try {
    await addDoc(collection(db, "sleep_records", userId, "entries"), {
      hours: Number(data.hours) || 0,
      quality: Number(data.quality) || 5,
      bedtime: data.bedtime || "",
      wakeTime: data.wakeTime || "",
      recordedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (err) {
    console.error("Erro ao salvar sono:", err);
    return { success: false, error: err.message };
  }
}

// Se inscreve nas atualizações de registros de sono
export function subscribeSleepRecords(userId, callback) {
  if (checkGuest()) {
    const entries = getLocalData(`corelab_demo_sleep_${userId}`, DEMO_DATA.sleep);
    setTimeout(() => callback(entries), 10);
    
    guestListeners.sleep.push(callback);
    return () => {
      guestListeners.sleep = guestListeners.sleep.filter(cb => cb !== callback);
    };
  }

  const ref = collection(db, "sleep_records", userId, "entries");
  return onSnapshot(
    ref,
    (snap) => {
      const entries = sortByDate(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })),
        "recordedAt",
        true,
      );
      callback(entries);
    },
    (err) => console.error("subscribeSleep erro:", err),
  );
}

/* ====================================================
   NUTRIÇÃO
==================================================== */
// Salva o consumo nutricional diário
export async function saveNutritionEntry(userId, data) {
  if (checkGuest()) {
    const key = `corelab_demo_nutrition_${userId}`;
    const entries = getLocalData(key, DEMO_DATA.nutrition);
    
    const newEntry = {
      id: "demo_n_" + Date.now(),
      calories: Number(data.calories) || 0,
      protein: Number(data.protein) || 0,
      carbs: Number(data.carbs) || 0,
      fats: Number(data.fats) || 0,
      water: Number(data.water) || 0,
      recordedAt: { toDate: () => new Date() }
    };
    
    entries.push(newEntry);
    saveLocalData(key, entries);
    triggerGuestListener("nutrition", entries);
    return { success: true };
  }

  try {
    await addDoc(collection(db, "nutrition_records", userId, "entries"), {
      calories: Number(data.calories) || 0,
      protein: Number(data.protein) || 0,
      carbs: Number(data.carbs) || 0,
      fats: Number(data.fats) || 0,
      water: Number(data.water) || 0,
      recordedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (err) {
    console.error("Erro ao salvar nutrição:", err);
    return { success: false, error: err.message };
  }
}

// Se inscreve nas atualizações de nutrição
export function subscribeNutritionRecords(userId, callback) {
  if (checkGuest()) {
    const entries = getLocalData(`corelab_demo_nutrition_${userId}`, DEMO_DATA.nutrition);
    setTimeout(() => callback(entries), 10);
    
    guestListeners.nutrition.push(callback);
    return () => {
      guestListeners.nutrition = guestListeners.nutrition.filter(cb => cb !== callback);
    };
  }

  const ref = collection(db, "nutrition_records", userId, "entries");
  return onSnapshot(
    ref,
    (snap) => {
      const entries = sortByDate(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })),
        "recordedAt",
        true,
      );
      callback(entries);
    },
    (err) => console.error("subscribeNutrition erro:", err),
  );
}

/* ====================================================
   CARDIO
==================================================== */
// Salva uma atividade de cardio realizada
export async function saveCardioEntry(userId, data) {
  if (checkGuest()) {
    const key = `corelab_demo_cardio_${userId}`;
    const entries = getLocalData(key, DEMO_DATA.cardio);
    
    const newEntry = {
      id: "demo_c_" + Date.now(),
      type: data.type || "HIIT",
      duration: Number(data.duration) || 0,
      calories: Number(data.calories) || 0,
      avgHr: Number(data.avgHr) || 0,
      maxHr: Number(data.maxHr) || 0,
      distance: Number(data.distance) || 0,
      recordedAt: { toDate: () => new Date() }
    };
    
    entries.push(newEntry);
    saveLocalData(key, entries);
    triggerGuestListener("cardio", entries);
    return { success: true };
  }

  try {
    await addDoc(collection(db, "cardio_records", userId, "entries"), {
      type: data.type || "HIIT",
      duration: Number(data.duration) || 0,
      calories: Number(data.calories) || 0,
      avgHr: Number(data.avgHr) || 0,
      maxHr: Number(data.maxHr) || 0,
      distance: Number(data.distance) || 0,
      recordedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (err) {
    console.error("Erro ao salvar cardio:", err);
    return { success: false, error: err.message };
  }
}

// Se inscreve nas atualizações de cardio
export function subscribeCardioRecords(userId, callback) {
  if (checkGuest()) {
    const entries = getLocalData(`corelab_demo_cardio_${userId}`, DEMO_DATA.cardio);
    setTimeout(() => callback(entries), 10);
    
    guestListeners.cardio.push(callback);
    return () => {
      guestListeners.cardio = guestListeners.cardio.filter(cb => cb !== callback);
    };
  }

  const ref = collection(db, "cardio_records", userId, "entries");
  return onSnapshot(
    ref,
    (snap) => {
      const entries = sortByDate(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })),
        "recordedAt",
        true,
      );
      callback(entries);
    },
    (err) => console.error("subscribeCardio erro:", err),
  );
}

/* ====================================================
   METAS
==================================================== */
// Salva ou atualiza uma meta específica
export async function saveGoal(userId, goalId, data) {
  if (checkGuest()) {
    const key = `corelab_demo_goals_${userId}`;
    const goals = getLocalData(key, DEMO_DATA.goals);
    
    const existingIndex = goals.findIndex(g => g.id === goalId);
    const updatedGoal = {
      id: goalId || "demo_g_" + Date.now(),
      name: data.name || "",
      icon: data.icon || "🎯",
      current: Number(data.current) || 0,
      target: Number(data.target) || 100,
      unit: data.unit || "",
      deadline: data.deadline || "",
      color: data.color || "var(--green)",
      updatedAt: { toDate: () => new Date() }
    };
    
    if (existingIndex > -1) {
      goals[existingIndex] = { ...goals[existingIndex], ...updatedGoal };
    } else {
      goals.push(updatedGoal);
    }
    
    saveLocalData(key, goals);
    triggerGuestListener("goals", goals);
    return { success: true };
  }

  try {
    await setDoc(
      doc(db, "goals", userId, "items", goalId),
      {
        name: data.name || "",
        icon: data.icon || "🎯",
        current: Number(data.current) || 0,
        target: Number(data.target) || 100,
        unit: data.unit || "",
        deadline: data.deadline || "",
        color: data.color || "var(--green)",
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
    return { success: true };
  } catch (err) {
    console.error("Erro ao salvar meta:", err);
    return { success: false, error: err.message };
  }
}

// Se inscreve na lista de metas do usuário
export function subscribeGoals(userId, callback) {
  if (checkGuest()) {
    const goals = getLocalData(`corelab_demo_goals_${userId}`, DEMO_DATA.goals);
    setTimeout(() => callback(goals), 10);
    
    guestListeners.goals.push(callback);
    return () => {
      guestListeners.goals = guestListeners.goals.filter(cb => cb !== callback);
    };
  }

  const ref = collection(db, "goals", userId, "items");
  return onSnapshot(
    ref,
    (snap) => {
      const goals = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      callback(goals);
    },
    (err) => console.error("subscribeGoals erro:", err),
  );
}

// Exclui uma meta do usuário
export async function deleteGoal(userId, goalId) {
  if (checkGuest()) {
    const key = `corelab_demo_goals_${userId}`;
    let goals = getLocalData(key, DEMO_DATA.goals);
    goals = goals.filter(g => g.id !== goalId);
    saveLocalData(key, goals);
    triggerGuestListener("goals", goals);
    return { success: true };
  }

  try {
    await deleteDoc(doc(db, "goals", userId, "items", goalId));
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/* ====================================================
   PERFIL — TEMPO REAL
==================================================== */
// Monitora mudanças no perfil do usuário em tempo real
export function subscribeProfile(userId, callback) {
  if (checkGuest()) {
    const key = `corelab_demo_profile_${userId}`;
    const profile = getLocalProfile(key, DEMO_DATA.userProfile);
    setTimeout(() => callback(profile), 10);
    
    guestListeners.profile.push(callback);
    return () => {
      guestListeners.profile = guestListeners.profile.filter(cb => cb !== callback);
    };
  }

  return onSnapshot(
    doc(db, "users", userId),
    (snap) => {
      if (snap.exists()) callback(snap.data());
    },
    (err) => console.error("subscribeProfile erro:", err),
  );
}

// Atualiza os dados básicos de perfil do usuário
export async function updateUserProfile(userId, data) {
  if (checkGuest()) {
    const key = `corelab_demo_profile_${userId}`;
    const profile = getLocalProfile(key, DEMO_DATA.userProfile);
    const updated = { ...profile, ...data, updatedAt: new Date().toISOString() };
    saveLocalProfile(key, updated);
    triggerGuestListener("profile", updated);
    return { success: true };
  }

  try {
    await updateDoc(doc(db, "users", userId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/* ====================================================
   UTILS — FORMATAÇÃO DE DATA
==================================================== */
// Formata um timestamp em data curta (DD/MM)
export function formatDate(timestamp) {
  if (!timestamp) return "—";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

// Formata um timestamp em data completa padrão brasileiro
export function formatDateFull(timestamp) {
  if (!timestamp) return "—";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("pt-BR");
}

// Converte uma data em uma string relativa amigável (ex: há 2h)
export function timeAgo(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "agora mesmo";
  if (mins < 60) return `há ${mins}min`;
  if (hours < 24) return `há ${hours}h`;
  if (days < 7) return `há ${days}d`;
  return date.toLocaleDateString("pt-BR");
}
