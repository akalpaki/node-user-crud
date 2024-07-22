import { json, Router } from 'express';
import UserService from './user.js';

export default class UserRouter {
  service: UserService;
  routes: Router;

  constructor(service: UserService) {
    this.service = service;
    this.routes = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.routes.get('/:id', async (req, res) => {
      const userID = req.params.id;
      const user = await this.service.store.get(userID);
      return res.json(user);
    });

    this.routes.post('/', async (req, res) => {
      const user = req.body;
      const result = await this.service.registerUser(user);
      return res.json(result);
    });
  }
}
