const Field = require('./field');

class BooleanField extends Field {

    constructor() {
        super(...arguments, 'boolean');
    }
}

module.exports = BooleanField;