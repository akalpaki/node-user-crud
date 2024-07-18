import type { Pool, PoolConnection } from 'mariadb';

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

  async create(user: User): Promise<User> {
    return await new Promise(async (resolve, reject) => {
      const conn = await this.pool.getConnection();
      try {
        const res = await conn.query(
          {
            sql: 'INSERT INTO users (id, username, password, email, role) VALUES (?, ?, ?, ?, ?)',
          },
          [user.id, user.username, user.password, user.email, user.role],
        );
        resolve(res);
      } catch (err) {
        reject(err);
      } finally {
        conn.release();
      }
    });
  }

  async get(userID: string): Promise<User> {
    return await new Promise(async (resolve, reject) => {
      const conn = await this.pool.getConnection();
      try {
        const res = await conn.query(
          {
            sql: 'SELECT * FROM user WHERE id = ?',
          },
          [userID],
        );
        resolve(res);
      } catch (err) {
        reject(err);
      } finally {
        conn.release;
      }
    });
  }
}
