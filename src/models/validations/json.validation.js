import { deepEqual } from './deepEquality.validation.js';

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

export {
	isJson,
	validateJson,
	validateObject,
	defineNumOfKeys,
	validateNameOfKeys,
	defineDepthness,
	definingMap,
};
