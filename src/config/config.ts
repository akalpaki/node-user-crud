export type Config = {
    server: ServerConfig;
    db: DatabaseConfig;
}

export type ServerConfig = {
    port: string;
}

export type DatabaseConfig = {
    host: string | undefined;
    user: string | undefined;
    password: string | undefined
    connectionLimit: number;
}

export function LoadConfig(): Config {
    return {
        server: {
            port: process.env.PORT || "8000"
        }, 
        db: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_ROOT_PASSWORD,
            connectionLimit: process.env.CONNECTION_LIMIT ? Number.parseInt(process.env.CONNECTION_LIMIT) : 5
        }
    }
}