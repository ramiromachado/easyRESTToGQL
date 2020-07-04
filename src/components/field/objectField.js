const CONSTANTS = require('../../constants.js');
const Field = require('./field');

class ObjectField extends Field {

    constructor(name, config) {
        super(name, CONSTANTS.COMPONENTS.FIELD.TYPE.OBJECT, config);
    }
}

module.exports = ObjectField;