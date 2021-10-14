const Utility = require('../../Utility');
class ExampleUtility extends Utility {
    constructor() {
        super();
        this.name = 'Example Utility';
        this.description = 'Test utility. If this appears in the store or inventory, please contact the developers.'
        this.rarity = 'Common';
        this.tag = 'Tech';
        this.effects = function () {

        }
    }
}

module.exports = new ExampleUtility;