/* eslint-disable new-cap */
/* eslint-disable import/no-commonjs */
'use strict';

/**
 * Este arquivo representa uma migração do banco de dados utilizando Sequelize.
 * Ele adiciona e remove colunas de forma segura, garantindo que nenhuma inconsistência ocorra
 * durante o processo. Para isso, utilizamos transações manuais, garantindo que qualquer erro
 * revertará todas as alterações realizadas até aquele ponto.
 *
 * Como funciona esta migração?
 *
 * 1. Uso de Transações:
 *    - As operações de adição e remoção de colunas são agrupadas dentro de uma transação.
 *    - Isso significa que, caso ocorra um erro em qualquer uma das operações, todas as mudanças
 *      feitas até aquele momento serão desfeitas, mantendo o banco de dados íntegro.
 *
 * 2. Método `up` (Aplicando a migração):
 *    - Adiciona a coluna `password_hash` na tabela `users`.
 *    - Remove as colunas `age`, `salary` e `json_data` da mesma tabela.
 *    - Todas essas operações são executadas dentro de um `try...catch`, e, se tudo ocorrer bem,
 *      a transação é finalizada com `commit()`. Caso contrário, `rollback()` é chamado para
 *      desfazer qualquer modificação.
 *
 * 3. Método `down` (Revertendo a migração):
 *    - Remove a coluna `password_hash`.
 *    - Restaura as colunas `age`, `salary` e `json_data`, garantindo que elas voltem
 *      exatamente como estavam antes.
 *    - Assim como no `up`, todas essas operações são encapsuladas em uma transação para evitar
 *      inconsistências no banco de dados.
 */

/**
 * @file Migração do banco de dados utilizando Sequelize.
 *
 * Este arquivo realiza a adição e remoção de colunas na tabela `users` de forma segura,
 * garantindo a integridade dos dados através do uso de transações. Caso ocorra um erro durante
 * a execução, todas as alterações serão revertidas para evitar inconsistências.
 *
 * @module migration
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	/**
	 * Executa a migração, adicionando e removendo colunas na tabela `users`.
	 *
	 * @async
	 * @function up
	 * @param {object} queryInterface - Interface de manipulação do banco de dados.
	 * @param {object} Sequelize - Biblioteca Sequelize para definição dos tipos de dados.
	 * @returns {Promise<void>} Uma Promise resolvida quando a migração for concluída.
	 */
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			// Adiciona a coluna password_hash
			await queryInterface.addColumn(
				'users',
				'password_hash',
				{
					type: Sequelize.STRING,
					allowNull: false,
					defaultValue: 'no password here',
				},
				{ transaction },
			);

			// Remove colunas obsoletas
			await queryInterface.removeColumn('users', 'age', { transaction });
			await queryInterface.removeColumn('users', 'salary', {
				transaction,
			});
			await queryInterface.removeColumn('users', 'json_data', {
				transaction,
			});

			// Confirma a transação
			await transaction.commit();
		} catch (e) {
			// Em caso de erro, reverte todas as alterações
			await transaction.rollback();
			throw e;
		}
	},

	/**
	 * Reverte a migração, restaurando a estrutura original da tabela `users`.
	 *
	 * @async
	 * @function down
	 * @param {object} queryInterface - Interface de manipulação do banco de dados.
	 * @param {object} Sequelize - Biblioteca Sequelize para definição dos tipos de dados.
	 * @returns {Promise<void>} Uma Promise resolvida quando a reversão for concluída.
	 */
	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			// Remove a coluna adicionada
			await queryInterface.removeColumn('users', 'password_hash', {
				transaction,
			});

			// Restaura as colunas removidas
			await queryInterface.addColumn(
				'users',
				'age',
				{
					type: Sequelize.INTEGER, // Tipo inteiro
					allowNull: false,
				},
				{ transaction },
			);
			await queryInterface.addColumn(
				'users',
				'salary',
				{
					type: Sequelize.DECIMAL(10, 2), // Tipo decimal, com 10 dígitos no total e 2 após a vírgula
					allowNull: true,
				},
				{ transaction },
			);
			await queryInterface.addColumn(
				'users',
				'json_data',
				{
					type: Sequelize.JSON, // Tipo de dado JSON
					allowNull: true,
				},
				{ transaction },
			);

			// Confirma a reversão da migração
			await transaction.commit();
		} catch (e) {
			// Reverte qualquer alteração em caso de erro
			await transaction.rollback();
			throw e;
		}
	},
};
