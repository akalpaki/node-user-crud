import express, { json } from 'express';
import WebSocket, { WebSocketServer } from 'ws';

import { LoadConfig } from './config/config.js';
import { initDb } from './config/db.js';
import UserRouter from './user/routes.js';
import { UserRepository } from './user/repository.js';
import UserService from './user/user.js';
import checkToken from './infrastructure/middleware/jwt.js';

const cfg = LoadConfig();
const db = initDb(cfg.db);

const App = express();
App.use(json());

const userStore = new UserRepository(db);
const userService = new UserService(cfg.server, userStore);
const userRoute = new UserRouter(userService);
App.use(userRoute.routes);
App.use(checkToken);

const wss = new WebSocketServer({ port: 9110 });
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  ws.on('message', function message(msg, isBinary) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg, { binary: isBinary });
      }
    });
  });
  console.log('new user connected');
  ws.send('welcome!');
});

App.listen(cfg.server.port, () => {
  console.log(`Listening on port ${cfg.server.port}`);
});
