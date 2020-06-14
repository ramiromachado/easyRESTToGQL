const Field = require('./field');

class FloatField extends Field {

    constructor() {
        const [ name ] = arguments;
        super(name,'float');
    }
}

module.exports = FloatField;