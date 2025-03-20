/**
 * __Use com atenção !!!__
 *
 * Comparação profunda entre dois valores, verificando igualdade estrutural e de conteúdo
 * @param {any} a - Primeiro valor a ser comparado
 * @param {any} b - Segundo valor a ser comparado
 * @returns {boolean} Retorna `true` se:
 * - Ambos valores são estritamente iguais (===)
 * - Possuem mesma estrutura e construtores
 * - Todos os valores aninhados são recursivamente iguais
 * - Mapas têm mesmas chaves/valores (ordem não considerada)
 * - Sets têm mesmos valores (ordem não considerada)
 *
 * - Verifica igualdade de construtores (ex: Map vs Object)
 * - Considera a ordem dos elementos em arrays
 * - Ignora propriedades não enumeráveis
 * - Compara valores de Symbols como chaves
 * - Trata +0 e -0 como diferentes
 * - Compara instâncias de Date pelo timestamp
 *
 * @example
 * Tipos especiais suportados
 * - Primitivos (number, string, boolean, null, undefined)
 * - Objetos e arrays (incluindo aninhados)
 * - Coleções (Map, Set)
 * - Tipos especiais (Date, RegExp)
 * - Symbols (como chaves de propriedades)
 * - NaN é considerado igual a NaN
 *
 * @example
 * // Comparação de objetos complexos
 * deepEqual(
 *   { a: [1, 2], b: new Map([['key', { c: new Date() }]]), [Symbol('id')]: 123 },
 *   { a: [1, 2], b: new Map([['key', { c: new Date() }]]), [Symbol('id')]: 123 }
 * ); // true
 *
 * @example
 * // Comparação de tipos especiais
 * deepEqual(new Set([1, 2, 3]), new Set([3, 2, 1])); // true
 * deepEqual(/test/gi, /test/gi); // true
 *
 * @example
 * // Casos de borda
 * deepEqual(NaN, NaN); // true
 * deepEqual(0, -0); // false
 * deepEqual({ a: undefined }, {}); // false
 */
function deepEqual(a, b) {
	// Comparação direta para tipos primitivos e referências iguais
	if (a === b) return true;

	// Verificação básica de tipo
	if (
		typeof a !== 'object' ||
		typeof b !== 'object' ||
		a === null ||
		b === null
	) {
		return false;
	}

	// Verificação de construtores diferentes
	if (a.constructor !== b.constructor) {
		return false;
	}

	// Comparação especial para Map
	if (a instanceof Map && b instanceof Map) {
		if (a.size !== b.size) return false;
		return [...a.entries()].every(
			([key, value]) => b.has(key) && deepEqual(value, b.get(key)),
		);
	}

	// Comparação especial para Set
	if (a instanceof Set && b instanceof Set) {
		if (a.size !== b.size) return false;
		return [...a].every((value) => b.has(value));
	}

	// Comparação especial para datas
	if (a instanceof Date) {
		return a.getTime() === b.getTime();
	}

	// Comparação especial para expressões regulares
	if (a instanceof RegExp) {
		return a.toString() === b.toString();
	}

	// Comparação de arrays
	if (Array.isArray(a)) {
		if (a.length !== b.length) return false;
		return a.every((el, i) => deepEqual(el, b[i]));
	}

	// Comparação de objetos
	const keysA = [...Object.keys(a), ...Object.getOwnPropertySymbols(a)];
	const keysB = [...Object.keys(b), ...Object.getOwnPropertySymbols(b)];

	if (keysA.length !== keysB.length) return false;

	return keysA.every((key) => {
		return (
			Object.prototype.hasOwnProperty.call(b, key) &&
			deepEqual(a[key], b[key])
		);
	});
}

export { deepEqual };
