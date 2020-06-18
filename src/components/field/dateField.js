const Field = require('./field');

class DateField extends Field {

    constructor(name, config) {
        super(name, 'date', config);
    }
}

module.exports = DateField;