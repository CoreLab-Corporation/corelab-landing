# ✅ CHECKLIST PRÉ-DEPLOY — CoreLab

# Execute este checklist ANTES de hospedar em produção.

# Marque cada item conforme completar.

═══════════════════════════════════════════════════════════
🔥 FIREBASE — CONFIGURAÇÃO
═══════════════════════════════════════════════════════════

AUTHENTICATION
[ ] Email/senha ativado
[ ] Google OAuth ativado
[ ] Domínio Vercel adicionado em "Domínios autorizados"
[ ] localhost adicionado em "Domínios autorizados"

FIRESTORE
[ ] Banco criado (modo produção, NÃO modo teste)
[ ] Regras de segurança publicadas (copiar de firestore-rules)
[ ] Região definida: southamerica-east1 (São Paulo) ou us-east1
[ ] Índices criados (se necessário, o erro aparece no console)

GOOGLE CLOUD CONSOLE (para OAuth funcionar no domínio)
[ ] Acessar: console.cloud.google.com
[ ] APIs → Credenciais → OAuth 2.0 → Editar
[ ] Adicionar em "Origens JavaScript autorizadas":
https://seu-projeto.vercel.app
http://localhost:5501
[ ] Adicionar em "URIs de redirecionamento autorizados":
https://corelab-app-ecfd5.firebaseapp.com/__/auth/handler
[ ] Salvar

═══════════════════════════════════════════════════════════
🔐 SEGURANÇA
═══════════════════════════════════════════════════════════

CÓDIGO
[ ] firebase-config.js — credenciais corretas e sem dados de teste
[ ] Nenhum console.log() com dados sensíveis em produção
[ ] API Key da Anthropic — verificar se está exposta no código
[ ] js/security.js importado nas páginas protegidas
[ ] js/config.js — ENV.isDev/isProd funcionando corretamente

HEADERS (via vercel.json)
[ ] vercel.json presente na raiz do projeto
[ ] CSP configurado corretamente (testar sem bloquear Firebase)
[ ] HSTS ativo
[ ] X-Frame-Options: DENY

AUTENTICAÇÃO
[ ] Auth guard ativo em dashboard.html, chatbot.html, comunidade.html
[ ] Redirecionamento para index.html quando deslogado
[ ] Session timeout configurado (8h inatividade)

═══════════════════════════════════════════════════════════
📁 ESTRUTURA DE ARQUIVOS
═══════════════════════════════════════════════════════════

ARQUIVOS OBRIGATÓRIOS
[ ] index.html
[ ] dashboard.html
[ ] chatbot.html
[ ] comunidade.html
[ ] css/style.css
[ ] js/firebase-config.js
[ ] js/auth.js
[ ] js/db.js
[ ] js/dashboard-data.js
[ ] js/main.js
[ ] js/i18n.js
[ ] js/security.js
[ ] js/config.js
[ ] vercel.json
[ ] .gitignore
[ ] README.md
[ ] LICENSE

ARQUIVOS PARA ADICIONAR AO CSS (style.css)
[ ] Conteúdo do welcome-animation.css colado no final do style.css
[ ] CSS do #userMenu (posicionamento fixo) adicionado

═══════════════════════════════════════════════════════════
🎨 VISUAL & UX
═══════════════════════════════════════════════════════════

RESPONSIVIDADE
[ ] index.html — testar em mobile (320px, 375px, 428px)
[ ] dashboard.html — sidebar vira scroll horizontal em mobile
[ ] chatbot.html — sidebar some em < 700px
[ ] comunidade.html — painel direito some em < 900px

DARK / LIGHT MODE
[ ] Todos os elementos usam variáveis CSS (--bg, --text, etc.)
[ ] Nenhuma cor hardcoded que quebre no modo light
[ ] Preferência de tema persiste (testar F5)

i18n
[ ] PT: todas as chaves traduzidas
[ ] EN: todas as chaves traduzidas
[ ] ES: todas as chaves traduzidas
[ ] Botões PT/EN/ES funcionando na navbar
[ ] Idioma persiste ao recarregar (localStorage)

ANIMAÇÕES
[ ] Splash screen funciona (2.8s)
[ ] Welcome animation aparece após login
[ ] Scroll reveal funciona nas seções
[ ] Carousel autoplay e swipe touch funcionando

FONTES
[ ] Google Fonts carregando: Bebas Neue, DM Sans, Space Mono
[ ] Fallbacks definidos no CSS: sans-serif, monospace

═══════════════════════════════════════════════════════════
⚡ PERFORMANCE
═══════════════════════════════════════════════════════════

[ ] Testar Lighthouse score > 80 em Performance
[ ] Testar Lighthouse score > 90 em Accessibility
[ ] Testar Lighthouse score > 90 em Best Practices
[ ] Imagens otimizadas (o projeto não usa imagens externas)
[ ] Firebase SDK carregando via CDN gstatic (sem download local)
[ ] Chart.js carregando via CDN cloudflare

═══════════════════════════════════════════════════════════
🧪 TESTES FUNCIONAIS
═══════════════════════════════════════════════════════════

AUTH
[ ] Cadastro com email — cria usuário no Firebase Auth
[ ] Cadastro — redireciona para aba login após sucesso
[ ] Login com email — abre welcome animation
[ ] Login com Google — funciona sem popup bloqueado
[ ] Reset de senha — email enviado
[ ] Logout — limpa sessão e menu
[ ] Trocar conta — logout + abre modal

LANDING (index.html)
[ ] Carousel: autoplay, arrows, dots, swipe touch
[ ] Chips: abre popup com conteúdo correto
[ ] Early Access: salva lead no Firestore
[ ] Early Access: mensagem "já está na lista" para emails duplicados
[ ] Scroll reveal: animações disparam ao rolar
[ ] User menu: aparece clicando no avatar
[ ] Links do menu: dashboard, chatbot, comunidade funcionam

DASHBOARD
[ ] Auth guard: redireciona se não logado
[ ] Sidebar: navegação entre páginas funciona
[ ] Salvar treino: aparece na tabela e gráficos imediatamente
[ ] Salvar medidas corporais: atualiza KPIs
[ ] Salvar cardio: atualiza gráficos
[ ] Salvar sono: barras coloridas por score
[ ] Salvar nutrição: donut de macros atualiza
[ ] Adicionar meta: barra de progresso aparece
[ ] Deletar meta: some da lista
[ ] Editar perfil: nome atualiza na sidebar

CHATBOT
[ ] Auth guard: redireciona se não logado
[ ] Sugestões da sidebar: clique envia mensagem
[ ] Chips do empty state: clique envia mensagem
[ ] Enter envia, Shift+Enter quebra linha
[ ] Typing indicator aparece enquanto IA processa
[ ] Resposta da IA: markdown renderizado (bold, código, listas)
[ ] Histórico: persiste ao recarregar
[ ] Limpar histórico: confirma e apaga

COMUNIDADE
[ ] Auth guard: redireciona se não logado
[ ] Criar post: aparece no feed em tempo real
[ ] Curtir post real: contador atualiza
[ ] Curtir posts estáticos: toggle visual
[ ] Aba Comunidades: lista carrega do Firestore
[ ] Criar comunidade: aparece na lista "Minhas Comunidades"
[ ] Entrar em comunidade: move para "Minhas Comunidades"
[ ] Sair de comunidade: confirma e remove
[ ] Admin: vê badge e não pode sair da própria comunidade
[ ] Ranking: linha do usuário logado aparece com dados reais

═══════════════════════════════════════════════════════════
🚀 VERCEL — DEPLOY
═══════════════════════════════════════════════════════════

[ ] Repositório GitHub criado e atualizado
[ ] Vercel conectado ao repositório GitHub
[ ] Deploy automático configurado (branch main)
[ ] Domínio customizado configurado (se houver)
[ ] Verificar que vercel.json está na raiz
[ ] Testar URL de produção após primeiro deploy
[ ] Verificar headers de segurança: securityheaders.com

═══════════════════════════════════════════════════════════
📋 PÓS-DEPLOY
═══════════════════════════════════════════════════════════

[ ] Testar login com Google no domínio de produção
[ ] Verificar console do browser por erros
[ ] Verificar Firebase Console por erros de regras
[ ] Monitorar Firestore usage (plano Spark tem limites)
[ ] Testar em diferentes browsers: Chrome, Firefox, Safari, Edge
[ ] Testar em iOS (Safari) e Android (Chrome)

═══════════════════════════════════════════════════════════
📊 LIMITES DO PLANO FIREBASE SPARK (GRATUITO)
═══════════════════════════════════════════════════════════

Firestore:
Leituras: 50.000/dia
Escritas: 20.000/dia
Exclusões: 20.000/dia
Armazenamento: 1 GB

Authentication:
Usuários: Ilimitado
Verificações: 10/SMS (não usado)

⚠️ ATENÇÃO: onSnapshot() conta como leitura a cada update.
Com muitos usuários simultâneos, pode estourar o limite.
Migrar para plano Blaze quando necessário.

═══════════════════════════════════════════════════════════

✅ TODOS OS ITENS MARCADOS = PRONTO PARA PRODUÇÃO 🚀

═══════════════════════════════════════════════════════════
