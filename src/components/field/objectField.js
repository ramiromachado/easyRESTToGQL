const Field = require('./field');

class ObjectField extends Field {

    constructor(name, config) {
        super(name, 'object', config);
    }
}

module.exports = ObjectField;