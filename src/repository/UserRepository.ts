import { User } from '../entity/User';

export class UserRepository {

    private users = new Map<number, User>();

    public setUser(user: User) {
        return this.users.set(user.id, user);
    }

    

}