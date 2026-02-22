import { Inventory } from '../entity/Inventory';

export class InventoryRepository {

    private inventories = new Map<number, Inventory>();

    public getInventory(userId: number) {
        return this.inventories.get(userId);
    }

    public setInventory(userId: number, inventory: Inventory) {
        return this.inventories.set(userId, inventory);
    }

    public deleteInventory(userId: number, inventory: Inventory) {
        return this.inventories.delete(userId);
    }

}