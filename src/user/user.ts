import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { nanoid } from '../infrastructure/nanoid/nanoid.js';
import { LoginInfo, User, UserRepository } from './repository.js';
import { ServerConfig } from '../config/config.js';

export default class UserService {
  store: UserRepository;
  secret: string;

  constructor(cfg: ServerConfig, userStore: UserRepository) {
    this.store = userStore;
    this.secret = cfg.jwtSecret;
  }

  async registerUser(user: User) {
    const userID = nanoid();
    user.id = userID;
    user.password = await hash(user.password, 12);
    return await this.store.create(user);
  }

  async login(loginInfo: LoginInfo) {
    if (typeof loginInfo.username !== 'string' && typeof loginInfo.password !== 'string') {
      return new Error('invalid login data');
    }

    const user = await this.store.getByUsername(loginInfo.username);

    if (!(await compare(loginInfo.password, user[0].password))) {
      return new Error('invalid login data');
    }

    const token = jwt.sign(
      {
        sub: user[0].id,
        exp: Math.floor(Date.now() / 1000) + 3600,
        role: user[0].role,
        username: user[0].username,
      },
      this.secret,
    );
  
    return token;
  }
}
