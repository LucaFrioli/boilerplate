import { Sequelize } from 'sequelize';
import databaseConfig from '../configs/database.cjs';
// importação de models
import User from '../models/User.js';

const models = [User]; // recebe as classes dos models, todo novo model deve ser declarado dentro deste array
const connection = new Sequelize(databaseConfig); // cria a conexão baseada nas configurações realizadas

models.forEach((model) => model.init(connection)); // inicia a conexão do modelo corrente;
