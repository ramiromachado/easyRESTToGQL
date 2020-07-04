const CONSTANTS = require('../../constants.js');
const Field = require('./field');

class DateField extends Field {

    constructor(name, config) {
        super(name, CONSTANTS.COMPONENTS.FIELD.TYPE.DATE, config);
    }
}

module.exports = DateField;