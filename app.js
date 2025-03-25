import dotenv from 'dotenv';
dotenv.config();

import './src/database/index.js'; // retire esta linha caso não for trabalhar com banco de dados
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './src/configs/api.js'; // retire esta linha caso for utilizar o backend apenas para SSR
import frontendRoutes from './src/configs/frontend.js'; // retire esta linha caso for trabalhar apenas com APIs sem renderização frontend no back

class App {
	constructor() {
		this.app = express();
		this.middlewares();
		this.routes();
	}

	setStaticFiles() {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		this.app.use(express.static(path.join(__dirname, '/dist')));
	}

	middlewares() {
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.json());
		this.setStaticFiles();
	}

	routes() {
		// mantenha as duas linhas caso for trabalhar com fullstack acoplado
		this.app.use('/api', apiRoutes); // retire esta linha caso for trabalhar apenas com ssr
		this.app.use('*', frontendRoutes); // retire esta linha caso for trabalhar apenas com API
	}
}

export default new App().app;
