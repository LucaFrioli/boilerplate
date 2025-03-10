# **Automatizando Commits com Husky e Commitlint**

Manter um código limpo e padronizado é essencial para um projeto bem estruturado, especialmente quando há múltiplos colaboradores. Para garantir isso, podemos automatizar processos com ferramentas como **Husky** e **Commitlint**, que ajudam a aplicar boas práticas antes mesmo de um commit ser efetuado.

Essas ferramentas possibilitam:

- **Evitar commits com código quebrado** – O Husky pode rodar testes e linting antes de permitir um commit, garantindo que apenas código funcional seja versionado.

- **Manter padrões de mensagens de commit** – O Commitlint impõe um formato consistente para mensagens, facilitando a leitura do histórico do repositório.

- **Automação de tarefas** – Além do linting e da padronização de commits, o Husky pode ser configurado para rodar outras verificações, como testes unitários e formatação automática de código.

- **Facilidade na colaboração** – Com mensagens de commit bem estruturadas e código validado antes de cada push, o trabalho em equipe se torna mais fluido e organizado.

Agora, vamos ver como configurar essas ferramentas de forma simplificada. Essa é apenas a base – conforme você se familiarizar, poderá expandir a automação para incluir mais verificações e melhorar ainda mais o fluxo de desenvolvimento!

---

## Sumário

- [Configuração realizada no Husky](#configuração-realizada-do-husky)
- [Configuração realizada para padronização de Mensagens de Commit com Commitlint](#configuração-realizada-para-padronização-de-mensagens-de-commit-com-commitlint)
- [Tipos de menssagens utilizadas com Commitlint](#tipos-de-menssagens-utilizadas-com-commitlint)
	- [Resumo de como utiliza-las](#resumo-de-como-usar)



## **Configuração realizada do Husky**

Primeiro, instalamos o Husky como dependência de desenvolvimento:

```bash
npm i -D husky
```

Depois, inicializamos o Husky no projeto com o seguinte comando, conforme recomendado na documentação:

```bash
npx husky init
```

Isso criará a pasta `.husky/` dentro do projeto e configurará os hooks do Git para serem gerenciados pelo Husky.

Agora, podemos configurar um hook de **pré-commit** para rodar o linting automaticamente antes de cada commit. Dentro da pasta `.husky/`, edite ou crie o arquivo `pre-commit` e adicione o seguinte script:

```sh
echo "Iniciando o linting..."

npm run lint || (echo "Erro ao executar linting. Corrija os problemas antes de continuar." && exit 1)

echo "Linting finalizado com sucesso!"
```

Agora, sempre que tentarmos fazer um commit, o ESLint será executado automaticamente. Se houver erros, o commit será impedido até que os problemas sejam resolvidos.

---

## **Configuração realizada para padronização de Mensagens de Commit com Commitlint**

Para garantir que todas as mensagens de commit sigam um formato padronizado, utilizamos o **Commitlint**.

### **Instalação do Commitlint**

Rodamos o seguinte comando para instalar as dependências necessárias:

```bash
npm install --save-dev @commitlint/{cli,config-conventional}
```

Agora, criamos o arquivo de configuração do Commitlint no projeto:

```bash
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

Isso define que seguiremos a convenção `config-conventional`, que estrutura as mensagens de commit da seguinte forma:

```plaintext
<tipo>(<escopo>): <descrição>
```

Por exemplo:

```plaintext
feat(auth): adiciona suporte a autenticação com JWT
fix(ui): corrige bug no botão de login
chore(deps): atualiza dependências do projeto
```

Aqui está o significado de cada parte:

- **`<tipo>`** → Define o propósito da mudança (ex.: `feat`, `fix`, `chore`, `docs`, etc.).
- **`<escopo>`** → Indica a área do código afetada pela mudança (ex.: `auth`, `ui`, `deps`).
- **`<descrição>`** → Explica de forma resumida o que foi alterado.

### **Integrando o Commitlint ao Husky**

Agora, criamos um hook para validar mensagens de commit. Dentro da pasta `.husky/`, criamos um arquivo chamado `commit-msg` e adicionamos o seguinte código:

```sh
#!/bin/sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit ${1}
```

Com isso, sempre que um commit for feito, o Commitlint verificará se a mensagem segue o padrão estabelecido.

---

## **Conclusão e Próximos Passos**

Agora, temos uma configuração básica, mas extremamente útil para manter o código padronizado e facilitar o trabalho em equipe. **Isso é apenas o começo!**

- **Expandindo as automações**: Podemos adicionar testes automatizados, verificação de formatação (`Prettier`), linting de TypeScript e até mesmo rodar `builds` antes de um `push`.

- **Customizando regras**: Podemos definir regras personalizadas no `commitlint.config.js`, como exigir mensagens mais detalhadas ou impedir certos tipos de commits.

- **Melhorando a experiência do time**: Com essas ferramentas configuradas, todos os membros da equipe terão um fluxo de trabalho mais organizado, garantindo qualidade e consistência no código.

Agora que você entende como a configuração básica funciona, pode explorar formas de elevar seu nível e automatizar ainda mais processos no seu projeto!

## Tipos de menssagens utilizadas com Commitlint

### 1. **build**
   - **O que é?**: Refere-se a mudanças no processo de construção do projeto, como a configuração do build, dependências de pacotes ou ferramentas de build (Webpack, Babel, etc.).
   - **Exemplo de uso**:
     - "build: Adiciona configuração do Webpack para otimização de imagens."
     - "build: Atualiza versão do Node.js para 16."

### 2. **chore**
   - **O que é?**: Usado para tarefas de manutenção ou ajustes pequenos no código que não afetam a lógica do sistema, como atualizações de dependências, configurações ou arquivos de configuração.
   - **Exemplo de uso**:
     - "chore: Atualiza dependências para a versão mais recente."
     - "chore: Adiciona arquivo de configuração do ESLint."

### 3. **ci**
   - **O que é?**: Refere-se a mudanças nos arquivos ou configurações do processo de Integração Contínua (CI). Isso inclui configurações de ferramentas como Travis CI, CircleCI, GitHub Actions, Jenkins, etc.
   - **Exemplo de uso**:
     - "ci: Atualiza workflow do GitHub Actions para testar novos recursos."
     - "ci: Adiciona configuração para rodar testes no CircleCI."

### 4. **docs**
   - **O que é?**: Usado para alterações na documentação do projeto, seja no README, no Wiki ou em qualquer outro documento explicativo.
   - **Exemplo de uso**:
     - "docs: Atualiza o README com instruções de instalação."
     - "docs: Adiciona exemplos de uso da API na documentação."

### 5. **feat (Feature)**
   - **O que é?**: Refere-se a uma nova funcionalidade ou recurso adicionado ao projeto.
   - **Exemplo de uso**:
     - "feat: Adiciona funcionalidade de login com Google."
     - "feat: Implementa sistema de notificações push."

### 6. **fix**
   - **O que é?**: Usado quando há correção de bugs ou falhas no código. Alterações que resolvem problemas, mas não adicionam novos recursos.
   - **Exemplo de uso**:
     - "fix: Corrige erro de cálculo no componente de resumo."
     - "fix: Resolve problema de autenticação no sistema de login."

### 7. **perf (Performance)**
   - **O que é?**: Refere-se a alterações feitas para melhorar o desempenho do sistema, como otimizações de código que aumentam a velocidade, diminuem o uso de memória ou tornam o código mais eficiente.
   - **Exemplo de uso**:
     - "perf: Melhora performance de renderização da lista de itens."
     - "perf: Reduz tempo de resposta do endpoint de login."

### 8. **refactor**
   - **O que é?**: Refatoração de código significa modificar a estrutura do código sem alterar seu comportamento. O objetivo é melhorar a legibilidade, a organização ou a eficiência do código sem introduzir novas funcionalidades ou corrigir erros.
   - **Exemplo de uso**:
     - "refactor: Refatora função de login para melhorar legibilidade."
     - "refactor: Refatora código de validação de formulários."

### 9. **revert**
   - **O que é?**: Usado quando você precisa reverter uma alteração anterior, seja devido a um erro ou mudança de direção. Isso geralmente é feito com o comando `git revert`, que cria um novo commit que desfaz um commit anterior.
   - **Exemplo de uso**:
     - "revert: Reverte commit que introduziu falha no sistema de autenticação."
     - "revert: Desfaz a alteração no layout do componente de menu."

### 10. **style**
   - **O que é?**: Refere-se a mudanças que afetam a estilização do projeto, como CSS, layout, formatação de código (indentação, espaçamento), mas não altera o comportamento do sistema.
   - **Exemplo de uso**:
     - "style: Ajusta o alinhamento do botão de envio no formulário."
     - "style: Refatora o arquivo CSS para usar classes mais claras."

### 11. **test**
   - **O que é?**: Usado para alterações que envolvem a criação ou modificação de testes automatizados. Isso inclui testes unitários, de integração ou de interface.
   - **Exemplo de uso**:
     - "test: Adiciona testes unitários para a função de login."
     - "test: Cria testes de integração para o endpoint de usuários."

---

### Resumo de Como Usar:

- **build**: Modificações nas ferramentas e configurações de build.
- **chore**: Tarefas de manutenção ou melhorias pequenas que não alteram o comportamento do código.
- **ci**: Modificações no processo de integração contínua.
- **docs**: Alterações na documentação.
- **feat**: Implementação de novos recursos ou funcionalidades.
- **fix**: Correção de erros ou falhas no sistema.
- **perf**: Melhoria no desempenho do sistema.
- **refactor**: Refatoração do código sem alterar sua funcionalidade.
- **revert**: Reversão de alterações feitas em commits anteriores.
- **style**: Mudanças na estilização e formatação, sem alterar o comportamento do código.
- **test**: Modificação ou adição de testes automatizados.

Esses termos seguem uma convenção de boas práticas para garantir que as mensagens de commit sejam claras e informativas, permitindo um controle de versão mais organizado e facilitando a comunicação.

