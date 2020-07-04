const CONSTANTS = require('../../constants.js');
const ArrayField = require('./arrayField');

class DateArrayField extends ArrayField{
    constructor(name, config){
        super(name, CONSTANTS.COMPONENTS.FIELD.TYPE.DATE, config);
    }

}
module.exports = DateArrayField;