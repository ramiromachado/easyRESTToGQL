const ArrayField = require('./arrayField');

class FloatArrayField extends ArrayField{
    constructor(){
        const [ name ] = arguments;
        super(name,"float");
    }

}
module.exports = FloatArrayField;