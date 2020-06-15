const Field = require('./field');

class BooleanField extends Field {

    constructor() {
        const [ name ] = arguments;
        super(name, 'boolean');
    }
}

module.exports = BooleanField;