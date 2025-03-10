import { Router } from 'express';
import HelloWorld from '../controllers/HelloWorld.controllers.js';

const routes = new Router();
const processFunctions = new HelloWorld();

routes.get('/', processFunctions.index);

export default routes;
