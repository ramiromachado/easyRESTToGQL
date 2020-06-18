const Field = require('./field');

class IntField extends Field {

    constructor(name, config) {
        super(name,'int', config);
    }
}

module.exports = IntField;