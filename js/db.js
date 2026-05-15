/* ==================================================== // Início do bloco de cabeçalho do banco de dados
   DB.JS — Operações Firestore CoreLab // Título do arquivo de operações do Firestore
   Versão corrigida: // Lista de melhorias na versão atual
   - Sem orderBy nas queries (evita índices compostos) // Remoção de ordenação no servidor
   - Ordenação feita no cliente // Implementação de ordenação via JavaScript no navegador
   - getWorkoutHistory corrigido // Ajuste na recuperação do histórico de treinos
   - clearChatHistory com deleteDoc importado corretamente // Correção na limpeza de chat
   - getChatHistory sem orderBy // Remoção de ordenação no servidor para o chat
==================================================== */ // Fim do bloco de cabeçalho

// Importa instâncias de db (Firestore) e auth (Autenticação) do arquivo de configuração <!-- Comentário: Importação de instâncias de configuração -->
import { db, auth } from "./firebase-config.js"; // Importa instâncias do Firebase
// Início da importação de métodos e ferramentas do SDK do Firebase Firestore <!-- Comentário: Início das importações do Firestore -->
import {
  // Inicia bloco de importação do Firestore
  doc, // Função para referenciar um documento específico
  setDoc, // Função para criar ou sobrescrever um documento
  getDoc, // Função para buscar um documento
  updateDoc, // Função para atualizar campos de um documento
  addDoc, // Função para adicionar um novo documento com ID automático
  collection, // Função para referenciar uma coleção
  query, // Função para criar uma consulta
  where, // Função para filtrar documentos em uma consulta
  getDocs, // Função para buscar múltiplos documentos de uma coleção ou consulta
  deleteDoc, // Função para deletar um documento
  serverTimestamp, // Função para obter o timestamp do servidor do Google
  arrayUnion, // Função para adicionar elementos únicos a um array
  arrayRemove, // Função para remover elementos de um array
  increment, // Função para incrementar/decrementar valores numéricos no servidor
  onSnapshot, // Função para ouvir mudanças em tempo real no banco de dados
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"; // URL do SDK do Firestore <!-- Comentário: Fim das importações do Firestore -->

/* ==================================================== // Cabeçalho da seção de utilitários internos
   UTILS INTERNOS // Título da seção
==================================================== */ // Fim do cabeçalho da seção

// Função auxiliar para ordenar arrays por data no lado do cliente
function sortByDate(arr, field, asc = true) {
  // Declaração da função de ordenação por data
  return [...arr].sort((a, b) => {
    // Cria uma cópia e ordena o array
    // Converte o campo de data para objeto Date, tratando timestamps do Firestore ou strings
    const da = a[field]?.toDate ? a[field].toDate() : new Date(a[field] || 0);
    const db_ = b[field]?.toDate ? b[field].toDate() : new Date(b[field] || 0);
    // Retorna a diferença para ordenação crescente ou decrescente
    return asc ? da - db_ : db_ - da;
  }); // Fim do método sort
} // Fim da função sortByDate

/* ==================================================== // Cabeçalho da seção de usuários
   USUÁRIOS // Título da seção
==================================================== */ // Fim do cabeçalho da seção

// Função assíncrona para criar o perfil do usuário no Firestore após o cadastro
export async function createUserProfile(uid, data) {
  // Exporta função para criar perfil de usuário
  try {
    // Início do bloco de tratamento de erro
    // Define os dados iniciais do perfil do usuário no documento correspondente ao seu UID
    await setDoc(doc(db, "users", uid), {
      uid, // UID único do usuário
      name: data.name || "", // Nome do usuário
      email: data.email || "", // Email do usuário
      photoURL: data.photoURL || "", // URL da foto do perfil
      level: "Iniciante", // Nível inicial de gamificação
      goal: "Hipertrofia", // Objetivo padrão de treino
      daysPerWeek: "4 dias", // Frequência padrão de treinos
      xp: 0, // Pontuação inicial de experiência
      streak: 0, // Dias seguidos de treino (inicial)
      totalWorkouts: 0, // Total de treinos realizados (inicial)
      createdAt: serverTimestamp(), // Data de criação do perfil (servidor)
      updatedAt: serverTimestamp(), // Data de última atualização (servidor)
    }); // Fim da definição do documento
    console.log("Perfil criado com sucesso!"); // Log de confirmação no console
  } catch (err) {
    // Captura erros na criação do perfil
    console.error("Erro ao criar perfil:", err); // Log de erro no console
    throw err; // Lança o erro para quem chamou a função
  } // Fim do bloco try-catch
} // Fim da função createUserProfile

// Função assíncrona para buscar os dados do perfil de um usuário pelo UID
export async function getUserProfile(uid) {
  // Exporta função para buscar perfil de usuário
  try {
    // Início do bloco de tratamento de erro
    const ref = doc(db, "users", uid); // Cria referência ao documento do usuário
    const snap = await getDoc(ref); // Realiza a busca do documento no Firestore
    if (snap.exists()) return snap.data(); // Se o documento existir, retorna os dados
    return null; // Caso contrário, retorna nulo
  } catch (err) {
    // Captura falhas na busca
    console.error("Erro ao buscar perfil:", err); // Log de erro no console
    throw err; // Lança o erro
  } // Fim do bloco try-catch
} // Fim da função getUserProfile

// Função assíncrona para atualizar campos específicos do perfil do usuário
export async function updateUserProfile(uid, data) {
  // Exporta função para atualizar perfil de usuário
  try {
    // Início do bloco de tratamento de erro
    // Atualiza o documento do usuário com os novos dados e marca o tempo da atualização
    await updateDoc(doc(db, "users", uid), {
      ...data, // Espalha os novos dados sobre o objeto de atualização
      updatedAt: serverTimestamp(), // Define a nova data de atualização no servidor
    }); // Fim da atualização
  } catch (err) {
    // Captura erros na atualização
    console.error("Erro ao atualizar perfil:", err); // Log de erro no console
    throw err; // Lança o erro
  } // Fim do bloco try-catch
} // Fim da função updateUserProfile

/* ==================================================== // Cabeçalho da seção de Leads
   LEADS — EARLY ACCESS // Título da seção para interessados na fase inicial
==================================================== */ // Fim do cabeçalho da seção

// Função assíncrona para salvar o email de um interessado no Early Access
export async function saveEarlyAccessLead(email) {
  // Exporta função para salvar lead de acesso antecipado
  try {
    // Início do bloco de tratamento de erro
    // Cria uma consulta para verificar se o email já está cadastrado na coleção de leads
    const q = query(collection(db, "leads"), where("email", "==", email));
    const existing = await getDocs(q); // Busca documentos que atendam ao critério
    if (!existing.empty) {
      // Se a busca não estiver vazia, o email já existe
      return { success: true, alreadyExists: true }; // Retorna que já existe sem salvar novamente
    } // Fim da verificação

    // Adiciona um novo documento na coleção de leads com os dados do interessado
    await addDoc(collection(db, "leads"), {
      email, // Email fornecido
      origin: "early_access", // Origem do cadastro
      status: "pending", // Status inicial do lead
      createdAt: serverTimestamp(), // Data de criação (servidor)
    }); // Fim da adição do lead

    return { success: true, alreadyExists: false }; // Retorna sucesso na gravação
  } catch (err) {
    // Captura falhas ao salvar lead
    console.error("Erro ao salvar lead:", err); // Log de erro no console
    throw err; // Lança o erro
  } // Fim do bloco try-catch
} // Fim da função saveEarlyAccessLead

// Função assíncrona para obter o número total de leads cadastrados
export async function getLeadsCount() {
  // Exporta função para contar total de leads
  try {
    // Início do bloco de tratamento de erro
    const snap = await getDocs(collection(db, "leads")); // Busca todos os documentos na coleção leads
    return snap.size; // Retorna o tamanho da coleção (número de documentos)
  } catch (err) {
    // Captura erros na contagem
    console.error("Erro ao contar leads:", err); // Log de erro no console
    return 0; // Em caso de erro, retorna zero
  } // Fim do bloco try-catch
} // Fim da função getLeadsCount

/* ==================================================== // Cabeçalho da seção de treinos
   TREINOS // Título da seção
==================================================== */ // Fim do cabeçalho da seção

// Função assíncrona para salvar os dados de uma sessão de treino realizada
export async function saveWorkout(userId, workout) {
  // Exporta função para salvar sessão de treino
  try {
    // Início do bloco de tratamento de erro
    // Adiciona um novo documento na subcoleção de sessões do usuário específico
    await addDoc(collection(db, "workouts", userId, "sessions"), {
      name: workout.name || "Treino", // Nome do treino
      duration: workout.duration || 0, // Duração do treino
      volume: workout.volume || 0, // Volume de carga
      calories: workout.calories || 0, // Calorias gastas
      exercises: workout.exercises || [], // Lista de exercícios realizados
      notes: workout.notes || "", // Observações do treino
      completedAt: serverTimestamp(), // Data de conclusão (servidor)
    }); // Fim da adição do treino

    // Atualiza estatísticas do usuário no documento principal (gamificação)
    await updateDoc(doc(db, "users", userId), {
      totalWorkouts: increment(1), // Aumenta o contador de treinos totais
      streak: increment(1), // Aumenta a sequência de dias treinados
      xp: increment(100), // Concede 100 pontos de XP pelo treino
      updatedAt: serverTimestamp(), // Atualiza a data de última modificação
    }); // Fim da atualização de estatísticas
  } catch (err) {
    // Captura erros ao salvar treino
    console.error("Erro ao salvar treino:", err); // Log de erro no console
    throw err; // Lança o erro
  } // Fim do bloco try-catch
} // Fim da função saveWorkout

// Função assíncrona para buscar o histórico de treinos de um usuário
export async function getWorkoutHistory(userId, limitCount = 10) {
  // Exporta função para buscar histórico de treinos
  try {
    // Início do bloco de tratamento de erro
    const ref = collection(db, "workouts", userId, "sessions"); // Referência à coleção de treinos
    const snap = await getDocs(ref); // Busca os documentos de treinos

    // Ordena os treinos pela data de conclusão de forma decrescente no cliente
    const workouts = sortByDate(
      snap.docs.map((d) => ({ id: d.id, ...d.data() })), // Mapeia documentos para objetos JS
      "completedAt", // Campo usado para ordenação
      false, // Define ordem decrescente (false = desc)
    ); // Fim da ordenação

    return workouts.slice(0, limitCount); // Retorna os treinos limitados pela quantidade desejada
  } catch (err) {
    // Captura erros na busca do histórico
    console.error("Erro ao buscar treinos:", err); // Log de erro no console
    return []; // Retorna array vazio em caso de falha
  } // Fim do bloco try-catch
} // Fim da função getWorkoutHistory

/* ==================================================== // Cabeçalho da seção de histórico de chat
   CHAT HISTORY — IA // Título da seção para conversas com o Coach IA
==================================================== */ // Fim do cabeçalho da seção

// Função assíncrona para salvar uma mensagem enviada ou recebida do chat
export async function saveChatMessage(userId, message) {
  // Exporta função para salvar mensagem de chat
  try {
    // Início do bloco de tratamento de erro
    // Adiciona a mensagem na subcoleção de mensagens do histórico de chat do usuário
    await addDoc(collection(db, "chat_history", userId, "messages"), {
      role: message.role, // Papel do emissor (usuário ou assistente)
      content: message.content, // Conteúdo textual da mensagem
      createdAt: serverTimestamp(), // Data de envio (servidor)
    }); // Fim da adição da mensagem
  } catch (err) {
    // Captura falhas ao salvar mensagem
    console.error("Erro ao salvar mensagem:", err); // Log de erro no console
  } // Fim do bloco try-catch
} // Fim da função saveChatMessage

// Função assíncrona para buscar o histórico de mensagens de chat de um usuário
export async function getChatHistory(userId, limitCount = 20) {
  // Exporta função para buscar histórico de mensagens
  try {
    // Início do bloco de tratamento de erro
    const ref = collection(db, "chat_history", userId, "messages"); // Referência às mensagens do chat
    const snap = await getDocs(ref); // Busca as mensagens no banco de dados

    // Ordena as mensagens por data de criação de forma crescente no cliente
    const messages = sortByDate(
      snap.docs.map((d) => ({ id: d.id, ...d.data() })), // Mapeia para objetos JS
      "createdAt", // Campo de ordenação
      true, // Define ordem crescente (true = asc) para manter fluxo de diálogo
    ); // Fim da ordenação

    return messages.slice(0, limitCount); // Retorna as mensagens limitadas pela quantidade
  } catch (err) {
    // Captura falhas na recuperação do chat
    console.error("Erro ao buscar histórico:", err); // Log de erro no console
    return []; // Retorna array vazio em caso de erro
  } // Fim do bloco try-catch
} // Fim da função getChatHistory

// Função assíncrona para apagar todo o histórico de chat de um usuário
export async function clearChatHistory(userId) {
  // Exporta função para limpar histórico de chat
  try {
    // Início do bloco de tratamento de erro
    const ref = collection(db, "chat_history", userId, "messages"); // Referência às mensagens do chat
    const snap = await getDocs(ref); // Busca todas as mensagens atuais
    // Cria uma lista de promessas de deleção para cada documento encontrado
    const deletes = snap.docs.map((d) =>
      deleteDoc(doc(db, "chat_history", userId, "messages", d.id)),
    ); // Fim do mapeamento de deleções
    await Promise.all(deletes); // Aguarda que todas as deleções sejam concluídas
  } catch (err) {
    // Captura erros na limpeza do chat
    console.error("Erro ao limpar histórico:", err); // Log de erro no console
  } // Fim do bloco try-catch
} // Fim da função clearChatHistory

/* ==================================================== // Cabeçalho da seção de posts da comunidade
   COMUNIDADE — POSTS // Título da seção para o feed social
==================================================== */ // Fim do cabeçalho da seção

// Função assíncrona para criar uma nova postagem na comunidade
export async function createPost(userId, postData) {
  // Exporta função para criar nova postagem
  try {
    // Início do bloco de tratamento de erro
    const userProfile = await getUserProfile(userId); // Busca o perfil atual para obter o nome
    // Adiciona o post na coleção global de postagens da comunidade
    const ref = await addDoc(collection(db, "community_posts"), {
      userId, // UID do autor do post
      userName: userProfile?.name || "Usuário", // Nome do autor
      userInitials: (userProfile?.name || "U").substring(0, 2).toUpperCase(), // Iniciais para o avatar
      text: postData.text, // Conteúdo do post
      type: postData.type || "text", // Tipo de post (texto, treino, etc)
      workout: postData.workout || null, // Dados vinculados de treino, se houver
      likes: [], // Lista inicial de IDs que curtiram (vazia)
      likesCount: 0, // Contador inicial de curtidas (zero)
      commentsCount: 0, // Contador inicial de comentários (zero)
      createdAt: serverTimestamp(), // Data de publicação (servidor)
    }); // Fim da criação do post
    return ref.id; // Retorna o ID gerado para o novo post
  } catch (err) {
    // Captura erros na criação da postagem
    console.error("Erro ao criar post:", err); // Log de erro no console
    throw err; // Lança o erro
  } // Fim do bloco try-catch
} // Fim da função createPost

// Função para se inscrever em atualizações em tempo real dos posts da comunidade
export function subscribeToPosts(callback, limitCount = 20) {
  // Exporta função para assinar atualizações de posts
  const ref = collection(db, "community_posts"); // Referência à coleção de posts
  return onSnapshot(
    // Ativa o listener de mudanças em tempo real
    ref, // Coleção monitorada
    (snap) => {
      // Callback acionado a cada mudança no banco
      // Processa e ordena os posts recebidos pela data mais recente
      const posts = sortByDate(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })), // Mapeia documentos
        "createdAt", // Campo de ordenação
        false, // Decrescente (mais novos primeiro)
      ).slice(0, limitCount); // Aplica o limite de exibição
      callback(posts); // Envia os posts processados para a interface
    }, // Fim do processamento do snapshot
    (err) => console.error("subscribeToPosts erro:", err), // Callback para erros no stream
  ); // Retorna a função de unsubscribe
} // Fim da função subscribeToPosts

// Função assíncrona para alternar a curtida de um usuário em um post
export async function toggleLikePost(postId, userId) {
  // Exporta função para curtir/descurtir post
  try {
    // Início do bloco de tratamento de erro
    const ref = doc(db, "community_posts", postId); // Referência ao documento do post
    const snap = await getDoc(ref); // Busca o estado atual do post
    if (!snap.exists()) return false; // Retorna falso se o post não for encontrado

    const post = snap.data(); // Obtém os dados do post
    const liked = post.likes?.includes(userId); // Verifica se o usuário já curtiu o post

    // Realiza a atualização atômica de curtidas no servidor
    await updateDoc(ref, {
      // Remove o UID se já curtiu, ou adiciona se ainda não curtiu
      likes: liked ? arrayRemove(userId) : arrayUnion(userId),
      // Decrementa se já curtiu, ou incrementa se não curtiu
      likesCount: increment(liked ? -1 : 1),
    }); // Fim da atualização atômica

    return !liked; // Retorna o novo estado da curtida (true se agora está curtido)
  } catch (err) {
    // Captura falhas na operação de curtir
    console.error("Erro ao curtir post:", err); // Log de erro no console
    return false; // Retorna falso em caso de falha
  } // Fim do bloco try-catch
} // Fim da função toggleLikePost

/* ==================================================== // Cabeçalho da seção de desafios
   DESAFIOS // Título da seção para metas coletivas
==================================================== */ // Fim do cabeçalho da seção

// Função assíncrona para inscrever um usuário em um desafio específico
export async function joinChallenge(challengeId, userId) {
  // Exporta função para participar de desafio
  try {
    // Início do bloco de tratamento de erro
    const ref = doc(db, "challenges", challengeId); // Referência ao documento do desafio
    // Atualiza o desafio adicionando o participante e aumentando o contador
    await updateDoc(ref, {
      participants: arrayUnion(userId), // Adiciona o UID do usuário na lista de participantes
      participantsCount: increment(1), // Aumenta o número total de participantes
    }); // Fim da atualização
  } catch (err) {
    // Captura erros na inscrição
    console.error("Erro ao participar do desafio:", err); // Log de erro no console
    throw err; // Lança o erro
  } // Fim do bloco try-catch
} // Fim da função joinChallenge

// Função assíncrona para listar todos os desafios disponíveis
export async function getChallenges() {
  // Exporta função para buscar todos os desafios
  try {
    // Início do bloco de tratamento de erro
    const ref = collection(db, "challenges"); // Referência à coleção global de desafios
    const snap = await getDocs(ref); // Busca todos os desafios no banco

    // Ordena os desafios por data de criação (mais recentes primeiro) no cliente
    return sortByDate(
      snap.docs.map((d) => ({ id: d.id, ...d.data() })), // Mapeia documentos
      "createdAt", // Campo de ordenação
      false, // Decrescente (desc)
    ); // Fim da ordenação
  } catch (err) {
    // Captura erros na busca de desafios
    console.error("Erro ao buscar desafios:", err); // Log de erro no console
    return []; // Retorna lista vazia em caso de erro
  } // Fim do bloco try-catch
} // Fim da função getChallenges

/* ==================================================== // Cabeçalho da seção de utilitários gerais
   UTILS // Título da seção
==================================================== */ // Fim do cabeçalho da seção

// Função para formatar um timestamp do Firestore em uma string de tempo decorrido legível
export function formatTimestamp(timestamp) {
  // Exporta função para formatar timestamp do Firestore
  if (!timestamp) return ""; // Retorna vazio se não houver timestamp
  // Converte o timestamp para objeto Date nativo do JS
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date(); // Obtém o horário atual
  const diff = now - date; // Calcula a diferença em milissegundos
  const mins = Math.floor(diff / 60000); // Converte para minutos
  const hours = Math.floor(diff / 3600000); // Converte para horas
  const days = Math.floor(diff / 86400000); // Converte para dias

  if (mins < 1) return "agora mesmo"; // Caso tenha menos de 1 minuto
  if (mins < 60) return `há ${mins} minuto${mins > 1 ? "s" : ""}`; // Caso tenha menos de 1 hora
  if (hours < 24) return `há ${hours} hora${hours > 1 ? "s" : ""}`; // Caso tenha menos de 1 dia
  if (days < 7) return `há ${days} dia${days > 1 ? "s" : ""}`; // Caso tenha menos de 1 semana
  return date.toLocaleDateString("pt-BR"); // Caso contrário, retorna a data formatada (DD/MM/AAAA)
} // Fim da função formatTimestamp
