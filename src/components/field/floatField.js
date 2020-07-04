const CONSTANTS = require('../../constants.js');
const Field = require('./field');

class FloatField extends Field {

    constructor(name, config) {
        super(name,CONSTANTS.COMPONENTS.FIELD.TYPE.FLOAT, config);
    }
}

module.exports = FloatField;