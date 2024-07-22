import express, { json } from 'express';

import { LoadConfig } from './config/config.js';
import { initDb } from './config/db.js';
import UserRouter from './user/routes.js';
import { UserRepository } from './user/repository.js';
import UserService from './user/user.js';

const cfg = LoadConfig();

const db = initDb(cfg.db);

const App = express();
App.use(json());

const userStore = new UserRepository(db);
const userService = new UserService(userStore);
const userRoute = new UserRouter(userService);
App.use(userRoute.routes);

App.listen(cfg.server.port, () => {
  console.log(`Listening on port ${cfg.server.port}`);
});
