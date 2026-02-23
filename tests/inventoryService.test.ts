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

    test("Getting inventory of a unexist User", () => {
        const invalidUser = user;
        invalidUser.id = 3456;
        expect(inventoryService.getInventory(invalidUser)).toEqual(new Error("User nor found"));
    });

    test("Delete a Invalid User Inventory", () => {
        const invalidUser = user;
        invalidUser.id = 3456;
        expect(inventoryService.delete(invalidUser)).toEqual(new Error("User not found"));
    });

    test("Delete a Valid User Inventory", () => {
        expect(inventoryService.delete(user)).toBeTruthy();
    });

    test("Stress Test - Exceeding Inventory Slots", () => {
        const stressUser = userService.create("stressUserSlots");
        const smallInventory = new Inventory(2, 500, new Map());
        inventoryService.create(stressUser, smallInventory);

        const item1 = new Armor(10, "Helmet 1", "helmet", 100, 5, 1, 5);
        const item2 = new Armor(11, "Helmet 2", "helmet", 100, 5, 1, 5);
        const item3 = new Armor(12, "Helmet 3", "helmet", 100, 5, 1, 5);

        itemRepository.setItem(10, item1);
        itemRepository.setItem(11, item2);
        itemRepository.setItem(12, item3);

        inventoryService.addItem(stressUser, item1);
        inventoryService.addItem(stressUser, item2);

        expect(inventoryService.addItem(stressUser, item3)).toEqual(new Error("Backpack without Slot Spaces"));
    });

    test("Stress Test - Exceeding Inventory Weight", () => {
        const stressUser = userService.create("stressUserWeight");
        const weakInventory = new Inventory(10, 30, new Map());
        inventoryService.create(stressUser, weakInventory);

        const heavyItem = new Armor(20, "Heavy Chestplate", "chestplate", 100, 20, 1, 15);
        itemRepository.setItem(20, heavyItem);

        inventoryService.addItem(stressUser, heavyItem);

        expect(inventoryService.addItem(stressUser, heavyItem)).toEqual(new Error("The backpack is heavy"));
    });

});