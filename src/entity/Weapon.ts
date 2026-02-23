import { Item } from "./Item.js";

export class Weapon extends Item {
    attack: number;

    constructor(
        id: number,
        name: string,
        type: object,
        durability: number,
        weight: number,
        maxStack: number,
        attack: number
    ) {
        super(id, name, type, durability, weight, maxStack),
        this.attack = attack;
    }
}