import js from '@eslint/js';
import globals from 'globals';
import eslintPluginImport from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import babelParser from '@babel/eslint-parser';

export default [
	// Ignorar diretórios desnecessários
	{ ignores: ['node_modules/', 'dist'] },

	// Configuração geral para JS e TS
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: { ...globals.node, ...globals.browser },
			parser: babelParser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				requireConfigFile: false,
				babelOptions: {
					presets: ['@babel/preset-env', '@babel/preset-react'],
				},
			},
		},
	},

	// Configuração base do ESLint
	js.configs.recommended,

	// Plugins Import e regras de boas práticas
	{
		plugins: { import: eslintPluginImport },
		rules: {
			'no-cond-assign': 'off', // ESLint recommended
			'no-irregular-whitespace': 'error', // ESLint recommended
			'no-unexpected-multiline': 'error', // ESLint recommended

			// Boas práticas
			curly: ['error', 'multi-line'],
			'guard-for-in': 'error',
			'no-caller': 'error',
			'no-extend-native': 'error',
			'no-extra-bind': 'error',
			'no-invalid-this': 'error',
			'no-multi-spaces': 'error',
			'no-new-wrappers': 'error',
			'no-throw-literal': 'error', // ESLint recommended
			'no-with': 'error',
			'prefer-promise-reject-errors': 'error',
			'no-unused-vars': [
				'error',
				{ args: 'none', varsIgnorePattern: '^[A-Z_]' },
			], // ESLint recommended

			// Estilização
			'array-bracket-spacing': ['error', 'never'],
			'block-spacing': ['error', 'never'],
			'brace-style': 'error',
			camelcase: ['error', { properties: 'never' }],
			'comma-dangle': ['error', 'always-multiline'],
			'comma-spacing': 'error',
			'comma-style': 'error',
			'computed-property-spacing': 'error',
			'eol-last': 'error',
			'func-call-spacing': 'error',
			indent: ['error', 'tab', { SwitchCase: 1 }],
			'key-spacing': 'error',
			'keyword-spacing': 'error',
			'linebreak-style': 'error',
			'max-len': [
				'error',
				{
					code: 80,
					tabWidth: 4,
					ignoreUrls: true,
					ignorePattern: 'goog.(module|require)',
					ignoreComments: true,
					ignoreTrailingComments: true,
					ignoreStrings: true,
					ignoreTemplateLiterals: true,
					ignoreRegExpLiterals: true,
				},
			],
			'new-cap': 'error',
			'no-array-constructor': 'error',
			'no-mixed-spaces-and-tabs': 'error',
			'no-multiple-empty-lines': ['error', { max: 2 }],
			'no-new-object': 'error',
			'no-tabs': 'error',
			'no-trailing-spaces': 'error',
			'object-curly-spacing': 'error',
			'one-var': [
				'error',
				{ var: 'never', let: 'never', const: 'never' },
			],
			'operator-linebreak': ['error', 'after'],
			'padded-blocks': ['error', 'never'],
			'quote-props': ['error', 'consistent'],
			quotes: ['error', 'single', { allowTemplateLiterals: true }],
			semi: 'error',
			'semi-spacing': 'error',
			'space-before-blocks': 'error',
			'space-before-function-paren': [
				'error',
				{ asyncArrow: 'always', anonymous: 'never', named: 'never' },
			],
			'spaced-comment': ['error', 'always'],
			'switch-colon-spacing': 'error',

			// ECMAScript 6+
			'arrow-parens': ['error', 'always'],
			'constructor-super': 'error', // ESLint recommended
			'generator-star-spacing': ['error', 'after'],
			'no-new-symbol': 'error', // ESLint recommended
			'no-this-before-super': 'error', // ESLint recommended
			'no-var': 'error',
			'prefer-const': ['error', { destructuring: 'all' }],
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'rest-spread-spacing': 'error',
			'yield-star-spacing': ['error', 'after'],
			'import/no-commonjs': 'error',
		},
	},

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

	// Configuração do Prettier para evitar conflitos de formatação
	{
		plugins: { prettier: eslintPluginPrettier },
		rules: {
			'prettier/prettier': 'error',
		},
	},
	prettier,
];
