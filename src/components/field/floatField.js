const Field = require('./field');

class FloatField extends Field {

    constructor(name, config) {
        super(name,'float', config);
    }
}

module.exports = FloatField;