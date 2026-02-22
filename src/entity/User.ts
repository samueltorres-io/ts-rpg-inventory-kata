export class User {
    id: number;
    name: string;

    constructor(id: number, name: string, slots: number) {
        this.id = id;
        this.name = name;
    }
}