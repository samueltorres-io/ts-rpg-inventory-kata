/* tests/inventoryService.test.ts */

import { UserService } from '../src/service/userService.js';
import { InventoryService } from '../src/service/inventoryService.js';

import { UserRepository } from '../src/repository/UserRepository.js';
import { ItemRepository } from '../src/repository/ItemRepository.js';
import { InventoryRepository } from '../src/repository/InventoryRepository.js';

import { Inventory } from '../src/entity/Inventory.js';
import { Armor } from '../src/entity/Armor.js';
import { Weapon } from '../src/entity/Weapon.js';

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

    /**
     * 1 - Criar inventário
     * 2 - Adicionar itens (armor e weapon)
     * 3 - Dar um get no inventário
     * 4 - Deletar o inventário
    */

    test("Create a new empty User Inventory", () => {
        const inventory = new Inventory(32, 200, null);
        expect(inventory).toBe(inventoryService.create(user, inventory));
    });

    test("Adding a new Item into User Inventory", () => {
        const armorItem = new Armor(
            1,
            "Cooper Chestplate",
            "chestplate",
            200,
            18,
            1,
            8
        );
        const armor = itemRepository.setItem(user.id, armorItem);
        expect(inventoryService.addItem(user, armor)).toBe(inventoryService.getInventory(user));

        const weaponItem = new Weapon(
            1,
            "Cooper Chestplate",
            "chestplate",
            200,
            18,
            1,
            8
        );
        const weapon = itemRepository.setItem(user.id, weaponItem);   
        expect (inventoryService.addItem(user, weapon)).toBe(inventoryService.getInventory(user));
        
        /* Passo 3 já é testado dentro do 'toBe' do 'expect' de adicionar um novo item */
    });

});