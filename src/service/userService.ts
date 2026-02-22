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

}