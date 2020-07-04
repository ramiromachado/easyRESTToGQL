const CONSTANTS = require('../../constants.js');
const Field = require('./field');

class BooleanField extends Field {

    constructor(name, config) {
        super(name, CONSTANTS.COMPONENTS.FIELD.TYPE.BOOLEAN, config);
    }
}

module.exports = BooleanField;