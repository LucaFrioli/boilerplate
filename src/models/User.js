/* eslint-disable new-cap */
import Sequelize, { Model } from 'sequelize';
import UserValidation from './validations/User/User.validations.js';

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

				email: {
					type: Sequelize.STRING,
					unique: {
						msg: 'Este email já foi cadastrado',
					},
					validate: { isEmail: { msg: 'O Email é inválido' } },
				},

				is_active: {
					type: Sequelize.BOOLEAN,
					validate: { isIn: [[true, false]] },
				},

				additional_info: {
					type: Sequelize.JSONB,
					validate: {
						validateJsonInput(value) {
							const isValid = new UserValidation(value);
							isValid.additionalInfoValidateInput();
						},
					},
				},

				// irei abordar como lidar com senhas após o commit de organização de modelo
				password_hash: { type: Sequelize.STRING, defaultValue: '' },
				password: {
					type: Sequelize.VIRTUAL,
					validate: {
						len: {
							args: [6, 50],
							msg: 'A senha deve ter de 6 a 50 caracteres',
						},
						isAlphanumeric: {
							msg: 'A senha deve conter números e letras',
						},
					},
				}, // campo que existe mas apenas em memória
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
