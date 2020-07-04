const CONSTANTS = require('../../constants.js');
const Field = require('./field');

class StringField extends Field {

    constructor(name, config) {
        super(name,CONSTANTS.COMPONENTS.FIELD.TYPE.STRING, config);
    }
}

module.exports = StringField;