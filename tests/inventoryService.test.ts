/* tests/inventoryService.test.ts */

import { UserService } from '../src/service/userService.js';
import { InventoryService } from '../src/service/inventoryService.js';

import { UserRepository } from '../src/repository/UserRepository.js';
import { ItemRepository } from '../src/repository/ItemRepository.js';
import { InventoryRepository } from '../src/repository/InventoryRepository.js';

import { Inventory } from '../src/entity/Inventory.js';

const userRepository: UserRepository = new UserRepository();
const inventoryRepository: InventoryRepository = new InventoryRepository();
const itemRepository: ItemRepository = new ItemRepository();

const userService: UserService = new UserService(userRepository);
const inventoryService: InventoryService = new InventoryService(
    inventoryRepository,
    userRepository,
    itemRepository
);

const user = userService.create("user");

describe("Tests for User Inventory and Items", () => {

    test("Create a new empty User Inventory", () => {
        const inventory = new Inventory(32, 200, null);
        expect(inventory).toBe(inventoryService.create(user, inventory));
    });

});