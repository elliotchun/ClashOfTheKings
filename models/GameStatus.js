class GameStatus {
    constructor(...PlayerInstances, turn = 0) {
        this.PlayerInstances = PlayerInstances;
        this.turn = turn;

        this.OnSpawn = function () { }
        this.PreTurn = function () { }
        this.OnTurn = function () { }
        this.PreAttack = function () { }
        this.Attack = function () { }
        this.PostAttack = function () { }
        this.EndTurn = function () { }
        this.OnEvent = function (gameEvent) { }
    }

    StartGame() {
        this.OnSpawn();
    }
}

module.exports = GameStatus;