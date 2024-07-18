import type { DatabaseConfig } from './config.js';
import type { Pool } from 'mariadb';

import { createPool } from 'mariadb';

export function initDb(cfg: DatabaseConfig): Pool {
  const pool = createPool({
    host: cfg.host,
    user: cfg.user,
    password: cfg.password,
    connectionLimit: cfg.connectionLimit,
  });

  return pool;
}
