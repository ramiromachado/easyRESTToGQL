const Field = require('./field');

class BooleanField extends Field {

    constructor(name, config) {
        super(name, 'boolean', config);
    }
}

module.exports = BooleanField;