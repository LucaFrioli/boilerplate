# Boilerplate React + Vite + Node + Express + Sequelize

Este boilerplate foi estruturado para otimizar o trabalho em equipe, padronizar o código e melhorar o fluxo de desenvolvimento, além de oferecer configurações úteis para projetos fullstack. No entanto, sua aplicação não se limita a esses aspectos. Diversos recursos foram configurados para agilizar o início de novos projetos, e vários módulos estão sendo documentados, permitindo que sejam facilmente removidos ou expandidos conforme a necessidade.

## **Sumário**

- [Linting e fromatadores padrões](#informações-sobre-linting-e-ferramentas-de-padronização)
- [Scripts principais](#scripts-principais-do-packagejson)
- Dependências
- [Detalhes de estrutura](#detalhes-de-estrutura)

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

### **Resumo Geral**

| Script        | Propósito                                                                      |
| ------------- | ------------------------------------------------------------------------------ |
| **`dev`**     | Inicia frontend com **Vite** e backend com **Nodemon** simultaneamente.        |
| **`build`**   | Gera versão otimizada do frontend para produção.                               |
| **`lint`**    | Verifica e corrige automaticamente problemas no código usando **ESLint**.      |
| **`preview`** | Inicia um servidor para visualizar o **build** antes de implantar em produção. |
| **`start`**   | Inicia manualmente o backend com Node.js.                                      |

# **Detalhes de Estrutura**

Vamos explorar em detalhes a estrutura das pastas e configurações para entender melhor como adaptar este boilerplate às diferentes abordagens que ele pode assumir, seja como(_clique sobre tópico para vizualizar adaptação necessária_):

- Solução frontend;
- Solução frontend com SSR;
- Solução backend (API REST);
- Solução fullstack;
