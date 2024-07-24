export type Config = {
  server: ServerConfig;
  db: DatabaseConfig;
};

export type ServerConfig = {
  port: string;
  jwtSecret: string;
};

export type DatabaseConfig = {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  connectionLimit: number;
};

export function LoadConfig(): Config {
  return {
    server: {
      port: process.env.PORT || '8000',
      jwtSecret: process.env.JWT_SECRET || 'superSecret',
    },
    db: {
      host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
      port: process.env.DB_PORT ? Number.parseInt(process.env.DB_PORT) : 6969,
      database: process.env.DB_DATABASE ? process.env.DB_DATABASE : '',
      user: process.env.DB_USER ? process.env.DB_USER : 'root',
      password: process.env.DB_ROOT_PASSWORD ? process.env.DB_ROOT_PASSWORD : 'root',
      connectionLimit: process.env.CONNECTION_LIMIT ? Number.parseInt(process.env.CONNECTION_LIMIT) : 5,
    },
  };
}
