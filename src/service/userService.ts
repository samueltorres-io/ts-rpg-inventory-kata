import { User } from '../entity/User.js';
import { UserRepository } from '../repository/UserRepository.js';

export class UserService {

    constructor(private userRepository: UserRepository) {};

    public create(name: string) {

        let id: number;

        while(true) {

            const randomStr = Math
                .random()
                .toString(8)
                .substring(2, 8);

            const generatedId = parseInt(randomStr, 10);

            if (!this.userRepository.getUser(generatedId)) {
                id = generatedId;
                break;
            }
        }
        
        const user = new User(id, name);

        this.userRepository.setUser(user);

        return user;
    }

    public get(userId: number) {
        return this.userRepository.getUser(userId);
    }

    /* Delete espera o obj user, já que para deletar, devemos saber exatamente quem é o user via get */
    public delete(user: User) {
        return this.userRepository.deleteUser(user.id);
    }

}