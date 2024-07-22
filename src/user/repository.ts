import type { Connection, Pool, PoolConnection } from 'mariadb';

export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  role: string;
};

export class UserRepository {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async create(user: User): Promise<void> {
    return await new Promise(async (resolve, reject) => {
      const conn = await this.pool.getConnection();
      try {
        await conn.query({ sql: 'INSERT INTO users (id, username, password, email, role) VALUES (?, ?, ?, ?, ?)' }, [
          user.id,
          user.username,
          user.password,
          user.email,
          user.role,
        ]);
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        await conn.release();
      }
    });
  }

  async get(userID: string): Promise<User | Error> {
    return await new Promise(async (resolve, reject) => {
      const conn = await this.pool.getConnection();
      try {
        const user: User = await conn.query(
          {
            sql: 'SELECT id, username, email, role FROM users WHERE id = ?',
          },
          [userID],
        );
        resolve(user);
      } catch (err) {
        reject(err);
      } finally {
        await conn.release();
      }
    });
  }
}
