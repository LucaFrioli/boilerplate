/* eslint-disable new-cap */
/* eslint-disable import/no-commonjs */
'use strict';

// criação exacerbada de demonstração, em como fazer declarações. Na próxima migração ireia abordar como manipular a tabela retirando alguns campos
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// tudo que deve ser inserido alterado ou criado fica na seção atual up;
		await queryInterface.createTable('users', {
			id: {
				type: Sequelize.UUID, // ID único com UUID
				allowNull: false,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4, // Gera UUID v4 por padrão
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
				type: Sequelize.STRING(20), // Tipo de dado string para telefone
				allowNull: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true, // Define como único no banco de dados
				validate: {
					isEmail: true, // Validação para verificar se é um e-mail válido
				},
			},
			age: {
				type: Sequelize.INTEGER, // Tipo inteiro
				allowNull: false,
			},
			birth_date: {
				type: Sequelize.DATEONLY, // Tipo de dado apenas de data (sem hora)
				allowNull: true,
			},
			salary: {
				type: Sequelize.DECIMAL(10, 2), // Tipo decimal, com 10 dígitos no total e 2 após a vírgula
				allowNull: true,
			},
			is_active: {
				type: Sequelize.BOOLEAN, // Tipo de dado booleano
				defaultValue: true, // Valor padrão é 'true'
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW, // Data e hora atuais como padrão
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
			deleted_at: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			json_data: {
				type: Sequelize.JSON, // Tipo de dado JSON
				allowNull: true,
			},
			ip_address: {
				type: Sequelize.INET, // Tipo de dado para armazenar um endereço IP
				allowNull: true,
			},
			additional_info: {
				type: Sequelize.JSONB, // JSONB para armazenar dados JSON com busca eficiente
				allowNull: true,
			},
			// para utilizar dados geoespaciais configurar extenções no banco de dados
			// geo_location: {
			// 	type: Sequelize.GEOMETRY('POINT'), // Tipo de dado geoespacial para armazenar coordenadas de ponto
			// 	allowNull: true,
			// },
		});
	},

	async down(queryInterface, Sequelize) {
		// tudo que estiver dentro da seção up deve ter seu contraponto para ser desfeito nesta seção down
		await queryInterface.dropTable('users');
	},
};
