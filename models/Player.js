class Player {
    constructor(id = 0, ...items) {
        this.id = id;
        this.items = items;
    }
    healthStat = 100;
    healthMax = 100;
    manaStat = 100;
    manaMax = 100;
    effect() {

    }
}

module.exports = Player;