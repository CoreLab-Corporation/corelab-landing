# Performance — Próximos Passos

**Branch:** `feature/testes-qa`

Este documento explica o que está derrubando o score de performance do Lighthouse e quais ajustes devem ser feitos primeiro para tentar sair de **61/100** e chegar acima de **90**.

## Problema principal

O maior custo hoje está no **JavaScript carregado cedo demais**. A landing page carrega módulos que não são críticos para a primeira pintura e isso aumenta o trabalho da thread principal.

Em paralelo, o ambiente atual de teste local não ajuda com cache e otimizações de produção, então o score fica ainda mais baixo do que ficaria em um deploy final.

## O que fazer primeiro

### 1. Reduzir o JS inicial

- Tirar Firebase/Auth/DB do carregamento da home quando não forem necessários de imediato.
- Carregar módulos só quando houver interação do usuário.
- Evitar puxar scripts de páginas secundárias na landing principal.

### 2. Separar por página

- `index.html` deve carregar só o que a home precisa.
- `chatbot.html`, `dashboard.html` e `comunidade.html` devem manter dependências próprias.
- Isso reduz o peso inicial e melhora o tempo de bloqueio de renderização.

### 3. Minificar assets

- Minificar `css/style.css` e os arquivos JavaScript.
- Usar build de produção antes de rodar Lighthouse.
- Isso reduz tamanho de download e custo de parse/execution.

### 4. Melhorar cache

- Configurar cache no servidor de produção.
- Em localhost, o Lighthouse tende a punir mais do que um ambiente real otimizado.

## Ordem recomendada

1. Cortar JS não essencial da home.
2. Aplicar lazy loading nos módulos menos usados.
3. Minificar CSS e JS.
4. Reexecutar Lighthouse.

## Resultado esperado

Se a landing parar de carregar lógica pesada logo no início, o score de performance deve subir de forma relevante. Esse é o ajuste com melhor custo/benefício antes de mexer em otimizações mais finas.
