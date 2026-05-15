/* ==================================================== // Início do bloco de cabeçalho
   AUTH.JS — Autenticação CoreLab // Título do arquivo de autenticação
==================================================== */ // Fim do bloco de cabeçalho

// Importa instâncias de auth e googleProvider do arquivo de configuração
import { auth, googleProvider } from "./firebase-config.js";
// Importa funções de manipulação de perfil de usuário do banco de dados
import { createUserProfile, getUserProfile } from "./db.js";
// Início da importação de métodos específicos do Firebase Auth
import {
  createUserWithEmailAndPassword, // Método para criar usuário com email/senha
  signInWithEmailAndPassword, // Método para login com email/senha
  signInWithPopup, // Método para login via popup (ex: Google)
  signOut, // Método para deslogar o usuário
  onAuthStateChanged, // Observer para mudanças no estado de autenticação
  updateProfile, // Método para atualizar dados do perfil no Auth
  sendPasswordResetEmail, // Método para envio de email de recuperação de senha
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"; // SDK de Autenticação do Firebase

/* ==================================================== // Cabeçalho da seção de cadastro
   CADASTRO COM EMAIL E SENHA // Título da seção
==================================================== */ // Fim do cabeçalho da seção

// Função assíncrona para registrar um novo usuário
export async function registerWithEmail(name, email, password) {
  // Exporta função de registro por email
  try {
    // Início do bloco de tratamento de erro
    // Cria usuário no Firebase Auth usando as credenciais fornecidas
    const credential = await createUserWithEmailAndPassword(
      auth, // Instância de autenticação
      email, // Email do usuário
      password, // Senha do usuário
    ); // Fim da chamada de criação
    const user = credential.user; // Obtém o objeto de usuário da credencial

    // Atualiza o nome de exibição no Firebase Auth
    await updateProfile(user, { displayName: name });

    // Cria o documento de perfil no Firestore usando o UID do usuário
    await createUserProfile(user.uid, {
      name, // Nome do usuário
      email, // Email do usuário
      photoURL: "", // URL da foto (vazio por padrão no cadastro manual)
    }); // Fim da criação do perfil

    // Desloga imediatamente após cadastro para forçar login manual
    await signOut(auth);

    return { success: true, user }; // Retorna sucesso e os dados do usuário
  } catch (err) {
    // Captura erros que ocorrerem no processo
    return { success: false, error: getAuthError(err.code) }; // Retorna erro traduzido
  } // Fim do bloco try-catch
} // Fim da função registerWithEmail

/* ==================================================== // Cabeçalho da seção de login
   LOGIN COM EMAIL E SENHA // Título da seção
==================================================== */ // Fim do cabeçalho da seção

// Função assíncrona para realizar login com email e senha
export async function loginWithEmail(email, password) {
  // Exporta função de login por email
  try {
    // Início do bloco de tratamento de erro
    // Realiza o login usando o Firebase Auth
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: credential.user }; // Retorna sucesso e o usuário logado
  } catch (err) {
    // Captura falhas no login
    return { success: false, error: getAuthError(err.code) }; // Retorna erro traduzido
  } // Fim do bloco try-catch
} // Fim da função loginWithEmail

/* ==================================================== // Cabeçalho da seção de login Google
   LOGIN COM GOOGLE // Título da seção
==================================================== */ // Fim do cabeçalho da seção

// Função assíncrona para realizar login via Google
export async function loginWithGoogle() {
  // Exporta função de login via Google
  try {
    // Início do bloco de tratamento de erro
    // Abre o popup de login do Google
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user; // Obtém o usuário logado

    // Verifica se o perfil do usuário já existe no Firestore
    const existing = await getUserProfile(user.uid);
    if (!existing) {
      // Se o perfil não existir, cria um novo
      await createUserProfile(user.uid, {
        name: user.displayName || "", // Usa o nome do Google ou vazio
        email: user.email || "", // Usa o email do Google ou vazio
        photoURL: user.photoURL || "", // Usa a foto do Google ou vazio
      }); // Fim da criação de perfil
    } // Fim da verificação de existência

    return { success: true, user }; // Retorna sucesso e os dados do usuário
  } catch (err) {
    // Captura erros no processo de login social
    return { success: false, error: getAuthError(err.code) }; // Retorna erro traduzido
  } // Fim do bloco try-catch
} // Fim da função loginWithGoogle

/* ==================================================== // Cabeçalho da seção de logout
   LOGOUT // Título da seção
==================================================== */ // Fim do cabeçalho da seção

// Função assíncrona para desconectar o usuário
export async function logout() {
  // Exporta função de logout
  try {
    // Início do bloco de tratamento de erro
    await signOut(auth); // Chama o método de logout do Firebase
    return { success: true }; // Retorna sucesso
  } catch (err) {
    // Captura erros ao tentar deslogar
    return { success: false, error: err.message }; // Retorna a mensagem de erro original
  } // Fim do bloco try-catch
} // Fim da função logout

/* ==================================================== // Cabeçalho da seção de reset de senha
   RESET DE SENHA // Título da seção
==================================================== */ // Fim do cabeçalho da seção

// Função assíncrona para solicitar redefinição de senha por email
export async function resetPassword(email) {
  // Exporta função de recuperação de senha
  try {
    // Início do bloco de tratamento de erro
    await sendPasswordResetEmail(auth, email); // Envia o email de reset via Firebase
    return { success: true }; // Retorna sucesso
  } catch (err) {
    // Captura falhas no envio do email
    return { success: false, error: getAuthError(err.code) }; // Retorna erro traduzido
  } // Fim do bloco try-catch
} // Fim da função resetPassword

/* ==================================================== // Cabeçalho da seção de observer
   OBSERVER — Estado da sessão // Título da seção
==================================================== */ // Fim do cabeçalho da seção

// Função para monitorar mudanças no estado de autenticação (logado/deslogado)
export function onAuthChange(callback) {
  // Exporta função de monitoramento de auth
  return onAuthStateChanged(auth, callback); // Retorna a inscrição no observer
} // Fim da função onAuthChange

/* ==================================================== // Cabeçalho da seção de usuário atual
   USUÁRIO ATUAL // Título da seção
==================================================== */ // Fim do cabeçalho da seção

// Função para obter o usuário atualmente logado de forma síncrona
export function getCurrentUser() {
  // Exporta função para obter usuário atual
  return auth.currentUser; // Retorna a propriedade currentUser da instância de auth
} // Fim da função getCurrentUser

/* ==================================================== // Cabeçalho da seção de tradução
   TRADUÇÃO DE ERROS // Título da seção
==================================================== */ // Fim do cabeçalho da seção

// Função auxiliar para traduzir códigos de erro do Firebase Auth para o usuário
function getAuthError(code) {
  // Declaração da função de tradução de erros
  const errors = {
    // Dicionário de mapeamento de erros
    "auth/email-already-in-use": "Este email já está cadastrado.", // Email em uso
    "auth/invalid-email": "Email inválido.", // Email mal formatado
    "auth/weak-password": "Senha muito fraca. Mínimo 6 caracteres.", // Senha curta
    "auth/user-not-found": "Usuário não encontrado.", // Usuário inexistente
    "auth/wrong-password": "Senha incorreta.", // Senha errada
    "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde.", // Bloqueio temporário
    "auth/popup-closed-by-user": "Login cancelado.", // Popup fechado
    "auth/network-request-failed": "Erro de conexão. Verifique sua internet.", // Erro de rede
    "auth/invalid-credential": "Email ou senha incorretos.", // Credenciais inválidas
  }; // Fim do dicionário
  return errors[code] || "Ocorreu um erro. Tente novamente."; // Retorna erro traduzido ou genérico
} // Fim da função getAuthError
