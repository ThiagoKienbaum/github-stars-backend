import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RepositoryController from './app/controllers/RepositoryController';
import TagController from './app/controllers/TagController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/repositories', RepositoryController.index);

routes.post('/tags/:id', TagController.store);
routes.get('/tags/:tag', TagController.show);
routes.put('/tags/:id/:tag', TagController.update);
routes.delete('/tags/:id/:tag', TagController.delete);

export default routes;
