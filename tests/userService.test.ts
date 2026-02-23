/* tests/userService.test.ts */

import { UserService } from '../src/service/userService.js';
import { UserRepository } from '../src/repository/UserRepository.js';

const userRepository: UserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);

describe("Tests for User Service File", () => {

    test("Creating a valid new User", () => {
        const user = userService.create("userTest");
        expect(typeof user.id).toBe('number');
        expect(user.name).toEqual("userTest");
    });

    test("Getting a valid User", () => {
        const user = userService.create("user");
        expect(user).toEqual(userService.get(user.id));
    });

    test("Getting a non-existent User", () => {
        expect(userService.get(1234)).toBeUndefined();
    });

    test("Delete a exist User", () => {
        const user = userService.create("user");
        expect(userService.delete(user)).toBeTruthy();
    });

});