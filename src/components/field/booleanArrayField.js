const CONSTANTS = require('../../constants.js');
const ArrayField = require('./arrayField');

class BooleanArrayField extends ArrayField{
    constructor(name, config){
        super(name, CONSTANTS.COMPONENTS.FIELD.TYPE.BOOLEAN, config);
    }

}
module.exports = BooleanArrayField;