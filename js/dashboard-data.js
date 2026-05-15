/* ==================================================== // Início do bloco de cabeçalho do dashboard-data
   DASHBOARD-DATA.JS — CoreLab // Título do arquivo de dados do dashboard
   Gerencia entrada, leitura e atualização em tempo real. // Descrição das funcionalidades principais
   Ordenação feita no CLIENTE para evitar índices compostos. // Nota técnica sobre performance e Firestore
==================================================== */ // Fim do bloco de cabeçalho

// Importa a instância do banco de dados (db) do arquivo de configuração
import { db } from "./firebase-config.js";
// Início da importação de métodos essenciais do SDK do Firestore
import {
  doc, // Função para referenciar um documento único
  collection, // Função para referenciar uma coleção de documentos
  addDoc, // Função para criar um novo documento com ID automático
  setDoc, // Função para definir os dados de um documento específico
  getDoc, // Função para buscar os dados de um documento
  updateDoc, // Função para atualizar campos específicos de um documento
  onSnapshot, // Função para ouvir atualizações em tempo real
  query, // Função para construir consultas
  serverTimestamp, // Função para registrar o horário do servidor
  deleteDoc, // Função para remover um documento permanentemente
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"; // URL do SDK do Firestore

/* ==================================================== // Cabeçalho da seção de utilitários internos
   UTILS INTERNOS // Título da seção
==================================================== */ // Fim do cabeçalho da seção
// Função auxiliar para ordenar arrays por data no cliente (evita necessidade de índices no Firebase)
function sortByDate(arr, field, asc = true) {
  // Declaração da função de ordenação auxiliar
  return [...arr].sort((a, b) => {
    // Cria uma cópia e ordena o array
    // Converte para Date nativo do JS, lidando com timestamps do Firestore ou strings
    const da = a[field]?.toDate ? a[field].toDate() : new Date(a[field] || 0);
    const db_ = b[field]?.toDate ? b[field].toDate() : new Date(b[field] || 0);
    // Retorna a comparação para ordenação crescente ou decrescente
    return asc ? da - db_ : db_ - da;
  }); // Fim do método sort
} // Fim da função sortByDate

/* ==================================================== // Cabeçalho da seção de Treinos
   TREINOS // Título da seção
==================================================== */ // Fim do cabeçalho da seção
// Função assíncrona para salvar um novo registro de sessão de treino
export async function saveWorkoutEntry(userId, data) {
  // Exporta função para salvar entrada de treino
  try {
    // Início do bloco de tratamento de erro
    // Adiciona o treino na subcoleção de sessões do usuário
    await addDoc(collection(db, "workouts", userId, "sessions"), {
      name: data.name || "Treino", // Nome do treino ou padrão
      duration: Number(data.duration) || 0, // Duração em minutos
      volume: Number(data.volume) || 0, // Volume total de carga
      calories: Number(data.calories) || 0, // Estimativa de calorias
      exercises: data.exercises || [], // Lista de exercícios realizados
      notes: data.notes || "", // Observações adicionais
      completedAt: serverTimestamp(), // Data de conclusão pelo servidor
    }); // Fim da adição do documento
    // Atualiza estatísticas e XP no perfil do usuário
    const userRef = doc(db, "users", userId); // Referência ao documento do usuário
    const snap = await getDoc(userRef); // Busca o estado atual do perfil
    const profile = snap.exists() ? snap.data() : {}; // Obtém dados ou objeto vazio
    await updateDoc(userRef, {
      // Realiza a atualização dos contadores
      totalWorkouts: (profile.totalWorkouts || 0) + 1, // Incrementa total de treinos
      streak: (profile.streak || 0) + 1, // Incrementa a sequência atual
      xp: (profile.xp || 0) + 100, // Adiciona 100 pontos de experiência
      updatedAt: serverTimestamp(), // Marca o tempo da última alteração
    }); // Fim da atualização do perfil
    return { success: true }; // Retorna sucesso
  } catch (err) {
    // Captura falhas no processo
    console.error("Erro ao salvar treino:", err); // Log de erro no console
    return { success: false, error: err.message }; // Retorna o erro detalhado
  } // Fim do bloco try-catch
} // Fim da função saveWorkoutEntry

// Função para se inscrever nas atualizações da lista de treinos
export function subscribeWorkouts(userId, callback) {
  // Exporta função para assinar treinos
  // Configura a referência para a subcoleção de treinos
  const ref = collection(db, "workouts", userId, "sessions");
  return onSnapshot(
    // Inicia o monitoramento em tempo real
    ref, // Referência monitorada
    (snap) => {
      // Callback para cada mudança de dados
      // Processa e ordena os treinos no cliente de forma decrescente (mais novos primeiro)
      const workouts = sortByDate(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })), // Mapeia documentos
        "completedAt", // Campo de ordenação
        false, // Ordem decrescente
      ); // Fim da ordenação
      callback(workouts); // Envia a lista ordenada para a interface
    }, // Fim do callback de snapshot
    (err) => console.error("subscribeWorkouts erro:", err), // Log de erro no stream
  ); // Retorna função de cancelamento da inscrição
} // Fim da função subscribeWorkouts

/* ==================================================== // Cabeçalho da seção de Medidas Corporais
   MEDIDAS CORPORAIS // Título da seção
==================================================== */ // Fim do cabeçalho da seção
// Função assíncrona para salvar um novo registro de medidas corporais
export async function saveBodyMeasurement(userId, data) {
  // Exporta função para salvar medidas corporais
  try {
    // Início do bloco de tratamento de erro
    // Adiciona o registro na subcoleção de entradas de medidas do usuário
    await addDoc(collection(db, "body_measurements", userId, "entries"), {
      weight: Number(data.weight) || 0, // Peso em kg
      fatPct: Number(data.fatPct) || 0, // Percentual de gordura
      waist: Number(data.waist) || 0, // Medida da cintura em cm
      chest: Number(data.chest) || 0, // Medida do tórax em cm
      biceps: Number(data.biceps) || 0, // Medida do bíceps em cm
      thigh: Number(data.thigh) || 0, // Medida da coxa em cm
      recordedAt: serverTimestamp(), // Data do registro pelo servidor
    }); // Fim da adição
    return { success: true }; // Retorna sucesso
  } catch (err) {
    // Captura erros ao salvar
    console.error("Erro ao salvar medida:", err); // Log de erro no console
    return { success: false, error: err.message }; // Retorna erro
  } // Fim do bloco try-catch
} // Fim da função saveBodyMeasurement

// Função para se inscrever nas atualizações de medidas corporais
export function subscribeBodyMeasurements(userId, callback) {
  // Exporta função para assinar medidas
  // Referência para a coleção de medidas
  const ref = collection(db, "body_measurements", userId, "entries");
  return onSnapshot(
    // Inicia o listener
    ref, // Coleção monitorada
    (snap) => {
      // Callback de dados
      // Ordena as medidas no cliente de forma crescente para exibição em gráficos
      const entries = sortByDate(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })), // Mapeia documentos
        "recordedAt", // Campo de ordenação
        true, // Ordem crescente (asc)
      ); // Fim da ordenação
      callback(entries); // Envia dados para o gráfico/interface
    }, // Fim do callback
    (err) => console.error("subscribeBody erro:", err), // Log de erro no stream
  ); // Retorna função para parar o listener
} // Fim da função subscribeBodyMeasurements

/* ==================================================== // Cabeçalho da seção de Sono
   SONO // Título da seção
==================================================== */ // Fim do cabeçalho da seção
// Função assíncrona para salvar um novo registro diário de sono
export async function saveSleepEntry(userId, data) {
  // Exporta função para salvar registro de sono
  try {
    // Início do bloco de tratamento de erro
    // Adiciona o registro na subcoleção de sono do usuário
    await addDoc(collection(db, "sleep_records", userId, "entries"), {
      hours: Number(data.hours) || 0, // Total de horas dormidas
      quality: Number(data.quality) || 5, // Qualidade do sono (1 a 10)
      bedtime: data.bedtime || "", // Horário que foi para a cama
      wakeTime: data.wakeTime || "", // Horário que acordou
      recordedAt: serverTimestamp(), // Data do registro pelo servidor
    }); // Fim da adição
    return { success: true }; // Retorna sucesso
  } catch (err) {
    // Captura falhas ao salvar
    console.error("Erro ao salvar sono:", err); // Log de erro
    return { success: false, error: err.message }; // Retorna erro
  } // Fim do bloco try-catch
} // Fim da função saveSleepEntry

// Função para se inscrever nas atualizações de registros de sono
export function subscribeSleepRecords(userId, callback) {
  // Exporta função para assinar registros de sono
  // Referência para os registros de sono
  const ref = collection(db, "sleep_records", userId, "entries");
  return onSnapshot(
    // Ativa monitoramento
    ref, // Referência
    (snap) => {
      // Dados recebidos
      // Ordena de forma crescente no cliente
      const entries = sortByDate(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })), // Mapeia docs
        "recordedAt", // Ordena por data
        true, // Crescente
      ); // Fim da ordenação
      callback(entries); // Retorna lista para a UI
    }, // Fim do callback
    (err) => console.error("subscribeSleep erro:", err), // Log de erro
  ); // Retorna unsubscribe
} // Fim da função subscribeSleepRecords

/* ==================================================== // Cabeçalho da seção de Nutrição
   NUTRIÇÃO // Título da seção
==================================================== */ // Fim do cabeçalho da seção
// Função assíncrona para salvar o consumo nutricional diário
export async function saveNutritionEntry(userId, data) {
  // Exporta função para salvar registro de nutrição
  try {
    // Início do bloco de tratamento de erro
    // Adiciona o registro na subcoleção de nutrição do usuário
    await addDoc(collection(db, "nutrition_records", userId, "entries"), {
      calories: Number(data.calories) || 0, // Total de calorias consumidas
      protein: Number(data.protein) || 0, // Proteínas em gramas
      carbs: Number(data.carbs) || 0, // Carboidratos em gramas
      fats: Number(data.fats) || 0, // Gorduras em gramas
      water: Number(data.water) || 0, // Água em ml
      recordedAt: serverTimestamp(), // Data do registro (servidor)
    }); // Fim da adição
    return { success: true }; // Retorna sucesso
  } catch (err) {
    // Captura erros no salvamento
    console.error("Erro ao salvar nutrição:", err); // Log de erro
    return { success: false, error: err.message }; // Retorna falha
  } // Fim do bloco try-catch
} // Fim da função saveNutritionEntry

// Função para se inscrever nas atualizações de nutrição
export function subscribeNutritionRecords(userId, callback) {
  // Exporta função para assinar nutrição
  // Referência aos dados de nutrição
  const ref = collection(db, "nutrition_records", userId, "entries");
  return onSnapshot(
    // Listener em tempo real
    ref, // Referência
    (snap) => {
      // Dados processados
      // Ordena por data crescente para visualização histórica
      const entries = sortByDate(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })), // Mapeia docs
        "recordedAt", // Ordena por data
        true, // Crescente
      ); // Fim da ordenação
      callback(entries); // Envia para a interface
    }, // Fim do callback
    (err) => console.error("subscribeNutrition erro:", err), // Log de erro
  ); // Retorna desligamento
} // Fim da função subscribeNutritionRecords

/* ==================================================== // Cabeçalho da seção de Cardio
   CARDIO // Título da seção
==================================================== */ // Fim do cabeçalho da seção
// Função assíncrona para salvar uma atividade de cardio realizada
export async function saveCardioEntry(userId, data) {
  // Exporta função para salvar registro de cardio
  try {
    // Início do bloco de tratamento de erro
    // Adiciona o registro na subcoleção de cardio do usuário
    await addDoc(collection(db, "cardio_records", userId, "entries"), {
      type: data.type || "HIIT", // Tipo do exercício (Corrida, HIIT, etc)
      duration: Number(data.duration) || 0, // Duração em minutos
      calories: Number(data.calories) || 0, // Calorias estimadas
      avgHr: Number(data.avgHr) || 0, // Frequência cardíaca média
      maxHr: Number(data.maxHr) || 0, // Frequência cardíaca máxima
      distance: Number(data.distance) || 0, // Distância percorrida em km
      recordedAt: serverTimestamp(), // Data do registro (servidor)
    }); // Fim da adição
    return { success: true }; // Retorna sucesso
  } catch (err) {
    // Captura falhas ao salvar
    console.error("Erro ao salvar cardio:", err); // Log de erro
    return { success: false, error: err.message }; // Retorna erro
  } // Fim do bloco try-catch
} // Fim da função saveCardioEntry

// Função para se inscrever nas atualizações de cardio
export function subscribeCardioRecords(userId, callback) {
  // Exporta função para assinar registros de cardio
  // Referência para os registros de cardio
  const ref = collection(db, "cardio_records", userId, "entries");
  return onSnapshot(
    // Escuta mudanças
    ref, // Coleção
    (snap) => {
      // Callback
      // Ordena de forma crescente no cliente
      const entries = sortByDate(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })), // Mapeia documentos
        "recordedAt", // Ordena por data
        true, // Crescente
      ); // Fim da ordenação
      callback(entries); // Envia resultados para a UI
    }, // Fim do callback
    (err) => console.error("subscribeCardio erro:", err), // Log de erro
  ); // Retorna unsubscribe
} // Fim da função subscribeCardioRecords

/* ==================================================== // Cabeçalho da seção de Metas
   METAS // Título da seção para objetivos pessoais
==================================================== */ // Fim do cabeçalho da seção
// Função assíncrona para salvar ou atualizar uma meta específica
export async function saveGoal(userId, goalId, data) {
  // Exporta função para salvar meta
  try {
    // Início do bloco de tratamento de erro
    // Salva ou atualiza (merge) o documento da meta específica
    await setDoc(
      doc(db, "goals", userId, "items", goalId), // Caminho da meta
      {
        name: data.name || "", // Nome do objetivo
        icon: data.icon || "🎯", // Ícone visual da meta
        current: Number(data.current) || 0, // Valor atual atingido
        target: Number(data.target) || 100, // Valor alvo final
        unit: data.unit || "", // Unidade de medida (kg, %, dias, etc)
        deadline: data.deadline || "", // Data limite para conclusão
        color: data.color || "var(--green)", // Cor de exibição na UI
        updatedAt: serverTimestamp(), // Marca horário da atualização
      },
      { merge: true }, // Garante que campos não informados sejam mantidos
    ); // Fim da gravação
    return { success: true }; // Retorna sucesso
  } catch (err) {
    // Captura falhas na gravação da meta
    console.error("Erro ao salvar meta:", err); // Log de erro no console
    return { success: false, error: err.message }; // Retorna erro
  } // Fim do bloco try-catch
} // Fim da função saveGoal

// Função para se inscrever na lista de metas do usuário
export function subscribeGoals(userId, callback) {
  // Exporta função para assinar metas
  // Referência para a coleção de metas do usuário
  const ref = collection(db, "goals", userId, "items");
  return onSnapshot(
    // Listener de metas
    ref, // Coleção monitorada
    (snap) => {
      // Dados das metas
      const goals = snap.docs.map((d) => ({ id: d.id, ...d.data() })); // Mapeia lista de metas
      callback(goals); // Envia lista para a interface
    }, // Fim do callback
    (err) => console.error("subscribeGoals erro:", err), // Log de erro
  ); // Retorna função de interrupção
} // Fim da função subscribeGoals

// Função assíncrona para excluir uma meta do usuário
export async function deleteGoal(userId, goalId) {
  // Exporta função para deletar meta
  try {
    // Início do bloco de tratamento de erro
    // Remove permanentemente o documento da meta no Firestore
    await deleteDoc(doc(db, "goals", userId, "items", goalId));
    return { success: true }; // Retorna confirmação de exclusão
  } catch (err) {
    // Captura erros na deleção
    return { success: false, error: err.message }; // Retorna falha
  } // Fim do bloco try-catch
} // Fim da função deleteGoal

/* ==================================================== // Cabeçalho da seção de Perfil em tempo real
   PERFIL — tempo real // Título da seção para dados do usuário
==================================================== */ // Fim do cabeçalho da seção
// Função para monitorar mudanças no perfil do usuário em tempo real
export function subscribeProfile(userId, callback) {
  // Exporta função para assinar perfil
  return onSnapshot(
    // Inicia escuta no documento do usuário
    doc(db, "users", userId), // Caminho do documento de perfil
    (snap) => {
      // Quando dados mudam
      if (snap.exists()) callback(snap.data()); // Envia dados do perfil se existir
    }, // Fim do callback
    (err) => console.error("subscribeProfile erro:", err), // Log de erro
  ); // Retorna unsubscribe
} // Fim da função subscribeProfile

// Função assíncrona para atualizar os dados básicos de perfil do usuário
export async function updateUserProfile(userId, data) {
  // Exporta função para atualizar perfil
  try {
    // Início do bloco de tratamento de erro
    // Atualiza campos informados no documento do usuário
    await updateDoc(doc(db, "users", userId), {
      ...data, // Espalha novos valores sobre o documento
      updatedAt: serverTimestamp(), // Marca data de modificação no servidor
    }); // Fim da atualização
    return { success: true }; // Retorna sucesso
  } catch (err) {
    // Captura falhas na atualização de perfil
    return { success: false, error: err.message }; // Retorna erro detalhado
  } // Fim do bloco try-catch
} // Fim da função updateUserProfile

/* ==================================================== // Cabeçalho da seção de utilitários de data
   UTILS — formatação de data // Título da seção
==================================================== */ // Fim do cabeçalho da seção
// Função para formatar um timestamp em data curta (DD/MM)
export function formatDate(timestamp) {
  // Exporta função para formatar data (curta)
  if (!timestamp) return "—"; // Retorna traço se nulo
  // Converte timestamp para Date nativo
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }); // Retorna string formatada
} // Fim da função formatDate

// Função para formatar um timestamp em data completa padrão brasileiro
export function formatDateFull(timestamp) {
  // Exporta função para formatar data (completa)
  if (!timestamp) return "—"; // Retorna traço se nulo
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp); // Converte para Date
  return date.toLocaleDateString("pt-BR"); // Retorna DD/MM/AAAA
} // Fim da função formatDateFull

// Função para converter uma data em uma string relativa amigável (ex: há 2h)
export function timeAgo(timestamp) {
  // Exporta função para tempo decorrido
  if (!timestamp) return ""; // Retorna vazio se nulo
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp); // Converte para Date
  const now = new Date(); // Horário atual
  const diff = now - date; // Diferença em milissegundos
  const mins = Math.floor(diff / 60000); // Diferença em minutos
  const hours = Math.floor(diff / 3600000); // Diferença em horas
  const days = Math.floor(diff / 86400000); // Diferença em dias
  if (mins < 1) return "agora mesmo"; // Se menos de 1 minuto
  if (mins < 60) return `há ${mins}min`; // Se menos de 1 hora, mostra minutos
  if (hours < 24) return `há ${hours}h`; // Se menos de 1 dia, mostra horas
  if (days < 7) return `há ${days}d`; // Se menos de 1 semana, mostra dias
  return date.toLocaleDateString("pt-BR"); // Caso contrário, mostra data fixa
} // Fim da função timeAgo
