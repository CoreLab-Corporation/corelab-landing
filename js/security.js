/* ==================================================== // Início do bloco de cabeçalho de segurança
   SECURITY.JS — CoreLab // Título do arquivo de utilitários de segurança
   Camada de segurança client-side: // Lista de responsabilidades do arquivo
   - Sanitização de inputs // Limpeza de dados inseridos pelo usuário
   - Rate limiting de ações // Controle de frequência de execuções
   - Proteção contra XSS // Prevenção de injeção de scripts maliciosos
   - Validação de dados // Verificação de integridade das informações
   - Session management // Gerenciamento de tempo de sessão
==================================================== */ // Fim do bloco de cabeçalho

/* ==================================================== // Cabeçalho da seção de Sanitização HTML
   SANITIZAÇÃO DE HTML — previne XSS // Título da seção focado em segurança web
==================================================== */ // Fim do cabeçalho da seção

/** // Início do JSDoc da função sanitizeHTML
 * Remove tags HTML perigosas e atributos de eventos. // Descrição da função
 * Use SEMPRE antes de inserir conteúdo de usuário no DOM. // Recomendação de uso
 */ // Fim do JSDoc
export function sanitizeHTML(str) {
  // Exporta função de sanitização de HTML completo
  // Exporta função que converte caracteres HTML em entidades seguras
  if (!str) return ""; // Retorna string vazia se a entrada for nula ou vazia
  return String(str) // Garante que a entrada seja tratada como string
    .replace(/&/g, "&amp;") // Substitui o caractere '&' por seu equivalente seguro
    .replace(/</g, "&lt;") // Substitui o caractere '<' por seu equivalente seguro
    .replace(/>/g, "&gt;") // Substitui o caractere '>' por seu equivalente seguro
    .replace(/"/g, "&quot;") // Substitui o caractere '"' por seu equivalente seguro
    .replace(/'/g, "&#x27;") // Substitui o caractere "'" por seu equivalente seguro
    .replace(/\//g, "&#x2F;") // Substitui o caractere '/' por seu equivalente seguro
    .replace(/`/g, "&#x60;") // Substitui o caractere '`' por seu equivalente seguro
    .replace(/=/g, "&#x3D;"); // Substitui o caractere '=' por seu equivalente seguro
} // Fim da função sanitizeHTML

/** // Início do JSDoc da função sanitizeText
 * Sanitiza texto simples preservando quebras de linha. // Descrição da funcionalidade
 */ // Fim do JSDoc
export function sanitizeText(str) {
  // Exporta função de sanitização de texto simples
  // Exporta função de limpeza de texto simples
  if (!str) return ""; // Retorna vazio se não houver string
  return String(str) // Converte para string
    .trim() // Remove espaços em branco no início e no fim
    .replace(
      // Inicia a substituição de caracteres especiais
      /[<>'"&]/g, // Regex para encontrar caracteres HTML problemáticos
      (
        c, // Função de mapeamento para cada caractere encontrado
      ) =>
        ({
          // Objeto de tradução de caracteres para entidades HTML
          "<": "&lt;", // Menor que
          ">": "&gt;", // Maior que
          "'": "&#x27;", // Aspas simples
          '"': "&quot;", // Aspas duplas
          "&": "&amp;", // E comercial
        })[c], // Retorna o valor correspondente ao caractere
    ); // Fim do replace
} // Fim da função sanitizeText

/** // Início do JSDoc da função sanitizeURL
 * Sanitiza uma URL — garante que é http/https. // Descrição da validação de protocolos
 */ // Fim do JSDoc
export function sanitizeURL(url) {
  // Exporta função de sanitização de URLs
  // Exporta função para validar URLs de links ou imagens
  if (!url) return "#"; // Retorna '#' se a URL for vazia
  try {
    // Tenta validar a estrutura da URL
    const u = new URL(url); // Cria um novo objeto URL
    if (!["http:", "https:"].includes(u.protocol)) return "#"; // Bloqueia protocolos não seguros (ex: javascript:)
    return url; // Retorna a URL original se for segura
  } catch {
    // Caso a string não seja uma URL válida
    return "#"; // Retorna '#' como fallback seguro
  } // Fim do bloco try-catch
} // Fim da função sanitizeURL

/* ==================================================== // Cabeçalho da seção de Validação
   VALIDAÇÃO DE INPUTS // Título da seção
==================================================== */ // Fim do cabeçalho da seção

export const validate = {
  // Exporta objeto contendo métodos de validação para diversos campos
  email(email) {
    // Método para validar o formato de um email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para padrão de email
    if (!email || !re.test(email.trim())) {
      // Verifica se é nulo ou não segue o padrão
      return { ok: false, msg: "Email inválido." }; // Retorna erro
    } // Fim da verificação de padrão
    if (email.length > 254) {
      // Verifica limite máximo de caracteres segundo a RFC
      return { ok: false, msg: "Email muito longo." }; // Retorna erro
    } // Fim da verificação de tamanho
    return { ok: true }; // Retorna sucesso
  }, // Fim do validador de email

  password(pass) {
    // Método para validar requisitos de senha
    if (!pass || pass.length < 6) {
      // Verifica se tem o mínimo de 6 caracteres
      return { ok: false, msg: "Senha deve ter pelo menos 6 caracteres." }; // Retorna erro
    } // Fim da verificação mínima
    if (pass.length > 128) {
      // Verifica limite máximo de segurança
      return { ok: false, msg: "Senha muito longa." }; // Retorna erro
    } // Fim da verificação máxima
    return { ok: true }; // Retorna sucesso
  }, // Fim do validador de senha

  name(name) {
    // Método para validar nomes de pessoas ou usuários
    if (!name || name.trim().length < 2) {
      // Verifica se tem ao menos 2 caracteres
      return { ok: false, msg: "Nome deve ter pelo menos 2 caracteres." }; // Retorna erro
    } // Fim da verificação mínima
    if (name.length > 80) {
      // Verifica limite máximo de caracteres
      return { ok: false, msg: "Nome muito longo (máx. 80 caracteres)." }; // Retorna erro
    } // Fim da verificação máxima
    // Regex para permitir apenas letras (incluindo acentuadas), espaços, aspas e hífens
    if (!/^[\p{L}\s'-]+$/u.test(name.trim())) {
      // Verifica caracteres permitidos
      return { ok: false, msg: "Nome contém caracteres inválidos." }; // Retorna erro
    } // Fim da verificação de caracteres
    return { ok: true }; // Retorna sucesso
  }, // Fim do validador de nome

  postText(text) {
    // Método para validar textos de postagens na comunidade
    if (!text || text.trim().length === 0) {
      // Verifica se o texto está vazio
      return { ok: false, msg: "O post não pode estar vazio." }; // Retorna erro
    } // Fim da verificação de vazio
    if (text.length > 1000) {
      // Verifica limite máximo de caracteres do post
      return { ok: false, msg: "Post muito longo (máx. 1000 caracteres)." }; // Retorna erro
    } // Fim da verificação de tamanho
    return { ok: true }; // Retorna sucesso
  }, // Fim do validador de post

  communityName(name) {
    // Método para validar o nome de novas comunidades
    if (!name || name.trim().length < 3) {
      // Verifica mínimo de 3 caracteres
      return { ok: false, msg: "Nome deve ter pelo menos 3 caracteres." }; // Retorna erro
    } // Fim da verificação mínima
    if (name.length > 60) {
      // Verifica limite máximo de caracteres
      return { ok: false, msg: "Nome muito longo (máx. 60 caracteres)." }; // Retorna erro
    } // Fim da verificação máxima
    return { ok: true }; // Retorna sucesso
  }, // Fim do validador de nome de comunidade

  // Método genérico para validar números dentro de um intervalo
  number(val, { min = 0, max = 999999, label = "Valor" } = {}) {
    const n = Number(val); // Tenta converter a entrada para número
    if (isNaN(n)) return { ok: false, msg: `${label} deve ser um número.` }; // Verifica se é um número válido
    if (n < min) return { ok: false, msg: `${label} mínimo é ${min}.` }; // Verifica valor mínimo
    if (n > max) return { ok: false, msg: `${label} máximo é ${max}.` }; // Verifica valor máximo
    return { ok: true }; // Retorna sucesso se estiver no intervalo
  }, // Fim do validador numérico
}; // Fim do objeto validate

/* ==================================================== // Cabeçalho da seção de Rate Limiter
   RATE LIMITER — previne spam de ações // Título da seção focado em controle de fluxo
==================================================== */ // Fim do cabeçalho da seção

class RateLimiter {
  // Definição da classe de controle de frequência
  // Definição da classe que controla a frequência de ações do usuário
  constructor() {
    // Método construtor da classe
    this.actions = new Map(); // Cria um mapa para armazenar os contadores de cada ação
  } // Fim do constructor

  /** // Início do JSDoc do método check
   * Verifica se uma ação pode ser executada. // Descrição do propósito
   * @param {string} key     - Identificador único da ação (ex: 'post_create') // Parâmetro chave
   * @param {number} limit   - Máximo de vezes permitidas // Parâmetro limite
   * @param {number} windowMs - Janela de tempo em ms // Parâmetro tempo
   * @returns {{ allowed: boolean, remaining: number, resetIn: number }} // Retorno do método
   */ // Fim do JSDoc
  check(key, limit = 5, windowMs = 60000) {
    // Método para validar se uma ação não está sendo repetida excessivamente
    const now = Date.now(); // Obtém o horário atual em milissegundos
    // Recupera os dados da ação ou cria um novo objeto de controle
    const data = this.actions.get(key) || { count: 0, resetAt: now + windowMs };

    // Reset se a janela de tempo expirou
    if (now > data.resetAt) {
      // Verifica se já passou o tempo de restrição
      data.count = 0; // Zera o contador de execuções
      data.resetAt = now + windowMs; // Define a próxima janela de tempo
    } // Fim da verificação de expiração

    data.count++; // Incrementa o contador de execuções
    this.actions.set(key, data); // Salva os dados atualizados no mapa

    const allowed = data.count <= limit; // Define se a ação ainda é permitida
    const remaining = Math.max(0, limit - data.count); // Calcula quantas execuções ainda restam
    const resetIn = Math.ceil((data.resetAt - now) / 1000); // Calcula em quantos segundos haverá o reset

    return { allowed, remaining, resetIn }; // Retorna o resultado da verificação
  } // Fim do método check

  /** // JSDoc do método reset
   * Reseta manualmente um contador. // Descrição
   */ // Fim do JSDoc
  reset(key) {
    // Método para forçar o reset de um rate limit específico
    this.actions.delete(key); // Remove a chave do mapa de ações
  } // Fim do método reset
} // Fim da classe RateLimiter

export const rateLimiter = new RateLimiter(); // Exporta uma instância única do RateLimiter (Singleton)

/* ==================================================== // Cabeçalho da seção de Limites Configuráveis
   LIMITES CONFIGURÁVEIS // Título da seção
==================================================== */ // Fim do cabeçalho da seção
export const RATE_LIMITS = {
  // Exporta as configurações de limite para cada tipo de ação
  login: { limit: 5, windowMs: 300000 }, // Limite de 5 tentativas de login a cada 5 minutos
  register: { limit: 3, windowMs: 3600000 }, // Limite de 3 cadastros a cada 1 hora
  postCreate: { limit: 10, windowMs: 300000 }, // Limite de 10 posts a cada 5 minutos
  likeAction: { limit: 30, windowMs: 60000 }, // Limite de 30 curtidas por minuto
  chatMessage: { limit: 20, windowMs: 60000 }, // Limite de 20 mensagens no chat por minuto
  earlyAccess: { limit: 2, windowMs: 3600000 }, // Limite de 2 inscrições no early access por hora
  communityCreate: { limit: 3, windowMs: 3600000 }, // Limite de 3 criações de comunidade por hora
  dataSave: { limit: 30, windowMs: 60000 }, // Limite de 30 salvamentos de dados (treinos, medidas) por minuto
}; // Fim do objeto RATE_LIMITS

/* ==================================================== // Cabeçalho da seção de Proteção de Conteúdo
   PROTEÇÃO CONTRA CONTEÚDO IMPRÓPRIO // Título da seção para filtragem maliciosa
==================================================== */ // Fim do cabeçalho da seção

// Lista básica de padrões (Regex) de scripts e códigos a serem bloqueados nas entradas de texto
const BLOCKED_PATTERNS = [
  // Array de expressões regulares para detecção de injeção
  /javascript:/gi, // Bloqueia protocolos javascript na URL
  /data:text\/html/gi, // Bloqueia carregamento de dados HTML inline
  /vbscript:/gi, // Bloqueia protocolos vbscript
  /<script/gi, // Bloqueia tags de script abertas
  /on\w+\s*=/gi, // Bloqueia atributos de eventos HTML (onerror=, onclick=, etc.)
  /eval\s*\(/gi, // Bloqueia execução da função eval()
  /document\.cookie/gi, // Bloqueia acesso programático aos cookies
  /window\.location/gi, // Bloqueia tentativas de redirecionamento via script
]; // Fim da lista de padrões

// Função que verifica se uma string contém algum conteúdo malicioso conhecido
export function containsMaliciousContent(str) {
  // Exporta função de detecção
  if (!str) return false; // Retorna falso se a string for vazia
  return BLOCKED_PATTERNS.some((pattern) => pattern.test(str)); // Retorna verdadeiro se algum padrão for encontrado
} // Fim da função containsMaliciousContent

/* ==================================================== // Cabeçalho da seção de Timeout de Sessão
   SESSION TIMEOUT // Título da seção para gestão de inatividade
==================================================== */ // Fim do cabeçalho da seção

const SESSION_TIMEOUT_MS = 8 * 60 * 60 * 1000; // Define o tempo limite da sessão em 8 horas (em ms)
let sessionTimer = null; // Variável para armazenar a referência do intervalo de verificação
let lastActivity = Date.now(); // Armazena o horário da última atividade detectada do usuário

/** // Início do JSDoc da função startSessionMonitor
 * Inicia o monitoramento de inatividade da sessão. // Descrição
 * Chame após o login do usuário. // Instrução de uso
 * @param {Function} onTimeout - Callback chamado ao expirar // Callback de expiração
 */ // Fim do JSDoc
export function startSessionMonitor(onTimeout) {
  // Exporta função que monitora se o usuário está ativo
  const resetTimer = () => {
    // Função interna para resetar o tempo de última atividade
    lastActivity = Date.now(); // Atualiza o timestamp da última atividade para agora
  }; // Fim da função resetTimer

  // Adiciona listeners para diversos eventos que indicam atividade do usuário no navegador
  ["mousemove", "mousedown", "keydown", "touchstart", "scroll"].forEach(
    (evt) => {
      // Itera sobre os nomes dos eventos
      window.addEventListener(evt, resetTimer, { passive: true }); // Adiciona o evento de reset no window
    }, // Fim do loop de eventos
  ); // Fim do forEach

  // Configura uma verificação periódica do tempo de inatividade a cada 5 minutos
  sessionTimer = setInterval(
    () => {
      // Callback da verificação periódica
      if (Date.now() - lastActivity > SESSION_TIMEOUT_MS) {
        // Verifica se ultrapassou o tempo limite
        stopSessionMonitor(); // Para o monitoramento de sessão
        onTimeout?.(); // Executa o callback de timeout (ex: logout) se fornecido
      } // Fim da verificação de tempo
    }, // Fim do corpo do intervalo
    5 * 60 * 1000, // Intervalo de 5 minutos em ms
  ); // Fim do setInterval
} // Fim da função startSessionMonitor

// Função para parar o monitoramento de sessão e limpar o intervalo
export function stopSessionMonitor() {
  // Exporta função de limpeza
  if (sessionTimer) {
    // Verifica se existe um timer ativo
    clearInterval(sessionTimer); // Cancela o intervalo do navegador
    sessionTimer = null; // Limpa a variável de referência
  } // Fim da verificação
} // Fim da função stopSessionMonitor

/* ==================================================== // Cabeçalho da seção de HTTPS
   HTTPS ENFORCER // Título da seção para garantia de conexão segura
==================================================== */ // Fim do cabeçalho da seção

/** // Início do JSDoc da função enforceHTTPS
 * Redireciona para HTTPS se estiver em HTTP (exceto localhost). // Descrição da regra
 * Chame no topo de cada página. // Instrução de uso
 */ // Fim do JSDoc
export function enforceHTTPS() {
  // Exporta função que força o uso de conexão criptografada
  if (
    // Verifica as condições para redirecionamento
    location.protocol === "http:" && // Se o protocolo atual for HTTP inseguro
    !["localhost", "127.0.0.1"].includes(location.hostname) // E não for ambiente de desenvolvimento local
  ) {
    // Se as condições forem atendidas
    location.replace(
      // Substitui o histórico atual pela nova URL segura
      "https:" + location.href.substring(location.protocol.length), // Reconstrói a URL usando o protocolo HTTPS
    ); // Fim do redirecionamento
  } // Fim da verificação de protocolo
} // Fim da função enforceHTTPS

/* ==================================================== // Cabeçalho da seção de Guarda do DOM
   CONTENT SECURITY — Detecta tentativas de injeção // Título da seção para monitoramento de DOM
==================================================== */ // Fim do cabeçalho da seção

/** // Início do JSDoc da função startDOMGuard
 * Monitora mutações no DOM para detectar injeções. // Descrição técnica
 * Apenas em produção. // Observação de ambiente
 */ // Fim do JSDoc
export function startDOMGuard() {
  // Exporta função que observa adições suspeitas de scripts na página
  if (location.hostname === "localhost") return; // Desativa a proteção em ambiente local para não interferir no dev

  // Cria um observador de mutações no corpo do documento
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // Itera sobre as mudanças ocorridas
      for (const node of mutation.addedNodes) {
        // Itera sobre os nós adicionados ao DOM
        if (
          // Verifica se o nó adicionado é um script potencialmente perigoso
          node.nodeName === "SCRIPT" && // Se for uma tag <script>
          !node.src?.includes("gstatic") && // E não vier do CDN do Google (Firebase)
          !node.src?.includes("googleapis") // E não vier das APIs do Google
        ) {
          // Se for um script de origem desconhecida
          console.warn(
            // Emite um aviso no console de segurança
            "[CoreLab Security] Script não autorizado detectado e removido.",
          ); // Fim da mensagem de aviso
          node.remove(); // Remove o script do DOM imediatamente antes da execução
        } // Fim da verificação de script
      } // Fim do loop de nós
    } // Fim do loop de mutações
  }); // Fim da definição do MutationObserver

  // Inicia a observação no body do documento, monitorando todos os descendentes
  observer.observe(document.body, { childList: true, subtree: true });
} // Fim da função startDOMGuard

/* ==================================================== // Cabeçalho da seção de utilitários finais
   EXPORT UTILITIES // Título da seção
==================================================== */ // Fim do cabeçalho da seção

/** // Início do JSDoc da função safeTruncate
 * Formata e trunca texto para exibição segura. // Descrição
 */ // Fim do JSDoc
export function safeTruncate(str, maxLen = 200) {
  // Exporta função de corte seguro de texto
  // Exporta função que corta strings e as sanitiza
  if (!str) return ""; // Retorna vazio se não houver texto
  const clean = sanitizeHTML(str); // Limpa o conteúdo HTML primeiro
  // Retorna o texto cortado com '...' se exceder o limite, ou o texto limpo original
  return clean.length > maxLen ? clean.substring(0, maxLen) + "..." : clean;
} // Fim da função safeTruncate

/** // Início do JSDoc da função generateId
 * Gera ID único seguro (sem dependências externas). // Descrição técnica
 */ // Fim do JSDoc
export function generateId(prefix = "") {
  // Exporta função de geração de IDs únicos
  // Exporta função de geração de identificadores únicos
  const rand = Math.random().toString(36).substring(2, 10); // Gera uma string aleatória de 8 caracteres
  const time = Date.now().toString(36); // Converte o timestamp atual para base 36 (alfanumérico)
  return `${prefix}${time}_${rand}`; // Retorna a combinação formatada do prefixo, tempo e aleatoriedade
} // Fim da função generateId
