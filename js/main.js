/* ====================================================
   IMPORTS — Firebase
==================================================== */
import {
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
  logout,
  resetPassword,
  onAuthChange
} from './auth.js';

import {
  saveEarlyAccessLead,
  getUserProfile
} from './db.js';

/* ====================================================
   CHIP DATA
==================================================== */
const CHIPS = {
  foco: {
    icon: '🎯', tag: '01 — Mente', title: 'FOCO MENTAL',
    body: `<p>O foco mental é a capacidade de manter a atenção direcionada a uma tarefa específica. No treino, o foco é o diferencial entre uma sessão mediana e alta performance.</p>
    <h4>Como o CoreLab desenvolve seu foco</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">🧘</div><div class="chip-benefit-text"><strong>Pré-Ativação:</strong> Ritual de 3 minutos antes de cada treino com visualização e definição de intenção.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">⏱️</div><div class="chip-benefit-text"><strong>Blocos de Concentração:</strong> Sessões em intervalos de foco máximo com pausas estratégicas.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">📱</div><div class="chip-benefit-text"><strong>Modo Foco no App:</strong> Interface simplificada que elimina notificações durante o treino.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">34%</div><div class="chip-stat-label">de aumento na performance com técnicas de foco antes do treino</div></div>`
  },
  mindfulness: {
    icon: '🌿', tag: '01 — Mente', title: 'MINDFULNESS',
    body: `<p>Mindfulness no treino significa estar completamente presente em cada movimento. Validada por mais de 200 estudos clínicos, reduz cortisol e melhora conexão neuromuscular.</p>
    <h4>Técnicas integradas</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">🫁</div><div class="chip-benefit-text"><strong>Escaneamento Corporal:</strong> Identificação de tensões antes de cada sessão.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🔄</div><div class="chip-benefit-text"><strong>Respiração Consciente:</strong> Sincronização da respiração com cada fase do movimento.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">💭</div><div class="chip-benefit-text"><strong>Journaling Pós-Treino:</strong> Registro guiado de sensações para identificar padrões.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">28%</div><div class="chip-stat-label">de redução no cortisol após 8 semanas de mindfulness no treino</div></div>`
  },
  respiracao: {
    icon: '🫁', tag: '01 — Mente', title: 'RESPIRAÇÃO',
    body: `<p>A respiração é a única função autônoma controlável — a ferramenta mais poderosa do atleta. Técnicas corretas aumentam VO2 máximo e estabilidade do core.</p>
    <h4>Protocolos disponíveis</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">💪</div><div class="chip-benefit-text"><strong>Valsalva Modificada:</strong> Pressão intra-abdominal segura para exercícios de alta carga.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🏃</div><div class="chip-benefit-text"><strong>Ritmo 2:2 para Cardio:</strong> Reduz impacto nas articulações e melhora eficiência aeróbica.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">😌</div><div class="chip-benefit-text"><strong>Técnica 4-7-8:</strong> Ativa o parassimpático e acelera a recuperação pós-treino.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">+18%</div><div class="chip-stat-label">de melhora no VO2 máximo com respiração estruturada em 12 semanas</div></div>`
  },
  sono: {
    icon: '🌙', tag: '01 — Mente', title: 'SONO & RECUPERAÇÃO',
    body: `<p>O crescimento muscular acontece durante o sono. O corpo libera 70-80% do GH durante o sono profundo. Dormir mal reduz síntese proteica em até 18%.</p>
    <h4>Monitoramento do sono</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">📊</div><div class="chip-benefit-text"><strong>Score de Prontidão:</strong> Índice diário baseado na qualidade do sono para intensidade ideal do treino.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🌡️</div><div class="chip-benefit-text"><strong>Higiene do Sono:</strong> Rotina personalizada com alertas de desconexão digital.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">⚡</div><div class="chip-benefit-text"><strong>Power Nap Guiado:</strong> Sestas de 20 min com áudios para recuperação entre sessões.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">+23%</div><div class="chip-stat-label">de ganho de força ao otimizar o sono de 6h para 8h em 4 semanas</div></div>`
  },
  hipertrofia: {
    icon: '💪', tag: '02 — Força', title: 'HIPERTROFIA',
    body: `<p>Hipertrofia é o aumento do volume das fibras musculares. O CoreLab aplica tensão mecânica, dano muscular e estresse metabólico de forma sistematizada.</p>
    <h4>Metodologia CoreLab</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">📈</div><div class="chip-benefit-text"><strong>Sobrecarga Progressiva:</strong> Algoritmo aumenta carga baseado nos seus logs de treino.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🔄</div><div class="chip-benefit-text"><strong>Periodização Ondulatória:</strong> Variação semanal para maximizar adaptação e minimizar platôs.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">⏰</div><div class="chip-benefit-text"><strong>Intervalos Otimizados:</strong> Descanso calculado por grupo muscular e intensidade.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">2.4×</div><div class="chip-stat-label">mais ganho muscular com periodização vs. treino aleatório em 16 semanas</div></div>`
  },
  'forca-maxima': {
    icon: '🏋️', tag: '02 — Força', title: 'FORÇA MÁXIMA',
    body: `<p>Força máxima recruta unidades motoras de alto limiar e fortalece padrões neurais, beneficiando todos os outros tipos de treino.</p>
    <h4>Protocolos disponíveis</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">🎯</div><div class="chip-benefit-text"><strong>Protocolo 5x5:</strong> 5 séries de 5 repetições em 85-90% do 1RM.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">📉</div><div class="chip-benefit-text"><strong>Rampa até 1RM:</strong> Aquecimento progressivo até o peso máximo do dia com segurança.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🔬</div><div class="chip-benefit-text"><strong>Velocidade de Execução:</strong> Monitoramento para identificar fadiga que compromete qualidade.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">+31%</div><div class="chip-stat-label">de ganho de força em 12 semanas com protocolo periodizado</div></div>`
  },
  composicao: {
    icon: '⚖️', tag: '02 — Força', title: 'COMPOSIÇÃO CORPORAL',
    body: `<p>Composição corporal é a proporção entre massa muscular e gordura. Melhorar exige combinação precisa de treino, nutrição e recuperação.</p>
    <h4>Análise e Otimização</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">📊</div><div class="chip-benefit-text"><strong>Rastreio Visual:</strong> Medidas, percentual de gordura e fotos em timeline visual.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🍽️</div><div class="chip-benefit-text"><strong>Integração Nutricional:</strong> Cálculo automático de déficit ou superávit calórico.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🔄</div><div class="chip-benefit-text"><strong>Ajuste Dinâmico:</strong> O plano se adapta mensalmente com base nos resultados reais.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">-4.2kg</div><div class="chip-stat-label">de gordura média em 12 semanas mantendo massa muscular</div></div>`
  },
  hiit: {
    icon: '🔥', tag: '03 — Cardio', title: 'HIIT',
    body: `<p>HIIT cria adaptações cardiovasculares superiores em 30-40% menos tempo que o cardio tradicional.</p>
    <h4>Formatos disponíveis</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">⚡</div><div class="chip-benefit-text"><strong>Tabata (20s/10s):</strong> 8 rounds — equivale a 45 min de cardio moderado em 4 minutos.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🏃</div><div class="chip-benefit-text"><strong>HIIT 30/30:</strong> 30s sprint, 30s caminhada — ideal para iniciantes.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🔄</div><div class="chip-benefit-text"><strong>EMOM:</strong> Exercício a cada minuto — combina força e condicionamento.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">3×</div><div class="chip-stat-label">mais eficiente que cardio moderado para perda de gordura por hora</div></div>`
  },
  resistencia: {
    icon: '🫀', tag: '03 — Cardio', title: 'RESISTÊNCIA',
    body: `<p>Resistência aeróbica aumenta VO2 máximo, densidade mitocondrial e eficiência cardíaca — bases da longevidade.</p>
    <h4>Desenvolvimento no CoreLab</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">💓</div><div class="chip-benefit-text"><strong>Treino por Zonas:</strong> 5 zonas de FC com treinos específicos para cada zona.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">📈</div><div class="chip-benefit-text"><strong>Progressão de Volume:</strong> Aumento gradual de 10% por semana para evitar overtraining.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🌬️</div><div class="chip-benefit-text"><strong>LISS:</strong> Cardio de baixa intensidade para recuperação ativa e base aeróbica.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">+22%</div><div class="chip-stat-label">de melhora no VO2 máximo em 8 semanas de treino estruturado</div></div>`
  },
  queima: {
    icon: '🔥', tag: '03 — Cardio', title: 'QUEIMA DE GORDURA',
    body: `<p>Queima eficiente combina déficit calórico sustentável com preservação muscular.</p>
    <h4>Estratégias disponíveis</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">🌅</div><div class="chip-benefit-text"><strong>Cardio em Jejum:</strong> Maximiza mobilização de ácidos graxos livres.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🔄</div><div class="chip-benefit-text"><strong>EPOC Maximizado:</strong> Seu corpo queima gordura por até 24h após o treino.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🍽️</div><div class="chip-benefit-text"><strong>Ciclagem de Carboidratos:</strong> Mais carbs nos dias pesados, menos nos leves.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">-1.2%</div><div class="chip-stat-label">de gordura corporal por semana de forma sustentável</div></div>`
  },
  mobilidade: {
    icon: '🤸', tag: '04 — Flexibilidade', title: 'MOBILIDADE',
    body: `<p>Mobilidade combina força e flexibilidade para movimento funcional, seguro e eficiente.</p>
    <h4>Programa CoreLab</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">🎯</div><div class="chip-benefit-text"><strong>Avaliação FMS:</strong> Identifica limitações para criar rotina personalizada.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">⏰</div><div class="chip-benefit-text"><strong>10 min Diários:</strong> Protocolo mínimo eficaz para manutenção e melhora progressiva.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🔄</div><div class="chip-benefit-text"><strong>CARs:</strong> Rotações articulares controladas para saúde das articulações.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">-67%</div><div class="chip-stat-label">de redução no risco de lesão com programa regular de mobilidade</div></div>`
  },
  alongamento: {
    icon: '🧘', tag: '04 — Flexibilidade', title: 'ALONGAMENTO',
    body: `<p>O alongamento correto acelera recuperação, reduz DOMS e melhora recrutamento muscular.</p>
    <h4>Tipos no CoreLab</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">🌅</div><div class="chip-benefit-text"><strong>Dinâmico Pré-Treino:</strong> Movimentos ativos que elevam temperatura muscular.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🌙</div><div class="chip-benefit-text"><strong>Estático Pós-Treino:</strong> 30-60 segundos por posição — reduz DOMS em até 40%.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🏥</div><div class="chip-benefit-text"><strong>FNP:</strong> Contração-relaxamento para ganhos expressivos de amplitude.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">-40%</div><div class="chip-stat-label">de dor muscular tardia com alongamento estático pós-treino</div></div>`
  },
  yoga: {
    icon: '🧘', tag: '04 — Flexibilidade', title: 'YOGA & PILATES',
    body: `<p>Yoga e Pilates desenvolvem força, flexibilidade e controle corporal. LeBron James e Cristiano Ronaldo praticam regularmente.</p>
    <h4>Integração CoreLab</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">💪</div><div class="chip-benefit-text"><strong>Yoga para Atletas:</strong> Sequências para recuperação ativa e mobilidade de quadril.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🎯</div><div class="chip-benefit-text"><strong>Pilates de Solo:</strong> Fortalece o core profundo para movimentos compostos pesados.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🌿</div><div class="chip-benefit-text"><strong>Yin Yoga:</strong> 45 min para dias de descanso — restaura o sistema nervoso.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">+26%</div><div class="chip-stat-label">de melhora em força funcional integrando yoga por 8 semanas</div></div>`
  },
  sono2: {
    icon: '🌙', tag: '05 — Recuperação', title: 'SONO',
    body: `<p>O sono é o suplemento mais poderoso e gratuito. GH, reparo muscular e memória motora acontecem durante o sono profundo.</p>
    <h4>Otimização no CoreLab</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">📊</div><div class="chip-benefit-text"><strong>Score de Qualidade:</strong> Registro correlacionado com a performance do treino.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🌡️</div><div class="chip-benefit-text"><strong>Ambiente Ideal:</strong> Temperatura 18-19°C e desconexão digital 1h antes.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">💊</div><div class="chip-benefit-text"><strong>Suplementação:</strong> Magnésio e melatonina baseados em evidências, sem dependência.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">+23%</div><div class="chip-stat-label">de ganho de força ao aumentar sono de 6h para 8h em 4 semanas</div></div>`
  },
  nutricao: {
    icon: '🥗', tag: '05 — Recuperação', title: 'NUTRIÇÃO',
    body: `<p>Nutrição é responsável por 70-80% dos resultados. O CoreLab aplica periodização nutricional e timing de nutrientes.</p>
    <h4>Estratégia CoreLab</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">🍖</div><div class="chip-benefit-text"><strong>Proteína Prioritária:</strong> 1,6-2,2g/kg de peso para maximizar síntese proteica.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">⏰</div><div class="chip-benefit-text"><strong>Timing Peritreinamento:</strong> Carboidratos e proteínas pré e pós treino otimizados.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">📱</div><div class="chip-benefit-text"><strong>Diário Alimentar:</strong> Registro simplificado com cálculo automático de macros.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">+41%</div><div class="chip-stat-label">de melhora com periodização nutricional vs. dieta livre</div></div>`
  },
  hidratacao: {
    icon: '💧', tag: '05 — Recuperação', title: 'HIDRATAÇÃO',
    body: `<p>Desidratação de 2% reduz performance física em 10-20%. Água é fundamental para toda reação bioquímica do metabolismo.</p>
    <h4>Hidratação Inteligente</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">📊</div><div class="chip-benefit-text"><strong>Meta Personalizada:</strong> Cálculo baseado em peso, temperatura e intensidade do treino.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">⏰</div><div class="chip-benefit-text"><strong>Lembretes Inteligentes:</strong> Notificações adaptadas ao seu cronograma diário.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">⚡</div><div class="chip-benefit-text"><strong>Eletrólitos:</strong> Quando repor sódio, potássio e magnésio em treinos longos.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">+15%</div><div class="chip-stat-label">de melhora na resistência com hidratação otimizada</div></div>`
  },
  descanso: {
    icon: '🛋️', tag: '05 — Recuperação', title: 'DIAS DE DESCANSO',
    body: `<p>Dias de descanso são onde a adaptação acontece. Sem recuperação adequada o corpo entra em overtraining.</p>
    <h4>Estratégias CoreLab</h4>
    <div class="chip-benefit"><div class="chip-benefit-icon">🚶</div><div class="chip-benefit-text"><strong>Recuperação Ativa:</strong> Caminhadas leves 30-45 min ou yoga restaurativo.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">🧊</div><div class="chip-benefit-text"><strong>Crioterapia:</strong> Banho frio 10-15°C por 5 min para reduzir inflamação.</div></div>
    <div class="chip-benefit"><div class="chip-benefit-icon">💆</div><div class="chip-benefit-text"><strong>Foam Roller:</strong> 15 min para liberação miofascial e redução de aderências.</div></div>
    <div class="chip-stat"><div class="chip-stat-num">2-3×</div><div class="chip-stat-label">mais ganho muscular alternando estímulo e recuperação adequadamente</div></div>`
  }
};

/* ====================================================
   CAROUSEL
==================================================== */
let cur = 0;
const total = 4;
let autoTimer;
const track = document.getElementById('cTrack');
const dots = [...document.querySelectorAll('.cdot')];

function goTo(i) {
  cur = (i + total) % total;
  track.style.transform = `translateX(-${cur * 100}%)`;
  dots.forEach((d, j) => d.classList.toggle('active', j === cur));
}
function startAuto() { autoTimer = setInterval(() => goTo(cur + 1), 5000); }
function resetAuto() { clearInterval(autoTimer); startAuto(); }

document.getElementById('cNext').onclick = () => { goTo(cur + 1); resetAuto(); };
document.getElementById('cPrev').onclick = () => { goTo(cur - 1); resetAuto(); };
dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.i); resetAuto(); }));

let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) { goTo(dx < 0 ? cur + 1 : cur - 1); resetAuto(); }
});
startAuto();

/* ====================================================
   NAVBAR SCROLL
==================================================== */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 40);
});

/* ====================================================
   THEME
==================================================== */
let dark = true;
document.getElementById('themeBtn').onclick = () => {
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  document.getElementById('themeBtn').textContent = dark ? '🌙' : '☀️';
};

/* ====================================================
   LANGUAGE
==================================================== */
document.querySelectorAll('.lang-btn').forEach(b => b.onclick = () => {
  document.querySelectorAll('.lang-btn').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
});

/* ====================================================
   MODAL TABS
==================================================== */
document.querySelectorAll('.modal-tab').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    clearAlert();
  };
});

document.getElementById('forgotPass').onclick = () => {
  document.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById('tab-reset').classList.add('active');
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
};

document.getElementById('backToLogin').onclick = () => {
  document.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById('tab-login').classList.add('active');
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('[data-tab="login"]').classList.add('active');
};

/* ====================================================
   ALERT HELPERS
==================================================== */
function showAlert(msg, type = 'error') {
  const el = document.getElementById('modalAlert');
  el.textContent = msg;
  el.className = 'modal-alert ' + type;
}
function clearAlert() {
  const el = document.getElementById('modalAlert');
  el.className = 'modal-alert';
  el.textContent = '';
}

function setLoading(btnId, spinnerId, loading) {
  document.getElementById(btnId).style.opacity = loading ? '.7' : '1';
  document.getElementById(btnId).disabled = loading;
  document.getElementById(spinnerId).style.display = loading ? 'inline' : 'none';
}

/* ====================================================
   LOGIN MODAL OPEN/CLOSE
==================================================== */
const loginOverlay = document.getElementById('loginOverlay');
const loginBtn = document.getElementById('loginBtn');

loginBtn.onclick = () => {
  if (!loginBtn.classList.contains('logged')) {
    loginOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    toggleUserMenu();
  }
};

document.getElementById('loginClose').onclick = closeLogin;
loginOverlay.addEventListener('click', e => { if (e.target === loginOverlay) closeLogin(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeLogin(); closeChip(); closeUserMenu(); }
});

function closeLogin() {
  loginOverlay.classList.remove('open');
  document.body.style.overflow = '';
  clearAlert();
}

/* ====================================================
   USER MENU (dropdown após login)
==================================================== */
function createUserMenu(user) {
  let menu = document.getElementById('userMenu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'userMenu';
    menu.className = 'user-menu';
    document.getElementById('nav').appendChild(menu);
  }
  menu.innerHTML = `
    <div class="user-menu-header">
      <div class="user-menu-name">${user.name || user.email}</div>
      <div class="user-menu-email">${user.email}</div>
    </div>
    <a href="dashboard.html" class="user-menu-item"><span class="user-menu-icon">📊</span>Meu Dashboard</a>
    <a href="chatbot.html" class="user-menu-item"><span class="user-menu-icon">🤖</span>Coach IA</a>
    <a href="comunidade.html" class="user-menu-item"><span class="user-menu-icon">🏆</span>Comunidade</a>
    <div class="user-menu-item danger" id="logoutBtn"><span class="user-menu-icon">🚪</span>Sair</div>`;

  document.getElementById('logoutBtn').onclick = async () => {
    await logout();
    closeUserMenu();
  };
}

function toggleUserMenu() {
  const menu = document.getElementById('userMenu');
  if (menu) menu.classList.toggle('open');
}
function closeUserMenu() {
  const menu = document.getElementById('userMenu');
  if (menu) menu.classList.remove('open');
}

document.addEventListener('click', e => {
  const menu = document.getElementById('userMenu');
  if (menu && !menu.contains(e.target) && !loginBtn.contains(e.target)) {
    closeUserMenu();
  }
});

/* ====================================================
   AUTH STATE OBSERVER
==================================================== */
onAuthChange(async (user) => {
  if (user) {
    // Usuário logado
    loginBtn.classList.add('logged');
    document.getElementById('avatarEl').textContent =
      (user.displayName || user.email).substring(0, 2).toUpperCase();

    // Busca perfil completo
    const profile = await getUserProfile(user.uid);
    createUserMenu({
      name: profile?.name || user.displayName || '',
      email: user.email
    });
    closeLogin();
  } else {
    // Usuário deslogado
    loginBtn.classList.remove('logged');
    document.getElementById('avatarEl').textContent = '';
    const menu = document.getElementById('userMenu');
    if (menu) menu.remove();
  }
});

/* ====================================================
   LOGIN COM EMAIL
==================================================== */
document.getElementById('loginSubmit').onclick = async () => {
  clearAlert();
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPass').value;

  if (!email || !pass) {
    showAlert('Preencha todos os campos.'); return;
  }

  setLoading('loginSubmit', 'loginSpinner', true);
  const result = await loginWithEmail(email, pass);
  setLoading('loginSubmit', 'loginSpinner', false);

  if (!result.success) {
    showAlert(result.error);
  }
};

/* ====================================================
   CADASTRO COM EMAIL
==================================================== */
document.getElementById('registerSubmit').onclick = async () => {
  clearAlert();
  const name  = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const pass  = document.getElementById('registerPass').value;
  const conf  = document.getElementById('registerPassConfirm').value;

  if (!name || !email || !pass || !conf) {
    showAlert('Preencha todos os campos.'); return;
  }
  if (pass !== conf) {
    showAlert('As senhas não coincidem.'); return;
  }
  if (pass.length < 6) {
    showAlert('A senha deve ter pelo menos 6 caracteres.'); return;
  }

  setLoading('registerSubmit', 'registerSpinner', true);
  const result = await registerWithEmail(name, email, pass);
  setLoading('registerSubmit', 'registerSpinner', false);

  if (!result.success) {
    showAlert(result.error);
  } else {
    showAlert('Conta criada com sucesso! Bem-vindo ao CoreLab 🎉', 'success');
  }
};

/* ====================================================
   LOGIN COM GOOGLE
==================================================== */
document.getElementById('googleLogin').onclick = async () => {
  clearAlert();
  const result = await loginWithGoogle();
  if (!result.success) showAlert(result.error);
};

document.getElementById('googleRegister').onclick = async () => {
  clearAlert();
  const result = await loginWithGoogle();
  if (!result.success) showAlert(result.error);
};

/* ====================================================
   RESET DE SENHA
==================================================== */
document.getElementById('resetSubmit').onclick = async () => {
  clearAlert();
  const email = document.getElementById('resetEmail').value.trim();
  if (!email) { showAlert('Digite seu email.'); return; }

  const result = await resetPassword(email);
  if (result.success) {
    showAlert('Link enviado! Verifique sua caixa de entrada.', 'success');
  } else {
    showAlert(result.error);
  }
};

/* ====================================================
   CHIP POPUPS
==================================================== */
const chipOverlay = document.getElementById('chip-overlay');

document.querySelectorAll('.chip').forEach(c => c.onclick = () => {
  const d = CHIPS[c.dataset.chip];
  if (!d) return;
  document.getElementById('cpIcon').textContent = d.icon;
  document.getElementById('cpTag').textContent = d.tag;
  document.getElementById('cpTitle').textContent = d.title;
  document.getElementById('cpBody').innerHTML = d.body;
  chipOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});

document.getElementById('cpClose').onclick = closeChip;
chipOverlay.addEventListener('click', e => { if (e.target === chipOverlay) closeChip(); });
function closeChip() {
  chipOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ====================================================
   EARLY ACCESS — Salva no Firestore
==================================================== */
document.getElementById('earlyForm').onsubmit = async e => {
  e.preventDefault();
  const email = document.getElementById('earlyEmail').value.trim();
  if (!email) return;

  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '⏳ Salvando...';
  btn.disabled = true;

  try {
    const result = await saveEarlyAccessLead(email);
    document.getElementById('earlyForm').style.display = 'none';
    const msg = document.getElementById('success-msg');
    msg.style.display = 'block';
    if (result.alreadyExists) {
      msg.querySelector('p').textContent = '✅ VOCÊ JÁ ESTÁ NA LISTA!';
      msg.querySelector('span').textContent = 'Seu email já foi registrado. Aguarde nosso contato!';
    }
  } catch (err) {
    btn.textContent = 'GARANTIR VAGA';
    btn.disabled = false;
    console.error(err);
  }
};

/* ====================================================
   SCROLL REVEAL
==================================================== */
const ro = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('visible');
      ro.unobserve(en.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => ro.observe(el));

/* ====================================================
   SPLASH TAG CYCLE
==================================================== */
const splashTags = [
  'Inicializando...',
  'Carregando módulos...',
  'Preparando seu treino...'
];
let tagIndex = 0;
const stagEl = document.getElementById('stag');
const splashInterval = setInterval(() => {
  tagIndex = (tagIndex + 1) % splashTags.length;
  stagEl.textContent = splashTags[tagIndex];
}, 900);
setTimeout(() => clearInterval(splashInterval), 2800);