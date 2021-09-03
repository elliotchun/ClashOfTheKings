const Item = require('./Item');

class Utility extends Item {
    constructor(name, rarity, tag, effects) {
        super();
        this.type = 'Utility';
    }
    
}
module.exports = Utility;