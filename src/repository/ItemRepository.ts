import { Item } from '../entity/Item';

export class ItemRepository {

    private items = new Map<number, Item>();

    public setItem(itemId: number, item: Item) {
        return this.items.set(item.id, item);
    }

    public getItem(itemId: number) {
        return this.items.get(itemId);
    }

}