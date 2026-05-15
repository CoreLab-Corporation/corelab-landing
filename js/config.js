/* ==================================================== // Início do bloco de cabeçalho
   CONFIG.JS — CoreLab // Título do arquivo de configurações
   Configurações centralizadas da aplicação. // Descrição do propósito do arquivo
   Altere aqui para ajustar comportamentos globais. // Instrução para modificações
==================================================== */ // Fim do bloco de cabeçalho

/* ==================================================== // Cabeçalho da seção de Ambiente
   AMBIENTE // Título da seção
==================================================== */ // Fim do cabeçalho da seção
export const ENV = {
  // Exporta objeto de constantes de ambiente
  isDev: ["localhost", "127.0.0.1"].includes(location.hostname), // Verifica se está em ambiente de desenvolvimento
  isProd: !["localhost", "127.0.0.1"].includes(location.hostname), // Verifica se está em ambiente de produção
  version: "1.0.0", // Versão atual do aplicativo
  appName: "CoreLab", // Nome do aplicativo
}; // Fim do objeto ENV

/* ==================================================== // Cabeçalho da seção Firebase
   FIREBASE // Título da seção
==================================================== */ // Fim do cabeçalho da seção
export const FIREBASE = {
  // Exporta constantes relacionadas ao Firebase
  projectId: "corelab-app-ecfd5", // ID do projeto no Firebase
  sdkVersion: "10.7.1", // Versão do SDK utilizada
  // Coleções do Firestore // Comentário sobre o mapeamento de coleções
  collections: {
    // Objeto com nomes das coleções no banco de dados
    users: "users", // Coleção de usuários
    leads: "leads", // Coleção de interessados (leads)
    workouts: "workouts", // Coleção de treinos
    body: "body_measurements", // Coleção de medidas corporais
    sleep: "sleep_records", // Coleção de registros de sono
    nutrition: "nutrition_records", // Coleção de registros de nutrição
    cardio: "cardio_records", // Coleção de registros de cardio
    goals: "goals", // Coleção de metas
    chat: "chat_history", // Coleção de histórico do chat
    posts: "community_posts", // Coleção de postagens da comunidade
    communities: "communities", // Coleção de comunidades
    challenges: "challenges", // Coleção de desafios
  }, // Fim do mapeamento de coleções
}; // Fim do objeto FIREBASE

/* ==================================================== // Cabeçalho da seção de IA
   API — ANTHROPIC (Coach IA) // Título da seção e provedor
==================================================== */ // Fim do cabeçalho da seção
export const AI = {
  // Exporta configurações da Inteligência Artificial
  model: "claude-sonnet-4-20250514", // Modelo da Anthropic utilizado
  maxTokens: 1000, // Limite máximo de tokens na resposta
  maxWords: 350, // Limite máximo sugerido de palavras
  maxHistory: 30, // Número máximo de mensagens mantidas no contexto
  endpoint: "https://api.anthropic.com/v1/messages", // URL do endpoint da API
}; // Fim do objeto AI

/* ==================================================== // Cabeçalho da seção de Limites
   LIMITES DE CONTEÚDO // Título da seção
==================================================== */ // Fim do cabeçalho da seção
export const LIMITS = {
  // Exporta limites de caracteres e paginação
  postMaxChars: 1000, // Máximo de caracteres em um post
  communityNameMaxChars: 60, // Máximo de caracteres no nome da comunidade
  communityDescMaxChars: 300, // Máximo de caracteres na descrição da comunidade
  nameMaxChars: 80, // Máximo de caracteres para nomes de usuário
  notesMaxChars: 500, // Máximo de caracteres para notas/observações
  // Paginação // Comentário sobre limites de exibição por página
  postsPerPage: 20, // Posts por página na comunidade
  workoutsPerPage: 30, // Treinos por página
  chatHistoryMax: 30, // Limite de mensagens no histórico carregado
  measurementsMax: 20, // Limite de medições exibidas
  sleepRecordsMax: 14, // Limite de registros de sono
  nutritionRecordsMax: 14, // Limite de registros de nutrição
  cardioRecordsMax: 20, // Limite de registros de cardio
}; // Fim do objeto LIMITS

/* ==================================================== // Cabeçalho da seção de Gamificação
   XP & GAMIFICAÇÃO // Título da seção
==================================================== */ // Fim do cabeçalho da seção
export const GAMIFICATION = {
  // Exporta regras de experiência e níveis
  xpPerWorkout: 100, // XP ganho por cada treino registrado
  xpPerPost: 10, // XP ganho por cada postagem
  xpPerLike: 2, // XP ganho por cada curtida recebida/dada
  xpPerGoalComplete: 500, // XP ganho ao completar uma meta
  xpPerLevel: 1000, // Base de XP necessária para subir de nível
  levels: [
    // Lista de níveis e suas propriedades
    { min: 0, label: "Iniciante", color: "#888" }, // Nível 1: Inicial
    { min: 1000, label: "Atleta", color: "#4ECDC4" }, // Nível 2: Atleta
    { min: 5000, label: "Competidor", color: "#FF8C42" }, // Nível 3: Competidor
    { min: 10000, label: "Elite", color: "#9B5DE5" }, // Nível 4: Elite
    { min: 25000, label: "Lendário", color: "#FFD700" }, // Nível 5: Lendário
  ], // Fim da lista de níveis
  getLevelInfo(xp) {
    // Método para calcular o nível atual baseado no XP
    const lvls = this.levels; // Referência à lista de níveis
    for (let i = lvls.length - 1; i >= 0; i--) {
      // Itera do nível mais alto para o mais baixo
      if (xp >= lvls[i].min) return { ...lvls[i], number: i + 1 }; // Retorna info se atingiu o XP mín
    } // Fim do loop
    return { ...lvls[0], number: 1 }; // Retorna o primeiro nível por padrão
  }, // Fim do método getLevelInfo
}; // Fim do objeto GAMIFICATION

/* ==================================================== // Cabeçalho da seção de UI/UX
   UI / UX // Título da seção
==================================================== */ // Fim do cabeçalho da seção
export const UI = {
  // Exporta configurações de interface e experiência
  splashDuration: 2800, // Duração da tela de splash em milissegundos
  splashTagInterval: 900, // Intervalo entre as tags na splash screen
  carouselInterval: 5000, // Intervalo de troca do carrossel
  toastDuration: 3000, // Duração das notificações toast
  welcomeAutoDismiss: 5000, // Tempo para dispensar mensagem de boas-vindas
  animationEase: "cubic-bezier(.16,1,.3,1)", // Curva de animação padrão
  // Breakpoints // Comentário sobre pontos de quebra para responsividade
  breakpoints: {
    // Larguras de tela para dispositivos
    mobile: 480, // Limite para celular
    tablet: 768, // Limite para tablet
    desktop: 1024, // Limite para computador
  }, // Fim dos breakpoints
  // Temas // Comentário sobre esquemas de cores
  themes: {
    // Definição das cores para cada tema
    dark: {
      // Esquema Escuro
      bg: "#080808", // Cor de fundo
      green: "#00FF87", // Cor de destaque verde
      text: "#f0f0f0", // Cor do texto
    }, // Fim do tema dark
    light: {
      // Esquema Claro
      bg: "#f5f5f0", // Cor de fundo
      green: "#00FF87", // Cor de destaque verde
      text: "#0a0a0a", // Cor do texto
    }, // Fim do tema light
  }, // Fim dos temas
}; // Fim do objeto UI

/* ==================================================== // Cabeçalho da seção de I18N
   INTERNACIONALIZAÇÃO // Título da seção
==================================================== */ // Fim do cabeçalho da seção
export const I18N = {
  // Exporta configurações de tradução e idiomas
  defaultLang: "pt", // Idioma padrão: Português
  supportedLangs: ["pt", "en", "es"], // Idiomas suportados (PT, EN, ES)
  storageKey: "corelab_lang", // Chave usada no localStorage para salvar o idioma
}; // Fim do objeto I18N

/* ==================================================== // Cabeçalho da seção de Sessão
   SESSÃO // Título da seção
==================================================== */ // Fim do cabeçalho da seção
export const SESSION = {
  // Exporta configurações de tempo de sessão do usuário
  timeoutMs: 8 * 60 * 60 * 1000, // Tempo de expiração: 8 horas em ms
  checkIntervalMs: 5 * 60 * 1000, // Intervalo de verificação: 5 minutos em ms
  storageKey: "corelab_session", // Chave usada no localStorage para a sessão
}; // Fim do objeto SESSION

/* ==================================================== // Cabeçalho da seção de Analytics
   ANALYTICS (preparado — sem implementação ainda) // Título da seção
==================================================== */ // Fim do cabeçalho da seção
export const ANALYTICS = {
  // Exporta mapeamento de eventos para análise de dados
  enabled: ENV.isProd, // Habilitado apenas em ambiente de produção
  events: {
    // Dicionário de nomes de eventos rastreáveis
    LOGIN: "user_login", // Evento de login
    REGISTER: "user_register", // Evento de cadastro
    WORKOUT_SAVED: "workout_saved", // Evento de treino salvo
    POST_CREATED: "post_created", // Evento de criação de post
    COMMUNITY_CREATED: "community_created", // Evento de criação de comunidade
    COMMUNITY_JOINED: "community_joined", // Evento de entrada em comunidade
    EARLY_ACCESS: "early_access_signup", // Evento de inscrição antecipada
    CHAT_MESSAGE: "chat_message_sent", // Evento de envio de mensagem no chat
  }, // Fim do dicionário de eventos
}; // Fim do objeto ANALYTICS

/* ==================================================== // Cabeçalho da seção de Rotas
   ROTAS // Título da seção
==================================================== */ // Fim do cabeçalho da seção
export const ROUTES = {
  // Exporta mapeamento de páginas do sistema
  home: "index.html", // Página inicial/landing
  dashboard: "dashboard.html", // Página do dashboard principal
  chatbot: "chatbot.html", // Página do assistente IA
  community: "comunidade.html", // Página da comunidade social
  // Rotas protegidas — requerem autenticação // Comentário sobre segurança
  protected: ["dashboard.html", "chatbot.html", "comunidade.html"], // Lista de páginas protegidas
  isProtected(page) {
    // Método para verificar se uma página exige login
    return this.protected.some((p) => page.includes(p)); // Retorna verdadeiro se a página está na lista
  }, // Fim do método isProtected
}; // Fim do objeto ROUTES

/* ==================================================== // Cabeçalho da seção de Logger
   LOG — desativado em produção // Título da seção
==================================================== */ // Fim do cabeçalho da seção
export const logger = {
  // Exporta utilitário de logs para o console
  log: (...args) => ENV.isDev && console.log("[CoreLab]", ...args), // Registra log se estiver em desenvolvimento
  warn: (...args) => ENV.isDev && console.warn("[CoreLab]", ...args), // Registra aviso se estiver em desenvolvimento
  error: (...args) => console.error("[CoreLab ERROR]", ...args), // Sempre registra erros no console
  info: (...args) => ENV.isDev && console.info("[CoreLab]", ...args), // Registra info se estiver em desenvolvimento
}; // Fim do objeto logger
