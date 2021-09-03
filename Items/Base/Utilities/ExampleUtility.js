const Utility = require('../../Utility');
class ExampleUtility extends Utility {
    constructor() {
        super();
        this.name = 'Example Utility';
        this.rarity = 'Common';
        this.tag = 'Tech';
        this.effects = function () {

        }
    }
}

module.exports = new ExampleUtility;