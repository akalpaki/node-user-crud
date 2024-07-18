import express, { json, urlencoded } from 'express';

import { LoadConfig } from './config/config.js';
import { initDb } from './config/db.js';

const cfg = LoadConfig();

const db = initDb(cfg.db);

const App = express();
App.use(json());

App.listen(cfg.server.port, () => {
  console.log(`Listening on port ${cfg.server.port}`);
});
