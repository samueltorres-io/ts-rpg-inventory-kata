export class Inventory {
    slots: number;
    weight: number;
    /* item ID | amount */
    items: Map<number, number> | null;

    constructor(
        slots: number,
        weight: number,
        items: Map<number, number> | null
    ) {
        this.slots = slots;
        this.weight = weight;
        this.items = items;
    }
}