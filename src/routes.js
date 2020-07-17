import { Router } from 'express';
import StarredRepositoryController from './app/controllers/StarredRepositoryController';

const routes = new Router();

routes.get('/starredrepositories', StarredRepositoryController.index);

export default routes;
