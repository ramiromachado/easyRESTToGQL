const CONSTANTS = require('../../constants.js');
const ArrayField = require('./arrayField');

class ObjectArrayField extends ArrayField{
    constructor(name, config){
        super(name, CONSTANTS.COMPONENTS.FIELD.TYPE.OBJECT, config);
    }

}
module.exports = ObjectArrayField;