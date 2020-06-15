const ArrayField = require('./arrayField');

class BooleanArrayField extends ArrayField{
    constructor(){
        const [ name ] = arguments;
        super(name, "boolean");
    }

}
module.exports = BooleanArrayField;