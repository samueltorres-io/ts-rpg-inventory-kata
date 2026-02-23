export class Inventory {
    slots: number;
    weight: number;
    /* item ID | amount */
    items: Map<number, number>;

    constructor(
        slots: number,
        weight: number,
        items: Map<number, number>
    ) {
        this.slots = slots;
        this.weight = weight;
        this.items = items;
    }
}