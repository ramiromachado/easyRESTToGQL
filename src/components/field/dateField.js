const Field = require('./field');

class DateField extends Field {

    constructor() {
        const [ name ] = arguments;
        super(name, 'date');
    }
}

module.exports = DateField;