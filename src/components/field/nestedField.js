const Field = require('./field');

class NestedField extends Field{
    constructor(){
        super(...arguments);
    }

    generateType(type) {
        return type;
    }

    isNested(){
        return true;
    }
}
module.exports = NestedField;