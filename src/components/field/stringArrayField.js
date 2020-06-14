const ArrayField = require('./arrayField');

class StringArrayField extends ArrayField{
    constructor(){
        const [ name ] = arguments;
        super(name,"string");
    }

}
module.exports = StringArrayField;