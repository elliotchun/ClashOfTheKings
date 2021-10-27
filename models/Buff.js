class Buff {
    constructor(name, isPassive) {
        this.name = name;
        this.isPassive = isPassive;
    }
    
    effect = function () {

    }
}

class BuffInstance {
    constructor(Buff, target, duration) {
        this.Buff = Buff;
        this.target = target;
        this.duration = duration;
    }
}