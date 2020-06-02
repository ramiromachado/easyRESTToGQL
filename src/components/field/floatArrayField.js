const ArrayField = require('./arrayField');

class FloatArrayField extends ArrayField{
    constructor(){
        super(...arguments, "float");
    }

}
module.exports = FloatArrayField;