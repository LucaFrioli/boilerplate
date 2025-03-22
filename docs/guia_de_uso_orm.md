# Este é um guia de uso do Orm sequlize e sua integração com a arquitetura:

## Sumário

- [Configuração necessária .env](#env)
- [Explicação da configuração realizada do sequelize com a interação do projeto](#sequelizerc)
- [Explicação da configuração realizada da interação do sequelize com banco de dados](#databasecjs)
- [Explicação do script auxiliar para normalização de arquivos](#normalizador-de-arquivos)
    - [Explicação de como utilizar o `index.js`](#como-utilizar-o-indexjs)
- [Utilizando npm para gerenciar banco de dados](#utilizando-o-orm)
    - [Criando Migrações](#utilizando-o-comando-npm-run-create-migration)
    - [Realizando Migrações](#utilizando-o-comando-npm-run-migrate-db)
- [Explicando como criar a morfologia de uma migração, e como criar seu modelo e utiliza-lo no backend](#configurando-uma-migração-e-criando-seu-modelo)
    - [Explicação de como criar um model](#criando-um-model)
    - [Utilizando o modelo]()

# **`.env`**

Primeiramente deve-se criar um arquivo .env na raíz do projeto contendo as seguintes configurações até o momento:

```ini
DATABASE= boilerplate_test #nome de sua base de dados
DATABASE_HOST= localhost # ou host de sua preferencia
DATABASE_PORT= 5432 # porta em que ela está rodando
DATABASE_USERNAME= # seu username
DATABASE_PASSWORD= # sua senha
```

Após criar sua configuração padrão, já é para o sequelize estar funcionando. Os arquivos agregados as configurações de seu funcionamento são os seguintes:

- `.sequelizerc`;

- `/src/configs/database.cjs`;

- `/src/database/index.js`

Vamos explicar o funcionamento de cada um destes arquivos e para que eles servem:

# **`.sequelizerc`**

O arquivo `.sequelizerc` é responsável por definir os caminhos que o **Sequelize CLI** utilizará para localizar os arquivos de configuração, modelos, migrações e seeders.
Isso garante que a estrutura do ORM esteja bem organizada dentro da arquitetura do projeto.

### **Código do `.sequelizerc`**

```javascript
const { resolve } = require('path');

module.exports = {
	config: resolve(__dirname, 'src', 'configs', 'database.cjs'), // Caminho para a configuração do banco de dados
	'models-path': resolve(__dirname, 'src', 'models'), // Caminho dos modelos ORM
	'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'), // Caminho das migrações
	'seeders-path': resolve(__dirname, 'src', 'database', 'seeds'), // Caminho dos seeders (dados iniciais)
};
```

## **Explicação aprofundada**

### **Função**

Este arquivo permite que o **Sequelize CLI** saiba onde estão localizados os arquivos essenciais para o funcionamento do ORM dentro da estrutura do projeto.

### **Importações**

- `resolve` do módulo `path` é usado para construir caminhos de diretórios de forma segura.

### **Estrutura do Objeto Exportado**

O objeto exportado define os caminhos essenciais para a organização do Sequelize no projeto:

| Propriedade       | Caminho Definido           | Função                                              |
| ----------------- | -------------------------- | --------------------------------------------------- |
| `config`          | `src/configs/database.cjs` | Arquivo de configuração do banco de dados           |
| `models-path`     | `src/models`               | Diretório onde ficam os modelos ORM do Sequelize    |
| `migrations-path` | `src/database/migrations`  | Diretório onde ficam as migrações do banco de dados |
| `seeders-path`    | `src/database/seeds`       | Diretório onde ficam os seeders (dados iniciais)    |

---

Agora, com essa configuração definida, o **Sequelize CLI** poderá acessar corretamente os arquivos necessários para o gerenciamento do banco de dados!

# **`database.cjs`**

O arquivo `database.cjs` é responsável por armazenar as configurações de conexão do Sequelize com o banco de dados PostgreSQL.

### **Código do `database.cjs`**

```javascript
/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
require('dotenv').config();

module.exports = {
	dialect: 'postgres',
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: 'deleted_at',
	},
	dialectOptions: {
		timezone: 'America/Sao_Paulo',
	},
	timezone: 'America/Sao_Paulo',
};
```

## **Explicação aprofundada**

### **Função**

Este arquivo contém as configurações de conexão com o banco de dados PostgreSQL, utilizando variáveis de ambiente para manter informações sensíveis protegidas.

### **Principais Configurações**

| Propriedade      | Valor Configurado                   | Função                                                        |
| ---------------- | ----------------------------------- | ------------------------------------------------------------- |
| `dialect`        | `'postgres'`                        | Define que o banco de dados utilizado é o PostgreSQL          |
| `host`           | `process.env.DATABASE_HOST`         | Define o host onde o banco de dados está rodando              |
| `port`           | `process.env.DATABASE_PORT`         | Define a porta do banco de dados                              |
| `username`       | `process.env.DATABASE_USERNAME`     | Usuário do banco de dados                                     |
| `password`       | `process.env.DATABASE_PASSWORD`     | Senha do banco de dados                                       |
| `database`       | `process.env.DATABASE`              | Nome da base de dados                                         |
| `timestamps`     | `true`                              | Ativa automaticamente os campos `createdAt` e `updatedAt`     |
| `underscored`    | `true`                              | Define nomes de colunas usando snake_case                     |
| `underscoredAll` | `true`                              | Aplica o formato snake_case a todas as colunas                |
| `createdAt`      | `'created_at'`                      | Renomeia o campo de criação para `created_at`                 |
| `updatedAt`      | `'updated_at'`                      | Renomeia o campo de atualização para `updated_at`             |
| `deletedAt`      | `'deleted_at'`                      | Ativa a funcionalidade de exclusão lógica (`soft delete`)     |
| `timezone`       | `'America/Sao_Paulo'`               | Define o fuso horário do banco de dados                       |
| `dialectOptions` | `{ timezone: 'America/Sao_Paulo' }` | Garante que as operações do banco respeitem esse fuso horário |

Com essa configuração, o Sequelize estará pronto para interagir corretamente com o banco de dados PostgreSQL de maneira eficiente e segura.

---

## **Observações Importante**

1. **Certifique-se de que o arquivo `.env` esteja corretamente preenchido** para evitar problemas de conexão com o banco de dados.

2. **O Soft Delete só funcionará se for habilitado explicitamente** nas models que desejam suportá-lo.

3. **Caso esteja utilizando um banco diferente do PostgreSQL**, o valor de `dialect` deve ser ajustado conforme necessário (ex: `mysql`, `sqlite`, `mariadb`).

Com essa configuração, o Sequelize está pronto para se conectar ao banco de dados e criar tabelas conforme os modelos definidos no projeto!

# **`index.js`**

Este arquivo é responsável por configurar e inicializar a conexão com o banco de dados, ele também carrega os models (representação das tabelas do banco de dados) e os inicializa com a conexão definida.

O objetivo deste arquivo é:

- Criar uma conexão centralizada com o banco de dados.
- Carregar dinamicamente todos os models do projeto.
- Facilitar a manutenção e expansão do banco de dados, permitindo adicionar novos models de forma organizada.

## **Estrutura do Código**

```javascript
import { Sequelize } from 'sequelize';
import databaseConfig from '../configs/database.cjs';
// Importação de models
import User from '../models/User';

const models = [User]; // Recebe as classes dos models, todo novo model deve ser declarado dentro deste array
const connection = new Sequelize(databaseConfig); // Cria a conexão baseada nas configurações realizadas

models.forEach((model) => model.init(connection)); // Inicia a conexão do modelo corrente
```

---

### 1. Importação do Sequelize

```javascript
import { Sequelize } from 'sequelize';
```

O **Sequelize** é importado para ser utilizado na conexão com o banco de dados.

### 2. Configuração do Banco de Dados

```javascript
import databaseConfig from '../configs/database.cjs';
```

Este arquivo contém as configurações do banco de dados (como host, nome do banco, usuário e senha). A conexão é configurada com base nessas informações.

### 3. Importação dos Models

```javascript
import User from '../models/User';
```

Cada model representa uma tabela no banco de dados. Para que um model seja registrado corretamente, ele deve ser importado e incluído no array `models`.

### 4. Declaração e Inicialização dos Models

```javascript
const models = [User];
```

Neste array, todos os models do projeto devem ser adicionados para que sejam inicializados corretamente.

### 5. Criação da Conexão

```javascript
const connection = new Sequelize(databaseConfig);
```

Aqui, a instância do Sequelize é criada utilizando as configurações do arquivo `database.cjs`, permitindo a conexão com o banco de dados.

### 6. Inicialização dos Models

```javascript
models.forEach((model) => model.init(connection));
```

Cada model possui um método `init`, responsável por associá-lo à conexão criada. Esse loop garante que todos os models adicionados no array sejam devidamente inicializados.

_Para saber mais como criar um model vá até a seção [clicando aqui!](#criando-um-model)_

---

## **Como Utilizar o `index.js`**

1. **Adicionar novos models**

    - Crie um novo model dentro da pasta `models`.
    - Importe o model neste arquivo.
    - Adicione o model ao array `models`.

2. **Modificar as configurações do banco**

    - Altere as configurações no arquivo `database.cjs`.
    - A conexão será automaticamente atualizada com os novos valores.

3. **Executar o projeto**
    - Certifique-se de que o banco de dados esteja ativo.
    - Inicie o projeto com `node` ou `nodemon`.
    - Os models serão carregados e a conexão será estabelecida automaticamente.

Este arquivo é de extrema importância pois:

- **Centraliza a gestão da conexão**: Evita que cada model precise gerenciar sua própria conexão.
- **Facilita a escalabilidade**: Adicionar novos models é simples e organizado.
- **Padroniza a inicialização**: Garante que todos os models sejam corretamente vinculados à conexão com o banco.
- **Reduz a complexidade**: Delega a responsabilidade da conexão ao Sequelize, permitindo foco no desenvolvimento das regras de negócio.

# **Normalizador de Arquivos**

Foi incluido um script de normalização de arquivos para converter automaticamente migrações criadas pelo Sequelize CLI de arquivos `.js` para `.cjs`. Isso garante que as migrações funcionem corretamente dentro da configuração do projeto, especialmente ao utilizar o `type: "module"` no `package.json`.

## Motivação

O Sequelize CLI gera arquivos de migração no formato `.js`, mas quando o projeto está configurado para usar ES Modules, esses arquivos podem gerar erros, pois exigem CommonJS. Para evitar a necessidade de renomear e modificar os arquivos manualmente, criamos um script que automatiza esse processo.

Para isso foi criado um arquivo na raiz do projeto chamado `normalize_extension.config.js`, que utiliza o módulo `fs/promises` do Node.js para:

1. Percorrer o diretório de migrações.
2. Identificar arquivos `.js`.
3. Adicionar uma regra ESLint ao início do arquivo para evitar problemas de import no CommonJS.
4. Renomear a extensão do arquivo de `.js` para `.cjs`.
5. Exibir logs no console informando as alterações realizadas.

## **Estrutura do Código**

```javascript
import { readdir, readFile, rename, stat, writeFile } from 'node:fs/promises';
import path, { basename, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Obtém o caminho do arquivo atual e o diretório base
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definição do caminho do diretório de migrações
const mainPaths = {
	migrations: resolve(__dirname, 'src', 'database', 'migrations'),
};

// Função para modificar a extensão dos arquivos dentro do diretório
async function changeExtension(dir, oldExt, newExt) {
	try {
		const files = await readdir(dir);

		for (const file of files) {
			const filePath = join(dir, file);
			const status = await stat(filePath);

			if (status.isFile() && extname(file) === oldExt) {
				const newFilePath = join(dir, basename(file, oldExt) + newExt);

				if (filePath !== newFilePath) {
					const content = await readFile(filePath, 'utf-8');
					const newContent =
						'/* eslint-disable import/no-commonjs */\n' + content;

					await writeFile(filePath, newContent, 'utf8');
					await rename(filePath, newFilePath);
					console.info(
						`Renomeado: ${file} -> ${basename(newFilePath)}`,
					);
				}
			}
		}
		console.log('Troca de extensão concluída com sucesso!');
	} catch (e) {
		console.error(e);
	}
}

// Executa a função para normalizar os arquivos de migração
changeExtension(mainPaths.migrations, '.js', '.cjs');
```

Para o script se integrar com a ferramenta de criação de migrações foi definido uma série de scripts que serão utilizados para fazer o manejamento de forma simplificada da parte mais significativa referente ao Sequelize.

# **Utilizando o ORM**

Após compreendermos como foi realizada a configuração do ORM, devemos entender como utilizar os scripts agregados às suas funcionalidades.

Para começar a criar uma migração, foram declarados os seguintes scripts:

- **`create-migration`**;
- **`migrate-db`**;
- **`normalize-ext`**; (_script auxiliar_)

Dentro do arquivo `package.json`, na seção `scripts`, esses scripts estão entre os principais abordados no `README` principal:

```json
"scripts": {
  "create-migration": "npx sequelize-cli migration:create --name $npm_config_name && npm run normalize-ext",
  "migrate-db": "npx sequelize db:migrate",
  "normalize-ext": "node ./normalize_extensions.config.js && npm run lint"
}
```

## **Utilizando o comando `npm run create-migration`**

O comando `npm run create-migration` é utilizado para gerar um novo arquivo de migração dentro do diretório `migrations` do seu projeto. Esse script utiliza o `sequelize-cli` para criar um arquivo de migração com um nome específico fornecido pelo usuário.

### **Sintaxe**

```sh
npm run create-migration --name=nome_da_migracao
```

### Explicação

- O argumento `--name=nome_da_migracao` define o nome do arquivo de migração.
- O comando `npx sequelize-cli migration:create` gera um arquivo de migração.
- O script `normalize-ext` é executado automaticamente para padronizar extensões e formatar o código.

## **Utilizando o comando `npm run migrate-db`**

O comando `npm run migrate-db` aplica todas as migrações pendentes no banco de dados configurado.

### **Sintaxe**

```sh
npm run migrate-db
```

### Explicação

- Utiliza o `sequelize-cli` para executar todas as migrações dentro da pasta `migrations`.
- Garante que o esquema do banco de dados esteja atualizado de acordo com as últimas definições de modelo.

---

## **Utilizando o comando `npm run normalize-ext`**

O script `normalize-ext` é um auxiliar que ajusta extensões de arquivos e realiza a formatação do código para manter um padrão dentro do projeto.

### **Sintaxe**

```sh
npm run normalize-ext
```

### Explicação:

- Executa o arquivo `normalize_extensions.config.js`, que pode conter regras específicas para renomear arquivos ou ajustar suas extensões.
- Após a normalização, executa o `npm run lint` para garantir que o código esteja formatado corretamente.

---

# **Configurando uma migração e criando seu modelo**

Após rodarmos o script `create-migration`, para criar nossa primeira migração iremos abrir o arquivo gerado e vamos criar a tabela e os campos contidos nela na função já declarada `up`, e as ações para desfazer o que foi criado na função `down`, veja um exemplo a seguir:

**Obs: lembre de trocar `nome_da_tabela` pelo nome de sua tabela de preferência no plural.**

```javascript
/* eslint-disable import/no-commonjs */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// comandos que devem acontecer
		/*
		 * Comandos existentes:
		 *	- queryInterface.createTable(nome_da_tabela, atributos, opções) para criar tabelas
		 *	- queryInterface.dropTable(nome_da_tabela, opções) para remover uma tabela do banco de dados
		 *
		 *	- queryInterface.addColumn(nome_da_tabela, nome_da_coluna, tipo_de_dado, opções) adiciona coluna em tabela existente
		 *	- queryInterface.removeColumn(nome_da_tabela, nome_da_coluna, opções) remove coluna de tabela existente
		 *	- queryInterface.changeColumn(nome_da_tabela, nome_da_coluna, atributos_que_já_existem_mais_modificação, opções) altera uma coluna
		 *
		 *	- queryInterface.addConstraint(nome_da_tabela, opções) Adiciona restrições a uma tabela como chave extrangeira
		 *	- queryInterface.removeConstraint(nome_da_tabela, nome_da_restrição, opções) Remove alguma restrição específica da tabela
		 *
		 *	- queryInterface.addIndex(nome_da_tabela, campo, opções) Cria um índice para coluna específica
		 *	- queryInterface.removeIndex(nome_da_tabela, nome_do_índice, opções) remove um índice existente
		 *
		 *	- queryInterface.sequelize.query(sql_puro, opções) permite executar SQL puro
		 */
		await queryInterface.createTable('nome_da_tabela', {
			// campos da tabela aqui
			id: {
				// utilizar id sempre como uuid ou integer se não houver uma modelagem mais complexa
				type: Sequelize.UUID, // tipo de dado
				allowNull: false, // permissão de valor nulo, true permite valor nulo
				primaryKey: true, // definição de chave-primária (POR PADRÃO NÃO HÁ A NECESSIDADE DE DECLARA somente dclare caso for chave-primária)
				defaultValue: Sequelize.UUIDV4, // valor padrão caso campo não seja preenchido
			},
			first_name: {
				type: Sequelize.STRING(50), // Tipo de dado string com limite de 50 caracteres
				allowNull: false,
			},
			last_name: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			phone_number: {
				type: Sequelize.STRING(20),
				allowNull: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true, // Define como único no banco de dados
				validate: {
					// validações aqui
					/*
					 * Tipos de validações existentes
					 * 	- is: espera uma expressão regular (valida o valor com base nela)
					 * 	- isUrl: true || false (valida se o valor é uma URL válida)
					 * 	- isIP: true || false (valida se o valor é um IPv4 ou IPv6 válido)
					 * 	- isInt: true || false (valida se o valor é um inteiro)
					 * 	- isFloat: true || false (valida se o valor é um numero com ponto flutuante)
					 * 	- isDecimal: true || false (valida se o valor é um DECIMAL valido)
					 * 	- isIn: [[true, false]] (valida se o valor é true ou false)
					 * 	- isDate: true || false (valida se o valor é uma data válida)
					 * 	- isAlpha: true || false (valida se o valor contem apenas caracteres alfabéticos)
					 * 	- isAlphanumeric: true || false (valida se o valor contem apenas letras e números)
					 * 	- isUUID: número da verção do UUID (verifica se o valor é um UUID válido)
					 * 	- isNumeric: true || false (valida se o valor são apenas números)
					 * 	- isLowercase: true || false (garante que todas as letras sejam minúsculas)
					 * 	- isUppercase: true || false (garante que todas as letras sejam maiúsculas)
					 * 	- notEmpty: true || false (garante que o campo não está vazio)
					 * 	- len: [numero_de_caracteres_mínimo, numero_de_caracteres_máximo] (garante que o valor tem a quantidade de caracteres entre min e max)
					 * 	- min: numero_mínimo (garante que um numero não seja menor que numero_mínimo)
					 * 	- max: numero_máximo (garante que um numero não seja maior que o numero_máximo)
					 * 	- isAfter: 'YYYY-MM-DD' (valida se a data inserida é posterior a uma data específica.)
					 * 	- isBefore: 'YYYY-MM-DD' (valida se a data é anterior a uma data específica.)
					 * 	- isCreditCard: true || false (valida se o valor é um número de cartão de crédito válido)
					 */
					isEmail: true, // Validação para verificar se é um e-mail válido
				},
				created_at: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: Sequelize.NOW,
				},
				updated_at: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: Sequelize.NOW,
				},
				deleted_at: {
					// caso queira o soft delete
					type: Sequelize.DATE,
					allowNull: true,
				},
			},
		});
	},

	async down(queryInterface, Sequelize) {
		// aqui deverá conter todo o comando inversamente proporcional aos comandos contidos na função `up`
		await queryInterface.dropTable('nome_da_tabela');
	},
};
```

Após criar o exemplo básico(recomenda-se apagar os comentários), podemos rodar o comando `migrate-db` via terminal, que deverá ocorrer sem maiores problemas. a saída experada e algo como:

```bash
> npx sequelize db:migrate


Sequelize CLI [Node: xx.xx.xx, CLI: x.x.x, ORM: xx.xx.x]

Loaded configuration file "src/configs/database.cjs".
== YYYYMMDDhhmmss-nome_da_migracao: migrating =======
== YYYYMMDDhhmmss-nome_da_migracao: migrated (0.017s)
```

Se ocorreu tudo certo, continue caso não, verifique erros no banco de dados como, falta de extensões e coisas do gênero. Além dissoverifique seu banco de dados para ver se a tabela iniciou como esperado, contendo os campos e suas respectivas configurações.

## Criando um Model

Agora que concluímos a migração e a configuração do banco de dados, o próximo passo é criar um **Model** correspondente. Esse **Model** funcionará como uma **abstração** da tabela no banco de dados, permitindo interagir com seus dados de maneira estruturada. Por meio dele, poderemos **inserir, modificar, deletar e atualizar registros** sem precisar escrever diretamente consultas SQL, utilizando a API do **Sequelize**.

### 1. Criando o arquivo do Model

Para definir o Model, criaremos um novo arquivo dentro do diretório `src/models`. O nome do arquivo deve seguir a **convenção de nomenclatura** adotada no projeto:

- **A primeira letra deve ser maiúscula, e ser igual ao nome do banco.**
- **O nome deve estar no singular.**
- **Ele deve representar a entidade que estamos modelando.**

Por exemplo, se estivermos lidando com uma entidade **Usuário**, o nome do arquivo será `User.js`.

### 2. Definição da Classe do Model

Dentro desse arquivo, iniciaremos importando o **Sequelize** e a classe **Model** diretamente da biblioteca `sequelize`. Em seguida, criaremos uma nova classe que representará o Model, garantindo que ela **herde** de `Model` para se beneficiar das funcionalidades do ORM. Essa classe será exportada diretamente.

#### Exemplo de código:

```javascript
import { Model, Sequelize } from 'sequelize';

class User extends Model {
	// Implementação virá a seguir
}

export default User;
```

### 3. Inicialização do Model

Após definir a classe, precisaremos implementar um método estático chamado **`init`**, que será responsável por registrar o Model dentro do Sequelize. Esse método receberá como parâmetro uma instância do **Sequelize**, representando a conexão ativa com o banco de dados.

Dentro do corpo do método `init`, chamaremos o método `init` da **superclasse `Model`** (ou seja, a classe que estamos estendendo). Esse método precisa receber dois objetos como argumentos:

1. **O primeiro objeto define os atributos do Model**, onde cada chave representa um campo da tabela e seu valor contém as configurações do campo, como tipo de dado, restrições e chaves primárias. Esse mapeamento deve ser coerente com a estrutura definida na **migração** correspondente.
2. **O segundo objeto define configurações adicionais do Model**, incluindo a conexão (`sequelize`) que será usada para associá-lo à base de dados.

#### Exemplo de código:

```javascript
class User extends Model {
	static init(sequelize) {
		super.init(
			{
				id: { // quando o id for um UUID recomendo reddeclarar ele em sua completude no modelo
					type: Sequelize.UUID,
					allowNull: false,
					primaryKey: true,
					defaultValue: Sequelize.UUIDV4(),// caso esteja trbalhando com UUID lembre de iniciar a função UUIDV4
				},
				first_name: Sequelize.STRING,
				last_name: Sequelize.STRING,
				phone_number: Sequelize.STRING,
				email: Sequelize.STRING,
			},
			{
				sequelize, // Passamos a conexão para vincular o Model ao banco, ela será a configuração do database.cjs
				modelName: 'User', // boa pratica para facilitar depuração
				tableName: 'nome_da_tabela' // caso esteja seguindo as recomendações de nomenclatura não é para haver problemas se não existir esta configuração porém ela auxilia no processo de depuração ou caso os padrões de nomenclatur não estiverem sendo seguidos.
				paranoid: true, // caso queira adicionar o soft_delete na tabela, que será o campo deletedAt: 'deleted_at', presente noa conf database.js
			},
		);
	}
}

export default User;
```

#### **Importante !!!**

É de extrema importância também aplicar validações no model, para verificar como faze-lo [clique aqui!](./orm/validationGuide.md)

### Resumo

- Criamos um novo arquivo dentro de `src/models` com o nome da entidade em **singular e com a primeira letra maiúscula**.
- Importamos `Sequelize` e `Model`.
- Criamos uma classe que estende `Model` e a exportamos.
- Definimos um método estático `init`, onde chamamos `super.init()` para configurar os atributos do Model e vinculá-lo à conexão do banco.

Esse processo garante que nossa aplicação possa manipular os registros dessa tabela de forma **organizada, escalável e segura**, sem precisar lidar diretamente com SQL bruto.
