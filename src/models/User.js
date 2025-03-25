/* eslint-disable new-cap */
import Sequelize, { Model } from 'sequelize';
import UserValidation from './validations/User/User.validations';

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
				first_name: {
					type: Sequelize.STRING(50),
					validate: {
						isAlphanumeric: {
							msg: 'O Nome deve conter apenas caracteres Alphanuméricos',
						},
					}, // valida se é um registro alfanumérico,
				},

				last_name: {
					type: Sequelize.STRING(50),
					validate: {
						isAlphanumeric: {
							msg: 'O Sobrenome deve conter apenas caracteres Alphanuméricos',
						},
					},
				},

				phone_number: {
					type: Sequelize.STRING(20),
					validate: {
						len: {
							args: [[7, 20]],
							msg: 'Números de telefone tem entre 7 a 20 caracteres',
						},

						is: {
							// eslint-disable-next-line no-useless-escape
							args: /^(?:\+?\d{1,3}[\s\.\-\(\)]?)?(\(?\d{2,4}\)?[\s\.\-\(\)]?)?(\d{4,5})[\s\.\-\(\)]?\d{4}$/,
							msg: 'O telefone deve ser um núero válido',
						},
					},
				},

				email: {
					type: Sequelize.STRING,
					unique: {
						msg: 'Este email já foi cadastrado',
					},
					validate: { isEmail: { msg: 'O Email é inválido' } },
				},

				birth_date: {
					type: Sequelize.DATEONLY,
					validate: { isDate: true },
				}, // Tipo de dado apenas de data (sem hora)

				is_active: {
					type: Sequelize.BOOLEAN,
					validate: { isIn: [[true, false]] },
				},

				ip_address: { type: Sequelize.INET, validate: { isIP: true } }, // Tipo de dado para armazenar um endereço IP

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
