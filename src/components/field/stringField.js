const Field = require('./field');

class StringField extends Field {

    constructor() {
        const [ name ] = arguments;
        super(name,'string');
    }
}

module.exports = StringField;