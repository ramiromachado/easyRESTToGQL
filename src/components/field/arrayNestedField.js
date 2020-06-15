const ArrayField = require('./arrayField');

//TODO: This class has exactly the same code as nestedField, but extends from ArrayField
class ArrayNestedField extends ArrayField{
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
module.exports = ArrayNestedField;