import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StarredRepositoryController from './app/controllers/StarredRepositoryController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.get('/starredrepositories', StarredRepositoryController.index);
routes.put('/users', UserController.update);

export default routes;
