import { UserRepository } from './repository.js';

export default class UserService {
  store: UserRepository;

  constructor(userStore: UserRepository) {
    this.store = userStore;
  }
}
