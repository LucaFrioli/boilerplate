import express from 'express';

class ApiRoutes {
	constructor() {
		// eslint-disable-next-line new-cap
		this.router = express.Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.get('/helloWorld', (req, res) => {
			res.send('Hello, World!');
		});
	}

	getRouter() {
		return this.router;
	}
}

export default new ApiRoutes().getRouter();
