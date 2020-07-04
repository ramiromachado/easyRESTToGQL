const CONSTANTS = require('../../constants.js');
const ArrayField = require('./arrayField');

class StringArrayField extends ArrayField{
    constructor(name, config){
        super(name, CONSTANTS.COMPONENTS.FIELD.TYPE.STRING, config);
    }

}
module.exports = StringArrayField;