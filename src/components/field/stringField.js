const Field = require('./field');

class StringField extends Field {

    constructor(name, config) {
        super(name,'string', config);
    }
}

module.exports = StringField;