export class Inventory {
    slots: number;
    weight: number;
    /* item ID | amount */
    items: Map<number, number>;
}