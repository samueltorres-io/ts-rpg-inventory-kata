import { User } from "../entity/User.js";
import { Inventory } from "../entity/Inventory.js";
import { Item } from '../entity/Item.js';
import { InventoryRepository } from '../repository/InventoryRepository.js';
import { UserRepository } from '../repository/UserRepository.js';
import { ItemRepository } from '../repository/ItemRepository.js';

export class InventoryService {

    constructor(
        private inventoryRepository: InventoryRepository,
        private userRepository: UserRepository,
        private itemRepository: ItemRepository
    ) {};

    /* Criar um novo inventario para um user */
    public create(user: User, inventory: Inventory) {
        if (!this.userRepository.getUser(user.id)) {
            return new Error("User not found");
        }

        this.inventoryRepository.setInventory(user.id, inventory);

        return inventory;
    }

    /* Busca o inventário do usuário */
    public getInventory(user: User) {
        if (!this.userRepository.getUser(user.id)) {
            return new Error("User nor found");
        }
        return this.inventoryRepository.getInventory(user.id);
    }

    /* Deleta o inventário do usuário */
    public delete(user: User, inventory: Inventory) {
        if (!this.userRepository.getUser(user.id)) {
            return new Error("User not found");
        }
        /* Vai que user tem mais de um inventário.... excluimos apenas o inventário exato do user */
        return this.inventoryRepository.deleteInventory(user.id, inventory);
    }

    /* Adicionar um item ao inventário do user */
    public addItem(user: User, item: Item) {
        if (!this.userRepository.getUser(user.id)) {
            return new Error("User not found");
        }
        if (!this.itemRepository.getItem(item.id)) {
            return new Error("Item not found");
        }
        
        const userInventory = this.getInventory(user);
        if (userInventory instanceof Error || userInventory?.items == null ) return userInventory; /* <-- error */
        if (userInventory === undefined) return new Error("User Inventory not found");

        /* 1 - Calculo do peso e stacks */
        let currentWeight: number = 0;
        let slots: number = 0;
        for (let [currentId, currentAmount] of userInventory!.items.entries()) {

            /* Busca items e peso */
            const currentItem = this.itemRepository.getItem(currentId);
            if (currentItem) currentWeight += (currentItem.weight * currentAmount);
            /* Não validamos peso máximo dos itens que já estão na mochila */
            
            /* Monta quantos slots foram utilizados */
            slots += Math.ceil(currentAmount / currentItem!.maxStack);
            if (slots + 1 >= userInventory.slots) return new Error("Backpack without Slot Spaces");

        }

        /* 2 - Validação do novo item e inserção */
        if ((currentWeight + item.weight) > userInventory.weight) return new Error("The backpack is heavy");

        const currentAmount = userInventory.items.get(item.id) || 0;

        const currentSlotsOccupied = Math.ceil(currentAmount / item.maxStack);
        const newSlotsOccupied = Math.ceil((currentAmount + 1) / item.maxStack);

        /* 0 se couber na stack do item ou 1 se precisar de um novo slot/stack */
        const additionalSlotsNeeded = newSlotsOccupied - currentSlotsOccupied;

        if ((slots + additionalSlotsNeeded) > userInventory.slots) {
            return new Error("Backpack without Slot Spaces");
        }

        /* 3 - Adição do item */
        userInventory.items.set(item.id, currentAmount + 1);
        if (this.inventoryRepository.setInventory(user.id, userInventory)) {
            return true;
        }
        return false;
    }

}