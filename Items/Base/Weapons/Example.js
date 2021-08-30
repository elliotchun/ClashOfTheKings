const Weapon = require('../../Weapon');
class Example extends Weapon {
    constructor() {
        super();
        this.name = 'Example Weapon';
        this.rarity = 'Common';
        this.tag = 'Tech';
        this.effects = function () {

        }
    }
}

module.exports = new Example;