import { Item } from "./Item.js";

export class Armor extends Item {
    protection: number;

    constructor(
        id: number,
        name: string,
        type: object,
        durability: number,
        weight: number,
        maxStack: number,
        protection: number
    ) {
        super(id, name, type, durability, weight, maxStack),
        this.protection = protection;
    }
}