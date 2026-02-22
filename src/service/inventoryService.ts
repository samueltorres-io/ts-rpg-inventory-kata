import { User } from "../entity/User";
import { Inventory } from "../entity/Inventory";
import { Item } from '../entity/Item';
import { InventoryRepository } from '../repository/InventoryRepository';
import { UserRepository } from '../repository/UserRepository';
import { ItemRepository } from '../repository/ItemRepository';

export class InventoryService {

    private inventoryRepository: InventoryRepository;
    private userRepository: UserRepository;
    private itemRepository: ItemRepository;

    /* Criar um novo inventario para um user */
    public create(user: User, inventory: Inventory) {
        if (!this.userRepository.getUser(user.id)) {
            return new Error("User not found");
        }
        return this.inventoryRepository.setInventory(user.id, inventory);
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

        /**
         * Com o userInvntory, iremos validar quantos slots ele 
         * tem vazios de acordo com o slots, além de validar se
         * o user tem peço que não esceda o máximo ermitido e se
         * o novo item caberia e tem peso o sufucuente para não
         * vazar isso!
        */

        /*
        export class Inventory {
            slots: number;
            weight: number;
            // item ID | amount
            items: Map<number, number>;
        }
        */

        /**
         * Para cada item dentro de items, vamos pegar o amount
         * e ir somando todos os items para ver se bate sendo 
         * menor ou igual ao slots, pois cada item:number é
         * um slot e cada item:id devemos buscar no items pelo
         * id e verificar o peso dele, então: (busca item -> puxa
         * peso -> verifica amount -> peso x amount -> salva e vai
         * para o proximo item)!
         * 
         * Ou lidar com item sendo um slot e podendo fazer um stack de items x em um slot com quantidade maxima de items por stack/slot
         * Tipo, armaduras/armas (Armor/Weapon) não estacam, mas outros items estacam em x vezes.
        */
        

    }

}