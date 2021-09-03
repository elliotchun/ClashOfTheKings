const Item = require('./Item');

class Artifact extends Item {
    constructor(name, rarity, tag, effects) {
        super();
        this.type = 'Artifact';
    }
    
}
module.exports = Artifact;