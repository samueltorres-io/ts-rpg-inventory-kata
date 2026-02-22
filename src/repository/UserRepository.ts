import { User } from '../entity/User';

export class UserRepository {

    private users = new Map<number, User>();

    public setUser(user: User) {
        return this.users.set(user.id, user);
    }

    public getUser(userId: number) {
        return this.users.get(userId);
    }

    public deleteUser(userId: number) {
        return this.users.delete(userId);
    }

}