import { json, Request, Response, Router } from 'express';
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
    this.routes.get('/me', async (req: Request, res: Response) => {
      const userID = req.query.id;
      if (typeof userID !== 'string') {
        return res.json('invalid user ID');
      }
      const user = await this.service.store.get(userID);
      return res.json(user);
    });

    this.routes.post('/register', async (req: Request, res: Response) => {
      const user = req.body;
      const result = await this.service.registerUser(user);
      return res.json(result);
    });

    this.routes.post('/login', async (req: Request, res: Response) => {
      const loginInfo = req.body;
      const result = await this.service.login(loginInfo);
      console.log(result);
      return res.json(result);
    });
  }
}
