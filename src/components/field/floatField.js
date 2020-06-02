const Field = require('./field');

class FloatField extends Field {

    constructor() {
        super(...arguments, 'float');
    }
}

module.exports = FloatField;