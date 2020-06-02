const Field = require('./field');

class IntField extends Field {

    constructor() {
        super(...arguments, 'int');
    }
}

module.exports = IntField;