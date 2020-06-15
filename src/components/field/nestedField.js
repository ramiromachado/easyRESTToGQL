const Field = require('./field');

class NestedField extends Field{
    constructor(){
        const [ name, type ] = arguments;
        super(name,type);
    }

    generateType(type) {
        return type;
    }

    isNested(){
        return true;
    }
}
module.exports = NestedField;