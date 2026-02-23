import { Item } from '../entity/Item.js';

export class ItemRepository {

    private items = new Map<number, Item>();

    public setItem(itemId: number, item: Item) {
        this.items.set(item.id, item);
        return item;
    }

    public getItem(itemId: number) {
        return this.items.get(itemId);
    }

}