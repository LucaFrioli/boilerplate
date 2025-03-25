import { validateJson } from '../utils/json.validation.js';

export default class UserValidation {
	constructor(value) {
		this.value = value;
	}

	/**
	 * Retorna o schema de validação para informações adicionais
	 */
	getAdditionalInfoSchema() {
		return {
			description: String,
			metadata: {
				role: (value) => {
					if (!/^(admin|user|employee)$/.test(value)) {
						throw new Error(
							'O campo "role" deve ser admin, user ou employee.',
						);
					}
				},
				configs: {
					darkTheme: (value) => {
						if (value !== null && typeof value !== 'boolean') {
							throw new Error(
								'O campo "darkTheme" deve ser booleano ou nulo.',
							);
						}
					},
					colorPreferences: {
						header_and_footer: (value) =>
							this.verifyIsRgba(value, 'header_and_footer'),
						border_profile_photo: (value) =>
							this.verifyIsRgba(value, 'border_profile_photo'),
					},
					notifications: (value) => {
						if (value !== null && typeof value !== 'boolean') {
							throw new Error(
								'O campo "notifications" deve ser booleano ou nulo.',
							);
						}
					},
				},
				social_links: {
					github: (value) =>
						this.verifyUrl(value, 'github', 'https://github.com/'),
					linkedin: (value) =>
						this.verifyUrl(
							value,
							'linkedin',
							'https://www.linkedin.com/in/',
						),
					meta_interprise: {
						instagram: (value) =>
							this.verifyUrl(
								value,
								'instagram',
								'https://www.instagram.com/',
							),
						facebook: (value) =>
							this.verifyUrl(
								value,
								'facebook',
								'https://www.facebook.com/',
							),
					},
					twitter: (value) =>
						this.verifyUrl(
							value,
							'twitter',
							'https://twitter.com/',
						),
				},
			},
		};
	}

	/**
	 * Valida a estrutura das informações adicionais do usuário
	 */
	additionalInfoValidateInput() {
		validateJson(this.value, this.getAdditionalInfoSchema());
	}

	/**
	 * Verifica se o valor é um código RGBA válido ou nulo
	 * @param {string | null} value - Valor a ser validado
	 * @param {string} keyName - Nome da chave sendo validada
	 */
	verifyIsRgba(value, keyName) {
		if (
			value !== null &&
			!/^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, (0|1|0?\.\d+)\)$/.test(value)
		) {
			throw new Error(
				`O valor de "${keyName}" deve ser um código RGBA válido ou nulo.`,
			);
		}
	}

	/**
	 * Verifica se uma URL é válida ou nula e se pertence a um domínio específico
	 * @param {string | null} value - URL a ser validada
	 * @param {string} keyName - Nome do campo
	 * @param {string} baseUrl - Prefixo esperado para a URL
	 */
	verifyUrl(value, keyName, baseUrl) {
		if (value !== null && !value.startsWith(baseUrl)) {
			throw new Error(
				`O campo "${keyName}" deve ser uma URL válida do tipo "${baseUrl}..." ou nula.`,
			);
		}
	}
}
