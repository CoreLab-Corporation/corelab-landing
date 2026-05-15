/* ==================================================== // Início do bloco de cabeçalho do i18n
   I18N.JS — Sistema de Internacionalização CoreLab // Nome e propósito do arquivo
   Suporta: PT (Português) | EN (English) | ES (Español) // Idiomas disponíveis no sistema
==================================================== */ // Fim do bloco de cabeçalho

export const translations = {
  // Exporta o objeto principal contendo todas as traduções do app
  /* ══════════════════════════════════════ // Divisor visual para a seção de Português
     PORTUGUÊS — Idioma padrão // Cabeçalho da seção PT
  ══════════════════════════════════════ */ // Fim do divisor
  pt: {
    // Início das chaves em Português
    // Splash // Seção da tela de carregamento inicial
    splash_1: "Inicializando...", // Texto de inicialização do sistema
    splash_2: "Carregando módulos...", // Texto de carregamento de dependências
    splash_3: "Preparando seu treino...", // Texto final da splash screen

    // Modal — Abas // Seção de navegação do modal de autenticação
    modal_tab_login: "Entrar", // Texto da aba de login
    modal_tab_register: "Cadastrar", // Texto da aba de cadastro

    // Modal — Login // Campos e botões da tela de login
    modal_login_tag: "Acesso à conta", // Tag superior do modal
    modal_login_title: "BEM-VINDO<br>DE VOLTA", // Título com quebra de linha HTML
    modal_label_email: "Email", // Rótulo do campo de email
    modal_label_pass: "Senha", // Rótulo do campo de senha
    modal_ph_email: "seu@email.com", // Placeholder de exemplo de email
    modal_ph_pass: "••••••••", // Placeholder visual de senha
    modal_btn_login: "ENTRAR", // Texto do botão principal de login
    modal_or: "ou", // Divisor de métodos de login
    modal_google_login: "Continuar com Google", // Botão de login social via Google
    modal_forgot: "Esqueci minha senha", // Link para recuperação de senha

    // Modal — Cadastro // Campos e botões da tela de registro
    modal_register_tag: "Criar conta", // Tag superior do cadastro
    modal_register_title: "COMECE<br>AGORA", // Título de boas-vindas ao cadastro
    modal_label_name: "Nome completo", // Rótulo do campo de nome
    modal_ph_name: "Seu nome", // Placeholder para o nome do usuário
    modal_ph_email_reg: "seu@email.com", // Placeholder do email no registro
    modal_label_confirm: "Confirmar senha", // Rótulo da confirmação de senha
    modal_ph_confirm: "Repita a senha", // Placeholder de confirmação
    modal_btn_register: "CRIAR CONTA GRÁTIS", // Texto do botão de submissão do cadastro
    modal_google_register: "Cadastrar com Google", // Botão de cadastro social
    modal_terms: "Ao criar conta você concorda com os", // Texto de aceitação legal
    modal_terms_link: "Termos de Uso", // Link clicável para os termos

    // Modal — Reset de Senha // Interface de recuperação de conta
    modal_reset_tag: "Recuperar acesso", // Tag do formulário de reset
    modal_reset_title: "REDEFINIR<br>SENHA", // Título da recuperação
    // Descrição explicativa do processo
    modal_reset_desc:
      "Digite seu email e enviaremos um link para redefinir sua senha.", // Texto da descrição
    modal_label_reset_email: "Email cadastrado", // Rótulo do email de recuperação
    modal_btn_reset: "ENVIAR LINK", // Texto do botão de envio de email
    modal_back_login: "← Voltar ao login", // Link para retornar à tela anterior

    // Hero — Slide 1 // Conteúdo do primeiro slide do carrossel principal
    slide1_eye: "Early Access — Vagas Limitadas", // Texto de destaque superior
    // Título principal com classes de estilo aplicadas
    slide1_title:
      'FORJE<br><span class="acc">SEU</span> <span class="str">CORE</span>', // HTML formatado
    // Subtítulo do primeiro slide
    slide1_sub:
      "O aplicativo que entende seu corpo. Treinos personalizados, acompanhamento em tempo real e uma comunidade que te impulsiona além dos limites.", // Descrição longa
    slide1_cta1: "Quero Early Access →", // Botão principal de ação (CTA)
    slide1_cta2: "Explorar", // Botão secundário de navegação

    // Hero — Slide 2 // Conteúdo focado na Inteligência Artificial
    slide2_eye: "IA Personalizada — Novo", // Tag de novidade
    // Título da seção de IA
    slide2_title:
      'TREINO<br><span class="acc">COM</span> <span class="str">IA</span>', // HTML formatado para IA
    // Descrição da funcionalidade da IA
    slide2_sub:
      "Nosso chatbot de IA analisa seu histórico, objetivos e limitações para criar o treino perfeito para você. Zero achismo, 100% ciência.", // Texto de marketing
    slide2_cta1: "Falar com a IA →", // Botão para abrir o chat
    slide2_cta2: "Saiba mais", // Botão de detalhes técnicos

    // Hero — Slide 3 // Conteúdo sobre o aspecto social
    slide3_eye: "Comunidade — Elite", // Tag da comunidade
    // Título da seção de comunidade
    slide3_title:
      'JUNTE-SE<br><span class="acc">À</span> <span class="str">ELITE</span>', // HTML formatado para elite
    // Descrição da rede social
    slide3_sub:
      "Crie desafios, conquiste prêmios e conecte-se com atletas de alta performance. A comunidade que transforma rotinas em resultados.", // Texto de impacto
    slide3_cta1: "Entrar na Comunidade →", // Botão para página de comunidade
    slide3_cta2: "Ver desafios", // Botão para desafios ativos

    // Hero — Slide 4 // Conteúdo sobre dados e analytics
    slide4_eye: "Dashboard — Power Analytics", // Tag do painel de controle
    // Título da seção de métricas
    slide4_title:
      'SEU<br><span class="acc">PROGRESSO</span> <span class="str">REAL</span>', // HTML formatado para progresso
    // Descrição dos dados exibidos
    slide4_sub:
      "Dashboards em tempo real com métricas de performance, composição corporal e evolução semanal. Dados que inspiram ação.", // Texto analítico
    slide4_cta1: "Ver Dashboard →", // Botão para abrir o painel
    slide4_cta2: "Explorar métricas", // Botão para lista de métricas

    scroll_hint: "scroll", // Indicador visual de rolagem

    // Seção 01 — Mente // Detalhes da seção de foco mental
    sec_mente_tag: "01 — Mente", // Número e título da tag
    sec_mente_title: 'TREINO<br><span class="acc">MENTAL</span>', // Título formatado
    // Corpo de texto da seção
    sec_mente_body:
      "Seu maior músculo é o cérebro. Técnicas de foco, respiração e mindfulness integradas ao treino para performance máxima.", // Descrição
    vis_mente_badge: "FOCO ATIVADO", // Texto do badge visual

    // Seção 02 — Força // Detalhes da seção de hipertrofia
    sec_forca_tag: "02 — Força", // Tag de força
    sec_forca_title: 'PODER<br><span class="acc">MUSCULAR</span>', // Título de força
    // Corpo de texto de força
    sec_forca_body:
      "Protocolos de hipertrofia desenvolvidos com especialistas. Séries e cargas ajustadas automaticamente ao seu progresso.", // Descrição
    vis_forca_badge: "MÚSCULO ATIVO", // Badge de atividade muscular

    // Seção 03 — Cardio // Detalhes da seção cardiovascular
    sec_cardio_tag: "03 — Cardio", // Tag de cardio
    sec_cardio_title: 'CORAÇÃO<br><span class="acc">DE AÇO</span>', // Título de cardio
    // Corpo de texto de cardio
    sec_cardio_body:
      "HIIT, LISS, Steady State — o sistema identifica o treino cardiovascular ideal para seu perfil e objetivo.", // Descrição
    vis_cardio_badge: "BPM 145", // Exemplo de batimento cardíaco

    // Seção 04 — Flexibilidade // Detalhes da seção de mobilidade
    sec_flexi_tag: "04 — Flexibilidade", // Tag de flexibilidade
    sec_flexi_title: 'CORPO<br><span class="acc">LIVRE</span>', // Título de flexibilidade
    // Corpo de texto de flexibilidade
    sec_flexi_body:
      "Mobilidade e flexibilidade que previnem lesões e melhoram performance. Rotinas guiadas por vídeo adaptadas ao seu nível.", // Descrição
    vis_flexi_badge: "AMPLITUDE MAX", // Badge de mobilidade

    // Seção 05 — Recuperação // Detalhes da seção de descanso
    sec_recup_tag: "05 — Recuperação", // Tag de recuperação
    sec_recup_title: 'RENASÇA<br><span class="acc">MAIS FORTE</span>', // Título de regeneração
    // Corpo de texto de recuperação
    sec_recup_body:
      "O descanso é onde o crescimento acontece. Monitoramento de sono, nutrição e recuperação muscular integrados.", // Descrição
    vis_recup_badge: "RECUPERAÇÃO 100%", // Badge de estado regenerado

    // Chips — Mente // Botões de categoria de mente
    chip_foco: "Foco", // Categoria de concentração
    chip_mindfulness: "Mindfulness", // Categoria de consciência plena
    chip_respiracao: "Respiração", // Categoria de controle respiratório
    chip_sono: "Sono & Recuperação", // Categoria de descanso

    // Chips — Força // Botões de categoria de força
    chip_hipertrofia: "Hipertrofia", // Categoria de ganho de massa
    chip_forca_maxima: "Force Máxima", // Categoria de carga pesada
    chip_composicao: "Composição Corporal", // Categoria de medidas corporais

    // Chips — Cardio // Botões de categoria de cardio
    chip_hiit: "HIIT", // Categoria de alta intensidade
    chip_resistencia: "Resistência", // Categoria de fôlego
    chip_queima: "Queima de Gordura", // Categoria calórica

    // Chips — Flexibilidade // Botões de categoria de mobilidade
    chip_mobilidade: "Mobilidade", // Categoria de movimento articular
    chip_alongamento: "Alongamento", // Categoria de extensão muscular
    chip_yoga: "Yoga & Pilates", // Categoria de equilíbrio

    // Chips — Recuperação // Botões de categoria de regeneração
    chip_sono2: "Sono", // Categoria dormir
    chip_nutricao: "Nutrição", // Categoria alimentação
    chip_hidratacao: "Hidratação", // Categoria água
    chip_descanso: "Dias de descanso", // Categoria folga

    // Features // Lista de principais funcionalidades do app
    feat_tag: "Funcionalidades", // Cabeçalho da seção de recursos
    feat_title: 'TUDO QUE <span class="acc">VOCÊ PRECISA</span>', // Título da vitrine de funções
    feat_badge_live: "AO VIVO", // Badge para recursos síncronos
    feat1_title: "Progresso em Tempo Real", // Título da feature de dashboard
    // Descrição do dashboard
    feat1_desc:
      "Dashboards com métricas de performance, composição corporal e evolução semanal — como um Power BI do seu treino.", // Texto explicativo
    feat1_cta: "Ver Dashboard", // Botão para o dashboard
    feat2_title: "IA Personalizada", // Título da feature de IA
    // Descrição da IA
    feat2_desc:
      "Chatbot que cria treinos sob medida, responde dúvidas e adapta seu plano baseado no seu progresso.", // Texto explicativo
    feat2_cta: "Conversar com IA", // Botão para o chatbot
    feat3_title: "Comunidade Elite", // Título da feature social
    // Descrição da comunidade
    feat3_desc:
      "Desafios, prêmios e uma rede social focada em performance. Conecte-se com atletas de alto nível.", // Texto explicativo
    feat3_cta: "Entrar na Comunidade", // Botão para a rede social
    feat4_title: "100% Offline", // Título da feature de uso local
    // Descrição do modo offline
    feat4_desc:
      "Treinos, vídeos e métricas disponíveis sem internet. Gym, parque ou quarto — sem desculpas para parar.", // Texto explicativo
    feat4_cta: "Saiba como funciona", // Botão de detalhes técnicos

    // Early Access // Seção do formulário de acesso antecipado
    early_tag: "Early Access", // Tag da seção
    early_title: 'SEJA O<br><span class="acc">PRIMEIRO</span>', // Título de convite
    // Subtítulo do convite
    early_sub:
      "Garanta acesso antecipado e exclusivo antes do lançamento oficial.", // Promessa de valor
    early_placeholder: "seu@email.com", // Placeholder do campo de email
    early_btn: "GARANTIR VAGA", // Texto do botão de inscrição
    early_note: "✓ Sem spam \u00a0 ✓ Cancele quando quiser \u00a0 ✓ Grátis", // Notas de segurança/privacidade
    early_success_title: "🎉 VOCÊ ESTÁ NA LISTA!", // Título de sucesso da inscrição
    // Subtítulo de confirmação
    early_success_sub:
      "Entraremos em contato com seu acesso exclusivo em breve.", // Próximo passo

    // Footer // Links e informações do rodapé
    foot_privacy: "Política de Privacidade", // Link de privacidade
    foot_terms: "Termos de Uso", // Link de termos legais
    foot_contact: "Contato", // Link de suporte/contato
    // Créditos e copyright
    foot_copy:
      "© 2026 CoreLab Corporation — UNIP Limeira. Todos os direitos reservados.", // Rodapé institucional
  }, // Fim das traduções em Português

  /* ══════════════════════════════════════ // Divisor visual para a seção de Inglês
     ENGLISH // Cabeçalho da seção EN
  ══════════════════════════════════════ */ // Fim do divisor
  en: {
    // Início das chaves em Inglês
    // Splash // Seção da tela de carregamento (EN)
    splash_1: "Initializing...", // Texto de inicialização
    splash_2: "Loading modules...", // Texto de carregamento
    splash_3: "Preparing your workout...", // Texto final

    // Modal — Tabs // Abas do modal (EN)
    modal_tab_login: "Sign In", // Entrar
    modal_tab_register: "Register", // Cadastrar

    // Modal — Login // Tela de login (EN)
    modal_login_tag: "Account access", // Acesso
    modal_login_title: "WELCOME<br>BACK", // Boas-vindas
    modal_label_email: "Email", // Email
    modal_label_pass: "Password", // Senha
    modal_ph_email: "your@email.com", // Placeholder email
    modal_ph_pass: "••••••••", // Placeholder senha
    modal_btn_login: "SIGN IN", // Botão entrar
    modal_or: "or", // Ou
    modal_google_login: "Continue with Google", // Login Google
    modal_forgot: "Forgot my password", // Esqueci senha

    // Modal — Register // Tela de cadastro (EN)
    modal_register_tag: "Create account", // Criar conta
    modal_register_title: "START<br>NOW", // Comece agora
    modal_label_name: "Full name", // Nome completo
    modal_ph_name: "Your name", // Placeholder nome
    modal_ph_email_reg: "your@email.com", // Placeholder email
    modal_label_confirm: "Confirm password", // Confirmar senha
    modal_ph_confirm: "Repeat password", // Placeholder repita
    modal_btn_register: "CREATE FREE ACCOUNT", // Botão criar conta
    modal_google_register: "Register with Google", // Cadastro Google
    modal_terms: "By creating an account you agree to the", // Ao criar conta...
    modal_terms_link: "Terms of Use", // Termos de uso

    // Modal — Reset // Recuperação de senha (EN)
    modal_reset_tag: "Recover access", // Recuperar
    modal_reset_title: "RESET<br>PASSWORD", // Redefinir senha
    // Descrição
    modal_reset_desc:
      "Enter your email and we will send you a link to reset your password.", // Digite seu email...
    modal_label_reset_email: "Registered email", // Email cadastrado
    modal_btn_reset: "SEND LINK", // Enviar link
    modal_back_login: "← Back to login", // Voltar ao login

    // Hero — Slide 1 // Carrossel slide 1 (EN)
    slide1_eye: "Early Access — Limited Spots", // Vagas limitadas
    // Título Hero
    slide1_title:
      'FORGE<br><span class="acc">YOUR</span> <span class="str">CORE</span>', // HTML hero
    // Subtítulo
    slide1_sub:
      "The app that understands your body. Personalized workouts, real-time tracking, and a community that pushes you beyond your limits.", // Texto marketing
    slide1_cta1: "I want Early Access →", // Botão CTA 1
    slide1_cta2: "Explore", // Botão CTA 2

    // Hero — Slide 2 // Carrossel slide 2 (EN)
    slide2_eye: "Personalized AI — New", // Novo
    // Título IA
    slide2_title:
      'TRAIN<br><span class="acc">WITH</span> <span class="str">AI</span>', // HTML IA
    // Descrição IA
    slide2_sub:
      "Our AI chatbot analyzes your history, goals, and limitations to craft the perfect workout for you. Zero guesswork, 100% science.", // Texto IA
    slide2_cta1: "Talk to the AI →", // Falar com IA
    slide2_cta2: "Learn more", // Saiba mais

    // Hero — Slide 3 // Carrossel slide 3 (EN)
    slide3_eye: "Community — Elite", // Elite
    // Título Elite
    slide3_title:
      'JOIN<br><span class="acc">THE</span> <span class="str">ELITE</span>', // HTML Elite
    // Descrição Elite
    slide3_sub:
      "Create challenges, win prizes, and connect with high-performance athletes. The community that turns routines into results.", // Texto social
    slide3_cta1: "Join the Community →", // Entrar comunidade
    slide3_cta2: "See challenges", // Ver desafios

    // Hero — Slide 4 // Carrossel slide 4 (EN)
    slide4_eye: "Dashboard — Power Analytics", // Analytics
    // Título Analytics
    slide4_title:
      'YOUR<br><span class="acc">REAL</span> <span class="str">PROGRESS</span>', // HTML Analytics
    // Descrição Analytics
    slide4_sub:
      "Real-time dashboards with performance metrics, body composition, and weekly evolution. Data that inspires action.", // Texto analítico
    slide4_cta1: "View Dashboard →", // Ver dashboard
    slide4_cta2: "Explore metrics", // Explorar métricas

    scroll_hint: "scroll", // Rolar

    // Section 01 — Mind // Seção 01 (EN)
    sec_mente_tag: "01 — Mind", // Mente
    sec_mente_title: 'MENTAL<br><span class="acc">TRAINING</span>', // Treino mental
    // Corpo mente
    sec_mente_body:
      "Your greatest muscle is your brain. Focus, breathing, and mindfulness techniques integrated into training for peak performance.", // Descrição
    vis_mente_badge: "FOCUS ACTIVATED", // Foco ativado

    // Section 02 — Strength // Seção 02 (EN)
    sec_forca_tag: "02 — Strength", // Força
    sec_forca_title: 'MUSCULAR<br><span class="acc">POWER</span>', // Poder muscular
    // Corpo força
    sec_forca_body:
      "Hypertrophy protocols developed with specialists. Sets and loads automatically adjusted to your progress.", // Descrição
    vis_forca_badge: "MUSCLE ACTIVE", // Músculo ativo

    // Section 03 — Cardio // Seção 03 (EN)
    sec_cardio_tag: "03 — Cardio", // Cardio
    sec_cardio_title: 'HEART<br><span class="acc">OF STEEL</span>', // Coração de aço
    // Corpo cardio
    sec_cardio_body:
      "HIIT, LISS, Steady State — the system identifies the ideal cardiovascular workout for your profile and goal.", // Descrição
    vis_cardio_badge: "BPM 145", // BPM 145

    // Section 04 — Flexibility // Seção 04 (EN)
    sec_flexi_tag: "04 — Flexibility", // Flexibilidade
    sec_flexi_title: 'FREE<br><span class="acc">BODY</span>', // Corpo livre
    // Corpo flexibilidade
    sec_flexi_body:
      "Mobility and flexibility that prevent injuries and enhance performance. Video-guided routines adapted to your level.", // Descrição
    vis_flexi_badge: "MAX AMPLITUDE", // Amplitude máxima

    // Section 05 — Recovery // Seção 05 (EN)
    sec_recup_tag: "05 — Recovery", // Recuperação
    sec_recup_title: 'RISE<br><span class="acc">STRONGER</span>', // Renasça mais forte
    // Corpo recuperação
    sec_recup_body:
      "Rest is where growth happens. Sleep monitoring, nutrition, and muscle recovery — all integrated.", // Descrição
    vis_recup_badge: "RECOVERY 100%", // Recuperação 100%

    // Chips // Botões de categoria (EN)
    chip_foco: "Focus", // Foco
    chip_mindfulness: "Mindfulness", // Consciência
    chip_respiracao: "Breathing", // Respiração
    chip_sono: "Sleep & Recovery", // Sono
    chip_hipertrofia: "Hypertrophy", // Hipertrofia
    chip_forca_maxima: "Max Strength", // Força máxima
    chip_composicao: "Body Composition", // Composição corporal
    chip_hiit: "HIIT", // HIIT
    chip_resistencia: "Endurance", // Resistência
    chip_queima: "Fat Burning", // Queima gordura
    chip_mobilidade: "Mobility", // Mobilidade
    chip_alongamento: "Stretching", // Alongamento
    chip_yoga: "Yoga & Pilates", // Yoga
    chip_sono2: "Sleep", // Sono
    chip_nutricao: "Nutrition", // Nutrição
    chip_hidratacao: "Hydration", // Hidratação
    chip_descanso: "Rest Days", // Dias de descanso

    // Features // Funcionalidades (EN)
    feat_tag: "Features", // Recursos
    feat_title: 'EVERYTHING <span class="acc">YOU NEED</span>', // Tudo que você precisa
    feat_badge_live: "LIVE", // Ao vivo
    feat1_title: "Real-Time Progress", // Progresso tempo real
    // Descrição dashboard
    feat1_desc:
      "Dashboards with performance metrics, body composition, and weekly evolution — like a Power BI for your workout.", // Descrição Power BI
    feat1_cta: "View Dashboard", // Ver dashboard
    feat2_title: "Personalized AI", // IA personalizada
    // Descrição IA
    feat2_desc:
      "Chatbot that creates custom workouts, answers questions, and adapts your plan based on your progress.", // Descrição IA
    feat2_cta: "Chat with AI", // Chat com IA
    feat3_title: "Elite Community", // Comunidade elite
    // Descrição comunidade
    feat3_desc:
      "Challenges, prizes, and a performance-focused social network. Connect with high-level athletes.", // Descrição elite
    feat3_cta: "Join the Community", // Entrar comunidade
    feat4_title: "100% Offline", // 100% offline
    // Descrição offline
    feat4_desc:
      "Workouts, videos, and metrics available without internet. Gym, park, or bedroom — no excuses to stop.", // Descrição offline
    feat4_cta: "Learn how it works", // Como funciona

    // Early Access // Acesso antecipado (EN)
    early_tag: "Early Access", // Early access
    early_title: 'BE THE<br><span class="acc">FIRST</span>', // Seja o primeiro
    early_sub: "Get early and exclusive access before the official launch.", // Garantir acesso...
    early_placeholder: "your@email.com", // Placeholder email
    early_btn: "SECURE MY SPOT", // Garantir vaga
    early_note: "✓ No spam \u00a0 ✓ Cancel anytime \u00a0 ✓ Free", // Notas free/spam
    early_success_title: "🎉 YOU'RE ON THE LIST!", // Sucesso título
    early_success_sub: "We'll contact you with your exclusive access soon.", // Sucesso sub

    // Footer // Rodapé (EN)
    foot_privacy: "Privacy Policy", // Política privacidade
    foot_terms: "Terms of Use", // Termos uso
    foot_contact: "Contact", // Contato
    // Copyright
    foot_copy:
      "© 2026 CoreLab Corporation — UNIP Limeira. All rights reserved.", // Footer copy
  }, // Fim das traduções em Inglês

  /* ══════════════════════════════════════ // Divisor visual para a seção de Espanhol
     ESPAÑOL // Cabeçalho da seção ES
  ══════════════════════════════════════ */ // Fim do divisor
  es: {
    // Início das chaves em Espanhol
    // Splash // Seção de carregamento (ES)
    splash_1: "Inicializando...", // Inicializando
    splash_2: "Cargando módulos...", // Cargando módulos
    splash_3: "Preparando tu entrenamiento...", // Preparando treino

    // Modal — Pestañas // Abas do modal (ES)
    modal_tab_login: "Entrar", // Entrar
    modal_tab_register: "Registrarse", // Cadastrar

    // Modal — Login // Tela de login (ES)
    modal_login_tag: "Acceso a cuenta", // Acesso
    modal_login_title: "BIENVENIDO<br>DE NUEVO", // Boas-vindas
    modal_label_email: "Email", // Email
    modal_label_pass: "Contraseña", // Senha
    modal_ph_email: "tu@email.com", // Placeholder email
    modal_ph_pass: "••••••••", // Placeholder senha
    modal_btn_login: "ENTRAR", // Botão entrar
    modal_or: "o", // Ou
    modal_google_login: "Continuar con Google", // Login Google
    modal_forgot: "Olvidé mi contraseña", // Esqueci senha

    // Modal — Registro // Tela de cadastro (ES)
    modal_register_tag: "Crear cuenta", // Criar conta
    modal_register_title: "COMIENZA<br>AHORA", // Comece agora
    modal_label_name: "Nombre completo", // Nome completo
    modal_ph_name: "Tu nombre", // Placeholder nome
    modal_ph_email_reg: "tu@email.com", // Placeholder email
    modal_label_confirm: "Confirmar contraseña", // Confirmar senha
    modal_ph_confirm: "Repite la contraseña", // Placeholder repita
    modal_btn_register: "CREAR CUENTA GRATIS", // Botão criar conta
    modal_google_register: "Registrarse con Google", // Registro Google
    modal_terms: "Al crear cuenta aceptas los", // Ao criar conta...
    modal_terms_link: "Términos de Uso", // Termos de uso

    // Modal — Reset // Recuperação de senha (ES)
    modal_reset_tag: "Recuperar acceso", // Recuperar
    modal_reset_title: "RESTABLECER<br>CONTRASEÑA", // Redefinir senha
    // Descrição
    modal_reset_desc:
      "Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.", // Digite seu email...
    modal_label_reset_email: "Email registrado", // Email cadastrado
    modal_btn_reset: "ENVIAR ENLACE", // Enviar link
    modal_back_login: "← Volver al login", // Voltar ao login

    // Hero — Slide 1 // Carrossel slide 1 (ES)
    slide1_eye: "Early Access — Plazas Limitadas", // Vagas limitadas
    // Título Hero
    slide1_title:
      'FORJA<br><span class="acc">TU</span> <span class="str">CORE</span>', // HTML hero
    // Subtítulo
    slide1_sub:
      "La app que entiende tu cuerpo. Entrenamientos personalizados, seguimiento en tiempo real y una comunidad que te impulsa más allá de tus límites.", // Texto marketing
    slide1_cta1: "Quiero Early Access →", // Botão CTA 1
    slide1_cta2: "Explorar", // Botão CTA 2

    // Hero — Slide 2 // Carrossel slide 2 (ES)
    slide2_eye: "IA Personalizada — Nuevo", // Novo
    // Título IA
    slide2_title:
      'ENTRENA<br><span class="acc">CON</span> <span class="str">IA</span>', // HTML IA
    // Descrição IA
    slide2_sub:
      "Nuestro chatbot de IA analiza tu historial, objetivos y limitaciones para crear el entrenamiento perfecto. Cero suposiciones, 100% ciência.", // Texto IA
    slide2_cta1: "Hablar con la IA →", // Falar com IA
    slide2_cta2: "Saber más", // Saiba mais

    // Hero — Slide 3 // Carrossel slide 3 (ES)
    slide3_eye: "Comunidade — Elite", // Elite
    // Título Elite
    slide3_title:
      'ÚNETE<br><span class="acc">A LA</span> <span class="str">ELITE</span>', // HTML Elite
    // Descrição Elite
    slide3_sub:
      "Crea desafíos, gana premios y conéctate con atletas de alto rendimiento. La comunidad que transforma rutinas en resultados.", // Texto social
    slide3_cta1: "Unirse a la Comunidad →", // Entrar comunidade
    slide3_cta2: "Ver desafíos", // Ver desafios

    // Hero — Slide 4 // Carrossel slide 4 (ES)
    slide4_eye: "Dashboard — Power Analytics", // Analytics
    // Título Analytics
    slide4_title:
      'TU<br><span class="acc">PROGRESO</span> <span class="str">REAL</span>', // HTML Analytics
    // Descrição Analytics
    slide4_sub:
      "Dashboards en tiempo real com métricas de rendimiento, composición corporal y evolución semanal. Datos que inspiran acción.", // Texto analítico
    slide4_cta1: "Ver Dashboard →", // Ver dashboard
    slide4_cta2: "Explorar métricas", // Explorar métricas

    scroll_hint: "scroll", // Rolar

    // Sección 01 — Mente // Seção 01 (ES)
    sec_mente_tag: "01 — Mente", // Mente
    sec_mente_title: 'ENTRENAMIENTO<br><span class="acc">MENTAL</span>', // Treino mental
    // Corpo mente
    sec_mente_body:
      "Tu mayor músculo es el cerebro. Técnicas de foco, respiración e mindfulness integradas ao treinamento para máximo rendimiento.", // Descrição
    vis_mente_badge: "FOCO ACTIVADO", // Foco ativado

    // Sección 02 — Fuerza // Seção 02 (ES)
    sec_forca_tag: "02 — Fuerza", // Força
    sec_forca_title: 'PODER<br><span class="acc">MUSCULAR</span>', // Poder muscular
    // Corpo força
    sec_forca_body:
      "Protocolos de hipertrofia desenvolvidos com especialistas. Series e cargas ajustadas automaticamente a tu progresso.", // Descrição
    vis_forca_badge: "MÚSCULO ACTIVADO", // Músculo ativo

    // Sección 03 — Cardio // Seção 03 (ES)
    sec_cardio_tag: "03 — Cardio", // Cardio
    sec_cardio_title: 'CORAZÓN<br><span class="acc">DE ACERO</span>', // Coração de aço
    // Corpo cardio
    sec_cardio_body:
      "HIIT, LISS, Steady State — el sistema identifica el entrenamiento cardiovascular ideal para tu perfil y objetivo.", // Descrição
    vis_cardio_badge: "BPM 145", // BPM 145

    // Sección 04 — Flexibilidade // Seção 04 (ES)
    sec_flexi_tag: "04 — Flexibilidade", // Flexibilidade
    sec_flexi_title: 'CUERPO<br><span class="acc">LIBRE</span>', // Corpo livre
    // Corpo flexibilidade
    sec_flexi_body:
      "Movilidad y flexibilidad que previenen lesiones y melhoram el rendimiento. Rutinas guiadas por vídeo adaptadas a tu nível.", // Descrição
    vis_flexi_badge: "AMPLITUD MÁX", // Amplitude máxima

    // Sección 05 — Recuperación // Seção 05 (ES)
    sec_recup_tag: "05 — Recuperación", // Recuperação
    sec_recup_title: 'RENACE<br><span class="acc">MÁS FUERTE</span>', // Renasça mais forte
    // Corpo recuperação
    sec_recup_body:
      "El descanso es donde ocurre el crecimiento. Monitoreo de sueño, nutrición y recuperación muscular integrados.", // Descrição
    vis_recup_badge: "RECUPERAÇÃO 100%", // Recuperação 100%

    // Chips // Botões de categoria (ES)
    chip_foco: "Foco", // Foco
    chip_mindfulness: "Mindfulness", // Consciência
    chip_respiracao: "Respiración", // Respiração
    chip_sono: "Sueño & Recuperación", // Sono
    chip_hipertrofia: "Hipertrofia", // Hipertrofia
    chip_forca_maxima: "Fuerza Máxima", // Força máxima
    chip_composicao: "Composición Corporal", // Composição corporal
    chip_hiit: "HIIT", // HIIT
    chip_resistencia: "Resistencia", // Resistência
    chip_queima: "Quema de Grasa", // Queima gordura
    chip_mobilidade: "Movilidad", // Mobilidade
    chip_alongamento: "Estiramiento", // Alongamento
    chip_yoga: "Yoga & Pilates", // Yoga
    chip_sono2: "Sueño", // Sono
    chip_nutricao: "Nutrición", // Nutrição
    chip_hidratacao: "Hidratación", // Hidratação
    chip_descanso: "Días de descanso", // Dias de descanso

    // Features // Funcionalidades (ES)
    feat_tag: "Features", // Recursos
    feat_title: 'TODO LO QUE <span class="acc">NECESITAS</span>', // Tudo que você precisa
    feat_badge_live: "EN VIVO", // Ao vivo
    feat1_title: "Progreso en Tiempo Real", // Progresso tempo real
    // Descrição dashboard
    feat1_desc:
      "Dashboards con métricas de rendimiento, composición corporal y evolución semanal — como um Power BI de tu entrenamiento.", // Descrição Power BI
    feat1_cta: "Ver Dashboard", // Ver dashboard
    feat2_title: "IA Personalizada", // IA personalizada
    // Descrição IA
    feat2_desc:
      "Chatbot que cria treinamentos a medida, responde dudas e adapta tu plan baseado en tu progresso.", // Descrição IA
    feat2_cta: "Conversar con IA", // Chat com IA
    feat3_title: "Comunidad Elite", // Comunidade elite
    // Descrição comunidade
    feat3_desc:
      "Desafíos, premios e una red social enfocada en rendimiento. Conéctate con atletas de alto nível.", // Descrição elite
    feat3_cta: "Unirse a la Comunidad", // Entrar comunidade
    feat4_title: "100% Offline", // 100% offline
    // Descrição offline
    feat4_desc:
      "Entrenamientos, vídeos y métricas disponíveis sin internet. Gimnasio, parque o habitación — sin excusas para parar.", // Descrição offline
    feat4_cta: "Aprende cómo funciona", // Como funciona

    // Early Access // Acesso antecipado (ES)
    early_tag: "Early Access", // Early access
    early_title: 'SÉ EL<br><span class="acc">PRIMERO</span>', // Seja o primeiro
    // Subtítulo
    early_sub:
      "Asegura acceso anticipado y exclusivo antes del lanzamiento oficial.", // Garantir acesso...
    early_placeholder: "tu@email.com", // Placeholder email
    early_btn: "ASEGURAR PLAZA", // Garantir vaga
    early_note: "✓ Sin spam \u00a0 ✓ Cancela cuando quieras \u00a0 ✓ Gratis", // Notas free/spam
    early_success_title: "🎉 ¡ESTÁS EN LA LISTA!", // Sucesso título
    // Sucesso sub
    early_success_sub:
      "Nos pondremos en contacto con tu acceso exclusivo pronto.", // Contato em breve

    // Footer // Rodapé (ES)
    foot_privacy: "Política de Privacidad", // Política privacidade
    foot_terms: "Términos de Uso", // Termos uso
    foot_contact: "Contacto", // Contato
    // Copyright
    foot_copy:
      "© 2026 CoreLab Corporation — UNIP Limeira. Todos os direitos reservados.", // Footer copy
  }, // Fim das traduções em Espanhol
}; // Fim do objeto translations

/* ==================================================== // Cabeçalho da seção Apply Lang
   APPLY LANG — Aplica traduções ao DOM // Título da seção de lógica
==================================================== */ // Fim do cabeçalho da seção
let currentLang = "pt"; // Variável de estado global para o idioma atual (padrão PT)

export function applyLang(lang) {
  // Exporta função que varre o DOM e aplica as traduções
  if (!translations[lang]) return; // Aborta se o idioma solicitado não existir no objeto
  currentLang = lang; // Atualiza o idioma ativo no estado
  const t = translations[lang]; // Atalho para o objeto de tradução do idioma escolhido

  // 1. Texto simples (textContent) // Busca elementos com o atributo data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    // Itera sobre os elementos encontrados
    const key = el.dataset.i18n; // Obtém a chave de tradução do dataset
    if (t[key] !== undefined) el.textContent = t[key]; // Aplica o texto se a chave existir
  }); // Fim do loop de texto simples

  // 2. Conteúdo HTML — títulos com <span> coloridos // Busca elementos com data-i18n-html
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    // Itera sobre elementos que permitem HTML
    const key = el.dataset.i18nHtml; // Obtém a chave de tradução HTML
    if (t[key] !== undefined) el.innerHTML = t[key]; // Aplica o HTML (innerHTML) se a chave existir
  }); // Fim do loop de HTML

  // 3. Placeholders de inputs // Busca elementos com data-i18n-placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    // Itera sobre campos de formulário
    const key = el.dataset.i18nPlaceholder; // Obtém a chave de tradução para placeholder
    if (t[key] !== undefined) el.placeholder = t[key]; // Aplica o placeholder se a chave existir
  }); // Fim do loop de placeholders

  // 4. Atualiza estado ativo dos botões de idioma // Gerencia visual dos seletores de língua
  document.querySelectorAll(".lang-btn").forEach((b) => {
    // Itera sobre os botões de troca de idioma
    b.classList.toggle("active", b.dataset.lang === lang); // Adiciona classe 'active' apenas ao botão do idioma atual
  }); // Fim do loop de botões

  // 5. Atualiza atributo lang do <html> // Ajusta meta-informação de idioma para SEO e navegadores
  document.documentElement.lang = lang === "pt" ? "pt-BR" : lang; // Define pt-BR para português ou a sigla direta para outros

  // 6. Persiste preferência no localStorage // Salva a escolha do usuário para futuras visitas
  try {
    // Bloco de segurança para falhas no localStorage
    localStorage.setItem("corelab_lang", lang); // Grava a chave do idioma no armazenamento local
  } catch (_) {} // Ignora erros (como modo incógnito bloqueado)
} // Fim da função applyLang

/* ==================================================== // Cabeçalho da seção Getter
   GET CURRENT LANG // Título da seção
==================================================== */ // Fim do cabeçalho da seção
export function getCurrentLang() {
  // Exporta função utilitária para obter o idioma ativo
  return currentLang; // Retorna o valor da variável de estado global
} // Fim da função getCurrentLang

/* ==================================================== // Cabeçalho da seção Init
   INIT — Carrega idioma saved ou padrão (PT) // Título da seção de inicialização
==================================================== */ // Fim do cabeçalho da seção
export function initI18n() {
  // Exporta função de inicialização do sistema i18n
  let saved = "pt"; // Variável para o idioma a ser carregado
  try {
    // Tenta ler do armazenamento local
    saved = localStorage.getItem("corelab_lang") || "pt"; // Recupera idioma salvo ou assume PT como padrão
  } catch (_) {} // Fallback em caso de erro no acesso ao localStorage
  const lang = translations[saved] ? saved : "pt"; // Garante que o idioma salvo realmente exista nas traduções
  applyLang(lang); // Aplica as traduções correspondentes ao idioma inicial
} // Fim da função initI18n
