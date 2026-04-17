# CoreLab — Landing Page

> **"Forje Seu Core"** — Landing page oficial do CoreLab, aplicativo de fitness com IA, comunidade elite e dashboards de performance em tempo real.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar](#como-executar)
- [Páginas](#páginas)
- [Branches](#branches)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

---

## Sobre o Projeto

O **CoreLab** é um aplicativo de fitness que integra treino inteligente, IA personalizada, comunidade de alta performance e dashboards em tempo real. Esta landing page é a vitrine do produto, desenvolvida como projeto acadêmico pela **UNIP Limeira** em 2026.

A landing page foi construída com HTML, CSS e JavaScript puros (Vanilla), sem dependências externas de frameworks, garantindo leveza, desempenho e total controle do código.

---

## Funcionalidades

### 🎠 Hero Carousel
Carrossel automático com 4 slides apresentando os pilares do CoreLab:
- **Forge Your Core** — Apresentação principal com CTA de Early Access
- **Treino com IA** — Destaque do chatbot de inteligência artificial
- **Comunidade Elite** — Desafios, prêmios e rede social de atletas
- **Dashboard de Progresso** — Métricas em tempo real e análise de performance

### 🧠 Seções de Pilares (5 pilares de treino)
Cada seção apresenta um pilar do método CoreLab com animações de scroll reveal e chips interativos:

| # | Pilar | Chips / Tópicos |
|---|-------|-----------------|
| 01 | **Mente** | Foco, Mindfulness, Respiração, Sono & Recuperação |
| 02 | **Força** | Hipertrofia, Força Máxima, Composição Corporal |
| 03 | **Cardio** | HIIT, Resistência, Queima de Gordura |
| 04 | **Flexibilidade** | Mobilidade, Alongamento, Yoga & Pilates |
| 05 | **Recuperação** | Sono, Nutrição, Hidratação, Dias de Descanso |

### 💡 Chip Popups
Ao clicar em qualquer chip das seções, um modal deslizante exibe informações detalhadas com:
- Explicação científica do tópico
- Benefícios práticos integrados ao CoreLab
- Estatísticas baseadas em evidências

### 📊 Grid de Features
4 cards clicáveis destacando as principais funcionalidades:
- Progresso em Tempo Real (→ `dashboard.html`)
- IA Personalizada (→ `chatbot.html`)
- Comunidade Elite (→ `comunidade.html`)
- 100% Offline

### 📩 Early Access
Formulário de captura de e-mail para lista de espera do lançamento, com feedback visual de confirmação.

### 🔐 Modal de Login
Sistema de autenticação simulado com modal de login, avatar com iniciais do usuário e persistência de estado na sessão.

### 🌙 Tema Dark / Light
Alternância de tema com um clique — persiste durante a navegação na sessão.

### 🌐 Seletor de Idioma
Suporte visual para PT / ES / EN (estrutura preparada para internacionalização).

### ✨ Splash Screen
Tela de carregamento animada com barra de progresso e mensagens cíclicas.

---

## Estrutura do Projeto

```
corelab-landing/
├── index.html          # Landing page principal
├── chatbot.html        # Página do chatbot de IA
├── comunidade.html     # Página da comunidade
├── dashboard.html      # Dashboard de performance
├── css/
│   └── style.css       # Estilos globais (dark/light theme, animações, componentes)
├── js/
│   └── main.js         # Lógica da aplicação (carousel, modais, chips, tema, i18n)
├── .vscode/
│   ├── extensions.json # Extensões recomendadas para VS Code
│   └── settings.json   # Configurações do workspace
├── LICENSE             # Licença MIT
└── README.md           # Este arquivo
```

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| **HTML5** | Estrutura semântica das páginas |
| **CSS3** | Estilos, animações, dark/light mode, glassmorphism |
| **JavaScript (ES6+)** | Carousel, modais, scroll reveal, tema, idioma |
| **Google Fonts** | Tipografia: `Bebas Neue`, `DM Sans`, `Space Mono` |
| **Intersection Observer API** | Animações de entrada por scroll (scroll reveal) |

> **Sem frameworks ou dependências externas.** O projeto é 100% Vanilla — sem React, Vue, Tailwind ou qualquer biblioteca JS.

---

## Como Executar

Por ser um projeto estático (sem build), basta abrir os arquivos diretamente no navegador:

### Opção 1 — Abrir direto no navegador
```bash
# Clone o repositório
git clone https://github.com/CoreLab-Corporation/corelab-landing.git

# Acesse a pasta
cd corelab-landing

# Abra o index.html no navegador
# Windows:
start index.html

# macOS:
open index.html

# Linux:
xdg-open index.html
```

### Opção 2 — Live Server (recomendado para desenvolvimento)
```bash
# Instale a extensão "Live Server" no VS Code e clique em "Go Live"
# ou use o servidor do Node.js:
npx serve .
```

> **Nota:** Abrir via `file://` pode ter restrições de CORS em alguns navegadores. Para desenvolvimento, recomenda-se usar um servidor local.

---

## Páginas

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Landing page principal — hero, pilares, features, early access |
| `chatbot.html` | Interface do chatbot com IA para treinos personalizados |
| `comunidade.html` | Feed e desafios da comunidade CoreLab Elite |
| `dashboard.html` | Painel de métricas, composição corporal e evolução semanal |

---

## Branches

O projeto segue um fluxo de branches organizado para colaboração em equipe:

| Branch | Propósito |
|--------|-----------|
| `main` | Código estável e aprovado para produção |
| `develop` | Branch de integração das features em desenvolvimento |
| `feature/design-layout` | Desenvolvimento de design e layout visual |
| `feature/conteudo-seo` | Otimização de conteúdo e SEO |
| `feature/desenvolvimento` | Funcionalidades e interações JavaScript |
| `feature/gestao-readme` | Documentação e gestão do README |
| `feature/testes-qa` | Testes, validações e QA do projeto |

---

## Contribuindo

1. Faça um fork do projeto
2. Crie sua branch a partir de `develop`:
   ```bash
   git checkout -b feature/minha-feature
   ```
3. Commit suas mudanças com mensagens descritivas:
   ```bash
   git commit -m "feat: adiciona funcionalidade X"
   ```
4. Faça push para sua branch:
   ```bash
   git push origin feature/minha-feature
   ```
5. Abra um Pull Request para `develop`

### Convenção de Commits

Este projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/):

| Prefixo | Uso |
|---------|-----|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `docs:` | Documentação |
| `style:` | Formatação, sem mudança de lógica |
| `refactor:` | Refatoração de código |
| `chore:` | Tarefas de manutenção |
| `test:` | Adição ou correção de testes |

---

## Licença

Distribuído sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais informações.

---

<div align="center">

**© 2026 CoreLab Corporation — UNIP Limeira**

*Todos os direitos reservados.*

</div>