const Field = require('./field');

class IntField extends Field {

    constructor() {
        const [ name ] = arguments;
        super(name,'int');
    }
}

module.exports = IntField;