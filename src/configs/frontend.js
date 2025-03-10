import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

class FrontendRoutes {
	constructor() {
		// eslint-disable-next-line new-cap
		this.router = express.Router();
		this.setupFrontendRoute();
	}

	setupFrontendRoute() {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);

		this.router.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
		});
	}

	getRouter() {
		return this.router;
	}
}

export default new FrontendRoutes().getRouter();
