import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './src/configs/api.js';
import frontendRoutes from './src/configs/frontend.js';

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
		this.app.use('/api', apiRoutes);
		this.app.use('*', frontendRoutes);
	}
}

export default new App().app;
