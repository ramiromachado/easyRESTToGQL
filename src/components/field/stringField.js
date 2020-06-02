const Field = require('./field');

class StringField extends Field {

    constructor() {
        super(...arguments, 'string');
    }
}

module.exports = StringField;