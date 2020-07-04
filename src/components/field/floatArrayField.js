const CONSTANTS = require('../../constants.js');
const ArrayField = require('./arrayField');

class FloatArrayField extends ArrayField{
    constructor(name, config){
        super(name,CONSTANTS.COMPONENTS.FIELD.TYPE.FLOAT, config);
    }

}
module.exports = FloatArrayField;