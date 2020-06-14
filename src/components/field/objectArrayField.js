const ArrayField = require('./arrayField');

class ObjectArrayField extends ArrayField{
    constructor(){
        const [ name ] = arguments;
        super(name,"object");
    }

}
module.exports = ObjectArrayField;