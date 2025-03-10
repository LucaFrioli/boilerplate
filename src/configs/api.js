import express from 'express';
import helloWorldRoutes from '../routes/helloWorld.routes.js';

class ApiRoutes {
	constructor() {
		// eslint-disable-next-line new-cap
		this.router = express.Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.use('/helloWorld', helloWorldRoutes);
	}

	getRouter() {
		return this.router;
	}
}

export default new ApiRoutes().getRouter();
