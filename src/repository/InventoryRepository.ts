import { Inventory } from '../entity/Inventory';
import { User } from '../entity/User';

export class InventoryRepository {

    private inventories = new Map<User, Inventory>();

}