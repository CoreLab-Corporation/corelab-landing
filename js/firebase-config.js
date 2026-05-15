/* ==================================================== // Início do bloco de cabeçalho
   FIREBASE CONFIG — CoreLab // Título da configuração do Firebase
   Substitua os valores pelas suas credenciais reais // Aviso para substituição de credenciais
==================================================== */ // Fim do bloco de cabeçalho

// Importa a função initializeApp do SDK do Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// Início da importação de serviços de autenticação
import {
  getAuth, // Função para obter a instância de autenticação
  GoogleAuthProvider, // Classe para provedor de autenticação do Google
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"; // URL do SDK de autenticação
// Importa a função getFirestore do SDK do Firestore
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ⚠️ SUBSTITUA PELOS SEUS DADOS DO FIREBASE CONSOLE // Comentário de alerta sobre os dados
const firebaseConfig = {
  // Definição do objeto de configuração do Firebase
  apiKey: "AIzaSyBVquVlMKbkem815fdDUPNvj9Z3TitUxIc", // Chave de API do projeto
  authDomain: "corelab-app-ecfd5.firebaseapp.com", // Domínio de autenticação
  projectId: "corelab-app-ecfd5", // ID do projeto no Firebase
  storageBucket: "corelab-app-ecfd5.firebasestorage.app", // Bucket de armazenamento de arquivos
  messagingSenderId: "270988545375", // ID do remetente de mensagens
  appId: "1:270988545375:web:700ebf60dff3506740baea", // ID único do aplicativo web
  measurementId: "G-GV4NR8NZM5", // ID de medição para Analytics
}; // Fim do objeto de configuração

// Inicializa o Firebase com as configurações fornecidas
const app = initializeApp(firebaseConfig);

// Inicializa os serviços do Firebase
const auth = getAuth(app); // Inicializa o serviço de Autenticação
const db = getFirestore(app); // Inicializa o serviço de Banco de Dados Firestore
const googleProvider = new GoogleAuthProvider(); // Cria uma nova instância do provedor Google

// Configurações do Google Provider para autenticação
googleProvider.setCustomParameters({
  // Define parâmetros customizados para o login
  prompt: "select_account", // Força a seleção de conta ao fazer login
}); // Fim da configuração de parâmetros

// Exporta as instâncias configuradas para uso em outros arquivos
export { auth, db, googleProvider };
