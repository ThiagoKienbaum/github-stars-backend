import { Router } from 'express';
import UserController from './app/controllers/UserController';
import StarredRepositoryController from './app/controllers/StarredRepositoryController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/starredrepositories', StarredRepositoryController.index);

routes.put('/users', UserController.update);

export default routes;
