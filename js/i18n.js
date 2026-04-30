/* ====================================================
   I18N.JS — Sistema de Internacionalização CoreLab
   Suporta: PT (Português) | EN (English) | ES (Español)
==================================================== */

export const translations = {
  /* ══════════════════════════════════════
     PORTUGUÊS — Idioma padrão
  ══════════════════════════════════════ */
  pt: {
    // Splash
    splash_1: "Inicializando...",
    splash_2: "Carregando módulos...",
    splash_3: "Preparando seu treino...",

    // Modal — Abas
    modal_tab_login: "Entrar",
    modal_tab_register: "Cadastrar",

    // Modal — Login
    modal_login_tag: "Acesso à conta",
    modal_login_title: "BEM-VINDO<br>DE VOLTA",
    modal_label_email: "Email",
    modal_label_pass: "Senha",
    modal_ph_email: "seu@email.com",
    modal_ph_pass: "••••••••",
    modal_btn_login: "ENTRAR",
    modal_or: "ou",
    modal_google_login: "Continuar com Google",
    modal_forgot: "Esqueci minha senha",

    // Modal — Cadastro
    modal_register_tag: "Criar conta",
    modal_register_title: "COMECE<br>AGORA",
    modal_label_name: "Nome completo",
    modal_ph_name: "Seu nome",
    modal_ph_email_reg: "seu@email.com",
    modal_label_confirm: "Confirmar senha",
    modal_ph_confirm: "Repita a senha",
    modal_btn_register: "CRIAR CONTA GRÁTIS",
    modal_google_register: "Cadastrar com Google",
    modal_terms: "Ao criar conta você concorda com os",
    modal_terms_link: "Termos de Uso",

    // Modal — Reset de Senha
    modal_reset_tag: "Recuperar acesso",
    modal_reset_title: "REDEFINIR<br>SENHA",
    modal_reset_desc:
      "Digite seu email e enviaremos um link para redefinir sua senha.",
    modal_label_reset_email: "Email cadastrado",
    modal_btn_reset: "ENVIAR LINK",
    modal_back_login: "← Voltar ao login",

    // Hero — Slide 1
    slide1_eye: "Early Access — Vagas Limitadas",
    slide1_title:
      'FORJE<br><span class="acc">SEU</span> <span class="str">CORE</span>',
    slide1_sub:
      "O aplicativo que entende seu corpo. Treinos personalizados, acompanhamento em tempo real e uma comunidade que te impulsiona além dos limites.",
    slide1_cta1: "Quero Early Access →",
    slide1_cta2: "Explorar",

    // Hero — Slide 2
    slide2_eye: "IA Personalizada — Novo",
    slide2_title:
      'TREINO<br><span class="acc">COM</span> <span class="str">IA</span>',
    slide2_sub:
      "Nosso chatbot de IA analisa seu histórico, objetivos e limitações para criar o treino perfeito para você. Zero achismo, 100% ciência.",
    slide2_cta1: "Falar com a IA →",
    slide2_cta2: "Saiba mais",

    // Hero — Slide 3
    slide3_eye: "Comunidade — Elite",
    slide3_title:
      'JUNTE-SE<br><span class="acc">À</span> <span class="str">ELITE</span>',
    slide3_sub:
      "Crie desafios, conquiste prêmios e conecte-se com atletas de alta performance. A comunidade que transforma rotinas em resultados.",
    slide3_cta1: "Entrar na Comunidade →",
    slide3_cta2: "Ver desafios",

    // Hero — Slide 4
    slide4_eye: "Dashboard — Power Analytics",
    slide4_title:
      'SEU<br><span class="acc">PROGRESSO</span> <span class="str">REAL</span>',
    slide4_sub:
      "Dashboards em tempo real com métricas de performance, composição corporal e evolução semanal. Dados que inspiram ação.",
    slide4_cta1: "Ver Dashboard →",
    slide4_cta2: "Explorar métricas",

    scroll_hint: "scroll",

    // Seção 01 — Mente
    sec_mente_tag: "01 — Mente",
    sec_mente_title: 'TREINO<br><span class="acc">MENTAL</span>',
    sec_mente_body:
      "Seu maior músculo é o cérebro. Técnicas de foco, respiração e mindfulness integradas ao treino para performance máxima.",
    vis_mente_badge: "FOCO ATIVADO",

    // Seção 02 — Força
    sec_forca_tag: "02 — Força",
    sec_forca_title: 'PODER<br><span class="acc">MUSCULAR</span>',
    sec_forca_body:
      "Protocolos de hipertrofia desenvolvidos com especialistas. Séries e cargas ajustadas automaticamente ao seu progresso.",
    vis_forca_badge: "MÚSCULO ATIVO",

    // Seção 03 — Cardio
    sec_cardio_tag: "03 — Cardio",
    sec_cardio_title: 'CORAÇÃO<br><span class="acc">DE AÇO</span>',
    sec_cardio_body:
      "HIIT, LISS, Steady State — o sistema identifica o treino cardiovascular ideal para seu perfil e objetivo.",
    vis_cardio_badge: "BPM 145",

    // Seção 04 — Flexibilidade
    sec_flexi_tag: "04 — Flexibilidade",
    sec_flexi_title: 'CORPO<br><span class="acc">LIVRE</span>',
    sec_flexi_body:
      "Mobilidade e flexibilidade que previnem lesões e melhoram performance. Rotinas guiadas por vídeo adaptadas ao seu nível.",
    vis_flexi_badge: "AMPLITUDE MAX",

    // Seção 05 — Recuperação
    sec_recup_tag: "05 — Recuperação",
    sec_recup_title: 'RENASÇA<br><span class="acc">MAIS FORTE</span>',
    sec_recup_body:
      "O descanso é onde o crescimento acontece. Monitoramento de sono, nutrição e recuperação muscular integrados.",
    vis_recup_badge: "RECUPERAÇÃO 100%",

    // Chips — Mente
    chip_foco: "Foco",
    chip_mindfulness: "Mindfulness",
    chip_respiracao: "Respiração",
    chip_sono: "Sono & Recuperação",

    // Chips — Força
    chip_hipertrofia: "Hipertrofia",
    chip_forca_maxima: "Força Máxima",
    chip_composicao: "Composição Corporal",

    // Chips — Cardio
    chip_hiit: "HIIT",
    chip_resistencia: "Resistência",
    chip_queima: "Queima de Gordura",

    // Chips — Flexibilidade
    chip_mobilidade: "Mobilidade",
    chip_alongamento: "Alongamento",
    chip_yoga: "Yoga & Pilates",

    // Chips — Recuperação
    chip_sono2: "Sono",
    chip_nutricao: "Nutrição",
    chip_hidratacao: "Hidratação",
    chip_descanso: "Dias de descanso",

    // Features
    feat_tag: "Funcionalidades",
    feat_title: 'TUDO QUE <span class="acc">VOCÊ PRECISA</span>',
    feat_badge_live: "AO VIVO",
    feat1_title: "Progresso em Tempo Real",
    feat1_desc:
      "Dashboards com métricas de performance, composição corporal e evolução semanal — como um Power BI do seu treino.",
    feat1_cta: "Ver Dashboard",
    feat2_title: "IA Personalizada",
    feat2_desc:
      "Chatbot que cria treinos sob medida, responde dúvidas e adapta seu plano baseado no seu progresso.",
    feat2_cta: "Conversar com IA",
    feat3_title: "Comunidade Elite",
    feat3_desc:
      "Desafios, prêmios e uma rede social focada em performance. Conecte-se com atletas de alto nível.",
    feat3_cta: "Entrar na Comunidade",
    feat4_title: "100% Offline",
    feat4_desc:
      "Treinos, vídeos e métricas disponíveis sem internet. Gym, parque ou quarto — sem desculpas para parar.",
    feat4_cta: "Saiba como funciona",

    // Early Access
    early_tag: "Early Access",
    early_title: 'SEJA O<br><span class="acc">PRIMEIRO</span>',
    early_sub:
      "Garanta acesso antecipado e exclusivo antes do lançamento oficial.",
    early_placeholder: "seu@email.com",
    early_btn: "GARANTIR VAGA",
    early_note: "✓ Sem spam \u00a0 ✓ Cancele quando quiser \u00a0 ✓ Grátis",
    early_success_title: "🎉 VOCÊ ESTÁ NA LISTA!",
    early_success_sub:
      "Entraremos em contato com seu acesso exclusivo em breve.",

    // Footer
    foot_privacy: "Política de Privacidade",
    foot_terms: "Termos de Uso",
    foot_contact: "Contato",
    foot_copy:
      "© 2026 CoreLab Corporation — UNIP Limeira. Todos os direitos reservados.",
  },

  /* ══════════════════════════════════════
     ENGLISH
  ══════════════════════════════════════ */
  en: {
    // Splash
    splash_1: "Initializing...",
    splash_2: "Loading modules...",
    splash_3: "Preparing your workout...",

    // Modal — Tabs
    modal_tab_login: "Sign In",
    modal_tab_register: "Register",

    // Modal — Login
    modal_login_tag: "Account access",
    modal_login_title: "WELCOME<br>BACK",
    modal_label_email: "Email",
    modal_label_pass: "Password",
    modal_ph_email: "your@email.com",
    modal_ph_pass: "••••••••",
    modal_btn_login: "SIGN IN",
    modal_or: "or",
    modal_google_login: "Continue with Google",
    modal_forgot: "Forgot my password",

    // Modal — Register
    modal_register_tag: "Create account",
    modal_register_title: "START<br>NOW",
    modal_label_name: "Full name",
    modal_ph_name: "Your name",
    modal_ph_email_reg: "your@email.com",
    modal_label_confirm: "Confirm password",
    modal_ph_confirm: "Repeat password",
    modal_btn_register: "CREATE FREE ACCOUNT",
    modal_google_register: "Register with Google",
    modal_terms: "By creating an account you agree to the",
    modal_terms_link: "Terms of Use",

    // Modal — Reset
    modal_reset_tag: "Recover access",
    modal_reset_title: "RESET<br>PASSWORD",
    modal_reset_desc:
      "Enter your email and we will send you a link to reset your password.",
    modal_label_reset_email: "Registered email",
    modal_btn_reset: "SEND LINK",
    modal_back_login: "← Back to login",

    // Hero — Slide 1
    slide1_eye: "Early Access — Limited Spots",
    slide1_title:
      'FORGE<br><span class="acc">YOUR</span> <span class="str">CORE</span>',
    slide1_sub:
      "The app that understands your body. Personalized workouts, real-time tracking, and a community that pushes you beyond your limits.",
    slide1_cta1: "I want Early Access →",
    slide1_cta2: "Explore",

    // Hero — Slide 2
    slide2_eye: "Personalized AI — New",
    slide2_title:
      'TRAIN<br><span class="acc">WITH</span> <span class="str">AI</span>',
    slide2_sub:
      "Our AI chatbot analyzes your history, goals, and limitations to craft the perfect workout for you. Zero guesswork, 100% science.",
    slide2_cta1: "Talk to the AI →",
    slide2_cta2: "Learn more",

    // Hero — Slide 3
    slide3_eye: "Community — Elite",
    slide3_title:
      'JOIN<br><span class="acc">THE</span> <span class="str">ELITE</span>',
    slide3_sub:
      "Create challenges, win prizes, and connect with high-performance athletes. The community that turns routines into results.",
    slide3_cta1: "Join the Community →",
    slide3_cta2: "See challenges",

    // Hero — Slide 4
    slide4_eye: "Dashboard — Power Analytics",
    slide4_title:
      'YOUR<br><span class="acc">REAL</span> <span class="str">PROGRESS</span>',
    slide4_sub:
      "Real-time dashboards with performance metrics, body composition, and weekly evolution. Data that inspires action.",
    slide4_cta1: "View Dashboard →",
    slide4_cta2: "Explore metrics",

    scroll_hint: "scroll",

    // Section 01 — Mind
    sec_mente_tag: "01 — Mind",
    sec_mente_title: 'MENTAL<br><span class="acc">TRAINING</span>',
    sec_mente_body:
      "Your greatest muscle is your brain. Focus, breathing, and mindfulness techniques integrated into training for peak performance.",
    vis_mente_badge: "FOCUS ACTIVATED",

    // Section 02 — Strength
    sec_forca_tag: "02 — Strength",
    sec_forca_title: 'MUSCULAR<br><span class="acc">POWER</span>',
    sec_forca_body:
      "Hypertrophy protocols developed with specialists. Sets and loads automatically adjusted to your progress.",
    vis_forca_badge: "MUSCLE ACTIVE",

    // Section 03 — Cardio
    sec_cardio_tag: "03 — Cardio",
    sec_cardio_title: 'HEART<br><span class="acc">OF STEEL</span>',
    sec_cardio_body:
      "HIIT, LISS, Steady State — the system identifies the ideal cardiovascular workout for your profile and goal.",
    vis_cardio_badge: "BPM 145",

    // Section 04 — Flexibility
    sec_flexi_tag: "04 — Flexibility",
    sec_flexi_title: 'FREE<br><span class="acc">BODY</span>',
    sec_flexi_body:
      "Mobility and flexibility that prevent injuries and enhance performance. Video-guided routines adapted to your level.",
    vis_flexi_badge: "MAX AMPLITUDE",

    // Section 05 — Recovery
    sec_recup_tag: "05 — Recovery",
    sec_recup_title: 'RISE<br><span class="acc">STRONGER</span>',
    sec_recup_body:
      "Rest is where growth happens. Sleep monitoring, nutrition, and muscle recovery — all integrated.",
    vis_recup_badge: "RECOVERY 100%",

    // Chips
    chip_foco: "Focus",
    chip_mindfulness: "Mindfulness",
    chip_respiracao: "Breathing",
    chip_sono: "Sleep & Recovery",
    chip_hipertrofia: "Hypertrophy",
    chip_forca_maxima: "Max Strength",
    chip_composicao: "Body Composition",
    chip_hiit: "HIIT",
    chip_resistencia: "Endurance",
    chip_queima: "Fat Burning",
    chip_mobilidade: "Mobility",
    chip_alongamento: "Stretching",
    chip_yoga: "Yoga & Pilates",
    chip_sono2: "Sleep",
    chip_nutricao: "Nutrition",
    chip_hidratacao: "Hydration",
    chip_descanso: "Rest Days",

    // Features
    feat_tag: "Features",
    feat_title: 'EVERYTHING <span class="acc">YOU NEED</span>',
    feat_badge_live: "LIVE",
    feat1_title: "Real-Time Progress",
    feat1_desc:
      "Dashboards with performance metrics, body composition, and weekly evolution — like a Power BI for your workout.",
    feat1_cta: "View Dashboard",
    feat2_title: "Personalized AI",
    feat2_desc:
      "Chatbot that creates custom workouts, answers questions, and adapts your plan based on your progress.",
    feat2_cta: "Chat with AI",
    feat3_title: "Elite Community",
    feat3_desc:
      "Challenges, prizes, and a performance-focused social network. Connect with high-level athletes.",
    feat3_cta: "Join the Community",
    feat4_title: "100% Offline",
    feat4_desc:
      "Workouts, videos, and metrics available without internet. Gym, park, or bedroom — no excuses to stop.",
    feat4_cta: "Learn how it works",

    // Early Access
    early_tag: "Early Access",
    early_title: 'BE THE<br><span class="acc">FIRST</span>',
    early_sub: "Get early and exclusive access before the official launch.",
    early_placeholder: "your@email.com",
    early_btn: "SECURE MY SPOT",
    early_note: "✓ No spam \u00a0 ✓ Cancel anytime \u00a0 ✓ Free",
    early_success_title: "🎉 YOU'RE ON THE LIST!",
    early_success_sub: "We'll contact you with your exclusive access soon.",

    // Footer
    foot_privacy: "Privacy Policy",
    foot_terms: "Terms of Use",
    foot_contact: "Contact",
    foot_copy:
      "© 2026 CoreLab Corporation — UNIP Limeira. All rights reserved.",
  },

  /* ══════════════════════════════════════
     ESPAÑOL
  ══════════════════════════════════════ */
  es: {
    // Splash
    splash_1: "Inicializando...",
    splash_2: "Cargando módulos...",
    splash_3: "Preparando tu entrenamiento...",

    // Modal — Pestañas
    modal_tab_login: "Entrar",
    modal_tab_register: "Registrarse",

    // Modal — Login
    modal_login_tag: "Acceso a cuenta",
    modal_login_title: "BIENVENIDO<br>DE NUEVO",
    modal_label_email: "Email",
    modal_label_pass: "Contraseña",
    modal_ph_email: "tu@email.com",
    modal_ph_pass: "••••••••",
    modal_btn_login: "ENTRAR",
    modal_or: "o",
    modal_google_login: "Continuar con Google",
    modal_forgot: "Olvidé mi contraseña",

    // Modal — Registro
    modal_register_tag: "Crear cuenta",
    modal_register_title: "COMIENZA<br>AHORA",
    modal_label_name: "Nombre completo",
    modal_ph_name: "Tu nombre",
    modal_ph_email_reg: "tu@email.com",
    modal_label_confirm: "Confirmar contraseña",
    modal_ph_confirm: "Repite la contraseña",
    modal_btn_register: "CREAR CUENTA GRATIS",
    modal_google_register: "Registrarse con Google",
    modal_terms: "Al crear cuenta aceptas los",
    modal_terms_link: "Términos de Uso",

    // Modal — Reset
    modal_reset_tag: "Recuperar acceso",
    modal_reset_title: "RESTABLECER<br>CONTRASEÑA",
    modal_reset_desc:
      "Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.",
    modal_label_reset_email: "Email registrado",
    modal_btn_reset: "ENVIAR ENLACE",
    modal_back_login: "← Volver al login",

    // Hero — Slide 1
    slide1_eye: "Early Access — Plazas Limitadas",
    slide1_title:
      'FORJA<br><span class="acc">TU</span> <span class="str">CORE</span>',
    slide1_sub:
      "La app que entiende tu cuerpo. Entrenamientos personalizados, seguimiento en tiempo real y una comunidad que te impulsa más allá de tus límites.",
    slide1_cta1: "Quiero Early Access →",
    slide1_cta2: "Explorar",

    // Hero — Slide 2
    slide2_eye: "IA Personalizada — Nuevo",
    slide2_title:
      'ENTRENA<br><span class="acc">CON</span> <span class="str">IA</span>',
    slide2_sub:
      "Nuestro chatbot de IA analiza tu historial, objetivos y limitaciones para crear el entrenamiento perfecto. Cero suposiciones, 100% ciencia.",
    slide2_cta1: "Hablar con la IA →",
    slide2_cta2: "Saber más",

    // Hero — Slide 3
    slide3_eye: "Comunidad — Elite",
    slide3_title:
      'ÚNETE<br><span class="acc">A LA</span> <span class="str">ELITE</span>',
    slide3_sub:
      "Crea desafíos, gana premios y conéctate con atletas de alto rendimiento. La comunidad que transforma rutinas en resultados.",
    slide3_cta1: "Unirse a la Comunidad →",
    slide3_cta2: "Ver desafíos",

    // Hero — Slide 4
    slide4_eye: "Dashboard — Power Analytics",
    slide4_title:
      'TU<br><span class="acc">PROGRESO</span> <span class="str">REAL</span>',
    slide4_sub:
      "Dashboards en tiempo real con métricas de rendimiento, composición corporal y evolución semanal. Datos que inspiran acción.",
    slide4_cta1: "Ver Dashboard →",
    slide4_cta2: "Explorar métricas",

    scroll_hint: "scroll",

    // Sección 01 — Mente
    sec_mente_tag: "01 — Mente",
    sec_mente_title: 'ENTRENAMIENTO<br><span class="acc">MENTAL</span>',
    sec_mente_body:
      "Tu mayor músculo es el cerebro. Técnicas de foco, respiración y mindfulness integradas al entrenamiento para máximo rendimiento.",
    vis_mente_badge: "FOCO ACTIVADO",

    // Sección 02 — Fuerza
    sec_forca_tag: "02 — Fuerza",
    sec_forca_title: 'PODER<br><span class="acc">MUSCULAR</span>',
    sec_forca_body:
      "Protocolos de hipertrofia desarrollados con especialistas. Series y cargas ajustadas automáticamente a tu progreso.",
    vis_forca_badge: "MÚSCULO ACTIVO",

    // Sección 03 — Cardio
    sec_cardio_tag: "03 — Cardio",
    sec_cardio_title: 'CORAZÓN<br><span class="acc">DE ACERO</span>',
    sec_cardio_body:
      "HIIT, LISS, Steady State — el sistema identifica el entrenamiento cardiovascular ideal para tu perfil y objetivo.",
    vis_cardio_badge: "BPM 145",

    // Sección 04 — Flexibilidad
    sec_flexi_tag: "04 — Flexibilidad",
    sec_flexi_title: 'CUERPO<br><span class="acc">LIBRE</span>',
    sec_flexi_body:
      "Movilidad y flexibilidad que previenen lesiones y mejoran el rendimiento. Rutinas guiadas por video adaptadas a tu nivel.",
    vis_flexi_badge: "AMPLITUD MÁX",

    // Sección 05 — Recuperación
    sec_recup_tag: "05 — Recuperación",
    sec_recup_title: 'RENACE<br><span class="acc">MÁS FUERTE</span>',
    sec_recup_body:
      "El descanso es donde ocurre el crecimiento. Monitoreo de sueño, nutrición y recuperación muscular integrados.",
    vis_recup_badge: "RECUPERACIÓN 100%",

    // Chips
    chip_foco: "Foco",
    chip_mindfulness: "Mindfulness",
    chip_respiracao: "Respiración",
    chip_sono: "Sueño & Recuperación",
    chip_hipertrofia: "Hipertrofia",
    chip_forca_maxima: "Fuerza Máxima",
    chip_composicao: "Composición Corporal",
    chip_hiit: "HIIT",
    chip_resistencia: "Resistencia",
    chip_queima: "Quema de Grasa",
    chip_mobilidade: "Movilidad",
    chip_alongamento: "Estiramiento",
    chip_yoga: "Yoga & Pilates",
    chip_sono2: "Sueño",
    chip_nutricao: "Nutrición",
    chip_hidratacao: "Hidratación",
    chip_descanso: "Días de descanso",

    // Features
    feat_tag: "Funcionalidades",
    feat_title: 'TODO LO QUE <span class="acc">NECESITAS</span>',
    feat_badge_live: "EN VIVO",
    feat1_title: "Progreso en Tiempo Real",
    feat1_desc:
      "Dashboards con métricas de rendimiento, composición corporal y evolución semanal — como un Power BI de tu entrenamiento.",
    feat1_cta: "Ver Dashboard",
    feat2_title: "IA Personalizada",
    feat2_desc:
      "Chatbot que crea entrenamientos a medida, responde dudas y adapta tu plan basado en tu progreso.",
    feat2_cta: "Conversar con IA",
    feat3_title: "Comunidad Elite",
    feat3_desc:
      "Desafíos, premios y una red social enfocada en rendimiento. Conéctate con atletas de alto nivel.",
    feat3_cta: "Unirse a la Comunidad",
    feat4_title: "100% Offline",
    feat4_desc:
      "Entrenamientos, videos y métricas disponibles sin internet. Gimnasio, parque o habitación — sin excusas para parar.",
    feat4_cta: "Aprende cómo funciona",

    // Early Access
    early_tag: "Early Access",
    early_title: 'SÉ EL<br><span class="acc">PRIMERO</span>',
    early_sub:
      "Asegura acceso anticipado y exclusivo antes del lanzamiento oficial.",
    early_placeholder: "tu@email.com",
    early_btn: "ASEGURAR PLAZA",
    early_note: "✓ Sin spam \u00a0 ✓ Cancela cuando quieras \u00a0 ✓ Gratis",
    early_success_title: "🎉 ¡ESTÁS EN LA LISTA!",
    early_success_sub:
      "Nos pondremos en contacto con tu acceso exclusivo pronto.",

    // Footer
    foot_privacy: "Política de Privacidad",
    foot_terms: "Términos de Uso",
    foot_contact: "Contacto",
    foot_copy:
      "© 2026 CoreLab Corporation — UNIP Limeira. Todos los derechos reservados.",
  },
};

/* ====================================================
   APPLY LANG — Aplica traduções ao DOM
==================================================== */
let currentLang = "pt";

export function applyLang(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  const t = translations[lang];

  // 1. Texto simples (textContent)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // 2. Conteúdo HTML — títulos com <span> coloridos
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // 3. Placeholders de inputs
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // 4. Atualiza estado ativo dos botões de idioma
  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.lang === lang);
  });

  // 5. Atualiza atributo lang do <html>
  document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;

  // 6. Persiste preferência no localStorage
  try {
    localStorage.setItem("corelab_lang", lang);
  } catch (_) {}
}

/* ====================================================
   GET CURRENT LANG
==================================================== */
export function getCurrentLang() {
  return currentLang;
}

/* ====================================================
   INIT — Carrega idioma salvo ou padrão (PT)
==================================================== */
export function initI18n() {
  let saved = "pt";
  try {
    saved = localStorage.getItem("corelab_lang") || "pt";
  } catch (_) {}
  const lang = translations[saved] ? saved : "pt";
  applyLang(lang);
}
