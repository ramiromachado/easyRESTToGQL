const Field = require('./field');

class ObjectField extends Field {

    constructor() {
        const [ name ] = arguments;
        super(name, 'object');
    }
}

module.exports = ObjectField;