/* eslint-disable new-cap */
import Sequelize, { Model } from 'sequelize';

export default class User extends Model {
	static init(sequelize) {
		super.init(
			{
				// caso esteja utilizando tipo inteiro como id no banco de dados não precisa fazer configuração do id
				id: {
					type: Sequelize.UUID,
					allowNull: false,
					primaryKey: true,
					defaultValue: Sequelize.UUIDV4(), // Garante que o UUID seja gerado automaticamente
				},
				// configuração dos campos requeridos
				first_name: Sequelize.STRING(50), // Tipo de dado string com limite de 50 caracteres
				last_name: Sequelize.STRING(50),
				phone_number: Sequelize.STRING(20), // Tipo de dado string para telefone
				email: Sequelize.STRING,
				age: Sequelize.INTEGER, // Tipo inteiro
				birth_date: Sequelize.DATEONLY, // Tipo de dado apenas de data (sem hora)
				salary: Sequelize.DECIMAL(10, 2), // Tipo decimal, com 10 dígitos no total e 2 após a vírgula
				is_active: Sequelize.BOOLEAN, // Tipo de dado booleano
				json_data: Sequelize.JSON, // Tipo de dado JSON
				ip_address: Sequelize.INET, // Tipo de dado para armazenar um endereço IP
				additional_info: Sequelize.JSONB, // JSONB para armazenar dados JSON com busca eficiente
			},
			{
				sequelize,
				modelName: 'User',
				tableName: 'users',
				paranoid: true,
			},
		);
		return this;
	}
}
