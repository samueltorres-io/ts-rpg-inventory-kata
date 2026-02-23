export class Item {
    id: number;
    name: string;
    type: object;
    durability: number;
    weight: number;
    maxStack: number;

    constructor(
        id: number,
        name: string,
        type: object,
        durability: number,
        weight: number,
        maxStack: number
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.durability = durability;
        this.weight = weight;
        this.maxStack = maxStack;
    }
}