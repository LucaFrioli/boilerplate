# Ferramentas de formatação e linting de código e configurações do VSCode

Como ferramentas para manter a consistência de nosso código, foram selecionadas o conjunto de Prettier, EditorConfig e Eslint.

Para verificar e conhecer mais sobre as ferramentas e as configurações básicas [clique aqui!](https://github.com/LucaFrioli/JS_Estudos/tree/main/rest_api_with_mariaDB_Docker/Aula_02).

Além das configurações realizadas acima, foi feito um merge com as configurações padrão geradas pelo Vite. Entre as modificações recomendadas, incluiu o uso do Babel e do `@babel/eslint-parser` para tornar a análise do ESLint mais robusta ao lidar com arquivos JSX e TSX. Além disso, forma adicionadas as extensões necessárias na regra `files` do primeiro bloco e, no `parserOptions`, incluindo as funcionalidades do ECMAScript, a requisição de um arquivo de configuração para o parser e as opções do Babel. Veja as mudanças no código a seguir:

```javascript
// imports adicionados
import js from '@eslint/js';  // troca realizada
import globals from 'globals';
import eslintPluginImport from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';  // adição das configurações necessárias para bom funcionamento de lint do react
import reactRefresh from 'eslint-plugin-react-refresh'; // adição das configurações necessárias para bom funcionamento de lint do react
import babelParser from '@babel/eslint-parser'; // adição das configurações necessárias para elevar  o nível de lint do react



// primeiro bloco
	// Configuração geral para JS e TS
	{
		files: ['**/*.{js,jsx,ts,tsx}'], // mudança de extenções
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: { ...globals.node, ...globals.browser },
			parser: babelParser, // adição do parser
			parserOptions: { // adição das configurações do parser para lint
				ecmaFeatures: { jsx: true },
				requireConfigFile: false,
				babelOptions: {
					presets: ['@babel/preset-env', '@babel/preset-react'],
				},
			},
		},
	},

	// Configuração base do ESLint
	js.configs.recommended, // mudança leve

	// Configurações presentes no código compiado sugerido até chegar antes das configurações do prettier...

		// Configuração específica para React + Hooks
	{
		files: ['**/*.{js,jsx}'],
		plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
		},
	},

	// configurações do prettier padrão

```

Após instalar as ferramentas de linting iremos adicionar um sistema que roda o linter automaticamente antes de commitar e na hora de subir os códigos para o repositório, [clique aqui para visualizar a documentação](./huskyAndLintStaged.md)
