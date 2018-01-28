export class Die {
    color: string;
    type: string;
    url: string;
    sides: DieSide[];

    constructor(color, type, url, sides) {
        this.color = color;
        this.type = type;
        this.url = url;
        this.sides = sides;
    }
}

export class DieSide {
    damage: number;
    surge: number;
    range: number;
    block: number;
    evade: number;
    dodge: number;
    url: string;

    constructor(damage, surge, url) {
        this.damage = damage;
        this.surge = surge;
        this.url = url;
    }
}