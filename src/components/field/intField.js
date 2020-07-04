const CONSTANTS = require('../../constants.js');
const Field = require('./field');

class IntField extends Field {

    constructor(name, config) {
        super(name,CONSTANTS.COMPONENTS.FIELD.TYPE.INT, config);
    }
}

module.exports = IntField;