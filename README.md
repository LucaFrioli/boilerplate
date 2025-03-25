# Boilerplate React + Vite + Node + Express + Sequelize

Este boilerplate foi estruturado para otimizar o trabalho em equipe, padronizar o código e melhorar o fluxo de desenvolvimento, além de oferecer configurações úteis para projetos fullstack. No entanto, sua aplicação não se limita a esses aspectos. Diversos recursos foram configurados para agilizar o início de novos projetos, e vários módulos estão sendo documentados, permitindo que sejam facilmente removidos ou expandidos conforme a necessidade.

## **Sumário**

- [Informações básicas de uso das documentações](#informações-básicas-de-uso-das-documentações)
- [Linting e fromatadores padrões](#informações-sobre-linting-e-ferramentas-de-padronização)
- [Scripts principais](#scripts-principais-do-packagejson)
- Dependências
- [Detalhes de estrutura](#detalhes-de-estrutura)

## Informações básicas de uso das documentações

Este conjunto de documentações foi elaborado para:

1. **Explicar profundamente os conceitos técnicos** aplicados na estrutura do projeto.
2. **Oferecer referências direcionadas** - em momentos estratégicos, indicaremos documentações externas e repositórios complementares para estudos avançados.

---

### **O que você encontrará nesta página?**

**Guia de Linting Expandido**
- Dicas para expandir as configurações de linting
- Como personalizar regras do ESLint para seu projeto

**Scripts do `package.json` Desvendados**
- Explicação técnica de cada comando
- Casos de uso e boas práticas

**Dependências do Projeto**
- Uma análise detalhada das dependências principais
- Por que cada pacote foi escolhido e como eles se integram

**Arquitetura do Boilerplate**
- Diagrama da estrutura de pastas
- Como adaptar a base para diferentes tipos de projetos (APIs, SPAs, Páginas SSR, etc.)
- Padrões de código recomendados

---

### **Contribuições e Suporte**

🌟 **Faça parte do desenvolvimento!**
- Encontrou um bug? [Abra uma Issue](link-issues) com detalhes da reprodução
- Tem uma ideia de melhoria? Compartilhe na seção de [Discussões](link-discussões)
- Quer codificar? Confira as [Tasks Abertas](link-tasks) e envie um PR

🛠 **Formas de Contribuir:**
1. Revisão técnica de PRs
2. Atualização de documentações
3. Tradução de conteúdos
4. Testes de novas features

*Agradecimentos especiais a [Luca Frioli] por eatr ajudando a manter e evoluir este projeto. Sua colaboração é vital para manter o boilerplate relevante!*

---


**Versão do Documento:** 0.2| **Última Atualização:** 25/03/2025


## **Informações sobre linting e ferramentas de padronização**

Este modelo fornece uma configuração fazer o React funcionar no Vite com HMR e algumas regras do ESLint.

Atualmente, dois plugins oficiais são disponibilizados pelo vite:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) usa o [Babel](https://babeljs.io/) para Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) usa o [SWC](https://swc.rs/) para Fast Refresh

Caso queiram modificar a estrutura de uso basta implementá-los, até o momento o eslint foi configurados nos padrões a seguir [clique aqui!](./docs/lintingAndFormattingTools.md)

### **Expandindo a configuração do ESLint**

Se você está desenvolvendo uma aplicação para produção, recomendamos o uso do TypeScript e a ativação de regras de lint com reconhecimento de tipos. Confira o [modelo TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para integrar o TypeScript e o [`typescript-eslint`](https://typescript-eslint.io) ao seu projeto.

---

## **Scripts principais do `package.json`**

Esses scripts são utilizados para gerenciar o fluxo de desenvolvimento, build, linting e execução do seu projeto.

---

### **`dev` – Ambiente de Desenvolvimento**

```json
"dev": "concurrently 'vite' 'nodemon server.js'"
```

**Descrição:**
Este script inicia o ambiente de desenvolvimento rodando **Vite** (para o frontend) e **Nodemon** (para o backend) simultaneamente.

**Explicação dos componentes:**

- **`concurrently`**: Executa múltiplos processos ao mesmo tempo, útil quando o frontend e backend precisam rodar juntos.
- **`vite`**: Inicia o servidor de desenvolvimento do **Vite** (provavelmente para um frontend em React, Vue ou Svelte).
- **`nodemon server.js`**: Inicia o backend usando **Nodemon**, um utilitário que reinicia automaticamente o servidor Node.js ao detectar mudanças nos arquivos.

**Como rodar:**

```bash
npm run dev
```

**Resultado esperado:** O frontend e backend serão iniciados ao mesmo tempo e qualquer alteração no código será aplicada automaticamente.

---

### **`dev:backend` – Backend em Modo Desenvolvimento**

```json
"dev:backend": "nodemon server.js"
```

**Descrição:**
Inicia apenas o servidor backend com **Nodemon**, permitindo desenvolvimento com recarregamento automático.

**Explicação dos componentes:**

- **`nodemon server.js`**: Monitora alterações nos arquivos e reinicia automaticamente o servidor Node.js.

**Como rodar:**

```bash
npm run dev:backend
```

**Resultado esperado:** O backend será iniciado e recarregado automaticamente a cada alteração no código.

---

### **`dev:frontend` – Frontend em Modo Desenvolvimento**

```json
"dev:frontend": "vite"
```

**Descrição:**
Inicia apenas o servidor de desenvolvimento do frontend com **Vite**, incluindo HMR (Hot Module Replacement).

**Explicação dos componentes:**

- **`vite`**: Oferece servidor rápido com recarregamento instantâneo e otimizações para desenvolvimento frontend.

**Como rodar:**

```bash
npm run dev:frontend
```

**Resultado esperado:** O frontend será servido em `localhost:5173` (ou porta similar) com atualizações em tempo real.

---

### **`build` – Compilação do Projeto**

```json
"build": "vite build"
```

**Descrição:**
Esse script executa o processo de **build** do frontend, gerando arquivos otimizados para produção.

**Explicação dos componentes:**

- **`vite build`**: Gera uma versão otimizada do projeto, compilando e empacotando os arquivos para serem servidos em produção.
    - Isso inclui otimizações como minificação de código, tree-shaking (eliminação de código morto) e geração de arquivos estáticos para o frontend.

**Como rodar:**

```bash
npm run build
```

**Resultado esperado:** Os arquivos do frontend serão gerados na pasta de saída (`dist/` por padrão), prontos para serem servidos em um servidor web.

---

### **`lint` – Verificação e Correção de Código**

```json
"lint": "eslint . --fix"
```

**Descrição:**
Executa o **ESLint** para verificar a qualidade do código e corrigir automaticamente problemas encontrados.

**Explicação dos componentes:**

- **`eslint .`**: Verifica todos os arquivos no diretório atual (`.`).
- **`--fix`**: Aplica correções automáticas quando possível, como formatação e ajustes de código.

**Como rodar:**

```bash
npm run lint
```

**Resultado esperado:** Se houver erros de estilo ou código não conforme, o ESLint tentará corrigi-los automaticamente.

---

### **`preview` – Servindo a Versão de Produção**

```json
"preview": "vite preview"
```

**Descrição:**
Este script inicia um servidor local para visualizar o **build** do frontend antes de implantá-lo em produção.

**Explicação dos componentes:**

- **`vite preview`**: Serve a versão estática do projeto gerada pelo `vite build`, permitindo testar a versão final.

**Como rodar:**

```bash
npm run preview
```

**Resultado esperado:** O projeto será servido em um servidor local, permitindo visualizar como ele se comportará em produção.

---

### **`start` – Iniciando o Backend**

```json
"start": "node server.js"
```

**Descrição:**
Inicia o servidor backend manualmente sem usar ferramentas de recarregamento automático como Nodemon.

**Explicação dos componentes:**

- **`node server.js`**: Executa o arquivo `server.js` usando o interpretador Node.js.

**Como rodar:**

```bash
npm run start
```

**Resultado esperado:** O servidor backend será iniciado e estará pronto para atender requisições.

---

### **`prepare` – Configuração do Husky**

```json
"prepare": "husky"
```

**Descrição:**
Configura o **Husky** para gerenciar Git Hooks no projeto (executado automaticamente após `npm install`).

**Explicação dos componentes:**

- **`husky`**: Instala hooks Git na pasta `.husky/` para executar ações pré-definidas antes de commits/pushes.

**Como rodar:**

```bash
npm run prepare
```

**Resultado esperado:** A pasta `.husky` será criada com hooks configurados para controle de qualidade no versionamento.

---

### **`create-migration` – Criação de Migração**

```json
"create-migration": "npx sequelize-cli migration:create --name $npm_config_name && npm run normalize-ext"
```

**Descrição:**
Gera uma nova migração para o banco de dados usando Sequelize CLI + normaliza extensões de arquivos.

**Explicação dos componentes:**

- **`sequelize-cli migration:create`**: Cria template de migração no padrão do Sequelize
- **`$npm_config_name`**: Nome da migração passado via `--name=migration-name`
- **`normalize-ext`**: Padroniza extensões de arquivos e aplica linting

**Como rodar:**

```bash
npm run create-migration --name=nome-da-migracao
```

**Resultado esperado:** Um novo arquivo de migração será criado em `migrations/` com o nome especificado.

---

### **`migrate-db` – Executar Migrações**

```json
"migrate-db": "npx sequelize db:migrate"
```

**Descrição:**
Aplica todas as migrações pendentes no banco de dados.

**Explicação dos componentes:**

- **`sequelize db:migrate`**: Executa o sistema de migrações do Sequelize para atualizar a estrutura do banco.

**Como rodar:**

```bash
npm run migrate-db
```

**Resultado esperado:** As migrações não aplicadas serão executadas na ordem de criação.

---

### **`normalize-ext` – Normalização de Arquivos**

```json
"normalize-ext": "node ./normalize_extensions.config.js && npm run lint"
```

**Descrição:**
Padroniza extensões de arquivos e aplica linting automático.

**Explicação dos componentes:**

- **`node ./normalize_extensions.config.js`**: Executa script personalizado para normalização
- **`npm run lint`**: Aplica ESLint após normalização

**Como rodar:**

```bash
npm run normalize-ext
```

**Resultado esperado:** Extensões de arquivos serão corrigidas e o código será padronizado.

---

### **Resumo Geral**

| Script                 | Propósito                                             |
| ---------------------- | ----------------------------------------------------- |
| **`dev`**              | Inicia frontend e backend simultaneamente             |
| **`dev:backend`**      | Inicia apenas o backend com recarregamento automático |
| **`dev:frontend`**     | Inicia apenas o frontend com HMR                      |
| **`build`**            | Gera build de produção do frontend                    |
| **`lint`**             | Corrige problemas de estilo no código                 |
| **`preview`**          | Pré-visualiza build de produção                       |
| **`start`**            | Inicia backend em produção                            |
| **`prepare`**          | Configura Git Hooks com Husky                         |
| **`create-migration`** | Cria nova migração de banco de dados                  |
| **`migrate-db`**       | Executa migrações pendentes                           |
| **`normalize-ext`**    | Padroniza extensões de arquivos e aplica linting      |

# **Detalhes de Estrutura**

Vamos explorar em detalhes a estrutura das pastas e configurações para entender melhor como adaptar este boilerplate às diferentes abordagens que ele pode assumir, seja como(_clique sobre tópico para vizualizar adaptação necessária_):

- Solução frontend;
- Solução frontend com SSR;
- Solução backend (API REST);
- Solução fullstack;
