# Este é um guia de uso do Orm sequlize e sua integração com a arquitetura:

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

| Propriedade       | Caminho Definido            | Função                                              |
| ----------------- | --------------------------- | --------------------------------------------------- |
| `config`          | `src/configs/database.cjs`  | Arquivo de configuração do banco de dados           |
| `models-path`     | `src/models`                | Diretório onde ficam os modelos ORM do Sequelize    |
| `migrations-path` | `src/database/migrations`   | Diretório onde ficam as migrações do banco de dados |
| `seeders-path`    | `src/database/seeds`        | Diretório onde ficam os seeders (dados iniciais)    |

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

| Propriedade       | Valor Configurado                         | Função                                                        |
| ----------------- | ----------------------------------------- | --------------------------------------------------------------|
| `dialect`         | `'postgres'`                              | Define que o banco de dados utilizado é o PostgreSQL          |
| `host`            | `process.env.DATABASE_HOST`               | Define o host onde o banco de dados está rodando              |
| `port`            | `process.env.DATABASE_PORT`               | Define a porta do banco de dados                              |
| `username`        | `process.env.DATABASE_USERNAME`           | Usuário do banco de dados                                     |
| `password`        | `process.env.DATABASE_PASSWORD`           | Senha do banco de dados                                       |
| `database`        | `process.env.DATABASE`                    | Nome da base de dados                                         |
| `timestamps`      | `true`                                    | Ativa automaticamente os campos `createdAt` e `updatedAt`     |
| `underscored`     | `true`                                    | Define nomes de colunas usando snake_case                     |
| `underscoredAll`  | `true`                                    | Aplica o formato snake_case a todas as colunas                |
| `createdAt`       | `'created_at'`                            | Renomeia o campo de criação para `created_at`                 |
| `updatedAt`       | `'updated_at'`                            | Renomeia o campo de atualização para `updated_at`             |
| `deletedAt`       | `'deleted_at'`                            | Ativa a funcionalidade de exclusão lógica (`soft delete`)     |
| `timezone`        | `'America/Sao_Paulo'`                     | Define o fuso horário do banco de dados                       |
| `dialectOptions`  | `{ timezone: 'America/Sao_Paulo' }`       | Garante que as operações do banco respeitem esse fuso horário |

Com essa configuração, o Sequelize estará pronto para interagir corretamente com o banco de dados PostgreSQL de maneira eficiente e segura.

---

## **Observações Importante**

1. **Certifique-se de que o arquivo `.env` esteja corretamente preenchido** para evitar problemas de conexão com o banco de dados.

2. **O Soft Delete só funcionará se for habilitado explicitamente** nas models que desejam suportá-lo.

3. **Caso esteja utilizando um banco diferente do PostgreSQL**, o valor de `dialect` deve ser ajustado conforme necessário (ex: `mysql`, `sqlite`, `mariadb`).

Com essa configuração, o Sequelize está pronto para se conectar ao banco de dados e criar tabelas conforme os modelos definidos no projeto!


# Utilizando o ORM:

Após compreendermos como foi realizada a configuração do ORM devemos compreender como utilizar os scripts agregados a suas funcionalidades.

Para começar a criar uma migração foi declarado o script

- **`create-migration`**;
- **`migrate-db`**;

Dentro do arquivo `package.json`, na seção scripts serão encontrados estes dois scripts entre os principais abordados no `readme` principal

```json
	"create-migration": "",
	"migrate-db": ""
```

## Utilizando o comando `npm create-migration`:
