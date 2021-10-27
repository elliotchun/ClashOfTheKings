class Item {
    constructor(name, type, rarity, tag) {
        this.name = this.name;
        this.description = '';
        this.type = null;
        this.rarity = this.rarity;
        this.tag = this.tag;

        this.OnSpawn = function (gameStatus) { }
        this.PreTurn = function (gameStatus) { }
        this.OnTurn = function (gameStatus) { }
        this.PreAttack = function (gameStatus) { }
        this.Attack = function (gameStatus) { }
        this.PostAttack = function (gameStatus) { }
        this.EndTurn = function (gameStatus) { }
        this.OnEvent = function (gameStatus, gameEvent) { }
    }
}

module.exports = Item;