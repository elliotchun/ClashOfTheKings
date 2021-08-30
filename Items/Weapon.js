const Item = require('./Item');

class Weapon extends Item {
    constructor(name, rarity, tag, effects) {
        super();
        this.type = 'Weapon';
    }
    
}
module.exports = Weapon;