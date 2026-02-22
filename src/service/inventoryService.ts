import { User } from "../entity/User";
import { Inventory } from "../entity/Inventory";
import { InventoryRepository } from '../repository/InventoryRepository';
import { UserRepository } from '../repository/UserRepository';

export class InventoryService {

    private inventoryRepository: InventoryRepository;
    private userRepository: UserRepository;

    /* Criar um novo inventario para um user */
    public create(user: User, inventory: Inventory) {
        if (!this.userRepository.getUser(user.id)) {
            return new Error("User not found");
        }
        return this.inventoryRepository.setInventory(user.id, inventory);
    }

}