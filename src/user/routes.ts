import { Router } from 'express';
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
    this.routes.get('/', (req, res) => {
      res.write('Hello, world!');
    });
  }
}
