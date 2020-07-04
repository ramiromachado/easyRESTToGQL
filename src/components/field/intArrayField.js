const CONSTANTS = require('../../constants.js');
const ArrayField = require('./arrayField');

class IntArrayField extends ArrayField{
    constructor(name, config){
        super(name, CONSTANTS.COMPONENTS.FIELD.TYPE.INT, config);
    }

}
module.exports = IntArrayField;