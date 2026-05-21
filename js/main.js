/* ==================================================== // Início do bloco de cabeçalho de importações
   IMPORTS — Firebase // Seção de importação de módulos do Firebase
==================================================== */ // Fim do bloco de cabeçalho
import {
  // Início da importação de métodos de autenticação
  registerWithEmail, // Método para criar novos usuários
  loginWithEmail, // Método para login convencional
  loginWithGoogle, // Método para login social
  loginAsGuest, // Método para login como convidado
  isGuest, // Verifica se o usuário é convidado
  logout, // Método para encerrar sessão
  resetPassword, // Método para recuperação de senha
  onAuthChange, // Observador de estado de autenticação
} from "./auth.js"; // Origem dos módulos de autenticação

import { saveEarlyAccessLead, getUserProfile } from "./db.js"; // Importa funções de banco de dados

/* ==================================================== // Início do bloco de importações i18n
   IMPORTS — i18n // Seção de internacionalização
==================================================== */ // Fim do bloco de cabeçalho
import { applyLang, initI18n, translations, getCurrentLang } from "./i18n.js"; // Importa utilitários de tradução

/* ==================================================== // Início do bloco de dados dos chips
   CHIP DATA // Objeto contendo o conteúdo detalhado dos cards informativos
==================================================== */ // Fim do bloco de cabeçalho
const CHIPS = {
  // Define o objeto principal de informações dos chips
  foco: {
    // Chave para informações de Foco
    icon: "🎯", // Ícone representativo
    tag: "01 — Mente", // Identificador de categoria
    title: "FOCO MENTAL", // Título exibido no popup
    body: `<p>O foco mental é a capacidade de manter a atenção direcionada a uma tarefa específica. No treino, o foco é o diferencial entre uma sessão mediana e alta performance.</p>
    <h4>Como o CoreLab desenvolve seu foco</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">🧘</div><div class="chip-benefit-text"><strong>Pré-Ativação:</strong> Ritual de 3 minutos antes de cada treino com visualização e definição de intenção.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">⏱️</div><div class="chip-benefit-text"><strong>Blocos de Concentração:</strong> Sessões em intervalos de foco máximo com pausas estratégicas.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">📱</div><div class="chip-benefit-text"><strong>Modo Foco no App:</strong> Interface simplificada que elimina notificações durante o treino.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">34%</div><div class="chip-stat-label">de aumento na performance com técnicas de foco antes do treino</div></div>`,
  }, // Fim do chip foco
  mindfulness: {
    // Chave para Mindfulness
    icon: "🌿", // Ícone de natureza/calma
    tag: "01 — Mente", // Categoria mental
    title: "MINDFULNESS", // Título do popup
    body: `<p>Mindfulness no treino significa estar completamente presente em cada movimento. Validada por mais de 200 estudos clínicos, reduz cortisol e melhora conexão neuromuscular.</p>
    <h4>Técnicas integradas</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">🫁</div><div class="chip-benefit-text"><strong>Escaneamento Corporal:</strong> Identificação de tensões antes de cada sessão.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🔄</div><div class="chip-benefit-text"><strong>Respiração Consciente:</strong> Sincronização da respiração com cada fase do movimento.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">💭</div><div class="chip-benefit-text"><strong>Journaling Pós-Treino:</strong> Registro guiado de sensações para identificar padrões.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">28%</div><div class="chip-stat-label">de redução no cortisol após 8 semanas de mindfulness no treino</div></div>`,
  }, // Fim do chip mindfulness
  respiracao: {
    // Chave para Respiração
    icon: "🫁", // Ícone de pulmões
    tag: "01 — Mente", // Categoria mental
    title: "RESPIRAÇÃO", // Título do popup
    body: `<p>A respiração é a única função autônoma controlável — a ferramenta mais poderosa do atleta. Técnicas corretas aumentam VO2 máximo e estabilidade do core.</p>
    <h4>Protocolos disponíveis</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">💪</div><div class="chip-benefit-text"><strong>Valsalva Modificada:</strong> Pressão intra-abdominal segura para exercícios de alta carga.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🏃</div><div class="chip-benefit-text"><strong>Ritmo 2:2 para Cardio:</strong> Reduz impacto nas articulações e melhora eficiência aeróbica.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">😌</div><div class="chip-benefit-text"><strong>Técnica 4-7-8:</strong> Ativa o parassimpático e acelera a recuperação pós-treino.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">+18%</div><div class="chip-stat-label">de melhora no VO2 máximo com respiração estruturada em 12 semanas</div></div>`,
  }, // Fim do chip respiração
  sono: {
    // Chave para Sono (Mente)
    icon: "🌙", // Ícone de lua
    tag: "01 — Mente", // Categoria mental/recuperação
    title: "SONO & RECUPERAÇÃO", // Título do popup
    body: `<p>O crescimento muscular acontece durante o sono. O corpo libera 70-80% do GH durante o sono profundo. Dormir mal reduz síntese proteica em até 18%.</p>
    <h4>Monitoramento do sono</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">📊</div><div class="chip-benefit-text"><strong>Score de Prontidão:</strong> Índice diário baseado na qualidade do sono para intensidade ideal do treino.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🌡️</div><div class="chip-benefit-text"><strong>Higiene do Sono:</strong> Rotina personalizada com alertas de desconexão digital.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">⚡</div><div class="chip-benefit-text"><strong>Power Nap Guiado:</strong> Sestas de 20 min com áudios para recuperação entre sessões.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">+23%</div><div class="chip-stat-label">de ganho de força ao otimizar o sono de 6h para 8h em 4 semanas</div></div>`,
  }, // Fim do chip sono
  hipertrofia: {
    // Chave para Hipertrofia
    icon: "💪", // Ícone de bíceps
    tag: "02 — Força", // Categoria de ganho muscular
    title: "HIPERTROFIA", // Título do popup
    body: `<p>Hipertrofia é o aumento do volume das fibras musculares. O CoreLab aplica tensão mecânica, dano muscular e estresse metabólico de forma sistematizada.</p>
    <h4>Metodologia CoreLab</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">📈</div><div class="chip-benefit-text"><strong>Sobrecarga Progressiva:</strong> Algoritmo aumenta carga baseado nos seus logs de treino.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🔄</div><div class="chip-benefit-text"><strong>Periodização Ondulatória:</strong> Variação semanal para maximizar adaptação e minimizar platôs.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">⏰</div><div class="chip-benefit-text"><strong>Intervalos Otimizados:</strong> Descanso calculado por grupo muscular e intensidade.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">2.4×</div><div class="chip-stat-label">mais ganho muscular com periodização vs. treino aleatório em 16 semanas</div></div>`,
  }, // Fim do chip hipertrofia
  "forca-maxima": {
    // Chave para Força Máxima
    icon: "🏋️", // Ícone de levantamento
    tag: "02 — Força", // Categoria de força
    title: "FORÇA MÁXIMA", // Título do popup
    body: `<p>Força máxima recruta unidades motoras de alto limiar e fortalece padrões neurais, beneficiando todos os outros tipos de treino.</p>
    <h4>Protocolos disponíveis</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">🎯</div><div class="chip-benefit-text"><strong>Protocolo 5x5:</strong> 5 séries de 5 repetições em 85-90% do 1RM.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">📉</div><div class="chip-benefit-text"><strong>Rampa até 1RM:</strong> Aquecimento progressivo até o peso máximo do dia com segurança.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🔬</div><div class="chip-benefit-text"><strong>Velocidade de Execução:</strong> Monitoramento para identificar fadiga que compromete qualidade.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">+31%</div><div class="chip-stat-label">de ganho de força em 12 semanas com protocolo periodizado</div></div>`,
  }, // Fim do chip força máxima
  composicao: {
    // Chave para Composição Corporal
    icon: "⚖️", // Ícone de balança
    tag: "02 — Força", // Categoria estética/saúde
    title: "COMPOSIÇÃO CORPORAL", // Título do popup
    body: `<p>Composição corporal é a proporção entre masa muscular e gordura. Melhorar exige combinação precisa de treino, nutrição e recuperação.</p>
    <h4>Análise e Otimização</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">📊</div><div class="chip-benefit-text"><strong>Rastreio Visual:</strong> Medidas, percentual de gordura e fotos em timeline visual.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🍽️</div><div class="chip-benefit-text"><strong>Integração Nutricional:</strong> Cálculo automático de déficit ou superávit calórico.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🔄</div><div class="chip-benefit-text"><strong>Ajuste Dinâmico:</strong> O plano se adapta mensalmente com base nos resultados reais.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">-4.2kg</div><div class="chip-stat-label">de gordura média em 12 semanas mantendo masa muscular</div></div>`,
  }, // Fim do chip composição
  hiit: {
    // Chave para HIIT
    icon: "🔥", // Ícone de fogo
    tag: "03 — Cardio", // Categoria cardiovascular
    title: "HIIT", // Título do popup
    body: `<p>HIIT cria adaptações cardiovasculares superiores em 30-40% menos tempo que o cardio tradicional.</p>
    <h4>Formatos disponíveis</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">⚡</div><div class="chip-benefit-text"><strong>Tabata (20s/10s):</strong> 8 rounds — equivale a 45 min de cardio moderado em 4 minutos.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🏃</div><div class="chip-benefit-text"><strong>HIIT 30/30:</strong> 30s sprint, 30s caminhada — ideal para iniciantes.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🔄</div><div class="chip-benefit-text"><strong>EMOM:</strong> Exercício a cada minuto — combina força e condicionamento.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">3×</div><div class="chip-stat-label">mais eficiente que cardio moderado para perda de gordura por hora</div></div>`,
  }, // Fim do chip HIIT
  resistencia: {
    // Chave para Resistência
    icon: "🫀", // Ícone de coração
    tag: "03 — Cardio", // Categoria aeróbica
    title: "RESISTÊNCIA", // Título do popup
    body: `<p>Resistência aeróbica aumenta VO2 máximo, densidade mitocondrial e eficiência cardíaca — bases da longevidade.</p>
    <h4>Desenvolvimento no CoreLab</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">💓</div><div class="chip-benefit-text"><strong>Treino por Zonas:</strong> 5 zonas de FC com treinos específicos para cada zona.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">📈</div><div class="chip-benefit-text"><strong>Progressão de Volume:</strong> Aumento gradual de 10% por semana para evitar overtraining.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🌬️</div><div class="chip-benefit-text"><strong>LISS:</strong> Cardio de baixa intensidade para recuperação ativa e base aeróbica.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">+22%</div><div class="chip-stat-label">de melhora no VO2 máximo em 8 semanas de treino estruturado</div></div>`,
  }, // Fim do chip resistência
  queima: {
    // Chave para Queima de Gordura
    icon: "🔥", // Ícone de queima
    tag: "03 — Cardio", // Categoria calórica
    title: "QUEIMA DE GORDURA", // Título do popup
    body: `<p>Queima eficiente combina déficit calórico sustentável com preservação muscular.</p>
    <h4>Estratégias disponíveis</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">🌅</div><div class="chip-benefit-text"><strong>Cardio em Jejum:</strong> Maximiza mobilização de ácidos graxos livres.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🔄</div><div class="chip-benefit-text"><strong>EPOC Maximizado:</strong> Seu corpo queima gordura por até 24h após o treino.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🍽️</div><div class="chip-benefit-text"><strong>Ciclagem de Carboidratos:</strong> Mais carbs nos dias pesados, menos nos leves.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">-1.2%</div><div class="chip-stat-label">de gordura corporal por semana de forma sustentável</div></div>`,
  }, // Fim do chip queima
  mobilidade: {
    // Chave para Mobilidade
    icon: "🤸", // Ícone de ginasta/movimento
    tag: "04 — Flexibilidade", // Categoria de movimento
    title: "MOBILIDADE", // Título do popup
    body: `<p>Mobilidade combina força e flexibilidade para movimento funcional, seguro e eficiente.</p>
    <h4>Programa CoreLab</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">🎯</div><div class="chip-benefit-text"><strong>Avaliação FMS:</strong> Identifica limitações para criar rotina personalizada.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">⏰</div><div class="chip-benefit-text"><strong>10 min Diários:</strong> Protocolo mínimo eficaz para manutenção e melhora progressiva.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🔄</div><div class="chip-benefit-text"><strong>CARs:</strong> Rotações articulares controladas para saúde das articulações.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">-67%</div><div class="chip-stat-label">de redução no risco de lesão com programa regular de mobilidade</div></div>`,
  }, // Fim do chip mobilidade
  alongamento: {
    // Chave para Alongamento
    icon: "🧘", // Ícone de yoga/alongamento
    tag: "04 — Flexibilidade", // Categoria de relaxamento
    title: "ALONGAMENTO", // Título do popup
    body: `<p>O alongamento correto acelera recuperação, reduz DOMS e melhora recrutamento muscular.</p>
    <h4>Tipos no CoreLab</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">🌅</div><div class="chip-benefit-text"><strong>Dinâmico Pré-Treino:</strong> Movimentos ativos que elevam temperatura muscular.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🌙</div><div class="chip-benefit-text"><strong>Estático Pós-Treino:</strong> 30-60 segundos por posição — reduz DOMS em até 40%.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🏥</div><div class="chip-benefit-text"><strong>FNP:</strong> Contração-relaxamento para ganhos expressivos de amplitude.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">-40%</div><div class="chip-stat-label">de dor muscular tardia com alongamento estático pós-treino</div></div>`,
  }, // Fim do chip alongamento
  yoga: {
    // Chave para Yoga & Pilates
    icon: "🧘", // Ícone de meditação
    tag: "04 — Flexibilidade", // Categoria corporal
    title: "YOGA & PILATES", // Título do popup
    body: `<p>Yoga e Pilates desenvolvem força, flexibilidade e controle corporal. LeBron James e Cristiano Ronaldo praticam regularmente.</p>
    <h4>Integração CoreLab</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">💪</div><div class="chip-benefit-text"><strong>Yoga para Atletas:</strong> Sequências para recuperação ativa e mobilidade de quadril.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🎯</div><div class="chip-benefit-text"><strong>Pilates de Solo:</strong> Fortalece o core profundo para movimentos compostos pesados.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🌿</div><div class="chip-benefit-text"><strong>Yin Yoga:</strong> 45 min para dias de descanso — restaura o sistema nervoso.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">+26%</div><div class="chip-stat-label">de melhora em força funcional integrando yoga por 8 semanas</div></div>`,
  }, // Fim do chip yoga
  sono2: {
    // Chave para Sono (Recuperação)
    icon: "🌙", // Ícone de sono profundo
    tag: "05 — Recuperação", // Categoria regenerativa
    title: "SONO", // Título do popup
    body: `<p>O sono é o suplemento mais poderoso e gratuito. GH, reparo muscular e memória motora acontecem durante o sono profundo.</p>
    <h4>Otimização no CoreLab</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">📊</div><div class="chip-benefit-text"><strong>Score de Qualidade:</strong> Registro correlacionado com a performance do treino.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🌡️</div><div class="chip-benefit-text"><strong>Ambiente Ideal:</strong> Temperatura 18-19°C e desconexão digital 1h antes.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">💊</div><div class="chip-benefit-text"><strong>Suplementação:</strong> Magnésio e melatonina baseados em evidências, sem dependência.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">+23%</div><div class="chip-stat-label">de ganho de força ao aumentar sono de 6h para 8h em 4 semanas</div></div>`,
  }, // Fim do chip sono2
  nutricao: {
    // Chave para Nutrição
    icon: "🥗", // Ícone de alimentação saudável
    tag: "05 — Recuperação", // Categoria de combustível
    title: "NUTRIÇÃO", // Título do popup
    body: `<p>Nutrição é responsável por 70-80% dos resultados. O CoreLab aplica periodização nutricional e timing de nutrientes.</p>
    <h4>Estratégia CoreLab</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">🍖</div><div class="chip-benefit-text"><strong>Proteína Prioritária:</strong> 1,6-2,2g/kg de peso para maximizar síntese proteica.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">⏰</div><div class="chip-benefit-text"><strong>Timing Peritreinamento:</strong> Carboidratos e proteínas pré e pós treino otimizados.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">📱</div><div class="chip-benefit-text"><strong>Diário Alimentar:</strong> Registro simplificado com cálculo automático de macros.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">+41%</div><div class="chip-stat-label">de melhora com periodização nutricional vs. dieta livre</div></div>`,
  }, // Fim do chip nutrição
  hidratacao: {
    // Chave para Hidratação
    icon: "💧", // Ícone de água
    tag: "05 — Recuperação", // Categoria vital
    title: "HIDRATAÇÃO", // Título do popup
    body: `<p>Desidratação de 2% reduz performance física em 10-20%. Água é fundamental para toda reação bioquímica do metabolismo.</p>
    <h4>Hidratação Inteligente</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">📊</div><div class="chip-benefit-text"><strong>Meta Personalizada:</strong> Cálculo baseado em peso, temperatura e intensidade do treino.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">⏰</div><div class="chip-benefit-text"><strong>Lembretes Inteligentes:</strong> Notificações adaptadas ao seu cronograma diário.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">⚡</div><div class="chip-benefit-text"><strong>Eletrólitos:</strong> Quando repor sódio, potássio e magnésio em treinos longos.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">+15%</div><div class="chip-stat-label">de melhora na resistência com hidratação otimizada</div></div>`,
  }, // Fim do chip hidratação
  descanso: {
    // Chave para Dias de Descanso
    icon: "🛋️", // Ícone de sofá/descanso
    tag: "05 — Recuperação", // Categoria de folga
    title: "DIAS DE DESCANSO", // Título do popup
    body: `<p>Dias de descanso são onde a adaptação acontece. Sem recuperação adequada o corpo entra em overtraining.</p>
    <h4>Estratégias CoreLab</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">🚶</div><div class="chip-benefit-text"><strong>Recuperação Ativa:</strong> Caminhadas leves 30-45 min ou yoga restaurativo.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🧊</div><div class="chip-benefit-text"><strong>Crioterapia:</strong> Banho frio 10-15°C por 5 min para reduzir inflamação.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">💆</div><div class="chip-benefit-text"><strong>Foam Roller:</strong> 15 min para liberação miofascial e redução de aderências.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">2-3×</div><div class="chip-stat-label">mais ganho muscular alternando estímulo e recuperação adequadamente</div></div>`,
  }, // Fim do chip descanso
}; // Fim do objeto principal de dados

/* ==================================================== // Início da seção do Carrossel
   CAROUSEL // Lógica de funcionamento dos slides principais
==================================================== */ // Fim do cabeçalho da seção
let cur = 0; // Índice do slide atual (começa no primeiro)
const total = 4; // Número total de slides no carrossel
let autoTimer; // Variável para armazenar o intervalo da troca automática
const track = document.getElementById("cTrack"); // Elemento que contém todos os slides (trilho)
const dots = [...document.querySelectorAll(".cdot")]; // Lista de indicadores (pontos) na parte inferior

function goTo(i) {
  // Função para navegar até um slide específico
  cur = (i + total) % total; // Cálculo circular do índice (evita estouro negativo ou positivo)
  track.style.transform = `translateX(-${cur * 100}%)`; // Desloca o trilho horizontalmente
  dots.forEach((d, j) => d.classList.toggle("active", j === cur)); // Atualiza visualmente o ponto ativo
} // Fim da função goTo

function startAuto() {
  // Inicia a troca automática de slides
  autoTimer = setInterval(() => goTo(cur + 1), 5000); // Define intervalo de 5 segundos
} // Fim da função startAuto

function resetAuto() {
  // Reinicia o contador automático após interação manual
  clearInterval(autoTimer); // Para o timer atual
  startAuto(); // Inicia um novo timer limpo
} // Fim da função resetAuto

document.getElementById("cNext").onclick = () => {
  // Evento de clique no botão "Próximo"
  goTo(cur + 1); // Avança um slide
  resetAuto(); // Reinicia o timer
}; // Fim do evento Next

document.getElementById("cPrev").onclick = () => {
  // Evento de clique no botão "Anterior"
  goTo(cur - 1); // Retrocede um slide
  resetAuto(); // Reinicia o timer
}; // Fim do evento Prev

dots.forEach(
  (
    d, // Adiciona evento de clique em cada ponto indicador
  ) =>
    d.addEventListener("click", () => {
      // Ao clicar no ponto
      goTo(+d.dataset.i); // Navega para o slide correspondente ao índice do dataset
      resetAuto(); // Reinicia o timer
    }), // Fim do listener
); // Fim do loop de dots

let touchStartX = 0; // Variável para rastrear o início do toque em telas mobile
track.addEventListener(
  // Adiciona suporte a gestos de deslize (swipe)
  "touchstart", // Início do toque
  (e) => {
    // Callback do evento
    touchStartX = e.touches[0].clientX; // Registra a coordenada X inicial
  }, // Fim do callback
  { passive: true }, // Otimização de performance para scroll
); // Fim do listener touchstart

track.addEventListener("touchend", (e) => {
  // Fim do toque (soltar o dedo)
  const dx = e.changedTouches[0].clientX - touchStartX; // Calcula a distância percorrida no eixo X
  if (Math.abs(dx) > 50) {
    // Se o deslize foi maior que 50 pixels
    goTo(dx < 0 ? cur + 1 : cur - 1); // Decide a direção baseada no sinal do deslocamento
    resetAuto(); // Reinicia o timer automático
  } // Fim do if de distância
}); // Fim do listener touchend

startAuto(); // Chama a função inicial para começar a rotação automática

/* ==================================================== // Início da seção de Navbar
   NAVBAR SCROLL // Efeito visual da barra de navegação ao rolar a página
==================================================== */ // Fim do cabeçalho da seção
window.addEventListener("scroll", () => {
  // Escuta o evento de rolagem da janela
  document.getElementById("nav").classList.toggle("scrolled", scrollY > 40); // Adiciona classe 'scrolled' se passar de 40px
}); // Fim do listener de scroll

/* ==================================================== // Início da seção de Temas
   THEME // Alternância entre modo claro e modo escuro
==================================================== */ // Fim do cabeçalho da seção
let dark = true; // Estado inicial do tema (escuro por padrão)
document.getElementById("themeBtn").onclick = () => {
  // Evento de clique no botão de tema
  dark = !dark; // Inverte o estado booleano
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light"); // Aplica o atributo ao HTML
  document.getElementById("themeBtn").textContent = dark ? "🌙" : "☀️"; // Atualiza o ícone do botão
}; // Fim do evento de tema

/* ==================================================== // Início da seção de Idiomas
   LANGUAGE — integrado com i18n.js // Gerenciamento de troca de línguas
==================================================== */ // Fim do cabeçalho da seção
document.querySelectorAll(".lang-btn").forEach((b) => {
  // Itera sobre os botões de seleção de idioma
  b.onclick = () => applyLang(b.dataset.lang); // Ao clicar, chama applyLang com o código do idioma (ex: 'pt')
}); // Fim do loop de botões de idioma

/* ==================================================== // Início da seção de Abas
   MODAL TABS // Lógica de troca de abas dentro dos modais
==================================================== */ // Fim do cabeçalho da seção
document.querySelectorAll(".modal-tab").forEach((tab) => {
  // Itera sobre cada aba do modal
  tab.onclick = () => {
    // Ao clicar na aba
    document // Seleciona todas as abas
      .querySelectorAll(".modal-tab") // Para limpar o estado
      .forEach((t) => t.classList.remove("active")); // Remove a classe ativa de todas
    document // Seleciona todos os conteúdos de aba
      .querySelectorAll(".modal-tab-content") // Para ocultar o anterior
      .forEach((c) => c.classList.remove("active")); // Remove a classe ativa de todos
    tab.classList.add("active"); // Adiciona classe ativa na aba clicada
    document.getElementById("tab-" + tab.dataset.tab).classList.add("active"); // Mostra o conteúdo correspondente
    clearAlert(); // Limpa qualquer mensagem de erro anterior
  }; // Fim do evento de clique na aba
}); // Fim do loop de abas

document.getElementById("forgotPass").onclick = () => {
  // Atalho para a aba de recuperação de senha
  document // Limpa conteúdos ativos
    .querySelectorAll(".modal-tab-content") // Itera sobre conteúdos
    .forEach((c) => c.classList.remove("active")); // Desativa
  document.getElementById("tab-reset").classList.add("active"); // Ativa especificamente o conteúdo de reset
  document // Limpa abas ativas
    .querySelectorAll(".modal-tab") // Itera sobre abas
    .forEach((t) => t.classList.remove("active")); // Desativa (nenhuma aba visível no reset)
}; // Fim do evento esqueci senha

document.getElementById("backToLogin").onclick = () => {
  // Botão de retorno do reset para o login
  document // Limpa conteúdos
    .querySelectorAll(".modal-tab-content") // Itera
    .forEach((c) => c.classList.remove("active")); // Desativa
  document.getElementById("tab-login").classList.add("active"); // Volta para o formulário de login
  document // Limpa abas
    .querySelectorAll(".modal-tab") // Itera
    .forEach((t) => t.classList.remove("active")); // Desativa todas
  document.querySelector('[data-tab="login"]').classList.add("active"); // Reativa visualmente a aba 'Entrar'
}; // Fim do evento voltar login

/* ==================================================== // Início da seção de Alertas
   ALERT HELPERS // Funções utilitárias para feedback visual no modal
==================================================== */ // Fim do cabeçalho da seção
function showAlert(msg, type = "error") {
  // Exibe uma mensagem de alerta (erro ou sucesso)
  const el = document.getElementById("modalAlert"); // Seleciona o container do alerta
  el.textContent = msg; // Define o texto da mensagem
  el.className = "modal-alert " + type; // Aplica a classe base e o tipo (ex: error/success)
} // Fim da função showAlert

function clearAlert() {
  // Remove qualquer alerta visível
  const el = document.getElementById("modalAlert"); // Seleciona o container
  el.className = "modal-alert"; // Reseta classes para o estado padrão
  el.textContent = ""; // Limpa o conteúdo de texto
} // Fim da função clearAlert

function setLoading(btnId, spinnerId, loading) {
  // Gerencia o estado de carregamento de um botão
  document.getElementById(btnId).style.opacity = loading ? ".7" : "1"; // Altera opacidade se estiver carregando
  document.getElementById(btnId).disabled = loading; // Desabilita o botão para evitar cliques duplos
  document.getElementById(spinnerId).style.display = loading // Alterna visibilidade do ícone de carregamento
    ? "inline" // Mostra se carregando
    : "none"; // Oculta se finalizado
} // Fim da função setLoading

/* Função para exibir overlay animado de sucesso */
function showSuccessOverlay(icon, title, subtitle, duration = 2500) {
  return new Promise((resolve) => {
    // Remove overlay anterior se existir
    const old = document.getElementById("successOverlay");
    if (old) old.remove();
    // Cria o overlay
    const overlay = document.createElement("div");
    overlay.id = "successOverlay";
    overlay.innerHTML = `
      <div class="success-content">
        <div class="success-icon">${icon}</div>
        <div class="success-title">${title}</div>
        <div class="success-sub">${subtitle}</div>
      </div>
    `;
    // Estilos inline para o overlay
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "99999",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.92)",
      backdropFilter: "blur(20px)",
      opacity: "0",
      transition: "opacity 0.4s ease",
    });
    const content = overlay.querySelector(".success-content");
    Object.assign(content.style, {
      textAlign: "center",
      transform: "scale(0.8) translateY(20px)",
      transition:
        "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease",
      opacity: "0",
    });
    const iconEl = overlay.querySelector(".success-icon");
    Object.assign(iconEl.style, {
      fontSize: "64px",
      marginBottom: "16px",
      animation: "pulse 1s ease infinite",
    });
    const titleEl = overlay.querySelector(".success-title");
    Object.assign(titleEl.style, {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(28px, 5vw, 42px)",
      color: "#00ff87",
      letterSpacing: "0.04em",
      marginBottom: "8px",
    });
    const subEl = overlay.querySelector(".success-sub");
    Object.assign(subEl.style, {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "15px",
      color: "rgba(255,255,255,0.7)",
      maxWidth: "320px",
      margin: "0 auto",
    });
    document.body.appendChild(overlay);
    // Anima entrada
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      content.style.opacity = "1";
      content.style.transform = "scale(1) translateY(0)";
    });
    // Anima saída e resolve
    setTimeout(() => {
      overlay.style.opacity = "0";
      content.style.transform = "scale(0.9) translateY(-10px)";
      content.style.opacity = "0";
      setTimeout(() => {
        overlay.remove();
        resolve();
      }, 400);
    }, duration);
  });
}

/* ==================================================== // Início da seção do Modal de Login
   LOGIN MODAL OPEN/CLOSE // Controle de abertura e fechamento
==================================================== */ // Fim do cabeçalho da seção
const loginOverlay = document.getElementById("loginOverlay"); // Elemento de fundo escuro do modal
const loginBtn = document.getElementById("loginBtn"); // Botão de login principal da Navbar

loginBtn.onclick = (e) => {
  // Evento de clique no botão da Navbar
  e.stopPropagation(); // Impede que o evento suba na árvore do DOM
  if (!loginBtn.classList.contains("logged")) {
    // Se o usuário não estiver logado
    loginOverlay.classList.add("open"); // Abre o modal de autenticação
    document.body.style.overflow = "hidden"; // Bloqueia o scroll da página ao fundo
  } else {
    // Se já estiver logado
    toggleUserMenu(); // Alterna a exibição do menu de perfil
  } // Fim do if login
}; // Fim do evento loginBtn

document.getElementById("loginClose").onclick = closeLogin; // Botão 'X' para fechar o modal
loginOverlay.addEventListener("click", (e) => {
  // Fecha ao clicar na área escura de fundo
  if (e.target === loginOverlay) closeLogin(); // Apenas se o clique for no overlay e não no conteúdo
}); // Fim do listener click overlay

document.addEventListener("keydown", (e) => {
  // Atalhos de teclado
  if (e.key === "Escape") {
    // Tecla ESC
    closeLogin(); // Fecha o modal de login
    closeChip(); // Fecha o popup de informações (chips)
    closeUserMenu(); // Fecha o menu do usuário
  } // Fim do if Escape
}); // Fim do listener keydown

function closeLogin() {
  // Função padrão para fechar o modal de login
  loginOverlay.classList.remove("open"); // Remove classe de abertura
  document.body.style.overflow = ""; // Restaura a rolagem da página
  clearAlert(); // Limpa alertas pendentes
} // Fim da função closeLogin

/* ==================================================== // Início da seção de Menu do Usuário
   USER MENU // Criação e controle do menu logado
==================================================== */ // Fim do cabeçalho da seção
function createUserMenu(user) {
  // Gera o HTML do menu para usuários autenticados
  let menu = document.getElementById("userMenu"); // Busca menu existente
  if (!menu) {
    // Se não existir
    menu = document.createElement("div"); // Cria um novo elemento div
    menu.id = "userMenu"; // Define o ID
    menu.className = "user-menu"; // Aplica classe de estilo
    document.body.appendChild(menu); // Anexa ao final do body para evitar conflitos de z-index
  } // Fim do if menu

  // Gera as iniciais do nome para o avatar
  const initials = (user.name || user.email || "U")
    .split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

  menu.innerHTML = `
    <div class="user-menu-avatar" id="userAvatar">${initials}<span class="user-menu-tooltip">${user.name || user.email}</span></div>
    <div class="user-menu-divider"></div>
    <a href="dashboard.html"  class="user-menu-item"><span class="user-menu-icon">📊</span><span class="user-menu-tooltip">Meu Dashboard</span></a>
    <a href="chatbot.html"    class="user-menu-item"><span class="user-menu-icon">🤖</span><span class="user-menu-tooltip">Coach IA</span></a>
    <a href="comunidade.html" class="user-menu-item"><span class="user-menu-icon">🏆</span><span class="user-menu-tooltip">Comunidade</span></a>
    <div class="user-menu-divider"></div>
    <div class="user-menu-item" id="switchAccountBtn"><span class="user-menu-icon">🔄</span><span class="user-menu-tooltip">Trocar conta</span></div>
    <div class="user-menu-item danger" id="logoutBtn"><span class="user-menu-icon">🚪</span><span class="user-menu-tooltip">Sair</span></div>`;


  document.getElementById("logoutBtn").onclick = async () => {
    // Evento de sair
    await logout(); // Chama função de deslogar do Firebase
    closeUserMenu(); // Fecha o menu
  }; // Fim do evento logout

  document.getElementById("switchAccountBtn").onclick = async () => {
    // Evento de trocar conta
    await logout(); // Faz logout primeiro
    closeUserMenu(); // Fecha o menu atual
    setTimeout(() => {
      // Pequeno delay para efeito visual
      loginOverlay.classList.add("open"); // Reabre o modal de login
      document.body.style.overflow = "hidden"; // Trava scroll
    }, 300); // Fim do timeout
  }; // Fim do evento trocar conta
} // Fim da função createUserMenu

function toggleUserMenu() {
  // Abre/Fecha o menu de perfil alternadamente
  const menu = document.getElementById("userMenu"); // Seleciona o menu
  if (menu) menu.classList.toggle("open"); // Inverte classe 'open'
} // Fim da função toggleUserMenu

function closeUserMenu() {
  // Fecha o menu de perfil forçadamente
  const menu = document.getElementById("userMenu"); // Seleciona o menu
  if (menu) menu.classList.remove("open"); // Remove classe 'open'
} // Fim da função closeUserMenu

document.addEventListener("click", (e) => {
  // Fecha o menu ao clicar fora dele
  const menu = document.getElementById("userMenu"); // Busca o menu no DOM
  if (menu && !menu.contains(e.target) && !loginBtn.contains(e.target)) {
    // Se o clique foi fora do menu e do botão
    closeUserMenu(); // Encerra a exibição do menu
  } // Fim do if clique fora
}); // Fim do listener click outside

/* ==================================================== // Início da seção do Botão Demo
   DEMO BUTTON — Login como convidado para explorar o app
==================================================== */ // Fim do cabeçalho da seção
const demoBtn = document.getElementById("demoBtn"); // Referência ao botão Demo
const demoBadge = document.getElementById("demoBadge"); // Referência ao badge 🧪

demoBtn.onclick = async () => {
  // Clique no botão Demo — inicia sessão anônima
  demoBtn.classList.add("loading"); // Mostra spinner de carregamento
  const result = await loginAsGuest(); // Tenta login anônimo no Firebase
  demoBtn.classList.remove("loading"); // Remove spinner

  if (result.success) {
    // Sucesso: mostra animação de boas-vindas
    closeLogin(); // Fecha modal de login se estiver aberto
    await showSuccessOverlay(
      "🧪",
      "MODO DEMO ATIVADO!",
      "Explore todas as funcionalidades com dados de demonstração.",
      2200,
    );
  } else {
    // Falha: mostra erro para o usuário
    console.error("Erro no login demo:", result.error);
    showAlert(result.error || "Erro ao iniciar demo. Tente novamente.");
  } // Fim do if sucesso demo
}; // Fim do evento demoBtn

/** Cria/remove o banner fixo no topo para sair do modo demo */
function showDemoExitBanner() {
  // Verifica se já existe um banner
  if (document.getElementById("demoExitBanner")) return;
  const banner = document.createElement("div"); // Cria o banner
  banner.id = "demoExitBanner"; // ID para referência
  banner.className = "demo-exit-banner"; // Classe CSS
  banner.innerHTML = `
    <span>🧪 MODO DEMONSTRAÇÃO ATIVO — interaja à vontade, tudo é salvo localmente!</span>
    <button class="demo-exit-btn" id="demoExitBtn">✕ Sair da Demo</button>
  `; // Conteúdo do banner
  document.body.prepend(banner); // Insere no início do body
  document.body.classList.add("demo-active"); // Adiciona classe ao body

  document.getElementById("demoExitBtn").onclick = async () => {
    // Botão para sair do modo demo
    await logout(); // Encerra sessão anônima
  }; // Fim do evento sair demo
} // Fim da função showDemoExitBanner

function removeDemoExitBanner() {
  // Remove o banner de demo do DOM
  const banner = document.getElementById("demoExitBanner");
  if (banner) {
    banner.style.animation = "none"; // Para animação
    banner.style.transform = "translateY(-100%)"; // Esconde com transição
    banner.style.transition = "transform 0.3s ease";
    setTimeout(() => banner.remove(), 300); // Remove após transição
  }
  document.body.classList.remove("demo-active"); // Remove classe do body
} // Fim da função removeDemoExitBanner

/* ==================================================== // Início da seção de Observador de Autenticação
   AUTH STATE OBSERVER // Reação às mudanças de login/logout no Firebase
==================================================== */ // Fim do cabeçalho da seção
onAuthChange(async (user) => {
  // Escuta mudanças globais de estado (logado/deslogado)
  if (user) {
    // Se um objeto user for retornado (usuário logado)
    const guest = isGuest(user); // Verifica se é sessão anônima (demo)

    if (guest) {
      // — MODO DEMO — Sessão anônima
      loginBtn.classList.add("demo-mode"); // Visual roxo/azul no avatar
      loginBtn.classList.remove("logged"); // Não usar estilo verde de logado
      document.getElementById("avatarEl").textContent = "🧪"; // Ícone demo no avatar
      demoBadge.textContent = "DEMO"; // Texto do badge
      demoBadge.classList.add("visible"); // Mostra o badge
      demoBtn.classList.add("d-none-demo"); // Esconde o botão demo (já está em demo)
      showDemoExitBanner(); // Mostra banner de saída no topo

      // Menu do usuário com opções limitadas para demo
      createUserMenu({
        name: "Demo User",
        email: "Modo Demonstração",
        isDemo: true,
      }); // Fim da criação do menu demo
      closeLogin(); // Fecha modal se aberto
    } else {
      // — MODO NORMAL — Usuário autenticado
      loginBtn.classList.add("logged"); // Muda visual do botão de login
      loginBtn.classList.remove("demo-mode"); // Remove estilo demo
      demoBadge.classList.remove("visible"); // Esconde badge demo
      demoBadge.textContent = ""; // Limpa texto do badge
      demoBtn.classList.add("d-none-demo"); // Esconde botão demo (logado de verdade)
      removeDemoExitBanner(); // Remove banner demo se existir

      document.getElementById("avatarEl").textContent = // Define o avatar visual
        (user.displayName || user.email || "U") // Usa nome ou email
          .substring(0, 2) // Pega as duas primeiras letras
          .toUpperCase(); // Deixa em caixa alta

      const profile = await getUserProfile(user.uid); // Busca dados adicionais no Firestore
      createUserMenu({
        name: profile?.name || user.displayName || "", // Nome do perfil ou auth
        email: user.email, // Email fixo
      }); // Fim da criação do menu
      closeLogin(); // Garante que o modal de login seja fechado após sucesso
    } // Fim do if guest/normal
  } else {
    // Se o usuário deslogar (user === null)
    loginBtn.classList.remove("logged"); // Remove estilo de logado
    loginBtn.classList.remove("demo-mode"); // Remove estilo demo
    demoBadge.classList.remove("visible"); // Esconde badge
    demoBadge.textContent = ""; // Limpa badge
    demoBtn.classList.remove("d-none-demo"); // Mostra botão demo novamente
    removeDemoExitBanner(); // Remove banner demo
    document.getElementById("avatarEl").textContent = ""; // Limpa o avatar
    const menu = document.getElementById("userMenu"); // Busca o menu no DOM
    if (menu) menu.remove(); // Remove o menu do DOM completamente
  } // Fim do if user
}); // Fim do observador auth

/* ==================================================== // Início da seção de Login Convencional
   LOGIN COM EMAIL // Tratamento do formulário de acesso
==================================================== */ // Fim do cabeçalho da seção
document.getElementById("loginSubmit").onclick = async () => {
  // Clique no botão 'Entrar' do formulário
  clearAlert(); // Limpa erros residuais
  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPass").value;
  if (!email || !pass) {
    showAlert("Preencha todos os campos.");
    return;
  }

  setLoading("loginSubmit", "loginSpinner", true);
  const result = await loginWithEmail(email, pass);
  setLoading("loginSubmit", "loginSpinner", false);
  if (!result.success) {
    showAlert(result.error);
  } else {
    // Login bem-sucedido: fecha o modal e mostra animação de boas-vindas
    closeLogin();
    const name = result.user.displayName || email.split("@")[0];
    await showSuccessOverlay(
      "🎉",
      `BEM-VINDO, ${name.toUpperCase()}!`,
      "Login realizado com sucesso. Aproveite a plataforma!",
    );
  }
}; // Fim do evento loginSubmit

/* ==================================================== // Início da seção de Registro
   CADASTRO COM EMAIL // Criação de novas contas
==================================================== */ // Fim do cabeçalho da seção
document.getElementById("registerSubmit").onclick = async () => {
  // Clique no botão 'Criar Conta'
  clearAlert(); // Reseta alertas
  const name = document.getElementById("registerName").value.trim(); // Captura nome
  const email = document.getElementById("registerEmail").value.trim(); // Captura email
  const pass = document.getElementById("registerPass").value; // Captura senha
  const conf = document.getElementById("registerPassConfirm").value; // Captura confirmação

  if (!name || !email || !pass || !conf) {
    // Verifica se há campos vazios
    showAlert("Preencha todos os campos."); // Alerta campos obrigatórios
    return; // Para execução
  } // Fim do if campos vazios
  if (pass !== conf) {
    // Valida se as senhas batem
    showAlert("As senhas não coincidem."); // Alerta divergência
    return; // Para execução
  } // Fim do if senhas diferentes
  if (pass.length < 6) {
    // Regra mínima de segurança do Firebase
    showAlert("A senha deve ter pelo menos 6 caracteres."); // Alerta senha curta
    return; // Para execução
  } // Fim do if senha curta

  setLoading("registerSubmit", "registerSpinner", true); // Inicia loading visual
  const result = await registerWithEmail(name, email, pass); // Tenta criar usuário
  setLoading("registerSubmit", "registerSpinner", false); // Finaliza loading

  if (!result.success) {
    // Se houver erro no cadastro
    showAlert(result.error); // Exibe o erro retornado
  } else {
    // Cadastro bem-sucedido: mostra animação e redireciona para login
    closeLogin(); // Fecha o modal primeiro
    await showSuccessOverlay(
      "✅",
      "CONTA CRIADA COM SUCESSO!",
      "Você será redirecionado para o login.",
      2200,
    );
    // Abre modal de login com email preenchido
    loginOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
    document
      .querySelectorAll(".modal-tab-content")
      .forEach((c) => c.classList.remove("active"));
    document
      .querySelectorAll(".modal-tab")
      .forEach((t) => t.classList.remove("active"));
    document.getElementById("tab-login").classList.add("active");
    document.querySelector('[data-tab="login"]').classList.add("active");
    document.getElementById("loginEmail").value = email;
    clearAlert();
  } // Fim do if sucesso
}; // Fim do evento registerSubmit

/* ==================================================== // Início da seção de Login Social
   LOGIN COM GOOGLE // Autenticação via conta Google
==================================================== */ // Fim do cabeçalho da seção
document.getElementById("googleLogin").onclick = async () => {
  // Botão Google no login
  clearAlert(); // Limpa mensagens
  const result = await loginWithGoogle(); // Abre popup do Google
  if (!result.success) showAlert(result.error); // Mostra erro se fechar popup ou falhar
}; // Fim do evento googleLogin

document.getElementById("googleRegister").onclick = async () => {
  // Botão Google no cadastro
  clearAlert(); // Limpa mensagens
  const result = await loginWithGoogle(); // Reutiliza lógica de login social
  if (!result.success) showAlert(result.error); // Feedback de erro
}; // Fim do evento googleRegister

/* ==================================================== // Início da seção de Recuperação
   RESET DE SENHA // Envio de link por email
==================================================== */ // Fim do cabeçalho da seção
document.getElementById("resetSubmit").onclick = async () => {
  // Clique no botão 'Enviar Link'
  clearAlert(); // Reseta alertas
  const email = document.getElementById("resetEmail").value.trim(); // Pega o email cadastrado
  if (!email) {
    // Validação de campo vazio
    showAlert("Digite seu email."); // Solicita o email
    return; // Para execução
  } // Fim do if email vazio

  const result = await resetPassword(email); // Solicita reset ao Firebase
  if (result.success) {
    // Se enviado com sucesso
    showAlert("Link enviado! Verifique sua caixa de entrada.", "success"); // Feedback positivo
  } else {
    // Se falhar (ex: email não existe)
    showAlert(result.error); // Mostra o erro correspondente
  } // Fim do if sucesso reset
}; // Fim do evento resetSubmit

/* ==================================================== // Início da seção de Popups Informativos
   CHIP POPUPS // Exibição de detalhes das categorias (foco, força, etc)
==================================================== */ // Fim do cabeçalho da seção
const chipOverlay = document.getElementById("chip-overlay"); // Container escuro do popup de chips

document.querySelectorAll(".chip").forEach(
  // Seleciona todos os cards clicáveis (chips)
  (
    c, // Itera sobre cada card
  ) =>
    (c.onclick = () => {
      // Ao clicar no card informativo
      const d = CHIPS[c.dataset.chip]; // Busca os dados no objeto CHIPS usando o nome no dataset
      if (!d) return; // Segurança contra chaves inexistentes
      document.getElementById("cpIcon").textContent = d.icon; // Aplica o ícone no popup
      document.getElementById("cpTag").textContent = d.tag; // Aplica a tag/categoria
      document.getElementById("cpTitle").textContent = d.title; // Aplica o título
      document.getElementById("cpBody").innerHTML = d.body; // Aplica o HTML descritivo (corpo)
      chipOverlay.classList.add("open"); // Abre visualmente o popup
      document.body.style.overflow = "hidden"; // Bloqueia scroll da página principal
    }), // Fim do evento de clique
); // Fim do loop de chips

document.getElementById("cpClose").onclick = closeChip; // Botão de fechar dentro do chip
chipOverlay.addEventListener("click", (e) => {
  // Fecha ao clicar fora do conteúdo central
  if (e.target === chipOverlay) closeChip(); // Apenas se clicar no fundo
}); // Fim do listener clique overlay

function closeChip() {
  // Função padrão para encerrar visualização do chip
  chipOverlay.classList.remove("open"); // Remove classe visual
  document.body.style.overflow = ""; // Libera o scroll da página
} // Fim da função closeChip

/* ==================================================== // Início da seção de Early Access
   EARLY ACCESS — Salva no Firestore // Captação de leads da landing page
==================================================== */ // Fim do cabeçalho da seção
document.getElementById("earlyForm").onsubmit = async (e) => {
  // Intercepta envio do formulário de espera
  e.preventDefault(); // Impede o recarregamento padrão da página
  const email = document.getElementById("earlyEmail").value.trim(); // Captura o email fornecido
  if (!email) return; // Ignora se estiver vazio

  const btn = e.target.querySelector('button[type="submit"]'); // Seleciona o botão de envio
  btn.textContent = "⏳ Salvando..."; // Altera texto para feedback de carregamento
  btn.disabled = true; // Desabilita o botão para evitar duplicidade

  try {
    // Bloco de tentativa de salvamento
    const result = await saveEarlyAccessLead(email); // Envia para o banco de dados via db.js
    document.getElementById("earlyForm").style.display = "none"; // Oculta o formulário original
    const msg = document.getElementById("success-msg"); // Seleciona container de sucesso
    msg.style.display = "block"; // Exibe a mensagem de confirmação
    if (result.alreadyExists) {
      // Se o banco retornar que o email já existia
      msg.querySelector("p").textContent = "✅ VOCÊ JÁ ESTÁ NA LISTA!"; // Muda o título da mensagem
      msg.querySelector("span").textContent = // Atualiza a descrição
        "Seu email já foi registrado. Aguarde nosso contato!"; // Informa que o registro é antigo
    } // Fim do if já existe
  } catch (err) {
    // Caso ocorra erro técnico (ex: falha de rede)
    btn.textContent = "GARANTIR VAGA"; // Restaura texto do botão
    btn.disabled = false; // Reabilita o botão
    console.error(err); // Loga o erro no console para depuração
  } // Fim do catch
}; // Fim do evento onsubmit early access

/* ==================================================== // Início da seção de Revelação
   SCROLL REVEAL // Efeitos de surgimento de elementos ao rolar
==================================================== */ // Fim do cabeçalho da seção
const ro = new IntersectionObserver( // Cria o observador de interseção da API do navegador
  (entries) => {
    // Callback disparado quando elementos entram/saem da visão
    entries.forEach((en) => {
      // Itera sobre os elementos observados
      if (en.isIntersecting) {
        // Se o elemento entrou na área visível
        en.target.classList.add("visible"); // Adiciona classe que dispara a animação CSS
        ro.unobserve(en.target); // Para de observar após a primeira revelação (melhora performance)
      } // Fim do if intersecting
    }); // Fim do loop de entries
  }, // Fim do callback
  { threshold: 0.1 }, // Dispara quando 10% do elemento está visível
); // Fim da instância do observador

document // Seleciona todos os elementos com classes de animação
  .querySelectorAll(".reveal, .reveal-l, .reveal-r") // Padrão, esquerda e direita
  .forEach((el) => ro.observe(el)); // Inicia a observação para cada um deles

/* ==================================================== // Início da seção da Splash Screen
   SPLASH TAG CYCLE — usa idioma salvo // Ciclo de textos na tela de carregamento inicial
==================================================== */ // Fim do cabeçalho da seção
const savedLang = (() => {
  // IIFE para recuperar idioma inicial sem poluir escopo
  try {
    // Tenta ler do armazenamento local
    return localStorage.getItem("corelab_lang") || "pt"; // Retorna salvo ou padrão PT
  } catch (_) {
    // Fallback de erro
    return "pt"; // Força Português
  } // Fim do catch
})(); // Execução imediata

const _t = translations[savedLang] || translations.pt; // Obtém objeto de tradução correspondente

const splashTags = [_t.splash_1, _t.splash_2, _t.splash_3]; // Cria array com os 3 textos da splash
let tagIndex = 0; // Índice de controle do ciclo
const stagEl = document.getElementById("stag"); // Elemento visual onde os textos aparecerão
if (stagEl) stagEl.textContent = splashTags[0]; // Define o primeiro texto imediatamente

const splashInterval = setInterval(() => {
  // Cria intervalo de repetição
  tagIndex = (tagIndex + 1) % splashTags.length; // Avança o índice circularmente
  if (stagEl) stagEl.textContent = splashTags[tagIndex]; // Atualiza o texto visualmente
}, 900); // Muda a cada 0.9 segundos

const stopSplash = () => clearInterval(splashInterval); // Função para parar o intervalo
setTimeout(stopSplash, 2800); // Encerra o ciclo após 2.8 segundos (tempo da animação splash)

/* ==================================================== // Início da seção de Inicialização Final
   I18N — Inicializa idioma salvo (deve ser o ÚLTIMO passo) // Garante que tudo esteja pronto antes da tradução
==================================================== */ // Fim do cabeçalho da seção
initI18n(); // Chama função que traduz toda a interface baseada na preferência do usuário
