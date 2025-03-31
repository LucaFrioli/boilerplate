/* eslint-disable new-cap */
/* eslint-disable import/no-commonjs */
'use strict';

// formulação final da tabela para que seja realmente util... (irei manter a primeiro momento assim, posterior mente analizarei em adicionar um tabela para entidades pessoas deixando no boilerplate). Iteressante dizer que está é a tabela final mínima para formular o sistema de autenticação com JWT e afins.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/***/
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.removeColumn('users', 'first_name', {
				transaction,
			});
			await queryInterface.removeColumn('users', 'last_name', {
				transaction,
			});

			await queryInterface.removeColumn('users', 'phone_number', {
				transaction,
			});

			await queryInterface.removeColumn('users', 'birth_date', {
				transaction,
			});

			await queryInterface.removeColumn('users', 'ip_address', {
				transaction,
			});
			transaction.commit();
		} catch (e) {
			transaction.rollback();
			throw new Error(e);
		}
	},

	async down(queryInterface, Sequelize) {
		/***/
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.addColumn(
				'users',
				'first_name',
				{
					type: Sequelize.STRING(50),
					allowNull: false,
					defaultValue: '',
				},
				{ transaction },
			);

			await queryInterface.addColumn(
				'users',
				'lastname',
				{
					type: Sequelize.STRING(150),
					allowNull: false,
					defaultValue: '',
				},
				{ transaction },
			);

			await queryInterface.addColumn(
				'users',
				'phone_number',
				{
					type: Sequelize.STRING(20),
					allowNull: true,
				},
				{ transaction },
			);

			await queryInterface.addColumn(
				'users',
				'birth_date',
				{
					type: Sequelize.DATEONLY,
					allowNull: true,
				},
				{ transaction },
			);

			await queryInterface.addColumn(
				'users',
				'ip_address',
				{
					type: Sequelize.INET,
					allowNull: true,
				},
				{ transaction },
			);

			transaction.commit();
		} catch (e) {
			transaction.rollback();
			throw new Error(e);
		}
	},
};
