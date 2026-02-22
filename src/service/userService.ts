import { User } from '../entity/User';
import { UserRepository } from '../repository/UserRepository';

export class UserService {

    private userRepository: UserRepository;

    public create(name: string) {

        let id: number;

        while(true) {

            const randomStr = Math
                .random()
                .toString(8)
                .substring(2, 8)

            if (this.userRepository.getUser(parseInt(randomStr, 10))) {
                id = parseInt(randomStr, 10);
                break;
            }

            continue;

        }
        
        const user = new User(id, name);

        return this.userRepository.setUser(user);
    }

    public get(userId: number) {
        return this.userRepository.getUser(userId);
    }

    /* Delete espera o obj user, já que para deletar, devemos saber exatamente quem é o user via get */
    public delete(user: User) {
        return this.userRepository.deleteUser(user.id);
    }

}