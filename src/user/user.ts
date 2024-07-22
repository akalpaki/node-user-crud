import { hash } from 'bcrypt';

import { nanoid } from '../infrastructure/nanoid/nanoid.js';
import { User, UserRepository } from './repository.js';

export default class UserService {
  store: UserRepository;

  constructor(userStore: UserRepository) {
    this.store = userStore;
  }

  async registerUser(user: User) {
    const userID = nanoid();
    user.id = userID;
    user.password = await hash(user.password, 12);
    return await this.store.create(user);
  }
}
