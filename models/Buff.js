class Buff {
    constructor(name, info, isPassive) {
        this.name = name;
        this.info = info;
        this.isPassive = isPassive;
    }
}

class BuffInstance {
    constructor(Buff, target, duration) {
        this.Buff = Buff;
        this.target = target;
        this.duration = duration;
    }
    effect = function () {

    }
}