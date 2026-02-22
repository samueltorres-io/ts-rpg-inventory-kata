export class User {
    id: number;
    name: string;
    inventoryMaxSlots: number;

    constructor(id: number, name: string, slots: number) {
        this.id = id;
        this.name = name;
        this.inventoryMaxSlots = slots;
    }
}