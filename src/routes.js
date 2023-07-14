import { Router } from "express";

import HelloController from "./controller/HelloController";
import SessionsController from "./controller/SessionsController";
import UsersController from "./controller/UsersController";
import RepositoriesController from "./controller/RepositoriesController";
import auth from "./middlewares/auth";

const routes = new Router();

routes.post('/sessions', SessionsController.create);
routes.get('/hello', HelloController.index);

routes.use(auth);

// REST Usuario
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.list);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.destroy);

// REST Repositorios
routes.get('/users/:user_id/repositories', RepositoriesController.index);
routes.post('/users/:user_id/repositories', RepositoriesController.create);
routes.delete('/users/:user_id/repositories', RepositoriesController.destroy);

export default routes;