const Field = require('./field');

class ObjectField extends Field {

    constructor() {
        super(...arguments, 'object');
    }
}

module.exports = ObjectField;