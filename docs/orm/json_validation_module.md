# Módulo de validação de Jsons

Este arquivo visa documentar os arquivos `deepEquality.validation.js` e `json.validation.js` e suas funções, para auxiliar caso seja necessárias alterações ou agregações no módulo de validação.

## Arquivo `deepEquality.validation.js`

A função `deepEqual` é uma implementação robusta para comparação profunda entre dois valores, garantindo que a igualdade seja verificada não apenas em um nível superficial, mas também em toda a estrutura dos objetos, arrays e coleções.

Ela é projetada para lidar com diferentes tipos de dados, incluindo primitivas, objetos complexos, arrays aninhados, coleções (`Map` e `Set`), expressões regulares, datas e propriedades com `Symbols`.

---

### Assinatura da Função

```javascript
function deepEqual(a, b): boolean
```

- **Parâmetros:**
    - `a`: Qualquer valor que será comparado.
    - `b`: Outro valor a ser comparado com `a`.
- **Retorno:**
    - Retorna `true` se os valores forem estruturalmente e conteudisticamente idênticos.
    - Retorna `false` caso haja qualquer discrepância na estrutura ou valores aninhados.

---

### Estrutura e Lógica da Implementação

A função `deepEqual` segue um fluxo bem definido para garantir uma comparação detalhada entre os valores de entrada:

#### 1. Comparação Direta de Primitivos e Referências Iguais

```javascript
if (a === b) return true;
```

- Se os valores forem estritamente iguais (`===`), a função retorna `true` imediatamente.
- Isso cobre casos triviais como comparação entre números, strings e booleanos.

#### 2. Verificação de Nulos e Tipos Diferentes

```javascript
if (
	typeof a !== 'object' ||
	typeof b !== 'object' ||
	a === null ||
	b === null
) {
	return false;
}
```

- Se um dos valores for `null`, ou se não forem objetos, a função retorna `false`.

#### 3. Verificação de Construtores

```javascript
if (a.constructor !== b.constructor) {
	return false;
}
```

- Se os objetos têm construtores diferentes (por exemplo, `new Map()` vs `new Object()`), eles são considerados diferentes.

#### 4. Comparação Especializada para Tipos Específicos

A função trata tipos especiais de forma personalizada:

##### Map

```javascript
if (a instanceof Map && b instanceof Map) {
	if (a.size !== b.size) return false;
	return [...a.entries()].every(
		([key, value]) => b.has(key) && deepEqual(value, b.get(key)),
	);
}
```

- Verifica se ambos são `Map` e comparam suas chaves e valores.

##### Set

```javascript
if (a instanceof Set && b instanceof Set) {
	if (a.size !== b.size) return false;
	return [...a].every((value) => b.has(value));
}
```

- Verifica se ambos são `Set` e possuem os mesmos valores (ignorando a ordem).

##### Date

```javascript
if (a instanceof Date) {
	return a.getTime() === b.getTime();
}
```

- Datas são comparadas pelo timestamp para garantir igualdade temporal.

##### RegExp

```javascript
if (a instanceof RegExp) {
	return a.toString() === b.toString();
}
```

- Expressões regulares são comparadas pela representação textual.

#### 5. Comparando Arrays

```javascript
if (Array.isArray(a)) {
	if (a.length !== b.length) return false;
	return a.every((el, i) => deepEqual(el, b[i]));
}
```

- Verifica tamanho do array.
- Compara cada elemento recursivamente.

#### 6. Comparando Objetos Comuns

```javascript
const keysA = [...Object.keys(a), ...Object.getOwnPropertySymbols(a)];
const keysB = [...Object.keys(b), ...Object.getOwnPropertySymbols(b)];

if (keysA.length !== keysB.length) return false;

return keysA.every((key) => {
	return (
		Object.prototype.hasOwnProperty.call(b, key) &&
		deepEqual(a[key], b[key])
	);
});
```

- Coleta todas as chaves (incluindo `Symbols`).
- Verifica se os objetos possuem as mesmas chaves.
- Compara recursivamente cada valor associado às chaves.

---

### Casos de Teste e Exemplos

#### 1. Comparando Objetos Complexos

```javascript
deepEqual(
	{
		a: [1, 2],
		b: new Map([['key', { c: new Date() }]]),
		[Symbol('id')]: 123,
	},
	{
		a: [1, 2],
		b: new Map([['key', { c: new Date() }]]),
		[Symbol('id')]: 123,
	},
); // true
```

#### 2. Comparando Coleções

```javascript
deepEqual(new Set([1, 2, 3]), new Set([3, 2, 1])); // true
deepEqual(/test/gi, /test/gi); // true
```

#### 3. Casos de Borda

```javascript
deepEqual(NaN, NaN); // true
deepEqual(0, -0); // false
deepEqual({ a: undefined }, {}); // false
```

---

### Observações

- A função foi projetada para ser altamente precisa e versátil.
- Possui suporte para os principais tipos de dados em JavaScript.
- Não leva em consideração propriedades não enumeráveis.
- Tratar `+0` e `-0` como diferentes segue o padrão ECMAScript.
- Pode ser utilizada em diversas aplicações, como testes unitários, comparação de estados em frameworks de frontend e armazenamento de dados.

---

## Arquivo `json.validation.js`

Este arquivo implementa diversas funções para validar e estruturar JSONs, garantindo que eles sigam esquemas predefinidos. Abaixo, cada função é explicada em detalhes, incluindo sua lógica e tratamento de erros.

## Função `isJson`

```javascript
/**
 * Valida se a entrada do dado é um json válido
 * @param {json} data - dado a ser validado
 * @throws { Error } `(typeof data !== object || Array.isArray(data))` **O dado enviado deve ser um JSON**
 */
function isJson(data) {
	if (typeof data !== 'object' || data === null || Array.isArray(data)) {
		throw new Error('O dado enviado deve ser um JSON');
	}
}
```

**Objetivo:**
Verifica se um dado fornecido é um JSON válido.

**Parâmetros:**

- `data` (**json**) - O dado a ser validado.

**Erros lançados:**

- Se `data` não for um objeto ou for `null`, ou se for um array.

**Lógica:**

1. Confere se `data` é um objeto e não é `null`.
2. Garante que `data` não seja um array.
3. Se a validação falhar, uma exceção é lançada.

---

## Função `defineNumOfKeys`

```javascript
/**
 * Valida se o número de chaves corresponde ao esperado
 * @param {json} data
 * @param {number} numberOfExpectedKeys - número indicando quantas chaves é esperado que o json tenha
 * @throws { Error }  se numberOfExpectedKeys não for um número
 * @throws { Error } `numberOfExpectedKeys !== Object.keys(data).length` **O dado possuí um número diferente de chaves do que o esperado**
 */
function defineNumOfKeys(data, numberOfExpectedKeys) {
	isJson(data);
	if (typeof numberOfExpectedKeys !== 'number') {
		throw new Error(
			'Ops! O parâmetro numberOfExpectedKeys deve ser um número',
		);
	}
	const numberKeys = Object.keys(data).length;
	if (numberKeys !== numberOfExpectedKeys) {
		throw new Error(
			`O dado possui ${numberKeys} chaves porém o esperado eram ${numberOfExpectedKeys}`,
		);
	}
}
```

**Objetivo:**
Verifica se o número de chaves de um JSON corresponde ao esperado.

**Parâmetros:**

- `data` (**json**) - O JSON a ser validado.
- `numberOfExpectedKeys` (**number**) - O número esperado de chaves.

**Erros lançados:**

- Se `numberOfExpectedKeys` não for um número.
- Se `data` tiver um número diferente de chaves do esperado.

**Lógica:**

1. Chama `isJson(data)` para garantir que o dado é um JSON.
2. Confere se `numberOfExpectedKeys` é um número.
3. Obtém a quantidade de chaves usando `Object.keys(data).length`.
4. Se a quantidade de chaves não for a esperada, lança um erro.

---

## Função `validateNameOfKeys`

```javascript
/**
 * Verifica se todas as chaves correspondem a chaves esperadas do objeto Json
 * @param {json} data
 * @param {Array[string]} arrayOfExpectedNames - array de strings com os nomes das chaves esperadas
 * @throws {Error} caso arrayOfExpectedNames não for um array
 * @throws {Error} caso o contéudo de arrayOfExpectedNames não constituir-se apenas de strings
 * @throws {Error} `!arrayOfExpectedNames.include(key)` **Chave ${key} não é uma chave válida para este array**
 */
function validateNameOfKeys(data, arrayOfExpectedNames) {
	isJson(data);
	if (!Array.isArray(arrayOfExpectedNames)) {
		throw new Error(
			'Ops! O parâmetro arrayOfExpectedNames deve ser um array',
		);
	}

	arrayOfExpectedNames.forEach((e) => {
		if (typeof e !== 'string')
			throw new Error(
				'Ops! todos os elementos de arrayOfExpectedNames devem ser strings',
			);
	});

	const keys = Object.keys(data);
	keys.forEach((key) => {
		if (!arrayOfExpectedNames.includes(key)) {
			throw new Error(
				`Chave ${key} não é uma chave válida para este Json`,
			);
		}
	});
}
```

**Objetivo:**
Garante que todas as chaves de um JSON correspondem a nomes esperados.

**Parâmetros:**

- `data` (**json**) - O JSON a ser validado.
- `arrayOfExpectedNames` (**Array<string>**) - Lista de nomes esperados para as chaves.

**Erros lançados:**

- Se `arrayOfExpectedNames` não for um array.
- Se `arrayOfExpectedNames` contiver elementos que não são strings.
- Se `data` possuir chaves que não estão em `arrayOfExpectedNames`.

**Lógica:**

1. Chama `isJson(data)`.
2. Verifica se `arrayOfExpectedNames` é um array.
3. Confirma que todos os elementos de `arrayOfExpectedNames` são strings.
4. Itera sobre as chaves do JSON e verifica se estão na lista esperada.

---

## Função `defineDepthness`

```javascript
/**
 * Função para definir profundidade de JSON
 * @param {json} data - O objeto JSON a ser mapeado.
 * @param {Function} [action=null] - Função opcional para realizar ações em cada nível.
 * @param {number} [depth=1] - Nível atual de profundidade na recursão (inicia em 1).
 * @param {WeakSet<object>} [visited=new WeakSet()] - Conjunto para rastrear objetos visitados e detectar loops.
 * @throws { Error } - Lança erro ao detectar objeto circular
 * @returns {number} - Número que representa a maior profundidade que o objeto chegou
 */
function defineDepthness(
	data,
	action = null,
	depth = 1,
	visited = new WeakSet(),
) {
	if (visited.has(data)) {
		throw new Error(
			`Looping detectado, averigue se utilizar JSON neste caso é a melhor escolha. Estrutura set ${JSON.stringify([...visited])}...
			Dado: ${JSON.stringify([...data])}`,
		);
	}

	visited.add(data);

	if (typeof action === 'function') {
		action(data, depth);
	}

	let maxDepth = depth;
	for (const key in data) {
		if (data[key] === null || typeof data[key] !== 'object') {
			continue;
		}
		if (Object.prototype.hasOwnProperty.call(data, key)) {
			maxDepth = Math.max(
				maxDepth,
				defineDepthness(data[key], action, depth + 1, visited),
			);
		}
	}
	return maxDepth;
}
```

**Objetivo:**
Calcula a profundidade máxima de um JSON.

**Parâmetros:**

- `data` (**json**) - O JSON a ser analisado.
- `action` (**Function | null**) - Função opcional a ser executada em cada nível.
- `depth` (**number**) - Profundidade atual (começa em 1).
- `visited` (**WeakSet<object>**) - Conjunto para detectar loops.

**Erros lançados:**

- Se detectar um loop circular no JSON.

**Lógica:**

1. Verifica se `data` já foi visitado (detecta loops circulares).
2. Marca `data` como visitado.
3. Aplica `action`, se fornecida.
4. Percorre as chaves do objeto e recursivamente calcula a profundidade.
5. Retorna a profundidade máxima encontrada.

---

## Função `definingMap`

```javascript
/**
 * Mapeia recursivamente a estrutura de um objeto JSON, identificando chaves em cada profundidade,
 * relacionamentos pai-filho e detectando loops (referências circulares).
 *
 * @param {Object} data - O objeto JSON a ser mapeado.
 * @param {number} [depth=1] - Nível atual de profundidade na recursão (inicia em 1).
 * @param {Object} [map={}] - Mapa acumulador para armazenar a estrutura hierárquica.
 * @param {Object} [parentMap={}] - Mapa acumulador para relacionamentos pai-filho.
 * @param {string|null} [parentKey=null] - Chave do objeto pai no nível anterior.
 * @param {Set<Object>} [visited=new WeakSet()] - Conjunto para rastrear objetos visitados e detectar loops.
 * @returns {{
 *   map: Object,
 *   parentMap: Object
 * }} Objeto contendo dois mapas:
 * - `map`: Estrutura com chaves `depthN` (ex: depth1, depth2) contendo:
 *   - `keyNames`: Lista de todas as chaves no nível N
 *   - `keysWithSubObjects`: Lista de chaves que possuem subobjetos no nível N
 * - `parentMap`: Relaciona cada chave ao seu pai no nível anterior (ex: { depth2: { childKey: 'parentKey' } })
 * @throws {Error} Se detectar uma referência circular no JSON.
 * @example
 * const data = { a: 1, b: { c: 2 } };
 * const result = definingMap(data);
 * console.log(result.map.depth1.keyNames); // ['a', 'b']
 * console.log(result.parentMap.depth2); // { c: 'b' }
 */
function definingMap(
	data,
	depth = 1,
	map = {},
	parentMap = {},
	parentKey = null,
	visited = new WeakSet(),
) {
	if (visited.has(data)) {
		throw new Error(
			`Loop detectado! Certifique-se de que o JSON não é circular.
			Data: ${JSON.stringify([...visited])}
			Visitados: ${JSON.stringify([...visited])}`,
		);
	}

	visited.add(data);

	// Inicializa o nível no mapa, se ainda não existir
	if (!map[`depth${depth}`]) {
		map[`depth${depth}`] = {
			keyNames: [],
			keysWithSubObjects: [],
		};
	}

	for (const key in data) {
		if (Object.prototype.hasOwnProperty.call(data, key)) {
			map[`depth${depth}`].keyNames.push(key);

			if (
				typeof data[key] === 'object' &&
				data[key] !== null &&
				!Array.isArray(data[key])
			) {
				map[`depth${depth}`].keysWithSubObjects.push(key);

				// Relaciona a chave ao seu "pai" no nível anterior
				if (!parentMap[`depth${depth}`]) {
					parentMap[`depth${depth}`] = {};
				}
				parentMap[`depth${depth}`][key] = parentKey;

				// Recursão para mapear o subobjeto
				definingMap(data[key], depth + 1, map, parentMap, key, visited);
			}
		}
	}

	return { map, parentMap };
}
```

**Objetivo:**
Gera um mapa da estrutura do JSON, incluindo hierarquia e profundidade.

**Parâmetros:**

- `data` (**json**) - O JSON a ser mapeado.
- `depth` (**number**) - Nível atual de profundidade.
- `map` (**Object**) - Estrutura hierárquica acumuladora.
- `parentMap` (**Object**) - Estrutura de relações pai-filho.
- `parentKey` (**string | null**) - Chave do objeto pai.
- `visited` (**WeakSet<object>**) - Conjunto para detectar loops.

**Erros lançados:**

- Se detectar um loop circular.

**Lógica:**

1. Verifica loops.
2. Inicializa `map` e `parentMap`.
3. Para cada chave do JSON:
    - Adiciona ao `map`.
    - Se for um objeto, adiciona a `keysWithSubObjects`.
    - Relaciona ao pai no `parentMap`.
    - Chama recursivamente para subobjetos.
4. Retorna `{ map, parentMap }`.

---

## Função `validateObject`

```javascript
/**
 * Valida recursivamente um objeto contra um schema de validação
 * @param {Object} obj - Objeto a ser validado
 * @param {Object} schema - Schema de validação com regras para cada propriedade. Pode conter:
 *  - Funções validadoras: Recebem o valor e retornam true/false
 *  - Construtores (String, Number, Boolean): Verifica o tipo (permite null)
 *  - RegExp: Valida strings contra o padrão
 *  - Objetos: Validação aninhada para subobjetos
 * @param {string} [path='root'] - Caminho atual na estrutura do objeto (uso interno)
 * @returns {ValidationResult} Resultado da validação com lista de erros
 * @example
 * // Schema de exemplo
 * const schema = {
 *   name: String,
 *   age: (val) => val >= 18,
 *   email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
 *   address: {
 *     street: (value) => value == null || typeof value === null,
 *     number: Number
 *   }
 * };
 *
 * // Uso básico
 * const data = { name: 'John', age: 25, email: 'john@example.com', address: { street: 'Main', number: 123 } };
 * const result = validateObject(data, schema);
 * console.log(result.valid); // true
 */
function validateObject(obj, schema, path = 'root') {
	let errors = [];

	for (const key in schema) {
		if (!Object.hasOwn(schema, key)) continue;

		const expectedType = schema[key];
		const actualValue = obj[key];
		const currentPath = `${path}.${key}`;

		if (typeof expectedType === 'function') {
			if (!expectedType(actualValue)) {
				errors.push(
					`Erro em ${currentPath}: valor inválido (${actualValue})`,
				);
			}
		} else if (expectedType === String) {
			if (typeof actualValue !== 'string' && actualValue !== null) {
				errors.push(
					`Erro em ${currentPath}: esperado string, recebido ${typeof actualValue}`,
				);
			}
		} else if (expectedType === Number) {
			if (typeof actualValue !== 'number' && actualValue !== null) {
				errors.push(
					`Erro em ${currentPath}: esperado number, recebido ${typeof actualValue}`,
				);
			}
		} else if (expectedType === Boolean) {
			if (typeof actualValue !== 'boolean' && actualValue !== null) {
				errors.push(
					`Erro em ${currentPath}: esperado boolean ou null, recebido ${typeof actualValue}`,
				);
			}
		} else if (expectedType instanceof RegExp) {
			if (
				actualValue !== null &&
				(typeof actualValue !== 'string' ||
					!expectedType.test(actualValue))
			) {
				errors.push(
					`Erro em ${currentPath}: valor inválido (${actualValue})`,
				);
			}
		} else if (typeof expectedType === 'object') {
			if (typeof actualValue !== 'object' || actualValue === null) {
				errors.push(
					`Erro em ${currentPath}: esperado objeto, recebido ${typeof actualValue}`,
				);
			} else {
				const nestedResult = validateObject(
					actualValue,
					expectedType,
					currentPath,
				);
				errors = errors.concat(nestedResult.errors);
			}
		}
	}

	return { valid: errors.length === 0, errors };
}
```

**Objetivo:**
Valida um JSON contra um schema de regras.

**Parâmetros:**

- `obj` (**Object**) - JSON a ser validado.
- `schema` (**Object**) - Schema contendo regras.
- `path` (**string**) - Caminho atual (uso interno para erros).

**Retorno:**

- Objeto `{ valid, errors }` indicando sucesso ou erros encontrados.

**Lógica:**

1. Itera sobre as chaves do schema.
2. Valida cada chave de acordo com:
    - Funções validadoras.
    - Tipos primitivos (String, Number, Boolean).
    - Expressões regulares.
    - Objetos aninhados.
3. Retorna se o JSON é válido e a lista de erros encontrados.

---

## Função `validateJson`

```javascript
/**
 * Valida um JSON de acordo com um esquema especificado.
 * @param {object} value - O JSON a ser validado.
 * @param {object} schema - O esquema esperado para o JSON.
 * @throws {Error} Se a profundidade do JSON não corresponder à do esquema.
 * @throws {Error} Se o mapa do JSON não corresponder ao do esquema.
 * @throws {Error} Se o JSON não for válido de acordo com o esquema.
 */
function validateJson(value, schema) {
	isJson(value);
	const depthnessOfSchema = defineDepthness(schema);
	const depthnessOfValue = defineDepthness(value);

	if (depthnessOfSchema !== depthnessOfValue) {
		throw new Error(
			`O valor enviado tem uma profundidade de ${depthnessOfValue}, porém a esperada era ${depthnessOfSchema} !`,
		);
	}

	const schemaMap = definingMap(schema);
	const valueMap = definingMap(value);

	if (!deepEqual(schemaMap, valueMap)) {
		throw new Error(
			`O mapa do valor é difernete do esperado!
				Mapa recebido ${JSON.stringify(valueMap)}
			`,
		);
	}

	const isValid = validateObject(value, schema);

	if (!isValid.valid) {
		throw new Error(`Objeto invalido, erros ${isValid.errors}`);
	}
}
```

**Objetivo:**
Valida um JSON conforme um schema, verificando estrutura, profundidade e regras.

**Parâmetros:**

- `value` (**Object**) - JSON a ser validado.
- `schema` (**Object**) - Schema esperado.

**Erros lançados:**

- Se a profundidade do JSON não corresponder ao schema.
- Se o mapa estrutural do JSON diferir do esperado.
- Se o JSON falhar na validação de regras.

**Lógica:**

1. Chama `isJson(value)`.
2. Compara profundidade entre `value` e `schema`.
3. Compara mapas de estrutura.
4. Chama `validateObject(value, schema)`.
5. Lança erro se houver falhas.

---

## Exportação das Funções

As funções são exportadas para uso externo:

```js
export {
	isJson,
	validateJson,
	validateObject,
	defineNumOfKeys,
	validateNameOfKeys,
	defineDepthness,
	definingMap,
};
```
