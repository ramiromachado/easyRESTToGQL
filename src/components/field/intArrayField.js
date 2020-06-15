const ArrayField = require('./arrayField');

class IntArrayField extends ArrayField{
    constructor(){
        const [ name ] = arguments;
        super(name,"int");
    }

}
module.exports = IntArrayField;