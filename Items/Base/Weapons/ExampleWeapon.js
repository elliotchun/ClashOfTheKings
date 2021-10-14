const Weapon = require('../../Weapon');
class ExampleWeapon extends Weapon {
    constructor() {
        super();
        this.name = 'Example Weapon';
        this.description = 'Test weapon. If this appears in the store or inventory, please contact the developers.'
        this.rarity = 'Common';
        this.tag = 'Tech';
        this.effects = function () {

        }
    }
}

module.exports = new ExampleWeapon;